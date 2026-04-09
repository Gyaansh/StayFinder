import cors from "cors";
import DbConnect from "./Config/Database.js"
import express from "express";
import passport from "passport";
import  LocalStrategy from 'passport-local';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import listingsRoute from "./Routes/listingsRoute.js"
import userRoute from "./Routes/userRoute.js";
import ExpressError from "./Utils/ExpressError.js";
import User from "./Models/userSchema.js";
dotenv.config();
const app = express();
const port = 8080;

DbConnect();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
    
app.use(cookieParser());
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));


app.use("/api/listing",listingsRoute);
app.use("/api/user",userRoute);

app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(port, ()=>{
    console.log("Server Listening at port",port);
});