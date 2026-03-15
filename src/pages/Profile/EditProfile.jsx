import {useState} from "react"

const EditProfile = ({profile,onSave}) => {

const [formData,setFormData] = useState(profile)

const handleChange = (e) => {
const {name,value} = e.target

setFormData({
...formData,
[name]:value
})
}

const handleSave = () => {
onSave(formData)
}

return(

<div className="account-info-container">

<div className="form-group">

<label>Name</label>

<input
name="name"
value={formData.name}
onChange={handleChange}
/>

</div>


<div className="form-group">

<label>Email</label>

<input
name="email"
value={formData.email}
onChange={handleChange}
/>

</div>


<div className="form-group">

<label>Phone Number</label>

<input
name="phone"
value={formData.phone}
onChange={handleChange}
/>

</div>


<div className="form-group">

<label>Member Since</label>

<input
value={formData.memberSince}
disabled
/>

</div>


<div className="form-group">

<label>Default Address</label>

<textarea
name="address"
value={formData.address}
onChange={handleChange}
/>

</div>


<button
className="save-btn"
onClick={handleSave}
>
Save Changes
</button>

</div>

)
}

export default EditProfile