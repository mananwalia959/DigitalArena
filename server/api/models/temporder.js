const mongoose = require("mongoose");


let schema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    pincode:Number,
    amount:Number,
    address:String,
    user:{type:  mongoose.Schema.Types.ObjectId, ref: 'users'},
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

        }
    ],
    createdAt: { type: Date, expires: '1440m', default: Date.now }
});


module.exports=mongoose.model('temporder', schema);

