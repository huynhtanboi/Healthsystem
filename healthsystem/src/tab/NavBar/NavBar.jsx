import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginContext } from "../../utils/utils";
import "./NavBar.css";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  // check logged in
  const navigate = useNavigate();
  useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch("http://localhost:3600", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (data.loggedIn) {
        setLoggedIn(true);
        setUser(data.user);
        navigate("/");
      }
    };
    checkLogin();
  }, [loggedIn, user, navigate]);

  const hamMenu = () => {
    let x = document.getElementById("topnav");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };

  const handleLogout = async () => {
    console.log("clicked");
    const response = await fetch("http://localhost:3600/logout", {
      method: "GET",
      credentials: "include",
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (!data.loggedIn) {
      setLoggedIn(false);
      setUser("");
      navigate("/");
    } else {
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div>
      <div className="nav-bar">
        <div className="right">
          <Link to="/">
            <img
              className="logo"
              src="../../../public/UIH_logo.png"
              alt="UIH logo"
            />
          </Link>
          <Link>Request an appointment</Link>
        </div>

        <div className="menu">
          <Link className="link" to="/myschedule">
            My Schedule
          </Link>
          <Link className="link" to="/about">
            About Us
          </Link>
          <Link className="link" to="/contact">
            Contact
          </Link>
          {!loggedIn && (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          {loggedIn && (
            <div className="ham-menu">
              <Link className="loggedIn" onClick={hamMenu}>
                {user}
              </Link>
              <div id="topnav">
                <div className="topnav-container">
                  <Link className="drop-link" to="myschedule">
                    My schedule
                  </Link>
                  <Link className="drop-link" to="/profile">
                    Profile
                  </Link>
                  <Link className="drop-link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <LoginContext.Provider value={{ loggedIn, setLoggedIn, user }}>
        <Outlet />
      </LoginContext.Provider>
    </div>
  );
};

export default NavBar;
