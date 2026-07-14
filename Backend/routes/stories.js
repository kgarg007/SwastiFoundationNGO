const express = require('express');
const fs = require('fs');
const Story = require('../model/story');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
const uploadOnCloudinary = require('../utils/fileUpload');
const { v2: cloudinary } = require('cloudinary');

const router = express.Router();

// GET all success stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create success story (Protected)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, program, summary, story } = req.body;
    if (!name || !program || !summary || !story) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Name, program, summary, and story details are required.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Beneficiary image is required.' });
    }

    const cloudinaryRes = await uploadOnCloudinary(req.file.path);
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (!cloudinaryRes || cloudinaryRes === "Error Occured") {
      return res.status(500).json({ error: 'Failed to upload image to Cloudinary.' });
    }

    const newStory = new Story({
      name,
      program,
      summary,
      story,
      image: cloudinaryRes.secure_url || cloudinaryRes.url,
      imagePublicId: cloudinaryRes.public_id
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT update success story (Protected)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, program, summary, story } = req.body;
    const existingStory = await Story.findById(req.params.id);
    if (!existingStory) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Success story not found' });
    }

    if (name) existingStory.name = name;
    if (program) existingStory.program = program;
    if (summary) existingStory.summary = summary;
    if (story) existingStory.story = story;

    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path);
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      if (!cloudinaryRes || cloudinaryRes === "Error Occured") {
        return res.status(500).json({ error: 'Failed to upload new image to Cloudinary.' });
      }

      if (existingStory.imagePublicId) {
        await cloudinary.uploader.destroy(existingStory.imagePublicId);
      }

      existingStory.image = cloudinaryRes.secure_url || cloudinaryRes.url;
      existingStory.imagePublicId = cloudinaryRes.public_id;
    }

    await existingStory.save();
    res.json(existingStory);
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE success story (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const existingStory = await Story.findById(req.params.id);
    if (!existingStory) return res.status(404).json({ error: 'Success story not found' });

    if (existingStory.imagePublicId) {
      await cloudinary.uploader.destroy(existingStory.imagePublicId);
    }

    await existingStory.deleteOne();
    res.json({ message: 'Success story deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
