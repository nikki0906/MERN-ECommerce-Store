import React, { useEffect, useState } from 'react';
import CarouselSlider from '../components/CarouselSlider';
import ProductListingPage from './ProductListingPage';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products || data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 🟢 **Carousel Banner Items**
  const bannerItems = [
    "https://via.placeholder.com/800x400?text=Banner+1",
    "https://via.placeholder.com/800x400?text=Banner+2",
    "https://via.placeholder.com/800x400?text=Banner+3"
  ];

  // Merge fetched product images into the banner if needed
  const productImages = products.map(product => product.image);
  const allCarouselItems = [...bannerItems, ...productImages];

  return (
    <div className="home-page">
      <CarouselSlider items={allCarouselItems} />
      <ProductListingPage products={products} />
    </div>
  );
};

export default HomePage;