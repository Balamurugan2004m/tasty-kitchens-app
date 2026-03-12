import {useState, useEffect} from "react"
import "./index.css"

const bannerImages = [
  "https://res.cloudinary.com/dmmfmktet/image/upload/v1773057862/Frame_7_lsu9rh.png",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  "https://images.unsplash.com/photo-1563379091339-03246963d7d3"
]

const HeroBanner = () => {

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000) // change every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hero-banner-container container mt-4">
      <div className="hero-image-wrapper position-relative">

        <img
          src={bannerImages[currentIndex]}
          alt="Food Banner"
          className="hero-image w-100 rounded-4"
        />

        <div className="carousel-indicators-custom d-flex justify-content-center mt-3">

          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
            ></span>
          ))}

        </div>

      </div>
    </div>
  )
}

export default HeroBanner