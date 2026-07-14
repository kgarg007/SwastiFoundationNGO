const express = require('express');
const fs = require('fs');
const Gallery = require('../model/gallery');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
const uploadOnCloudinary = require('../utils/fileUpload');
const { v2: cloudinary } = require('cloudinary');

const router = express.Router();

// GET all gallery images
router.get('/', async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST add image to gallery (Protected)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { ratio } = req.body; // e.g. "1/1", "4/3", "3/4"

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }

    const cloudinaryRes = await uploadOnCloudinary(req.file.path);
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (!cloudinaryRes || cloudinaryRes === "Error Occured") {
      return res.status(500).json({ error: 'Failed to upload image to Cloudinary.' });
    }

    const newGalleryItem = new Gallery({
      imageUrl: cloudinaryRes.secure_url || cloudinaryRes.url,
      imagePublicId: cloudinaryRes.public_id,
      ratio: ratio || '1/1'
    });

    await newGalleryItem.save();
    res.status(201).json(newGalleryItem);
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE image from gallery (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Gallery item not found' });

    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId);
    }

    await item.deleteOne();
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
