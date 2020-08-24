const mongoose =require('mongoose')
const bcrypt=require('bcryptjs')

//the productSchema shows the layout of the product
const productSchema= mongoose.Schema({
	title:{
		type:String,
		unique:true //this ensures that every product has its own name

	},
	price:{
		type:String,
	},
	category:{
		type:String
	},
	sold:{
		type:Number,
	}
})



// we export our user schema  as a model to use inour routes
module.exports =mongoose.model('Product',productSchema)

