const express =require("express");
const User =require("./User");
const Post=require("./Post")

const router=express.Router();

router.use('/user',User)
router.use('/post',Post)

module.exports=router
