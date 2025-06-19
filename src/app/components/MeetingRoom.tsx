"use client";

import { chatHrefConstructor } from "@/lib/utils";
import {
  Avatar,
  Call,
  CallControls,
  CallingState,
  CancelCallButton,
  IconButton,
  RingingCall,
  ScreenShareButton,
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  useCallStateHooks
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import "@stream-io/video-react-sdk/dist/css/styles.css";

interface MeetingRoomProps {
  call: Call | undefined
}

const MeetingRoom = ({call}: MeetingRoomProps) => {
  // const calls = useCalls();

  // handle incoming ring calls
  // const incomingCalls = calls.filter((call: Call) => {
  //   call.isCreatedByMe === false &&
  //     call.state.callingState === CallingState.RINGING;

  //   console.log(call.isCreatedByMe);
  // });

  const { useParticipants, useCallMembers, useCallCallingState } =
    useCallStateHooks();
  const participants = useParticipants();
  const members = useCallMembers();
  // const call = useCall();
  const router = useRouter();
  const callingState = useCallCallingState();
  // const call = useCall();

  // // show ringing call panel components only before the call is joined
  // if (![CallingState.RINGING, CallingState.JOINING].includes(callingState))
  //   return null;

  useEffect(() => {

    if (!call) return;

    const joinCall = async () => {
      if(call && !call.isCreatedByMe) {
        try {
          await call.join();
        } catch(error) {
          console.error("Failed to join the call", error);
        }
      }

      if(call && call.isCreatedByMe) {
        try {
          await call.join();
        } catch(error) {
          console.error("Failed to join the call", error);
        }
      }
    }

    joinCall();
  }, [callingState, call]);

  // console.log("Participants....");
  // console.log(participants);

  // console.log("Members....");
  // console.log(members);

  // const [incomingCall] = incomingCalls;
  // if (incomingCall) {
  //   // render the incoming call UI
  //   return (
  //     <>
  //       <RingingCall />
  //       <RingingCallControls />
  //     </>
  //   );
  // }

  // const outgoingCalls = calls.filter(
  //   (call) =>
  //     call.isCreatedByMe === true &&
  //     call.state.callingState === CallingState.RINGING
  // );

  // const [outgoingCall] = outgoingCalls;
  // if (outgoingCall) {
  //   // render the outgoing call UI
  //   return (
  //     <>
  //       <RingingCall />
  //       <RingingCallControls />
  //     </>
  //   );
  // }

  // const buttonsDisabled = callingState === CallingState.RINGING;

  if (CallingState.JOINED === callingState) {
    return (
      <div className="w-[50vw] h-auto text-white">
        {/* <PaginatedGridLayout groupSize={2} /> */}
        <div className="flex flex-row gap-3">
          {members.map((m) => (
            <div key={m.user.id}>
              <p>{m.user.id}</p>
              <Avatar name={m.user.name} imageSrc={m.user.image} />
              {m.user.name && (
                <div>
                  <span>{m.user.name}</span>
                </div>
              )}
              {/* <VideoPreview className="w-[200px] h-[200px]"/> */}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-8">
          <ScreenShareButton />
          <SpeakingWhileMutedNotification>
            <ToggleAudioPublishingButton />
          </SpeakingWhileMutedNotification>
          <ToggleVideoPublishingButton />
          <CancelCallButton
            onClick={async () => {
              await call!.leave();
              router.replace(
                `/dashboard/chat/${chatHrefConstructor(
                  members[0].user.id,
                  members[1].user.id
                )}`
              );
            }}
          />
        </div>
      </div>
    );
  } else if (
    [CallingState.RINGING, CallingState.JOINING].includes(callingState)
  ) {
    return (
      <div>
        <RingingCall />
        <CancelCallButton
            onClick={() => {
              router.replace(
                `/dashboard/chat/${chatHrefConstructor(
                  members[0].user.id,
                  members[1].user.id
                )}`
              );
            }}
          />
        <CallControls />
      </div>
    );
  }

  // return (
  //   <div className="flex items-center justify-center flex-col w-[50vw] h-auto gap-3 text-white">
  //     {/* <ToggleAudioButton />
  //     <ToggleVideoButton />
  //     <RingingCall /> */}
  //     {/* {call.isCreatedByMe ? (
  //       <>
  //       <RingingCall />
  //       <RingingCallControls />
  //       <CancelCallButton
  //       onClick={() => {
  //         call.leave({ reject: true })
  //         router.replace(`/dashboard/chat/${chatHrefConstructor(members[0].user.id, members[1].user.id)}`);
  //       }}
  //       disabled={buttonsDisabled}
  //     />
  //     </>
  //     ) : (
  //       <>
  //         <AcceptCallButton disabled={buttonsDisabled} />
  //         <CancelCallButton
  //           onClick={() => {
  //             call.leave({ reject: true })
  //             router.replace(`/dashboard/chat/${chatHrefConstructor(members[0].user.id, members[1].user.id)}`);
  //           }}
  //           disabled={buttonsDisabled}
  //         />
  //       </>
  //     )} */}
  //     {/* <RingingCall /> */}
  //     {/* {participants.map((p) => (
  //         <ParticipantView participant={p} key={p.sessionId} />
  //       ))} */}
  //   </div>
  // );
};

const ToggleAudioButton = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();
  return (
    <IconButton
      icon={isMute ? "mic-off" : "mic"}
      onClick={() => microphone.toggle()}
    />
  );
};

const ToggleVideoButton = () => {
  const { useCameraState } = useCallStateHooks();
  const { camera, isMute } = useCameraState();
  return (
    <IconButton
      icon={isMute ? "camera-off" : "camera"}
      onClick={() => camera.toggle()}
    />
  );
};

export default MeetingRoom;
