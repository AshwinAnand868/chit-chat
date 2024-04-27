"use client";

import axios from "axios";
import { Check, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const router = useRouter();

  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  const acceptFriend = async (requestId: string) => {
    await axios.post("/api/requests/accept", { id: requestId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.requestId !== requestId)
    );

    router.refresh();
  };

  const denyFriend = async (requestId: string) => {
    await axios.post("/api/requests/deny", { id: requestId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.requestId !== requestId)
    );

    router.refresh();
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg text-zinc-500">No Requests yet 🙁</p>
        </div>
      ) : (
        friendRequests.map((request) => (
          <div key={request.requestId} className="flex gap-4 items-center">
            <UserPlus className="text-black" />
            <p className="font-medium text-lg">{request.requestEmail}</p>
            <button
              aria-label="accept friend"
              className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
              onClick={() => acceptFriend(request.requestId)}
            >
              <Check className="font-semibold text-white w-3/4 h-3/4" />
            </button>
            <button
              aria-label="deny friend"
              className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
              onClick={() => denyFriend(request.requestId)}
            >
              <X className="font-semibold text-white w-3/4 h-3/4" />
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
