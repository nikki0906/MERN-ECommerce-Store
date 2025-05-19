import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <h2 className="font-bold text-xl">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-500 font-bold">₹ {product.price}</p>
    </div>
  );
};

export default ProductCard;