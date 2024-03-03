const { userSignup, userSign } = require("./zod");

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

module.exports = {
  signUpMiddleware,
  singInMiddleware,
};
