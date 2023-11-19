import "./MySchedule.css";
import { useState, useEffect } from "react";
const MyShedule = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  useEffect(() => {
    // Fetch available time slots from the backend
    fetch("http://localhost:3001/timeslots")
      .then((response) => response.json())
      .then((data) => setTimeSlots(data));
  }, []);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };
  const handleVaccineSelection = (vaccine) => {
    setSelectedVaccine(vaccine);

    // Send the selected slot and vaccine to the backend
    fetch("http://localhost:3600/record", {
      //placehold wait for record and fix later
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slot: selectedSlot, vaccine: vaccine }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data)); // Handle the response from the backend
  };

  return (
    <div className="schedule">
      <div className="schedule-board">
        <h2>MyShedule</h2>
        {timeSlots.map((slot) => (
          <div
            key={slot.id}
            className={`time-slot ${
              selectedSlot === slot.id ? "selected" : ""
            }`}
            onClick={() => handleSlotSelection(slot.id)}
          >
            {slot.time}
          </div>
        ))}
      </div>

      <div className="vaccine-board">
        <h2>Choose Your Vaccine</h2>
        <button
          className={`vaccine-btn ${
            selectedVaccine === "Vaccine A" ? "selected" : ""
          }`}
          onClick={() => handleVaccineSelection("Vaccine A")}
        >
          Vaccine A
        </button>
        <button
          className={`vaccine-btn ${
            selectedVaccine === "Vaccine B" ? "selected" : ""
          }`}
          onClick={() => handleVaccineSelection("Vaccine B")}
        >
          Vaccine B
        </button>
        <button
          className={`vaccine-btn ${
            selectedVaccine === "Vaccine C" ? "selected" : ""
          }`}
          onClick={() => handleVaccineSelection("Vaccine C")}
        >
          Vaccine C
        </button>
      </div>
    </div>
  );
};

export default MyShedule;
