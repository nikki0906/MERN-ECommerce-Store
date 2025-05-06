import React from 'react';

const Banner = () => {
  return (
    <div className="banner">
      <img
        src="https://m.media-amazon.com/images/G/31/IN-Events/Arundhati/store-header-MayART25-PC_SS25_v8.gif"
        alt="Amazon Sale Banner"
        className="banner__image"
      />
      <div className="banner__info">
        <h2>Starting ₹99</h2>
        <p>Bestsellers in Makeup</p>
      </div>
    </div>
  );
};

export default Banner;