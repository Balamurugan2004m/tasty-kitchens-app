import {NavLink, Link} from "react-router-dom"
import "./index.css"
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light pt-3 pb-3">
      <div className="container">

        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img
            src="https://res.cloudinary.com/dmmfmktet/image/upload/v1773055421/3d30e43f-d664-464d-ac18-f113dfd80da5_zaqrzs.png"
            alt="logo"
            width="35"
            className="me-2"
          />
          <h1 className="logo-text">Tasty Kitchens</h1>
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <NavLink
                to="/"
                className={({isActive}) =>
                  isActive ? "nav-link text-warning fw-bold" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                Cart
              </NavLink>
            </li>

            <li className="nav-item ms-3">
              <button className="btn btn-warning text-white">
                Logout
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar