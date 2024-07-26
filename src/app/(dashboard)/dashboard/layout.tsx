import FriendRequestsSidebarOption from "@/app/components/FriendRequestsSidebarOption";
import { Icons } from "@/app/components/Icons";
import MobileChatLayout from "@/app/components/MobileChatLayout";
import SidebarChatList from "@/app/components/SidebarChatList";
import SignOutButton from "@/app/components/SignOutButton";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { SidebarOption } from "@/types/typing";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode
}

const sidebarOptions: SidebarOption[] = [
    {
        id: 1,
        name: 'Add Friend',
        href: '/dashboard/add',
        Icon: 'UserPlus'
    },
]

const Layout = async ({ children }: LayoutProps) => {

    const session = await getServerSession(authOptions);

    if (!session) notFound(); // if not session, then not found. This is the last resort, for example if we have not used the middleware correctly. 

    const unseenRequestCount = (await fetchRedis('smembers', `user:${session.user.id}:incoming_friend_requests`) as User[]).length

    const friends = await getFriendsByUserId(session.user.id);

    // overflow-y-auto means if the height is too large, then there's gonna be a scrollbar 
    return (
        <div className="w-full h-[89.7vh] flex">
            <div className="md:hidden">
                <MobileChatLayout friends={friends} session={session} sidebarOptions={sidebarOptions} unseenRequestCount={unseenRequestCount} />
            </div>
            <div className='hidden md:flex h-full w-full max-w-[20.9rem] grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden border-r border-gray-200 bg-red-400 px-6 text-white'>
                {/* <Link href='/dashboard' className='flex h-16 shrink-0 items-center'>
                    <Icons.Logo className='h-8 w-auto text-indigo-600' />
                </Link> */}
                {friends.length > 0 ? (<div className="text-indigo-600 text-lg sm:text-xl font-bold mt-4 leading-6">
                    Your chats
                </div>) :  (<div className="text-indigo-600 text-lg sm:text-xl font-bold mt-4 leading-6">
                    Your chats will display here
                </div>)}

                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-col flex-1 gap-y-7">
                        <li>
                            <SidebarChatList sessionId={session.user.id} friends={friends} />
                        </li>
                        <li>
                            <div className="text-indigo-600 text-lg sm:text-xl font-bold mt-4 leading-6">
                                Overview
                            </div>

                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {sidebarOptions.map((option) => {
                                    const Icon = Icons[option.Icon];

                                    return (
                                        <li key={option.id}>
                                            <Link
                                                href={option.href}
                                                className="text-white hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                            >
                                                <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                                                    <Icon className="h-4 w-4" />
                                                </span>
                                                {/* truncate means show ... when the width is less */}
                                                <span className="truncate">
                                                    {option.name}
                                                </span>
                                            </Link>
                                        </li>
                                    )
                                })}

                                <li>
                                    <FriendRequestsSidebarOption sessionId={session.user.id} initialUnseenRequestCount={unseenRequestCount} />
                                </li>

                            </ul>
                        </li>



                        <li className='-mx-6 mt-auto flex items-center'>
                            <div className='flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white'>
                                <div className='relative h-8 w-8 bg-gray-50 rounded-full'>
                                    <Image
                                        fill
                                        referrerPolicy='no-referrer'
                                        className='rounded-full'
                                        src={session.user.image || ''}
                                        alt='Your profile picture'
                                    />
                                </div>

                                <span className='sr-only'>Your profile</span>
                                <div className='flex flex-col'>
                                    <span aria-hidden='true'>{session.user.name}</span>
                                    <span className='text-xs' aria-hidden='true'>
                                        {session.user.email}
                                    </span>
                                </div>
                            </div>

                            <SignOutButton className='h-full aspect-square' />
                        </li>
                    </ul>
                </nav>
            </div>

            {/* {children} */}


            <aside className="max-h-screen container py-16 md:py-12 w-full">
                {children}
            </aside>
        </div>
    );
}

export default Layout;