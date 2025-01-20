const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name :{
        type:String, 
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    address : [{
        state: {
            type:String,
            require:true
        },
        city: {
            type:String,
            require:true
        },
        street:{
            type:String,
            require:true
        },
        pincode : {
            type:String,
            require:true
        },
        country:{
            type:String,
            default : "India"
        }
    }],
    password:{
        type:String,
        require:true
    },
    role:{
        type: String,
        default : "customer"
    }
});


//hashing password
userSchema.pre("save", async function(next){       //The pre method ensures that data save hone se phle iske ander ka defined function execute hona chaiye
    const user = this; //here this store all the values of req.body + id    

    if(!user.isModified("password")){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password , saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
})


//token generatation
userSchema.methods.generateAuthToken = async function(){
    try {
        return jwt.sign({
                userId : this._id.toString(),
                email : this.email,
                role: this.role,
                address: this.address
            },
            
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.error(error);
    }
}

//Password Compare
userSchema.methods.pwdCompare = async function(password) { // Compare the provided password with the hashed password using model method
    try {

        const isUser  = await bcrypt.compare(password, this.password); 
        return isUser ; 
    } catch (error) {
        console.error('Error during password comparison:', error);
    }
}


const User = new mongoose.model("User",userSchema);

module.exports = User;