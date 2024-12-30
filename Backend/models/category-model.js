const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category:{
        type : String,
        require : true
    },
    img:{
        type : String,
        require : true
    }
})

const Category = new mongoose.model("Category",categorySchema);

module.exports = Category;