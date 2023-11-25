const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const App = express()
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const Boxes = require("./models/Boxes");
require('./db');

App.use(express.json());
App.use(cors());

App.get("/hello",(req,res)=>{
    res.send("Hello World");
})
App.get("/about",(req,res)=>{
    res.send("Response from about endpoint");
})
// Create a box order
App.post("/boxes", async(req,res)=>{
    try{

        const data = req.body;
        const createdBoxes = new Boxes(data);
        await createdBoxes.save();
        // console.log(data);
        res.send("Order placed");
    }
    catch(error){
        res.send(error);
    }

   
})

App.put("/boxes/:id", async(req,res)=>{
    try{

        const data = req.body;
        await Boxes.updateOne({_id: req.params.id},{$set: data});
        // console.log(data);
        res.send("Order Updated");
    }
    catch(error){
        res.send(error);
    }
    
   
})
App.delete("/boxes/:id",async (req,res) => {
    try{
        await Boxes.deleteOne({_id: req.params.id});
        res.send("Deleted Successfully");

    }catch(error){
        res.send(error);

    }
})
// Get all students
App.get("/boxes", async (req,res)=>{
    try{

        const orderList=await Boxes.find();
        // console.log(data);
        res.send(orderList);
    }
    catch(error){
        res.send(error);
    }
})
App.get("/boxes/:id", async (req,res)=>{
    try{
        const orderDetails=await Boxes.findById({_id: req.params.id});
        res.send(orderDetails);

    }catch(error){
        res.send(error);
    }
})

App.listen(PORT,function(){
    console.log("Server is running on localhost:"+PORT);
});