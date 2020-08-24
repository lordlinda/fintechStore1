import React,{useEffect,useState} from 'react'
import Paypal from './Paypal.js'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import Button from './Button.js'
import svg from '../images/cart-empty.jpg'
import *as actions from '../redux/actions/index.js'
import {Redirect} from 'react-router-dom'

const Cart=(props)=>{
	const [Total,setTotal]=useState(0)

 useEffect(()=>{
  getTotal()
 },[props.cart])
 //this calculates the total of the items in the cart
	const getTotal=()=>{
		let total = 0
		props.cart.map(item=>{
			//console.log(item)
			//it sums up all the prices multiplied by the quanttity
			total += Number(item.price)* item.quantity
			setTotal(total)
		})
		//once the length of the cart is zero we set the total back to zero
		//i had to write this specifically because  as i remove items from the cart
		//the total changes accordingly however when it is empty the price of the previous item remains
		//so i had to set back to zero manually
		if(props.cart.length === 0){
      	//console.log('empty')
      	setTotal(0)
      }
	}
      //this is the function that removes an item from the cart
	const removeFromCart=(product)=>{
       //console.log(product)
       props.removeFromCart(product)

	}
	//this is the function that runs on sucessful payment
	const handleTransaction=async (paymentData)=>{
          const variables ={
          	//we pass in the entire cart
          	cart:props.cart,
          	//the payment data from paypal
          	paymentData:paymentData,
          	//and the toatl on payment
          	total:Total
          }
          await props.makePayment(variables)
          if(props.isLoading === false){
          		toast.success(` Congragulations ${props.message}`)
          }
	}
	//console.log(props)
	return (
		<div className='w-full'>
	{/*if the user is not signed in,they are redirected to the signin page,this acts like our auth guard*/}
		{props.isAuth === false ?
			<>
			< Redirect to='/signin'/>
             toast.error('Please signin')
		</>:null }
		<h1 className='text-3xl ml-3'> My cart</h1>
		<div>
		{   //it is important to write this first because if the cart it will not have any
			//products and it will say the differnt product are undefined and will show like
			//something is wrong and yet it is because the cart is empty
			props.cart.length > 0 ?
         //i have chosen to display the cart items in  a table
			<table className='w-full text-center'>
		<tbody>
		<tr className='border'>
		<th className='border'>Product</th>
		<th className='border'> Quantity</th>
		<th className='border'>Price</th>
		<th className='border'>Remove from Cart</th>
		</tr>
		
		{props.cart.map((product,i)=>{
			return <tr key={i}>
          <td className='border'>{product.title}</td>
		<td className='border'>{product.quantity}</td>
		<td className='border'>{product.price}</td>
		<td className='border'>
		<Button 
		isButton='true'
		onClick={removeFromCart.bind(this,product.id)} 
		moreStyle ='bg-red-700 text-white px-1 py-1'
		title='remove'/>
		</td>
		</tr>
		})}
		
		</tbody>
		</table>
			:
			<div className='w-full text-center'>
			 <img src={svg} className='object-center object-cover' alt='empty cart'/>
			</div>
		}
		</div>
	{/*total and paypal button*/}
		<div className='mt-2 text-2xl ml-5 text-indigo-700 mb-5'>
		
		Total:{Total}
		</div>
		<div className='ml-5'>
          <Paypal 
          total={Total}
          onSuccess={handleTransaction}
          />
          </div>
		</div>
		)
}
const mapStateToProps=(state)=>{
	return {
		cart:state.auth.cart,
		isAuth:state.auth.isAuth,
		message:state.auth.Msg,
		isLoading:state.auth.loading,
		sucess:state.auth.sucess
	}
}
export default connect(mapStateToProps,actions)(Cart)