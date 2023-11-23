import "./AddNurse.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const AddNurse = () => {
  const [formData, setFormData] = useState({
    Fname: '',
    MI: '',
    Lname: '',
    EmployeeID: '',
    Age: '',
    Gender: '',
    Phone: '',
    Address: '',
    Username: '',
    Password: '',
  });

  const handleSubmit = async () => {
    console.log("clicked");
  
      const response = await fetch('http://localhost:3600/addnurse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });


      const data = await response.json();

      if (data) {
        window.location.assign("/admin/addnurse");
      console.log(data);
      } 
      else {
        alert("Something went wrong! Try again or call the IT supports.");
        setFormData({
          Fname: '',
          MI: '',
          Lname: '',
          EmployeeID: '',
          Age: '',
          Gender: '',
          Phone: '',
          Address: '',
          Username: '',
          Password: '',
        });
      }
    };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="add-nurse">
      <div className="add-nurse-content">
        <h1>Add Nurse</h1>
        <form>
          <div className="name">
            <input
              className="first-name"
              placeholder="First Name"
              type="text"
              name="Fname"
              onChange={handleChange}
              value={formData.Fname}
              required
            />
            <input
              className="middle-initial"
              placeholder="Middle Initial"
              type="text"
              name="MI"
              onChange={handleChange}
              value={formData.MI}
              // required
            />
            <input
              className="last-name"
              placeholder="Last Name"
              type="text"
              name="Lname"
              onChange={handleChange}
              value={formData.Lname}
              required
            />
          </div>
            <input
            placeholder="Employee ID"
              type="text"
              name="EmployeeID"
              onChange={handleChange}
              value={formData.EmployeeID}
              required
            />
            
            <input
              placeholder="Age"
              type="text"
              name="Age"
              onChange={handleChange}
              value={formData.Age}
              required
            />
          <label>
            
            <input
              placeholder="Gender"
              type="text"
              name="Gender"
              onChange={handleChange}
              value={formData.Gender}
              required
            />
          </label>
          <label>
            <input
              placeholder="Phone #"
              type="text"
              name="Phone"
              onChange={handleChange}
              value={formData.Phone}
            />
          </label>
          <label>
            
            <input
              placeholder="Address"
              type="text"
              name="Address"
              onChange={handleChange}
              value={formData.Address}
              
            />
          </label>
          <label>
            
            <input
            placeholder="Username"
              type="text"
              name="Username"
              onChange={handleChange}
              value={formData.Username}
              required
            />
          </label>
          <label>
            
            <input
            placeholder="Password"
              type="password"
              name="Password"
              onChange={handleChange}
              value={formData.Password}
              required
            />
          </label>
          <button onClick={handleSubmit}>Add Nurse</button>
        </form>
      </div>
    </div>
  );
};

export default AddNurse;
