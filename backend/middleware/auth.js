
const jwt = require('jsonwebtoken');// the security guard file for routes 

// if a user is logged in
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expects "Bearer <token>"

  if (!token) {
      return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified; 
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid Token' });
    }
  };

  const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next(); 
    } else {
      return res.status(403).json({ message: 'Access Denied. Admins only.' });
    }
  };
      module.exports = {
        verifyToken,
        isAdmin
      };