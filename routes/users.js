const express =require('express')
const router =express.Router()
const passport=require('passport')


const {signUp,signIn,forgetPassword,resetPassword,addToCart,handlePayment,getPurchases} = require('../controllers/UserController.js')
const {validRegister,passportAuth}=require('../middleware.js')

//@route        /users/signup
//@description  Create a new user
//@access        Public 
router.post('/signup',validRegister,signUp)

//@route        /users/signin
//@description  Login already existing user
//@access        Public 
router.post('/signin',signIn)

//@route        /users/forgetPassword
//@description  Receive email for user who has forgotten password
//@access        Public 
router.post('/forgetPassword',forgetPassword)

//@route        /users/resetPassword
//@description  update password
//@access        Public 
router.patch('/resetPassword',resetPassword)

//@route        /users/handlePayments
//@description  handle a payments
//@access        Private
router.post('/handlePayments',passport.authenticate('jwt', { session: false }),handlePayment)

//@route        /users/history
//@description  GET user history
//@access        Private
router.get('/history',passport.authenticate('jwt', { session: false }),getPurchases)

module.exports =router