import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import PaymentSuccess from "./pages/PaymentSuccess"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import EmptyCart from "./pages/EmptyCart"
import RestaurantDetails from "./pages/RestaurantDetails"
import CartPage from "./pages/CartPage"
import CartConflictModal from './components/CartConflictModal'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CartConflictModal />
    </>
  )
}

export default App