import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import "./NurseSchedule.css";

const NurseSchedule = () => {
  const [nurseSchedules, setNurseSchedules] = useState([]);

  useEffect(() => {
    const fetchNurseSchedules = async () => {
      try {
        const response = await fetch("http://localhost:3600/search/nurse/schedule/:id", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch nurse schedules. Status: ${response.status}`);
        }

        const data = await response.json();
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
        const response = await fetch(`http://localhost:3600/delete-schedule/${scheduleId}`, {
          method: "DELETE",
          credentials: "include",
        });

        const data = await response.json();

        if (data) {
          alert("Schedule deleted successfully!");
          setNurseSchedules(nurseSchedules.filter((schedule) => schedule.id !== scheduleId));
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
      <div className="schedule-list">
        {nurseSchedules.map((schedule, index) => (
          <div className="schedule-item" key={index}>
            <div className="info-basic">
              <div>{`Nurse Name: ${schedule.nurseName}`}</div>
              <div>{`Nurse ID: ${schedule.nurseId}`}</div>
            </div>
            <div className="icons">
              <FaRegCalendarAlt className="icon-item" />
              <AiOutlineDelete
                size={17}
                className="icon-item"
                onClick={() => handleDelete(schedule.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NurseSchedule;
