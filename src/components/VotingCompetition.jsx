import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVoteYea, FaUserFriends, FaChartBar, FaTrophy } from 'react-icons/fa';

const VotingCompetition = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Sports Club', votes: 124, image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
    { id: 2, name: 'Drama Society', votes: 89, image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
    { id: 3, name: 'Music Club', votes: 156, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
    { id: 4, name: 'Debate Team', votes: 72, image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [votingEnded, setVotingEnded] = useState(false);

  // Simulate fetching voting status
  useEffect(() => {
    // In a real app, you would fetch this from your backend
    const timer = setTimeout(() => {
      setVotingEnded(false); // Set to true to simulate ended voting
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleVote = async () => {
    if (!selectedCandidate) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state (in a real app, this would be handled by the backend)
      setCandidates(prev => 
        prev.map(candidate => 
          candidate.id === selectedCandidate 
            ? { ...candidate, votes: candidate.votes + 1 } 
            : candidate
        )
      );
      
      setHasVoted(true);
    } catch (error) {
      console.error('Voting failed:', error);
      alert('Voting failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatePercentage = (votes) => {
    const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
    return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
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

  // Container style
  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2.5rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '900px',
    border: '1px solid rgba(226, 232, 240, 0.7)'
  };

  return (
    <div style={backgroundStyle}>
      <motion.div
        style={containerStyle}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex items-center mb-4">
          <FaVoteYea className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">College Club Elections</h2>
        </div>

        {votingEnded ? (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
              <FaTrophy className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Voting Has Ended</h2>
            <p className="text-gray-600 mt-2">The voting period for this election is now closed.</p>
            <button
              onClick={() => setShowResults(true)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              View Results
            </button>
          </div>
        ) : hasVoted || showResults ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaChartBar className="mr-2 text-blue-500" /> Election Results
              </h3>
              {!showResults && (
                <button 
                  onClick={() => setShowResults(false)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Back to voting
                </button>
              )}
            </div>

            <div className="space-y-4">
              {candidates
                .sort((a, b) => b.votes - a.votes)
                .map(candidate => (
                  <div key={candidate.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <img 
                        src={candidate.image} 
                        alt={candidate.name} 
                        className="h-12 w-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-medium text-gray-800">{candidate.name}</h4>
                          <span className="text-sm font-semibold text-blue-600">
                            {calculatePercentage(candidate.votes)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${calculatePercentage(candidate.votes)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">{candidate.votes} votes</span>
                          {candidate.votes === Math.max(...candidates.map(c => c.votes)) && (
                            <span className="text-xs font-semibold text-yellow-600 flex items-center">
                              <FaTrophy className="mr-1" /> Leading
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Total votes: {candidates.reduce((sum, candidate) => sum + candidate.votes, 0)}
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">Vote for your favorite college club or society</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {candidates.map(candidate => (
                <motion.div
                  key={candidate.id}
                  whileHover={{ scale: 1.02 }}
                  className={`border rounded-lg p-4 cursor-pointer transition ${selectedCandidate === candidate.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                  onClick={() => setSelectedCandidate(candidate.id)}
                >
                  <div className="flex items-center">
                    <img 
                      src={candidate.image} 
                      alt={candidate.name} 
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">{candidate.name}</h4>
                      <p className="text-sm text-gray-600">Current votes: {candidate.votes}</p>
                    </div>
                  </div>
                  {selectedCandidate === candidate.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200 flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                      <span className="text-sm font-medium text-blue-600">Selected</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <button
                  onClick={() => setShowResults(true)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <FaChartBar className="mr-2" /> View current results
                </button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVote}
                  disabled={!selectedCandidate || isSubmitting}
                  className={`py-3 px-6 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(!selectedCandidate || isSubmitting) ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaVoteYea className="mr-2" /> Submit Vote
                    </span>
                  )}
                </motion.button>
              </div>
            </div>
          </>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Voting Information</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className="flex items-start">
              <svg className="h-3 w-3 text-blue-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Each student can vote only once</span>
            </li>
            <li className="flex items-start">
              <svg className="h-3 w-3 text-blue-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Voting ends on June 30, 2023 at 5:00 PM</span>
            </li>
            <li className="flex items-start">
              <svg className="h-3 w-3 text-blue-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Results will be announced on the college notice board</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default VotingCompetition;