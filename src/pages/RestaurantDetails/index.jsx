import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import RestaurantBanner from '../../components/RestaurantBanner'
import FoodItem from '../../components/FoodItem'
import Footer from '../../components/Footer'
import CartPopupBanner from '../../components/CartPopupBanner'
import { restaurantsData } from '../../constants'
import { mockFoodItems } from '../../FoodItems'

const RestaurantDetails = () => {
  const { id } = useParams()
  
  // Find restaurant or use default for demo
  const restaurant = restaurantsData.find(each => each.id === id) || {
    ...restaurantsData[0],
    location: 'TGF Variety Mall, Kurnool',
    costForTwo: 350
  }

  const restaurantFood = mockFoodItems.filter(
    eachFood => eachFood.restaurantId === id
  )

  return (
    <div className="restaurant-details-page min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1">
        <RestaurantBanner restaurantData={restaurant} />
        <div className="container mt-5 mb-5 ps-3 pe-3">
          <ul className="food-items-list p-0 m-0 row">
            {restaurantFood.map(eachFood => (
              <div className="col-12 col-lg-6 mb-2" key={eachFood.id}>
                <FoodItem foodData={eachFood} restaurantName={restaurant.name} restaurantId={restaurant.id || id} />
              </div>
            ))}
          </ul>
        </div>
      </main>
      <CartPopupBanner currentRestaurantId={restaurant.id || id} />
      <Footer />
    </div>
  )
}

export default RestaurantDetails
