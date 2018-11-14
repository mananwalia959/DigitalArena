const mongoose = require('mongoose');

const Pincodes = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pincode:{type: Number, required: true,unique:true}
});

module.exports = mongoose.model('pincodes', Pincodes);