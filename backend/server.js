import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
dotenv.config();
const app = express();

app.use(express.json()); // alow us to use json data in the body

app.get("/", (req, res) => {
  res.send("Server is ready ");
});

app.post("/api/products", async (req, res) => {
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

// console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
