import React from 'react';
import Slider from 'react-slick';
import './CarouselSlider.css';

const CarouselSlider = ({ items = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Defensive check: filter out any items that don't have valid image and name strings
  const validItems = items.filter(
    (item) =>
      item &&
      typeof item.image === 'string' &&
      item.image.trim() !== '' &&
      typeof item.name === 'string' &&
      item.name.trim() !== ''
  );

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {validItems.length > 0 ? (
          validItems.map((item, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={item.image}
                alt={item.name}
                className="carousel-image"
                loading="lazy"
              />
            </div>
          ))
        ) : (
          <div className="carousel-slide">
            <img
              src="https://via.placeholder.com/800x400"
              alt="Default slide"
              className="carousel-image"
              loading="lazy"
            />
          </div>
        )}
      </Slider>
    </div>
  );
};

export default CarouselSlider;