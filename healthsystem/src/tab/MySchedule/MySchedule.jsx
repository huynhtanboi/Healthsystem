import "./MySchedule.css";
import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const MyShedule = () => {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch("http://localhost:3600/myappointments", {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 403) {
        alert("Requesting an appointment is only available for patient!");
        window.location.assign("/login");
      }
      const data = await response.json();
      console.log(data);
      setInfo(data);
    };
    getInfo();
  }, []);

  const handleDelete = async (appointment) => {
    console.log(appointment);
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (userConfirmed) {
      const response = await fetch(`http://localhost:3600/myappointments`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        alert("Appointment deleted!");
        window.location.reload();
      } else {
        alert("Error deleting appointment!");
      }
    }
  };

  return (
    <div className="myschedule">
      <div className="myschedule-container">
        <h1 className="title">My Appointments</h1>
        {info.length === 0 && (
          <div className="empty">
            <p className="empty-text">You do not have any appointments</p>
          </div>
        )}
        <div className="appointment-container">
          {info.map((item, index) =>
            !item.time ? (
              <div key={index} className="item">
                <AiOutlineDelete
                  fontSize={18}
                  className="icon"
                  color="#f0f0f0"
                  onClick={() => handleDelete(item)}
                />
                <p>Date info: {item?.dateinfo}</p>
                <p>Vaccine info: {item?.vaccine_id}</p>
                <p>Dose: {item?.dose}</p>
              </div>
            ) : (
              <div key={index} className="item past">
                <AiOutlineDelete
                  fontSize={18}
                  className="icon"
                  color="#f0f0f0"
                />
                <p>Date info: {item?.dateinfo}</p>
                <p>Vaccine info: {item?.vaccine_id}</p>
                <p>Dose: {item?.dose}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MyShedule;
