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
      console.log(data);
      if (data) {
        window.location.assign("/addnurse");
      } else {
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
        <form onSubmit={handleSubmit}>
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
              placeholder="MI"
              type="text"
              name="MI"
              onChange={handleChange}
              value={formData.MI}
              required
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
          <label>
            Employee ID:
            <input
              type="text"
              name="EmployeeID"
              onChange={handleChange}
              value={formData.EmployeeID}
              required
            />
          </label>
          <div className="name">
            <input
              className="FirstName"
              placeholder="First Name"
              type="text"
              name="FirstName"
              onChange={handleChange}
              value={formData.Fname}
              required
            />
            <input
              className="MiddleInitial"
              placeholder="MI"
              type="text"
              name="MiddleInitial"
              onChange={handleChange}
              value={formData.MI}
              required
            />
            <input
              className="LastName"
              placeholder="Last Name"
              type="text"
              name="LastName"
              onChange={handleChange}
              value={formData.Lname}
              required
            />
            </div>
          <label>
            Age:
            <input
              type="text"
              name="Age"
              onChange={handleChange}
              value={formData.Age}
              required
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              name="Gender"
              onChange={handleChange}
              value={formData.Gender}
              required
            />
          </label>
          <label>
            Phone #:
            <input
              type="text"
              name="Phone"
              onChange={handleChange}
              value={formData.Phone}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="Address"
              onChange={handleChange}
              value={formData.Address}
              
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="Username"
              onChange={handleChange}
              value={formData.Username}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="Password"
              onChange={handleChange}
              value={formData.Password}
              required
            />
          </label>
          <button type="submit">Add Nurse</button>
        </form>
      </div>
    </div>
  );
};

export default AddNurse;
