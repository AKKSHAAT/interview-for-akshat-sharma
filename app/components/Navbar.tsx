import Image from 'next/image'
import React from 'react'

const  Navbar = () => {
  return (
    <div className='border-b-3 border-gray-200 min-h-20 w-full flex items-center justify-center' >
        <Image src={'/logoBig.svg'}  alt='space x logo' width={260} height={32} priority />
    </div>
  )
}

export default  Navbar