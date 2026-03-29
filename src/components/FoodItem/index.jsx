import { useContext } from 'react'
import { FaStar } from 'react-icons/fa'
import { CartContext } from '../../context/CartContext.jsx'
import './index.css'

const FoodItem = (props) => {
  const { foodData, restaurantName, restaurantId } = props
  const { id, name, price, rating, imageUrl, isVeg: itemIsVeg } = foodData
  // Handle both camelCase and PascalCase from API if needed
  const normalizedPrice = price !== undefined ? price : (foodData.Price !== undefined ? foodData.Price : 0)
  const isVeg = itemIsVeg !== undefined ? itemIsVeg : (foodData.IsVeg !== undefined ? foodData.IsVeg : true)
  
  const { cartItems, requestAddToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)

  // Derive quantity from global cart data
  const cartItem = cartItems.find(item => item.id === id)
  const quantity = cartItem ? cartItem.quantity : 0

  const onAdd = () => {
    requestAddToCart(
      { id, name, price: normalizedPrice, imageUrl, restaurantId, restaurantName, isVeg: isVeg }, 
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
    <li className="food-item-container list-unstyled mb-4 shadow-sm border rounded-3 p-3 bg-white h-100">
      <div className="row g-0 align-items-center">
        <div className="col-4">
          <div className="position-relative">
            <img src={imageUrl} alt={name} className="food-image rounded-3 w-100 shadow-sm" />
          </div>
        </div>
        <div className="col-8 ps-3 ps-md-4">
          <div className="food-header-row mb-2">
            <h1 className="food-name">{name}</h1>
            <div className="type-badge-container ms-3">
              <span className={`type-badge ${isVeg ? 'badge-veg' : 'badge-non-veg'}`}>
                {isVeg ? 'Veg' : 'Non-Veg'}
              </span>
            </div>
          </div>
          
          <p className="food-price mb-2 text-success fw-bold">₹ {normalizedPrice}.00</p>
          
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
