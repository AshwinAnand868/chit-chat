import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        const {id: idToAdd} = z.object({id: z.string()}).parse(body);

        const session = await getServerSession(authOptions);

        if(!session) {
            return new Response('Unauthorized', {status: 401});
        }

        const isAlreadyFriends = await fetchRedis('sismember', `user:${session.user.id}:friends`, idToAdd);

        if(isAlreadyFriends) {
            return new Response('Already friends', {status: 400});
        }

        const hasSentRequest = await fetchRedis('sismember', `user:${session.user.id}:incoming_friend_requests`, idToAdd);

        if(!hasSentRequest) {
            return new Response('There is no friend request from this user', {status: 400});
        }

        pusherServer.trigger(
            toPusherKey(`user:${idToAdd}:friends`),
            'new_friend',
            {}
        )

        await db.sadd(`user:${session.user.id}:friends`, idToAdd);

        // now this current user will need to be added to the friends of the other user as well

        await db.sadd(`user:${idToAdd}:friends`, session.user.id);

        await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd);

        return new Response('OK');

    } catch (error) {
        console.log(error);

        if(error instanceof z.ZodError) {
            return new Response('Invalid Request Payload', {status: 422});
        }

        return new Response('Invalid request', {status: 400});
    }
}