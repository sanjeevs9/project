const  jwt  = require("jsonwebtoken");
const { userSignup, userSign } = require("./zod");
const key=process.env.SECRET_KEY

const signUpMiddleware = async (req, res, next) => {
  const body = req.body;
  try {
    const parseBody = await userSignup.parseAsync(body);
    req.body = parseBody;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.errors[0].message,
    });
    return;
  }
};

const singInMiddleware = async (req, res, next) => {
  const body = req.body;
  try {
    const bodyParse = await userSign.parseAsync(body);
    req.body = bodyParse;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.errors[0].message,
    });
    return;
  }
};

const AuthMiddleware=async (req,res,next)=>{
  const value=req.headers.Authorization;

  if(!value.startsWith("Bearer")){
    res.status(404).json({
      message:"Please Login to see posts"
    })
    return
  }
  const token=value.split(" ")[1];

  const result=jwt.verify(token,key)
  if(!result){
    res.status(404).json({
      message:"Please Login to see posts"
    })
    return
  }
  req.id=result.id;
  next();

}

module.exports = {
  signUpMiddleware,
  singInMiddleware,
  AuthMiddleware
};
