import { createContext, useState, useEffect } from "react"
import Cookies from "js-cookie"

export const OrdersContext = createContext()

const getInitialOrders = () => {
  const storedOrders = localStorage.getItem("tasty_kitchens_orders")
  if (storedOrders) {
    try {
      return JSON.parse(storedOrders)
    } catch (e) {
      return []
    }
  }
  return []
}

const getInitialAddresses = () => {
  const storedAddresses = localStorage.getItem("tasty_kitchens_addresses")
  if (storedAddresses) {
    try {
      return JSON.parse(storedAddresses)
    } catch (e) {
      return [{ id: 1, address: "Chennai, Tamil Nadu", phone: "9876543210" }]
    }
  }
  return [{ id: 1, address: "Chennai, Tamil Nadu", phone: "9876543210" }]
}

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(getInitialOrders)
  const [addresses, setAddresses] = useState(getInitialAddresses)

  useEffect(() => {
    localStorage.setItem("tasty_kitchens_orders", JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    localStorage.setItem("tasty_kitchens_addresses", JSON.stringify(addresses))
  }, [addresses])

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev])
  }

  const addAddress = (address, phone) => {
    const newAddr = {
      id: Date.now(),
      address,
      phone
    }
    setAddresses((prev) => [...prev, newAddr])
  }

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  const updateAddress = (id, address) => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, address } : a))
    )
  }

  const userRole = Cookies.get('user_role') || 'USER'
  const userEmail = Cookies.get('user_email') || ''
  
  // Mock administrative mapping for demo
  const adminRestaurantId = '1' // admin@restaurant.com -> McDonald's

  const filteredOrders = orders.filter(order => {
    if (userRole === 'SUPER_ADMIN') {
        return true // Sees all orders
    }
    if (userRole === 'ADMIN') {
        return order.restaurantId === adminRestaurantId
    }
    // Regular User: Sees their own orders
    // For legacy orders without userEmail, we show them to the user if they were the one who placed them (on this browser)
    return order.userEmail === userEmail || !order.userEmail
  })

  return (
    <OrdersContext.Provider
      value={{
        orders: filteredOrders,
        allOrders: orders,
        userRole,
        userEmail,
        addOrder,
        addresses,
        addAddress,
        deleteAddress,
        updateAddress
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
