import { getFriendsByUserId } from '@/helpers/get-friends-by-user-id';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { chatHrefConstructor } from '@/lib/utils';
import { Message } from '@/lib/validators/message';
import { ChevronRight } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { NextResponse } from 'next/server';

interface pageProps {
  
}

const page = async ({}) => {
  const session = await getServerSession(authOptions);

  if(!session)
    return NextResponse.redirect(new URL('/'));

  const friends = await getFriendsByUserId(session.user.id);

  const friendsWithLastMessage = await Promise.all(
     friends.map(async (friend) => {
      const [rawLastMessage] = (await fetchRedis(
        'zrange', 
        `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
        -1,
        -1)) as string[];

      // if there is no previous chat for that friend, then return a mock object
      if(!rawLastMessage) return {
        ...friend,
        lastMessage: {
          senderId: '',
          text: ''
        }
      }

      const lastMessage = JSON.parse(rawLastMessage) as Message;

      return {
        ...friend,
        lastMessage,
      }
    })
  )

  return <div className='py-6 container px-[10px]'>
    <h1 className='font-bold text-xl sm:text-3xl lg:text-4xl mb-10 text-indigo-600 text-center'>Recent chats</h1>
    {friendsWithLastMessage.length === 0 ? (
      <p className='font-bold text-xl sm:text-3xl text-indigo-600 text-center'>You don&apos;t have any chats yet</p>
    ) : 
    friendsWithLastMessage.map((friend) => (
      <div key={friend.id} className='relative bg-red-400 text-white border-zinc-200 p-3 rounded-md mb-4'>
        <div className='absolute right-1 sm:right-4 inset-y-0 flex items-center'>
          <ChevronRight className='h-7 w-7 text-white' />
        </div>

        <Link href={`/dashboard/chat/${chatHrefConstructor(
          session.user.id,
          friend.id
        )}`} className='relative flex'>
          <div className='mb-4 flex-shrink-0 mr-3 sm:mr-4 flex items-center justify-center'>
            <div className='relative h-10 w-10'>
              <Image 
                referrerPolicy='no-referrer'
                className='rounded-full' 
                alt={`${friend.name} profile picture`} 
                src={friend.image} fill
              />
            </div>
          </div>

          <div>
            <h4 className='text-lg font-semibold'>{friend.name}</h4>
            <p className='mt-1 max-w-md'>
              <span className='text-zinc-400'>
                {friend.lastMessage.senderId === session.user.id
                  ? 'You: '
                  : ''}
              </span>
              {friend.lastMessage.text}
            </p>
          </div>
        </Link>
        {/* <div className='bg-white w-full h-3'></div> */}
      </div>
    ))}
  </div>
}

export default page;