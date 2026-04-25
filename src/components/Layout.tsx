
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import BottomPlayer from './BottomPlayer';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:pl-64 flex flex-col min-h-screen">
        <TopNav />
        <main className="flex-1 pb-32">
          <Outlet />
        </main>
      </div>
      <BottomPlayer />
    </div>
  );
};

export default Layout;
