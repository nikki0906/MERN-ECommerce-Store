const ProductListingPage = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = ["Electronics", "Books", "Clothing", "Home Appliances"];

  const filteredProducts = products.filter((product) => {
    return (
      product.name &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category ? product.category === category : true) &&
      (minPrice ? product.price >= Number(minPrice) : true) &&
      (maxPrice ? product.price <= Number(maxPrice) : true)
    );
  });

  return (
    <div className="product-listing-page">
      <h2>All Products</h2>
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryFilter category={category} setCategory={setCategory} categories={categories} />
      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};