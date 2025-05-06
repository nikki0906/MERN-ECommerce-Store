import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      setProduct(res.data);
    }).catch((err) => {
      toast.error('Failed to load product');
    });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <div style={styles.details}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>₹{product.price}</h3>
        <button onClick={handleAddToCart} style={styles.button}>Add to Cart</button>
        {/* Future: Wishlist button */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    padding: '2rem',
    gap: '2rem',
  },
  image: {
    width: '300px',
    borderRadius: '10px',
  },
  details: {
    flex: 1,
  },
  button: {
    marginTop: '1rem',
    padding: '10px 20px',
    backgroundColor: '#0077cc',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  }
};

export default ProductDetailsPage;
