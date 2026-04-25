// import dotenv from "dotenv";
import cors from "cors";
import DbConnect from "./Config/Database.js"
import express from "express";
import passport from "passport";
import  LocalStrategy from 'passport-local';
import cookieParser from "cookie-parser";

import listingsRoute from "./Routes/listingsRoute.js"
import userRoute from "./Routes/userRoute.js";
import ExpressError from "./Utils/ExpressError.js";
import User from "./Models/userSchema.js";

import path from "path";
import dotenv from "dotenv";

// Force the exact file
dotenv.config({ path: path.resolve("./.env") });

console.log("ENV PATH LOADED");
console.log("KEY:", process.env.GOOGLE_MAPS_API_KEY);


    dotenv.config();


const app = express();
const port = 8080;

DbConnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/uploads", express.static("Uploads"));
    
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
