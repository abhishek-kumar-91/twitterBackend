import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import useGetProfile from "../Hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import {toast} from "react-toastify"
import { followingUpdate } from "../redux/userSlice";
function Profile() {
  const { profile, user } = useSelector((store) => store.user);
  const {getReferesh} = useSelector(store => store.tweet)
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();

  const followAndFollowingHandler = async() => {
    if(user?.following?.includes(id)){
      //unfollow
      try {
        const userd = user?._id
        const res = await axios.post(`${USER_API_END_POINT}unfollow/${id }`, {userd}, {
          withCredentials:true
        })
        toast.success(res.data.message);
        dispatch(followingUpdate(id))
        dispatch(getReferesh())
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error)
      }
    }else{
      //follow
      try {
        const res = await axios.post(`${USER_API_END_POINT}follow/${id}`, {id:user?._id}, {
          withCredentials:true
        })
        toast.success(res.data.message);
        dispatch(followingUpdate(id))
        dispatch(getReferesh())
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error)
      }
    }
  }
  return (
    <div className="mx-20 w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center p-2">
          <Link to="/">
            <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer mr-2">
              <IoIosArrowRoundBack size="24px" />
            </div>
          </Link>
          <div>
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-sm text-gray-500">10 Post</p>
          </div>
        </div>
        <img
          src="https://marketplace.canva.com/EAFBw3-aQkk/1/0/1600w/canva-black-minimal-business-personal-profile-linkedin-banner-wgnI2OFUXCI.jpg"
          alt="banner"
        />

        <div className="absolute top-[10rem] 2xl:top-[13rem] ml-4 border-4 border-white rounded-full">
          <Avatar
            src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"
            size="120"
            round={true}
          />
        </div>
        <div className="text-right m-4 ">
          {profile?._id === user?._id ? (
            <button className="px-4 py-1 rounded-full hover:bg-gray-200  border border-gray-400">
              Edit Profile
            </button>
          ) : (
            <button onClick={followAndFollowingHandler} className="px-4 py-1 rounded-full bg-black text-white ">
              {user?.following?.includes(id) ? "Following": "Follow"}
            </button>
          )}
        </div>

        <div className="m-4">
          <h1 className="font-bold text-2xl">{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>

        <div className="m-4">
          <p>
            Upcoming Software Developer || Full Stack Developer || Ex
            HacktoberFest 2023||
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
