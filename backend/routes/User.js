const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  signUpMiddleware,
  singInMiddleware,
  AuthMiddleware,
  PasswordReset,
} = require("../middleware");
require("dotenv").config();
const { User } = require("../database");
const key = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const salt = 10;

// create user account
router.post("/signup", signUpMiddleware, async (req, res) => {
  const body = req.body;
  const existinguser = await User.findOne({
    email: body.email,
  });
  if (existinguser) {
    res.status(403).json({
      message: "user already exists",
    });
    return;
  }
  const hashPass = await bcrypt.hash(body.password, salt);

  const user = await User.create({
    email: body.email,
    password: hashPass,
    name: body.name,
  });

  const token = await jwt.sign({ id: user._id }, key, {
    expiresIn: "1d",
  });
  res.json({
    token,
    email: user.email,
    name: user.name,
  });
});

//signin
router.post("/signin", singInMiddleware, async (req, res) => {
  const body = req.body;
  const user = await User.findOne({
    email: body.email,
  });
  if (!user) {
    res.status(403).json({
      message: "User doesnt exists",
    });
    return;
  }
  const hashPass = await bcrypt.compare(body.password, user.password);
  if (!hashPass) {
    res.status(404).json({
      message: "Password is incorrect",
    });
    return;
  }

  const token = jwt.sign({ id: user._id }, key, {
    expiresIn: "1d",
  });
  res.json({
    token,
  });
});

//reset password
router.put("/reset", AuthMiddleware, PasswordReset, async (req, res) => {
  const body = req.body;
  const user = await User.findOne({
    email: body.email,
  });

  if (!user) {
    res.status(404).json({
      message: "User doesnt exists",
    });
    return;
  }
  const hashPass = await bcrypt.compare(body.oldPassword, user.password);

  if (!hashPass) {
    res.status(404).json({
      message: "Wrong password",
    });
    return;
  }
  const newhashPass = await bcrypt.hash(body.newPassword, salt);

  await User.updateOne(
    { email: body.email },
    {
      $set: { password: newhashPass },
    }
  );
  res.json({
    message: "password updated succesfully",
  });
});


//get user details
router.get("/get",AuthMiddleware,async (req,res)=>{
  const id=await req.id;
  const user=await User.findOne({_id:id})

  if(!user){
    res.status(404).json({
      message:"User not found"
    })
  }
  res.json({
    email:user.email
  })
 

})

module.exports = router;
