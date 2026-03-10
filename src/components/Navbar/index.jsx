import { NavLink, Link } from "react-router-dom"
import { IoMdCloseCircle } from 'react-icons/io'
import "./index.css"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light pt-3 pb-3 sticky-top">
      <div className="container position-relative">

        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img
            src="https://res.cloudinary.com/dmmfmktet/image/upload/v1773055421/3d30e43f-d664-464d-ac18-f113dfd80da5_zaqrzs.png"
            alt="logo"
            width="35"
            className="me-2"
          />
          <h1 className="logo-text">Tasty Kitchens</h1>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none p-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="mobile-nav-wrapper d-lg-flex w-100 justify-content-between align-items-center">
            <ul className="navbar-nav ms-auto align-items-center flex-row justify-content-center">
              <li className="nav-item mx-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink to="/cart" className="nav-link cart-link">
                  Cart
                </NavLink>
              </li>
              <li className="nav-item mx-lg-3 mt-lg-0">
                <button className="btn btn-warning text-white logout-button">
                  Logout
                </button>
              </li>
            </ul>
            <button
              className="btn close-icon-btn d-lg-none p-0 border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
            >
              <IoMdCloseCircle className="close-icon" />
            </button>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar