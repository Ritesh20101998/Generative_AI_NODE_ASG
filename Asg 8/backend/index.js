const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connection = require("./config/config")
const productRouter = require('./routes/product.routes')
const reviewRouter = require('./routes/review.routes')

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/products',productRouter);
app.use('/api/reviews', reviewRouter);

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log('db connected..')
    }catch(err){
        console.log(err.message)
    }
    console.log(`server running on port ${process.env.port}`)
})
