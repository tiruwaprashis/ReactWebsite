import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ProposalForm() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const selectedFile = files[0];
      if (selectedFile && selectedFile.type !== 'application/pdf') {
        alert('Please upload a PDF file only.');
        return;
      }
      setFormData((prev) => ({ ...prev, file: selectedFile }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { title, company, description, file } = formData;

    if (!title || !company || !description || !file) {
      alert('Please fill in all fields and upload a PDF file.');
      setIsSubmitting(false);
      return;
    }

    const form = new FormData();
    form.append('title', title);
    form.append('company', company);
    form.append('description', description);
    form.append('proposal', file);

    try {
      const response = await fetch('http://localhost:5000/api/proposals', {
        method: 'POST',
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ title: '', company: '', description: '', file: null });
      } else {
        alert(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const backgroundStyle = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: '12px',
    padding: '2.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '640px',
    backdropFilter: 'blur(4px)'
  };

  if (submitSuccess) {
    return (
      <div style={backgroundStyle}>
        <motion.div 
          style={formStyle}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center py-8">
            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Proposal Submitted Successfully!</h2>
            <p className="text-gray-600 mt-2">Your proposal has been received. We'll review it and get back to you soon.</p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              Submit Another Proposal
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle}>
      <motion.div
        style={formStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Digital Proposal Submission</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proposal Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attach PDF Proposal*</label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                name="file"
                id="file-upload"
                accept="application/pdf"
                onChange={handleChange}
                className="sr-only"
                required
              />
              <label
                htmlFor="file-upload"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                Choose File
              </label>
              <span className="ml-3 text-sm text-gray-500">
                {formData.file ? formData.file.name : 'No file chosen'}
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : 'Submit Proposal'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default ProposalForm;