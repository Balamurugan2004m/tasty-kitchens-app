import "./index.css"

const bannerImages = [
  "https://res.cloudinary.com/dmmfmktet/image/upload/v1773057862/Frame_7_lsu9rh.png",
  "https://res.cloudinary.com/dmmfmktet/image/upload/v1773335231/Screenshot_2026-03-12_223643_nmr5ns.png",
  "https://res.cloudinary.com/dmmfmktet/image/upload/v1773334668/Screenshot_2026-03-12_222701_cwvqy3.png",
  "https://res.cloudinary.com/dmmfmktet/image/upload/v1773334968/Screenshot_2026-03-12_223202_izfmjd.png"
]

const HeroBanner = () => {
  return (
    <div className="hero-banner-container container mt-4">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide hero-carousel"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner rounded-4 shadow-sm">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              data-bs-interval="3000"
            >
              <img
                src={image}
                className="d-block w-100 hero-image"
                alt={`Food Banner ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default HeroBanner