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

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {items.length > 0 ? (
          items.map((item, index) => (
            typeof item === 'string' ? (
              <div key={index} className="carousel-slide">
                <img src={item} alt={`Slide ${index}`} className="carousel-image" />
              </div>
            ) : (
              <div key={index} className="carousel-slide">
                <img src={item.image} alt={item.name} className="carousel-image" />
              </div>
            )
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