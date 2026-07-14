const validator = require('validator');

const validateUser = (req, res, next) => {
  const reqField = ['name', 'email', 'phone', 'role'];

  // Check if all required fields are present and not empty
  const missingFields = reqField.filter(
    (field) => !req.body[field] || req.body[field].toString().trim() === ''
  );



  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Essential Fields are missing: ${missingFields.join(', ')}`,
    });
  }

  // Validate email format
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: 'Email is not in valid format' });
  }

  // Validate phone format (convert to string first)
  const phoneStr = req.body.phone.toString();
  if (!validator.isMobilePhone(phoneStr, 'any')) {
    return res.status(400).json({ error: 'Phone number format is not correct' });
  }

  next();
};

module.exports = validateUser;
