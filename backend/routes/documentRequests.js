const express = require('express');
const {
  createDocumentRequest,
  getDocumentRequests,
  updateDocumentRequest
} = require('../controllers/documentRequests');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(createDocumentRequest)
  .get(protect, admin, getDocumentRequests);

router.route('/:id')
  .put(protect, admin, updateDocumentRequest);

module.exports = router;