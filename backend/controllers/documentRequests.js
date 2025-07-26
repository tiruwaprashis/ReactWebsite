const DocumentRequest = require('../models/DocumentRequest');
const sendEmail = require('../utils/sendEmail');

// @desc    Create document request
// @route   POST /api/document-requests
// @access  Public
exports.createDocumentRequest = async (req, res) => {
  try {
    const request = await DocumentRequest.create(req.body);

    // Send confirmation email
    await sendEmail({
      to: request.email,
      subject: 'Document Request Received',
      text: `Dear ${request.fullName},\n\nWe have received your request for ${request.documentType === 'transcript' ? 'an official transcript' : 'a character certificate'}.\n\nRequest ID: ${request._id}\nStatus: Pending\n\nWe will process your request within 3-5 business days.\n\nThank you,\nAcademic Records Office`
    });

    res.status(201).json({
      success: true,
      data: request
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Get all document requests (for admin)
// @route   GET /api/document-requests
// @access  Private/Admin
exports.getDocumentRequests = async (req, res) => {
  try {
    const requests = await DocumentRequest.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update document request status (for admin)
// @route   PUT /api/document-requests/:id
// @access  Private/Admin
exports.updateDocumentRequest = async (req, res) => {
  try {
    const request = await DocumentRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found'
      });
    }

    // Send status update email
    await sendEmail({
      to: request.email,
      subject: `Document Request ${request.status}`,
      text: `Dear ${request.fullName},\n\nThe status of your document request (ID: ${request._id}) has been updated to ${request.status}.\n\n${request.status === 'completed' ? 'Your document is ready for ' + (request.deliveryMethod === 'email' ? 'download from our portal.' : 'pickup at the records office.') : ''}\n\nThank you,\nAcademic Records Office`
    });

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};