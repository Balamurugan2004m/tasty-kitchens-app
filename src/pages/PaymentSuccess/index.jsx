import { useNavigate } from "react-router-dom"
import { FaCheck } from "react-icons/fa"
import Navbar from "../../components/Navbar"
import "./index.css"

const PaymentSuccess = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate("/")
  }

  return (
    <div className="payment-success-page">
      <Navbar />
      <div className="payment-success-content-wrapper p-4 p-md-5 text-center">
        <div className="success-icon mb-4">
          <FaCheck />
        </div>

        <h1 className="success-title mb-3">
          Payment Successful
        </h1>

        <p className="success-text mb-1">
          Thank you for ordering
        </p>

        <p className="success-text mb-4">
          Your payment is successfully completed.
        </p>

        <button
          className="btn home-btn"
          onClick={goHome}
        >
          Go To Home Page
        </button>
      </div>
    </div>
  )
}

export default PaymentSuccess