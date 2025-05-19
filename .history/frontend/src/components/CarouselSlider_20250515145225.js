import React from 'react';
import Slider from 'react-slick';
import './CarouselSlider.css';

const CarouselSlider = () => {
  const banners = [
    "https://via.placeholder.com/1200x400?text=Amazon+Sale+1",
    "https://via.placeholder.com/1200x400?text=Amazon+Sale+2",
    "https://via.placeholder.com/1200x400?text=Amazon+Sale+3",
  ];

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
    <div className="carousel-slider">
      <Slider {...settings}>
        {banners.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSlider;