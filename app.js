const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const port = 4000;
const indexRouter = require('./routes/index')
require('dotenv').config()

const app = express()
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD
// console.log("mongoURI", MONGODB_URI_PROD)
app.use(bodyParser.json())
app.use(cors())
app.use('/api', indexRouter)

// const mongoURI = `mongodb://localhost:27017/todoList`
const mongoURI = MONGODB_URI_PROD
mongoose.connect(mongoURI).then(() => {
    console.log("mongoose connected")
}).catch((err) => {
    console.log("DB connection fail", err)
});

app.listen(port, () => {
    console.log("server on 4000")
})

