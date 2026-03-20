import express from "express";
import wrapAsync from "../Utils/wrapAsync.js";
import userSignUp from "../Controllers/userSignUp.js";
import { userValidator } from "../Models/Validator.js";
import logInUser from "../Controllers/logInUser.js";
import passport from "passport";
import isAlreadyLoggedIn from "../Utils/iaAlreadyLoggedIn.js";
import isLoggedIn from "../Utils/isLoggedIn.js";
import checkAuth from "../Controllers/checkAuth.js";
import logOutUser from "../Controllers/logOutUser.js";
import authenticateUser from "../Utils/authenticateUser.js";
const Router = express.Router();

Router.post("/signup", userValidator, wrapAsync(userSignUp),logInUser);

Router.post("/login", isAlreadyLoggedIn,authenticateUser, logInUser,);

Router.get("/checkauth",isLoggedIn, checkAuth); //Checks if the user is logged in 

Router.post("/logout",logOutUser);

export default Router;
