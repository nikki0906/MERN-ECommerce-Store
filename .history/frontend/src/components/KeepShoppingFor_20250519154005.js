import React from "react";
import ProductCard from "./ProductCard";
import "./KeepShoppingFor.css";

const KeepShoppingFor = ({ products }) => {
  return (
    <div className="keepShoppingFor">
      <h2>Keep Shopping For</h2>
      <div className="keepShoppingFor__list">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default KeepShoppingFor;