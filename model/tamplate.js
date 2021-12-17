const mongoose = require('mongoose')

const templateschema = new mongoose.Schema({
    text:{
        type: String,
        default:""
    },
    file:{
        type:String,
    },
    filetype:{
        type:String,
      //  required:true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
})
const Template = new mongoose.model('Template', templateschema )

module.exports= Template

