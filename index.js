const express=require("express")
const app=express()
const {connection}=require("./config/db")
app.use(express.json())
require("dotenv").config()
const cors=require("cors")
app.use(cors({origin:"*"}))
 app.get("/",(req,res)=>{
    res.send("Homepage")
 })

const {userRouter} =require("./routes/user.route")
  const {postRouter}=require("./routes/post.route")
const {Authentication}=require("./middleware/authenticate.middleware")

app.use("/users",userRouter)

app.use(Authentication)
app.use("/posts",postRouter)
 
app.listen(process.env.PORT,async()=>{
  try{
    await  connection
    console.log("Connection to DB")
  }
  catch(err){
    console.log(err)
  }
   console.log(`Port is running on ${process.env.PORT}`)
})