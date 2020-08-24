const mongoose =require('mongoose')
require('dotenv').config

const connection = mongoose.connect('mongodb://localhost/paypal' || process.env.MONGO_URL,{
	 useNewUrlParser: true,
	 useUnifiedTopology: true ,
}).then(()=>console.log(`Connected to mongodb ...`))
  .catch(err=> console.log('just a little issue'))

  module.exports = connection