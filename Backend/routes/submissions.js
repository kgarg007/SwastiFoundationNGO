const express = require('express');
const Volunteer = require('../model/volunteer');
const auth = require('../middleware/auth');

const router = express.Router();

// ==========================================
// PROTECTED READ/DELETE DASHBOARD ENDPOINTS
// ==========================================

// GET all volunteer submissions (Protected)
router.get('/volunteers', auth, async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE volunteer submission (Protected)
router.delete('/volunteers/:id', auth, async (req, res) => {
  try {
    const sub = await Volunteer.findById(req.params.id);
    if (!sub) return res.status(404).json({ error: 'Volunteer application not found.' });

    await sub.deleteOne();
    res.json({ message: 'Volunteer application deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
