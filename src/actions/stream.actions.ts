"use server";

import { authOptions } from "@/lib/auth";
import { StreamClient } from "@stream-io/node-sdk";
import { getServerSession } from "next-auth";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async() => {
    const session = await getServerSession(authOptions);

    if(!session) {
        throw new Error("Session does not exist");
    }

    const user = session.user;

    if(!apiKey) throw new Error('No Stream API Key');
    if(!secret) throw new Error('No Stream Secret');

    const streamClient = new StreamClient(apiKey, secret);

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    const issued = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(user.id, exp, issued);

    return token;
}