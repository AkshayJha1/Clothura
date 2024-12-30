const Category = require('../models/category-model');
const home = async (req,res) => {
    try {
        const response = await Category.find();
        if(!response){
            res.status(404).json({ msg : "No service found"});
            return;
        }
        res.status(200).json({response });
    } catch (error) {
        res.status(400).send({msg:'page not found'});
    }
}

module.exports = { home };