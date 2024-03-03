const z =require("zod")

const userSignup=z.object({
    email:z
    .string({required_error: "email is required"})
    .email({message: "InValid email address"}),

    password:z
    .string({required_error: "password is required"})
    .min(6,{message:"Password must be atleast of 6 chars"}),

    firstName:z
    .string({required_error:"FirstName is required"})
    .min(1,{message:"FirstName is required"}),

    lastName:z
    .string({required_error:"LastName is requried"})
    .min(1,{message:"Lastname is required"})

})

const userSign=z.object({
    email:z
    .string({required_error:"email is required"})
    .email({message:"Invalid email address"}),

    password:z
    .string({required_error:"password is required"})
    .min(6,{message:"password must be atleast of 6 chars"})

})

module.exports={
    userSign,
    userSignup
}