const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretkey = process.env.key

const vendorRegister = async(req,res)=>{
    const { username, email, password} =req.body;
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail)
        {
            return res.status(400).json("Email already registered");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newVendor = new Vendor({
            username,
            email,
            password:hashedPassword
        });
        await newVendor.save();

        res.status(201).json({message:"Vendor registered successfully"});
        console.log('vendor registered');
    }
    catch(error) {
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
}

const vendorLogin = async(req,res)=>{
    const{email,password}=req.body;
    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password)))
        {
            return res.status(400).json({error:"Invalid username or password"});
        }
        const token = jwt.sign({vendorId: vendor._id},secretkey,{expiresIn: "1h"});

        const vendorId = vendor._id;

        res.status(200).json({success:"Login succesful",token,vendorId})
        console.log(email,"This is token",token);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
}

const getallvendors = async(req,res)=> {
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors})
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
}

const getVendorById = async(req,res) =>{
    const VendorId = req.params.vId;
    try {
        const vendor = await Vendor.findById(VendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({error:"vendor not found"});
        }
        const vendorfirmid = vendor.firm[0]._id;
        res.status(200).json({VendorId,vendor,vendorfirmid});
        console.log("vendor is ",vendorfirmid);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
}

module.exports = {vendorRegister,vendorLogin,getallvendors,getVendorById};