const Product = require('../models/product-model');

const men = async (req,res) => {
    try {
        const response = await Product.find({ "targetAudience" : "Men"});
        if(response.length === 0){
            res.status(404).json({ msg : "Targeted Audience not found"});
            return;
        }
        res.status(200).json({ response });
    } catch (error) {
        res.status(400).send({msg:'page not found'})
        console.log(error);
    }
}

const women = async (req,res) => {
    try {
        const response = await Product.find({ "targetAudience" : "Women"});
        if(response.length === 0){
            res.status(404).json({ msg : "Targeted Audience not found"});
            return;
        }
        res.status(200).json({ response });
    } catch (error) {
        res.status(400).send({msg:'page not found'})
        console.log(error);
    }
}

const kids = async (req,res) => {
    try {
        const response = await Product.find({ "targetAudience" : "Kids"});
        if(response.length === 0){
            res.status(404).json({ msg : "Targeted Audience not found"});
            return;
        }
        res.status(200).json({ response });
    } catch (error) {
        res.status(400).send({msg:'page not found'})
        console.log(error);
    }
}

const allProducts = async ( req , res ) => {
    try {
        
     const response = await Product.find({});

     if(response.length === 0){
        res.status(404).json({ msg : "Products not found"});
     }
     res.status(200).json({ response , count : response.length });
    } catch (error) {
        res.status(400).send({msg:'page not found'})
        console.log(error);
    }
}

module.exports = { men , women , kids , allProducts}