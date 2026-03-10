import { useState } from 'react'
import './index.css'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitForm = (e) => {
        e.preventDefault()
        // Login logic would go here
    }

    return (
        <div className="login-page-container container-fluid p-0">
            <div className="row g-0 vh-100">
                {/* Form Section */}
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center bg-white login-form-col order-2 order-md-1">
                    <div className="login-card w-100 px-4 px-lg-5">
                        <div className="logo-container d-flex flex-column align-items-center mb-5 d-none d-md-flex">
                            <img
                                src="https://res.cloudinary.com/dmmfmktet/image/upload/v1773055421/3d30e43f-d664-464d-ac18-f113dfd80da5_zaqrzs.png"
                                alt="website logo"
                                className="login-website-logo"
                                width="56"
                            />
                            <h1 className="login-website-name fw-bold fst-italic h4 mt-2 mb-0">Tasty Kitchens</h1>
                        </div>

                        <h1 className="login-heading display-6 fw-normal mb-4 text-start">Login</h1>

                        <form className="login-form" onSubmit={onSubmitForm}>
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-secondary mb-2" htmlFor="username">
                                    USERNAME
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control border-0 bg-light py-2 px-3 username-input"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label small fw-bold text-secondary mb-2" htmlFor="password">
                                    PASSWORD
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control border-0 bg-light py-2 px-3 password-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-warning w-100 py-2 fw-bold text-white login-button mt-2">
                                Login
                            </button>
                        </form>
                    </div>
                </div>

                {/* Image Section */}
                <div className="col-12 col-md-6 login-image-col order-1 order-md-2">
                    <div className="login-image-wrapper">
                        <img
                            src="https://res.cloudinary.com/dmmfmktet/image/upload/v1773139144/ceff20e8367d1981f2a409a617ac848670d29c7e_awmcqd.jpg"
                            alt="website login"
                            className="login-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
