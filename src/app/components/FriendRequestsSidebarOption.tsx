'use client';

import { pusherClient } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import { User } from 'lucide-react';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

interface FriendRequestsSidebarOptionProps {
  initialUnseenRequestCount: number,
  sessionId: string // we will need for realtime functionality
}

const FriendRequestsSidebarOption: FC<FriendRequestsSidebarOptionProps> = ({ initialUnseenRequestCount, sessionId }: FriendRequestsSidebarOptionProps) => {

  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    initialUnseenRequestCount
  );

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`)); // listening to the event
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

    const friendRequestHandler = () => {
      setUnseenRequestCount((prev) => prev + 1);
    }

    const newFriendHandler = () => {
      setUnseenRequestCount((prev) => {
        if(prev > 0)
          return prev - 1 
        return prev;
      });
    }

    pusherClient.bind('incoming_friend_requests', friendRequestHandler); // execute a function when the event occurs
    pusherClient.bind('new_friend', newFriendHandler);

    // clean up
    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`))
      pusherClient.unbind('incoming_friend_requests', friendRequestHandler);
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));
      pusherClient.unbind('new_friend', newFriendHandler);
    }

  }, [sessionId])

  return <Link href='/dashboard/requests' className='text-white hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
    <div className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
        <User className='h-4 w-4' />
    </div>
    <p className='truncate'>Friend requests</p>

    {unseenRequestCount ? (
      <div className='rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-indigo-600'>
        {unseenRequestCount}
      </div>
    ): null}
  </Link>
}

export default FriendRequestsSidebarOption