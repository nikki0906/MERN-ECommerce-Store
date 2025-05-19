const ProductCard = ({ product }) => {
  if (!product || typeof product !== 'object') return null;

  return (
    <div className="product-card">
      <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name || 'Product'} />
      <h3>{product.name || 'Unnamed product'}</h3>
      <p>Price: ₹{product.price != null ? product.price : 'N/A'}</p>
      <p>Category: {product.category || 'Uncategorized'}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;