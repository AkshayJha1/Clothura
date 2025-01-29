const User = require('../models/user-model');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');

const sendOTP = async(email) => {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.COMPANY_EMAIL_ID,
            pass: process.env.COMPANY_EMAIL_ID_PASSWORD
        }
    });

    // Send OTP email
    try {
        await transporter.sendMail({
            from: process.env.COMPANY_EMAIL_ID,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        });
        return otp; // Return the OTP for verification later
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP'); // Throw an error to be caught in the calling function
    }
}

const login = async (req,res) => {
    try {
        const { email , password } = req.body;

        const UserExist = await User.findOne({email:email});

       if(!UserExist){
        return res.status(400).json({message:"Invalid Credentials"});
       }

       const user = await UserExist.pwdCompare(password)  //we did this using model methods to make our code neat and clean.
        
       if(user){
        res.status(200).json({message : "Login Successful" , authToken : await UserExist.generateAuthToken() , userId : UserExist._id.toString() , role : UserExist.role});
       }else{
        res.status(401).json({message : "Invalid email or password"});
       }

    } catch (error) {
        res.status(500).json("Internal Server Error: Unable to login")
    }
}

let currEmail = null;
let currOtp = null;

const loginOTPMailing = async(req,res) => {
    try {
        const { email } = req.body;

        const UserExist = await User.findOne({email:email});
        if(UserExist){
            currEmail = email;
            currOtp = await sendOTP(email)  //in frontend we will pass this otp and then when some one click send otp then the otp will we sent and then we by verifying the otp we will allow then to login
            console.log("OTP sent:", currOtp);
            res.status(200).json({message : "OTP SEND"})
        }else{
            res.status(401).json({message : "Invalid email"});
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        console.log(error);
    }
}

const registerOTPMailing = async ( req , res ) => {
    try {
        const { email } = req.body;

        const UserExist = await User.findOne({email:email});

        if(UserExist){
            return res.status(409).json({msg:"Email already in use."});
        }

        currEmail = email;
        currOtp = await sendOTP(email)  //in frontend we will pass this otp and then when some one click send otp then the otp will we sent and then we by verifying the otp we will allow then to login
        console.log("OTP sent:", currOtp);
        res.status(200).json({message : "OTP SEND"})

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: OTP could not be sent.' });
    }
}

const registerViaOtp = async ( req , res ) => {
    try {
        const { name, email, phone, address, password, role, otp } = req.body;
        console.log("Request Body Keys:", Object.keys(req.body));
        console.log("Request Body:", req.body);
        if(currEmail){
            if( otp === currOtp ){
                const UserCreated = await User.create({ name, email, phone, address, password ,role });
                await res.status(200).json({message : "Register Successful" , authToken : await UserCreated.generateAuthToken() , userId : UserCreated._id.toString() , role : UserCreated.role});
                currOtp = null;
                currEmail = null;
            }else{
                res.status(400).json({message : "Wrong Otp" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: Uanble to Register' });
    }
}

const loginViaOtp = async (req,res) => {
    try {
        const { otp } = req.body;
        if(currEmail){
            const UserExist = await User.findOne({email:currEmail});
            if(otp === currOtp ){
                res.status(200).json({message : "Login Successful" , authToken : await UserExist.generateAuthToken() , userId : UserExist._id.toString() , role : UserExist.role});
                currOtp = null;
                currEmail = null;
            }else{
                res.status(400).json({message : "Wrong Otp" });
        }
        }else{
            res.status(500).json({ message: 'Internal Server Error: Invalid Email.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: OTP NOT VERIFIED.' });

    }
}

const currUser = async (req , res) => {
    try {
        const { token } = req.body;
        if(!token) return res.status(200).json({ "message" : "No User loggedIn"});
        const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);

        res.status(200).json({ "role" : decoded.role , "email" : decoded.email});

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: Unable to fetch currUser' });
        console.log(error.message);
    }
}

module.exports = { registerOTPMailing , registerViaOtp ,  login , loginOTPMailing , loginViaOtp , currUser };