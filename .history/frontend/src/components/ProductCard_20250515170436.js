import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, onDelete }) => {
  const { addToCart } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleDelete = () => {
    onDelete(product); // Calls the delete handler from HomePage
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="product-card">
      <img
        src={updatedProduct.image}
        alt={updatedProduct.name}
        className="product-card__image"
      />
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__price">₹{product.price}</p>

        <button className="addToCartBtn" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button className="editBtn" onClick={handleEditToggle}>
          Edit
        </button>

        <button className="deleteBtn" onClick={handleDelete}>
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;