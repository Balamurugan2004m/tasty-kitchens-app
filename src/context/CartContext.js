import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([])

  // ADD ITEM
  const addToCart = food => {
    setCartItems(prev => {

      const existingItem = prev.find(item => item.id === food.id)

      if (existingItem) {
        return prev.map(item =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...food, quantity: 1 }]
    })
  }

  // INCREASE QUANTITY
  const increaseQuantity = id => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  // DECREASE QUANTITY
  const decreaseQuantity = id => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  // REMOVE ITEM
  const removeItem = id => {
    setCartItems(prev =>
      prev.filter(item => item.id !== id)
    )
  }

  // CLEAR CART
  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}