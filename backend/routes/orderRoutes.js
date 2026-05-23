const express = require('express');
const router = express.Router();
const orderControl = require('../controllers/orderControl');
const { verifyToken, isAdmin } = require('../middleware/auth'); //verification middlewares 

router.post('/checkout', orderControl.checkout);
router.get('/admin/viewOrders', verifyToken, isAdmin, orderControl.getAllOrdersAdmin);// admins' path "they see them all" 
router.get('/:userId', verifyToken, orderControl.getOrderHistory);//users' orders path
router.put( "/admin/viewOrders/:orderId/status",verifyToken,isAdmin,orderControl.updateOrderStatus //Update orders for admin
  );

module.exports = router;