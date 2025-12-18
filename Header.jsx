const Header = ({ cartCount, onCartClick }) => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">👗 DressShop</h1>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/login">Login</a>
        </nav>
        <button className="cart-btn" onClick={onCartClick}>
          🛒 Cart ({cartCount})
        </button>
      </div>
    </header>
  )
}

export default Header