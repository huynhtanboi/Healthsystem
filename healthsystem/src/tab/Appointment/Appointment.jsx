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
  const [vaccineList, setVaccineList] = useState([]);
  const [vaccineInfo, setVaccineInfo] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState();
  const [isVaccinated, setIsVaccinated] = useState(false);
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
        const temp = { ...timeId };
        data.forEach((key) => {
          temp[key] = true;
        });
        setTimeSlots(temp);
      } else {
        setTimeSlots(timeId);
      }
    };
    checkTime();
  }, [value, formatedDate]);

  useEffect(() => {
    // check the patient to see if they have had vaccine before so we know they have to use the same vaccine
    let isVaccinatedTemp = false;
    let selectedVaccineTemp = null;
    const checkPatient = async () => {
      const response = await fetch("http://localhost:3600/profile/patient", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log("check patient status: ", data);
      if (data.vaccine_id) {
        isVaccinatedTemp = true;
        selectedVaccineTemp = data.vaccine_id;
        setIsVaccinated(true);
      }
    };
    // get vaccine list
    const getVaccineList = async () => {
      const response = await fetch("http://localhost:3600/vaccine", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setVaccineInfo(data);
      if (!isVaccinatedTemp) {
        setSelectedVaccine(data[0]);
        setVaccineList(data);
      } else {
        const usedVaccine = data.find(
          (vaccine) => vaccine.idVaccine === selectedVaccineTemp
        );
        setSelectedVaccine(usedVaccine);
        setVaccineList([usedVaccine]);
      }
    };

    // Run the first function and then call the second one inside the 'then' block
    checkPatient().then(() => {
      getVaccineList();
    });
  }, []);

  const handleRequest = async () => {
    const bodyContent = { time: formatedDate + " " + time };
    bodyContent["vaccine_id"] = selectedVaccine?.idVaccine;
    console.log(bodyContent);
    const response = await fetch("http://localhost:3600/appointment", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyContent),
    });
    console.log(response);
    if (response.status === 403) {
      alert("Requesting an appointment is only available for patient!");
      window.location.assign("/login");
    }
    const data = await response.json();
    console.log("request: ", data);
    if (data) {
      alert("Successfully requested an appointment!");
      window.location.assign("/");
    } else {
      alert(
        "Time slot is full or not available right now! Please choose another time slot"
      );
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
            <select
              id="example"
              name="example"
              value={selectedVaccine?.name}
              onChange={(e) => {
                const selectedVaccineTemp = vaccineInfo.find(
                  (vaccine) => vaccine.name === e.target.value
                );
                console.log(selectedVaccineTemp);
                setSelectedVaccine(selectedVaccineTemp);
              }}
            >
              {vaccineList.map((vaccine, index) => (
                <option key={index} value={vaccine?.name}>
                  {vaccine?.name}
                </option>
              ))}
            </select>
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
