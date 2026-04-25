import { useState } from 'react';
import { Link } from 'react-router-dom';

const Library: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filters = ['Playlists', 'Artists', 'Albums', 'Podcasts'];
  
  return (
    <div className="p-8 pb-32 mt-16">
      <section className="mb-12">
        <div className="flex justify-between items-end mb-8">
          <h1 className="font-headline text-[3.5rem] font-extrabold tracking-[-0.04em] leading-tight text-white">Your Library</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1DB954] text-black font-bold px-6 py-2 rounded-full hover:scale-105 active:scale-95 transition-all mb-2"
          >
            Create Playlist
          </button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
          {filters.map((filter, idx) => (
            <button 
              key={idx} 
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105 ${idx === 0 ? 'bg-primary text-on-primary-container' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright hover:text-on-surface'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {/* Liked Songs - Featured Card */}
        <Link to="/playlist/liked" className="col-span-1 md:col-span-2 lg:col-span-2 group cursor-pointer">
          <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-surface-container-low transition-all duration-300 group-hover:scale-[1.02]">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQQovlFmBu6O0EIDTOhRj3toZx_1MMQUpB78Gin7wpVfXXjwuQMLGGoWzEfn6L46nyclCGDoVLRVKEb8nRlER4h1qroZHKsZr88PCR19n8Lf2a6ta6xiZZF1NzoWKNgTBzsDnQKWzJfU_SHXvMHj8ooatxgOR3tiA71C6Y-fHT9qvXg_vvrGfjmQeLjaV8p-Q0wjJbDTKWUME55vIJXMLL3ZIsVqTW9G5mICnvz2SQKbfwz2tpJr1M2NMgGCRX3IAhBdyrS6AsH0I" 
              alt="Liked Songs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="font-headline text-3xl font-bold mb-1 text-white">Liked Songs</h2>
              <p className="text-on-surface-variant text-sm">482 tracks • Updated 2h ago</p>
            </div>
            <div className="absolute bottom-6 right-6 w-14 h-14 bg-primary text-on-primary-container rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-2xl">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            </div>
          </div>
        </Link>

        {/* Regular Items */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Link key={i} to={`/playlist/${i}`} className="group cursor-pointer">
            <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-surface-container-low transition-all duration-300 group-hover:bg-surface-container-highest p-0 hover:p-3">
              <img 
                className="w-full h-full object-cover rounded-lg" 
                src={`https://lh3.googleusercontent.com/aida-public/${i % 2 === 0 ? 'AB6AXuC_Ibm81Mhxy4aqss08S5ISncVanw_Jw-QMZTQsNps7O955D4hxHsvetAphZ0DdOPAbVcsxJOz07dwwTH73G-Otj2w3-3x3mtldmLiHRKmWmL5WK5s9VV76N-Q-tDZ_TjZHrIGWEuPaWgnhEjBdolOPMJ54j71T01INU53yaQtAqVpaXxkC4vhuHfwOLe0ZrXErqVn5_43oA_OeUxOcngPG_qHOe4I8dkx1TVdHlY9f0DKH9NPZGlVdKpGhGzYYWFgX4xCGPorf9yI' : 'AB6AXuDuYrp_CtQF7QCQwXV9s1TLZaqPXumxiqsO07X5VgFFFqD07Q9bK--qn0r5OxwygBcvcz8_or4MyQmc-YvbtQlQ5xNfi4lDkGpiTZINwAIrWIAMbySgWTTz4xVoD6AzvC0NolOgLIfcH2BN29eLjBy7ex6X__58nAjmRQyWAPwbKnQ1JneqUaiZEYfddHij4ttNCn8-A-4oJeyIeY15LQyKAy35ij8tJJCq0l8A2x-6DzF05F3Ows9NmU2OkehFqpB0QKwqrYiYxs8'}`} 
                alt="Item"
              />
            </div>
            <h3 className="font-body font-semibold text-white group-hover:text-primary transition-colors">{i % 2 === 0 ? 'Midnight Jazz' : 'Neon Nights'}</h3>
            <p className="font-body text-xs text-on-surface-variant mt-1">Playlist • 48 Songs</p>
          </Link>
        ))}
      </div>

      {/* Create Playlist Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-xl bg-surface-container-high rounded-[12px] shadow-2xl border border-outline-variant/10 overflow-hidden flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="p-8 space-y-8 overflow-y-auto">
              <div className="text-center">
                <h2 className="text-3xl font-black font-headline tracking-tight text-white">Create Playlist</h2>
                <p className="text-on-surface-variant text-sm mt-1">Design the mood for your next session.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-48 shrink-0">
                  <div className="aspect-square bg-surface-container-highest rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 hover:border-primary-dim/50 transition-all group cursor-pointer relative overflow-hidden">
                    <span className="material-symbols-outlined text-4xl text-neutral-500 group-hover:text-primary">add_a_photo</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mt-2">Upload Cover</span>
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant px-1">Playlist Name</label>
                    <input className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-white placeholder:text-neutral-600 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" placeholder="My Awesome Mix" type="text" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant px-1">Description (optional)</label>
                    <textarea className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-white placeholder:text-neutral-600 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none" placeholder="Give your playlist a story..." rows={4}></textarea>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-outline-variant/10">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-full text-on-surface-variant hover:text-white font-bold text-sm transition-colors">Cancel</button>
                <button className="px-8 py-2.5 bg-[#1DB954] text-black font-extrabold rounded-full text-sm shadow-[0_0_20px_rgba(29,185,84,0.3)] transition-transform active:scale-95 hover:brightness-110">Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
