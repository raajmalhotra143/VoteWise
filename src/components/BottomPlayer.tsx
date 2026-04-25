

import { Link } from 'react-router-dom';

const BottomPlayer: React.FC = () => {
  return (
    <footer className="fixed bottom-4 left-4 right-4 md:left-64 h-24 rounded-3xl z-50 glassmorphism shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between px-8">
      {/* Currently Playing */}
      <div className="flex items-center gap-4 w-1/4">
        <Link to="/player" className="flex items-center gap-4 overflow-hidden group">
          <img 
            className="w-14 h-14 rounded-lg shadow-lg flex-shrink-0 transition-transform group-hover:scale-105" 
            alt="Currently Playing"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNjThfLO-vPJJdCXe1pxr1k2FK50_vaPKYjbujeXOcxhS8BU7r9kvhr-hJWA_Ut9tzmQ1VoJDiIDu0XFmjo7fI6FOtp6V6sFuPRZ9h0zVErxO5B9a-QoebgClxAWZgqL9NvflewtNZ-DPE3Fb97jhM6xv_h4o08ZSdAYFjrmSdE9vOBioSpPOdhKJRL4DN2kKho_gd_i5Oi6cqIKx1mgogzwySTW75GP92nlbOhBIUizBUJZ3dn0kxVzn0qbVRJNX1ZsYee2seyIM" 
          />
          <div className="overflow-hidden hidden sm:block">
            <h4 className="text-sm font-bold text-white truncate group-hover:underline">Late Night Feelings</h4>
            <p className="text-xs text-gray-400 truncate">Neon Syndicate</p>
          </div>
        </Link>
        <button className="text-primary hover:scale-110 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2 w-2/4">
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white transition-colors"><span className="material-symbols-outlined">shuffle</span></button>
          <button className="text-white hover:text-primary transition-colors"><span className="material-symbols-outlined">skip_previous</span></button>
          <button className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </button>
          <button className="text-white hover:text-primary transition-colors"><span className="material-symbols-outlined">skip_next</span></button>
          <button className="text-gray-400 hover:text-white transition-colors"><span className="material-symbols-outlined">repeat</span></button>
        </div>
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] text-gray-400 tabular-nums">1:24</span>
          <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden group">
            <div className="absolute inset-y-0 left-0 bg-primary w-1/3 rounded-full transition-all group-hover:bg-primary-dim"></div>
          </div>
          <span className="text-[10px] text-gray-400 tabular-nums">4:32</span>
        </div>
      </div>

      {/* Extra Controls */}
      <div className="flex items-center justify-end gap-4 w-1/4 hidden lg:flex">
        <button className="text-gray-400 hover:text-white"><span className="material-symbols-outlined">mic</span></button>
        <button className="text-gray-400 hover:text-white"><span className="material-symbols-outlined">queue_music</span></button>
        <div className="flex items-center gap-2 w-32">
          <span className="material-symbols-outlined text-gray-400 text-sm">volume_up</span>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="bg-white h-full w-2/3 hover:bg-primary transition-colors"></div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white"><span className="material-symbols-outlined">open_in_full</span></button>
      </div>
    </footer>
  );
};

export default BottomPlayer;
