const express = require('express');
const multer = require('multer');
const path = require('path');
const Proposal = require('../models/Proposal');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// POST /api/proposals
router.post('/', upload.single('proposal'), async (req, res) => {
  try {
    const { title, company, description } = req.body;
    if (!req.file) return res.status(400).json({ message: 'PDF file required' });

    const newProposal = new Proposal({
      title,
      company,
      description,
      filePath: req.file.path,
    });

    await newProposal.save();

    res.status(201).json({ message: 'Proposal submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting proposal' });
  }
});

module.exports = router;
