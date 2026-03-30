import { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import Pagination from "../../components/Pagination"
import { 
    getAllFoodItemsAPI, 
    createFoodItemAPI, 
    updateFoodItemAPI, 
    deleteFoodItemAPI,
    getAllRestaurantsAPI,
    createRestaurantAPI,
    updateRestaurantAPI,
    deleteRestaurantAPI,
    uploadRestaurantImageAPI,
    uploadFoodItemImageAPI,
    getAllOrdersAPI,
    updateOrderStatusAPI,
    getMyOrdersAPI
} from '../../services/api'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { FiEdit2, FiTrash2, FiPlus, FiAlertCircle, FiUpload } from 'react-icons/fi'
import './index.css'

const AdminDashboard = () => {
    const userRole = Cookies.get('user_role') || 'ADMIN'
    const FIXED_REST_ID = 1

    const [activeTab, setActiveTab] = useState('food') // 'food', 'restaurants', or 'orders'
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    
    // Food Items State
    const [foodItems, setFoodItems] = useState([])
    const getFoodDetails = (foodId) => {
        return foodItems.find(
          f => String(f.id || f.Id) === String(foodId)
        )
      }
    const [showFoodForm, setShowFoodForm] = useState(false)
    const [isEditingFood, setIsEditingFood] = useState(false)
    const [currentFoodId, setCurrentFoodId] = useState(null)
    
    // Restaurants State
    const [restaurants, setRestaurants] = useState([])
    const [showRestForm, setShowRestForm] = useState(false)
    const [isEditingRest, setIsEditingRest] = useState(false)
    const [currentRestId, setCurrentRestId] = useState(null)
    
    // Food Form Inputs
    const [foodName, setFoodName] = useState('')
    const [foodCost, setFoodCost] = useState('')
    const [foodType, setFoodType] = useState('Veg')
    const [foodImageUrl, setFoodImageUrl] = useState('')
    const [foodRestaurantId, setFoodRestaurantId] = useState(userRole === 'SUPER_ADMIN' ? '' : FIXED_REST_ID)
    const [foodRating, setFoodRating] = useState('')
    const [isUploadingFood, setIsUploadingFood] = useState(false)
    const [isUploadingRest, setIsUploadingRest] = useState(false)

    // Restaurant Form Inputs
    const [restName, setRestName] = useState('')
    const [restCuisine, setRestCuisine] = useState('')
    const [restLocation, setRestLocation] = useState('')
    const [restImageUrl, setRestImageUrl] = useState('')
    const [restRating, setRestRating] = useState('0')
    const [restTotalReviews, setRestTotalReviews] = useState('0')
    const [restCostForTwo, setRestCostForTwo] = useState('0')
    const [restDistance, setRestDistance] = useState('0')
    const [restDeliveryTime, setRestDeliveryTime] = useState('0')

    // Orders State
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [page, setPage] = useState(1)
    const [orders, setOrders] = useState([])
    const [statusFilter, setStatusFilter] = useState("All")
    
    const filteredOrders = orders.filter(order => {
        if (statusFilter === "All") return true
        return order.status === statusFilter
    })
    
    const fetchOrders = async () => {
        try {
            setIsLoading(true)
            const data = await getAllOrdersAPI()
            setOrders(data || [])
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchFoodItems()
        fetchRestaurants()
        fetchOrders()
    }, [])

    const getTotalQty = (items) => {
        if (!items || !Array.isArray(items)) return 0
        return items.reduce((sum, item) => sum + (item.quantity || 0), 0)
    }
      
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await updateOrderStatusAPI(orderId, newStatus)
    
            setOrders(prev =>
                prev.map(order =>
                    order.id === orderId
                        ? { ...order, status: newStatus }
                        : order
                )
            )
    
            setSelectedOrder(prev => ({
                ...prev,
                status: newStatus
            }))
    
        } catch (err) {
            console.log(err)
        }
    }
    
    const totalItems = selectedOrder?.items?.length || 0

    const handlePrev = () => {
        if (page > 1) setPage(page - 1)
    }

    const handleNext = () => {
        if (page < totalItems) setPage(page + 1)
    }

    const currentItem = selectedOrder?.items?.[page - 1]

    const fetchRestaurants = async () => {
        setIsLoading(true)
        try {
            const data = await getAllRestaurantsAPI()
            let restList = Array.isArray(data) ? data : data.data || []

            // ADMIN only sees their single assigned restaurant
            if (userRole === 'ADMIN') {
                restList = restList.filter(rest => (rest.id || rest.Id) == FIXED_REST_ID)
            }

            setRestaurants(restList)
            setErrorMsg('')
        } catch (error) {
            console.error('Failed to fetch restaurants:', error)
            setErrorMsg(error.message || 'Failed to fetch restaurants')
        } finally {
            setIsLoading(false)
        }
    }

    const fetchFoodItems = async () => {
        setIsLoading(true)
        try {
            const restData = await getAllRestaurantsAPI()
            const restList = Array.isArray(restData) ? restData : restData.data || []
            const validRestIds = restList.map(r => String(r.id || r.Id))

            const data = await getAllFoodItemsAPI()
            let itemsList = Array.isArray(data) ? data : data.data || []
            
            // Filter out items belonging to restaurants that don't exist anymore
            itemsList = itemsList.filter(item => {
                const rId = String(item.restaurantId || item.RestaurantId)
                return validRestIds.includes(rId)
            })

            // ADMIN only sees their single assigned restaurant
            if (userRole === 'ADMIN') {
                itemsList = itemsList.filter(item => (item.restaurantId || item.RestaurantId) == FIXED_REST_ID)
            }

            setFoodItems(itemsList)
            setErrorMsg('')
        } catch (error) {
            setErrorMsg(error.message || 'Failed to fetch food items')
        } finally {
            setIsLoading(false)
        }
    }

    const resetFoodForm = () => {
        setFoodName('')
        setFoodCost('')
        setFoodType('Veg')
        setFoodImageUrl('')
        setFoodRestaurantId(userRole === 'SUPER_ADMIN' ? '' : FIXED_REST_ID)
        setFoodRating('0')
        setIsEditingFood(false)
        setCurrentFoodId(null)
        setShowFoodForm(false)
    }

    const resetRestForm = () => {
        setRestName('')
        setRestCuisine('')
        setRestLocation('')
        setRestImageUrl('')
        setRestRating('0')
        setRestTotalReviews('0')
        setRestCostForTwo('0')
        setRestDistance('0')
        setRestDeliveryTime('0')
        setIsEditingRest(false)
        setCurrentRestId(null)
        setShowRestForm(false)
    }


    const handleEditFood = (foodItem) => {
        setFoodName(foodItem.name || foodItem.Name || '')
        setFoodCost(foodItem.price || foodItem.Price || foodItem.cost || foodItem.Cost || '')
        
        // Handle isVeg boolean or legacy foodType string
        let type = 'Veg'
        const rawIsVeg = foodItem.isVeg !== undefined ? foodItem.isVeg : foodItem.IsVeg
        if (rawIsVeg !== undefined) {
            type = rawIsVeg ? 'Veg' : 'Non-Veg'
        } else {
            type = foodItem.foodType || foodItem.FoodType || foodItem.type || foodItem.Type || 'Veg'
        }
        
        setFoodType(type)
        setFoodImageUrl(foodItem.imageUrl || foodItem.ImageUrl || '')
        setFoodRestaurantId(foodItem.restaurantId || foodItem.RestaurantId || '')
        setFoodRating(foodItem.rating || foodItem.Rating || '0')
        setCurrentFoodId(foodItem.id || foodItem.Id)
        setIsEditingFood(true)
        setShowFoodForm(true)
    }

    const handleEditRest = (rest) => {
        setRestName(rest.name || rest.Name || '')
        setRestCuisine(rest.cuisine || rest.Cuisine || '')
        setRestLocation(rest.location || rest.Location || '')
        setRestImageUrl(rest.imageUrl || rest.ImageUrl || '')
        setRestRating(rest.rating || rest.Rating || '0')
        setRestTotalReviews(rest.totalReviews || rest.TotalReviews || '0')
        setRestCostForTwo(rest.costForTwo || rest.CostForTwo || '0')
        setRestDistance(rest.distance || rest.Distance || '0')
        setRestDeliveryTime(rest.deliveryTime || rest.DeliveryTime || '0')
        setCurrentRestId(rest.id || rest.Id)
        setIsEditingRest(true)
        setShowRestForm(true)
    }


    const handleDeleteFood = async (id) => {
        if (!window.confirm("Are you sure you want to delete this food item?")) return
        try {
            await deleteFoodItemAPI(id)
            fetchFoodItems()
        } catch (error) {
            alert(error.message || 'Failed to delete food item')
        }
    }

    const handleDeleteRest = async (id) => {
        if (!window.confirm("Are you sure you want to delete this restaurant? This will remove all associated menu items.")) return
        try {
            await deleteRestaurantAPI(id)
            fetchRestaurants()
            fetchFoodItems() 
        } catch (error) {
            console.error('Failed to delete restaurant:', error)
            alert(error.message || 'Failed to delete restaurant')
        }
    }

    const onSubmitFoodForm = async (e) => {
        e.preventDefault()
        const payload = {
            Name: foodName,
            Price: parseFloat(foodCost) || 0,
            IsVeg: foodType === 'Veg',
            ImageUrl: foodImageUrl,
            RestaurantId: parseInt(foodRestaurantId, 10) || FIXED_REST_ID,
            Rating: parseFloat(foodRating) || 0
        }

        try {
            if (isEditingFood) {
                await updateFoodItemAPI(currentFoodId, payload)
            } else {
                await createFoodItemAPI(payload)
            }
            fetchFoodItems()
            resetFoodForm()
        } catch (error) {
            alert(error.message || `Failed to ${isEditingFood ? 'update' : 'create'} food item`)
        }
    }

    const handleFoodImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        
        setIsUploadingFood(true)
        try {
            const data = await uploadFoodItemImageAPI(file)
            const imageUrl = data.imageUrl || data.url || data
            if (typeof imageUrl === 'string') {
                setFoodImageUrl(imageUrl)
            } else {
                console.error("Unexpected upload response structure:", data)
                alert("Upload succeeded but couldn't retrieve image URL.")
            }
        } catch (error) {
            console.error("Food image upload failed:", error)
            alert(error.message || "Failed to upload image")
        } finally {
            setIsUploadingFood(false)
        }
    }

    const handleRestImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        
        setIsUploadingRest(true)
        try {
            const data = await uploadRestaurantImageAPI(file)
            const imageUrl = data.imageUrl || data.url || data
            if (typeof imageUrl === 'string') {
                setRestImageUrl(imageUrl)
            } else {
                console.error("Unexpected upload response structure:", data)
                alert("Upload succeeded but couldn't retrieve image URL.")
            }
        } catch (error) {
            console.error("Restaurant image upload failed:", error)
            alert(error.message || "Failed to upload image")
        } finally {
            setIsUploadingRest(false)
        }
    }

    const onSubmitRestForm = async (e) => {
        e.preventDefault()
        
        const payload = {
            Name: restName,
            Cuisine: restCuisine,
            Location: restLocation,
            ImageUrl: restImageUrl,
            Rating: parseFloat(restRating) || 0,
            TotalReviews: parseInt(restTotalReviews, 10) || 0,
            CostForTwo: parseFloat(restCostForTwo) || 0,
            Distance: String(restDistance),
            DeliveryTime: String(restDeliveryTime)
        }

        try {
            if (isEditingRest) {
                await updateRestaurantAPI(currentRestId, payload)
            } else {
                await createRestaurantAPI(payload)
            }
            fetchRestaurants()
            resetRestForm()
        } catch (error) {
            console.error(`Failed to ${isEditingRest ? 'update' : 'create'} restaurant:`, error)
            alert(error.message || `Failed to ${isEditingRest ? 'update' : 'create'} restaurant`)
        }
    }


    const renderFoodForm = () => (
        <div className="admin-form-overlay">
            <div className="admin-form-container glass-effect">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="admin-form-title m-0">{isEditingFood ? 'Edit Food Item' : 'Add New Food Item'}</h3>
                    <button type="button" className="btn-close" onClick={resetFoodForm} aria-label="Close"></button>
                </div>
                <form onSubmit={onSubmitFoodForm}>
                    <div className="mb-3 custom-input-group">
                        <label className="form-label text-muted fw-semibold">Food Name</label>
                        <input type="text" className="form-control admin-input" placeholder="e.g. Margherita Pizza" required value={foodName} onChange={e => setFoodName(e.target.value)} />
                    </div>
                    
                    <div className="row mb-3">
                        <div className="col-md-6 custom-input-group">
                            <label className="form-label text-muted fw-semibold">Cost (₹)</label>
                            <input type="number" step="0.01" className="form-control admin-input" placeholder="0.00" required value={foodCost} onChange={e => setFoodCost(e.target.value)} />
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
                        <label className="form-label text-muted fw-semibold d-flex justify-content-between">
                            Image URL
                            <span className="text-primary cursor-pointer small" style={{ cursor: 'pointer' }} onClick={() => document.getElementById('foodImageInput').click()}>
                                <FiUpload className="me-1" /> {isUploadingFood ? 'Uploading...' : 'Upload from device'}
                            </span>
                        </label>
                        <input 
                            id="foodImageInput"
                            type="file" 
                            className="d-none" 
                            accept="image/*"
                            onChange={handleFoodImageUpload}
                            disabled={isUploadingFood}
                        />
                        <input type="url" className="form-control admin-input" placeholder="https://example.com/image.jpg" value={foodImageUrl} onChange={e => setFoodImageUrl(e.target.value)} />
                        {foodImageUrl && (
                            <div className="mt-2 text-center">
                                <img src={foodImageUrl} alt="Preview" className="img-thumbnail" style={{ height: '100px', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>
                    
                    <div className="row mb-4">
                        {userRole === 'SUPER_ADMIN' && (
                            <div className="col-md-6 custom-input-group">
                                <label className="form-label text-muted fw-semibold">Restaurant</label>
                                <select className="form-select admin-input" required value={foodRestaurantId} onChange={e => setFoodRestaurantId(e.target.value)}>
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
                            <input type="number" step="0.1" min="0" max="5" className="form-control admin-input" placeholder="4.5" value={foodRating} onChange={e => setFoodRating(e.target.value)} />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-3 mt-2">
                        <button type="button" className="btn btn-light px-4" onClick={resetFoodForm}>Cancel</button>
                        <button type="submit" className="btn btn-premium px-5">{isEditingFood ? 'Save Changes' : 'Create Item'}</button>
                    </div>
                </form>
            </div>
        </div>
    )

    const renderRestForm = () => (
        <div className="admin-form-overlay">
            <div className="admin-form-container glass-effect">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="admin-form-title m-0">{isEditingRest ? 'Edit Restaurant' : 'Add New Restaurant'}</h3>
                    <button type="button" className="btn-close" onClick={resetRestForm} aria-label="Close"></button>
                </div>
                <form onSubmit={onSubmitRestForm}>
                    <div className="mb-3 custom-input-group">
                        <label className="form-label text-muted fw-semibold">Restaurant Name</label>
                        <input type="text" className="form-control admin-input" placeholder="e.g. Olive Garden" required value={restName} onChange={e => setRestName(e.target.value)} />
                    </div>
                    
                    <div className="row mb-3">
                        <div className="col-md-6 custom-input-group">
                            <label className="form-label text-muted fw-semibold">Cuisine</label>
                            <input type="text" className="form-control admin-input" placeholder="e.g. Italian, Cafe" required value={restCuisine} onChange={e => setRestCuisine(e.target.value)} />
                        </div>
                        <div className="col-md-6 custom-input-group">
                            <label className="form-label text-muted fw-semibold">Location</label>
                            <input type="text" className="form-control admin-input" placeholder="e.g. Los Angeles" required value={restLocation} onChange={e => setRestLocation(e.target.value)} />
                        </div>
                    </div>

                    <div className="mb-3 custom-input-group">
                        <label className="form-label text-muted fw-semibold d-flex justify-content-between">
                            Image URL
                            <span className="text-primary cursor-pointer small" style={{ cursor: 'pointer' }} onClick={() => document.getElementById('restImageInput').click()}>
                                <FiUpload className="me-1" /> {isUploadingRest ? 'Uploading...' : 'Upload from device'}
                            </span>
                        </label>
                        <input 
                            id="restImageInput"
                            type="file" 
                            className="d-none" 
                            accept="image/*"
                            onChange={handleRestImageUpload}
                            disabled={isUploadingRest}
                        />
                        <input type="url" className="form-control admin-input" placeholder="https://example.com/rest.jpg" required value={restImageUrl} onChange={e => setRestImageUrl(e.target.value)} />
                        {restImageUrl && (
                            <div className="mt-3 text-center preview-container">
                                <p className="text-muted small mb-1">Image Preview</p>
                                <img src={restImageUrl} alt="Restaurant Preview" className="img-thumbnail shadow-sm" style={{ maxHeight: '150px', objectFit: 'cover', borderRadius: '8px' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image+URL' }} />
                            </div>
                        )}
                    </div>
                    
                    <div className="row mb-4">
                        <div className="col-md-3 custom-input-group">
                            <label className="form-label text-muted fw-semibold">Rating</label>
                            <input type="number" step="0.1" min="0" max="5" className="form-control admin-input" placeholder="4.5" value={restRating} onChange={e => setRestRating(e.target.value)} />
                        </div>
                        <div className="col-md-3 custom-input-group">
                            <label className="form-label text-muted fw-semibold">Reviews</label>
                            <input type="number" className="form-control admin-input" placeholder="100" value={restTotalReviews} onChange={e => setRestTotalReviews(e.target.value)} />
                        </div>
                        <div className="col-md-3 custom-input-group">
                            <label className="form-label text-muted fw-semibold">Distance (km)</label>
                            <input type="number" step="0.1" className="form-control admin-input" placeholder="5.2" value={restDistance} onChange={e => setRestDistance(e.target.value)} />
                        </div>
                        <div className="col-md-3 custom-input-group">
                            <label className="form-label text-muted fw-semibold">Delivery Time (min)</label>
                            <input type="number" className="form-control admin-input" placeholder="30" value={restDeliveryTime} onChange={e => setRestDeliveryTime(e.target.value)} />
                        </div>
                    </div>

                    <div className="mb-4 custom-input-group">
                        <label className="form-label text-muted fw-semibold">Cost for 2</label>
                        <input type="number" className="form-control admin-input" placeholder="500" value={restCostForTwo} onChange={e => setRestCostForTwo(e.target.value)} />
                    </div>

                    <div className="d-flex justify-content-end gap-3 mt-2">
                        <button type="button" className="btn btn-light px-4" onClick={resetRestForm}>Cancel</button>
                        <button type="submit" className="btn btn-premium px-5">{isEditingRest ? 'Save Changes' : 'Create Restaurant'}</button>
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
                    
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 p-4 rounded-4 premium-header-card shadow-sm">
                        <div>
                        <h2 className="admin-title text-dark m-0 fw-bold">
                                {activeTab === 'food'
                                ? 'Food Management'
                                : activeTab === 'restaurants'
                                ? 'Restaurant Management'
                                : 'Order Management'}
                        </h2>
                        <p className="text-secondary mt-1 mb-0">
                            Overview and control of your {
                                activeTab === 'food'
                                    ? 'menus'
                                    : activeTab === 'restaurants'
                                    ? 'restaurants'
                                    : 'orders'
                            }
                        </p>
                        </div>
                        { ((activeTab === 'food' && userRole === 'ADMIN') || (activeTab === 'restaurants' && userRole === 'SUPER_ADMIN')) && (
                            <button className="btn btn-premium d-flex align-items-center gap-2 mt-3 mt-md-0" onClick={() => activeTab === 'food' ? setShowFoodForm(true) : setShowRestForm(true)}>
                                <FiPlus size={20} /> Add {activeTab === 'food' ? 'Food Item' : 'Restaurant'}
                            </button>
                        )}
                    </div>

                    {/* Tab Switcher */}
                    <div className="tab-switcher mb-5 d-flex gap-2 p-2 bg-light rounded-4 shadow-sm" style={{ width: 'fit-content' }}>
                        <button 
                            className={`btn ${activeTab === 'food' ? 'btn-premium' : 'btn-light'} px-4 py-2 rounded-3`}
                            onClick={() => setActiveTab('food')}
                        >
                            Menu Items
                        </button>
                        <button 
                            className={`btn ${activeTab === 'restaurants' ? 'btn-premium' : 'btn-light'} px-4 py-2 rounded-3`}
                            onClick={() => setActiveTab('restaurants')}
                        >
                            Restaurants
                        </button>
                        <button 
                            className={`btn ${activeTab === 'orders' ? 'btn-premium' : 'btn-light'} px-4 py-2 rounded-3`}
                            onClick={() => setActiveTab('orders')}
                        >
                            Orders
                        </button>
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
                             {/* ORDERS TABLE */}
                             {activeTab === 'orders' && (
                                <table className="table table-hover align-middle admin-table mb-0">
                                    <thead>
                                        <tr>
                                            <th className="py-3 text-muted text-uppercase text-xs order-serial" style={{ width: "60px" }}>S.No</th>
                                            <th className="ps-4 py-3 text-muted text-uppercase text-xs">Order ID</th>
                                            <th className="py-3 text-muted text-uppercase text-xs">Date</th>
                                            <th className="py-3 text-muted text-uppercase text-xs">User</th>
                                            <th className="py-3 text-muted text-uppercase text-xs">Address</th>
                                            <th className="py-3 text-muted text-uppercase text-xs">Qty</th>
                                            <th className="py-3 text-muted text-uppercase text-xs">Amount</th>

                                            {/* STATUS + FILTER DROPDOWN */}
                                            <th className="py-3 text-muted text-uppercase text-xs">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span>Status</span>
                                                    <select
                                                        value={statusFilter}
                                                        onChange={(e) => setStatusFilter(e.target.value)}
                                                        className="form-select status-filter-dropdown"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <option value="All">All</option>
                                                        <option value="Placed">Placed</option>
                                                        <option value="Preparing">Preparing</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredOrders.length > 0 ? (
                                            filteredOrders.map((order, index) => (
                                                <tr 
                                                    key={order.id}
                                                    onClick={() => {
                                                        setSelectedOrder(order)
                                                        setPage(1)   
                                                    }}
                                                    style={{ cursor: "pointer" }}
                                                    className="table-row-hover"
                                                >
                                                    <td className="order-serial">{index + 1}</td>
                                                    <td className="ps-4 fw-semibold">#{order.id}</td>
                                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                                    <td>{order.userId}</td>
                                                    <td className="text-truncate" style={{ maxWidth: '150px' }}>{order.address}</td>
                                                    <td>{getTotalQty(order.items || [])}</td>
                                                    <td className="fw-bold text-success">₹{order.totalAmount}</td>
                                                    <td>
                                                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center py-5 no-orders">
                                                    No orders found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}

                            {/* FOOD + REST BLOCK */}
                            {activeTab !== 'orders' && (
                                <>
                                    {activeTab === 'food' ? (
                                        <table className="table table-hover align-middle admin-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="ps-4 py-3 text-muted text-uppercase text-xs">Item</th>
                                                    {userRole === 'SUPER_ADMIN' && <th className="py-3 text-muted text-uppercase text-xs">ID</th>}
                                                    {userRole === 'SUPER_ADMIN' && <th className="py-3 text-muted text-uppercase text-xs">Rest. ID</th>}
                                                    <th className="py-3 text-muted text-uppercase text-xs">Type</th>
                                                    <th className="py-3 text-muted text-uppercase text-xs">Price</th>
                                                    <th className="py-3 text-muted text-uppercase text-xs">Rating</th>
                                                    {userRole === 'ADMIN' && <th className="pe-4 py-3 text-muted text-uppercase text-xs text-end">Actions</th>}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {foodItems.length > 0 ? (
                                                    foodItems.map((item) => {
                                                        const id = item.id || item.Id;
                                                        const name = item.name || item.Name;
                                                        
                                                        // Extract Veg Status
                                                        let type = 'Veg';
                                                        const rawIsVeg = item.isVeg !== undefined ? item.isVeg : item.IsVeg;
                                                        if (rawIsVeg !== undefined) {
                                                            type = rawIsVeg ? 'Veg' : 'Non-Veg';
                                                        } else {
                                                            type = item.foodType || item.FoodType || item.type || item.Type || 'Veg';
                                                        }

                                                        const cost = item.price || item.Price || item.cost || item.Cost;
                                                        const restId = item.restaurantId || item.RestaurantId;
                                                        const rating = item.rating || item.Rating || '0.0';
                                                        const imgUrl = item.imageUrl || item.ImageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';

                                                        return (
                                                            <tr key={`food-${id}`} className="table-row-hover">
                                                                <td className="ps-4">
                                                                    <div className="d-flex align-items-center gap-3 py-2">
                                                                        <div className="img-container rounded-3 overflow-hidden shadow-sm">
                                                                            <img src={imgUrl} alt={name} className="admin-food-img" />
                                                                        </div>
                                                                        <span className="fw-bold text-dark item-name">{name}</span>
                                                                    </div>
                                                                </td>
                                                                {userRole === 'SUPER_ADMIN' && <td className="text-secondary fw-semibold">#{id}</td>}
                                                                {userRole === 'SUPER_ADMIN' && <td className="text-secondary fw-semibold">R-{restId}</td>}
                                                                <td>
                                                                    <span className={`type-badge px-3 py-1 rounded-pill fw-semibold ${type === 'Veg' ? 'badge-veg' : 'badge-non-veg'}`}>
                                                                        {type}
                                                                    </span>
                                                                </td>
                                                                <td className="fw-bold text-success fs-6">₹{typeof cost === 'number' ? cost.toFixed(2) : cost}</td>
                                                                <td>
                                                                    <span className="rating-badge">★ {rating}</span>
                                                                </td>
                                                                {userRole === 'ADMIN' && (
                                                                    <td className="pe-4 text-end">
                                                                        <button 
                                                                            className="action-btn edit-btn me-2"
                                                                            onClick={() => handleEditFood(item)}
                                                                            title="Edit"
                                                                        >
                                                                            <FiEdit2 size={18} />
                                                                        </button>
                                                                        <button 
                                                                            className="action-btn delete-btn"
                                                                            onClick={() => handleDeleteFood(id)}
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
                                                        <td colSpan="6" className="text-center py-5">
                                                            No food items found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <table className="table table-hover align-middle admin-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="ps-4 py-3 text-muted text-uppercase text-xs">Restaurant</th>
                                                    {userRole === 'SUPER_ADMIN' && <th className="py-3 text-muted text-uppercase text-xs">ID</th>}
                                                    <th className="py-3 text-muted text-uppercase text-xs">Category</th>
                                                    <th className="py-3 text-muted text-uppercase text-xs">Location</th>
                                                    <th className="py-3 text-muted text-uppercase text-xs">Rating</th>
                                                    <th className="pe-4 py-3 text-muted text-uppercase text-xs text-end">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {restaurants.length > 0 ? (
                                                    restaurants.map((rest) => {
                                                        const id = rest.id || rest.Id;
                                                        const name = rest.name || rest.Name;
                                                        const category = rest.cuisine || rest.Cuisine || 'General';
                                                        const location = rest.location || rest.Location || '';
                                                        const rating = rest.rating || rest.Rating || '0.0';
                                                        const imgUrl = rest.imageUrl || rest.ImageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7ed9d42339?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';

                                                        return (
                                                            <tr key={`rest-${id}`} className="table-row-hover">
                                                                <td className="ps-4">
                                                                    <div className="d-flex align-items-center gap-3 py-2">
                                                                        <div className="img-container rounded-3 overflow-hidden shadow-sm">
                                                                            <img src={imgUrl} alt={name} className="admin-food-img" />
                                                                        </div>
                                                                        <span className="fw-bold text-dark item-name">{name}</span>
                                                                    </div>
                                                                </td>
                                                                {userRole === 'SUPER_ADMIN' && <td className="text-secondary fw-semibold">#{id}</td>}
                                                                <td className="text-secondary">{category}</td>
                                                                <td className="text-secondary">{location}</td>
                                                                <td>
                                                                    <span className="rating-badge">★ {rating}</span>
                                                                </td>
                                                                <td className="pe-4 text-end">
                                                                    <button 
                                                                        className="action-btn edit-btn me-2"
                                                                        onClick={() => handleEditRest(rest)}
                                                                        title="Edit"
                                                                    >
                                                                        <FiEdit2 size={18} />
                                                                    </button>
                                                                    {userRole === 'SUPER_ADMIN' && (
                                                                        <button 
                                                                            className="action-btn delete-btn"
                                                                            onClick={() => handleDeleteRest(id)}
                                                                            title="Delete"
                                                                        >
                                                                            <FiTrash2 size={18} />
                                                                        </button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center py-5">
                                                            No restaurants found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                    
                    {showFoodForm && renderFoodForm()}
                    {showRestForm && renderRestForm()}

                    {selectedOrder && (
                        <div 
                            className="order-modal-overlay"
                            onClick={() => setSelectedOrder(null)}
                        >
                            <div 
                                className="order-modal"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h4 className="order-title">ORDER DETAILS</h4>
                                <hr />

                                <div className="order-details-block">
                                    <p><strong>Order ID :</strong> {selectedOrder.id}</p>
                                    <p><strong>Total :</strong> ₹{selectedOrder.totalAmount}</p>
                                    <p><strong>Phone No :</strong> {selectedOrder.phoneNumber}</p>
                                </div>
                                <hr />
                                <div className="status-row">
                                    <span className="fw-bold">Update Status :</span>

                                    {selectedOrder.status === "Delivered" ? (
                                        <span className="text-success fw-bold">Delivered</span>
                                    ) : (
                                        <select
                                            value={selectedOrder.status}
                                            onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                                            className="status-dropdown"
                                        >
                                            <option value="Placed">Placed</option>
                                            <option value="Preparing">Preparing</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    )}
                                </div>
                                <hr />
                                {currentItem && (() => {
                                    const food = getFoodDetails(currentItem.foodItemId) || {}
                                    return (
                                        <div className="item-container">
                                            <img
                                                src={food?.imageUrl || food?.ImageUrl || "https://res.cloudinary.com/dmmfmktet/image/upload/v1773139143/5d73ac7b641c2d7c65afd6d3f795d2b168831b19_zwiwhs.jpg"}
                                                alt="food"
                                                className="item-image"
                                            />
                                            <p className="item-text">
                                                {food?.name || food?.Name || "Food Item"} x {currentItem.quantity || currentItem.Quantity}
                                            </p>
                                        </div>
                                    )
                                })()}
                                
                                <Pagination 
                                    page={page}
                                    totalPages={totalItems}
                                    onPrev={handlePrev}
                                    onNext={handleNext}
                                />

                                <button
                                    className="close-btn"
                                    onClick={() => setSelectedOrder(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminDashboard
