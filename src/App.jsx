import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import PaymentSuccess from "./pages/PaymentSuccess"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App