import React from "react";

const ContinueShoppingDeals = ({ products }) => {
  return (
    <div className="mt-10 px-5">
      <h2 className="text-xl font-bold mb-5 text-gray-800">Continue Shopping Deals</h2>
      <div className="grid grid-cols-4 gap-4">
        {products.slice(5, 9).map((product) => (
          <div key={product._id} className="bg-white p-3 rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-3 rounded-md"
            />
            <h3 className="text-md font-semibold mb-2">{product.name}</h3>
            <p className="text-lg font-bold text-green-600">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueShoppingDeals;