import './index.css'

const HeroBanner = () => {
  return (
    <div className="hero-banner-container container mt-4">
      <div className="hero-image-wrapper position-relative">
        <img
          src="https://res.cloudinary.com/dmmfmktet/image/upload/v1773057862/Frame_7_lsu9rh.png"
          alt="South Indian Food Banner"
          className="hero-image w-100 rounded-4"
        />
        <div className="carousel-indicators-custom d-flex justify-content-center mt-3">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner