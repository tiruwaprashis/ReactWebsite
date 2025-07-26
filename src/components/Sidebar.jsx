import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-blue-900 text-white h-full p-5">
      <h1 className="text-xl font-bold mb-6">Active Academy</h1>
      <nav>
        <Link to="/" className="block py-2 hover:bg-blue-700 px-3 rounded">Dashboard</Link>
        <Link to="/students" className="block py-2 hover:bg-blue-700 px-3 rounded">Students</Link>
        <Link to="/submit-proposal" className="block py-2 hover:bg-blue-700 px-3 rounded">Submit Proposal</Link>
        <Link to="/document-application" className="block py-2 hover:bg-blue -700 px-3 rounded">Document Application</Link>
        <Link to="/submit-payment" className="block py-2 hover:bg-blue-700 px-3 rounded">Submit Payment</Link>
        <Link to="/submit-examform" className="block py-2 hover:bg-blue-700 px-3 rounded">Exam Form</Link>
         <Link to="/submit-voting" className="block py-2 hover:bg-blue-700 px-3 rounded">Voting Competation</Link>
      
      </nav>
    </div>
  );
}

export default Sidebar;
