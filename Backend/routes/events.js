const express = require('express');
const Event = require('../model/event');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create event (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const { title, date, time, location, description, registrationDetails } = req.body;
    if (!title || !date) {
      return res.status(400).json({ error: 'Title and Date are required fields.' });
    }

    const newEvent = new Event({
      title,
      date,
      time,
      location,
      description,
      registrationDetails
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update event (Protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, date, time, location, description, registrationDetails } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (title) event.title = title;
    if (date) event.date = date;
    if (time !== undefined) event.time = time;
    if (location !== undefined) event.location = location;
    if (description !== undefined) event.description = description;
    if (registrationDetails !== undefined) event.registrationDetails = registrationDetails;

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE event (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    await event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
