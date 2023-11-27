import "./ProfilePatient.css";
import { LoginContext } from "../../utils/utils";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProfilePatient = () => {
  const { user } = useContext(LoginContext);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch(`http://localhost:3600/profile/patient`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setInfo(data);
    };
    checkLogin();
  }, [navigate]);

  const handleChange = (e) => {
    console.log(info);
    const { name, value } = e.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    console.log(info);
    const response = await fetch(`http://localhost:3600/profile/patient`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      alert("Successfully updated!");
    } else {
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="patient">
      <div className="patient-container">
        <div className="head">
          <img src="../../public/img/profile.png" alt="" />
          <div className="name">{user}</div>
        </div>
        <div className="patient-info">
          <form>
            <div className="each-info">
              <label>First name</label>
              <input
                type="text"
                value={info?.Fname}
                name="Fname"
                onChange={handleChange}
              />
            </div>
            <div className="each-info">
              <label>Last name</label>
              <input
                type="text"
                value={info?.Lname}
                name="Lname"
                onChange={handleChange}
              />
            </div>
            <div className="each-info">
              <label>Middle name</label>
              <input
                type="text"
                value={info?.MI}
                name="MI"
                onChange={handleChange}
              />
            </div>
            <div className="each-info">
              <label>Age</label>
              <input
                type="text"
                value={info?.Age}
                name="Age"
                onChange={handleChange}
              />
            </div>
            <div className="each-info">
              <label>Gender</label>
              <input
                type="text"
                value={info?.Gender}
                name="Gender"
                onChange={handleChange}
              />
            </div>
            <div className="each-info">
              <label>Race</label>
              <input
                type="text"
                value={info?.Race}
                name="Race"
                onChange={handleChange}
              />
            </div>
            <div className="each-info">
              <label>Occupation class</label>
              <input
                type="text"
                value={info?.["Occupation Class"]}
                name="Occupation Class"
                onChange={handleChange}
              />
            </div>
            <div className="each-info">
              <label>Phone number</label>
              <input
                type="text"
                name="Phone #"
                value={info?.["Phone #"]}
                onChange={handleChange}
              />
            </div>
            <div className="each-info">
              <label>Address</label>
              <input
                type="text"
                name="Address"
                value={info?.Address}
                onChange={handleChange}
              />
            </div>

            <div className="each-info">
              <label>Username</label>
              <input
                type="text"
                name="Username"
                disabled
                value={info?.Username}
                onChange={handleChange}
              />
            </div>
            <div className="each-info full-width">
              <label>Medical history description</label>
              <input
                type="text"
                name="Medical History Description"
                value={info?.["Medical History Description"]}
                className="medical-history"
                onChange={handleChange}
              />
            </div>
          </form>
          <button onClick={handleSubmit}>Save change</button>
        </div>
      </div>
    </div>
  );
};
export default ProfilePatient;
