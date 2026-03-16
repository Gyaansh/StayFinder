import express from 'express';
import wrapAsync from '../Utils/wrapAsync.js';
import userSignUp from '../Controllers/userSignUp.js';

const Router = express.Router();

Router.post('/signup',wrapAsync(userSignUp));

export default Router;