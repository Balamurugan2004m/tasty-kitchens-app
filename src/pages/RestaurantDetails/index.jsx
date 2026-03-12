import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import RestaurantBanner from '../../components/RestaurantBanner'
import FoodItem from '../../components/FoodItem'
import Footer from '../../components/Footer'
import { restaurantsData } from '../../constants'

const mockFoodItems = [
  {
    id: 'f1',
    name: 'Chicken Roast',
    cost: 350,
    rating: 4.8,
    imageUrl: 'https://res.cloudinary.com/dmmfmktet/image/upload/v1773139143/f2d22fb6518b10a40b5b6ea50df1a4eefa9b50a5_wrou7w.jpg'
  },
  {
    id: 'f2',
    name: 'Full Meals',
    cost: 250,
    rating: 4.4,
    imageUrl: 'https://res.cloudinary.com/dmmfmktet/image/upload/v1773139143/5d73ac7b641c2d7c65afd6d3f795d2b168831b19_zwiwhs.jpg'
  },
  {
    id: 'f3',
    name: 'Subbaya Full Meals',
    cost: 400,
    rating: 4.4,
    imageUrl: 'https://res.cloudinary.com/dmmfmktet/image/upload/v1773139142/0c2c642964d6e9c84222ee450db37f5c98f12f40_fghfnw.jpg'
  },
  {
    id: 'f4',
    name: 'Samosa (2)',
    cost: 350,
    rating: 4.8,
    imageUrl: 'https://res.cloudinary.com/dmmfmktet/image/upload/v1773139142/80b189bcfe64a45bdac51b126b5b24bed7e96a9a_tawstm.jpg'
  },
  {
    id: 'f5',
    name: 'Udipi Chapati (6)',
    cost: 250,
    rating: 4.4,
    imageUrl: 'https://res.cloudinary.com/dmmfmktet/image/upload/v1773139142/26bcc239a2b91893cf2181c90e2a77117b91ff4e_axp5cc.jpg'
  },
  {
    id: 'f6',
    name: 'Egg Toast',
    cost: 400,
    rating: 4.4,
    imageUrl: 'https://res.cloudinary.com/dmmfmktet/image/upload/v1773139142/3675f934af31e5e63d3f81286ef1d128f2cd49fb_it2ne2.jpg'
  }
]

const RestaurantDetails = () => {
  const { id } = useParams()
  
  // Find restaurant or use default for demo
  const restaurant = restaurantsData.find(each => each.id === id) || {
    ...restaurantsData[0],
    location: 'TGF Variety Mall, Kurnool',
    costForTwo: 350
  }

  return (
    <div className="restaurant-details-page min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1">
        <RestaurantBanner restaurantData={restaurant} />
        <div className="container mt-5 mb-5 ps-3 pe-3">
          <ul className="food-items-list p-0 m-0 row">
            {mockFoodItems.map(eachFood => (
              <div className="col-12 col-lg-6 mb-2" key={eachFood.id}>
                <FoodItem foodData={eachFood} />
              </div>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default RestaurantDetails
