const express = require("express")
 const app = express()
 app.use(express.json())
 require("dotenv").config()



 
 const {connection} = require("./config/db")

const {userRouter} = require("./Route/UserRoute")

app.get("/",(req,res)=>{
   console.log(req.cookies)
   res.json("Welcome")

})

app.use("/api",userRouter)


             
    
 app.listen(process.env.port,async()=>{
    try {
       await connection 
    console.log("Connected to DB")
    } catch (error) {
      console.log(error)
    }
    console.log("Server on 8080")
 })