import { FaStar, FaRegStar } from 'react-icons/fa'
import './index.css'

const RestaurantBanner = (props) => {
  const { restaurantData } = props
  const { name, cuisine, location, rating, costForTwo, imageUrl } = restaurantData

  return (
    <div className="restaurant-banner-container" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="banner-overlay">
        <div className="container banner-content">
          <div className="row align-items-center">
            <div className="col-12 col-md-4 mb-3 mb-md-0 d-flex justify-content-center justify-content-md-start">
              <img src={imageUrl} alt={name} className="banner-main-image rounded-3" />
            </div>
            <div className="col-12 col-md-8 text-white text-center text-md-start banner-text-info">
              <h1 className="restaurant-name mb-2">{name}</h1>
              <p className="cuisine-text mb-2">{cuisine}</p>
              <p className="location-text mb-3">{location}</p>
              <div className="d-flex justify-content-center justify-content-md-start align-items-center stats-row">
                <div className="stat-item pe-4 border-end border-white border-opacity-25 h-100">
                  <div className="d-flex align-items-center mb-1 rating-wrapper">
                    <FaStar className="star-icon me-1" />
                    <span>{rating}</span>
                  </div>
                  <p className="stat-label mb-0">200+ Ratings</p>
                </div>
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
