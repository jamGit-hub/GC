

const mysql = require('mysql2/promise');
require('dotenv').config();
// connecting db 
// //'creates a small groupof connections and keeps them open and waiting and doesnt destroy it after running the query,
// so each time the query runs, the connection stayes into the pool for the next user ig'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// test connection
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Successfully connected to MySQL Database.");
    conn.release();
  } catch (err) {
    console.error("DATABASE CONNECTION CRASH:", err.message);
  }
})();

module.exports = pool;