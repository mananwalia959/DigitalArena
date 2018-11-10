const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type: String, 
        required: true, 
        },
    status:{
        type:String,
        default:"active"
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    cart:[{type:  mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('User', userSchema);