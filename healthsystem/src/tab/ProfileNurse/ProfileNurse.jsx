import "./ProfileNurse.css";
import { LoginContext } from "../../utils/utils";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProfileNurse = () => {
  const phoneSym = "Phone #";
  const { user } = useContext(LoginContext);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch(`http://localhost:3600/profile/nurse`, {
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
    const response = await fetch(`http://localhost:3600/profile/nurse`, {
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
    <div className="nurse">
      <div className="nurse-container">
        <div className="head">
          <img src="../../public/img/profile.png" alt="" />
          <div className="name">{user}</div>
          <div>ID: 1234422</div>
        </div>
        <div className="nurse-info">
          <form action="">
            <div className="each-info">
              <label>First name</label>
              <input
                className="disabled"
                type="text"
                value={info?.Fname}
                disabled
              />
            </div>
            <div className="each-info">
              <label>Last name</label>
              <input
                className="disabled"
                type="text"
                value={info?.Lname}
                disabled
              />
            </div>
            <div className="each-info">
              <label>Middle name</label>
              <input
                className="disabled"
                type="text"
                value={info?.MI}
                disabled
              />
            </div>
            <div className="each-info">
              <label>Age</label>
              <input
                className="disabled"
                type="text"
                value={info?.Age}
                disabled
              />
            </div>
            <div className="each-info">
              <label>Phone number</label>
              <input
                type="text"
                name="Phone #"
                value={info?.[phoneSym]}
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
                className="disabled"
                type="text"
                disabled
                value={info?.Username}
              />
            </div>
          </form>
          <button onClick={handleSubmit}>Save change</button>
        </div>
      </div>
    </div>
  );
};
export default ProfileNurse;
