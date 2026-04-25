

const TopNav: React.FC = () => {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 z-40 bg-[#0e0e0e]/80 backdrop-blur-xl flex justify-between items-center px-8 w-full font-body text-sm">
      <div className="flex items-center gap-4 w-1/3">
        <div className="bg-surface-container-highest rounded-full px-4 py-2 flex items-center gap-3 w-full max-w-md">
          <span className="material-symbols-outlined text-on-surface-variant">search</span>
          <input 
            className="bg-transparent border-none focus:ring-0 text-on-surface w-full placeholder:text-on-surface-variant outline-none" 
            placeholder="What do you want to listen to?" 
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:bg-white/10 rounded-full p-2 transition-all active:scale-95">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-gray-400 hover:bg-white/10 rounded-full p-2 transition-all active:scale-95">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="h-8 w-8 rounded-full overflow-hidden bg-surface-container-highest">
          <img 
            alt="User Avatar" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAASR0JPebmCTK-TSBVvbRs0omY0xpLSAkFiXZCIhmmrJWCfQqQyx9n2sp0NYoSC5Z72SA8qKIUTf84NxMwa_f43gx2KOL5vVKUbjl6mzesgR4W34GbP5mzy9y0edMs77EVYHeWmpVw40fkItlHih8FVJVmRJozth6G-0Gf_Y0Qo2zQykUDsmrX7jU6k2yPs5iEUBBTZNsRaEEdv2l1E4S2eV_JBAo2qYY_LV8JbWX4GLhbHJAKikdUPS08zADD-PPagG6t2PAFIoY"
          />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
