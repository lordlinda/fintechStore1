import React,{useEffect} from 'react'
import Product from './Product.js'
import {connect} from 'react-redux'
import * as actions from '../redux/actions/index.js'
const Home=(props)=>{
	//this is the page conatining all our products
	useEffect(()=>{
     props.getProducts()
	},[])
	//console.log(props.products)
           //this handles the selected option in the category options
	const handleOption=(e)=>{
       //console.log(e.target.value)
       props.getByCategory(e.target.value)
	}
	//console.log(props.products)
	return(
		<div>
		{
          props.isLoading === true ?
          <div className="loader mt-24 text-center"></div>
          :
          <>
          <div>
		    <h1 className='text-2xl font-bold text-indigo-700 text-center mt-5 w-max-md md:text-6xl'>Savings</h1>
			<select onChange={handleOption} className='bg-white border px-2 py-2 ml-24 md:py-5 px-4 border-8 text-lg rounded lg:w-1/4'>
			<option value=''>---select category --</option>
			<option value ='emergency fund'>emergency fund</option>
			<option value ='insurance'>insurance</option>
			<option value ='treasury bills'>treasury bills</option>
			<option value ='goals'>Goal based</option>
			</select>
		</div>
       {/*flex wrap allows our products to go to the next line if they dont fit the screen width*/}
		<div className='md:flex flex-wrap'>
		
         { 
         	//again like i keep saying that instead of mapping an empty array that will give you errors
         	// beacuse it lacks the properties you will be expecting below 
         	props.products.length > 0 ?
                props.products.map(product=>{
         		return <Product 
         		key={product._id}
         		product={product}
         		addItem={props.addToCart}
         		/>
         	})
         	:null

         }
		</div>
		</>
		}
		</div>
		)
}

const mapStateToProps=(state)=>{
	return {
		products:state.auth.products,
		isLoading:state.auth.loading
	}
}
export default connect(mapStateToProps,actions)(Home)