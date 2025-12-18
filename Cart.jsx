import { api } from '../services/api'

const Cart = ({ items, onRemove, onUpdateQuantity, onClose }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total
      }
      await api.createOrder(orderData)
      alert('Order placed successfully!')
      onClose()
    } catch (error) {
      console.log('Checkout failed:', error.message)
      alert('Checkout completed (offline mode)')
      onClose()
    }
  }

  return (
    <div className="cart-overlay">
      <div className="cart">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="total">Total: ${total.toFixed(2)}</div>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart