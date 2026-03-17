import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import {BrowserRouter} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import { Toaster } from "react-hot-toast"

import "./index.css"
import App from "./App.jsx"

import { CartProvider } from "./context/CartContext.jsx"
import { FavoritesProvider } from "./context/FavoritesContext.jsx"
import { OrdersProvider } from "./context/OrdersContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          <OrdersProvider>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#1e293b",
                  color: "#fff",
                  borderRadius: "10px"
                }
              }}
            />
          </OrdersProvider>
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
)