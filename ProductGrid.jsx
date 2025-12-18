import ProductCard from './ProductCard'

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <section className="product-grid">
      <h2>Featured Dresses</h2>
      <div className="grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid