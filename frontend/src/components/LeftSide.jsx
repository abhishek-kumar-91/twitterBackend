import React from "react";
import { CiHome, CiHashtag, CiUser, CiBookmark, CiLogout } from "react-icons/ci";
import {IoIosNotificationsOutline} from "react-icons/io";
import {Link, useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { toast } from "react-toastify";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";

function LeftSide() {
  const {user} = useSelector(store => store.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutHandler = async() => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${USER_API_END_POINT}logout`)
      dispatch(getUser(null))
      dispatch(getOtherUsers(null))
      dispatch(getMyProfile(null))
      navigate("/login")
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-[20%]">
      <div>
        <div>
          <img
            className="ml-4"
            width={"24px"}
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
            alt="twitter-logo"
          />
        </div>
        <div className="my-4">
          <Link to="/" className="flex items-center my-2 hover:bg-gray-200 rounded-full px-4 py-2 cursor-pointer">
            <div>
              <CiHome size={"24px"} />
            </div>
            
            <h1 className="font-semibold text-xl ml-2 tracking-[2px]">Home</h1></Link>
         
          <div className="flex items-center my-2 hover:bg-gray-200 rounded-full px-4 py-2 cursor-pointer">
            <div>
              <CiHashtag size={"24px"} />
            </div>
            <h1 className="font-semibold text-xl ml-2 tracking-[2px]">
              Explore
            </h1>
          </div>
          <div className="flex items-center my-2 hover:bg-gray-200 rounded-full px-4 py-2 cursor-pointer">
            <div>
              <IoIosNotificationsOutline size={"24px"} />
            </div>
            <h1 className="font-semibold text-xl ml-2 tracking-[2px]">
              Notifications
            </h1>
          </div>
          <Link to={`/profile/${user?._id}`} className="flex items-center my-2 hover:bg-gray-200 rounded-full px-4 py-2 cursor-pointer">
            <div>
              <CiUser size={"24px"} />
            </div>
            
            <h1 className="font-semibold text-xl ml-2 tracking-[2px]">
              Profile
            </h1></Link>
          
          <div className="flex items-center my-2 hover:bg-gray-200 rounded-full px-4 py-2 cursor-pointer">
            <div>
              <CiBookmark size={"24px"} />
            </div>
            <h1 className="font-semibold text-xl ml-2 tracking-[2px]">
              Bookmarks
            </h1>
          </div>
          <div onClick={logOutHandler} className="flex items-center my-2 hover:bg-gray-200 rounded-full px-4 py-2 cursor-pointer">
            <div>
              <CiLogout size={"24px"} />
            </div>
            <h1 className="font-semibold text-xl ml-2 tracking-[2px]">
              Logout
            </h1>
          </div>
          <button className="px-6 py-2 border-none text-md bg-blue-500 w-full rounded-full font-bold text-white hover:bg-blue-400 ">Post</button>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
