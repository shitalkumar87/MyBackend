const express=require("express")
require("dotenv").config()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const postRouter=express.Router()
postRouter.use(express.json())

const {PostModel}=require("../model/post.models")
postRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization
    const data= await PostModel.find()
     try{
        jwt.verify(token, 'masai', (err, decoded)=>{
            if(err){
                res.send("err")
            }
            else{
                res.send(data)
            }
        })
     }
     catch(err){
        res.send("Eroor")
     }
})

postRouter.post("/register",async(req,res)=>{
     
    const payload=req.body
    try{
           let new_notes=new PostModel(payload)
           await new_notes.save()
           res.send("create the notes")
    }
    catch(err){
         res.send("wrong Credentials")
    }

 
})

postRouter.delete("/delete/:id",async(req,res)=>{

    const Id=req.params.id;
    const note= await PostModel.findOne({"_id":Id})
    const user_in_note=note.userID
    const userid_making_req=req.body.userID
    try{
        if(user_in_note!==userid_making_req){
            res.send({msg:"You are not authorized"})
        }
        else{
            await PostModel.findByIdAndDelete({"_id":Id})
            res.send("Data deleted Successfully")
        }
         
        
    }
    catch(err){
        res.send("Wrong Credentials")
    }
    
})

postRouter.patch("/edit/id",async(req,res)=>{
    const Id=req.params.id;
    const payload=req.body;
    const note= await PostModel.findOne({_id:Id})
    const user_in_note=note.userID
    const userid_making_req=req.body.userID
    try{
        if(userid_making_req!==user_in_note){
            res.send({msg:"you are not authorized"})
        }
         else{
            await PostModel.findByIdAndUpdate({_id:Id},payload)
            res.send("update the notes")
         }
         
         
    }
    catch(err){
        res.send("Wrong Credentials")
    }
})

module.exports={postRouter}