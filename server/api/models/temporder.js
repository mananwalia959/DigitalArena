const mongoose = require("mongoose");


let schema = mongoose.Schema({
    id: String,
    name: String,
}, {timestamps: true});

schema.index({createdAt: 1},{expireAfterSeconds: 86400});

module.exports=mongoose.model('temporder', schema);