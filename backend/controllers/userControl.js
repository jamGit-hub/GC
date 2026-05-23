
// this file is for user account creating / password hashing / log in 


const db = require('../models/conn');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register
exports.registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'Username is already taken' });
    } // for unique usernames 

    const salt = await bcrypt.genSalt(10);     // to encrypt the password 
    const hashedPassword = await bcrypt.hash(password, salt);

    // insert user to db table
    await db.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, 'user']
    );
    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully!' 
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
};

  // log in logic
  exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
      // find by username
      const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      if (users.length === 0) {
        return res.status(400).json({ message: 'Invalid Username or Password' }); // if not found
      }
      const user = users[0];

      // compare password with the encrypted hash in db
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Username or Password' });
      }

      //  JWT pass contains  id and role "user "
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET || 'gshop_secret_architect_key',
        { expiresIn: '1d' }
      );

      // token sent back to frontend
      res.status(200).json({
        message: 'Login successful!',
        token: token,
        user: { id: user.id, 
          username: user.username, 
          role: user.role,
          email: user.email,
        }
      });

    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  };

  exports.getAllUsers = async (req, res) => {
    try {
      const [users] = await db.query(
        "SELECT id, username, role FROM users"
      );
      res.json(users);
    } catch (err) {
      console.error("get AllUsers control ERROR:", err); 
      res.status(500).json({ error: err.message });
    }
};

//Admins can control users: 
// updating ro;es
  exports.updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
      await db.query(
        'UPDATE users SET role=? WHERE id=?',
        [role, id]
      );

      res.json({ message: "User role updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
//delete

  exports.removeUser = async (req, res) => {
    const { id } = req.params;

    try {
      await db.query(
        'DELETE FROM users WHERE id = ?',
        [id]
      );
      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


