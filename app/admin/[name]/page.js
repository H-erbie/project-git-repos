'use client'
import Link from 'next/link'
import React, { Suspense } from 'react'

const page = ({params}) => {
  return (
    <>

    <nav className='absolute top-4 left-3'>
        <span><Link href='/admin' className='link-btn'>Admin</Link>/{params.name}</span>
    </nav>
    <div className='wrap head link-btn'>{params.name}</div>

    </>
  )
}

export default page