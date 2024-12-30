const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    description:{
        type : String,
        require : true
    },
    price :{
        type: Number,
        require : true
    },
    stock : {
        type : Number,
        require : true
    },
    category : {
        type : String,
        require : true
    },
    targetAudience : {
        type : String,
        require : true
    },
    images : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    }
});

const Product = new mongoose.model("Product",productSchema);

module.exports = Product;