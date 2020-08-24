import React from 'react'

const Input=({title,value,handleChange,type})=>{
	//console.log(type)
	//this is the input component for all input elements
 return (
 	<div className='mt-2'>
 	{
 		type === 'radio' ?
 		<div>
 		<input type={type}  name="category" value={value}/>
        <label>{title}</label>
 	 </div>
 		:
 		<div>
 		<label className='text-lg'>{title}</label>
 	 <input 
 	 type={type}
 	 value={value}
 	 onChange={handleChange}
 	 className="bg-white focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-1 px-4 block appearance-none leading-normal my-3 sm:py-1 w-full"/>
 	 </div>
 	}
 	 
 	 </div>
 	)
}

export default Input