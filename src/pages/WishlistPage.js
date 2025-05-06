// src/pages/WishlistPage.js
import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

// Inside WishlistPage.js
import { AuthContext } from '../context/AuthContext';

const { user } = useContext(AuthContext);
if (!user) return <p>Please login to view your wishlist.</p>;


const WishlistPage = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {wishlist.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;