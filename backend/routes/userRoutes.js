
const express = require('express');
const router = express.Router();
const userControl = require('../controllers/userControl');
const { verifyToken, isAdmin } = require('../middleware/auth');


router.post ('/register' , userControl.registerUser); // POST /api/users/register
router.post('/login',  userControl.loginUser);// POST /api/users/login
//ADMIN ROUTS all are protected
router.get('/admin', verifyToken, isAdmin, userControl.getAllUsers);
router.delete('/admin/:id', verifyToken, isAdmin, userControl.removeUser);
router.put('/admin/:id/role', verifyToken, isAdmin, userControl.updateUserRole);


module.exports = router;