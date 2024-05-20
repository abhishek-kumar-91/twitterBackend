import mongoose from "mongoose";

const tweetSchema  = new mongoose.Schema({
   description:{
        type: String,
        required: true
    },
    comment:{
        type: Array,
        default: []
    },
    like:{
        type: Array,
        default: []
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userDetails: []
    
},{timestamps:true});

export const Tweet = mongoose.model("Tweet", tweetSchema);