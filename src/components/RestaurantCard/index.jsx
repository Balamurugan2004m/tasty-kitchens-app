import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import './index.css'

const RestaurantCard = (props) => {
  const { restaurantData } = props
  const { id, imageUrl, name, cuisine, userRating } = restaurantData
  const { rating, totalReviews } = userRating

  return (
    <Link to={`/restaurant/${id}`} className="text-decoration-none">
      <div className="restaurant-card">
        <img
          src={imageUrl}
          alt={name}
          className="restaurant-image"
        />

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
        </div>
      </div>
    </Link>
  )
}

export default RestaurantCard