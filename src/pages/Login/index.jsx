import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { loginAPI } from '../../services/api'
import './index.css'

const parseJwt = (token) => {
  try {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    if (pad) {
      if (pad === 1) throw new Error('InvalidLengthError');
      base64 += new Array(5 - pad).join('=');
    }
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("JWT Parse Error", e);
    return null;
  }
};

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

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isShake, setIsShake] = useState(false)
    const [role, setRole] = useState('USER')
    const [rememberMe, setRememberMe] = useState(false)

    useEffect(() => {
        const savedEmail = localStorage.getItem('tasty_kitchens_email')
        const savedPassword = localStorage.getItem('tasty_kitchens_password')
        if (savedEmail && savedPassword) {
            setEmail(savedEmail)
            setPassword(savedPassword)
            setRememberMe(true)
        }
    }, [])

    const navigate = useNavigate()

    const onSubmitSuccess = (jwtToken) => {
        Cookies.set('jwt_token', jwtToken, { expires: 30 })
        Cookies.set('user_role', role, { expires: 30 })
        Cookies.set('user_email', email, { expires: 30 })
        
        if (rememberMe) {
            localStorage.setItem('tasty_kitchens_email', email)
            localStorage.setItem('tasty_kitchens_password', password)
        } else {
            localStorage.removeItem('tasty_kitchens_email')
            localStorage.removeItem('tasty_kitchens_password')
        }

        navigate('/', { replace: true })
    }

    const onSubmitFailure = (errorMsg) => {
        setShowError(true)
        setErrorMsg(errorMsg)
        setIsLoading(false)
        setIsShake(true)
        setTimeout(() => setIsShake(false), 500)
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setShowError(false)

        // Removed the mock timeouts so all selected roles pass through the real API

        // Use the selected role as well, backend might validate it.
        const userDetails = { Email: email, Password: password, Role: role }
        
        try {
            const data = await loginAPI(userDetails)
            
            // Ensure the backend returns `token` or similar.
            const token = data.token || data.jwt_token || data.jwtToken;
            let actualRole = null;
            
            if (token) {
                const decodedToken = parseJwt(token);
                if (!decodedToken) {
                    onSubmitFailure("Invalid security token received. Login failed.");
                    return;
                }

                actualRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] 
                          || decodedToken.role 
                          || decodedToken.Role;
                
                if (!actualRole) {
                    onSubmitFailure("Security token is missing role claims. Login failed.");
                    return;
                }
                
                // Determine if backend role matches selected UI role
                if (actualRole) {
                    const normalizedActual = actualRole.toUpperCase().replace(/_/g, '');
                    const normalizedSelected = role.toUpperCase().replace(/_/g, '');
                    
                    // Reject cross-role tab login attempts
                    if (normalizedActual !== normalizedSelected) {
                        let expectedTab = 'User';
                        if (normalizedActual.includes('ADMIN')) {
                            expectedTab = normalizedActual.includes('SUPER') ? 'Super Admin' : 'Admin';
                        }
                        
                        onSubmitFailure(`Access Denied. Your account is registered as ${expectedTab}. Please switch to the ${expectedTab} tab.`);
                        return;
                    }
                }
                
                onSubmitSuccess(token)
            } else {
                onSubmitFailure("Invalid response from server (No token received)")
            }

        } catch (error) {
            onSubmitFailure(error.message || 'Something went wrong. Please try again later.')
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
                <div className="login-form-container mt-3 mb-3">

                    <div className={`login-card ${isShake ? 'shake-animation' : ''}`}>
                        <div className="logo-container">
                            <img
                                src="https://res.cloudinary.com/dmmfmktet/image/upload/v1773055421/3d30e43f-d664-464d-ac18-f113dfd80da5_zaqrzs.png"
                                alt="website logo"
                                className="login-website-logo"
                            />
                            <h1 className="login-website-name">Tasty Kitchens</h1>
                        </div>

                        <div className="header-text-container">
                            <h1 className="login-heading">Login</h1>
                            <p className="login-subtitle">
                                {role === 'USER' && 'Welcome back, food lover'}
                                {role === 'ADMIN' && 'Restaurant Partner Portal'}
                                {role === 'SUPER_ADMIN' && 'Application Owner Portal'}
                            </p>
                        </div>

                        {/* Premium Modern Role Tabs (Swiggy/Zomato style) */}
                        <div className="role-tabs-wrapper">
                            <button 
                                type="button" 
                                className={`role-tab ${role === 'USER' ? 'active' : ''}`}
                                onClick={() => setRole('USER')}
                            >
                                User
                            </button>
                            <button 
                                type="button" 
                                className={`role-tab ${role === 'ADMIN' ? 'active' : ''}`}
                                onClick={() => setRole('ADMIN')}
                            >
                                Admin
                            </button>
                            <button 
                                type="button" 
                                className={`role-tab ${role === 'SUPER_ADMIN' ? 'active' : ''}`}
                                onClick={() => setRole('SUPER_ADMIN')}
                            >
                                Super Admin
                            </button>
                        </div>

                        <form className="login-form" onSubmit={onSubmitForm}>

                            <div className="input-container">
                                <div className="floating-input-wrapper">
                                    <EmailIcon />
                                    <input
                                        type="text"
                                        id="email"
                                        className="login-input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder=" "
                                        required
                                    />
                                    <label className="floating-label" htmlFor="email">
                                        Email Address
                                    </label>
                                </div>
                            </div>

                            <div className="input-container">
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
                                    <label className="floating-label" htmlFor="password">
                                        Password
                                    </label>
                                    <button 
                                        type="button" 
                                        className="pwd-toggle-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex="-1"
                                    >
                                        <EyeIcon show={showPassword} />
                                    </button>
                                </div>
                            </div>

                            <div className="login-micro-ux-row">
                                <label className="remember-me">
                                    <input 
                                        type="checkbox" 
                                        className="custom-checkbox" 
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <span>Remember Me</span>
                                </label>
                                <a href="#forgot" className="forgot-password-link">Forgot Password?</a>
                            </div>

                            {showError && <p className="error-message">{errorMsg}</p>}

                            <button
                                type="submit"
                                className={`login-button ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? <span className="btn-spinner"></span> : 'Login'}
                            </button>

                        </form>
                        
                        <p className="signup-text">
                            Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
                        </p>
                    </div>

                </div>

                {/* Image Section - UNTOUCHED */}
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