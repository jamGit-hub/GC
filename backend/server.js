const express = require ('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
// middleware that allows frontend to talk to backend
app.use(cors());
app.use(express.json()); 




const db = require('./models/conn'); // import pool
const productRoutes = require('./routes/productRoutes'); //routs for products
const userRoutes = require('./routes/userRoutes'); //user routs
const cartRoutes = require('./routes/cartRoutes'); //routes for cart
const orderRoutes = require('./routes/orderRoutes'); //routes for orders



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



app.listen(3000, ()=> {

    console.log("server is now running on port 3000")
})
