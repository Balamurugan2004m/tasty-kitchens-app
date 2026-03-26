import { useContext } from 'react'
import { FaStar, FaRegStar } from "react-icons/fa"
import { FavoritesContext } from '../../context/FavoritesContext.jsx'
import "./index.css"

const RestaurantBanner = ({ restaurantData }) => {
  const {
  id = "",
  name = "",
  cuisine = "",
  location = "",
  costForTwo = 0,
  imageUrl = "",
  rating = 0,
  totalReviews = 0
} = restaurantData || {}

const { isFavorite, toggleFavorite } = useContext(FavoritesContext)
const isCurrentlyFavorite = isFavorite(id)

const onToggleFavorite = () => {
  toggleFavorite(restaurantData)
}

  return (
    <div
      className="restaurant-banner-container"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="banner-overlay">

        <div className="container banner-content">

          <div className="row align-items-center">

            {/* Restaurant Image */}
            <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
              <img
                src={imageUrl}
                alt={name}
                className="banner-main-image rounded-3"
              />
            </div>

            {/* Restaurant Info */}
            <div className="col-12 col-md-8 text-white text-center text-md-start banner-text-info">

              <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2 position-relative">
                <h1 className="restaurant-name mb-0">{name}</h1>
              </div>

              <button 
                className="favorite-button-banner border-0 bg-transparent shadow-none p-0" 
                onClick={onToggleFavorite}
                aria-label={isCurrentlyFavorite ? "Unfavorite" : "Favorite"}
              >
                {isCurrentlyFavorite ? (
                  <FaStar className="favorite-star-icon-banner filled" />
                ) : (
                  <FaRegStar className="favorite-star-icon-banner outline" />
                )}
              </button>

              <p className="cuisine-text mb-1">{cuisine}</p>

              <p className="location-text mb-3">{location}</p>

              <div className="d-flex justify-content-center justify-content-md-start align-items-center stats-row">

                {/* Rating */}
                <div className="stat-item pe-4 border-end border-white border-opacity-25">
                  <div className="d-flex align-items-center rating-wrapper mb-1">
                    <FaStar className="star-icon me-1" />
                    <span className="rating-value">{rating}</span>
                  </div>
                  <p className="stat-label mb-0">200+ Ratings</p>
                </div>

                {/* Cost */}
                <div className="stat-item ps-4">
                  <p className="stat-value mb-1">₹ {costForTwo}</p>
                  <p className="stat-label mb-0">Cost for two</p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default RestaurantBanner