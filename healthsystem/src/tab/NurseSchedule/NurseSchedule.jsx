import { useEffect, useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LoginContext } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

import "./NurseSchedule.css";

const NurseSchedule = () => {
  const [nurseSchedules, setNurseSchedules] = useState([]);
  const { loggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNurseSchedules = async () => {
      try {
        const response = await fetch(
          "http://localhost:3600/nurse/search/schedule",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 403) {
          throw new Error("You are not authorized to view this page.");
        }

        const data = await response.json();
        console.log("Nurse schedules:", data);
        setNurseSchedules(data);
      } catch (error) {
        console.error("Error fetching nurse schedules:", error.message);
      }
    };

    fetchNurseSchedules();
  }, []);

  const handleDelete = async (scheduleId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (userConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3600/nurse/remove/schedule/${scheduleId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (response.status === 403) {
          throw new Error("You are not authorized to view this page.");
        }
        const data = await response.json();

        if (data) {
          alert(
            "Schedule deleted successfully! Your deleted schedule is onCancel status"
          );
          window.location.reload();
        } else {
          alert("Something went wrong! Please try again.");
        }
      } catch (error) {
        console.error("Error deleting schedule:", error);
      }
    }
  };

  return (
    <div className="nurse-schedule-container">
      <h2>Nurse Schedules</h2>
      {nurseSchedules.length === 0 && (
        <div className="no-schedule">No schedule found.</div>
      )}
      <div className="schedule-list">
        {nurseSchedules.map((schedule, index) => (
          <div className="schedule-item" key={index}>
            <div className="info-basic">
              <div>Time: {schedule?.dateinfo}</div>
            </div>
            <div className="icons">
              <AiOutlineDelete
                size={17}
                className="icon-item"
                onClick={() => handleDelete(schedule?.idassignedTo)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NurseSchedule;
