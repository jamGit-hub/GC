const express = require('express');
const router = express.Router();
const orderControl = require('../controllers/orderControl');
const { verifyToken, isAdmin } = require('../middleware/auth'); //verification middlewares 

router.post('/checkout', orderControl.checkout);
router.get('/admin/orders', verifyToken, isAdmin, orderControl.getAllOrdersAdmin);// admins' path "they see them all" 
router.get('/:userId', verifyToken, orderControl.getOrderHistory);//users' orders path

module.exports = router;