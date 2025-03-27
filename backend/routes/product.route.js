import express from "express";

import Product from "../models/product.model.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: true, data: products });
  } catch (error) {
    console.log("Error in fetching products", error.message);
    res
      .status(500)
      .json({ status: false, message: "Error in fetching products" });
  }
});

router.post("/", async (req, res) => {
  const product = req.body; // user send the data of product in req.body
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ status: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ status: true, data: newProduct });
  } catch (error) {
    console.log("Error in creating product", error.message);
    res.status(500).json({ status: false, message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ status: false, message: "Update Id is Not Valid" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ status: true, data: updatedProduct });
  } catch (error) {
    console.log("Error in Updating product", error.message);
    res.status(500).json({ status: false, message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "Product Deleted" });
  } catch (error) {
    console.log("Error in Product deletion:", error.message);
    res
      .status(404)
      .json({ status: false, message: "Product Not Deleted. Error" });
  }
});

export default router;
