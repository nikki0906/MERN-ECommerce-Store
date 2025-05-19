import express from "express";
import { 
  getAllUsers, 
  addUser, 
  updateUser, 
  deleteUser 
} from "../controllers/userController.js";

import {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// 🔹 User Routes
router.get("/users", getAllUsers);
router.post("/users", addUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// 🔹 Product Routes
router.get("/products", getAllProducts);
router.post("/products", addProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", deleteProduct);

export default router;