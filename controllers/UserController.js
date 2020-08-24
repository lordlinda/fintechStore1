const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
const bcrypt=require('bcryptjs')
const passport=require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const _=require('lodash')


const User=require('../models/User.js')
const Product =require('../models/Product.js')
const {signupEmail,resetPasswordEmail}=require('../middleware.js')

module.exports ={
	signUp:(req,res)=>{
		const {name,email,password}=req.body
		//so this  code  runs to ensure that the  a user has filled in all required 
		//fields i.e invalid credentials
		//we return an error back to the client
		 const errors = validationResult(req);
		  if (!errors.isEmpty()) {
		    return res.status(422).json({ msg: errors.array().map(error=>error.msg)[0] });
		  }
		  //if the user  credentials are valid we  get the  the credentials from req.body
		  //we first have to ensure that the  user with this email doesnt already exist
		  User.findOne({email})
		  .then(user=>{
		  	if(user){
		  		return res.status(422).json({msg:'user already exists'})
		  	}
		  	//if the user doesnt exist we create a new user  to save in the database
			  	 const newUser = new User({
	         	name,
	         	email,
	         	password
	         })
			  	 newUser.save()
			  	 .then(user=>{
			  	 	//if the user has been sucessfully created 
			  	 	//we send a user a signed token
			  	 	const token = jwt.sign({
							  sub: user.id
							},process.env.JWT_SECRET_ACTIVATION, 
							{ expiresIn: '24h' })
			  	 		signupEmail(name,email)
			  	 	res.status(200).json({token:token,name})
			  	 	//then we want to send an email to  the new user
			  	 
			  	 }).catch(err=>{
			  	 	console.log(err)
			  	 	res.status(500).json({error:err})
			  	 })
		  })

	},
	signIn:(req,res)=>{
		const user =req.user
		const {email,password}=req.body
		User.findOne({email})
		.then(user=>{
	  // then we have to compare the email and hashed password before returning 
      // the user
        if(user){
         bcrypt.compare(password, user.password, function(err, result) {
             //console.log(result)
             if(result){ // true 
             	//we create a signed token and return it to the user
             	const token = jwt.sign({
							  sub: user.id
							},process.env.JWT_SECRET_ACTIVATION, 
							{ expiresIn: '24h' })
			  	 	res.status(200).json({
			  	 		token:token,
			  	 		msg:'signed in sucessfully'
			  	 	})
             }else{ //false
                res.status(422).json({msg:'Username and password dont match'})
             }
           })
        }

		})
		
	},
	forgetPassword:(req,res)=>{
		//we get the email from the user
		const {email}=req.body
		//we create a signed  token  and store it in the user schema as resetPasswordLink
		const token = jwt.sign({
							  sub: email
							},process.env.JWT_SECRET_ACTIVATION, 
							{ expiresIn: '24h' })
		//we sent an email to the  client with the token equal to the one we store below in the resetPasswordLink
		//console.log(req.body)
		resetPasswordEmail(email,token)
		User.update({email},{resetPasswordLink:token},{new:true},(err,user)=>{
			res.status(200).json({msg:'Check your email to update password'})
		})
		
	},
	resetPassword:(req,res)=>{
		const {token,password}=req.body
      //so we get the user
		//then we compare if the token from the front is equal to the
		//to the restPasswordLink
		//if they are equal then the password can be updated otherwise no
		User.findOne({resetPasswordLink:token})
		.then(user=>{
			//we first have to hash the password
			bcrypt.hash(password, 10,(err, hash) =>{
		    if(err){
		      return  console.error(err)
		    }
		    //console.log(hash)
		    //console.log(user)
		    // Store hash and update the password
		     user.password = hash
		    //this next is very important
			User.updateOne({resetPasswordLink:token},{password:user.password,resetPasswordLink:''})
			.then(user=>{
				res.status(200).json({msg:'Password has been updated ,You can now login'})
			}).catch(err=>{
				res.status(500).json({msg:'Error occured'})
			})
    });
			

		})
		
	},
	handlePayment:(req,res)=>{
		//we get the user from  req.user
		const user =req.user
		let payment = []
		//we get the cart and payment details  from the client
		const{cart,paymentData,total}=req.body
		//we get the  cart items  fromt the cart and put each in its own array
         cart.forEach(item=>{
              payment.push(item)
         })
         //our history object we will store consists of the date,the total,and payment data and all cart details
         let history = {
         	date:Date(),
         	total,
         	payment,
         	paymentData
         }
           //after this we update the user with the new history object just under the previous ones
         User.update({_id:user.id},{$push:{history:history}},{new:true})
         .then(user=>{
         	res.status(200).json({msg:'Purchase sucessful'})
         }).catch(err=>{
         	res.status(500).json({msg:'something went wrong,please try again'})
         })
	},
	getPurchases:(req,res)=>{
		//we get the user from req.user
		const user =req.user
		//we find the user
		User.findOne({_id:user.id})
		    .then(user=>{
		    	//we just need the need the history so we get that alone
		    	const history = user.history
		    	res.status(200).json({
		    		history:history
		    	})
		    }).catch(err=>{
		    	res.status(500).json({msg:'User not found'})
		    })
	}


}