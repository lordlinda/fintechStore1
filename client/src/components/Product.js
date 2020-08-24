import React from 'react'
import images from '../images/micheile-henderson-SoT4-mZhyhE-unsplash.jpg'
import Button from './Button.js'
import {connect} from 'react-redux'

import * as actions from '../redux/actions/index.js'

//this is the  product 
const Product=({product,addItem})=>{
	//this is the function for adding an item to cart
	const addToCart=(product)=>{
		//we make an object with title,id price,and quantity of one
		const cartItem ={
			id:Date.now(),
           title:product.title,
           price:product.price,
           quantity:1
		}
		//console.log(cartItem)
		addItem(cartItem)
	}
	
	return (
		<div className="mt-10 px-4 md:w-1/2 lg:w-1/3 xl:w-1/4">
		           <div className="border shadow-lg rounded-xl overflow-hidden">
		                   <img src={images}className='w-full object-cover' alt='productImage' />
		                   <div className='flex justify-between px-2'>
		                   <div className='px-3'>
		                   <p className='text-sm text-gray-700 mt-1 lg:text-md'>Price :${product.price}</p>
						    <div className="text-lg mb-1 -mt-1 text-gray-800 lg:text-xl lg:text-2xl">{product.title}</div>
						    <p className="text-gray-700 text-base mb-2 mt-5 rounded-lg bg-gray-300 px-2 md:text-sm lg:text-lg">
						     #{product.category}
						    </p>
                            </div>
					    <div>
					    <Button 
					    isButton='true'
					    title='Add to Cart'
					    onClick={addToCart.bind(this,product)}
					    moreStyle='font-bold bg-indigo-700 hover:bg-indigo-500 text-white px-1 py-1 md:text-xs uppercase lg:px-3 lg:py-2 lg:text-md'
					    />
					    </div>
					    </div>
		  </div>
 
           </div>

		)
}

export default connect(null,actions)(Product)