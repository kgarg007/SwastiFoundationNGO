const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'swasti_foundation_secret_key');
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
};

module.exports = auth;
