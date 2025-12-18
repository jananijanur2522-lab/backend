import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../services/api'
import { dressProducts } from '../data/products'

const ProductPage = ({ onAddToCart }) => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await api.getProduct(id)
      setProduct(data)
    } catch (error) {
      console.log('Using local data:', error.message)
      const localProduct = dressProducts.find(p => p.id === parseInt(id))
      setProduct(localProduct)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading product...</div>
  if (!product) return <div className="error">Product not found</div>

  return (
    <div className="page-container">
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>
          <div className="availability">
            <span className={`status ${product.inStock !== false ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock !== false ? '✅ In Stock' : '❌ Out of Stock'}
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
    </div>
  )
}

export default ProductPage