import { AiFillStar } from 'react-icons/ai'
import './index.css'

const RestaurantCard = (props) => {
    const { restaurantData } = props
    const { imageUrl, name, cuisine, userRating } = restaurantData
    const { rating, totalReviews } = userRating

    return (
        <div className="restaurant-card p-3 mb-4">
            <div className="row g-0 align-items-center">
                <div className="col-4">
                    <img src={imageUrl} alt="restaurant" className="restaurant-image img-fluid rounded" />
                </div>
                <div className="col-8 ps-3">
                    <h1 className="restaurant-name mb-1">{name}</h1>
                    <p className="restaurant-cuisine text-muted mb-2">{cuisine}</p>
                    <div className="rating-container d-flex align-items-center">
                        <AiFillStar className="star-icon me-1" />
                        <span className="rating fw-bold me-1">{rating}</span>
                        <span className="reviews text-muted">({totalReviews} ratings)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard
