import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { getAuth } from "firebase/auth";

const CreateJob = () => {
  const [selectedOption, setSelectionOption] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  
  // Retrieve the current user's email when the component mounts
  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the currently authenticated user
    // Check if there is a user logged in
    if (user) {
      // Get the user's email
      const email = user.email;
      // Set the user's email in state
      setUserEmail(email);
    }
  }, []);

  const [options] = useState(["Pending", "In Progress", "Complete"]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const inputRef = useRef(null);

  // Handle the drag start
  const handleDragStart = (e, option) => {
    e.dataTransfer.setData("text/plain", option);
  };

  // Handle the drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const draggedOption = e.dataTransfer.getData("text/plain");
    setSelectedStatus(draggedOption);
  };

  // Prevent the default drag-over behavior
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Attach the selected status to the form data
    data.status = selectedStatus;

    fetch("https://todo-application-vrr8.onrender.com/post-task/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged === true) {
          alert("Task added Successfully!!!");
          window.location.href =
            "https://todo-application-eight-pi.vercel.app/your-tasks";
        }
        reset();
      });
  };

  useEffect(() => {
    setValue("status", selectedStatus); // Set the status value in the form
  }, [selectedStatus, setValue]);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/*Form*/}
      <div className="bg-[#0b0e3ed8] py-10px-4 lg:px-16 py-6 px-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/*1st row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 mt-2 text-lg text-primary">
                Task
              </label>
              <input
                className="create-job-input"
                type="text"
                placeholder="Task"
                {...register("task")}
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 mt-2 text-lg text-primary">
                Priority
              </label>
              <select {...register("priority")} className="create-job-input">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          {/* 2nd row*/}

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <h1 {...register("myMail")}></h1>
              <label className="block mb-2 mt-2 text-lg text-primary">
                Deadline
              </label>
              <input
                className="create-job-input"
                type="date"
                placeholder="Ex: 2024-05-03"
                {...register("deadline")}
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 mt-2 text-lg text-primary">
                Status
              </label>
              <div>
                <div className="options-container">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, option)}
                      className="draggable-option"
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <input
                  ref={inputRef}
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="create-job-input"
                  placeholder="Drag and drop an option here"
                  {...register("status")}
                />
              </div>
            </div>
          </div>

          {/*3rd row */}
          <div className="w-full">
            <label className="block mb-2 mt-2 text-lg text-primary">
              Task Description
            </label>
            <textarea
              {...register("description")}
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={6}
              placeholder="Task Description"
            />
          </div>
          {/*last*/}
          <div>
            <label className="block mb-2 mt-2 text-lg text-primary">
              Task Allocated
            </label>
            <input
              type="email"
              required
              placeholder="to:/mail id"
              {...register("postedFor")}
              className="create-job-input"
            />
          </div>
          <input
            type="submit"
            className="mt-12 block bg-primary text-white font-semibold px-8 py-2 rounded-sm curser-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
