
// this file is for filtiring functions/ getting all the products from db. 
const db = require('../models/conn');

// get all gift products from the database
exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};

// get them filtered by platform
exports.getProductsbyPlatform = async (req, res) => {
  const { platform } = req.params;
  try {
    const [products] = await db.query('SELECT * FROM products WHERE platform = ?', [platform]);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error finding products', error: error.message });
  }
};

// get them filtered by region
exports.getProductsbyRegion = async (req, res) => {
    const { region } = req.params;
    try {
      const [products] = await db.query('SELECT * FROM products WHERE region = ?', [region]);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error finding products ', error: error.message });
    }
  };

  // Adding products feature for mr admin dashboard
  exports.addProduct = async (req, res) => {
    try {
      const { name, price, platform, region } = req.body;
      console.log("ADDING PRODUCT:", req.body); //testing
  
      if (!name || !price || !platform || !region) {
        return res.status(400).json({ error: "Missing fields" });
      }
      const [result] = await db.query(
        "INSERT INTO products (name, price, platform, region) VALUES (?, ?, ?, ?)",
        [name, price, platform, region]
      );
      res.json({ success: true, id: result.insertId });
  
    } catch (err) {
      console.error("ADD PRODUCT ERROR:", err); //testing
      res.status(500).json({ error: err.message });
    }
  };

// Admin can update products. 
  exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, platform, region} = req.body;
    try {
      await db.query(
        `UPDATE products SET name=?, price=?, platform=?, region=?
         WHERE id=?`,
        [name, price, platform, region, id]
      );
      res.json({ message: "Product updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
//And delete products
  exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM products WHERE id=?', [id]);
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };