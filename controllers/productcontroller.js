const Product = require('../models/product');
const multer = require('multer');
const Firm = require('../models/firm');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});
const upload = multer({storage:storage});

const addproduct = async(req,res)=>{
    try {
        const {productname,price,category,bestseller,description} = req.body;
        const image = req.file? req.file.filename:undefined;

        const firmId = req.params.fId;

        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error:"firm not found"});
        }

        const product = new Product({
            productname,price,category,bestseller,description,image,firm:firm._id
        })

        const savedproduct = await product.save();

        firm.products.push(savedproduct);
        await firm.save()

        res.status(200).json(savedproduct)

    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"})
    }

}

const getproductbyfirm = async(req,res)=>{
    try {
        const firmId = req.params.fId;

        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error:"firm not found"});
        }

        const restaurentname = firm.firmname;
        const products = await Product.find({firm:firmId});
        res.status(200).json({restaurentname,products});
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"})
    }
}

const deleteproductbyId = async(req,res)=>{
    try {
        const productId = req.params.productId;
        const deleteproduct = await Product.findByIdAndDelete(productId);
        if(!deleteproduct)
        {
            return res.status(404).json({error:"No product found"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"})
    }
}

module.exports = {addproduct:[upload.single('image'),addproduct],getproductbyfirm,deleteproductbyId};