
const db = require('../models/conn');


exports.checkout = async (req, res) => {
    const { user_id } = req.body;

    try {
        const [cartItems] = await db.query(
            `SELECT cart.product_id, cart.quantity, products.price
             FROM cart
             JOIN products ON cart.product_id = products.id
             WHERE cart.user_id = ?`,
            [user_id]
        );

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        await db.query('START TRANSACTION');

        const [orderResult] = await db.query(
            'INSERT INTO orders (user_id, total_price) VALUES (?, ?)',
            [user_id, total]
        );

        const orderId = orderResult.insertId;

        for (const item of cartItems) {
            await db.query(
                `INSERT INTO order_items (order_id, product_id, quantity, price)
                 VALUES (?, ?, ?, ?)`,
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

            // clear cart 
            await db.query('DELETE FROM cart WHERE user_id = ?', [user_id]);
            await db.query('COMMIT');

            res.status(201).json({ message: 'Order placed successfully' });

        } catch (error) {
            await db.query('ROLLBACK');  // If anything fails during,, it will undo all partial changes
            res.status(500).json({ error: error.message });
        }
 };



 exports.getOrderHistory = async (req, res) => {
    const { userId } = req.params;
  
    try {
      if (!userId || userId === "undefined") {
        return res.status(400).json({ error: "Invalid userId" });
      }

      const [orders] = await db.query( 
        `
        SELECT 
          orders.id,
          orders.total_price,
          orders.status,
          orders.user_id,
          orders.order_date,
          products.name AS product_name,
          order_items.quantity,
          order_items.price
        FROM orders
        LEFT JOIN order_items ON orders.id = order_items.order_id
        LEFT JOIN products ON order_items.product_id = products.id
        WHERE orders.user_id = ?
        ORDER BY orders.id DESC
        `,
        [userId]
      );
  
      const grouped = {};
  
      orders.forEach((row) => {
        if (!grouped[row.id]) {
          grouped[row.id] = {
            id: row.id,
            total_price: row.total_price,
            items: [],
          };
        }
  
        if (row.product_name) {
          grouped[row.id].items.push({
            product_name: row.product_name,
            quantity: row.quantity,
            price: row.price,
          });
        }
      });
  
      res.json(Object.values(grouped));
    } catch (error) {
      console.error("ORDER HISTORY ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  };
  exports.getAllOrdersAdmin = async (req, res) => {
    try {
      const [orders] = await db.query(`
        SELECT 
          o.id,
          o.user_id,
          o.total_price,
          o.status
        FROM orders o
        ORDER BY o.id DESC
      `);
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("ADMIN ORDERS ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  };

  exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      await db.query(
        "UPDATE orders SET status = ? WHERE id = ?",
        [status, orderId]
      );
      res.json({ message: "Status updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
