import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { signInSuccess,signInFailure,signInStart } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'
const Signin = () => {
  const [FormData,setFormData]=useState({});
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {loading,error: errorMessage}=useSelector(state=>state.user);
  const handleChange=(e)=>{
     setFormData({...FormData,[e.target.id]:e.target.value.trim()});
  };
  const handleSubmit=async(e)=>{
   e.preventDefault();   //to prevent page from refreshing every time i submit
   if(!FormData.password||!FormData.email)
   {
      return dispatch(signInFailure('Please fill all the fields'));
   }
   try{
    dispatch(signInStart());
    const res=await fetch('/api/auth/signin',{                                                     //proxy used in vite settings
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(FormData),
    });
    const data=await res.json();
    if(data.success==false)
    {
           dispatch(signInFailure(data.message));
    }
    if(res.ok)
    {  dispatch(signInSuccess(data));
      navigate('/');
    }
   }catch(error){
     dispatch(signInFailure(error.message));
   }
  };

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
          Signin for Amazing Blogs!!
         </p>
        </div>
        {/*right */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Email' />
              <TextInput
              type='email'
              placeholder='Email'
              id='email' onChange={handleChange}/>

            </div>
            <div>
              <Label value='Password' />
              <TextInput
              type='Password'
              placeholder='Password'
              id='password' onChange={handleChange}/>

            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              { 
                loading?(
                  <>
                   <Spinner size='sm' />
                   <span className='pl-3'>Loading...</span>   
                  </>
                ):'SignIn'
                                                    //spinner here
               
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
            Sign Up
            </Link>
          </div>
          {
          errorMessage&&(<Alert className='mt-3 ' color='failure'>{errorMessage}
          </Alert>)
          }
        </div>
      </div>
      
    </div>
  )
}

export default Signin