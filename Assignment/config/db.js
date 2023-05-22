// const mongoose = require("mongoose")

// const connection =mongoose.connect("mongodb+srv://ayushibajpai:<password>@cluster0.gskll86.mongodb.net/?retryWrites=true&w=majority")


const mongoose = require("mongoose")
require("dotenv").config()
mongoose.set('strictQuery',true)

const connection = mongoose.connect(process.env.mongourl)

module.exports={
    connection
}