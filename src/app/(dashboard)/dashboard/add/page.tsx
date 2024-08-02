import AddFriendButton from "@/app/components/AddFriendButton";
import { FC } from "react";

const Page: FC = () => {
  // the page should not worry about implementation details - separation of concerns

  // await new Promise((resolve) => setTimeout(resolve, 5000)); loading state test

  return (
    <div className="flex items-center justify-center overflow-hidden rounded-xl">
      <main className="flex flex-col justify-center items-center gap-6 bg-white rounded-xl p-10 w-[350px] md:w-[500px]">
        <h1 className="font-bold text-2xl sm:text-5xl mb-8 text-indigo-600">
          Add a friend
        </h1>
        <AddFriendButton />
      </main>
    </div>
  );
};

export default Page;
