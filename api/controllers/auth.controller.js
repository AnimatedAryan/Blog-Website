import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
export const signup=async (req,res,next)=>{
   const {username,email,password}=req.body;
   if(!username||!email||!password||username===''||email===''||password==='')
   {
       next(errorHandler(400,"All fields are required"));
   }
   const hashedpassword=bcryptjs.hashSync(password,10);
   const newUser =new User({
    username,
    email,
    password:hashedpassword,
   });
   try{
    await newUser.save();
    res.json({message:"user was created"});
   } catch(error)
   {
     next(errorHandler(400,'Try another username this is already in Use'));
   }
   
 
}