'use client'

import React,{Suspense} from 'react'
import Link from 'next/link'
import signIn from '@/firebase/auth/signIn'
import { useRouter } from 'next/navigation'

const page = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter();
    const handleForm = async(e) => {
        e.preventDefault()
        const {result, error} = await signIn(email, password)
        if(error){
            return console.log(error)
        }
        console.log(result)
        return router.push('/admin')

    }
  return (
    <>
    <nav className='absolute top-4 left-3'>
        <span><Link href='/' className='link-btn'>Home</Link>/Sign in</span>
    </nav>
    <div className='wrap'>
        <h2 className='head'>sign In</h2>
        <form className='form-wrap' onSubmit={handleForm}>
            <label htmlFor='email'>Your email address</label>
            <input type='email' required placeholder='enter your email' id='email' name='email' onChange={(e)=>setEmail(e.target.value)}></input>
            <label htmlFor='password'>Your password</label>
            <input type='password' id='password' name='password' required placeholder='enter your password' onChange={(e)=>setPassword(e.target.value)}></input>
            <button type='submit' className='btn'>sign in</button>
        </form>
        <p className='mt-5'>Don't have an account? <Link href='/signup' className='link-btn'>sign up</Link></p>
    </div></>
  )
}

export default page