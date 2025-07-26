import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaCalendarAlt, FaMoneyBillWave, FaFileSignature } from 'react-icons/fa';

const ExamForm = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    semester: '',
    examType: 'regular', // 'regular' or 'reappear'
    selectedSubjects: [],
    agreeTerms: false,
    paymentMethod: 'online' // 'online' or 'offline'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const semesters = [
    { value: '1', label: 'Semester 1' },
    { value: '2', label: 'Semester 2' },
    { value: '3', label: 'Semester 3' },
    { value: '4', label: 'Semester 4' },
    { value: '5', label: 'Semester 5' },
    { value: '6', label: 'Semester 6' },
  ];

  const subjects = [
    { id: 'math101', name: 'Mathematics', code: 'MATH101' },
    { id: 'phy102', name: 'Physics', code: 'PHY102' },
    { id: 'chem103', name: 'Chemistry', code: 'CHEM103' },
    { id: 'eng104', name: 'English', code: 'ENG104' },
    { id: 'cs105', name: 'Computer Science', code: 'CS105' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubjectSelect = (subjectId) => {
    setFormData(prev => {
      if (prev.selectedSubjects.includes(subjectId)) {
        return {
          ...prev,
          selectedSubjects: prev.selectedSubjects.filter(id => id !== subjectId)
        };
      } else {
        return {
          ...prev,
          selectedSubjects: [...prev.selectedSubjects, subjectId]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate reference ID
      const refId = `EXAM-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setReferenceId(refId);
      setSubmitSuccess(true);
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit exam form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Background style - clean and professional
  const backgroundStyle = {
    backgroundColor: '#f8fafc',
    backgroundImage: 'linear-gradient(to bottom, rgba(241, 245, 249, 0.9), rgba(241, 245, 249, 1))',
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Form container style
  const formStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2.5rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '1000px',
    border: '1px solid rgba(226, 232, 240, 0.7)'
  };

  // Success message style
  const successStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '3rem 2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
    border: '1px solid rgba(226, 232, 240, 0.7)'
  };

  if (submitSuccess) {
    return (
      <div style={backgroundStyle}>
        <motion.div 
          style={successStyle}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center py-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <FaBook className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Exam Form Submitted!</h2>
            <p className="text-gray-600 mt-2">Your examination registration was successful.</p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg inline-block">
              <p className="font-medium">Reference ID: <span className="text-blue-600">{referenceId}</span></p>
              <p className="text-sm text-gray-500 mt-1">Keep this for your records</p>
            </div>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              Back to Dashboard
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
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex items-center mb-4">
          <FaBook className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Examination Registration</h2>
        </div>
        <p className="text-gray-600 mb-6">Register for your semester examinations</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID*</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter your student ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester*</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Semester</option>
                {semesters.map(sem => (
                  <option key={sem.value} value={sem.value}>{sem.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type*</label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="examType"
                    value="regular"
                    checked={formData.examType === 'regular'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="ml-2 text-gray-700">Regular</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="examType"
                    value="reappear"
                    checked={formData.examType === 'reappear'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Reappear</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Subjects*</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {subjects.map(subject => (
                <label 
                  key={subject.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${formData.selectedSubjects.includes(subject.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedSubjects.includes(subject.id)}
                    onChange={() => handleSubjectSelect(subject.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">
                    <span className="block font-medium">{subject.name}</span>
                    <span className="block text-xs text-gray-500">{subject.code}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method*</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
              <label className="inline-flex items-center p-3 border rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={formData.paymentMethod === 'online'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  required
                />
                <span className="ml-2 flex items-center text-gray-700">
                  <FaMoneyBillWave className="mr-2 text-green-500" />
                  Online Payment
                </span>
              </label>
              <label className="inline-flex items-center p-3 border rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="offline"
                  checked={formData.paymentMethod === 'offline'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 flex items-center text-gray-700">
                  <FaFileSignature className="mr-2 text-blue-500" />
                  Offline Payment (College Office)
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-start pt-2">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">
                I certify that all information provided is correct and I agree to the examination rules.*
              </label>
              <p className="text-gray-500">Late submissions may incur additional fees.</p>
            </div>
          </div>

          <div className="pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || formData.selectedSubjects.length === 0}
              className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(isSubmitting || formData.selectedSubjects.length === 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : 'Submit Examination Form'}
            </motion.button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Important Notes</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className="flex items-start">
              <svg className="h-3 w-3 text-blue-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Examination fee: ₹500 per subject (Regular), ₹700 per subject (Reappear)</span>
            </li>
            <li className="flex items-start">
              <svg className="h-3 w-3 text-blue-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Forms submitted after the deadline will be charged a late fee of ₹200</span>
            </li>
            <li className="flex items-start">
              <svg className="h-3 w-3 text-blue-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Bring your student ID and admit card to the examination center</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ExamForm;