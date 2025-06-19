import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import client from "@/lib/streamClient";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const {userId1, userId2} = await request.json();

        const session = await getServerSession(authOptions);

        if(!session)
            notFound();
      
        const user = session.user;

        const chatPartnerId = user.id === userId1 ? userId2 : userId1;
        const chatPartnerJSON = (await fetchRedis('get', `user:${chatPartnerId}`)) as string;
        const chatPartner = JSON.parse(chatPartnerJSON) as User;

        const users = {
           [user.id]: {id: user.id, name: `${user.name}`},
           [chatPartner.id]: {id: chatPartner.id, name: `${chatPartner.name}`},
        }

        await client.upsertUsers({users});
        
        return NextResponse.json({
            success: true
        });

    } catch(error) {
        console.error('Error creating stream users:', error);
        return NextResponse.json({ success: false, error: (error as Error).message });
    }
}