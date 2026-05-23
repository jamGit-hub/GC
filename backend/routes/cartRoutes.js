const express = require('express');
const router = express.Router();
const cartControl = require('../controllers/cartControl');
const { verifyToken } = require('../middleware/auth');

router.post('/add', verifyToken, cartControl.addToCart);
router.get('/:userId', verifyToken, cartControl.getCart);
router.put('/:cartId', verifyToken, cartControl.updateCartQuantity);
router.delete('/:cartId', verifyToken, cartControl.removeFromCart);

module.exports = router;