import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import RestaurantBanner from '../../components/RestaurantBanner'
import FoodItem from '../../components/FoodItem'
import Footer from '../../components/Footer'
import CartPopupBanner from '../../components/CartPopupBanner'
import { TailSpin } from 'react-loader-spinner'
import { getRestaurantByIdAPI, getFoodItemsByRestaurantIdAPI } from '../../services/api'

const RestaurantDetails = () => {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [restaurantFood, setRestaurantFood] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [resParams, foodParams] = await Promise.all([
          getRestaurantByIdAPI(id),
          getFoodItemsByRestaurantIdAPI(id)
        ]);
        setRestaurant(resParams || null);
        setRestaurantFood(foodParams || []);
      } catch (error) {
        console.error("Failed to fetch restaurant details", error);
        // Fallback or error handling can be done here.
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id])

  if (isLoading) {
    return (
      <div className="restaurant-details-page min-vh-100 d-flex flex-column">
        <Navbar />
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
            <TailSpin color="#f7931e" height="50" width="50" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="restaurant-details-page min-vh-100 d-flex flex-column">
        <Navbar />
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
            <h2>Restaurant not found.</h2>
        </main>
        <Footer />
      </div>
    );
  }

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
