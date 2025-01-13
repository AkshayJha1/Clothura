const mongoose = require('mongoose');

const myOrderSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    Orderdproducts: [
        {
            name: { 
                type: String, 
                required: true 
            },
            price: { 
                type: Number, 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true
            },
            totalPrice : {
                type: Number, 
                required: true
            },
            date : {
                type: String,
                required: true
            },
            time : {
                type: String,
                required: true
            }
        },
    ],
});

const MyOrder = new mongoose.model("Myorder",myOrderSchema);

module.exports = MyOrder;