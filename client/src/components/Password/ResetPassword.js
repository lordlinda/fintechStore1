import React,{useState} from 'react'
import {toast} from 'react-toastify'
import Input from '../Input.js'
import Button from '../Button.js'

import {connect} from 'react-redux'
import * as actions from '../../redux/actions/index.js'
const ResetPassword=(props)=>{
    /*we setup state for our form with initial values which are emty strings in this case*/
	const [formData,setFormData]=useState({
	password:'',
  password2:''
})

const {password2,password}=formData

 //handle input matches the value passed with that written in the respective input space
 //e.g whatever is passed in the function with variable 'name' is matched to whatever the user
 //inputs for the part field
 const handleInput=text=>e=>{
 	setFormData({...formData,[text]:e.target.value})
 }

 const handleSubmit=async(e)=>{
  e.preventDefault()
 	if(password2 === password){
      const token =props.match.params.token
      await props.resetPassword(password,token)
 	}else{
    //if the user the passwords dont match,we send an error to the client
 		toast.error('Passwords dont match')
 	}
 	if(props.sucess === true){

    toast.success(props.message)
  }else{

    toast.error(props.message)
  }
 }
 return (
 	<div>
 	<form onSubmit={handleSubmit}>
             <Input 
        title='Password'
        type='password'
        name='password'
        value={password}
       handleChange={handleInput('password')}
        />
         <Input 
        title='Confirm Password'
        type='password'
        name='password2'
        value={password2}
       handleChange={handleInput('password2')}
        />
 	
         <Button
           title='submit'
           isButton='true'
           type='submit'
           moreStyle='font-bold bg-indigo-700 text-white px-1 py-1 md:text-xs uppercase lg:px-3 lg:py-2 lg:text-md'
        />
 	</form>
 	</div>

 	)
}
const mapStateToProps=(state)=>{
  return {
    message:state.auth.Msg,
    sucess:state.auth.sucess
  }
}

export default connect(mapStateToProps,actions)(ResetPassword)