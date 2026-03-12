import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './index.css'

const Pagination = ({page, totalPages, onPrev, onNext}) => {
    return (
        <div className="pagination-container d-flex align-items-center justify-content-center mt-4 mb-5">

            <button
                className="pagination-button"
                onClick={onPrev}
                disabled={page === 1}
            >
                <FiChevronLeft className="chevron-icon" />
            </button>

            <span className="pagination-text mx-4">
                {page} of {totalPages}
            </span>

            <button
                className="pagination-button"
                onClick={onNext}
                disabled={page === totalPages}
            >
                <FiChevronRight className="chevron-icon" />
            </button>
        </div>
    )
}

export default Pagination