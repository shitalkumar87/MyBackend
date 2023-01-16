const mongoose=require("mongoose")

const postschema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userID:String
     
})

const PostModel=mongoose.model("post",postschema)
module.exports={PostModel}