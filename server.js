const express =require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv =require('dotenv')
const bodyParser = require('body-parser')
const path=require('path')

const connectDB =require('./db.js')
//conencting to mongodb

//Init App
const app=express();

//there are some modules we need to run before our routes
//the first is dotenv module for accessing  certain variables with
//some info we dont want to share
dotenv.config()
//cors also allows to have the server and client on different ports without errors
app.use(cors())
//we also use morgan to see the requests during development
if(process.env.NODE_ENV){
app.use(morgan('dev'))
}
//dont forget  json or none of the routes will work
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//For routes
app.use('/users',require('./routes/users.js'))
app.use('/products',require('./routes/products.js'))

//ading handle fro client app
//this tells the server to look for the build of the react app
if (process.env.NODE_ENV === 'production' ) {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}
//we have a port ,when we deploy we have a different port than the one we use
//for local development
const Port =process.env.PORT || 5000

app.listen(Port,()=>console.log(`server is listening on port ${Port}`))