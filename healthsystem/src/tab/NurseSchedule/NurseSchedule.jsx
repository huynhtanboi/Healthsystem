import "./NurseSchedule.css";
// import { useState } from "react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseSchedule = ({ nurseId }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Fetch nurse schedule data based on nurseId
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:3600/nurse/schedule/${nurseId}`);
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching nurse schedule:', error);
      }
    };

    fetchSchedule();
  }, [nurseId]);

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      // Send a request to delete the schedule
      await axios.delete(`http://localhost:3600/nurse/schedule/${scheduleId}`);
      
      // Update the local schedule state after deletion
      setSchedule(schedule.filter(item => item.scheduleId !== scheduleId));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  return (
    <div>
      <h2>Nurse Schedule</h2>
      {schedule.map((item) => (
        <div key={item.scheduleId}>
          <p>{item.datetime}</p>
          <button onClick={() => handleDeleteSchedule(item.scheduleId)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default NurseSchedule;
