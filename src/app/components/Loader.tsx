import Image from 'next/image'

const Loader = () => {
  return (
    <div className='flex h-screen items-center justify-center w-full'>
      <Image
        src="/loading-circle.svg"
        alt="Loading"
        width={50}
        height={50}
      />
    </div>
  )
}

export default Loader