const Product = require('../models/product-model');

const category = async (req,res) => {
    try {
        const category = req.params.category;
        const response = await Product.find({category : category});
        if(!response){
            res.status(404).json({ msg : "Category not found"});
            return;
        }
        res.status(200).json({response });
    } catch (error) {
        res.status(400).send({msg:'page not found'})
    }
}

module.exports = category;