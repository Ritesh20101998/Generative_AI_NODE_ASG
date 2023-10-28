const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const app = express()

const connection = require('./config/config')
const parkingRouter = require("./routes/parking.routes")

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
});

app.use(express.json())
app.use(cors())
app.use(limiter)
app.use("/api",parkingRouter)

app.get("/", (req,res)=>{
    res.send("Welcome to DJ Parking")
})

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection 
        console.log("DB connected successfully..")
    }catch(err){    
        console.log(err.message)
        console.log("DB not Connected..")
    }
    console.log(`Server is running on port ${process.env.port}`);
})