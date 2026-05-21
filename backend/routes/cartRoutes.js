const express = require('express');
const router = express.Router();
const cartControl = require('../controllers/cartControl');

router.post('/add', cartControl.addToCart);
router.get('/:userId', cartControl.getCart);
router.delete('/remove/:cartId', cartControl.removeFromCart);
module.exports = router;