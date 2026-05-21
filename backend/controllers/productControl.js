
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
    const { name, price, platform, region , image_url} = req.body;
  
    //  server- side validation. no empty fields
    if (!name || !price || !platform || !region) {
      return res.status(400).json({ message: 'All fields (name, price, platform, region) are required.' });
    }
  
    try { //goes to db
      const [result] = await db.query(
        'INSERT INTO products (name, price, platform, region, image_url) VALUES (?, ?, ?, ?, ?)',
        [name, price, platform, region, image_url]
      );
  
      res.status(201).json({
        message: 'Product added successfully!',
        productId: result.insertId
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
  };