import express from "express";
import { Login, Logout, Register, bookmarks, follow, getMyProfile, getOtherUser, unfollow } from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/bookmark/:id").put( bookmarks);
router.route("/profile/:id").get( getMyProfile);
router.route("/otheruser/:id").get( getOtherUser);
router.route("/follow/:id").post( follow);
router.route("/unfollow/:id").post( unfollow);


export default router