import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: true, data: products });
  } catch (error) {
    console.log("Error in fetching products", error.message);
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
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
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ status: false, message: "Delete Id is Not Valid" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "Product Deleted" });
  } catch (error) {
    console.log("Error in Product deletion:", error.message);
    res.status(500).json({ status: false, message: "Server Error" });
  }
};
