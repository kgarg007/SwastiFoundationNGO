const express = require('express');
const fs = require('fs');
const TeamMember = require('../model/teamMember');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
const uploadOnCloudinary = require('../utils/fileUpload');
const { v2: cloudinary } = require('cloudinary');

const router = express.Router();

// GET all team members (Public)
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create team member (Protected)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, role } = req.body;
    if (!name || !role) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Name and Role are required fields.' });
    }

    let image = '';
    let imagePublicId = '';

    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryRes || cloudinaryRes === "Error Occured") {
        return res.status(500).json({ error: 'Failed to upload profile picture to Cloudinary.' });
      }
      image = cloudinaryRes.secure_url || cloudinaryRes.url;
      imagePublicId = cloudinaryRes.public_id;
    }

    const newMember = new TeamMember({
      name,
      role,
      image,
      imagePublicId
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT update team member (Protected)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, role } = req.body;
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Team member not found.' });
    }

    if (name) member.name = name;
    if (role) member.role = role;

    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryRes || cloudinaryRes === "Error Occured") {
        return res.status(500).json({ error: 'Failed to upload new profile picture to Cloudinary.' });
      }

      if (member.imagePublicId) {
        await cloudinary.uploader.destroy(member.imagePublicId);
      }

      member.image = cloudinaryRes.secure_url || cloudinaryRes.url;
      member.imagePublicId = cloudinaryRes.public_id;
    }

    await member.save();
    res.json(member);
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE team member (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Team member not found.' });

    if (member.imagePublicId) {
      await cloudinary.uploader.destroy(member.imagePublicId);
    }

    await member.deleteOne();
    res.json({ message: 'Team member deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
