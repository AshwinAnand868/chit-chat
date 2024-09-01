"use server";

import { authOptions } from "@/lib/auth";
import client from "@/lib/streamClient";
import { getServerSession } from "next-auth";

export const tokenProvider = async() => {
    const session = await getServerSession(authOptions);

    if(!session) {
        throw new Error("Session does not exist");
    }

    const user = session.user;

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    const issued = Math.floor(Date.now() / 1000) - 60;

    const token = client.createToken(user.id, exp, issued);

    return token;
}