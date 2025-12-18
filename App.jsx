import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Cart from './components/Cart'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import ProductPage from './pages/ProductPage'
import { api } from './services/api'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      const data = await api.getCart()
      setCartItems(data)
    } catch (error) {
      console.log('Cart not loaded from backend:', error.message)
    }
  }

  const addToCart = async (product) => {
    try {
      await api.addToCart(product.id || product._id)
      const existingItem = cartItems.find(item => (item.id || item._id) === (product.id || product._id))
      if (existingItem) {
        setCartItems(cartItems.map(item => 
          (item.id || item._id) === (product.id || product._id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ))
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }])
      }
    } catch (error) {
      console.log('Backend unavailable, using local cart:', error.message)
      const existingItem = cartItems.find(item => (item.id || item._id) === (product.id || product._id))
      if (existingItem) {
        setCartItems(cartItems.map(item => 
          (item.id || item._id) === (product.id || product._id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ))
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }])
      }
    }
  }

  const removeFromCart = async (productId) => {
    try {
      await api.removeFromCart(productId)
      setCartItems(cartItems.filter(item => (item.id || item._id) !== productId))
    } catch (error) {
      console.log('Backend unavailable, using local cart:', error.message)
      setCartItems(cartItems.filter(item => (item.id || item._id) !== productId))
    }
  }

  const updateQuantity = async (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId)
    } else {
      try {
        await api.updateCartItem(productId, quantity)
        setCartItems(cartItems.map(item => 
          (item.id || item._id) === productId ? { ...item, quantity } : item
        ))
      } catch (error) {
        console.log('Backend unavailable, using local cart:', error.message)
        setCartItems(cartItems.map(item => 
          (item.id || item._id) === productId ? { ...item, quantity } : item
        ))
      }
    }
  }

  return (
    <Router>
      <div className="app">
        <Header 
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setShowCart(!showCart)}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductPage onAddToCart={addToCart} />} />
          </Routes>
          {showCart && (
            <Cart 
              items={cartItems}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onClose={() => setShowCart(false)}
            />
          )}
        </main>
      </div>
    </Router>
  )
}

export default App