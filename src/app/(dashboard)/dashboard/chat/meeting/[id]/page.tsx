"use client";

import MeetingRoom from "@/app/components/MeetingRoom";
import MeetingSetUp from "@/app/components/MeetingSetUp";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { getSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";

const Page = async () => {
  const { id } = useParams();
  const session = await getSession();
  const [isSetUpComplete, setisSetUpComplete] = useState<boolean>(false);

  if(!session)
    throw new Error("You are not signed in yet");

  return (
    <main className="w-full h-screen">
        <StreamCall>
            <StreamTheme>
                {!isSetUpComplete ? (
                    <MeetingSetUp />
                ): (
                    <MeetingRoom />
                )}
            </StreamTheme>
        </StreamCall>
    </main>
  )
};

export default Page;
