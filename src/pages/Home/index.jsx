import {useState} from "react"
import Navbar from "../../components/Navbar"
import HeroBanner from "../../components/HeroBanner"
import PopularRestaurants from "../../components/PopularRestaurants"
import Pagination from "../../components/Pagination"
import Footer from "../../components/Footer"

const Home = () => {

  const [page, setPage] = useState(1)

  const itemsPerPage = 9
  const totalPages = 5

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

      <PopularRestaurants
        page={page}
        itemsPerPage={itemsPerPage}
      />

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