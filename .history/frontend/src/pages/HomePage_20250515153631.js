import React, { useEffect, useState } from 'react';
import ProductListingPage from './ProductListingPage';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products (adjust URL as needed)
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => {
        // Defensive: make sure data.products is an array
        const productsData = Array.isArray(data.products) ? data.products : data;
        setProducts(productsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Carousel Banner Items: these are static banners with valid image URLs and names
  const bannerItems = [
    { image: 'https://via.placeholder.com/800x400?text=Banner+1', name: 'Banner 1' },
    { image: 'https://via.placeholder.com/800x400?text=Banner+2', name: 'Banner 2' },
    { image: 'https://via.placeholder.com/800x400?text=Banner+3', name: 'Banner 3' },
  ];

  return (
    <div className="home-page">
      {/* Carousel Slider with clean data */}
      <CarouselSlider items={bannerItems} />

      {/* Product listing */}
      <ProductListingPage products={products} />
    </div>
  );
};

export default HomePage;