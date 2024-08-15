import ChatUI from '@/app/components/ChatUI';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { messageArrayValidator } from '@/lib/validators/message';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    chatId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { chatId } = params;

  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const { user } = session;

  const [userId1, userId2] = chatId.split('--');

  if (user.id !== userId1 && user.id !== userId2) {
    notFound();
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartnerJSON = (await fetchRedis('get', `user:${chatPartnerId}`)) as string;
  const chatPartner = JSON.parse(chatPartnerJSON) as User;

  const messagesForGivenChatId: string[] = await fetchRedis('zrange', `chat:${chatId}:messages`, 0, -1);
  const reversedChatMessages = messagesForGivenChatId.map((message) => JSON.parse(message) as Message).reverse();
  const chatMessages = messageArrayValidator.parse(reversedChatMessages);


  return (
    <ChatUI chatId={chatId} chatPartner={chatPartner} session={session} initialMessages={chatMessages} />
  );
}



// 'use client';

// import ChatInput from '@/app/components/ChatInput';
// import Messages from '@/app/components/Messages';
// import { fetchRedis } from '@/helpers/redis';
// import { messageArrayValidator } from '@/lib/validators/message';
// import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
// import { Session } from 'next-auth';
// import { getSession } from 'next-auth/react';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';
// import { FC, useEffect, useState } from 'react';

// interface PageProps {
//   params: {
//     chatId: string;
//   };
// }

// async function getChatMessages(chatId: string) {
//   try {
//     console.log("get chat messages function called in top");

//     const results: string[] = await fetchRedis(
//       'zrange',
//       `chat:${chatId}:messages`,
//       0,
//       -1
//     );

//     console.log("get chat messages function called");

//     const chatMessages = results.map((message) => JSON.parse(message) as Message);
//     const reversedChatMessages = chatMessages.reverse();

//     const messages = messageArrayValidator.parse(reversedChatMessages);
//     console.log("Inside getchatmessages");
//     return messages;
//   } catch (error) {
//     console.log("Error in get chat messages")
//     notFound();
//   }
// }

// const page: FC<PageProps> = ({ params }: PageProps) => {
//   const { chatId } = params;
//   const client = useStreamVideoClient();
//   const [values, setValues] = useState({
//     dateTime: new Date(),
//     description: '',
//     link: '',
//   });

//   const [callDetails, setCallDetails] = useState<Call>();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [chatPartner, setChatPartner] = useState<User | null>(null);
//   const [session, setSession] = useState<Session | null>(null);

//   useEffect(() => {
//     const fetchSession = async () => {
//       const session = await getSession();

//       if (!session) {
//         notFound();
//       }

//       setSession(session);
//     };

//     fetchSession();
//   }, []);

//   useEffect(() => {
//     if (!session) return;

//     const fetchData = async () => {
//       const user = session.user;
//       const [userId1, userId2] = chatId.split("--");

//       if (user.id !== userId1 && user.id !== userId2) {
//         notFound();
//       }

//       const chatPartnerId = user.id === userId1 ? userId2 : userId1;
//       const chatPartnerJSON = (await fetchRedis('get', `user:${chatPartnerId}`)) as string;
//       const chatPartner = JSON.parse(chatPartnerJSON) as User;

//       setChatPartner(chatPartner);

//       const messagesForGivenChatId = await getChatMessages(chatId);
//       console.log("Messaes for give chat id");
//       console.log(messagesForGivenChatId);
//       setMessages(messagesForGivenChatId);
//     };

//     fetchData();
//   }, [chatId, session]);

//   const createCall = async () => {
//     if (!client) return;

//     try {
//       const callId = crypto.randomUUID();
//       const call = client.call('default', callId);

//       if (!call) throw new Error('Failed to create a call');

//       const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
//       const description = values.description || 'Instant Call';

//       await call.getOrCreate({
//         data: {
//           starts_at: startsAt,
//           custom: {
//             description,
//           },
//         },
//       });

//       setCallDetails(call);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!chatPartner || !session) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
//       <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
//         <div className="relative flex items-center space-x-4">
//           <div className="relative">
//             <div className="relative w-8 sm:w-12 h-8 sm:h-12">
//               <Image
//                 fill
//                 referrerPolicy="no-referrer"
//                 src={chatPartner.image}
//                 alt={`${chatPartner.name} profile picture`}
//                 className="rounded-full"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col leading-tight">
//             <div className="text-xl flex items-center">
//               <span className="text-gray-700 mr-3 font-semibold">
//                 {chatPartner.name}
//               </span>
//             </div>

//             <span className="text-sm text-gray-600">{chatPartner.email}</span>
//           </div>
//         </div>

//         <div className="mr-6 mt-4" onClick={createCall}>
//           ABC
//         </div>
//       </div>

//       <Messages
//         chatId={chatId}
//         chatPartner={chatPartner}
//         sessionImg={session.user.image}
//         initialMessages={messages}
//         sessionId={session.user.id}
//       />
//       <ChatInput chatPartner={chatPartner} chatId={chatId} />
//     </div>
//   );
// };

// export default page;
