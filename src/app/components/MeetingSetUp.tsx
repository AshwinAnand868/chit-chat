"use client";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import {
  CallControls,
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "./ui/Button";

interface MeetingSetUpProps {
  setIsSetUpComplete: (value: boolean) => void;
  callerId: string;
  calleeId: string;
  callId: string;
}

const MeetingSetUp = ({
  setIsSetUpComplete,
  callerId,
  calleeId,
  callId,
}: MeetingSetUpProps) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState<boolean>(false);

  const call = useCall();

  if (!call) {
    throw new Error("useCall can only be used inside StreamCall components!");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggledOn, call.camera, call.microphone]);

  const handleMakeCall = async () => {
    setIsSetUpComplete(true);

    try {
      await fetch("/api/notify-incoming-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ calleeId, callId, callerId }),
      });
    } catch (error) {
      console.log(`Unable to set up the call ${error}`);
      toast.error("Couldn't make the call");
    }

    // await call.join();
  };

  return (
    <div className="flex items-center justify-center flex-col w-[50vw] h-[80vh] gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-auto items-center justify-center gap-2 font-medium flex-col">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <div className="flex flex-row gap-4 w-full items-center justify-center">
          <DeviceSettings />
          <CallControls />
        </div>
        <Button
          className="rounded-md py-6 px-8"
          onClick={handleMakeCall}
          type="submit"
        >
          Make the call
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetUp;
