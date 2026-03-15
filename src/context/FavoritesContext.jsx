import { createContext, useState, useEffect } from 'react'

export const FavoritesContext = createContext()

const getInitialFavorites = () => {
  const storedFavorites = localStorage.getItem('tasty_kitchens_favorites')
  try {
    return storedFavorites ? JSON.parse(storedFavorites) : []
  } catch (error) {
    console.error('Error parsing favorites from localStorage:', error)
    return []
  }
}

export const FavoritesProvider = ({ children }) => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState(getInitialFavorites)

  useEffect(() => {
    localStorage.setItem('tasty_kitchens_favorites', JSON.stringify(favoriteRestaurants))
  }, [favoriteRestaurants])

  const addFavorite = (restaurant) => {
    setFavoriteRestaurants((prev) => [...prev, restaurant])
  }

  const removeFavorite = (id) => {
    setFavoriteRestaurants((prev) => prev.filter((item) => item.id !== id))
  }

  const isFavorite = (id) => {
    return favoriteRestaurants.some((item) => item.id === id)
  }

  const toggleFavorite = (restaurant) => {
    if (isFavorite(restaurant.id)) {
      removeFavorite(restaurant.id)
    } else {
      addFavorite(restaurant)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoriteRestaurants,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
