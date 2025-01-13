require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const connectDb = require('./MongoDb/db');
const usersRoute = require('./router/users-router');
const homeRoute = require('./router/home-router');
const shopRoute = require('./router/shop-router');
const categoryRoute = require('./router/category-router');
const sellerRoute = require('./router/seller-router');
const myOrderRoute = require('./router/myOrder-router');
const checkoutRoute = require('./router/checkout-router');

// const corsOption = {
//     origin : "http://localhost:5174",
//     methods : "GET ,  POST , PUT , DELETE , PUT , PATCH ,  HEAD",
//     Credential : true,
// }

app.use(bodyParser.json());
app.use(cors(corsOption)); 
app.use(express.json());


app.use('/users', usersRoute)
app.use('/', homeRoute)
app.use('/shop',shopRoute)
app.use('/category',categoryRoute);
app.use('/seller',sellerRoute);
app.use('/myorders',myOrderRoute);
app.use('/checkout',checkoutRoute);

const PORT = process.env.PORT || 5000;
const PAYPAL_API = process.env.PAYPAL_API;
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is listening on port ${PORT}`)
    })
});