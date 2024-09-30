import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import CreatableSelect from "react-select/creatable"
import { getAuth } from 'firebase/auth';

const CreateJob = () => {
    const [selectedOption,setSelectionOption]=useState(null);
    const [userEmail, setUserEmail] = useState('');
    console.log(getAuth)
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
            console.log(email)
        }
    }, []);

    const {
        register,
        handleSubmit,reset,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => {
        //console.log(data)
        fetch("http://localhost:5000/post-task/",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })
            .then(res=>res.json())
            .then((result)=>{
            //console.log(result)
            if(result.acknowledged===true){
                alert('Task added Successfully!!!')
                window.location.href='http://localhost:5173/your-tasks';
            }
            reset()
        })
    }

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        {/*Form*/}
        <div className='bg-[#FAFAFA] py-10px-4 lg:px-16 py-6 px-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            {/*1st row*/}
            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 mt-2 text-lg text-primary'>
                        Task
                    </label>
                    <input className='create-job-input' type="text" placeholder="Task" 
                    {...register("task")} />
                </div>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 mt-2 text-lg text-primary'>
                        Priority
                    </label>
                    <select {...register("priority")} className='create-job-input'>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>
            {/* 2th row*/}

            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
                <h1 {...register("myMail")}></h1>
                    <label className='block mb-2 mt-2 text-lg text-primary'>
                        Deadline
                    </label>
                    <input className='create-job-input' type="date" placeholder="Ex: 2024-05-03" 
                    {...register("deadline")} />
                </div>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 mt-2 text-lg text-primary'>
                        Status
                    </label>
                    <select {...register("status")} className='create-job-input'>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Complete">Complete</option>
                    </select>
                </div>
                
            </div>

            {/*3th row */}
            <div className='w-full'>
                <label className='block mb-2 mt-2 text-lg text-primary'>
                    Task Description
                </label>
                <textarea {...register("description")} className='w-full pl-3 py-1.5 focus:outline-none' rows={6} placeholder="Task Description"/>
            </div>
            {/*last*/}
            <div>
                <label className='block mb-2 mt-2 text-lg text-primary'>
                    Task Allocated
                </label>
                <input
                type='email'
                required
                placeholder='to:/mail id'
                {...register("postedFor")}
                className='create-job-input'
                />
            </div>
            <input type="submit" className='mt-12 block bg-primary text-white font-semibold px-8 py-2 rounded-sm curser-pointer' />
            </form>
        </div>
    </div>
  )
}

export default CreateJob
