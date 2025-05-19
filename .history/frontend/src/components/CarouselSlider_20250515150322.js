import React from 'react';
import Slider from 'react-slick';
import './CarouselSlider.css'; // Make sure you create this CSS for styling

const CarouselSlider = ({ items = [] }) => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="carousel-slide">
              <img src={item.image} alt={item.name} className="carousel-image" />
            </div>
          ))
        ) : (
          <div className="carousel-slide">
            <img
              src="https://via.placeholder.com/800x400"
              alt="Placeholder Image"
              className="carousel-image"
            />
          </div>
        )}
      </Slider>
    </div>
  );
};

export default CarouselSlider;