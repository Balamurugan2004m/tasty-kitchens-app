import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = Cookies.get('jwt_token')
    const userRole = Cookies.get('user_role')

    if (token === undefined) {
        return <Navigate to="/login" />
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute
