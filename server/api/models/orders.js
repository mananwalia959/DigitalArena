const mongoose = require("mongoose");

let schema = mongoose.Schema({
    payment_id:{type:String,required: true,},
    payment_request_id:{type:String,unique: true,required: true,},
    id: mongoose.Schema.Types.ObjectId,
    pincode:Number,
    amount:Number,
    user:{type:  mongoose.Schema.Types.ObjectId, ref: 'users'},
    createdAt:{type:Date,default:Date.now},
    productlist:[
        {
            _id: false,
            productid: {
                type:mongoose.Schema.Types.ObjectId, ref: 'products'
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