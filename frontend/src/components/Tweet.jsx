import React from 'react'
import Avatar from 'react-avatar';
import {FaRegComment} from "react-icons/fa";
import {CiHeart, CiBookmark} from "react-icons/ci";
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getReferesh } from '../redux/tweetSlice';
import { MdDeleteOutline } from "react-icons/md";

function Tweet({tweet}) {
  const {user} = useSelector(store => store.user)
 const dispatch = useDispatch()
  const likeDislikeHandler = async(id) => {
    try {
      const res = await axios.put(`${TWEET_API_END_POINT}like/${id}`, {id: user?._id}, {
        withCredentials:true
      })
      dispatch(getReferesh())

      
        toast.success(res.data.message);
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }

  const deleteTweetHandler = async(id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      
      dispatch(getReferesh())
      toast.success(res.data.message);
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='border-b border-gray-200'>
       <div>
            <div className='flex p-8 '>
            <Avatar src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944" size="50" round={true} />
           <div className='ml-1 w-full'>
           <div className='flex items-center'>
                <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                <p className='text-gray-500 text-sm ml-2'>{`@${tweet?.userDetails[0]?.username} . 1m`}</p>
            </div>

            <div>
                <p>{tweet?.description}</p>
            </div>
            <div className='flex justify-between my-3'>
                <div className='flex items-center gap-1'>
                <FaRegComment size={"24px"} className='hover:text-blue-400 cursor-pointer'/> <p>{tweet?.comment?.length}</p></div>
                <div onClick={() => likeDislikeHandler(tweet?._id)} className='flex items-center gap-1'>
                <CiHeart size="24px"  className='hover:text-red-500 cursor-pointer'/><p>{tweet?.like?.length}</p></div>
                <div className='flex items-center gap-1'>
                <CiBookmark size="24px"  className='hover:text-blue-400 cursor-pointer'/> </div>
                {
                  user?._id === tweet?.userId && (
                    <div onClick={() => deleteTweetHandler(tweet?._id)} className='flex items-center gap-1'>
                <MdDeleteOutline size="24px"  className='hover:text-blue-400 cursor-pointer'/> </div>
                  )
                }
                
            </div>
           </div>
           
            </div>
       </div>
    </div>
  )
}

export default Tweet