const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const fs = require("fs")
const {UserModel} = require("../Model/UserModel")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()




userRouter.get("/get", async(req,res)=>{
    const query =req.query.xyz
    const data= await UserModel.find({})
    res.send(data)
})


userRouter.post('/personal_details', async (req, res) => {
    const { name, age, email } = req.body;
    const newPersonalDetails = new UserModel({
      name,
      age,
      email,
    });

    await newPersonalDetails.save()
      .then(() => {
        res.status(201).json({ message: 'Personal details saved successfully' });
      })
      .catch((error) => {
        console.error('Error saving personal details:', error);
        res.status(500).json({ error: 'An error occurred while saving personal details' });
      });
  });














//Login====================================================================>

userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body
    
try {
    const user =await UserModel.findOne({email})
 
    if(user){
        const hashed_pass = user.password
        bcrypt.compare(password,hashed_pass,(err,result)=>{
            if(result){
           
                const token = jwt.sign({"userID":user._id,role:user.role},'masai',{expiresIn:"1h"})
                const refreshtoken = jwt.sign({"userID":user._id,role:user.role},'kasai',{expiresIn:"7d"})
                res.cookie("token",token,{httpOnly:true,maxAge:1000000}).cookie("refreshtoken",refreshtoken,{httpOnly:true,maxAge:1000000})
            //    redis.set("token",token)
            //  redis.set("refreshtoken",refreshtoken)
             res.json({"msg":"Login Successfully","token":token,"refreshtoken":refreshtoken})
            
            }else{
                res.json({"msg":"Login Failed"})
            }
        })
    }else{
        res.json({"msg":"Result Not Correct"})
        console.log(err)
    }
} catch (error) {
   
    console.log(error)
    res.send({"msg":"Login failed Error in try"})
}   
 })
module.exports ={
    userRouter
}