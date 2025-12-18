import { useState, useEffect } from 'react'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import { api } from '../services/api'
import { dressProducts } from '../data/products'

const Home = ({ onAddToCart }) => {
  const [products, setProducts] = useState(dressProducts)
  const [filteredProducts, setFilteredProducts] = useState(dressProducts)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await api.getProducts()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.log('Using local data:', error.message)
      setProducts(dressProducts)
      setFilteredProducts(dressProducts)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchTerm) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} />
      )}
    </div>
  )
}

export default Home