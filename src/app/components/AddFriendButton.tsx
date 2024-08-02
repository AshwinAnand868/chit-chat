"use client";

import { addFriendValidator } from "@/lib/validators/add-friend";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./ui/Button";

type FormData = z.infer<typeof addFriendValidator>;

interface AddFriendButtonProps {}

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      setShowSuccessState(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        return;
      }

      setError("email", { message: "Something went wrong." });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-indigo-600"
      >
        Enter their email
      </label>
      <div className="mt-1 flex gap-2 flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center w-auto sm:w-full">
          <input
            {...register("email")}
            type="text"
            className="inline rounded-md border-0 py-1.5 text-indigo-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="abc@xyz.com"
          />
          <p className="mt-1 text-red-600 text-center text-sm md:text-[16px]">
            {errors.email?.message}
          </p>
        </div>
        {/* button is submit by default */}
        <Button className="text-indigo-600 bg-white w-full text-[16px] md:text-lg hover:bg-indigo-600 hover:text-white mt-4">
          Add
        </Button>
      </div>
      {showSuccessState ? (
        <p className="mt-1 text-sm text-green-600">Friend request sent!</p>
      ) : null}
    </form>
  );
};

export default AddFriendButton;
