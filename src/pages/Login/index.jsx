import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const onSubmitSuccess = (jwtToken) => {
        Cookies.set('jwt_token', jwtToken, { expires: 30 })
        navigate('/', { replace: true })
    }

    const onSubmitFailure = (errorMsg) => {
        setShowError(true)
        setErrorMsg(errorMsg)
        setIsLoading(false)
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setShowError(false)

        const userDetails = { username, password }
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        }

        try {
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok === true) {
                onSubmitSuccess(data.jwt_token)
            } else {
                onSubmitFailure(data.error_msg)
            }
        } catch (error) {
            onSubmitFailure('Something went wrong. Please try again later.')
        }
    }

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <div className="login-page-container">
            <div className="login-content-wrapper">
                {/* Form Section */}
                <div className="login-form-container">
                    <div className="login-card">
                        <div className="logo-container">
                            <img
                                src="https://res.cloudinary.com/dmmfmktet/image/upload/v1773055421/3d30e43f-d664-464d-ac18-f113dfd80da5_zaqrzs.png"
                                alt="website logo"
                                className="login-website-logo"
                            />
                            <h1 className="login-website-name">Tasty Kitchens</h1>
                        </div>

                        <h1 className="login-heading">Login</h1>

                        <form className="login-form" onSubmit={onSubmitForm}>
                            <div className="input-container">
                                <label className="input-label" htmlFor="username">
                                    USERNAME
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="login-input"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter Username"
                                    required
                                />
                            </div>

                            <div className="input-container">
                                <label className="input-label" htmlFor="password">
                                    PASSWORD
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="login-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    required
                                />
                            </div>

                            {showError && <p className="error-message">{errorMsg}</p>}

                            <button type="submit" className="login-button" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <p className="signup-text">
                            Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
                        </p>
                    </div>
                </div>

                {/* Image Section */}
                <div className="login-image-container">
                    <div className="image-wrapper">
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
