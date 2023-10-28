const express = require('express');
const userController = require("../controllers/user.controller")

const userRouter = express.Router()

// welcome
userRouter.get("/", (req,res)=>{
    res.send({"message" : "Start api successfully.."})
})

//Signup Route
userRouter.post("/signup", userController.signup);

//Login Route
userRouter.post("/login",userController.login);

module.exports = userRouter;