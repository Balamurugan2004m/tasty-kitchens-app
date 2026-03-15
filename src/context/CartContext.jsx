import { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

const getInitialCart = () => {
  const storedCart = localStorage.getItem("tasty_kitchens_cart")
  if (storedCart) {
    try {
      return JSON.parse(storedCart)
    } catch (e) {
      return []
    }
  }
  return []
}

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(getInitialCart)
  const [conflictDetails, setConflictDetails] = useState(null)

  // Sync to local storage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("tasty_kitchens_cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Get active restaurant ID from cart
  const cartRestaurantId = cartItems.length > 0 ? String(cartItems[0].restaurantId) : null

  // REQUEST ADD ITEM (Checks for Conflicts)
  const requestAddToCart = (food, restaurantName) => {
    const newRestaurantId = String(food.restaurantId)
    
    if (cartRestaurantId && cartRestaurantId !== newRestaurantId) {
      // Conflict detected!
      // Find the name of the restaurant currently in the cart
      const existingItem = cartItems[0]
      const existingRestaurantName = existingItem.restaurantName || "another restaurant"
      
      setConflictDetails({
        existingRestaurantName,
        newRestaurantName: restaurantName,
        pendingFood: food,
      })
      return
    }

    // No conflict, proceed normally
    addToCart(food)
  }

  // RESOLVE CONFLICT
  const resolveConflict = (replace) => {
    if (replace && conflictDetails) {
      // Discard old cart and add new item
      setCartItems([{ ...conflictDetails.pendingFood, quantity: 1 }])
    }
    // Close modal
    setConflictDetails(null)
  }

  // ADD ITEM (Internal)
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
        conflictDetails,
        requestAddToCart,
        resolveConflict,
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