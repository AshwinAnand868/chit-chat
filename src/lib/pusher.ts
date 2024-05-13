// pusher is a service we can use for real time communication
// pusher channels are web sockets channels which are scalable, super fast, and they make web socket connections especially
// in serverless apps like Nextjs super easy and super intuitive

// there are two packages of pusher that we will need to install. One is pusher and another is pusher-js. The first one is
// for server side distribution of real time messages, and the other is for client side receiving end of real time communications. 

import PusherServer from "pusher";
import PusherClient from "pusher-js";


export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_APP_SECRET!,
    cluster: 'us2',
    useTLS: true // encrypted data traffic
})

export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
        cluster: 'us2'
    }
)