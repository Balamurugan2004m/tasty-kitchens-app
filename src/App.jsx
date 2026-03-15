import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import PaymentSuccess from "./pages/PaymentSuccess"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import EmptyCart from "./pages/EmptyCart"
import RestaurantDetails from "./pages/RestaurantDetails"
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/cart" element={<EmptyCart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App