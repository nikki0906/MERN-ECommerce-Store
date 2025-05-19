import Cart from "../models/CartModel.js";

// Add to Cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required." });
  }

  try {
    const { productId } = req.body;
    const newCartItem = new Cart({ product: productId, quantity: 1 });
    await newCartItem.save();
    res.status(201).json({ message: 'Product added to cart', newCartItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product to cart', error });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Cart Items
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ message: "Cart is empty", cart: [] });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Item Quantity
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity === undefined) {
    return res.status(400).json({ message: "Product ID and new quantity required" });
  }

  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.productId.toString() === productId);

    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Clear Cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};