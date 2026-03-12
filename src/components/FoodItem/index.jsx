import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './index.css'

const FoodItem = (props) => {
  const { foodData } = props
  const { name, cost, rating, imageUrl } = foodData
  const [quantity, setQuantity] = useState(0)

  const onAdd = () => {
    setQuantity(1)
  }

  const onDecrement = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1)
    }
  }

  const onIncrement = () => {
    setQuantity(prev => prev + 1)
  }

  return (
    <li className="food-item-container list-unstyled mb-4">
      <div className="row align-items-center">
        <div className="col-4 col-md-3">
          <img src={imageUrl} alt={name} className="food-image rounded-3 w-100 shadow-sm" />
        </div>
        <div className="col-8 col-md-9 ps-md-4">
          <h2 className="food-name mb-1">{name}</h2>
          <p className="food-price mb-2">₹ {cost}.00</p>
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
