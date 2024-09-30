import { useLoaderData, useParams } from 'react-router-dom'
import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getAuth } from 'firebase/auth';

const UpdateJob = () => {
    const{id}=useParams()
    //console.log(id)
    const {_id,task,priority,status,deadline,description,postedFor,myMail}=useLoaderData()
    const [selectedOption,setSelectionOption]=useState(null);
    const [userEmail, setUserEmail] = useState('');

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
        handleSubmit,reset,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => {
        //console.log(data)
        fetch(`https://todo-application-vrr8.onrender.com/update-task/${id}`,{
            method:"PATCH",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })
            .then(res=>res.json())
            .then((result)=>{
            //console.log(result)
            if(result.acknowledged===true){
                alert('Task Updated Successfully!!!')
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
                    <select {...register("status")} className='create-job-input'>
                    <option value={status}>{status}</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Complete">Complete</option>
                    </select>
                </div>
                
            </div>
            {/*3rd row*/}
            <div className='w-full'>
                <label className='block mb-2 mt-2 text-lg text-primary'>
                    Task Description
                </label>
                <textarea {...register("description")} className='w-full pl-3 py-1.5 focus:outline-none' rows={6} placeholder="Task Description" defaultValue={description}/>
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
            <input type="submit" className='mt-12 block bg-primary text-white font-semibold px-8 py-2 rounded-sm curser-pointer' />
            </form>
        </div>
    </div>
  )
}

export default UpdateJob
