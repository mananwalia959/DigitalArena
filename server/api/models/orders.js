const mongoose = require("mongoose");
require('./products');
require('./user')

let schema = mongoose.Schema({
    payment_id:{type:String,required: true,},
    payment_request_id:{type:String,unique: true,required: true,},
    id: mongoose.Schema.Types.ObjectId,
    pincode:Number,
    amount:Number,
    user:{type:  mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt:{type:Date,default:Date.now},
    status:{type:String,enum:['About to be dispatched','Dispatched','Delievered'],default:'About to be dispatched'},
    productlist:[
        {
            _id: false,
            productid: {
                type:mongoose.Schema.Types.ObjectId, ref: 'Product'
            },
            count:{
                type: Number,
                min : 1,
                max : 5
            }
        },
    ]
}, );



module.exports=mongoose.model('orders', schema);