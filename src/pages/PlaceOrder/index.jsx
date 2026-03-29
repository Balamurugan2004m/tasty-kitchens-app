import { useState, useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { OrdersContext } from '../../context/OrdersContext'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import './index.css'

import { createOrderAPI } from '../../services/api'

const PlaceOrder = () => {
    const navigate = useNavigate()
    const { cartItems, clearCart } = useContext(CartContext)
    const { addresses } = useContext(OrdersContext)

    const [addressType, setAddressType] = useState('saved') // 'saved' or 'new'
    const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || '')
    const [isOrderPlaced, setIsOrderPlaced] = useState(false)
    const [newAddress, setNewAddress] = useState('')
    const [newPhone, setNewPhone] = useState('')

    if (cartItems.length === 0 && !isOrderPlaced) {
        return <Navigate to="/cart" />
    }

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    }

    const onPlaceOrder = async () => {
        let finalAddress = ''
        let finalPhone = ''

        if (addressType === 'saved') {
            const addr = addresses.find(a => a.id === selectedAddressId)
            finalAddress = addr?.address || 'No address selected'
            finalPhone = addr?.phone || ''
        } else {
            if (!newAddress || !newPhone) {
                toast.error('Please enter delivery details')
                return
            }
            finalAddress = newAddress
            finalPhone = newPhone
        }

        const orderDetails = {
            orderDate: new Date().toISOString(),
            items: cartItems.map(item => ({
                foodItemId: item.id,
                quantity: item.quantity,
                unitPrice: item.price
            })),
            totalAmount: calculateTotal(),
            address: finalAddress,
            phoneNumber: finalPhone,
            paymentMethod: 'Cash on Delivery',
            status: 'Placed',
            restaurantId: String(cartItems[0]?.restaurantId || '1')
        }

        try {
            await createOrderAPI(orderDetails)
            setIsOrderPlaced(true)
            clearCart()
            toast.success('Order Placed Successfully! 🔥')
            navigate('/', { replace: true })
        } catch (error) {
            console.error('Order Error:', error)
            toast.error(error.message || 'Failed to place order')
        }
    }


    return (
        <div className="place-order-page">
            <Navbar />
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="checkout-card mb-4">
                            <h2 className="section-title mb-4">Delivery Address</h2>
                            
                            <div className="address-options mb-4">
                                <div className={`address-type-btn ${addressType === 'saved' ? 'active' : ''}`} 
                                     onClick={() => setAddressType('saved')}>
                                    Saved Address
                                </div>
                                <div className={`address-type-btn ${addressType === 'new' ? 'active' : ''}`}
                                     onClick={() => setAddressType('new')}>
                                    Enter New Location
                                </div>
                            </div>

                            {addressType === 'saved' ? (
                                <div className="saved-addresses-list">
                                    {addresses.length === 0 ? (
                                        <p className="text-muted p-3">No saved addresses. Please enter a new location.</p>
                                    ) : (
                                        addresses.map(addr => (
                                            <div key={addr.id} 
                                                 className={`address-item ${selectedAddressId === addr.id ? 'selected' : ''}`}
                                                 onClick={() => setSelectedAddressId(addr.id)}>
                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-1 fw-bold">{addr.address}</p>
                                                    {selectedAddressId === addr.id && <span className="text-selected">✔ Selected</span>}
                                                </div>
                                                <p className="text-muted mb-0 small">{addr.phone}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            ) : (
                                <div className="new-address-form">
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Full Delivery Address</label>
                                        <textarea 
                                            className="form-control" 
                                            rows="3" 
                                            placeholder="Enter your street, area, city..."
                                            value={newAddress}
                                            onChange={(e) => setNewAddress(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-2">Contact Number</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Enter mobile number"
                                            value={newPhone}
                                            onChange={(e) => setNewPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="checkout-card mb-4">
                            <h2 className="section-title mb-4">Payment Method</h2>
                            <div className="payment-option selected">
                                <div className="d-flex align-items-center">
                                    <div className="payment-radio selected"></div>
                                    <span className="ms-3 fw-bold">Cash on Delivery</span>
                                </div>
                                <p className="text-muted ms-4 mb-0 mt-1 small">Pay with cash when your food arrives</p>
                            </div>
                            <div className="payment-option disabled mt-3">
                                <div className="d-flex align-items-center opacity-50">
                                    <div className="payment-radio"></div>
                                    <span className="ms-3 fw-bold">Online Payment (Coming Soon)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="checkout-card sticky-top" style={{ top: '100px' }}>
                            <h2 className="section-title mb-4">Order Summary</h2>
                            <div className="order-items-summary mb-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="d-flex justify-content-between mb-3">
                                        <span className="summary-item-name">{item.name} x {item.quantity}</span>
                                        <span className="summary-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <hr className="mb-4" />
                            <div className="d-flex justify-content-between mb-4 align-items-center">
                                <span className="total-label">Total Amount</span>
                                <span className="total-value">₹{calculateTotal().toFixed(2)}</span>
                            </div>
                            <button className="confirm-btn" onClick={onPlaceOrder}>
                                CONFIRM ORDER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PlaceOrder
