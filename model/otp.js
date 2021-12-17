const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    phone:{
        type:Number,
    },
    code:{
        type:String,
    },
    expireat:{
        type:Date,
        default: Date.now 
    }
},{
    timestamps:true
})


const Otp = new mongoose.model('Otp', otpSchema)

module.exports= Otp