const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models/conn'); // import pool
const productRoutes = require('./routes/productRoutes'); //routs for products
const userRoutes = require('./routes/userRoutes'); //user routs
const cartRoutes = require('./routes/cartRoutes'); //routes for cart
const orderRoutes = require('./routes/orderRoutes'); //routes for orders

const app = express();
// middleware
app.use(cors());
app.use(express.json()); 

//testing and debugging  w app.use
app.use((req, res, next) => {
    console.log(`Incoming Request -> Method: ${req.method} | URL: ${req.url}`);
    next();
});

app.use('/api/products', productRoutes); // to reach the routes 'endpoints?'
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('GC Shop backend is running');
}); //  test route 

async function testConnection() {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        console.log('Database connected successfully to Gshop!');
    } catch (error) {
        console.error('connection failed:', error.message);
    } // run sm query to see if sql work
}

//test and run
testConnection();

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});