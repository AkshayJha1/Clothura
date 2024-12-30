const { z } = require('zod');

const registerSchema = z.object({
    name : z
        .string({required_error:"Name is required"})
        .trim()
        .min(3,{ message : "Name must have atleast 3 characters."})
        .max(255,{message: "Name must not be more than 255 characters."}),
    email : z
        .string({required_error:"Emali is required"})
        .trim()
        .email({message : "Invalid email address"})
        .min(3,{ message : "Emali must have atleast 3 characters."})
        .max(255,{message: "Emali must not be more than 255 characters."}),
    phone : z
        .string({required_error:"Phone Number is required"})
        .trim()
        .min(10,{ message : "Phone Number must have atleast 10 characters."})
        .max(20,{message: "Phone Number must not be more than 20 characters."}),
    password : z
        .string({required_error:"Password is required"})
        .trim()
        .min(6,{ message : "Password must have atleast 6 characters."})
        .max(1024,{message: "Password must not be more than 1024 characters."})
})

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