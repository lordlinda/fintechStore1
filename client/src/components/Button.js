import React from 'react'
import {Link} from 'react-router-dom'
const Button=({isButton,title,onClick,link,type,moreStyle})=>{
//we declare the style for the button from  here because className doesnt allow back ticks
//this is a reusable component
const style =`rounded-md text-base cursor-pointer animate focus:outline-none ${moreStyle}`

 return (
 	<div className='mt-2'>
        {/*it works fro both buttons and licks because the have almost similar styling
        and i dont have to keep repeating them everywhre in my code*/}
 	{ isButton ?
 		<button type={type} onClick={onClick} className={style}
 		>{title}</button>
 		:
 		<Link to={link} className='px-1 text-white hover:font-semibold md:px-2 md:text-lg'>{title}</Link>
 	}
 	 </div>
 	
 	)
}

export default Button