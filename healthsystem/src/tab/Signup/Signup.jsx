import "./Signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    middlename: '',
    ssn: '',
    age: '',
    gender: '',
    race: '',
    occupation: '',
    phone: '',
    address: '',
    medicalHistory: '',
    username: '',
    password: '',
  });

  const handleClick = async () => {
    console.log("clicked");
    // e.preventDefault();
    const response = await fetch('http://localhost:3600/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

   

    if (response.ok) {
      console.log('Data sent successfully');
    }
    const data = await response.json()
    console.log(data);


    //   // Save data to CSV file
    //   const csvData = Object.values(formData).join(',');
    //   const blob = new Blob([csvData], { type: 'text/csv' });
    //   const link = document.createElement('a');
    //   link.href = URL.createObjectURL(blob);
    //   link.download = 'patient.csv';
    //   link.click();
    // } else {
    //   console.error('Error sending data');
    // }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup">
      <div className="signup-content">
        <h1>Sign up</h1>
        <form>
          <div className="name">
            <input
              className="first-name"
              placeholder="first name"
              type="text"
              name="firstname"
              onChange={handleChange}
              required
            />
            <input
              className="last-name"
              placeholder="last name"
              type="text"
              name="lastname"
              onChange={handleChange}
              required
            />
            <input
              className="middle-name"
              placeholder="middle name (optional)"
              type="text"
              name="middlename"
              onChange={handleChange}
            />
          </div>
          <div className="info">
            <input
              className="ssn"
              placeholder="ssn"
              type="text"
              name="ssn"
              onChange={handleChange}
              required
              
            />
            <input
              className="Age"
              placeholder="age"
              type="number"
              name="age"
              onChange={handleChange}
              required
            />
            <input
              className="gender"
              placeholder="gender"
              type="text"
              name="gender"
              onChange={handleChange}
            />
          </div>
          <div className="info">
            <input
              className="race"
              placeholder="race"
              type="text"
              name="race"
              onChange={handleChange}
              required
            />
            <input
              className="occupation"
              placeholder="occupation (optional)"
              type="text"
              name="occupation"
              onChange={handleChange}
            />
            <input
              className="phone"
              placeholder="phone number (optional)"
              type="number"
              name="phone"
              onChange={handleChange}
            />
          </div>
          <input
            className="address"
            placeholder="address (optional)"
            type="text"
            onChange={handleChange}
          ></input>
          <input
            className="medical-history"
            placeholder="medical-history (optional)"
            type="text"
            onChange={handleChange}
          ></input>

          <div className="account">
            <input placeholder="username" type="text" name="username" onChange={handleChange}/>
            <input placeholder="password" type="password" name="password" onChange={handleChange}/>
            
          </div>

          <button type="submit" value="Submit" onClick={handleClick}>
            Submit
          </button>
        </form>
        <div className="sign-up">
          <div>Already have an account?</div>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
