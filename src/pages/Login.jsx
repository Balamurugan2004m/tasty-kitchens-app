import LoginForm from "../components/LoginForm"
import foodImage from "../assets/food_img_signup.jpg"
import logo from "../assets/Tasty_Kitchen_Logo.png"
import "../styles/Login.css"

function Login() {

  return (

    <div className="vh-100 vw-100 overflow-hidden bg-light">

      {/* MOBILE VIEW */}
      <div className="d-md-none vh-100 d-flex justify-content-center align-items-center">

        <div className="card shadow border-0" style={{width:"90%",maxWidth:"330px",borderRadius:"16px"}}>

          {/* IMAGE INSIDE CARD */}
          <img
            src={foodImage}
            className="card-img-top"
            style={{height:"180px",objectFit:"cover"}}
          />

          {/* CARD BODY */}
          <div className="card-body text-center">

            <img
              src={logo}
              alt="logo"
              style={{width:"45px"}}
              className="mb-2"
            />

            <LoginForm />

          </div>

        </div>

      </div>

      {/* DESKTOP VIEW */}
      <div className="d-none d-md-flex h-100">

        {/* LEFT FORM */}
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            width: "50%",
            background: "#f5f5f5"
          }}
        >

          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "16px",
              width: "360px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
              textAlign: "center"
            }}
          >

            <img
              src={logo}
              alt="logo"
              style={{
                width: "60px",
                marginBottom: "10px"
              }}
            />

            <LoginForm />

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div
          style={{
            width: "50%",
            backgroundImage: `url(${foodImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

      </div>

    </div>

  )
}

export default Login