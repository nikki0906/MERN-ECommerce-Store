import React from "react";

const KeepShoppingFor = ({ products }) => {
  return (
    <div className="mt-10 px-5">
      <h2 className="text-xl font-bold mb-5 text-gray-800">Keep Shopping For</h2>
      <div className="grid grid-cols-5 gap-4">
        {products.slice(0, 5).map((product) => (
          <div key={product._id} className="bg-white p-3 rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-3 rounded-md"
            />
            <h3 className="text-md font-semibold mb-2">{product.name}</h3>
            <p className="text-lg font-bold text-green-600">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeepShoppingFor;