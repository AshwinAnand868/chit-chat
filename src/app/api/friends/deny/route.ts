import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);
    
        if(!session) {
            return new Response('Unauthorized', {status: 401});
        }
    
        const {id: idtoDeny} = z.object({id: z.string()}).parse(body);
    
        // remove from set
        await db.srem(`user:${session.user.id}:incoming_friend_requests`, idtoDeny);
    
        return new Response('OK');
    } catch(error) {
        console.log(error);

        if(error instanceof z.ZodError) {
            return new Response('Invalid Request Payload', {status: 422});
        }

        return new Response('Invalid request', {status: 400});
    }
} 