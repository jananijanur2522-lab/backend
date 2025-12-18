const API_BASE_URL = 'http://localhost:3001/api'

export const api = {
  // Products
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`)
    return response.json()
  },

  getProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    return response.json()
  },

  // Cart
  addToCart: async (productId, quantity = 1) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    })
    return response.json()
  },

  getCart: async () => {
    const response = await fetch(`${API_BASE_URL}/cart`)
    return response.json()
  },

  updateCartItem: async (productId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    })
    return response.json()
  },

  removeFromCart: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: 'DELETE'
    })
    return response.json()
  },

  // Orders
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    return response.json()
  }
}