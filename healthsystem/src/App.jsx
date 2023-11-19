import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./tab/Home/Home";
import NavBar from "./tab/NavBar/NavBar";
import MySchedule from "./tab/MySchedule/MySchedule";
import AboutUs from "./tab/AboutUs/AboutUs";
import Contact from "./tab/Contact/Contact";
import Login from "./tab/Login/Login";
import Signup from "./tab/Signup/Signup";

function App() {
  // console.log("chnage");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/myschedule" element={<MySchedule />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
