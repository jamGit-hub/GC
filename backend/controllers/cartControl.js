const db = require('../models/conn');

exports.addToCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
  try {
    // check if the item exists in cart
    const [existing] = await db.query(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [user_id, product_id]
    );
    if (existing.length > 0) {// update quantitySO avoid duplicates
      
      await db.query(
        "UPDATE cart SET quantity = quantity + ? WHERE id = ?",
        [quantity, existing[0].id]
      );
      return res.json({ message: "Quantity updated in cart" });
    }
    // it doesnt exist so insert new
    await db.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [user_id, product_id, quantity]
    );
    res.json({ message: "Added to cart" });

  } catch (err) {
    res.status(500).json({ error: err.message });
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

exports.updateCartQuantity = async (req, res) => {
    const { cartId } = req.params;
    const { quantity } = req.body;
  
    try {

      await db.query(
        "UPDATE cart SET quantity = ? WHERE id = ?",
        [quantity, cartId]
      );
  
      res.json({ message: "Quantity updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };