import { useContext } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { CartContext } from '../../context/CartContext.jsx'
import './index.css'

const CartPage = () => {
  const { cartItems: cartList, increaseQuantity, decreaseQuantity } = useContext(CartContext)

  const incrementQuantity = (id) => {
    increaseQuantity(id)
  }

  const decrementQuantity = (id) => {
    decreaseQuantity(id)
  }

  const calculateTotal = () => {
    return cartList.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

  return (
    <div className="cart-page-container">
      <Navbar />
      <div className="cart-body">
        <div className="cart-content-container">
          {/* Header Row */}
          <div className="cart-header-row d-none d-md-flex">
            <div className="header-item">Item</div>
            <div className="header-quantity">Quantity</div>
            <div className="header-price">Price</div>
          </div>

          {/* Cart Items */}
          <ul className="cart-items-list p-0">
            {cartList.map(item => (
              <li key={item.id} className="cart-item-row d-flex flex-column flex-md-row align-items-start align-items-md-center">

                {/* Image and Name Group */}
                <div className="item-details d-flex flex-row w-100 w-md-auto align-items-start align-items-md-center">
                  <img src={item.imageUrl} alt={item.name} className="cart-item-image rounded-3" />

                  {/* Container for Name + Mobile Quantity/Price */}
                  <div className="d-flex flex-column justify-content-between ms-0 ms-md-3 ms-lg-4 w-100 pt-1" style={{ minHeight: '90px' }}>
                    <h1 className="cart-item-name mb-0 ms-3 ms-md-0">{item.name}</h1>

                    {/* Mobile Only: Controls below name */}
                    <div className="d-flex d-md-none flex-column ms-3 mt-auto pl=2">
                      <div className="d-flex align-items-center mb-2 mt-2">
                        <button
                          className="btn p-0 quantity-btn p"
                          onClick={() => decrementQuantity(item.id)}
                          aria-label="Decrease quantity"
                        >
                          <FiMinus />
                        </button>
                        <span className="quantity-text mx-3 fw-bold">{item.quantity}</span>
                        <button
                          className="btn p-0 quantity-btn"
                          onClick={() => incrementQuantity(item.id)}
                          aria-label="Increase quantity"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <p className="cart-item-price mb-0 fw-bold">₹ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Only: Quantity Container */}
                <div className="item-quantity-container d-none d-md-flex justify-content-center align-items-center">
                  <button
                    className="btn p-0 quantity-btn"
                    onClick={() => decrementQuantity(item.id)}
                    aria-label="Decrease quantity"
                  >
                    <FiMinus />
                  </button>
                  <span className="quantity-text mx-4 fw-bold">{item.quantity}</span>
                  <button
                    className="btn p-0 quantity-btn"
                    onClick={() => incrementQuantity(item.id)}
                    aria-label="Increase quantity"
                  >
                    <FiPlus />
                  </button>
                </div>

                {/* Desktop Only: Price Container */}
                <div className="item-price-container d-none d-md-block">
                  <p className="cart-item-price mb-0 fw-bold">₹ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>

          <hr className="cart-divider" />

          {/* Footer Row */}
          <div className="cart-summary-row d-flex justify-content-between mt-4">
            <h1 className="order-total-label mb-0">Order Total :</h1>
            <div className="d-flex flex-column align-items-end summary-action-container">
              <h1 className="order-total-value mb-4">₹{calculateTotal().toFixed(2)}</h1>
              <button className="btn text-white place-order-btn px-4 py-2">Place Order</button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CartPage
