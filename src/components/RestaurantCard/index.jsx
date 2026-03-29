import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { FavoritesContext } from '../../context/FavoritesContext.jsx'
import './index.css'

const RestaurantCard = (props) => {
  const { restaurantData } = props
  const { id, imageUrl, name, cuisine, rating, totalReviews, costForTwo } = restaurantData

  const { isFavorite, toggleFavorite } = useContext(FavoritesContext)
  const isCurrentlyFavorite = isFavorite(id)

  const onToggleFavorite = (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggleFavorite(restaurantData)
  }

  return (
    <Link to={`/restaurant/${id}`} className="text-decoration-none">
      <div className="restaurant-card">
        <div className="image-container position-relative">
          <img
            src={imageUrl}
            alt={name}
            className="restaurant-image"
          />
          
          <button 
            className="favorite-button-home position-absolute border-0 bg-transparent shadow-none" 
            onClick={onToggleFavorite}
            aria-label={isCurrentlyFavorite ? "Unfavorite" : "Favorite"}
          >
            {isCurrentlyFavorite ? (
              <FaStar className="favorite-star-icon filled" />
            ) : (
              <FaRegStar className="favorite-star-icon outline" />
            )}
          </button>
        </div>

        <div className="restaurant-details">
          <h2 className="restaurant-name">{name}</h2>

          <p className="restaurant-cuisine">
            {cuisine}
          </p>

          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <span className="rating">{rating}</span>
            <span className="reviews">
              ({totalReviews} ratings)
            </span>
          </div>

          <p className="restaurant-cost">
            Cost for two: <span className="cost-value">₹{costForTwo}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantCard