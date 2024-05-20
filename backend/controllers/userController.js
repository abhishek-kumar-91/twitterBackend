import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const user = await User.findOne({email});
    if (user) {
      return res.status(401).json({
        message: "User Already exist.",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account successfully created!",
      success: true,
    });
  } catch (err) {
    console.log("Register user ", err);
    return res.json({
      message: "Error during register the user",
      success: false,
    });
  }
};


export const Login = async(req, res) => {
  try{
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(401).json({
        message: "All fields are required.",
        success: false
      })
    };
    const user = await User.findOne({email});

    if(!user){
      return res.status(401).json({
        message:"User doesn't exist with this email.",
        success: false
      })
    }

    const isMatch = await bcryptjs.compare( password, user.password);

    if(!isMatch){
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false
      })
    }

    const tokenData = {
      userId: user._id
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRY} )

    return res.status(200).cookie("token", token, {expireIn: process.env.TOKEN_EXPIRY, httpOnly:true}).json({
      message: `Welcome back ${user.name}`,
      user,
      success: true
    })

  }catch(err){

    console.log("Error from Login ", err)
  }
}


export const Logout = (req, res) => {
  return res.cookie("token", "", {expireIn: new Date(Date.now())}).json({
    message: "user logout successfully",
    success: true
  });
}

export const bookmarks = async (req, res) => {
  try {
      const loggedInUserId = req.body.id;
      const tweetId = req.params.id;

      const user =  await User.findById(loggedInUserId);
      if(user.bookmarks.includes(tweetId)){
          //remove
          await User.findByIdAndUpdate(loggedInUserId, {$pull:{bookmarks:tweetId}})
          return res.status(200).json({
              message: " removed bookmarks tweet",

          })
      }else{
          //bookmark
          await User.findByIdAndUpdate(loggedInUserId, {$push:{bookmarks:tweetId}})
          return res.status(200).json({
              message: "saved bookmarks tweet",

          })
      }
  } catch (error) {
      console.log("bookmarks ", error)
  }
}


export const getMyProfile = async (req, res) =>{
  try {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    return res.status(200).json({
      user,
    })
    
  } catch (error) {
    console.log(error)
  }
}

export const getOtherUser = async(req, res) => {
  try {
    const {id} = req.params;
    const otherUser = await User.find({_id:{$ne: id}}).select("-password");
    if(!otherUser){
      return res.status(401).json({
        message: "no user"
      })
    }

    return res.status(200).json({
      otherUser,
    })
  } catch (error) {
    console.log(error);    
  }
}

export const follow = async(req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;

    const loggedInUser =  await User.findById(loggedInUserId); //abhishek
    const user = await User.findById(userId); //keshav

    if(!user.followers.includes(loggedInUserId)){
      await user.updateOne({$push:{followers:loggedInUserId}});
      await loggedInUser.updateOne({$push:{following: userId}})
    }else{
      return res.status(400).json({
        message: `user already followed to ${user.name}`
      })
    }
    

    return res.status(200).json({
      message: `${loggedInUser.name} just follow to ${user.name}`,
      success: true
    })
  } catch (error) {
    console.log(error)
  }
}

export const unfollow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;

    const loggedInUser =  await User.findById(loggedInUserId); //abhishek
    const user = await User.findById(userId); //keshav

    if(loggedInUser.followers.includes(userId)){
      await user.updateOne({$pull:{followers:loggedInUserId}});
      await loggedInUser.updateOne({$pull:{following: userId}})
    }else{
      return res.status(400).json({
        message: `user has not followed yet`
      })
    }
    

    return res.status(200).json({
      message: `${loggedInUser.name} just unfollow to ${user.name}`,
      success: true
    })

    
  } catch (error) {
    console.log(error)
  }
}