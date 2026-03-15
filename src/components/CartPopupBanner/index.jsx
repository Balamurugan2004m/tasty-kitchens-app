import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext.jsx'
import './index.css'

const CartPopupBanner = ({ currentRestaurantId }) => {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  // Calculate total quantity of items (e.g. 5x Samosas = 5 items)
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  // Get active restaurant ID from cart
  const cartRestaurantId = cartItems.length > 0 ? cartItems[0].restaurantId : null

  // Only render the banner if there are items in the cart AND the items belong to the current restaurant
  if (totalQuantity === 0 || cartRestaurantId !== currentRestaurantId) {
    return null
  }

  const navigateToCart = () => {
    navigate('/cart')
  }

  return (
    <div className="cart-popup-banner-container">
      <div className="cart-popup-content d-flex justify-content-between align-items-center" onClick={navigateToCart}>
        <div className="cart-popup-left">
          <span className="cart-item-count fw-bold">
            {totalQuantity} {totalQuantity === 1 ? 'Item' : 'Items'} added
          </span>
        </div>
        <div className="cart-popup-right d-flex align-items-center">
          <span className="view-cart-text fw-bold me-1">View Cart</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="view-cart-arrow"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default CartPopupBanner
