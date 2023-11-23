import "./AddVaccine.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddVaccine = () => {
  const [vaccineData, setVaccineData] = useState({
    name: '',
    companyName: '',
    doseRequired: '',
    availableDose: '',
    description: '',
  });

  const handleClick = async () => {
    console.log("clicked");
    // e.preventDefault(); // Commented out because 'e' is not defined
    const response = await fetch("http://localhost:3600/admin/addvaccine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vaccineData),
    });

    const data = await response.json();
    console.log(data);
    if (data) {
      window.location.assign("/admin/addvaccine");
    } else {
      alert("Something went wrong! Try again or call the IT supports.");
      setVaccineData({
        name: '',
        companyName: '',
        doseRequired: '',
        availableDose: '',
        description: '',
      });
    }
  };

  const handleChange = (e) => {
    setVaccineData({ ...vaccineData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup">
      <div className="signup-content">
        <h1>Add Vaccine</h1>
        <form>
          <div className="name">
            <input
              className="vaccine-name"
              placeholder="Name"
              type="text"
              name="name"
              value={vaccineData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="info">
            <input
              className="company-name"
              placeholder="Company Name"
              type="text"
              name="companyName"
              value={vaccineData.companyName}
              onChange={handleChange}
              required
            />
            <input
              className="dose-required"
              placeholder="Dose Required"
              type="number"
              name="doseRequired"
              value={vaccineData.doseRequired}
              onChange={handleChange}
              required
            />
          </div>
          <div className="info">
            <input
              className="available-dose"
              placeholder="Available Dose"
              type="number"
              name="availableDose"
              value={vaccineData.availableDose}
              onChange={handleChange}
              required
            />
            <input
              className="description"
              placeholder="Description"
              type="text"
              name="description"
              value={vaccineData.description}
              onChange={handleChange}
              // required
            />
          </div>
          <button type="button" value="Submit" onClick={handleClick}>
            Add Vaccine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVaccine;
