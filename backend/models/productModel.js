// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }, // Can store base64 or URL
  description: { type: String }, // Optional but recommended
  price: { type: Number },       // Add if you’re selling
  countInStock: { type: Number }, // Optional stock count
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;