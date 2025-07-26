import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Topbar />
        <main className="p-4 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


export default Layout;
