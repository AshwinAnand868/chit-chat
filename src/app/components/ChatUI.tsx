"use client";

import ChatInput from "@/app/components/ChatInput";
import Messages from "@/app/components/Messages";
import { pusherClient } from "@/lib/pusher";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaVideo } from "react-icons/fa";
import IncomingCallToast from "./IncomingCallToast";

interface ChatUIProps {
  chatId: string;
  chatPartner: User;
  session: Session;
  initialMessages: Message[];
}

const ChatUI: FC<ChatUIProps> = ({
  chatId,
  chatPartner,
  session,
  initialMessages,
}) => {
  const client = useStreamVideoClient();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [callDetails, setCallDetails] = useState<Call | null>(null);
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const router = useRouter();
  const [userId1, userId2] = chatId.split("--");
  const chatPartnerId = session.user.id === userId1 ? userId2 : userId1;

  useEffect(() => {
    const calleeId = chatPartnerId; // Assuming the current user's ID is the calleeId

    const channel = pusherClient.subscribe(`user-${calleeId}`);

    const incomingCallHandler = (data: {
      callId: string;
      callerId: string;
    }) => {
      toast.custom((t) => <IncomingCallToast t={t} chatId={chatId} callId={data.callId} calleeId={calleeId} />);
    };

    channel.bind("incoming-call-event", incomingCallHandler);

    return () => {
      pusherClient.unsubscribe(`user-${calleeId}`);
    };
  }, [chatPartnerId]);

  const createCall = async () => {
    if (!client) return;

    try {
      const callId = crypto.randomUUID();
      const call = client.call("default", callId);

      if (!call) throw new Error("Failed to create a call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Call";

      console.log("user id 1");
      console.log(userId1);

      console.log("user id 2");
      console.log(userId2);

      const response = await fetch("/api/create-stream-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId1, userId2 }),
      });

      if (!response.ok) {
        throw new Error("Failed to create stream users");
      }

      await call.getOrCreate({
        ring: true,
        // notify: true,
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
          members: [
            {
              user_id: userId1,
            },
            {
              user_id: userId2,
            },
          ],
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/dashboard/chat/${chatId}/meeting/${call.id}?setUpComplete=false`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative w-8 sm:w-12 h-8 sm:h-12">
            <Image
              fill
              referrerPolicy="no-referrer"
              src={chatPartner.image}
              alt={`${chatPartner.name} profile picture`}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-xl flex items-center">
              <span className="text-gray-700 mr-3 font-semibold">
                {chatPartner.name}
              </span>
            </div>
            <span className="text-sm text-gray-600">{chatPartner.email}</span>
          </div>
        </div>
        <div className="mr-6 mt-4 cursor-pointer" onClick={createCall}>
          <FaVideo className="w-7 h-7 text-indigo-600 hover:text-indigo-500" />
        </div>
      </div>

      <Messages
        chatId={chatId}
        chatPartner={chatPartner}
        sessionImg={session.user.image}
        initialMessages={messages}
        sessionId={session.user.id}
      />
      <ChatInput chatPartner={chatPartner} chatId={chatId} />
    </div>
  );
};

export default ChatUI;
