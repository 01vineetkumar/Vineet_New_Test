const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

app.use(express.json())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const {dbConnection} = require('./connection/database')
dbConnection()

const routes = require('./route/routes')
app.use('/', routes)

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`code is running on ${port}`)
})