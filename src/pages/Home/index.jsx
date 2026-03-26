import {useState, useEffect} from "react"
import Navbar from "../../components/Navbar"
import HeroBanner from "../../components/HeroBanner"
import PopularRestaurants from "../../components/PopularRestaurants"
import Pagination from "../../components/Pagination"
import Footer from "../../components/Footer"
import { TailSpin } from "react-loader-spinner"
import { getAllRestaurantsAPI, getAllFoodItemsAPI } from "../../services/api"

const Home = () => {

  const [page, setPage] = useState(1)

  const itemsPerPage = 9

  const [restaurants, setRestaurants] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resParams, foodParams] = await Promise.all([
          getAllRestaurantsAPI(),
          getAllFoodItemsAPI()
        ]);
        setRestaurants(resParams || []);
        setFoodItems(foodParams || []);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [])

  // calculate total pages from data
  const calculatedPages = Math.ceil(restaurants.length / itemsPerPage)

  // limit to maximum 5 pages
  const totalPages = Math.min(calculatedPages, 5)

  const onNext = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1)
    }
  }

  const onPrev = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  return (
    <>
      <Navbar />

      <HeroBanner />

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
            <TailSpin color="#f7931e" height="50" width="50" />
        </div>
      ) : (
        <PopularRestaurants
          page={page}
          itemsPerPage={itemsPerPage}
          setPage={setPage}
          restaurants={restaurants}
          foodItems={foodItems}
        />
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onNext={onNext}
        onPrev={onPrev}
      />

      <Footer />
    </>
  )
}

export default Home