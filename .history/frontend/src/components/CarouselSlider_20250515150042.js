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
  };

   return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <Slider key={index}>{item}</Slider>  // ❌ This is the mistake
      ))}
    </Slider>
  );
};

export default CarouselSlider;