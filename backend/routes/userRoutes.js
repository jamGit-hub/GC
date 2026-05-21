
const express = require('express');
const router = express.Router();
const userControl = require('../controllers/userControl');

router.get('/users',  userControl.getAllUsers);
router.post ('/register' , userControl.registerUser); // POST /api/users/register
router.post('/login',  userControl.loginUser);// POST /api/users/login

module.exports = router;