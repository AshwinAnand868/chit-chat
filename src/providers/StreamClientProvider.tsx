'use client';

import { tokenProvider } from "@/actions/stream.actions";
// import Loader from "@/app/components/Loader";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { getSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeVideoClient = async () => {
      const session = await getSession();

      // if (!session) return NextResponse.redirect(new URL("/"));

      const user = session!.user;

      if (!user) return;
      if (!apiKey) throw new Error("Stream API key is missing");

      const client = new StreamVideoClient({
        apiKey,
        user: {
          id: user.id,
          name: user.name!,
          image: user.image!,
        },
        tokenProvider,
      });

      setVideoClient(client);
      setLoading(false);
    };

    initializeVideoClient();
  }, []);

  // if (loading || !videoClient) return <>'Loading....'</>;

  return <StreamVideo client={videoClient!}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
