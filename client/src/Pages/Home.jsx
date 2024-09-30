import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Graph from "./Graph/Graph";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  // Fetching jobs from the API
  useEffect(() => {
    setIsLoading(true);
    fetch("https://todo-application-vrr8.onrender.com/all-tasks/")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  // Filtering jobs based on status and priority
  const filteredJobs = jobs.filter((job) => {
    const matchesStatus =
      selectedStatus === "" || job.status === selectedStatus;
    const matchesPriority =
      selectedPriority === "" || job.priority === selectedPriority;
    return matchesStatus && matchesPriority;
  });

  return (
    <div className="text-primary ">
      <h1 className="text-5xl font-bold mb-3 mt-3 text-center">
        Seamless <span className="text-black">TODO</span> management!
      </h1>
      <p className="text-lg text-black/70 mb-8 mt-3 text-center">
        Stay focused and productive with intuitive todo tracking,
        prioritization, and reminders that keep you on track. Complete your
        todos effortlessly and take control of your day
      </p>
      <Graph/> 
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Filters */}
          <div className="filters font-bold">
            <label>
              Status:
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-black"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
                {/* Add other statuses as needed */}
              </select>
            </label>
            <label>
              Priority:
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="text-black"
              >
                <option value="">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                {/* Add other priorities as needed */}
              </select>
            </label>
          </div>
          <div className="mainCard">
            {/* Render filtered jobs */}
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <Card key={job._id} data={job} />)
            ) : (
              <p>No jobs match the selected filters.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
