import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import './index.css'

const RestaurantCard = (props) => {
  const { restaurantData } = props
  const { id, imageUrl, name, cuisine, userRating } = restaurantData
  const { rating, totalReviews } = userRating

  return (
    <Link to={`/restaurant/${id}`} className="text-decoration-none text-dark">
      <div className="restaurant-card p-3">
        <img
          src={imageUrl}
          alt={name}
          className="restaurant-image"
        />

        <div className="restaurant-details">
          <h2 className="restaurant-name">{name}</h2>

          <p className="restaurant-cuisine text-muted">
            {cuisine}
          </p>

          <div className="rating-container d-flex align-items-center">
            <AiFillStar className="star-icon me-1" />
            <span className="rating fw-bold me-1">{rating}</span>
            <span className="reviews text-muted">
              ({totalReviews} ratings)
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantCard