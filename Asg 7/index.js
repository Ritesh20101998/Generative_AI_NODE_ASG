const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
const connection = require('./config/config');
const userRouter = require("./routes/user.route")

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users",userRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to user Section..")
})

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log('DB connected..');
    } catch(err){
        console.log(err.message);
    }
    console.log(`Server connected to port ${process.env.port}`);
})