import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface loadingProps {
  
}

const loading: FC<loadingProps> = ({}) => {
  return <div className='w-full flex flex-col gap-3 items-center justify-center'>
    <Skeleton className='mb-4 bg-gray-500' height={60} width={450} />
    <Skeleton className="bg-gray-500" height={50} width={350} />
    <Skeleton className='bg-gray-500' height={50} width={350} />
    <Skeleton className='bg-gray-500' height={50} width={350} />
  </div>
}

export default loading