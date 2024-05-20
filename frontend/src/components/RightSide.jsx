import React from 'react'
import {CiSearch} from "react-icons/ci";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

function RightSide({otherUser}) {
  return (
    <div className="w-[25%] ">
        <div className=' bg-gray-100 rounded-full flex p-2 items-center'>
        <CiSearch size="20px" />
          <input type='text' className=' bg-transparent  px-2 rounded-full outline-none' placeholder='search....' />
        </div>


        <div className='p-4 bg-gray-100 rounded-lg my-4'>
        
        <h1 className='font-bold text-lg '>Who to follow</h1>
        
      {
        otherUser?.map((user) => {
          return (
            <div key={user?._id} className='flex items-center gap-2 my-3 justify-between'>
          <div className='flex'>
          <div>
            <Avatar src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944" size="50" round={true} />
            </div>
            <div className='ml-2'>
            <h1 className='font-bold'>{user?.name}</h1>
            <p className='text-sm'>{`@${user?.username}`}</p>
            </div>
          </div>
          <div>
          <Link to={`/profile/${user?._id}`}><button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button></Link>
          
          </div>
          </div>
          )
        })
      }


         

          

        </div>
    </div>
  )
}

export default RightSide