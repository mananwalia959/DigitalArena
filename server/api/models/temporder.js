const mongoose = require("mongoose");


let schema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    user:{type:  mongoose.Schema.Types.ObjectId, ref: 'Product'},
    productlist:[
        {
            productid: {
                type:mongoose.Schema.Types.ObjectId, ref: 'Product'
            },
            quantity:{
                type: Number,
                min : 1,
                max : 5
            }

        }
    ]
}, {timestamps: true});

schema.index({createdAt: 1},{expireAfterSeconds: 86400});

module.exports=mongoose.model('temporder', schema);

