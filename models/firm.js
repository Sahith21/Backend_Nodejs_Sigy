const mongoose = require('mongoose');

const firmschema = new mongoose.Schema({
    firmname:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:['south-indian','north-indian','chineese','bakery']
            }
        ]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    vendor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vendor'
    }],
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]

});

const firm = mongoose.model('firm',firmschema);

module.exports = firm