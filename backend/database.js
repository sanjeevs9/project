const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(`${process.env.DATABASE_URL}`)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, "User email required"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

//just for dummy data that i have imported into mongodb
const PostSchema = mongoose.Schema({
  title: String,
  description: String,
  publish_date: String,
  author: String,
});

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);

module.exports = {
  User,
  Post,
};
