// 'use client';

// import { pusherClient } from "@/lib/pusher"
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import IncomingCallToast from "@/app/components/IncomingCallToast";

// export const useIncomingCallEvent = (calleeId: string) => {
//     useEffect(() => {
//         const channel = pusherClient.subscribe(`user-${calleeId}`);

//         const incomingCallHandler = (data: {callId: string, callerId: string}) => {
//             toast.custom((t) => (
//                 <IncomingCallToast
//                     t={t}
//                     callId={callId}

//                 />
//             ));
//         }

//         channel.bind('incoming-call', incomingCallHandler);

//         return () => {
//             pusherClient.unsubscribe(`user-${calleeId}`);
//         };
//     }, [calleeId]);

// }