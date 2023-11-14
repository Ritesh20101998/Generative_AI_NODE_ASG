const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const connection = require('./config/config')
const userRouter = require('./routes/user.route')
const emailRouter = require("./routes/email.route")

app.use(express.json);
app.use(cors());
app.use("/user",userRouter)
app.use("/email",emailRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to EMail Scheduling Application..")
})

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log('DB connected..')
    } catch(err){
        console.log("not connected")
        console.log(err.message);
    }
    console.log(`Server connected to the port ${process.env.port}`);
})
