import React, { useEffect } from 'react'
import LeftSide from './LeftSide'
import Feed from './Feed'
import RightSide from './RightSide'
import {Outlet} from "react-router-dom"
import useOtherUsers from '../Hooks/useOtherUsers'
import { useSelector } from 'react-redux'
import useGetMyTweets from '../Hooks/useGetMyTweets'
import { useNavigate } from 'react-router-dom'

function Home() {
  const {user, otherUser} = useSelector(store => store?.user)
  const navigate = useNavigate()
 //custom hook
 useOtherUsers(user?._id)
 useGetMyTweets(user?._id)

 useEffect(() => {
  if(!user){
    navigate("/login")
  }
 }, [])
 

  return (
    <div className='flex justify-between w-[88%] mx-auto px-auto pt-2'>
        <LeftSide />
        <Outlet />
        <RightSide otherUser = {otherUser}/>
    </div>
  )
}

export default Home