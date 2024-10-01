import { useLoaderData, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { getAuth } from 'firebase/auth';

const UpdateJob = () => {
    const { id } = useParams();
    const { _id, task, priority, status, deadline, description, postedFor } = useLoaderData();
    const [userEmail, setUserEmail] = useState('');
    const [options] = useState(["Pending", "In Progress", "Complete"]);
    const [selectedStatus, setSelectedStatus] = useState(status);
    const inputRef = useRef(null);

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

        fetch(`https://todo-application-vrr8.onrender.com/update-task/${id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((result) => {
                if (result.acknowledged === true) {
                    alert('Task Updated Successfully!!!');
                    window.location.href = 'https://todo-application-eight-pi.vercel.app/your-tasks';
                }
                reset();
            });
    };

    useEffect(() => {
        setValue("status", selectedStatus); // Set the status value in the form
    }, [selectedStatus, setValue]);

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

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            {/*Form*/}
            <div className='bg-[#0b0e3ed8] py-10px-4 lg:px-16 py-6 px-5'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    {/*1st row*/}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 mt-2 text-lg text-primary'>
                                Task
                            </label>
                            <input className='create-job-input' defaultValue={task} type="text" placeholder="Task"
                                {...register("task")} />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 mt-2 text-lg text-primary'>
                                Priority
                            </label>
                            <select {...register("priority")} className='create-job-input'>
                                <option value={priority}>{priority}</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    {/*2nd row*/}
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 mt-2 text-lg text-primary'>
                                Deadline
                            </label>
                            <input className='create-job-input' type="date" placeholder="Ex: 2024-05-03" defaultValue={deadline}
                                {...register("deadline")} />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 mt-2 text-lg text-primary'>
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
                    {/*3rd row*/}
                    <div className='w-full'>
                        <label className='block mb-2 mt-2 text-lg text-primary'>
                            Task Description
                        </label>
                        <textarea {...register("description")} className='w-full pl-3 py-1.5 focus:outline-none' rows={6} placeholder="Task Description" defaultValue={description} />
                    </div>
                    {/*last*/}
                    <div>
                        <label className='block mb-2 mt-2 text-lg text-primary'>
                            Task Allocated
                        </label>
                        <input
                            type='email'
                            placeholder='to:/mail id'
                            {...register("postedFor")}
                            className='create-job-input'
                            defaultValue={postedFor}
                        />
                    </div>
                    <input type="submit" className='mt-12 block bg-primary text-white font-semibold px-8 py-2 rounded-sm cursor-pointer' />
                </form>
            </div>
        </div>
    );
}

export default UpdateJob;
