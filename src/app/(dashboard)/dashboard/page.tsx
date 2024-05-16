import { getFriendsByUserId } from '@/helpers/get-friends-by-user-id';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { chatHrefConstructor } from '@/lib/utils';
import { Message } from '@/lib/validators/message';
import { ChevronRight } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface pageProps {
  
}

const page = async ({}) => {
  const session = await getServerSession(authOptions);

  if(!session)
    return notFound();

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

  return <div className='py-12 container'>
    <h1 className='font-bold text-5xl mb-8'>Recent chats</h1>
    {friendsWithLastMessage.length === 0 ? (
      <p className='text-sm text-zinc-500'>You don&apos;t have any chats yet</p>
    ) : 
    friendsWithLastMessage.map((friend) => (
      <div key={friend.id} className='relative bg-zinc-50 border-zinc-200 p-3 rounded-md'>
        <div className='absolute right-4 inset-y-0 flex items-center'>
          <ChevronRight className='h-7 w-7 text-zinc-400' />
        </div>

        <Link href={`/dashboard/chat/${chatHrefConstructor(
          session.user.id,
          friend.id
        )}`} className='relative sm:flex'>
          <div className='mb-4 flex-shrink-0 sm:mb-0 sm:mr-4 flex items-center justify-center'>
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