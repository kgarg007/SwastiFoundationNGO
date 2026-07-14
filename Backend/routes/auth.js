const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../model/admin');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'swasti_foundation_secret_key', {
      expiresIn: '24h'
    });

    res.json({ token, message: 'Logged in successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
