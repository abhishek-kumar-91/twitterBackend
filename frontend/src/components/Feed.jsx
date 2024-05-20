import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

function Feed() {
  const {tweets} = useSelector(store => store.tweet)
  return (
    <div className='w-[50%] mx-20 border'>
        <div>
            <CreatePost />
            {
              tweets?.map((tweet) => <Tweet key={tweet?._id} tweet ={tweet} /> )
            }
            
           
        </div>
    </div>
  )
}

export default Feed