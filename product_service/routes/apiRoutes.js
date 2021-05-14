const express = require('express')
const router = express.Router()

//Import Controller
const{getProducts,addProducts,deleteProducts,adminLogin,registerAdmin,getProductsBySeller,updateProducts} =   require('../controllers/controller')

router.get('/getProducts',getProducts)
router.post('/getProductsBySeller',getProductsBySeller)
router.post('/addProducts',addProducts)
router.delete('/deleteProducts',deleteProducts)
router.put('/update-product',updateProducts)

router.post('/admin-login',adminLogin)
router.post('/admin-register',registerAdmin)
module.exports = router