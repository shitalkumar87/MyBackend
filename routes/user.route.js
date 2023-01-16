const express=require("express")
require("dotenv").config()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router()
userRouter.use(express.json())
 
const {UserModel}=require("../model/user.models")
userRouter.post("/login",async(req,res)=>{
     const {email,pass}=req.body
     try{
         const user=await UserModel.find({email})
         if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
             if(result){
                 var token=jwt.sign({userID:user[0]._id},process.env.key)
                 result.send({msg:"Login Done",token})
             }
             else{
                res.send("wrong Credentials",err)
             }
            })

         }
     }
     catch(err){
        console.log("error in Login",err)
        res.send("err")
     }
})

userRouter.post("/register",async(req,res)=>{
     
    const {name,email,gender,pass}=req.body
    try{
        bcrypt.hash(pass,5,async(err,secure_pwd)=>{
            if(err){
                console.log(err)
            }
            else{
                const user=new UserModel({name,email,pass:secure_pwd,gender})
                await user.save()
                res.data("Data posted Successfully")
            }
        })
        

        }
    
    catch(err){
       console.log("error in Login",err)
    }

})

userRouter.patch("/edit",async(req,res)=>{
    const Id=req.params.id
    const payload=req.body
    try{
         await UserModel.findByIdAndUpdate({_id:Id},payload)
        res.send("Data patch Successfully")
    }
    catch(err){
        console.log(err)
    }
})

userRouter.delete("/delete/:id",async(req,res)=>{
    const Id=req.params.id
    try{ 
            await UserModel.findByIdAndDelete({_id:Id})
           res.send("USER deleted Successfully")
        }
        

        
    
    catch(err){
       console.log("error in Login",err)
    }
})

module.exports={userRouter}