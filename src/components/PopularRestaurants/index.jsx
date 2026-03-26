import { useState } from "react"
import { BsFilterLeft, BsSearch } from "react-icons/bs"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { FaCheck } from "react-icons/fa"
import RestaurantCard from "../RestaurantCard"
import "./index.css"

const PopularRestaurants = ({ page, itemsPerPage, setPage, restaurants = [], foodItems = [] }) => {

  const [sortType, setSortType] = useState("Highest")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setPage(1) // reset pagination when searching
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSortChange = (type) => {
    setSortType(type)
    setPage(1) // reset pagination when sorting changes
    setIsDropdownOpen(false)
  }

  // sorting restaurants

  const filteredRestaurants = restaurants.filter(restaurant => {
    const searchLower = searchQuery.toLowerCase()
    
    // Check restaurant name
    const matchesName = restaurant.name?.toLowerCase().includes(searchLower)
    
    // Check cuisine
    const matchesCuisine = restaurant.cuisine?.toLowerCase().includes(searchLower)
    
    // Check location (hotel name)
    const matchesLocation = restaurant.location?.toLowerCase().includes(searchLower)
    
    // Check dishes
    const restaurantDishes = foodItems.filter(dish => dish.restaurantId === restaurant.id)
    const matchesDish = restaurantDishes.some(dish => 
      dish.name?.toLowerCase().includes(searchLower)
    )
    
    return matchesName || matchesCuisine || matchesLocation || matchesDish
  })

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    const ratingA = (a.userRating?.rating || a.rating) || 0;
    const ratingB = (b.userRating?.rating || b.rating) || 0;

    if (sortType === "Lowest") {
      return ratingA - ratingB
    } else {
      return ratingB - ratingA
    }
  })

  // pagination logic
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedRestaurants = sortedRestaurants.slice(startIndex, endIndex)

  return (
    <div className="popular-restaurants-section mt-5 pb-5">
      <div className="container">

        <div className="section-header-container mb-4">
          <h1 className="section-title">Popular Restaurants</h1>

          <div className="section-subtitle-container d-flex flex-wrap justify-content-between align-items-center gap-3">
            <p className="section-subtitle text-muted mb-0">
              Select Your favourite restaurant special dish and make your day happy...
            </p>

            <div className="d-flex align-items-center gap-3 w-100 flex-md-nowrap search-sort-wrapper">
              
              <div className="search-bar-container flex-grow-1 position-relative">
                <BsSearch className="search-icon position-absolute" />
                <input 
                  type="search" 
                  className="form-control rounded search-input" 
                  placeholder="Search for restaurants..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="sort-container position-relative">
                <div
                  className="sort-button d-flex align-items-center"
                  onClick={toggleDropdown}
                >
                <BsFilterLeft className="filter-icon me-2" />
                <span className="sort-label me-1">Sort by</span>
                <span className="selected-sort me-1">{sortType}</span>
                <MdOutlineKeyboardArrowDown className={`arrow-icon ${isDropdownOpen ? "open" : ""}`} />
              </div>

              {isDropdownOpen && (
                <ul className="sort-dropdown-menu list-unstyled position-absolute end-0 mt-2 bg-white shadow-sm border">

                  <li
                    className={`dropdown-item d-flex align-items-center justify-content-between p-2 px-3 ${sortType === "Lowest" ? "active" : ""}`}
                    onClick={() => handleSortChange("Lowest")}
                  >
                    <span>Lowest</span>
                    {sortType === "Lowest" && <FaCheck className="check-icon" />}
                  </li>

                  <li
                    className={`dropdown-item d-flex align-items-center justify-content-between p-2 px-3 ${sortType === "Highest" ? "active" : ""}`}
                    onClick={() => handleSortChange("Highest")}
                  >
                    <span>Highest</span>
                    {sortType === "Highest" && <FaCheck className="check-icon" />}
                  </li>

                </ul>
              )}
            </div>

          </div>
        </div>
      </div>

      <hr className="header-divider" />

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

          {paginatedRestaurants.map(each => (
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