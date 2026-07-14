const express = require('express');
const fs = require('fs');
const Program = require('../model/program');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
const uploadOnCloudinary = require('../utils/fileUpload');
const { v2: cloudinary } = require('cloudinary');

const router = express.Router();

// GET all programs
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single program
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ error: 'Program not found' });
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create program (Protected)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, category, locations, description } = req.body;
    if (!name || !category || !description) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Name, category, and description are required.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Program image is required.' });
    }

    const cloudinaryRes = await uploadOnCloudinary(req.file.path);
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (!cloudinaryRes || cloudinaryRes === "Error Occured") {
      return res.status(500).json({ error: 'Failed to upload image to Cloudinary.' });
    }

    let locationsArray = [];
    if (locations) {
      try {
        locationsArray = typeof locations === 'string' ? JSON.parse(locations) : locations;
      } catch (e) {
        locationsArray = typeof locations === 'string' ? locations.split(',').map(l => l.trim()) : locations;
      }
    }

    const newProgram = new Program({
      name,
      category,
      locations: locationsArray,
      description,
      image: cloudinaryRes.secure_url || cloudinaryRes.url,
      imagePublicId: cloudinaryRes.public_id
    });

    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT update program (Protected)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, category, locations, description } = req.body;
    const program = await Program.findById(req.params.id);
    if (!program) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Program not found' });
    }

    if (name) program.name = name;
    if (category) program.category = category;
    if (description) program.description = description;

    if (locations) {
      try {
        program.locations = typeof locations === 'string' ? JSON.parse(locations) : locations;
      } catch (e) {
        program.locations = typeof locations === 'string' ? locations.split(',').map(l => l.trim()) : locations;
      }
    }

    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path);
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      if (!cloudinaryRes || cloudinaryRes === "Error Occured") {
        return res.status(500).json({ error: 'Failed to upload new image to Cloudinary.' });
      }

      if (program.imagePublicId) {
        await cloudinary.uploader.destroy(program.imagePublicId);
      }

      program.image = cloudinaryRes.secure_url || cloudinaryRes.url;
      program.imagePublicId = cloudinaryRes.public_id;
    }

    await program.save();
    res.json(program);
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE program (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ error: 'Program not found' });

    if (program.imagePublicId) {
      await cloudinary.uploader.destroy(program.imagePublicId);
    }

    await program.deleteOne();
    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
