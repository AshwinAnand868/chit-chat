import AddFriendButton from '@/app/components/AddFriendButton'
import { FC } from 'react'

const Page: FC = () => {

    // the page should not worry about implementation details - separation of concerns
  return (
    <main className='pt-8'>
        <h1 className='font-bold text-5xl mb-8'>Add a friend</h1>
        <AddFriendButton />
    </main>
  )
}

export default Page