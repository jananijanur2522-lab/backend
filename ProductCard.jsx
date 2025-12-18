const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>
          <a href={`/product/${product.id || product._id}`} className="product-link">
            {product.name}
          </a>
        </h3>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
        <div className="availability">
          <span className={`status ${product.inStock !== false ? 'available' : 'unavailable'}`}>
            {product.inStock !== false ? '✅ Available' : '❌ Out of Stock'}
          </span>
        </div>
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
          disabled={product.inStock === false}
        >
          {product.inStock !== false ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard