import React from "react";
import ProductCard from "./ProductCard";
import "./ContinueShoppingDeals.css";

const ContinueShoppingDeals = ({ products }) => {
  return (
    <div className="continueShoppingDeals">
      <h2>Continue Shopping Deals</h2>
      <div className="continueShoppingDeals__list">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ContinueShoppingDeals;