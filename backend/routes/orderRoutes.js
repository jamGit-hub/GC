const express = require('express');
const router = express.Router();
const orderControl = require('../controllers/orderControl');
const { verifyToken } = require('../middleware/auth'); 

//TESTINGG
//console.log("=========================================");
//console.log("DEBUG CHECK:");
//console.log("1. verifyToken is:", typeof verifyToken, verifyToken);
//console.log("2. orderControl.getOrders is:", typeof orderControl.getOrders, orderControl.getOrders);
//console.log("=========================================");

router.post('/checkout', orderControl.checkout);
router.get('/:userId', verifyToken, orderControl.getOrders);

module.exports = router;