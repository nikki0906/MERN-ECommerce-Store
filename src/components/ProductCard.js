// ProductCard.js
import React from 'react';
import './ProductCard.css';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // ✅ use custom hook

  const { name, image, price, description } = product;

  return (
    <div className="productCard">
      <img src={image} alt={name} className="productCard__image" />
      <div className="productCard__info">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="productCard__price">₹{price}</div>
        <button
          className="productCard__button"
          onClick={() => addToCart(product)} // ✅ use addToCart from context
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;