import "./Signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    ssn: "",
    age: "",
    gender: "",
    race: "",
    occupation: "",
    phone: "",
    address: "",
    medicalHistory: "",
    username: "",
    password: "",
  });

  const handleClick = async () => {
    console.log("clicked");
    // e.preventDefault();
    const response = await fetch("http://localhost:3600/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);
    if (data) {
      window.location.assign("/login");
    } else {
      alert("Something went wrong! Try again or call the IT supports.");
      setFormData({
        firstname: "",
        lastname: "",
        middlename: "",
        ssn: "",
        age: "",
        gender: "",
        race: "",
        occupation: "",
        phone: "",
        address: "",
        medicalHistory: "",
        username: "",
        password: "",
      });
    }
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
              value={formData.firstname}
              required
            />
            <input
              className="last-name"
              placeholder="last name"
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <input
              className="middle-name"
              placeholder="middle name (optional)"
              type="text"
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
            />
          </div>
          <div className="info">
            <input
              className="ssn"
              placeholder="ssn"
              type="text"
              name="ssn"
              value={formData.ssn}
              onChange={handleChange}
              required
            />
            <input
              className="Age"
              placeholder="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <input
              className="gender"
              placeholder="gender"
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
          <div className="info">
            <input
              className="race"
              placeholder="race"
              type="text"
              name="race"
              value={formData.race}
              onChange={handleChange}
              required
            />
            <input
              className="occupation"
              placeholder="occupation (optional)"
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
            <input
              className="phone"
              placeholder="phone number (optional)"
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <input
            className="address"
            placeholder="address (optional)"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></input>
          <input
            className="medical-history"
            placeholder="medical-history (optional)"
            type="text"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
          ></input>

          <div className="account">
            <input
              placeholder="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              placeholder="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="button" value="Submit" onClick={handleClick}>
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
