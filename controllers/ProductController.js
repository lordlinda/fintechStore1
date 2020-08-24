const Product =require('../models/Product.js')
module.exports={
	createProduct:(req,res)=>{
		//we get the data from the client
		const {title,price,category,sold}=req.body
		//we create a new product
		const newProduct = new Product({
           title,
           price,
           category,
           sold
		})
    //and save it to the database
		newProduct.save()
		.then(product=>{
			res.status(200).json({
				msg:'Product sucessfully created'
			})
		})
	},
	getProducts:(req,res)=>{
		let findArgs={}
		findArgs=req.body
        //we do this to match fields to values to match the database
        for (let key in req.body){
        	if(key ==='price'){
        		findArgs[key] ={
            //this is for setting how the database is going to look for products based onprice
            //$gte means greater than or equal to
            //$lte means less than or equal to
            //it is important to put key because in this  case we consider the key of pricr
            $gte:req.body[key][0],
            $lte:req.body[key][1]
         }

        	}else{
             findArgs[key]=req.body[key]
        	}
        }

        //console.log(findArgs) e.g {category:'insurance'} it returns all products whose category is insurance
       //we pass the arguemants to find the products based on them
		Product.find(findArgs)
		.limit(0)
		.then(products=>{
			res.status(200).json({products})
		}).catch(err=>{
			res.status(500).json({error:err})
		})
	}

}