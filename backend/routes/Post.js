const express = require("express");
const { Post, User } = require("../database");
const { AuthMiddleware, PostBlog } = require("../middleware");

const router = express.Router();

router.get("", AuthMiddleware, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const skip = (page - 1) * limit;
  const posts = await Post.find().skip(skip).limit(limit);
  res.json(posts);
});

router.post("/write",AuthMiddleware,PostBlog,async(req,res)=>{
  const id=req.id;
  const body=req.body;
  console.log(id)
  try{
    const author=await User.findOne({_id:id})
    console.log(body)
    await Post.create({
      title:body.title,
      description:body.description,
      author:author.name,
      publish_date:body.publish_date
    })
   res.json({
    message:"post created"
   })
  }catch(error){
    return res.status(404).json({
      message:error
    })
  }
  
})

module.exports = router;
