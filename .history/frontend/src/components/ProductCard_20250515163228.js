import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, onEdit }) => {
  const { addToCart } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  // Add to Cart Handler
  const handleAddToCart = () => {
    addToCart(product);
  };

  // Delete Product Handler
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/products/${product._id}`, {
        method: 'DELETE',
      });
      alert('Product Deleted Successfully');
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  // Edit Mode Toggle
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Update Product Handler
  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/api/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      alert('Product Updated Successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <div className="product-card">
      <img
        src={updatedProduct.image}
        alt={updatedProduct.name}
        className="product-card__image"
      />
      <div className="product-card__info">
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
              className="product-card__input"
            />
            <input
              type="text"
              value={updatedProduct.description}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  description: e.target.value,
                })
              }
              className="product-card__input"
            />
            <input
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
              className="product-card__input"
            />
          </>
        ) : (
          <>
            <h3 className="product-card__name">{product.name}</h3>
            <p className="product-card__description">{product.description}</p>
            <p className="product-card__price">₹{product.price}</p>
          </>
        )}

        <button className="addToCartBtn" onClick={handleAddToCart}>
          Add to Cart
        </button>

        {isEditing ? (
          <button className="saveBtn" onClick={handleUpdate}>
            Save
          </button>
        ) : (
          <button className="editBtn" onClick={handleEditToggle}>
            Edit
          </button>
        )}

        <button className="deleteBtn" onClick={handleDelete}>
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;