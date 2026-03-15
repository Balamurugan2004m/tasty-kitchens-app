import {useNavigate} from "react-router-dom"
import Navbar from "../../components/Navbar"
import "./index.css"

const EmptyCart = () => {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate("/")
  }

  return (
    <div className="empty-cart-page">
      <Navbar />

      <div className="empty-cart-container">

        <img
          src="https://res.cloudinary.com/dy7ogboi4/image/upload/v1773311258/cooking_1_xfqs69.png"
          alt="empty cart"
          className="empty-cart-image"
        />

        <h1 className="empty-cart-title">
          No Orders Yet!
        </h1>

        <p className="empty-cart-text">
          Your cart is empty. Add something from the menu.
        </p>

        <button
          className="order-now-btn"
          onClick={goToHome}
        >
          Order Now
        </button>

      </div>
    </div>
  )
}

export default EmptyCart