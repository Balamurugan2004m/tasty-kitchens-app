import { AiFillStar } from 'react-icons/ai'
import './index.css'

const RestaurantCard = (props) => {
  const { restaurantData } = props
  const { imageUrl, name, cuisine, userRating } = restaurantData
  const { rating, totalReviews } = userRating

  return (
    <div className="restaurant-card p-3">
      <img
        src={imageUrl}
        alt={name}
        className="restaurant-image"
      />

      <div className="restaurant-details">
        <h1 className="restaurant-name">{name}</h1>

        <p className="restaurant-cuisine text-muted">
          {cuisine}
        </p>

        <div className="rating-container">
          <AiFillStar className="star-icon" />
          <span className="rating">{rating}</span>
          <span className="reviews text-muted">
            ({totalReviews} ratings)
          </span>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard