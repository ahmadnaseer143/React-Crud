import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
dotenv.config();
const app = express();

app.use(express.json()); // alow us to use json data in the body

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready ");
});

// console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
