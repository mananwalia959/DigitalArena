var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    status:{type:String,enum:['Available','Out of Stock'],default:'Available'}

});
module.exports = mongoose.model('Product', schema);