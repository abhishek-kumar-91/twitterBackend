import express from "express";
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeOrDislike } from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";


const router = express.Router();

router.route("/create").post( createTweet);
router.route("/delete/:id").delete( deleteTweet);
router.route("/like/:id").put( likeOrDislike);
router.route("/getalltweet/:id").get( getAllTweets);
router.route("/followingtweet/:id").get( getFollowingTweets);

export default router