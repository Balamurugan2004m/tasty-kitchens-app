import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import PaymentSuccess from "./pages/PaymentSuccess"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import EmptyCart from "./pages/EmptyCart"
import RestaurantDetails from "./pages/RestaurantDetails"
import CartPage from "./pages/CartPage"
import Profile from "./pages/Profile"
import PlaceOrder from "./pages/PlaceOrder"
import CartConflictModal from './components/CartConflictModal'
import AdminDashboard from './pages/AdminDashboard'


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/restaurant/:id" element={<ProtectedRoute><RestaurantDetails /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/empty-cart" element={<ProtectedRoute><EmptyCart /></ProtectedRoute>} />
        <Route path="/place-order" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CartConflictModal />
    </>
  )
}

export default App