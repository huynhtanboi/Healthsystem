import { Outlet, Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
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
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;
