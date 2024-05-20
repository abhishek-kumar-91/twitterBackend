import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { toast } from "react-toastify";
import {useSelector, useDispatch} from "react-redux"
import { getAllTweets, getIsActive, getReferesh } from "../redux/tweetSlice";

function CreatePost() {
  const [description, setDescription] = useState("");
  const {user} = useSelector(store => store.user)
  const {isActive} = useSelector(store => store.tweet)
  const dispatch = useDispatch()
  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}create`,
        { description, id:user?._id },
        {
          withCredentials: true,
        }
      );

      dispatch(getReferesh())

      if (res.data.success) {
        toast.success(res.data.message, {
          className: "bg-green-300 text-gray-500",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    setDescription("")
  };
 
  const forYouHandler = () => {
    dispatch(getIsActive(true))
  }

  const followingHandler = () => {
    dispatch(getIsActive(false))
  }
  
  return (
    <div className="w-[100%]">
      <div>
        <div className="flex justify-evenly items-center border-b border-gray-200">
          <div onClick={forYouHandler} className={`${isActive ? " border-b-4 border-blue-500": "null"} cursor-pointer hover:bg-gray-100 w-[50%]  text-center py-2`}>
            <h1 className="font-semibold text-gray-600 text-lg tracking-[2px]">
              {" "}
              For you
            </h1>
          </div>
          <div onClick={followingHandler} className = {`${isActive ? "null ": "border-b-4 border-blue-500"} cursor-pointer hover:bg-gray-100 w-[50%]  text-center py-2`}>
            <h1 className="font-semibold text-gray-600 text-lg tracking-[2px]">
              {" "}
              Following
            </h1>
          </div>
        </div>

        <div>
          <div className="flex items-center p-4">
            <div>
              <Avatar
                src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"
                size="50"
                round={true}
              />
            </div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none border-none text-lg ml-2"
              placeholder="What is happening?!"
            />
          </div>

          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div>
              <CiImageOn size={"24px"} />
            </div>
            <button
              onClick={submitHandler}
              className="bg-blue-400 px-3 py-1 text-lg rounded-full border-none text-white "
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
