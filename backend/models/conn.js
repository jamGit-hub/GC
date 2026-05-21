const mysql = require('mysql2');
require('dotenv').config();

// connecting db 
// //'creates a small groupof connections and keeps them open and waiting and doesnt destroy it after running the query,
// so each time the query runs, the connection stayes into the pool for the next user ig'
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "GCtables",
  connectionLimit: 10,
});

pool.getConnection()
  .then(conn => {
    console.log("Successfully connected to the MySQL Database.");
    conn.release();
  })
  .catch(err => {
    console.error("DATABASE CONNECTION CRASH:", err.message);
  });

module.exports = pool.promise();