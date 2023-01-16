

const jwt=require("jsonwebtoken")
require("dotenv").config()
const Authentication =(req,res,next)=>{
    const token=req.headers.authorization
    if(token){

        const decoded=jwt.verify(token,process.env.key)
        if(decoded){
            const userID=decoded.userID
            req.body.userID=userID
            next()
        }
        else{
             res.send("Login first")
        }
    }
    
    else{
        res.send("Login first")
   }
}

module.exports={Authentication}
