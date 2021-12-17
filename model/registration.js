const mongoose = require('mongoose')


const registrationSchema = new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
        required:true,
    },

})

const Registration = new mongoose.model('Registration', registrationSchema)

module.exports= Registration