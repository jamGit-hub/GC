const db = require('../models/conn');

exports.addToCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
        await db.query(
            'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
            [user_id, product_id, quantity]
        );

        res.status(201).json({ message: 'Product added to cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const [rows] = await db.query(
            `SELECT cart.id, products.name, products.price, cart.quantity
             FROM cart
             JOIN products ON cart.product_id = products.id
             WHERE cart.user_id = ?`,
            [userId]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { cartId } = req.params;

    try {
        await db.query('DELETE FROM cart WHERE id = ?', [cartId]);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

   
};