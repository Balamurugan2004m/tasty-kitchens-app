import { useState } from "react"
import { BsFilterLeft } from "react-icons/bs"
import RestaurantCard from "../RestaurantCard"
import { restaurantsData } from "../../constants"
import "./index.css"

const PopularRestaurants = () => {

  const [sortType, setSortType] = useState("Lowest")

  const handleSortChange = (event) => {
    setSortType(event.target.value)
  }

  const sortedRestaurants = [...restaurantsData].sort((a, b) => {
    const ratingA = a.user_rating?.rating || 0
    const ratingB = b.user_rating?.rating || 0

    if (sortType === "Lowest") {
      return ratingA - ratingB
    } else {
      return ratingB - ratingA
    }
  })

  return (
    <div className="popular-restaurants-section mt-5 pb-5">
      <div className="container">

        <div className="section-header mb-4">
          <h1 className="section-title">Popular Restaurants</h1>

          <div className="section-subtitle-container d-flex flex-wrap justify-content-between align-items-center">

            <p className="section-subtitle text-muted mb-0">
              Select Your favourite restaurant special dish and make your day happy...
            </p>

            <div className="sort-container d-flex align-items-center">
              <BsFilterLeft className="filter-icon me-2" />
              <span className="sort-label me-2">Sort by</span>

              <select
                className="sort-select border-0 bg-transparent fw-bold"
                value={sortType}
                onChange={handleSortChange}
              >
                <option value="Lowest">Lowest</option>
                <option value="Highest">Highest</option>
              </select>
            </div>

          </div>

          <hr />
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {sortedRestaurants.map((each) => (
            <div key={each.id} className="col">
              <RestaurantCard restaurantData={each} />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default PopularRestaurants