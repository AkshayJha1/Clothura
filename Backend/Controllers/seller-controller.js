const Product = require('../models/product-model');
const Category = require('../models/category-model');
const jwt = require('jsonwebtoken');

const sellerProducts = async ( req, res ) => {
    try {
        
        const { token  } = req.body
        const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);

        const ProductExist = await Product.find({email : decoded.email});

        if(ProductExist.length === 0){
            res.status(400).json({ msg : "You Do not have posted any product" });
            return
        }

        res.status(200).json({ msg : "Yeah I got your Products" , ProductExist  });
    } catch (error) {
        res.status(500).json({ message : 'Internal Server Error: Unable to add product', error })
    }
}

const addProduct = async ( req, res ) =>{
    try {

        const { token  } = req.body
        const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);

        const { name , description , price , stock , category , targetAudience , images } = req.body;

        const ProductAdded = await Product.create({ name , description , price , stock , category , targetAudience , images , email : decoded.email});
        
        const CategoryExist = await Category.findOne({"category" : category});

        if(!CategoryExist){
            const CategoryAdded = await Category.create({ category , "img" : images })

            res.status(200).json({ msg : "Product Added and Category Added" , ProductAdded , CategoryAdded , "productId" : ProductAdded._id })
        }else{
            res.status(200).json({ msg : "Product Added" , ProductAdded  })
        }
        
    } catch (error) {
        res.status(500).json({ message : 'Internal Server Error: Unable to add product', error })
    }
}

const updateProduct = async ( req, res ) => {
    try {

        const { token  } = req.body
        const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);

        const { name , description , price , stock , targetAudience , images , productId } = req.body;
        
        const ProductExist = await Product.findById(productId);
        if(!ProductExist){
            res.status(400).json({ msg : "Product Not Found" });
            return;
        }
        const updatedProduct = await Product.updateOne({ _id : productId , email : decoded.email } , { $set : { name , description , price , stock , targetAudience , images }});
        res.status(200).json({ msg : "Product Updated" , updatedProduct });
    } catch (error) {
        res.status(500).json({ message : 'Internal Server Error: Unable to update product', error })
    }
}

const removeProduct = async ( req , res ) => {
    try {
        const { token , productId } = req.body
        const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);

        const ProductExist = await Product.findOne({ _id: productId, email: decoded.email });

        if(ProductExist){
            const DeletedProduct = await Product.deleteOne({ _id: productId, email: decoded.email });
            res.status(200).json({ message : `Deleted Product ${productId}` , DeletedProduct  });  
            return;
        }

        res.status(400).json({ message : `You do not any product with productId = ${productId}`  })  

    } catch (error) {
        res.status(500).json({ message : 'Internal Server Error: Unable to Remove product', error : error.message })
    }
}

module.exports = {addProduct , updateProduct , sellerProducts , removeProduct};