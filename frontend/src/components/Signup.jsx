import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${USER_API_END_POINT}register`, {name, username, email, password}, {
        headers:{
          'Content-Type': "application/json"
        },
        withCredentials:true
      });
     
      if(res.data.success === true){
        navigate("/")
        toast.success(res.data.message, {
          className: 'bg-green-300 text-gray-500',
        });
        
      }
      
        
      
      
    } catch (error) {
      console.log(error, "signup")
      toast.error(error.response.data.message, {
        className: 'bg-red-300 text-white',
      })
      
    }
  }

  return (
    <div className='w-scree h-screen flex items-center justify-center'>
      <div className='flex items-center w-[80%] justify-evenly'>
          <div>
          <img
            className="ml-4"
            width={"250px"}
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
            alt="twitter-logo"
          />
          </div>
          <div>
          <div className='my-6'>
          <h1 className='font-bold text-5xl'>Happening now.</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>Sign Up</h1>
              <form onSubmit={submitHandler} className='flex flex-col w-[70%]'>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='outline-blue-400  border border-gray-800 px-4 py-2 rounded-full my-2'/>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='outline-blue-400 border border-gray-800 px-4 py-2 rounded-full my-2' />
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='outline-blue-400 border border-gray-800 px-4 py-2 rounded-full my-2' />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='outline-blue-400 border border-gray-800 px-4 py-2 rounded-full my-2'/>
                <button className='bg-blue-500 text-white outline-none rounded-full py-2 hover:bg-blue-700'>Create Account</button>
              </form>
            <p className='text-xs mt-2 '>Already have an account? <Link to="/login" className='text-blue-500 font-semibold text-sm hover:underline'>Login</Link></p>
          </div>
      </div>
    </div>
  )
}

export default Signup