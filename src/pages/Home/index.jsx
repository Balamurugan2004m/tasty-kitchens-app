import Navbar from "../../components/Navbar"
import HeroBanner from "../../components/HeroBanner"
import PopularRestaurants from "../../components/PopularRestaurants"
import Pagination from "../../components/Pagination"
import Footer from "../../components/Footer"

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <PopularRestaurants />
      <Pagination />
      <Footer />
    </>
  )
}

export default Home