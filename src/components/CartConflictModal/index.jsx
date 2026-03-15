import { useContext } from 'react'
import { CartContext } from '../../context/CartContext.jsx'
import './index.css'

const CartConflictModal = () => {
  const { conflictDetails, resolveConflict } = useContext(CartContext)

  if (!conflictDetails) return null

  const { existingRestaurantName, newRestaurantName } = conflictDetails

  return (
    <div className="cart-conflict-overlay">
      <div className="cart-conflict-modal rounded-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="conflict-title mb-0">Replace cart item?</h2>
          <button 
            className="btn-close shadow-none icon-close" 
            onClick={() => resolveConflict(false)}
            aria-label="Close"
          ></button>
        </div>
        <p className="conflict-message mb-4">
          Your cart contains dishes from {existingRestaurantName}. Do you want to discard the selection and add dishes from {newRestaurantName}?
        </p>
        <div className="conflict-actions d-flex justify-content-between">
          <button 
            className="btn conflict-btn conflict-btn-no w-100 me-2 fw-bold" 
            onClick={() => resolveConflict(false)}
          >
            No
          </button>
          <button 
            className="btn conflict-btn conflict-btn-replace w-100 ms-2 fw-bold text-white" 
            onClick={() => resolveConflict(true)}
          >
            Replace
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartConflictModal
