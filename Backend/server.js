require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./MongoDb/db');
const usersRoute = require('./router/users-router');
const homeRoute = require('./router/home-router');
const shopRoute = require('./router/shop-router');
const categoryRoute = require('./router/category-router');
const sellerRoute = require('./router/seller-router');

const corsOption = {
    origin : "http://localhost:5173",
    methods : "GET ,  POST , PUT , DELETE , PUT , PATCH ,  HEAD",
    Credential : true,
}

app.use(cors(corsOption)); 
app.use(express.json());


app.use('/users', usersRoute)
app.use('/', homeRoute)
app.use('/shop',shopRoute)
app.use('/category',categoryRoute);
app.use('/seller',sellerRoute);

const PORT = process.env.PORT || 5000;

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is listening on port ${PORT}`)
    })
});