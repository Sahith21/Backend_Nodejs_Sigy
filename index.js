const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyparser = require('body-parser');
const firmroutes = require('./routes/firmroutes');
const productroutes = require('./routes/productroutes');
const path = require('path');


const app = express();

const port = process.env.port || 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected succesfully!"))
    .catch((error)=> console.log(error))
    
app.use(bodyparser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmroutes);
app.use('/product',productroutes);
app.use('/uploads',express.static('uploads'));


app.listen(port,()=>{
    console.log(`server running at https://localhost:${port}`);
});

app.use('/',(req,res)=>{
    res.send("<h1>Welcome to SIGY</h1>");
});