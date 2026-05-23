

const express = require('express');
const router = express.Router();
const productControl = require('../controllers/productControl');

const { verifyToken, isAdmin } = require('../middleware/auth'); //verification middlewares 
// route for getting ALL products , GET /api/products
router.get('/', productControl.getAllProducts);

// route for getting product by platfrom,  GET /api/products/platform/Netflix
router.get('/platform/:platform', productControl.getProductsbyPlatform);
 // rout for getting product by region , GET /api/products/region/:region
router.get('/region/:region', productControl.getProductsbyRegion);


//ADMIN ROUTS
router.post('/admin/add', verifyToken, isAdmin, productControl.addProduct); //secure POST route, MUST be logged in AND an admin to add products
router.put('/admin/:id',verifyToken, isAdmin, productControl.updateProduct);
router.delete('/admin/:id',verifyToken, isAdmin, productControl.deleteProduct)

module.exports = router;