import "./Appointment.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { timeId } from "../../utils/utils";

const Appointment = () => {
  const [value, onChange] = useState(new Date());
  const [formatedDate, setFormatedDate] = useState("");
  const [time, setTime] = useState("");
  const [timeSlots, setTimeSlots] = useState(timeId);

  useEffect(() => {
    // format date to match with Date in database
    const year = value.getFullYear();
    const month = (value.getMonth() + 1).toString().padStart(2, "0");
    const day = value.getDate().toString().padStart(2, "0");
    const date = `${year}-${month}-${day}`;
    setFormatedDate(date);

    // check to see if there is available time slot for the date
    const checkTime = async () => {
      const response = await fetch(
        `http://localhost:3600/appointment/${date}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.length > 0) {
        const temp = { ...timeSlots };
        data.forEach((key) => {
          temp[key] = false;
        });
        setTimeSlots(temp);
      }
    };
    checkTime();
  }, [value, formatedDate]);

  const handleRequest = async () => {
    const bodyContent = { time: formatedDate + " " + time };
    console.log(bodyContent);
    const response = await fetch("http://localhost:3600/appointment", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyContent),
    });
    const data = await response.json();
    if (data) {
      alert("Successfully requested an appointment!");
      window.location.assign("/");
    } else {
      alert("Failed to request an appointment!");
    }
    console.log(data);
  };

  return (
    <div className="appointment">
      <div className="appointment-content">
        <h1 className="title">APPOINTMENT</h1>
        <div className="appointment-time">
          <Calendar
            onChange={onChange}
            value={value}
            calendarType="hebrew"
            minDate={new Date()}
          />
          <div className="time-schedule">
            <div className="time-title">Choose time</div>
            <div className="time-list">
              {Object.keys(timeSlots).map((timeslot, index) =>
                timeSlots[timeslot] ? (
                  <button
                    className="time-item"
                    key={index}
                    onClick={() => setTime(timeslot)}
                  >
                    {timeslot}
                  </button>
                ) : (
                  <button
                    className="time-item disabled"
                    key={index}
                    onClick={() => setTime(timeslot)}
                    disabled
                  >
                    {timeslot}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        <button className="request-btn" onClick={handleRequest}>
          REQUEST
        </button>
      </div>
    </div>
  );
};

export default Appointment;
