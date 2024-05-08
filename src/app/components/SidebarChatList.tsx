'use client'

import { chatHrefConstructor } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface SidebarChatListProps {
    sessionId: string,
    friends: User[]
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

    return (
        <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
            {friends.sort().map((friend) => {
                const unseenMessagesCount = unseenMessages.filter((unseenMessage) => {
                    return unseenMessage.senderId === friend.id
                }).length; // how many unseen messages are there just for this friend

                // why anchor tag below rather than link tag - because we need to get the all recent messages for this friend
                // by doing the hard refresh
                return <li key={friend.id}>

                    <a href={`/dashboard/chat/${chatHrefConstructor(
                        sessionId,
                        friend.id
                    )}`}>{friend.name}</a>

                </li>
            })}
        </ul>
    );
}

export default SidebarChatList