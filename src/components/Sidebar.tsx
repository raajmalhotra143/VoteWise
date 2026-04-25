
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-[#0e0e0e] font-headline antialiased p-6 gap-8 z-50 hidden md:flex">
      <NavLink to="/" className="text-2xl font-bold tracking-tighter text-[#1DB954]">Sonic Curator</NavLink>
      
      <nav className="flex flex-col gap-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex items-center gap-4 transition-colors duration-200 ${isActive ? 'text-[#1DB954] font-semibold' : 'text-gray-400 font-medium hover:text-white'}`}
        >
          <span className="material-symbols-outlined">home</span>
          <span>Home</span>
        </NavLink>
        
        <NavLink 
          to="/search" 
          className={({ isActive }) => `flex items-center gap-4 transition-colors duration-200 ${isActive ? 'text-[#1DB954] font-semibold' : 'text-gray-400 font-medium hover:text-white'}`}
        >
          <span className="material-symbols-outlined">search</span>
          <span>Search</span>
        </NavLink>
        
        <NavLink 
          to="/library" 
          className={({ isActive }) => `flex items-center gap-4 transition-colors duration-200 ${isActive ? 'text-[#1DB954] font-semibold' : 'text-gray-400 font-medium hover:text-white'}`}
        >
          <span className="material-symbols-outlined">library_music</span>
          <span>Your Library</span>
        </NavLink>
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <NavLink 
          to="/library" 
          className="flex items-center gap-4 text-gray-400 font-medium hover:text-white transition-colors duration-200"
        >
          <span className="material-symbols-outlined">add_box</span>
          <span>Create Playlist</span>
        </NavLink>
        <button className="flex items-center gap-4 text-gray-400 font-medium hover:text-white transition-colors duration-200">
          <span className="material-symbols-outlined">favorite</span>
          <span>Liked Songs</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
