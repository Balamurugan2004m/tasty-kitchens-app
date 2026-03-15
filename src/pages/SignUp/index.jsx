import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
 
const Signup = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        setShowError(false)
        setIsLoading(true)

        if (!validateEmail(email)) {
            setErrorMsg('Please enter a valid email')
            setShowError(true)
            setIsLoading(false)
            return
        }

        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match')
            setShowError(true)
            setIsLoading(false)
            return
        }

        setTimeout(() => {
            setIsLoading(false)
            navigate('/login', { replace: true })
        }, 1000)
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

                        <h1 className="login-heading">Sign Up</h1>

                        <form className="login-form" onSubmit={onSubmitForm}>

                            {/* FULL NAME */}
                            <div className="input-container">
                                <label className="input-label">
                                    FULL NAME
                                </label>
                                <input
                                    type="text"
                                    className="login-input"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter Full Name"
                                    required
                                />
                            </div>

                            {/* EMAIL */}
                            <div className="input-container">
                                <label className="input-label">
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    className="login-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Email"
                                    required
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className="input-container">
                                <label className="input-label">
                                    PASSWORD
                                </label>
                                <input
                                    type="password"
                                    className="login-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    required
                                />
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div className="input-container">
                                <label className="input-label">
                                    CONFIRM PASSWORD
                                </label>
                                <input
                                    type="password"
                                    className="login-input"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>

                            {showError && (
                                <p className="error-message">{errorMsg}</p>
                            )}

                            <button
                                type="submit"
                                className="login-button"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </form>

                        <p className="signup-text">
                            Already have an account?{' '}
                            <a href="/login" className="signup-link">
                                Login
                            </a>
                        </p>

                    </div>
                </div>

                {/* Image Section */}
                <div className="login-image-container">
                    <div className="image-wrapper">
                        <img
                            src="https://res.cloudinary.com/dy7ogboi4/image/upload/v1773402580/toba_nlnk3r.jpg"
                            alt="website signup"
                            className="login-image"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signup