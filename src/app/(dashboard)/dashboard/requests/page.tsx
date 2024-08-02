import FriendRequests from "@/app/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

const Page: FC = async ({}) => {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  // fetch the ids of people who sent the friend requests
  const requestsIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  // now the below method will cost us performance because for each id, we are making a request to the database
  // const requestsEmails = requestsIds.map(async (requestId) => {
  //     return await fetchRedis('get', `user:${requestId}`);
  // });

  // we can avoid the above problem, by using Promise.all which allows us to make simaltaneous calls to the db
  // await an array of promises
  const requests = await Promise.all(
    requestsIds.map(async (senderId) => {
      const requestDetailsJSON = (await fetchRedis(
        "get",
        `user:${senderId}`
      )) as string;

      const requestDetails = JSON.parse(requestDetailsJSON) as User;

      return {
        senderId,
        senderEmail: requestDetails.email,
      };
    })
  );

  return (
    // flex items-center flex-col w-full
    <div className="flex items-center justify-center overflow-hidden rounded-xl">
      <main className="p-8 bg-white rounded-xl">
      <h1 className="font-bold text-2xl sm:text-5xl mb-8 text-indigo-600">
          Friend Requests
        </h1>
        <div className="flex flex-col gap-4 w-full text-indigo-600">
          <FriendRequests
            incomingFriendRequests={requests}
            sessionId={session.user.id}
          />
        </div>
      </main>
    </div>
  );
};

export default Page;
