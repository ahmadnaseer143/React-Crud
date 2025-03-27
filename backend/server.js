import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // alow us to use json data in the body

app.use("/api/products", productRoutes);

app.listen(port, () => {
  connectDB();
  console.log("Server started at http://localhost:" + port);
});
