const Firm = require('../models/firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const Path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+Path.extname(file.originalname));
    }
});
const upload = multer({storage:storage});

const addfirm = async(req,res)=>{
    try {
        const {firmname,area,category,region,offer} = req.body;
    const image = req.file? req.file.filename:undefined;

    const vendor = await Vendor.findById(req.vendorId)
    if(!vendor){
        res.status(404).json({message:"Vendor not found"})
    }
    if(vendor.firm.length > 0){
            return res.status(400).json({message:'vendor can have only one firm'});
    }
    const firm = new Firm({
        firmname,area,category,region,offer,image,vendor:vendor._id
    })

    const savedfirm = await firm.save();

    const firmId = savedfirm._id

    vendor.firm.push(savedfirm)

    await vendor.save()

    

    return res.status(200).json({message:"Firm added successfully",firmId});
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }

}

const deletefirmbyId = async(req,res)=>{
    try {
        const firmId = req.params.fId;
        const deletefirm = await Firm.findByIdAndDelete(firmId);
        if(!deletefirm)
        {
            return res.status(404).json({error:"No firm found"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"})
    }
}

module.exports = {addfirm:[upload.single('image'),addfirm],deletefirmbyId}