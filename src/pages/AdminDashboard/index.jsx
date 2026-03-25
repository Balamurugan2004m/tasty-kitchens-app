import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { 
    getAllFoodItemsAPI, 
    createFoodItemAPI, 
    updateFoodItemAPI, 
    deleteFoodItemAPI,
    getAllRestaurantsAPI
} from '../../services/api'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { FiEdit2, FiTrash2, FiPlus, FiAlertCircle } from 'react-icons/fi'
import './index.css'

const AdminDashboard = () => {
    const userRole = Cookies.get('user_role') || 'ADMIN'
    const FIXED_REST_ID = 1

    const [foodItems, setFoodItems] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    
    // Form state
    const [showForm, setShowForm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentFoodId, setCurrentFoodId] = useState(null)
    
    // Form Inputs
    const [name, setName] = useState('')
    const [cost, setCost] = useState('')
    const [foodType, setFoodType] = useState('Veg')
    const [imageUrl, setImageUrl] = useState('')
    const [restaurantId, setRestaurantId] = useState(userRole === 'SUPER_ADMIN' ? '' : FIXED_REST_ID)
    const [rating, setRating] = useState('0')

    useEffect(() => {
        fetchFoodItems()
        if (userRole === 'SUPER_ADMIN') {
            fetchRestaurants()
        }
    }, [])

    const fetchRestaurants = async () => {
        try {
            const data = await getAllRestaurantsAPI()
            const restList = Array.isArray(data) ? data : data.data || []
            setRestaurants(restList)
        } catch (error) {
            console.error('Failed to fetch restaurants:', error)
        }
    }

    const fetchFoodItems = async () => {
        setIsLoading(true)
        try {
            const data = await getAllFoodItemsAPI()
            let itemsList = Array.isArray(data) ? data : data.data || []
            
            // ADMIN only sees their single assigned restaurant
            if (userRole === 'ADMIN') {
                itemsList = itemsList.filter(item => (item.restaurantId || item.RestaurantId) == FIXED_REST_ID)
            }

            setFoodItems(itemsList)
            console.log("Fetched food items:", itemsList)
            setErrorMsg('')
        } catch (error) {
            setErrorMsg(error.message || 'Failed to fetch food items')
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        setName('')
        setCost('')
        setFoodType('Veg')
        setImageUrl('')
        setRestaurantId(userRole === 'SUPER_ADMIN' ? '' : FIXED_REST_ID)
        setRating('0')
        setIsEditing(false)
        setCurrentFoodId(null)
        setShowForm(false)
    }

    const handleEdit = (foodItem) => {
        setName(foodItem.name || foodItem.Name || '')
        setCost(foodItem.cost || foodItem.Cost || '')
        // Catch different casings for FoodType
        const type = foodItem.foodType || foodItem.FoodType || foodItem.type || foodItem.Type || 'Veg'
        setFoodType(type)
        setImageUrl(foodItem.imageUrl || foodItem.ImageUrl || '')
        setRestaurantId(foodItem.restaurantId || foodItem.RestaurantId || '')
        setRating(foodItem.rating || foodItem.Rating || '0')
        setCurrentFoodId(foodItem.id || foodItem.Id)
        setIsEditing(true)
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this food item?")) return
        
        try {
            await deleteFoodItemAPI(id)
            fetchFoodItems()
        } catch (error) {
            alert(error.message || 'Failed to delete food item')
        }
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        
        const payload = {
            Name: name,
            Cost: parseFloat(cost),
            FoodType: foodType,
            ImageUrl: imageUrl,
            RestaurantId: parseInt(restaurantId, 10),
            Rating: parseFloat(rating)
        }

        try {
            if (isEditing) {
                await updateFoodItemAPI(currentFoodId, payload)
            } else {
                await createFoodItemAPI(payload)
            }
            fetchFoodItems()
            resetForm()
        } catch (error) {
            alert(error.message || `Failed to ${isEditing ? 'update' : 'create'} food item`)
        }
    }

    const renderForm = () => (
        <div className="admin-form-overlay">
            <div className="admin-form-container glass-effect">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="admin-form-title m-0">{isEditing ? 'Edit Food Item' : 'Add New Food Item'}</h3>
                    <button type="button" className="btn-close" onClick={resetForm} aria-label="Close"></button>
                </div>
                <form onSubmit={onSubmitForm}>
                    <div className="mb-3 custom-input-group">
                        <label className="form-label text-muted fw-semibold">Food Name</label>
                        <input type="text" className="form-control admin-input" placeholder="e.g. Margherita Pizza" required value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    
                    <div className="row mb-3">
                        <div className="col-md-6 custom-input-group">
                            <label className="form-label text-muted fw-semibold">Cost ($)</label>
                            <input type="number" step="0.01" className="form-control admin-input" placeholder="0.00" required value={cost} onChange={e => setCost(e.target.value)} />
                        </div>
                        <div className="col-md-6 custom-input-group">
                            <label className="form-label text-muted fw-semibold">Food Type</label>
                            <select className="form-select admin-input" value={foodType} onChange={e => setFoodType(e.target.value)}>
                                <option value="Veg">Veg</option>
                                <option value="Non-Veg">Non-Veg</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3 custom-input-group">
                        <label className="form-label text-muted fw-semibold">Image URL</label>
                        <input type="url" className="form-control admin-input" placeholder="https://example.com/image.jpg" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                        {imageUrl && (
                            <div className="mt-2 text-center">
                                <img src={imageUrl} alt="Preview" className="img-thumbnail" style={{ height: '100px', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>
                    
                    <div className="row mb-4">
                        {userRole === 'SUPER_ADMIN' && (
                            <div className="col-md-6 custom-input-group">
                                <label className="form-label text-muted fw-semibold">Restaurant</label>
                                <select className="form-select admin-input" required value={restaurantId} onChange={e => setRestaurantId(e.target.value)}>
                                    <option value="" disabled>Select a Restaurant</option>
                                    {restaurants.map(rest => (
                                        <option key={rest.id || rest.Id} value={rest.id || rest.Id}>
                                            {rest.name || rest.Name} (ID: {rest.id || rest.Id})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className={userRole === 'SUPER_ADMIN' ? "col-md-6 custom-input-group" : "col-md-12 custom-input-group"}>
                            <label className="form-label text-muted fw-semibold">Rating</label>
                            <input type="number" step="0.1" min="0" max="5" className="form-control admin-input" placeholder="4.5" value={rating} onChange={e => setRating(e.target.value)} />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-3 mt-2">
                        <button type="button" className="btn btn-light px-4" onClick={resetForm}>Cancel</button>
                        <button type="submit" className="btn btn-premium px-5">{isEditing ? 'Save Changes' : 'Create Item'}</button>
                    </div>
                </form>
            </div>
        </div>
    )

    return (
        <div className="admin-page-wrapper d-flex flex-column min-vh-100">
            <Navbar />
            <div className="admin-dashboard-container flex-grow-1 py-5">
                <div className="container custom-container">
                    
                    {/* Header Section */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 p-4 rounded-4 premium-header-card shadow-sm">
                        <div>
                            <h2 className="admin-title text-dark m-0 fw-bold">Food Management</h2>
                            <p className="text-secondary mt-1 mb-0">Overview and control of your restaurant menus</p>
                        </div>
                        {userRole !== 'SUPER_ADMIN' && (
                            <button className="btn btn-premium d-flex align-items-center gap-2 mt-3 mt-md-0" onClick={() => setShowForm(true)}>
                                <FiPlus size={20} /> Add Food Item
                            </button>
                        )}
                    </div>

                    {errorMsg && (
                        <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 border-0 shadow-sm rounded-3" role="alert">
                            <FiAlertCircle size={20} />
                            <div>{errorMsg}</div>
                        </div>
                    )}

                    {/* Data Section */}
                    {isLoading ? (
                        <div className="d-flex flex-column justify-content-center align-items-center my-5 py-5 text-muted">
                            <div className="spinner-border premium-spinner mb-3" role="status"></div>
                            <h5>Fetching data from the kitchen...</h5>
                        </div>
                    ) : (
                        <div className="table-responsive bg-white rounded-4 shadow-sm pb-2 table-wrapper">
                            <table className="table table-hover align-middle admin-table mb-0">
                                <thead>
                                    <tr>
                                        <th className="ps-4 py-3 text-muted text-uppercase text-xs">Item</th>
                                        {userRole === 'SUPER_ADMIN' && <th className="py-3 text-muted text-uppercase text-xs">ID</th>}
                                        {userRole === 'SUPER_ADMIN' && <th className="py-3 text-muted text-uppercase text-xs">Rest. ID</th>}
                                        <th className="py-3 text-muted text-uppercase text-xs">Type</th>
                                        <th className="py-3 text-muted text-uppercase text-xs">Price</th>
                                        <th className="py-3 text-muted text-uppercase text-xs">Rating</th>
                                        {userRole !== 'SUPER_ADMIN' && <th className="pe-4 py-3 text-muted text-uppercase text-xs text-end">Actions</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {foodItems.length > 0 ? (
                                        foodItems.map((item) => {
                                            const id = item.id || item.Id;
                                            const name = item.name || item.Name;
                                            const type = item.foodType || item.FoodType || item.type || item.Type || 'Veg';
                                            const cost = item.cost || item.Cost;
                                            const restId = item.restaurantId || item.RestaurantId;
                                            const rating = item.rating || item.Rating || '0.0';
                                            const imgUrl = item.imageUrl || item.ImageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';

                                            return (
                                                <tr key={id} className="table-row-hover">
                                                    <td className="ps-4">
                                                        <div className="d-flex align-items-center gap-3 py-2">
                                                            <div className="img-container rounded-3 overflow-hidden shadow-sm">
                                                                <img src={imgUrl} alt={name} className="admin-food-img" />
                                                            </div>
                                                            <span className="fw-bold text-dark item-name">{name}</span>
                                                        </div>
                                                    </td>
                                                    {userRole === 'SUPER_ADMIN' && (
                                                        <td className="text-secondary fw-semibold">#{id}</td>
                                                    )}
                                                    {userRole === 'SUPER_ADMIN' && (
                                                        <td className="text-secondary fw-semibold">R-{restId}</td>
                                                    )}
                                                    <td>
                                                        <span className={`type-badge px-3 py-1 rounded-pill fw-semibold ${type === 'Veg' ? 'badge-veg' : 'badge-non-veg'}`}>
                                                            {type}
                                                        </span>
                                                    </td>
                                                    <td className="fw-bold text-success fs-6">${typeof cost === 'number' ? cost.toFixed(2) : cost}</td>
                                                    <td>
                                                        <span className="rating-badge">★ {rating}</span>
                                                    </td>
                                                    {userRole !== 'SUPER_ADMIN' && (
                                                        <td className="pe-4 text-end">
                                                            <button 
                                                                className="action-btn edit-btn me-2"
                                                                onClick={() => handleEdit(item)}
                                                                title="Edit"
                                                            >
                                                                <FiEdit2 size={18} />
                                                            </button>
                                                            <button 
                                                                className="action-btn delete-btn"
                                                                onClick={() => handleDelete(id)}
                                                                title="Delete"
                                                            >
                                                                <FiTrash2 size={18} />
                                                            </button>
                                                        </td>
                                                    )}
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={userRole === 'SUPER_ADMIN' ? "6" : "5"} className="text-center py-5">
                                                <div className="empty-state">
                                                    <img src="https://res.cloudinary.com/dmmfmktet/image/upload/v1773055421/3d30e43f-d664-464d-ac18-f113dfd80da5_zaqrzs.png" alt="No items" width="100" className="mb-3 opacity-50" />
                                                    <h5 className="text-muted fw-bold">No food items found!</h5>
                                                    <p className="text-secondary">Start by adding some delicious meals to your database.</p>
                                                    {userRole !== 'SUPER_ADMIN' && (
                                                        <button className="btn btn-outline-premium mt-2" onClick={() => setShowForm(true)}>Add First Item</button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                    {showForm && renderForm()}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminDashboard
