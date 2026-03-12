import { FaPinterest, FaInstagram, FaTwitter, FaFacebookSquare } from 'react-icons/fa'
import './index.css'

const Footer = () => {
    return (
        <footer className="footer-section p-5">
            <div className="container text-center">
                <div className="footer-logo-container d-flex align-items-center justify-content-center mb-4">
                    <img
                        src="https://res.cloudinary.com/dmmfmktet/image/upload/v1773055421/3d30e43f-d664-464d-ac18-f113dfd80da5_zaqrzs.png"
                        alt="footer logo"
                        className="footer-logo me-2"
                        width="40"
                    />
                    <h1 className="footer-heading">Tasty Kitchens</h1>
                </div>
                <p className="footer-tagline">
                    The only thing we are serious about is food.<br />
                    Contact us on
                </p>
                <div className="social-icons-container d-flex justify-content-center mt-4">
                    <FaPinterest className="social-icon" />
                    <FaInstagram className="social-icon" />
                    <FaTwitter className="social-icon" />
                    <FaFacebookSquare className="social-icon" />
                </div>
            </div>
        </footer>
    )
}

export default Footer
