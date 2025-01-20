const { z } = require('zod');

const registerSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must have at least 3 characters." })
        .max(255, { message: "Name must not exceed 255 characters." }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must have at least 3 characters." })
        .max(255, { message: "Email must not exceed 255 characters." }),
    phone: z
        .string({ required_error: "Phone Number is required" })
        .trim()
        .min(10, { message: "Phone Number must have at least 10 characters." })
        .max(20, { message: "Phone Number must not exceed 20 characters." }),
    address: z
        .object({
            state: z.string().min(1, { message: "State is required." }),
            city: z.string().min(1, { message: "City is required." }),
            street: z.string().min(1, { message: "Street is required." }),
            pincode: z.string().min(1, { message: "Pincode is required." })
        }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "Password must have at least 6 characters." })
        .max(1024, { message: "Password must not exceed 1024 characters." }),
    otp: z
        .string({ required_error: "OTP is required" })
        .trim()
        .min(1, { message: "OTP must not be empty." }),
    role: z
        .string({ required_error: "role is required" })
        .trim()
        .min(1, { message: "OTP must not be empty." }),
});

const loginSchema = z.object({
    email : z
        .string({required_error:"Emali is required"})
        .trim()
        .email({message : "Invalid email address"})
        .min(3,{ message : "Emali must have atleast 3 characters."})
        .max(255,{message: "Emali must not be more than 255 characters."}),
    password : z
        .string({required_error:"Password is required"})
        .trim()
        .min(6,{ message : "Password must have atleast 6 characters."})
        .max(1024,{message: "Password must not be more than 1024 characters."})
})

module.exports = { registerSchema, loginSchema };