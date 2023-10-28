const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express()

const connection = require("./config/config")
const userRoutes = require("./routes/user.route")

app.use(express.json())
app.use(cors())
app.use("/api", userRoutes)

app.get("/", (req,res)=>{
    res.send({"message" : "Start server successfully.."})
})

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection 
        console.log("DB connected successfully...")
    } catch(err){
        console.log("DB not connected..")
    }
    console.log(`Server running on port ${process.env.port}`)
})
