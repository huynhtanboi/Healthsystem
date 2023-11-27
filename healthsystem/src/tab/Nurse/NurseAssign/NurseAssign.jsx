import "./NurseAssign.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { timeIdTrueDefault } from "../../../utils/utils";

const NurseAssign = () => {
  const [value, onChange] = useState(new Date());
  const [formatedDate, setFormatedDate] = useState("");
  const [time, setTime] = useState("");
  const [timeSlots, setTimeSlots] = useState(timeIdTrueDefault);

  const formatDateFunc = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formatedDate = `${year}-${month}-${day}`;
    return formatedDate;
  };

  useEffect(() => {
    // format date to match with Date in database
    const date = formatDateFunc(value);
    setFormatedDate(date);

    // check to see if there is available time slot for the date
    const checkTime = async () => {
      const response = await fetch(
        `http://localhost:3600/nurse/assign/${date}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 403) {
        alert("Requesting an nurseassign is only available for nurse!");
        window.location.assign("/login");
      }
      const data = await response.json();
      console.log(data);
      if (data.length > 0) {
        const temp = { ...timeIdTrueDefault };
        data.forEach((key) => {
          temp[key] = false;
        });
        setTimeSlots(temp);
      } else {
        setTimeSlots(timeIdTrueDefault);
      }
    };
    checkTime();
  }, [value, formatedDate]);

  const handleRequest = async () => {
    if (!time) {
      alert("Please choose a time slot!");
      return;
    }
    const bodyContent = { time: formatedDate + " " + time };
    console.log(bodyContent);
    const response = await fetch("http://localhost:3600/nurse/assign", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyContent),
    });
    console.log(response);
    if (response.status === 403) {
      alert("Requesting an nurseassign is only available for nurse!");
      window.location.assign("/login");
    }
    const data = await response.json();
    console.log("request: ", data);
    if (data) {
      alert("Successfully picked a time slot!");
      window.location.reload();
    } else {
      alert(
        "Time slot is full or not available right now! Please choose another time slot"
      );
    }
    console.log(data);
  };

  return (
    <div className="nurseassign">
      <div className="nurseassign-content">
        <h1 className="title">Choose a time slot</h1>
        <div className="nurseassign-time">
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

export default NurseAssign;
