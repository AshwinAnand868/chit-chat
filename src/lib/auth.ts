import { fetchRedis } from "@/helpers/redis";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import db from "./db";

function getGoogleCredentials() {
    const clientId  = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIEN_SECRET

    if(!clientId || clientId.length === 0) {
        throw new Error("Missing Google client id")
    }

    if(!clientSecret || clientSecret.length === 0) {
        throw new Error("Missing Google client secret")
    }

    return {clientId, clientSecret};
}

/*
    adapter - when a user logs in our application using google or certain other provider, a
    certain action will be taken automatically in the database like
    persisting a user's session - user's data will be put into the database
    automatically - may not be the credentials provider

    strategy jwt means that we don't handle the session on the database. By this, we can
    verify the session in the middleware later on to protect our routes
    way more easily than we kept the session on the database

    signIn is for custom page which is login

    callback actions happen when certian events happen that next auth detects

*/

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        Google({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async jwt ({token, user}) {
            // const dbUser = (await db.get(`user:${token.id}`)) as User | null; // token generated by adapter - caches that the account we are logged in with

            const dbUserResult = await fetchRedis('get', `user:${token.id}`) as string | null; // returned as json string - fetchRedis by passess the caching behavior of the request
            if(!dbUserResult) {
                token.id = user!.id
                return token;
            }

            // if(account) {
            //     token.accessToken = account.access_token;
            // }

            const dbUser = JSON.parse(dbUserResult) as User

            // this jwt value will be stored for the user session token
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                // accessToken: token.accessToken
            }
        },
        async session({session, token}) {
            if(token) {
                session.user.id = token.id,
                session.user.name = token.name,
                session.user.email = token.email,
                session.user.image = token.picture
                // session.user.accessToken = token.accessToken as string
            }

            // console.log(session);
            return session; // we always have to return something no matter if token is good or no
        },
        redirect() { // when the user has signed in
            return '/dashboard';
        }
    }
}