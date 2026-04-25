const PlaylistDetail = () => {
  const tracks = [
    { id: 1, title: 'Midnight City Echoes', artist: 'Vector Graphics', album: 'Synthwave Sessions Vol. 4', duration: '4:20', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdHbt1ZbNTHsPLhMT62Aywf29IdI4NpZRwxdyTSIED7EM90eJrl87qnzxD1kt94y_ONNgDVT1HQMRqoZXtAfeKtxN6bTjXVSYAbPlev-EIYL7UinZo-3wShNzrMS5ilyRQX2PdIjfg3ETIZVrcfHJALLuauSGmZ_IMO9z-3fki3Irn_fjDmv3WaHusmu5edUKfxY8dVQ2dfOuNruWbhSPukMkjLrOe8p1zPIPcUx4E5wB03HK5RGBnaLWIsx-XI0iwyWNiabkkVIM' },
    { id: 2, title: 'Resonance in Blue', artist: 'Home', album: 'Odyssey', duration: '3:35', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMdrVu5IQTVs2zzoGAP3DVZvBohww46bnftcVm4oIEklpzDO2dpoTRhwPaxwOJSZy4uDLQLoB1WwZgy6BEs5_KWO4lBbX9d-3dUEUW2SM5atLOuMVqiaxElcf00xGaqwvq7FpriEfMnUVS3mepnbBhqDn5n2THszuyO33woGY-wflX1uCbpR8-jTgppzYjEgWc2JQZaThKFY0zmJMZfapy_xQE9wsas-8Jb2jvloh1rT1E2xk4h3jJIv_fJCrj7KwnipldrclNLWI' },
    { id: 3, title: 'Glittering Skyline', artist: 'Com Truise', album: 'Galactic Melt', duration: '5:12', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDb06aGk-pCtve0y6Rkti_P-IqAJsG5W08R0xLs7ujRXN9HY_VVF_ftlyTFO8_HKpOLfGAsN_tV94ZcLYY1xfsOL8jptRB4Gv0IFm3_XEoShNTSbihGL1Lep8Q3TlOMJVgpwpMx8CcsWjV4KXWx807CLx74_OgcbBeIIbuZ2Kx2KRdpsv_cNNL5tsPBfslb_sv54L_6-sAgpTOXjNuAlu8ZHagCAgkK2YmJu4f2rlocWgaT7xeSPWmZvsrN-a2inHQUmu95z-qi_nI' },
    { id: 4, title: 'Slow Motion Drive', artist: 'Kavinsky', album: 'OutRun', duration: '4:52', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfMYH2aFTOXFTcvjxlcHL4sRHY1UYZF4yJ8ssgYAUDqyNndGVW0-FLeEfIadsR7GUCrYo-uMN04Rr_3n6L7_jo7tMs-PghjGhthuZEXYMb7Z7Wc8i7CFfOl4kE0QA4mk2UXuOxVIFOMlWW1h38pIjpk0_MZ6Y7FV2_YSb4u5C9vsoaTLwVBeMuWMkjXuqJlb_5W0OA3BcJgIpV3dPC4sIfP3jiGk695RNv64EqNlFdtWnuKfYzi-n__VHcak2CMxM9Cihlz4EsF68' },
  ];

  return (
    <div className="pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-end p-6 md:p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjRZXi6jJK_BwceSgJKhyrxNNcgslUVT1bgp27nPgSN-RDYjQA1NSAaRsIuAEnyzLfE5Yl390ZI1LrLhv8T7bvpoIaUqSY4eOUyuM0C9g7AcxdywYaXMeNW8jYJjozGqqU7sikY_ZKVgdTZBbx6vjTua17BCF3sU2znJbJw2dH1y1U-MJ2z88t4orO_txM6OyBFKMFauTuG1jSPPlLznlcfujlQLwc5sm3pQzzOJNivOlL6JMm5VExd6zl-2p8Ir44U9BzRo3Q7Hc" 
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent"></div>
          <div className="absolute inset-0 bg-[#0e0e0e]/40 backdrop-blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-end gap-8 w-full max-w-7xl mx-auto">
          <div className="w-64 h-64 flex-shrink-0 shadow-2xl rounded-xl overflow-hidden group">
            <img 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo9DBFMdBRMoFl0nyWGW8R2vUKRS-1Uw7Qvu6eoIDZEAUdjdbgDsDYP-Qv4y-OUYXYyDU-GhXasO-6VR4wx9YrJ-8idOP5H7yzlSeQ-cVaUXqMccHep-cJi0oSCrXYKo7S1gSk1LIvWJ6EBsEgqZgu9IjGja-xas5lhmK6XY83qbIjZ9D-LmTXZ_ppfL4z4R9sknmn1tj1KDFjQED4aKHKUYQn5QbbtZ30dH_pUqioHyIqsQ1FjilisG9qYuRu_gGKWM9vH4NzPtE" 
              alt="Playlist Cover"
            />
          </div>
          <div className="flex-1 space-y-4">
            <span className="text-primary font-headline font-bold tracking-widest uppercase text-xs">Playlist</span>
            <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter text-white -ml-1">Vaporwave Dreams</h1>
            <p className="text-on-surface-variant max-w-2xl font-body text-lg leading-relaxed">
              A handpicked journey through the smoothest synth and chillwave beats for late-night introspection.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-white/60">
              <span className="text-white">The Sonic Curator</span>
              <span>•</span>
              <span>120 songs</span>
              <span>•</span>
              <span>approx. 6 hrs 45 min</span>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Bar */}
      <section className="sticky top-16 z-30 bg-[#0e0e0e]/80 backdrop-blur-md px-6 md:px-12 py-6 border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button className="bg-gradient-to-br from-primary to-primary-container w-14 h-14 rounded-full flex items-center justify-center text-black shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-3xl">favorite</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-3xl">more_horiz</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tracks List */}
      <section className="px-6 md:px-12 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-[48px_2fr_1fr_80px] gap-4 px-4 py-3 border-b border-outline-variant/10 text-on-surface-variant font-label text-xs uppercase tracking-widest sticky top-[152px] bg-background z-20">
          <div>#</div>
          <div>Title</div>
          <div className="hidden md:block">Album</div>
          <div className="text-right"><span className="material-symbols-outlined text-base">schedule</span></div>
        </div>
        
        <div className="mt-4 space-y-1">
          {tracks.map((track, idx) => (
            <div key={track.id} className="group grid grid-cols-[48px_2fr_1fr_80px] gap-4 px-4 py-3 items-center rounded-xl hover:bg-surface-container-highest transition-colors cursor-pointer">
              <div className="relative">
                <span className="text-on-surface-variant group-hover:opacity-0 transition-opacity">{idx + 1}</span>
                <span className="material-symbols-outlined absolute inset-0 opacity-0 group-hover:opacity-100 text-primary transition-opacity" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </div>
              <div className="flex items-center gap-4">
                <img className="w-10 h-10 rounded-lg object-cover" src={track.img} alt={track.title} />
                <div className="overflow-hidden">
                  <p className="text-white font-headline font-bold truncate">{track.title}</p>
                  <p className="text-on-surface-variant text-sm truncate">{track.artist}</p>
                </div>
              </div>
              <div className="hidden md:block text-on-surface-variant text-sm truncate">{track.album}</div>
              <div className="text-right text-on-surface-variant text-sm tabular-nums">{track.duration}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlaylistDetail;
