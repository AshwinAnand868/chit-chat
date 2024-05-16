'use client'

import { pusherClient } from '@/lib/pusher';
import { chatHrefConstructor, toPusherKey } from '@/lib/utils';
import { Message } from '@/lib/validators/message';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UnseenChatToast from './UnseenChatToast';

interface SidebarChatListProps {
    sessionId: string,
    friends: User[]
}

interface ExtendedMessage extends Message {
    senderImg: string,
    senderName: string
}

const SidebarChatList: FC<SidebarChatListProps> = ({ sessionId, friends }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (pathname.includes('chat')) {
            setUnseenMessages((prev) => {
                return prev.filter((msg) => !pathname.includes(msg.senderId))
            });
        }
    }, [pathname])

    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

        const newMessageHandler = (extendedMessage: ExtendedMessage) => {
            console.log("new chat message", extendedMessage);
            
            const shouldNotify = pathname !== `/dashboard/chat/${chatHrefConstructor(sessionId, extendedMessage.senderId)}`;

            if(!shouldNotify) return;

            // notify the user
            toast.custom((t) => (
                // return a component
                <UnseenChatToast 
                    t={t}
                    sessionId={sessionId}
                    senderId={extendedMessage.senderId} 
                    senderImage={extendedMessage.senderImg}
                    senderMessage={extendedMessage.text} 
                    senderName={extendedMessage.senderName}
                />
            ));

            setUnseenMessages((prev) => [...prev, extendedMessage])
        }

        const newFriendHandler = () => {
            router.refresh();
        }

        pusherClient.bind('new_message', newMessageHandler);
        pusherClient.bind('new_friend', newFriendHandler);

        return () => {
            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`)); // for any chats this user have, we will listen to the message from all chats of this user
            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

            pusherClient.unbind('new_message', newMessageHandler);
            pusherClient.unbind('new_friend', newFriendHandler);
        }

    }, [pathname, sessionId, router]); // add the variables as dependencies because we are getting their values out of useEffect hook

    return (
        <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
            {friends.sort().map((friend) => {
                const unseenMessagesCount = unseenMessages.filter((unseenMessage) => {
                    return unseenMessage.senderId === friend.id
                }).length; // how many unseen messages are there just for this friend

                // why anchor tag below rather than link tag - because we need to get the all recent messages for this friend
                // by doing the hard refresh
                return (
                    <li key={friend.id}>
                        <a href={`/dashboard/chat/${chatHrefConstructor(
                            sessionId,
                            friend.id
                        )}`}
                        className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
                            {friend.name}
                            {unseenMessagesCount ? (
                                <div className='rounded-full w-5 h-5 font-medium text-xs flex justify-center items-center text-white bg-indigo-600'>
                                    {unseenMessagesCount}
                                </div>
                            ) : null}
                        </a>
                    </li>
                )
            })}
        </ul>
    );
}

export default SidebarChatList