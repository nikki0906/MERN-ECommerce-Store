const ProductCard = ({ product }) => {
  console.log('Rendering ProductCard with:', product);
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p>Category: {product.category}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;