const express =require('express')
const router =express.Router()
const passport=require('passport')


const {createProduct,getProducts} = require('../controllers/ProductController.js')
const {validRegister,passportAuth}=require('../middleware.js')

//@route        POST new product
//@description  Create a new product
//@access        Public
router.post('/',createProduct)


//@route        GET  products
//@description  Get  products
//@access        Public
router.post('/getProducts',getProducts)




module.exports =router