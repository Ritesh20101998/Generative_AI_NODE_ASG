const express = require('express');
const productRouter = express.Router();
const Product = require('../models/product.model');

// Routes for adding a new product
productRouter.post("/",async(req,res)=>{
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add a product' });
  }
})

//fetch all produts
productRouter.get("/",async(req,res)=>{
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
})

// Route for fetching a product by ID
productRouter.get("/:id",async(req,res)=>{
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the product' });
  }
})

// Route for updating a product by ID
productRouter.put("/:id",async(req,res)=>{
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the product' });
  }
})

// Route for deleting a product by ID
productRouter.delete("/:id",async(req,res)=>{
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send({"message":"Product deleted successfully..."}); // No content
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the product' });
  }
})

module.exports = productRouter;