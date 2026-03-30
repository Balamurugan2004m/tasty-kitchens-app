import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {useState, useContext} from 'react'
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { OrdersContext } from "../../context/OrdersContext"
import { MdCameraAlt } from 'react-icons/md'
import './index.css'
import { useEffect } from "react";
import { getUserProfileAPI, updateUserProfileAPI } from "../../services/api";
import { getMyOrdersAPI } from "../../services/api";

const menuItems = [
  "Account Information",
  "My Orders",
  "Address Management",
  "Settings",
  "Password Manager",
  "Help Center",
  "Logout"
]

const Profile = () => {

  const navigate = useNavigate()
  const { orders, userRole, userEmail, addresses, addAddress, deleteAddress, updateAddress } = useContext(OrdersContext)
  const [apiOrders, setApiOrders] = useState([])
  const [active,setActive] = useState("Account Information")
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrdersAPI();
        setApiOrders(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  /* PROFILE */

  const [profile,setProfile] = useState({
    name:"User",
    email:"user@email.com",
    phone:"",
    memberSince:"2026",
    address:"",
    avatar: "https://i.pravatar.cc/300?img=12"
  })
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfileAPI();
  
        setProfile({
          name: data.username,
          email: data.email,
          phone: data.phoneNumber,
          memberSince: "2026",
          address: data.address,
          avatar: "https://i.pravatar.cc/300?img=12"
        });
  
        setTempProfile({
          name: data.username,
          email: data.email,
          phone: data.phoneNumber,
          memberSince: "2026",
          address: data.address,
          avatar: "https://i.pravatar.cc/300?img=12"
        });
  
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchProfile();
  }, []);
  const [tempProfile,setTempProfile] = useState({...profile})
  const [isEditing,setIsEditing] = useState(false)

  const [newAddress,setNewAddress] = useState("")
  const [newPhone,setNewPhone] = useState("")
  const [editingId,setEditingId] = useState(null)

  /* PASSWORD */

  const [currentPassword,setCurrentPassword] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [passwordMsg,setPasswordMsg] = useState("")
  /* LOGOUT */

  const onClickLogout = () => {
    Cookies.remove("jwt_token")
    navigate("/login",{replace:true})
  }

  /* SAVE PROFILE */

  const saveProfile = async () => {
    try {
      await updateUserProfileAPI(tempProfile);
  
      setProfile(tempProfile);
      setIsEditing(false);
  
      toast.success("Profile Updated Successfully 🔥");
  
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  /* IMAGE UPLOAD */

  const onUploadImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result }))
        setTempProfile((prev) => ({ ...prev, avatar: reader.result }))
        toast.success("Profile Image Updated!")
      }
      reader.readAsDataURL(file)
    }
  }

  /* ADDRESS FUNCTIONS */

  const onAddAddress = () => {
    if(newAddress === "") return
    addAddress(newAddress, newPhone)
    setNewAddress("")
    setNewPhone("")
    toast.success("Address Added!")
  }


/* PASSWORD UPDATE */

