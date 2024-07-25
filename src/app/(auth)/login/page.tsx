"use client";

import Button from "@/app/components/ui/Button";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { FaFacebookF } from "react-icons/fa";
import 'semantic-ui-css/components/popup.min.css';
import { Popup } from "semantic-ui-react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [isLoadingG, setIsLoadingG] = useState<boolean>(false);
  const [isLoadingF, setIsLoadingF] = useState<boolean>(false);

  async function loginWithGoogle() {
    setIsLoadingG(true);

    try {
      await signIn("google");
    } catch (error) {
      toast.error("Something went wrong while logging");
    } finally {
      setIsLoadingG(false);
    }
  }

  async function loginWithFacebook() {
    setIsLoadingF(true);

    try {
      await signIn("facebook");
    } catch (error) {
      toast.error("Something went wrong while logging");
    } finally {
      setIsLoadingG(false);
    }
  }

  return (
    <>
      <main className="flex flex-col justify-center items-center h-[89.5vh] py-2 bg-gray-100">
        <div className="bg-white rounded-2xl shadow-2xl w-[90%] md:w-2/3 max-w-4xl flex flex-col sm:flex-row overflow-auto sm:overflow-hidden mt-8 sm:mt-0">
          <div className="w-full md:w-[52%] p-5">
            <div className="font-bold text-left text-xl md:text-2xl">
              <span className="text-red-500">Chit</span>
              <span className="text-black">Chat</span>
              <span className="text-red-500">Chit</span>
            </div>
            <div className="py-10">
              <h2 className="text-xl md:text-2xl text-red-500 font-bold mb-2 text-center">
                Sign in or create an account with:
              </h2>
              <div className="border-[2px] md:border-[3px] w-16 md:w-20 border-red-500 mb-6 md:mb-4 mx-auto rounded-xl"></div>
              <div className="flex flex-col items-center justify-center my-10 space-y-12">
                <Button
                  isLoading={isLoadingG}
                  type="button"
                  className="max-w-sm mx-auto w-[70%]"
                  onClick={loginWithGoogle}
                  variant={"loginbtn"}
                  size={"xl"}
                >
                  {isLoadingG ? null : (
                    <svg
                      className="mr-2 h-7 w-8 p-1 bg-white rounded-full"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="github"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  )}
                  Google
                </Button>

                <Popup
                  trigger={
                    <Button
                      isLoading={isLoadingF}
                      type="button"
                      className="max-w-sm mx-auto w-[70%] bg-red-300"
                      onClick={() => {}}
                      variant={"loginbtn"}
                      size={"xl"}
                    >
                      {isLoadingF ? null : (
                        <span className="rounded-full h-7 w-8 bg-white mr-2 p-1">
                          <FaFacebookF className="text-blue-600 h-5 w-6" />
                        </span>
                      )}
                      Facebook
                    </Button>
                  }
                  content="Feature not available yet"
                  position="bottom center"
                />

                {/* <Button
                  isLoading={isLoading}
                  type="button"
                  className="max-w-sm mx-auto w-[70%]"
                  onClick={loginWithGoogle}
                  variant={'loginbtn'}
                  size={'xl'}
                >
                  {isLoading ? null : (
                    <span className="rounded-full h-7 w-8 bg-white mr-2 p-1"><FaLinkedinIn className="text-[#0077B5] h-5 w-6"/></span>
                  )}
                  LinkedIn
                </Button> */}
              </div>
            </div>
          </div>
          <div className="w-full md:w-[48%] bg-gradient-to-br from-red-600 via-orange-400 to-yellow-300 text-white rounded-tr-2xl rounded-br-2xl flex flex-col justify-center items-center py-24 md:py-36 px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
              Welcome!
            </h2>
            <div className="border-[2px] md:border-[3px] w-16 md:w-20 border-white block mb-6 md:mb-4 mx-auto rounded-xl"></div>
            <p className="mb-4 md:mb-2 text-center">
              Connect with your friends and family easily:
            </p>
            <ul className="list-disc pl-5 space-y-4 md:space-y-2 mb-4 text-center">
              <li>Fast and Secure Sign In</li>
              <li>Experience seamless communication</li>
              <li>Engage in real-time conversations</li>
            </ul>
            <p className="text-center">
              Dive into vibrant chats and stay in touch effortlessly!
            </p>
          </div>
        </div>
      </main>

      {/* <div className='flex min-h-full h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full flex flex-col items-center max-w-md space-y-8'>
            <div className='flex flex-col items-center gap-8'>
              <Icons.Logo className='h-16 w-auto text-indigo-600' />
                <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                    Sign in to your account</h2>
            </div>
            <Button isLoading={isLoading} type='button'
                className='max-w-sm mx-auto w-full'
                onClick={loginWithGoogle}
            >
                {isLoading ? null : (
                    <svg
                    className='mr-2 h-4 w-4'
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fab'
                    data-icon='github'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'>
                    <path
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                      fill='#4285F4'
                    />
                    <path
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                      fill='#34A853'
                    />
                    <path
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                      fill='#FBBC05'
                    />
                    <path
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                      fill='#EA4335'
                    />
                    <path d='M1 1h22v22H1z' fill='none' />
                  </svg>
                )}
              Google
            </Button>
        </div>
    </div> */}
    </>
  );
};

export default Page;
