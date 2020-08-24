const mongoose =require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema= mongoose.Schema({
	name:{
		type:String
	},
	email:{
		type:String,
		unique:true //ensures email is different for every user
	},
	password:{
		type:String
	},
	history:{ //this is where all users successful payments are stored
		type:Array,
		default:[]
	},
	resetPasswordLink:{ //this is the link which we use to find the user while reseting password
		type:String
	}
})


//this function runs before we save the user 
//this ensure s that in our routes we dont have to keep hashing our password
//for both signup and signin 
//it automatically runs  if we are saving a user to the database
//ensure that the  function is not an arrow function
userSchema.pre('save',function(next){

   bcrypt.hash(this.password, 10,(err, hash) =>{
    if(err){
      return  console.error(err)
    }
    // Store hash in your password DB.
    //console.log(hash)
     this.password =hash
    //this next is very important
    next();
  });

})

// we export our user schema  as a model to use inour routes
module.exports =mongoose.model('User',userSchema)

