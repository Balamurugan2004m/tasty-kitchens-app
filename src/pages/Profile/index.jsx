import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import './index.css'

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

  const [active,setActive] = useState("Account Information")

  /* PROFILE */

  const [profile,setProfile] = useState({
    name:"Dhevadharshini",
    email:"dheva@email.com",
    phone:"",
    memberSince:"2026",
    address:""
  })

  const [tempProfile,setTempProfile] = useState({...profile})
  const [isEditing,setIsEditing] = useState(false)

  /* ADDRESS */

  const [addresses,setAddresses] = useState([
    {
      id:1,
      address:"Chennai",
      phone:"9876543210"
    }
  ])

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

  const saveProfile = () => {
    setProfile(tempProfile)
    setIsEditing(false)
  }

  /* ADDRESS FUNCTIONS */

  const addAddress = () => {

    if(newAddress === "") return

    const newItem = {
      id:Date.now(),
      address:newAddress,
      phone:newPhone
    }

    setAddresses([...addresses,newItem])
    setNewAddress("")
    setNewPhone("")
  }

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id))
  }

  const saveAddress = (id,address) => {

    const updated = addresses.map(a =>
      a.id === id ? {...a,address} : a
    )

    setAddresses(updated)
    setEditingId(null)
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

          <div className="orders-empty">

            <img
              src="https://res.cloudinary.com/dy7ogboi4/image/upload/v1773567674/NoOrder_dnmlbi.png"
              alt="no orders"
              className="no-orders-img"
            />

            <h3>No Orders Yet</h3>

            <p>You haven't placed any order yet</p>

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
                      const updated = addresses.map(a =>
                        a.id === addr.id ? {...a, address:e.target.value} : a
                      )
                      setAddresses(updated)
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
                onClick={addAddress}
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

            <img
              src="https://res.cloudinary.com/dmmfmktet/image/upload/v1773055421/3d30e43f-d664-464d-ac18-f113dfd80da5_zaqrzs.png"
              alt="profile"
              className="profile-avatar"
            />

            <div>
              <h3 className="profile-name">
                {profile.name}
              </h3>

              <p className="profile-email">
                {profile.email}
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