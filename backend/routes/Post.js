const express =require("express");
const { Post } = require("../database");

const router=express.Router();


router.get('',async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
  
    const skip = (page - 1) * limit;
    const posts = await Post.find().skip(skip).limit(limit);
    res.json(posts)
})

module.exports=router;