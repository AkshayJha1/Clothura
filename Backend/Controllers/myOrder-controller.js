const MyOrder = require('../models/myOrders-model');
const jwt = require('jsonwebtoken');

const myOrders = async (req , res) => {
    try {
        const DATE = new Date();
        const { token , name , price , quantity  } = req.body;
        const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);
        const totalPrice = (price * quantity).toFixed(2);        

        const date = `${DATE.getDate()}-${DATE.getMonth() + 1}-${DATE.getFullYear()}`;
        const time = `${DATE.getHours()}:${DATE.getMinutes()}:${DATE.getSeconds()}`;

        const newProduct = {
            name, price , quantity, totalPrice , date , time
        }

        const address = decoded.address[0].street + "," + decoded.address[0].city + "," + decoded.address[0].state + "," + decoded.address[0].country + "," + decoded.address[0].pincode;
        const UserExist = await MyOrder.find({ email : decoded.email });
        if(UserExist.length > 0){
            const data = await MyOrder.updateOne(
                { email : decoded.email },
                {
                    $push: {
                        Orderdproducts: newProduct, 
                    },
                }
            );

            return res.status(200).json({ message: "Product added to existing email." , data});

        }else{
            const data = await MyOrder.create({ "email" : decoded.email , "address" : address , Orderdproducts : [newProduct]});

            return res.status(200).json({ message: "New Product added" , data});
        }

    } catch (error) {
        console.error("Error processing order:", error);
        res.status(500).json({ message: "An error occurred.", error : error.message });
    }
}

const gettingMyOrders = async (req,res) => {
    try {
        const { token } = req.body;
        const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);

        const myOrdersExist = await MyOrder.findOne({ email : decoded.email})

        if(!myOrdersExist){
            res.status(400).json({ message : 'Not any Order History found' , myOrdersExist})
        }else{
            res.status(200).json({ message : "Order History Found" , myOrdersExist});
        }
    } catch (error) {
        res.status(500).json({ message: "An fetching error occurred.", error : error.message });    
    }
}

module.exports = {myOrders , gettingMyOrders};