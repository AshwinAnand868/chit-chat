import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { Message, messageValidator } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    try {
        const { text, chatId }: { text: string; chatId: string } = await req.json();

        // first we will check the session
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        // second as we have the chat id we can extract the sender and the receiver ids
        const [userId1, userId2] = chatId.split("--");

        // compare the current session id with both the ids and if it is not equal to each other, then again unautorized
        if (session.user.id !== userId1 && session.user.id !== userId2) {
            return new Response("Unauthorized", { status: 401 });
        }

        // then find the receiver id and check if the receiver id is a friend of the current session id
        const friendId = session.user.id === userId1 ? userId2 : userId1;
        const currentUserFriends = (await fetchRedis(
            "smembers",
            `user:${session.user.id}:friends`
        )) as string[];
        const isFriends = currentUserFriends.includes(friendId);

        if (!isFriends) {
            return new Response("Unauthorized", { status: 401 });
        }

        // now both are friends then let's work on sending the message

        const rawSender = (await fetchRedis(
            "get",
            `user:${session.user.id}`
        )) as string;

        const sender = JSON.parse(rawSender) as User;

        const timestamp = Date.now();

        const messageData: Message = {
            id: nanoid(),
            senderId: session.user.id,
            text,
            timestamp,
        };

        const message = messageValidator.parse(messageData);

        // notify all connected chat room clients
        await pusherServer.trigger(
            toPusherKey(`chat:${chatId}`), // the channel we are triggering to
            'incoming-message',  // the function that will be executed on that user side
            message
        )

        await pusherServer.trigger(
            toPusherKey(`user:${friendId}:chats`),
            'new_message',
            {
                ...message,
                senderImg: sender.image,
                senderName: sender.name,
            }
        );

        await db.zadd(`chat:${chatId}:messages`, {
            score: timestamp,
            member: JSON.stringify(message),
        });

        return new Response("OK");
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 })
        }

        return new Response('Internal Server Error', { status: 500 })
    }
}
