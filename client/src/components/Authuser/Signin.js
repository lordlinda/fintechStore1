import React,{useState} from 'react'
import {toast} from 'react-toastify'
import Input from '../Input.js'
import Button from '../Button.js'
import {connect} from 'react-redux'

import * as actions from '../../redux/actions/index.js'
const Signin=(props)=>{
  /*we setup state for our form with initial values which are emty strings in this case*/
const [formData,setFormData]=useState({
	email:'',
	password:''
})
const {email,password}=formData
 
 //handle input matchhes the value passed with that written in the respective input space
 //e.g whatever is passed in the function with variable 'name' is matched to whatever the user
 //inputs for the part field
 const handleInput=text=>e=>{
 	setFormData({...formData,[text]:e.target.value})
 }

//handleSubmit handles submission to the backend
 const handleSubmit=async(e)=>{
  //this function prevents the  automatic submission of the form tag for submission to be 
  //flawless
   e.preventDefault()
 	if(email && password){
      //console.log(formData)
      //then we submit the form
      await props.signIn(formData)
      if(props.isAuth===true ){
       toast.success(`Welcome back`)
       props.history.push('/')
      }else{
        //console.log('error')
        toast.error(props.error)
      }
 	}else{
    //if  all fields havent been filled then we show this error
 		toast.error('fill in all fields')
 	}
 	
 }
//console.log(props)
	return (
		<div className='border-gray-300 px-4 md:container mx-auto md:px-20'>
         {/*container mx-auto centers the conatiner in the middle of the screen*/}

		<h3 className='text-4xl text-center text-gray-800'>Signin</h3>
		<form onSubmit={handleSubmit} >
        
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
        <a href='/forgetPassword'className='text-gray-600 -mt-2 inline-block text-sm'>Forget Password?</a>

           <Button
           title='sign in'
           isButton='true'
           type='submit'
            moreStyle='bg-indigo-700 w-full text-white uppercase font-semibold py-1'
        />
        </form>
      <a  href='/signup'className='text-gray-600 mt-3 inline-block text-sm'>Dont have an account?</a>

		</div>

		)
}
const mapStateToProps=(state)=>{
  return{
    isAuth:state.auth.isAuth,
    error:state.auth.Msg
  }
}
export default connect(mapStateToProps,actions)(Signin)