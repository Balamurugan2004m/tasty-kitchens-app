import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './index.css'

const Pagination = () => {
    return (
        <div className="pagination-container d-flex align-items-center justify-content-center mt-4 mb-5">
            <button className="pagination-button outline-none border-1 bg-transparent p-1 me-3">
                <FiChevronLeft className="chevron-icon" />
            </button>
            <span className="pagination-text fw-bold">1 of 20</span>
            <button className="pagination-button outline-none border-1 bg-transparent p-1 ms-3">
                <FiChevronRight className="chevron-icon" />
            </button>
        </div>
    )
}

export default Pagination
