const mongoose = require('mongoose')


const updateSchema = new mongoose.Schema({
    firstname:{
        type:String,
        default:""
    },
    lastname:{
        type:String,
        default:""
    },
    email:{
        type:String,
        default:""
    },
    selectstate:{
        type:String,
        default:""
    },
    selectcity:{
        type:Number,
        default:""
    },
    selectparty:{
        type:Number,
        default:""
    },
    designation:{
        type:Number,
        default:""
    },
    leaderName:{
        type:Number,
        default:""
    },
    facebook:{
        type:Number,
        default:""
    },
    instagram:{
        type:Number,
        default:""
    },
    twitter:{
        type:Number,
        default:""
    }
})

const Update = new mongoose.model('Update', updateSchema)

module.exports= Update