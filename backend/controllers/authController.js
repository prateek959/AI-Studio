import Auth from "../models/authSchema.js";
import argon from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";

const register = async (req, res)=>{
    try {
        const {userName, email, password} = req.body;

        const user = await Auth.findOne({email});

        if(user){
           return res.status(200).json({message:"User Already exists"});
        }

        const hashPass = await argon.hash(password);

        await Auth.create({
            userName,
            email,
            password:hashPass
        });

        res.status(201).json({message:"User Register Successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something Went Wrong",error});
    }
};


const login = async(req, res)=>{
    try {
        const {email, password} = req.body;

        const user = await Auth.findOne({email});

        if(!user){
            return res.status(401).json({message:"User not exists"});
        }

        const verify = await argon.verify(user.password,password);

        if(!verify){
            return res.status(401).json({message:"Unauthorized Access"});
        }

        const token = await jwt.sign({email,id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});

        res.status(200).json({message:"Login Successfully",token});

    } catch (error) {
       console.log(error);
        res.status(500).json({message:"Something Went Wrong",error}); 
    }
}

export {register, login};