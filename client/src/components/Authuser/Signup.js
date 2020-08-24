import React,{useState} from 'react'
import {toast} from 'react-toastify'
import Input from '../Input.js'
import Button from '../Button.js'
import {connect} from 'react-redux'

import * as actions from '../../redux/actions/index.js'
const Signup=(props)=>{
const [formData,setFormData]=useState({
	name:'',
	email:'',
	password:''
})
const {name,email,password}=formData
//handle input matches the value passed with that written in the respective input space
 //e.g whatever is passed in the function with variable 'name' is matched to whatever the user
 //inputs for the part field
 const handleInput=text=>e=>{
 	setFormData({...formData,[text]:e.target.value})
 }
 //handleSubmit handles submission to the backend
 const handleSubmit=async(e)=>{
  e.preventDefault()
  //this function prevents the  automatic submission of the form tag for submission to be 
  //flawless
 	if(name && email &&password){
      //console.log('data',formData)
     await props.signUp(formData)
     //console.log(props.isAuth)
     if(props.isLoading === false){
      //if the user is authenticated then we can send the user to
      //the home page
      if(props.isAuth === true ){
        //console.log('auth')
       toast.success(`Welcome ${props.name}`)
       props.history.push('/')
      }else{
        //console.log('error')
        toast.error(props.error)
      }
    }
      
 	}else{
    //if the user has not been filled in any of the fields ,we send the
    //error to the client
 		toast.error('fill in all fields')
 	}

 }
 //console.log(props)
	return (
		<div className='border-gray-300 px-4 md:container mx-auto md:px-20 lg:w-1/2  lg:mt-10 xl:w-1/2'>
		<h3 className='text-4xl text-center text-gray-800'>Signup</h3>
		<form onSubmit={handleSubmit} className=''>
        <Input 
        title='Username'
        type='text'
        name='name'
        value={name}
        handleChange={handleInput('name')}
        />
         <Input 
        title='Email'
        type='email'
        name='email'
        value={email}
        handleChange={handleInput('email')}
        />
        <Input 
        title='Password'
        type='password'
        name='password'
        value={password}
       handleChange={handleInput('password')}
        />
           <Button
           title='sign up'
           isButton='true'
           type='submit'
           moreStyle='bg-indigo-700 w-full text-white uppercase font-semibold py-1'
        />
        </form>
        <a href='/signin' className='text-gray-600 mt-4 inline-block text-sm'>Already have an account?</a>
		</div>

		)
}

const mapStateToProps=(state)=>{
  return{
    name:state.auth.name,
    isAuth:state.auth.isAuth,
    error:state.auth.Msg,
    isLoading:state.auth.loading
  }
}
export default connect(mapStateToProps,actions)(Signup)