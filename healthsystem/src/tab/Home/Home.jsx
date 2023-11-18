import { useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  useEffect(() => {
    console.log("Home");
    const checkLogin = async () => {
      const response = await fetch("http://localhost:3600");
      const data = await response.json();
      console.log(data);
    };
    checkLogin();
  }, []);
  return (
    <div>
      <div className="home">
        <div className="board-container">
          <div className="board-text">
            <h1>WELCOME TO UI HEALTH</h1>
            <div className="board-title">Expert in imaging and diagnostics</div>
            <div className="board-content">
              Minimally invasive procedures for chronic conditions, and stroke
              care without the hospital stay.
            </div>
            <Link className="link" to="/about">
              Make an appointment
            </Link>
          </div>
          <div className="board"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
