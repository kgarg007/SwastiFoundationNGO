const express = require('express');
const fs = require('fs');
const Volunteer = require('../model/volunteer');
const ContactSubmission = require('../model/contactSubmission');
const CareerSubmission = require('../model/careerSubmission');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
const uploadOnCloudinary = require('../utils/fileUpload');
const { v2: cloudinary } = require('cloudinary');

const router = express.Router();

// ==========================================
// PUBLIC SUBMISSION POST ENDPOINTS
// ==========================================

// POST contact submission (Public)
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'Name, email, phone, and message are required.' });
    }

    const newSub = new ContactSubmission({
      name,
      email,
      phone,
      subject,
      message
    });

    await newSub.save();
    res.status(201).json({ message: 'Message sent successfully! We will contact you soon.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST career/internship application (Public)
router.post('/careers', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, position, message } = req.body;
    if (!name || !email || !phone || !position) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Name, email, phone, and position are required.' });
    }

    let resumeUrl = '';
    let resumePublicId = '';

    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path);
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      if (!cloudinaryRes || cloudinaryRes === "Error Occured") {
        return res.status(500).json({ error: 'Failed to upload resume to storage.' });
      }

      resumeUrl = cloudinaryRes.secure_url || cloudinaryRes.url;
      resumePublicId = cloudinaryRes.public_id;
    }

    const newApp = new CareerSubmission({
      name,
      email,
      phone,
      position,
      message,
      resumeUrl,
      resumePublicId
    });

    await newApp.save();
    res.status(201).json({ message: 'Application submitted successfully! Our team will review it.' });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});


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

// GET all contact submissions (Protected)
router.get('/contact', auth, async (req, res) => {
  try {
    const contactSubs = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(contactSubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all career submissions (Protected)
router.get('/careers', auth, async (req, res) => {
  try {
    const careerSubs = await CareerSubmission.find().sort({ createdAt: -1 });
    res.json(careerSubs);
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

// DELETE contact submission (Protected)
router.delete('/contact/:id', auth, async (req, res) => {
  try {
    const sub = await ContactSubmission.findById(req.params.id);
    if (!sub) return res.status(404).json({ error: 'Contact message not found.' });

    await sub.deleteOne();
    res.json({ message: 'Contact message deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE career submission (Protected)
router.delete('/careers/:id', auth, async (req, res) => {
  try {
    const sub = await CareerSubmission.findById(req.params.id);
    if (!sub) return res.status(404).json({ error: 'Career application not found.' });

    if (sub.resumePublicId) {
      await cloudinary.uploader.destroy(sub.resumePublicId);
    }

    await sub.deleteOne();
    res.json({ message: 'Career application deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
