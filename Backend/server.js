const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

const path = require('path');

const connectDb = require('./MongoDb/db');
const usersRoute = require('./router/users-router');
const homeRoute = require('./router/home-router');
const shopRoute = require('./router/shop-router');
const categoryRoute = require('./router/category-router');
const sellerRoute = require('./router/seller-router');
const myOrderRoute = require('./router/myOrder-router');
const checkoutRoute = require('./router/checkout-router');

const corsOption = {
    origin : process.env.NODE_ENV === 'development' ? "http://localhost:5173" : "https://clothura.onrender.com",
    methods : "GET ,  POST , PUT , DELETE , PUT , PATCH ,  HEAD",
    Credential : true,
}

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors(corsOption)); 
app.use(express.json());


app.use('/api/users', usersRoute)
app.use('/api/', homeRoute)
app.use('/api/shop',shopRoute)
app.use('/api/category',categoryRoute);
app.use('/api/seller',sellerRoute);
app.use('/api/myorders',myOrderRoute);
app.use('/api/checkout',checkoutRoute);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")));


    app.get("*", (req,res) => {
        if(!req.path.startsWith("/api")){
            res.sendFile(path.join(__dirname, "../Frontend", "dist" , "index.html"));
        }
    })
} 

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is listening on port ${PORT}`)
    })
});