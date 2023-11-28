import { useEffect, useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LoginContext } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import "./onCancelNurseSchedule.css";

const onCancelSchedule = () => {
  const [cancelSchedules, setCancelSchedule] = useState([]);
  const { loggedIn, user } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      alert("You are not logged in!");
      navigate("/login");
    }

    const fetchCancelSchedules = async () => {
      try {
        const response = await fetch(
          "http://localhost:3600/nurse/cancelschedule",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 403) {
          throw new Error("You are not authorized to view this page.");
        }

        const data = await response.json();
        console.log("Cancel schedules:", data);
        setCancelSchedule(data);
      } catch (error) {
        console.error("Error fetching cancel schedules:", error.message);
      }
    };

    fetchCancelSchedules();
  },[loggedIn, navigate, user.nurseId]);
 
  const handleCancelSchedule = async (scheduleId) => {
    try {
      const response = await fetch(
        `http://localhost:3600/nurse/cancelschedule/${scheduleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nurseId }), // Send nurseId to replace in assignedTo table
          credentials: "include",
        }
      );

      if (response.status === 403) {
        throw new Error("You are not authorized to cancel this schedule.");
      }

      const data = await response.json();

      if (data) {
        alert("Schedule canceled successfully!");
        window.location.reload();
      } else {
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error canceling schedule:", error);
    }
  };

  return (
    <div className="nurse-schedule-container">
      <h2>Cancel Schedules</h2>
      <div className="schedule-list">
        {cancelSchedules.map((schedule, index) => (
          <div className="schedule-item" key={index}>
            <div className="info-basic">
              <div>Time: {schedule?.dateinfo}</div>
            </div>
            <div className="icons">
              <button
                className="cancel-button"
                onClick={() => handleCancelSchedule(schedule?.idassignedTo)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default onCancelSchedule;
