import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCalendar, FiClock, FiMapPin, FiPlay, FiPause, FiRefreshCw } from "react-icons/fi";

const Card = ({ data }) => {
  const { _id, task, priority, status, deadline, description, postedFor } = data;

  const [isRunning, setIsRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState(data.timeSpent || 0); // Initialize with existing timeSpent from data
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setTimeSpent(prevTime => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalId);
      updateTimeInDatabase(); // Update time when paused
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalId);
    setTimeSpent(0);
    updateTimeInDatabase(); // Update time when reset
  };

  const updateTimeInDatabase = async () => {
    try {
      await axios.patch(`https://todo-application-vrr8.onrender.com/update-time/${_id}`, { timeSpent });
      console.log("Time updated successfully in the database");
    } catch (error) {
      console.error("Error updating time:", error);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className='card bg-white shadow-md p-4 rounded-lg mb-4 hover:shadow-lg transition-shadow duration-300 ease-in-out w-full max-w-xs sm:max-w-md mx-auto'>
      <div className='flex flex-col gap-4 sm:flex-row items-start'>
        <div className='w-full'>
          <h4 className='text-blue-600 font-semibold text-sm sm:text-base truncate'>{priority}</h4>
          <h3 className='text-lg sm:text-xl font-bold mb-2 text-gray-800 truncate'>{task}</h3>
          <div className='text-sm flex flex-wrap gap-2 mb-2 text-gray-600'>
            <span className='flex items-center gap-1 sm:gap-2 truncate'>
              <FiMapPin className='text-blue-500' />{status}
            </span>
            <span className='flex items-center gap-1 sm:gap-2 truncate'>
              <FiClock className='text-blue-500' />{deadline}
            </span>
            <span className='flex items-center gap-1 sm:gap-2 truncate'>
              <FiCalendar className='text-blue-500' />{postedFor}
            </span>
          </div>
          <div className='text-xs sm:text-sm text-gray-600 max-h-24'>
            {description}
          </div>

          {/* Timer Section */}
          <div className='timer mt-4'>
            <p className='text-sm font-medium text-gray-600'>Total Time Spent: <span className='font-bold text-gray-800'>{formatTime(timeSpent)}</span></p>
            <div className='flex gap-2 mt-2 flex-wrap'>
              <button onClick={startTimer} disabled={isRunning} className='start-btn flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 transition-all duration-300'>
                <FiPlay /> Start
              </button>
              <button onClick={pauseTimer} disabled={!isRunning} className='pause-btn flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-300 transition-all duration-300'>
                <FiPause /> Pause
              </button>
              <button onClick={resetTimer} className='reset-btn flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300'>
                <FiRefreshCw /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
