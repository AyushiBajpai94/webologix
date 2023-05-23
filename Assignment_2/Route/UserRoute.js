const express = require("express")
const mongoose = require("mongoose")
const {UserModel} = require("../Model/UserModel")
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






module.exports ={
    userRouter
}