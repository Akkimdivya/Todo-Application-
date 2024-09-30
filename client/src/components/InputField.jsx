import React from 'react'

const InputField = ({handleChange,value,title,name}) => {
  return (
    <label className='sidebar-label-container'>
        <input type="radio" name={name} id="test" value={value} onClick={handleChange}/>
        <span className='checkmark'></span>{title}
    </label>
  )
}

export default InputField