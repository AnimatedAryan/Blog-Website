import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
const Signup = () => {
  return (
    <div className='min-h-screen mt-20 '>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1">
        <Link to="/" className='text-4xl font-bold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg text-white'>Aryan's</span>
         Blog
        </Link>
         <p className='text-xl mt-5'>
          Signup for Amazing Blogs!!
         </p>
        </div>
        {/*right */}
        <div className="flex-1">
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Username' />
              <TextInput
              type='text'
              placeholder='Username'
              id='username'/>
            </div>
            <div>
              <Label value='Email' />
              <TextInput
              type='text'
              placeholder='Email'
              id='email'/>

            </div>
            <div>
              <Label value='Password' />
              <TextInput
              type='text'
              placeholder='Password'
              id='password'/>

            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
            Sign-in 
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Signup