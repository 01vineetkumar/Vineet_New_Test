const mongoose = require('mongoose')

const dbConnection = async()=>{
    try{
        console.log('MongoDB Connected', process.env.DB_CONNECT)
        const conn = await mongoose.connect("mongodb://localhost:27017/welcome",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((conn)=>{
            console.log(`mongoDB Connected : ${conn.connection.host}`)
        })
    }catch (error){
        console.log('error while connectingdb' + error)
    }
}

module.exports={dbConnection}