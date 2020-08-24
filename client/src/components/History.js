import React,{useEffect} from 'react'
import  {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actions from '../redux/actions/index.js'
const History=(props)=>{
	//this hows all our users previous purchases
	useEffect(()=>{
     props.getHistory()
	},[])
	//console.log(props)
 return (
 	<div className='px-4 py-2'>
 	 <p className='text-2xl center'>Items</p>
     {props.isAuth ===false ? <Redirect to='/signin'/>:null }
 	{    //we first have to ensure that the user has an actual history before we map
 		//all the properties will be undefined and yet it is because the cart is empty
 		props.history.length >0 ?
 		<div>
 		{
 			props.history.map((product,i)=>{
 				 return <div key={i}>
 				         
 				          <p>{product.date}</p>
 				          <p> Total Spent :{product.total}</p>
 				          {
 				          	product.payment.map(item=>{
 				          		return <div key={item.id}>
 				          		<p>Item Price:{item.price}</p>
 				          		<p>Item Quantity:{item.quantity}</p>
 				          		<p>Item name:{item.title}</p>
 				          		</div>
 				          	})
 				          }
 				          <hr />
 				      </div>

 			})
 		}
 		</div>
 		: <p className='text-3xl mt-4 text-gray-400'>No purchases yet</p>
 	}
 	</div>
 	)
}

const mapStateToProps=(state)=>{
	return {
		history:state.auth.history,
		isAuth:state.auth.isAuth
	}
}
export default connect(mapStateToProps,actions)(History)