const express =require("express");
const jwt =require("jsonwebtoken")
const router=express.Router();
const {userSignup}=require("../zod");
const { signUpMiddleware, singInMiddleware } = require("../middleware");
const { User } = require("../database");
const key=process.env.SECRET_KEY
const bcrypt =require("bcrypt")
const salt=10;


// create user account
router.post("/signup",signUpMiddleware,async(req,res)=>{
    const body=req.body
    const existinguser=await User.findOne({
        email:body.email
    })
    if(existinguser){
        res.status(403).json({
            message:"user already exists"
        })
        return 
    }
    const hashPass=await bcrypt.hash(body.password,salt);

    const user=User.create({
        email:body.email,
        password:hashPass,
        name:body.name
    })

    const token=jwt.sign({id:user._id},key,{
        expiresIn: 60
    })
    console.log(token)
    res.json({
        token
    })
})

//signin
router.post("/signin",singInMiddleware,async(req,res)=>{
    const body=req.body;
    const user=await User.findOne({
        email:body.email
    })
    if(!user){
        res.status(403).json({
            message:"User doesnt exists"
        })
        return
    }
    const hashPass=await bcrypt.compare(body.password,user.password)
    if(!hashPass){
        res.status(404).json({
            message:"Password is incorrect"
        })
        return
    }

    const token=jwt.sign({id:user._id},key,{
        expiresIn: 60
    })
    console.log(token)
    res.json({
        token
    })
})



module.exports=router;