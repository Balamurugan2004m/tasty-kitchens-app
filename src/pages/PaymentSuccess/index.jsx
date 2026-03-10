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
    <>
      <Navbar />

      <div className="container payment-wrapper d-flex flex-column justify-content-center mt-5">
        <div className="row">

          <div className="col-12 align-items-center text-center mt-5 h-100">

            <div className="success-icon mb-4">
              <FaCheck />
            </div>

            <h1 className="success-title">
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
      </div>
    </>
  )
}

export default PaymentSuccess