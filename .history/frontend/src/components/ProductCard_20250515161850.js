import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/products/${product._id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-card__image"
      />
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__price">₹{product.price}</p>
        <button className="product-card__button" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button onClick={handleDelete}>Delete Product</button>
      </div>
      
    </div>
  );
};

export default ProductCard;