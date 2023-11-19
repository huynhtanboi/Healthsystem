import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./tab/Home/Home";
import NavBar from "./tab/NavBar/NavBar";
import MySchedule from "./tab/MySchedule/MySchedule";
import AboutUs from "./tab/AboutUs/AboutUs";
import Contact from "./tab/Contact/Contact";
import Login from "./tab/Login/Login";
import Signup from "./tab/Signup/Signup";
import AddNurse from "./tab/Admin/AddNurse/AddNurse";
import { useEffect, useState } from "react";

function App() {
  // const [login, setLogin] = useState(false);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const response = await fetch("http://localhost:3600");
  //     const data = await response.json();
  //     setLogin(data.login);
  //   };
  //   checkLogin();
  // }, [login]);

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
          <Route path="/admin/addnurse" element={<AddNurse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
