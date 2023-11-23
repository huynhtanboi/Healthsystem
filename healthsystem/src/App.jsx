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
import Appointment from "./tab/Appointment/Appointment";
import ProfilePatient from "./tab/ProfilePatient/ProfilePatient";
import ProfileNurse from "./tab/ProfileNurse/ProfileNurse";

function App() {
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
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/profile/patient" element={<ProfilePatient />} />
          <Route path="/profile/nurse" element={<ProfileNurse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
