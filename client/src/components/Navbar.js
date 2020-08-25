import React,{useEffect} from 'react'
import Button from './Button.js'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {isAuth} from '../helpers.js'
import * as actions from '../redux/actions/index.js'
//this is the navbar
const Navbar=(props)=>{
	//console.log(props)
	const signOut=()=>{
       props.signOut()
	}
	
 return (
 	<div className='bg-indigo-600 px-2'>
 	<nav className='flex justify-between py-2 align-items-start'>
 	<Link to='/' className='font-bold tracking-wider text-white mt-1 text-xl md:text-2xl'>Pasbanc</Link>
 	<div className='flex'>
 	<Button
 	link='/history'
 	title='Purchases'
 	/>
 	<Button
 	title='Cart'
 	link='/cart'
 	/>

 	{
 		props.isAuth=== true?
 		<Button
 		isButton='true'
 	title='Signout'
 	moreStyle='text-white'
 	onClick={signOut}
 	/> :
 	<>
           <Button
      link='/signup'
 	title='Signup'
 	/>
 	<Button
 	link='/signin'
 	title='Signin'
 	/>
 	</>
 	}
 	</div>
 	</nav>
 	 </div>
 	
 	)
}
const mapStateToProps=(state)=>{
 return {
 	isAuth:state.auth.isAuth
 }
}
export default connect(mapStateToProps,actions)(Navbar)