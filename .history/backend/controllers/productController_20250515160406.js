// controllers/productController.js
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import { io } from '../server.js'; // Import the instance of socket

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// ADD new product (Fixed)
export const addProduct = async (req, res) => {
  try {
    const { name, brand, category, image, price, countInStock, description } = req.body;

    // ✅ Validate required fields
    if (!name || !brand || !category || !image || !price || !countInStock || !description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newProduct = new Product({
      name,
      brand,
      category,
      image,
      price,
      countInStock,
      description
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);  // ✅ Respond only once after saving

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;

    const updated = await product.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};