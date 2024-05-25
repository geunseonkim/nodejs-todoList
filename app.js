const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const port = 4000;
const indexRouter = require('./routes/index')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/api', indexRouter)

const mongoURI = `mongodb://localhost:27017/todoList`
mongoose.connect(mongoURI).then(() => {
    console.log("mongoose connected")
}).catch((err) => {
    console.log("DB connection fail", err)
});

app.listen(port, () => {
    console.log("server on 4000")
})

