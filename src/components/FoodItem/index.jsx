import { useContext } from 'react'
import { FaStar } from 'react-icons/fa'
import { CartContext } from '../../context/CartContext.jsx'
import './index.css'

const FoodItem = (props) => {
  const { foodData, restaurantName, restaurantId } = props
  const { id, name, price, rating, imageUrl } = foodData
  
  const { cartItems, requestAddToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)

  // Derive quantity from global cart data
  const cartItem = cartItems.find(item => item.id === id)
  const quantity = cartItem ? cartItem.quantity : 0

  const onAdd = () => {
    requestAddToCart(
      { id, name, price: price, imageUrl, restaurantId, restaurantName }, 
      restaurantName
    )
  }

  const onDecrement = () => {
    decreaseQuantity(id)
  }

  const onIncrement = () => {
    increaseQuantity(id)
  }

  return (
    <li className="food-item-container list-unstyled mb-4">
      <div className="row align-items-center">
        <div className="col-4 col-md-3">
          <img src={imageUrl} alt={name} className="food-image rounded-3 w-100 shadow-sm" />
        </div>
        <div className="col-8 col-md-9 ps-md-4">
          <h1 className="food-name mb-1">{name}</h1>
          <p className="food-price mb-2">₹ {price}.00</p>
          <div className="d-flex align-items-center mb-3 food-rating-row">
            <FaStar className="star-icon me-1 text-warning" />
            <span className="rating-text">{rating}</span>
          </div>
          
          {quantity === 0 ? (
            <button className="btn btn-outline-warning add-button" onClick={onAdd}>
              ADD
            </button>
          ) : (
            <div className="quantity-controller d-flex align-items-center">
              <button className="btn btn-light control-btn border" onClick={onDecrement}>-</button>
              <span className="quantity-count mx-3 fw-bold">{quantity}</span>
              <button className="btn btn-light control-btn border" onClick={onIncrement}>+</button>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default FoodItem
