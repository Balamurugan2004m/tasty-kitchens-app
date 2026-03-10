import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './index.css'

const Pagination = () => {
    return (
        <div className="pagination-container d-flex align-items-center justify-content-center mt-4 mb-5">
            <button className="pagination-button">
                <FiChevronLeft className="chevron-icon" />
            </button>
            <span className="pagination-text mx-4">1 of 20</span>
            <button className="pagination-button">
                <FiChevronRight className="chevron-icon" />
            </button>
        </div>
    )
}

export default Pagination
