import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

/* SVGs for Input Icons */
const UserIcon = () => (
    <svg className="left-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
)

const EmailIcon = () => (
    <svg className="left-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
)

const LockIcon = () => (
    <svg className="left-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
)

const EyeIcon = ({ show }) => (
    <svg className="pwd-toggle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {show ? (
            <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </>
        ) : (
            <>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            </>
        )}
    </svg>
)

const CheckIcon = () => (
    <svg className="check-icon-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
)

const Signup = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    
    // UI states
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isShake, setIsShake] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const navigate = useNavigate()

    // Real-time password validation logic
    const getPwdStrength = (pwd) => {
        if (!pwd) return { label: '', color: 'transparent', width: '0%', valid: false }
        
        const hasLength = pwd.length >= 8
        const hasNumber = /\d/.test(pwd)
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
        
        let score = 0
        if (hasLength) score++
        if (hasNumber) score++
        if (hasSpecial) score++
        
        const isValid = hasLength && hasNumber && hasSpecial

        if (score === 1) return { label: 'Weak', color: '#ef4444', width: '33%', valid: isValid }
        if (score === 2) return { label: 'Medium', color: '#f59e0b', width: '66%', valid: isValid }
        if (score === 3) return { label: 'Strong', color: '#22c55e', width: '100%', valid: isValid }
        
        return { label: 'Weak', color: '#ef4444', width: '33%', valid: isValid }
    }

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    
    const strength = getPwdStrength(password)
    const isMatched = password && confirmPassword && password === confirmPassword

    const triggerError = (msg) => {
        setErrorMsg(msg)
        setShowError(true)
        setIsShake(true)
        setIsLoading(false)
        setTimeout(() => setIsShake(false), 500)
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        setShowError(false)

        if (!validateEmail(email)) {
            return triggerError('Please enter a valid email address')
        }

        if (!strength.valid) {
            return triggerError('Password does not meet requirements')
        }

        if (!isMatched) {
            return triggerError('Passwords do not match')
        }

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setIsSuccess(true)

            if (rememberMe) {
                localStorage.setItem('tasty_kitchens_email', email)
                localStorage.setItem('tasty_kitchens_password', password)
            }
            
            // Auto redirect to login after short delay
            setTimeout(() => {
                navigate('/login', { replace: true })
            }, 2000)
        }, 1200)
    }

    return (
        <div className="login-page-container">
            <div className="login-content-wrapper">

                {/* Form Section */}
                <div className="login-form-container">
                    
                    <div className={`login-card signup-card ${isShake ? 'shake-animation' : ''}`}>
                        
                        <div className="logo-container">
                            <img
                                src="https://res.cloudinary.com/dmmfmktet/image/upload/v1773055421/3d30e43f-d664-464d-ac18-f113dfd80da5_zaqrzs.png"
                                alt="website logo"
                                className="login-website-logo"
                            />
                            <h1 className="login-website-name">Tasty Kitchens</h1>
                        </div>

                        <div className="header-text-container">
                            <h1 className="login-heading">Create Account</h1>
                            <p className="login-subtitle">Start your kitchen journey</p>
                        </div>

                        {isSuccess ? (
                            <div className="success-state-container">
                                <div className="success-icon-wrapper">
                                    <CheckIcon />
                                </div>
                                <h2 className="success-title">Account Created Successfully!</h2>
                                <p className="success-subtitle">Redirecting you to login...</p>
                            </div>
                        ) : (
                            <form className="login-form" onSubmit={onSubmitForm}>

                                {/* FULL NAME */}
                                <div className="input-container">
                                    <div className="floating-input-wrapper">
                                        <UserIcon />
                                        <input
                                            type="text"
                                            id="fullName"
                                            className="login-input"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder=" "
                                            required
                                        />
                                        <label className="floating-label" htmlFor="fullName">Full Name</label>
                                    </div>
                                </div>

                                {/* EMAIL */}
                                <div className="input-container">
                                    <div className="floating-input-wrapper">
                                        <EmailIcon />
                                        <input
                                            type="email"
                                            id="email"
                                            className="login-input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder=" "
                                            required
                                        />
                                        <label className="floating-label" htmlFor="email">Email Address</label>
                                    </div>
                                </div>

                                {/* PASSWORD */}
                                <div className="input-container signup-pwd-block">
                                    <div className="floating-input-wrapper">
                                        <LockIcon />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            className="login-input"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder=" "
                                            required
                                        />
                                        <label className="floating-label" htmlFor="password">Password</label>
                                        <button 
                                            type="button" 
                                            className="pwd-toggle-btn"
                                            onClick={() => setShowPassword(!showPassword)}
                                            tabIndex="-1"
                                        >
                                            <EyeIcon show={showPassword} />
                                        </button>
                                    </div>
                                    
                                    {/* Real-time Validation UI */}
                                    {password.length > 0 && (
                                        <div className="pwd-strength-container">
                                            <div className="pwd-strength-bar-bg">
                                                <div 
                                                    className="pwd-strength-bar-fill" 
                                                    style={{ width: strength.width, backgroundColor: strength.color }}
                                                ></div>
                                            </div>
                                            <span 
                                                className="pwd-strength-label" 
                                                style={{ color: strength.color }}
                                            >
                                                {strength.label}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* CONFIRM PASSWORD */}
                                <div className="input-container">
                                    <div className="floating-input-wrapper">
                                        <LockIcon />
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            className={`login-input ${isMatched ? 'input-success' : ''}`}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder=" "
                                            required
                                        />
                                        <label className="floating-label" htmlFor="confirmPassword">Confirm Password</label>
                                        {isMatched && <CheckIcon />}
                                    </div>
                                </div>

                                {/* MICRO UX: Terms & Remember Me */}
                                <div className="signup-micro-ux-row">
                                    <label className="remember-me">
                                        <input 
                                            type="checkbox" 
                                            className="custom-checkbox" 
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <span>Remember me</span>
                                    </label>
                                    <label className="remember-me">
                                        <input 
                                            type="checkbox" 
                                            className="custom-checkbox" 
                                            checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                        />
                                        <span>I agree to Terms & Conditions</span>
                                    </label>
                                </div>

                                {showError && <p className="error-message">{errorMsg}</p>}

                                <button
                                    type="submit"
                                    className={`login-button ${isLoading ? 'loading' : ''}`}
                                    disabled={isLoading || !agreeTerms}
                                >
                                    {isLoading ? <span className="btn-spinner"></span> : 'Create Account'}
                                </button>
                                
                                <p className="signup-text bottom-nav">
                                    Already have an account? <a href="/login" className="signup-link">Login</a>
                                </p>
                            </form>
                        )}
                    </div>
                </div>

                {/* Image Section - UNTOUCHED */}
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