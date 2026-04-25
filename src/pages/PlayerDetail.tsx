const PlayerDetail = () => {
  return (
    <div className="h-screen overflow-y-auto px-12 mt-16">
      <div className="max-w-7xl mx-auto h-full grid grid-cols-12 gap-12 items-center">
        {/* Left Side: Editorial Album Presentation */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
          <div className="relative group">
            {/* Subtle Glow Background */}
            <div className="absolute -inset-8 bg-primary/10 blur-[120px] rounded-full opacity-50"></div>
            <div className="relative aspect-square w-full max-w-[600px] overflow-hidden rounded-3xl shadow-2xl">
              <img 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXrex_89jCJn_O-Nhjstf0Nbn1igOIKKmzpKixcAmxG_sMNPB3rRBYe8iijGhv_QWIY_JHaU94s8DpFQT3e8qIMcnyXTk5FkCeBTXcIZgaXdFur-Bze_B7E8rShvvZG8x3PbTkJBdDVnytfoOqeySxpdduYU3VKb5KWjrnLPFoD_bgm7xV6AdblngFK8eScMCsP77PuV2fFzK5idhdS0HiBobB3D5OasnHzpGy0ZskSh0cSgL0JS7MQlbihGPhX-DGkEEOHCtViW4" 
                alt="Album Art"
              />
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <h1 className="font-headline font-extrabold text-[3.5rem] leading-[1.1] -tracking-[0.04em] text-white">
              Midnight Protocol
            </h1>
            <div className="flex items-center gap-3">
              <p className="font-body text-xl text-primary font-medium">Neural Static</p>
              <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/30"></span>
              <p className="font-body text-lg text-on-surface-variant">Cybernetic Dreams (2024)</p>
            </div>
          </div>
        </div>

        {/* Right Side: Lyrics & Metadata */}
        <div className="col-span-12 lg:col-span-5 h-[500px] flex flex-col">
          <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col h-full border border-outline-variant/10">
            <div className="flex justify-between items-center mb-8 text-white">
              <h2 className="font-headline text-xl font-bold">Lyrics</h2>
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined text-primary">open_in_full</span>
              </button>
            </div>
            <div className="flex-grow overflow-y-auto space-y-6 pr-4 hide-scrollbar">
              <p className="text-2xl font-bold text-white opacity-40 leading-snug">Synthesize the morning light</p>
              <p className="text-3xl font-bold text-white leading-snug">Watching as the circuits fray</p>
              <p className="text-2xl font-bold text-white opacity-40 leading-snug">A ghost inside the neon night</p>
              <p className="text-2xl font-bold text-white opacity-40 leading-snug">Fading as we drift away</p>
              <p className="text-2xl font-bold text-white opacity-40 leading-snug">Protocol is broken now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
