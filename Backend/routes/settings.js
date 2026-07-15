const express = require('express');
const Settings = require('../model/settings');
const auth = require('../middleware/auth');

const router = express.Router();

// GET settings (Public) - Auto-initializes if empty
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update settings (Protected)
router.put('/', auth, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    const { orgInfo, aboutContent, founderMessage, impactStats } = req.body;

    if (orgInfo) {
      settings.orgInfo = { ...settings.orgInfo, ...orgInfo };
    }
    if (aboutContent) {
      settings.aboutContent = { ...settings.aboutContent, ...aboutContent };
    }
    if (founderMessage) {
      settings.founderMessage = { ...settings.founderMessage, ...founderMessage };
    }
    if (impactStats) {
      settings.impactStats = impactStats;
    }

    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
