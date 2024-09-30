import React from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


const handleApply=async()=>{
  const { value: url } = await Swal.fire({
    input: "url",
    inputLabel: "URL address",
    inputPlaceholder: "Enter the URL"
  });
  if (url) {
    Swal.fire(`Entered URL: ${url}`);
  }
}

const JobDetails = () => {
    const {id}=useParams();
  return (
    <div>
      <button onClick={handleApply}>Apply Now</button>
    </div>
  )
}

export default JobDetails