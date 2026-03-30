import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { CartContext } from '../../context/CartContext.jsx'
import { useEffect } from 'react'
import './index.css'

const CartPage = () => {
  const navigate = useNavigate()
  const { cartItems: cartList, increaseQuantity, decreaseQuantity } = useContext(CartContext)

  useEffect(() => {
  if (cartList.length === 0) {
    navigate('/empty-cart')
  }
}, [cartList, navigate])

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
          <div className="cart-header-row d-flex">
            <div className="header-item">Item</div>
            <div className="header-quantity">Quantity</div>
            <div className="header-price">Price</div>
          </div>

          {/* Cart Items */}
          <ul className="cart-items-list p-0">
            {cartList.map(item => (
              <li key={item.id} className="cart-item-row">

                {/* Image and Name Group */}
                <div className="item-details">
                  <img src={item.imageUrl} alt={item.name} className="cart-item-image rounded-3" />

                  {/* Container for Name */}
                  <div className="item-name-container">
                    <h1 className="cart-item-name mb-1">{item.name}</h1>
                    {item.isVeg !== undefined && (
                      <span className={`type-badge ${item.isVeg ? 'badge-veg' : 'badge-non-veg'} ms-4`} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                        {item.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Container */}
                <div className="item-quantity-container">
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

                {/* Price Container */}
                <div className="item-price-container">
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
              <button 
                className="btn text-white place-order-btn px-4 py-2"
                onClick={() => navigate('/place-order')}
              >
                Place Order
              </button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CartPage
