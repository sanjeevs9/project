const mongoose =require("mongoose")
require('dotenv').config()

mongoose.connect(`${process.env.DATABASE_URL}`)
.then(() => console.log('Database connected!'))
.catch(err => console.log(err));

const UserSchema= mongoose.Schema({
    email:{
        type:String,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required'],
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    }

})

const User=mongoose.model('User',UserSchema);

module.exports={
    User
}