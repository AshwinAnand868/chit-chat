import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { callId, calleeId, callerId } = await request.json();

    console.log("Callee id during pusher event request: ");
    console.log(calleeId);

    console.log("Caller id during pusher event request: ");
    console.log(callerId);

    try {
        await pusherServer.trigger(`user-${callerId}`, 'incoming-call-event', {
            callId,
            callerId
        });

        return NextResponse.json({success: true});
    } catch(error) {
        console.log('Error creating pusher trigger caller event');
        return NextResponse.json({success: false, error: (error as Error).message, status: 500});
    }
}