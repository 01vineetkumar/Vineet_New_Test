const mongoose = require('mongoose')


const paySchema = new mongoose.Schema({
    updateId:{
        type: mongoose.Types.ObjectId,
        ref: 'Update'
    },
    name:{
        type:String,
        default:""
    },
    Bank_name:{
        type:String,
        default:""
    },
    Branch:{
        type:String,
        default:""
    },
    IFSC_code:{
        type:String,
        default:""
    },
    Amount:{
        type:Number,
        default:""
    },
    Account_number:{
        type:Number,
        default:""
    }
})

const Pay = new mongoose.model('Pay', paySchema)

module.exports= Pay