const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String,
})


const UserModel = mongoose.model("user",userSchema)

module.exports ={
    UserModel
}