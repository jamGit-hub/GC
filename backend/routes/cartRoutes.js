const express = require('express');
const router = express.Router();
const cartControl = require('../controllers/cartControl');
const { verifyToken } = require('../middleware/auth');


router.post('/add', verifyToken,cartControl.addToCart);
router.get('/:userId',verifyToken, cartControl.getCart);
router.delete('/remove/:cartId', verifyToken, cartControl.removeFromCart);
module.exports = router;