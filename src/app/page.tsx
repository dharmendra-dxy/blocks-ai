import Image from 'next/image'
import React from 'react'

const HomePage = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <div>
      <Image
        src={"/logo.png"}
        alt='logo'
        height={98}
        width={98}
      />
      </div>
    </div>
  )
}

export default HomePage