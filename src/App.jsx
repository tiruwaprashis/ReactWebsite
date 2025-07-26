// App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Layout from './layout/Layout';
import ProposalForm from './components/ProposalForm';
import DocumentApplicationForm from './components/DocumentApplicationForm';
import PaymentSource from './components/PaymentSource';
import ExamForm from './components/ExamForm';
import VotingCompetition from './components/VotingCompetition';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="submit-proposal" element={<ProposalForm />} />
        <Route path="document-application" element={<DocumentApplicationForm />} />
        <Route path="submit-payment" element={<PaymentSource />} />
        <Route path="submit-examform" element={<ExamForm />} />
        <Route path="submit-voting" element={<VotingCompetition />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
