import { useNavigate } from "react-router-dom"
import "./index.css"

const NotFound = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate("/")
  }

  return (
    <div className="container">
    <div className="notfound-container">
      <img
        src="https://res.cloudinary.com/dmmfmktet/image/upload/v1773142456/Group_mh4pzr.png"
        alt="not found"
        className="notfound-image"
      />

      <h1 className="notfound-title">Page Not Found</h1>

      <p className="notfound-description">
        We are sorry, the page you requested could not be found.
        Please go back to the homepage
      </p>

      <button className="home-button" onClick={goHome}>
        Home Page
      </button>
    </div>
    </div>
  )
}

export default NotFound