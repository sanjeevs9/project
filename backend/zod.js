const z = require("zod");

const userSignup = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "InValid email address" }),

  password: z
    .string({ required_error: "password is required" })
    .min(6, { message: "Password must be atleast of 6 chars" }),

  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
});

const userSign = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string({ required_error: "password is required" })
    .min(6, { message: "password must be atleast of 6 chars" }),
});

const passwordReset = z.object({
  oldPassword: z
    .string({ required_error: "password is required" })
    .min(6, { message: "password must be atleast of 6 chars" }),

  newPassword: z
    .string({ required_error: "password is required" })
    .min(6, { message: "password must be atleast of 6 chars" }),

  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email address" }),
});

module.exports = {
  userSign,
  userSignup,
  passwordReset,
};
