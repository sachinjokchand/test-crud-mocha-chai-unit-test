const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required: true,
        trim: true,
    },
    price : {
        type : String,
        required: true,
        trim: true,
    },
    description : {
        type : String,
        trim : true,
    }
}, {timestamps : true});


module.exports = mongoose.model('Product', productSchema);