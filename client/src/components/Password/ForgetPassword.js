import React,{useState} from 'react'
import {toast} from 'react-toastify'
import Input from '../Input.js'
import Button from '../Button.js'
import {connect} from 'react-redux'

import * as actions from '../../redux/actions/index.js'
const ForgetPassword=(props)=>{

	const [formData,setFormData]=useState({
    email:''
  })
	
  const {email}=formData

//handle input matchhes the value passed with that written in the respective input space
 //e.g whatever is passed in the function with variable 'name' is matched to whatever the user
 //inputs for the part field
 const handleInput=text=>e=>{
 	setFormData({...formData,email:e.target.value})
 }

 //handleSubmit handles submission to the backend
 const handleSubmit=async(e)=>{
  //this function prevents the  automatic submission of the form tag for submission to be 
  //flawless
  e.preventDefault()
 	if(email){
      console.log(email)
      await props.forgetPassword(email)
 	}else{
 		toast.error('Please fill in your email')
 	}
 	if(props.sucess === true){
    toast.success(props.message)
  }else{
    toast.error(props.message)
  }
 }
 //console.log(props)
 return (
 	<div className='mt-24 max-w-md px-4'>
 	<p className='text-gray-600 text-2xl'>Please input your email</p>
 	<form onSubmit={handleSubmit}>
 	 <Input 
        title='Email'
        type='email'
        name='email'
        value={email}
        handleChange={handleInput('email')}
        />
         <Button
           title='submit'
           isButton='true'
           type='submit'
           moreStyle='font-bold bg-indigo-700 text-lg text-white px-3 py-2 md:text-xs uppercase lg:px-3 lg:py-2 lg:text-md'
        />
 	</form>
 	</div>

 	)
}
const mapStateToProps=(state)=>{
  return{
      message:state.auth.Msg,
      sucess:state.auth.sucess
  }
}

export default connect(mapStateToProps,actions)(ForgetPassword)