const updatePassword = () => {

    if(currentPassword === "" || newPassword === "" || confirmPassword === ""){
      toast.error("Please fill all fields")
      return
    }
  
    if(newPassword !== confirmPassword){
      toast.error("Passwords do not match")
      return
    }
  
    toast.success("Password Updated Successfully")
  
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }
  
  const discardChanges = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }
  

  const renderContent = () => {

    switch(active){

      case "Account Information":

        return(

          <div className="account-info-container">

            <div className="form-group">
              <label>Name</label>
              <input
                value={tempProfile.name}
                disabled={!isEditing}
                onChange={(e)=>setTempProfile({
                  ...tempProfile,
                  name:e.target.value
                })}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                value={tempProfile.email}
                disabled={!isEditing}
                onChange={(e)=>setTempProfile({
                  ...tempProfile,
                  email:e.target.value
                })}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                value={tempProfile.phone}
                disabled={!isEditing}
                onChange={(e)=>setTempProfile({
                  ...tempProfile,
                  phone:e.target.value
                })}
              />
            </div>

            <div className="form-group">
              <label>Member Since</label>
              <input value={profile.memberSince} disabled/>
            </div>

            <div className="form-group">
              <label>Default Address</label>
              <textarea
                value={tempProfile.address}
                disabled={!isEditing}
                onChange={(e)=>setTempProfile({
                  ...tempProfile,
                  address:e.target.value
                })}
              />
            </div>

            {isEditing && (

              <button
                className="save-btn"
                onClick={saveProfile}
              >
                Save Changes
              </button>

            )}

          </div>

        )


      case "My Orders":
        return(
          <div className="orders-container">
            {apiOrders.length === 0 ? (
              <div className="orders-empty">
                <img
                  src="https://res.cloudinary.com/dy7ogboi4/image/upload/v1773567674/NoOrder_dnmlbi.png"
                  alt="no orders"
                  className="no-orders-img"
                />
                <h3>No Orders Yet</h3>
                <p>You haven't placed any order yet</p>
                <button 
                  className="btn btn-warning text-white mt-3"
                  onClick={() => navigate('/')}
                >
                  Order Now
                </button>
              </div>
            ) : (
              <div className="orders-list">
                <h4 className="section-title mb-4">
                  {userRole === 'SUPER_ADMIN' && 'Global System Orders'}
                  {userRole === 'ADMIN' && 'Restaurant Sales Log (Store #1)'}
                  {userRole === 'USER' && 'My Past Orders'}
                </h4>
                {apiOrders.map(order => (
                  <div key={order.id} className="order-history-card">
                    <div className="order-history-header">
                      <span className="order-id">#{order.id}</span>
                      <span className="order-date">
  {new Date(order.orderDate).toLocaleDateString()}
</span>
                    </div>
                    <div className="order-history-body">
                      <div className="order-items-scroll">
                        {order.items.map(item => (
                          <div key={item.id} className="order-item-mini">
                           <span className="item-name">
                            {item.foodName} x {item.quantity}
                          </span>

                          <span className="item-price">
                            ₹{(item.unitPrice * item.quantity).toFixed(2)}
                          </span>
                          </div>
                        ))}
                      </div>
                      <hr className="my-2" />
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="mb-0 small text-muted">Delivery Address:</p>
                          <p className="mb-0 small">{order.address}</p>
                        </div>
                        <div className="text-end">
                          <p className="mb-0 small text-muted">Total:</p>
                          <span className="fw-bold text-success">₹{order.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="order-history-footer">
                      <span className="order-status-badge">{order.status}</span>
                      <span className="payment-method-badge">{order.paymentMethod}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )


      case "Address Management":

        return(

          <div>

            <h4 className="section-title">Saved Addresses</h4>

            {addresses.map(addr =>(

              <div key={addr.id} className="address-card">

                {editingId === addr.id ? (

                <>
                  <input
                    value={addr.address}
                    onChange={(e)=>{
                      updateAddress(addr.id, e.target.value)
                    }}
                  />

                  <button
                    className="save-btn"
                    onClick={()=>setEditingId(null)}
                  >
                    Save
                  </button>
                </>

):(
                  <>
                    <p>{addr.address}</p>
                    <p>Phone: {addr.phone}</p>

                    <div className="address-actions">
                      <span onClick={()=>setEditingId(addr.id)}>Edit</span>
                      <span onClick={()=>deleteAddress(addr.id)}>Delete</span>
                    </div>
                  </>
                )}

              </div>

            ))}

            <div className="add-address-section">

              <input
                placeholder="New Address"
                value={newAddress}
                onChange={(e)=>setNewAddress(e.target.value)}
              />

              <input
                placeholder="Phone Number"
                value={newPhone}
                onChange={(e)=>setNewPhone(e.target.value)}
              />

              <button
                className="add-address-btn"
                onClick={onAddAddress}
              >
                ADD NEW ADDRESS
              </button>

            </div>

          </div>

        )


      case "Settings":

        return(

          <div>

            <h4>Notification Settings</h4>

            <div className="settings-row">
              <span>SMS Notifications</span>
              <input type="checkbox" defaultChecked/>
            </div>

            <div className="settings-row">
              <span>WhatsApp Notifications</span>
              <input type="checkbox" defaultChecked/>
            </div>

            <div className="settings-row">
              <span>Email Notifications</span>
              <input type="checkbox"/>
            </div>

            <p className="settings-note">
              Order notifications cannot be disabled
            </p>

          </div>

        )


        case "Password Manager":

            return(

            <div className="password-container">

            <div className="password-header">

            <div className="password-icon">
            🔒
            </div>

            <div>
            <h3>Change Password</h3>
            <p className="password-subtitle">
            Update password for enhanced account security.
            </p>
            </div>

            </div>


            <div className="password-body">

            <div className="password-fields">

            <div className="form-group">
            <label>Current Password</label>
            <input
            type="password"
            value={currentPassword}
            onChange={(e)=>setCurrentPassword(e.target.value)}
            />
            </div>

            <div className="form-group">
            <label>New Password</label>
            <input
            type="password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            />
            </div>

            <div className="form-group">
            <label>Confirm Password</label>
            <input
            type="password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            </div>

            </div>

            <div className="password-rules">

            <p>Password must contain:</p>

            <ul>
            <li>✔ At least 8 characters</li>
            <li>✔ At least 1 uppercase letter</li>
            <li>✔ At least 1 number</li>
            </ul>

            </div>

            </div>


            <div className="password-actions">

            <button
            className="discard-btn"
            onClick={discardChanges}
            >
            Discard
            </button>

            <button
            className="apply-btn"
            onClick={updatePassword}
            >
            Apply Changes
            </button>

            </div>

            </div>

            )

        case "Help Center":

        return(
        
        <div className="help-center">
        
        <h4>Help Center</h4>
        
        <p>Need help with your account or orders?</p>
        
        <div className="help-card">
        
        <p>Email: support@tastykitchens.com</p>
        <p>Phone: +91 98765 43210</p>
        
        </div>
        
        </div>
        
        )





      default:
        return null
    }

  }

  return(

    <>
      <Navbar/>

      <div className="profile-page container-fluid">

        <div className="profile-header">

          <div className="profile-info">

            <div className="avatar-container" onClick={() => document.getElementById('avatarInput').click()}>
              <img
                src={profile.avatar}
                alt="profile"
                className="profile-avatar"
              />
              <div className="upload-overlay">
                <MdCameraAlt className="camera-icon" />
              </div>
              <input
                type="file"
                id="avatarInput"
                className="d-none"
                accept="image/*"
                onChange={onUploadImage}
              />
            </div>

              <div>
                <div className="d-flex align-items-center mb-1">
                  <h3 className="profile-name mb-0 me-2">
                    {profile.name}
                  </h3>
                </div>

                <p className="profile-email">
                  {userEmail || profile.email}
                </p>
              </div>

          </div>

          <button
            className="edit-profile-btn"
            onClick={()=>{
              setActive("Account Information")
              setIsEditing(true)
            }}
          >
            Edit Profile
          </button>

        </div>

        <div className="profile-body">

          <div className="profile-sidebar">

            {menuItems.map(item =>(

              <div
                key={item}
                className={`sidebar-item ${
                  active === item ? "active" : ""
                }`}
                onClick={()=>{
                  if(item === "Logout"){
                    onClickLogout()
                  }else{
                    setActive(item)
                  }
                }}
              >
                {item}
              </div>

            ))}

          </div>

          <div className="profile-content">
            {renderContent()}
          </div>

        </div>

      </div>

      <Footer/>

    </>
  )
}

export default Profile