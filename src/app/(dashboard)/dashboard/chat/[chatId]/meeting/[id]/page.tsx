"use client";

import Loader from "@/app/components/Loader";
import MeetingRoom from "@/app/components/MeetingRoom";
import MeetingSetUp from "@/app/components/MeetingSetUp";
import { useGetCallById } from "@/hooks/useGetCallById";
import { StreamCall, StreamTheme, useCalls } from "@stream-io/video-react-sdk";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { chatId, id } = useParams();
  const searchParams = useSearchParams();
  const setUpComplete = searchParams.get('setUpComplete');

  console.log("Set up complete: " + setUpComplete);

  const [isSetUpComplete, setIsSetUpComplete] = useState<boolean>(setUpComplete === 'true');
  const { call, isCallLoading } = useGetCallById(id);
  const [session, setSession] = useState<Session>();
  const calls = useCalls();
  

  useEffect(() => {
    const fetchSession = async () => {
        const session = await getSession();
        setSession(session!);
    }

    fetchSession();
  }, []);

  if(isCallLoading || !session) {
    return <Loader />
  }

  const [userId1, userId2] = (chatId as string).split('--');

  const chatPartnerId = session.user.id === userId1 ? userId2 : userId1;

  // if(!session)
  //   throw new Error("You are not signed in yet");

  return (
    <main className="w-full h-[80vh] flex justify-center">
        {/* we know exactly which call we are in through the call instance */}
        <StreamCall call={call}> 
            <StreamTheme>
                {!isSetUpComplete ? (
                    <MeetingSetUp 
                      setIsSetUpComplete={setIsSetUpComplete} 
                      callId={id as string } 
                      callerId={session.user.id}
                      calleeId={chatPartnerId}
                    />
                ): (
                  <MeetingRoom call={call} />  
                )}
            </StreamTheme>
        </StreamCall>
    </main>
  )
};

export default Page;