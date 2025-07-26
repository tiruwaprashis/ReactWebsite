import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaUniversity, FaPaypal, FaBitcoin } from 'react-icons/fa';

const PaymentSource = () => {
  const [formData, setFormData] = useState({
    paymentSource: '',
    amount: '',
    studentId: '',
    paymentPurpose: 'tuition', // 'tuition', 'hostel', 'library', 'other'
    transactionNote: '',
    agreeTerms: false
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const paymentSources = [
    { id: 'credit_card', name: 'Credit Card', icon: <FaCreditCard className="mr-2" /> },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: <FaUniversity className="mr-2" /> },
    { id: 'paypal', name: 'PayPal', icon: <FaPaypal className="mr-2" /> },
    { id: 'crypto', name: 'Cryptocurrency', icon: <FaBitcoin className="mr-2" /> },
  ];

  const paymentPurposes = [
    { value: 'tuition', label: 'Tuition Fee' },
    { value: 'hostel', label: 'Hostel Fee' },
    { value: 'library', label: 'Library Fine' },
    { value: 'certificate', label: 'Certificate Fee' },
    { value: 'other', label: 'Other Fees' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a reference ID
      const refId = `PAY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setReferenceId(refId);
      
      // Reset form
      setFormData({
        paymentSource: '',
        amount: '',
        studentId: '',
        paymentPurpose: 'tuition',
        transactionNote: '',
        agreeTerms: false
      });
      
      setPaymentSuccess(true);
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const backgroundStyle = {
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), url(https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '1020px',
    backdropFilter: 'blur(4px)'
  };

  if (paymentSuccess) {
    return (
      <div style={backgroundStyle}>
        <motion.div 
          style={formStyle}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Payment Successful!</h2>
            <p className="text-gray-600 mt-2">Your payment has been processed successfully.</p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg inline-block">
              <p className="font-medium">Reference ID: <span className="text-blue-600">{referenceId}</span></p>
              <p className="text-sm text-gray-500 mt-1">Keep this for your records</p>
            </div>
            <div className="mt-6 space-x-3">
              <button
                onClick={() => setPaymentSuccess(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                Make Another Payment
              </button>
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-6 border border-gray-300 rounded-lg transition"
              >
                Download Receipt
              </button>
            </div>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Fee Payment Portal</h2>
        <p className="text-gray-600 mb-6">Pay your college fees securely</p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)*</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                min="0"
                step="0.01"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Purpose*</label>
            <select
              name="paymentPurpose"
              value={formData.paymentPurpose}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {paymentPurposes.map(purpose => (
                <option key={purpose.value} value={purpose.value}>
                  {purpose.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method*</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {paymentSources.map(source => (
                <label 
                  key={source.id} 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${formData.paymentSource === source.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                >
                  <input
                    type="radio"
                    name="paymentSource"
                    value={source.id}
                    checked={formData.paymentSource === source.id}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="ml-2 flex items-center text-gray-700">
                    {source.icon}
                    {source.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {formData.paymentSource === 'credit_card' && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Credit Card Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Card Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">CVV</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Note</label>
            <textarea
              name="transactionNote"
              value={formData.transactionNote}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Optional reference note for this payment"
            />
          </div>

          <div className="flex items-start">
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
                I authorize the college to process this payment.*
              </label>
              <p className="text-gray-500">All payments are final and non-refundable unless otherwise stated in college policy.</p>
            </div>
          </div>

          <div className="pt-2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isProcessing}
              className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </span>
              ) : 'Proceed to Payment'}
            </motion.button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Security</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <svg className="h-5 w-5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs">256-bit SSL Secure</span>
            </div>
            <div className="flex items-center text-gray-500">
              <svg className="h-5 w-5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs">PCI DSS Compliant</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSource;