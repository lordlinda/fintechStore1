const mongoose =require('mongoose')
require('dotenv').config

const connection = mongoose.connect( process.env.MONGO_URL || 'mongodb://localhost/paypal',{
	 useNewUrlParser: true,
	 useUnifiedTopology: true ,
}).then(()=>console.log(`Connected to mongodb ...`))
  .catch(err=> console.log(err))

  module.exports = connection