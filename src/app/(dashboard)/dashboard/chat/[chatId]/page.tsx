import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { messageArrayValidator } from '@/lib/validators/message'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface PageProps {
  params: {
    chatId: string
  }
}

async function getChatMessages(chatId: string) {

  try {
    const results: string[] = await fetchRedis(
      'zrange',
      `chat:${chatId}:messages`,
      0,
      -1
    )

    const chatMessages = results.map((message) => JSON.parse(message) as Message);

    const reversedChatMessages = chatMessages.reverse();

    // validate the message to see if they are in the correct format as we expect

    const messages = messageArrayValidator.parse(reversedChatMessages);

    return messages;

  } catch (error) {
    notFound();
  }

}

// this page will be dynamic - which means that this page will display the chat of a user by taking the name of the chat from URL

const page: FC<PageProps> = async ({ params }: PageProps) => {

  const {chatId} = params;
  const session = await getServerSession(authOptions);

  if(!session) {
    notFound();
  }

  const {user} = session;

  const [userId1, userId2] = chatId.split("--");

  if(user.id !== userId1 && user.id !== userId2) {
    notFound();
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartner = (await fetchRedis('get', `user:${chatPartnerId}`)) as User;
  const messagesForGivenChatId = await getChatMessages(chatId);




  return <div>{params.chatId}</div>
}

export default page