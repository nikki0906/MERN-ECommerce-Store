// controllers/productController.js
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);  // <-- important
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
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

// Update
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Delete
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

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

export const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;

    const products = await Product.find({
      name: { $regex: query, $options: "i" }, // case-insensitive search
    });

    res.json(products);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Server Error in search" });
  }
};

export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Product',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample',
    category: 'Sample',
    countInStock: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});