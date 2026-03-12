import {useState} from "react"
import Navbar from "../../components/Navbar"
import HeroBanner from "../../components/HeroBanner"
import PopularRestaurants from "../../components/PopularRestaurants"
import Pagination from "../../components/Pagination"
import Footer from "../../components/Footer"
import {restaurantsData} from "../../constants"

const Home = () => {

  const [page, setPage] = useState(1)

  const itemsPerPage = 9

  // calculate total pages from data
  const calculatedPages = Math.ceil(restaurantsData.length / itemsPerPage)

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

      <PopularRestaurants
        page={page}
        itemsPerPage={itemsPerPage}
        setPage={setPage}
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