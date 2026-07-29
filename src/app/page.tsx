import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full gap-6'>
      <div>
        <Image
          src={"/logo.png"}
          alt='logo'
          height={98}
          width={98}
        />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-foreground">
          Blocks AI
        </h1>
        <p className="mt-2 text-muted-foreground">
          Real-time collaborative system design workspace
        </p>
      </div>
      <Link
        href="/editor"
        className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors"
      >
        Open Editor
      </Link>
    </div>
  )
}

export default HomePage