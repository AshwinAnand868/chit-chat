import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { addFriendValidator } from "@/lib/validators/add-friend";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
    try {
      const body = await req.json();  

      // revalidation of input - never trust the client
      const {email: emailToAdd} = addFriendValidator.parse(body.email);

      const idToAdd = await fetchRedis('get', `user:email:${emailToAdd}`) as string;

    //   const response = await fetch(
    //     `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email${emailToAdd}`, {
    //         headers: { // we need to tell upstash whether are we authoized to make the request or no
    //             Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    //         },
    //         cache: 'no-store' // don't cache data - always get updated one
    //     }
    //   )

      if(!idToAdd) {
        return new Response('This user does not exist.', {
            status: 400
        });
      }

      const session = await getServerSession(authOptions);

      if(!session) {
        return new Response('Unauthorized', {
            status: 401
        })
      }

      if(idToAdd === session.user.id) {
        return new Response('You cannot add yourself as friend.', {
            status : 400
        });
      }

      // we need to check if the user is already added as a friend
      // normally the requests like this are cached
      // set is structure and stands for s
      const isAlreadyAdded = (await fetchRedis(
        "sismember",
        `user:${idToAdd}:incoming_friend_requests`,
        session.user.id
        )) as 0 | 1; // either user is a member or no

      if(isAlreadyAdded) {
          return new Response('Already sent a request to this user', {status: 400});
      }

        // check if the user is already friend
      const isAlreadyFriends = (await fetchRedis(
        "sismember",
        `user:${session.user.id}:friends`,
        idToAdd
        )) as 0 | 1;

      if(isAlreadyFriends) {
          return new Response('You both are already friends!', {status: 400});
      }

      // notify the user to whom the friend request will be sent
      await pusherServer.trigger(
        toPusherKey(`user:${idToAdd}:incoming_friend_requests`), // the channel we are triggering to
        'incoming_friend_requests',  // the function that will be executed on that user side
        {
          senderId: session.user.id,
          senderEmail: session.user.email,
        }
      )
      
      // valid request, send friend request
      db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
      return new Response('OK');
    } catch(error) {
        if(error instanceof z.ZodError) {
            return new Response('Invalid request payload', {status: 422})
        }

        return new Response('Invalid request', {status: 400})
    }
}