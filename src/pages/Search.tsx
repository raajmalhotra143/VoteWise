

import { Link } from 'react-router-dom';

const Search: React.FC = () => {
  const categories = [
    { name: 'Pop', color: 'bg-gradient-to-br from-primary-container to-secondary-container', large: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr3DdzNSYGKba_r5olQBH8DvHbABkvH1KdXSLx9gNtUIIDp-TjzuIeWstDvcgjkzSMdxPumF7t5BlQPstrQCJmWeBB24cyxGrG6JADfcZ8KkqOxNO1a2HxCn4OAPjXUnCinWMl7azj3MxXPPOi_LOjlUOmYtATy1mndRZizGxu1ku00pIrnjAiyzhbodYIFsYDfslE_osLR0cNGxcVlLocYUIXl6_V2CyHAFCJ3hd1p0opZDhD3owJxXjFAKxgnTThWMcrou4WzOg' },
    { name: 'Hip-Hop', color: 'bg-on-primary-fixed-variant', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLamEPKUOTidT62Vqz6Ef3-jAUpYEb4eAvDj1FUn4zt600L2hLMlNd-kzju1Kh0gNsXvNFWR_ytX65R0NVBAGSr4pEjqJvurZ1TTlAMaymLZAGhyvG0CB9ORXZfJKdOvKJwIfmAO-MWx1uHi0fC8BMX-SgnlMwQYrhOIR1PKSITkE8jriFCpzLUWzmq_fSo5UYKttLu48ZO8AShwWM71aRPj3qLuAEcIGWqodhC-LtDgkMDjoAE00N793MhlyNk4dnSUMaL9mlkt0' },
    { name: 'Rock', color: 'bg-error-container', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwTeK3WIS5ynZyoSlxj2vjtKqlgFokmWqs_NMwEcSPSzTufgYx_WhIy2f0YOOaoHRqoujD5YgG4ChgVzW2oqfXRIyr5e1WCmAamHXu1K8q0wZDp419T0SkAd1A1NIhqoqKtoKHNHZcuIqt5Nj8STxpkEhc_32qBdr0Y9Qz2rdlW55iWau4cPUrr9TfhBda9dce4Lqn9aJha6Ocp2WXwtACkaKz1kqwPrEvu-eiYojCnOkF_5I1O1xHqsKKN99AyhuygLEM4qA1FqA' },
    { name: 'Jazz', color: 'bg-on-tertiary-fixed-variant', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmCWbhI66jVQ5xdTZ2H_AvaZWMnSzKxSGujuPaA5SfhKEEtdGRMLbpORtHBYVqA-op_cKvBKF3sXid90YqN3n3GAZ-jo-ZKh4vhQCSMLGTc3Oabb40k0l2QjFXP8FhgJL4yBUkhmQ_lPiqLGFK2GtiGv1iyr9W__7bChDXfPgivY5XR4Bzgjbq8PtLkTssvA5KfqPORr4WLNJPIxO1Xur2bPrm2eW04UBYKLkWpETypNgipJmtUuSFp_sIMbFK_uNoBO0p2Vfjxso' },
    { name: 'Podcasts', color: 'bg-tertiary-container', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClTurf8b9ony5DDt6ai54ZhoVtUVpX7W7UmOZiz8sPbQUnd3HZCVY_B7ZkwsU2O2YIVWDNc4ceySVyYA9rnhGpqaU2Hc99vNAlU8mj5HdYl1imyj-UHFIb5o-bgphVV-YgDUUuupzb9m1V5yS6Ph391GUstcPZETqAxGZu6ILCP3TVKWZ4LXi67mKghjdUNwZXEEo-DgHZFJW1Cc7BZh6qJn_qZii__Bh7H_bfpU2toy-RM9z4zxK5zBFsXJQP4iBvM03pXfWl4fM' },
    { name: 'Electronic', color: 'bg-[#2b2b2b]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDj1W7bk22ZHz6wvAPJT_0Y2Qrig5m106s2mmvlGRo642trLTiOtyynLXl-u7WkFDZUq8ShwS6Fb1T3vnAmFvrvYzQTfM50kI_9bnQgQJ74TmZy6fh2GKceStVMeOoZFHmQuxamPClT2vmvdYYSNaVyJK8k3xDi3OQQtFPS5f2IgjapSrdWxvpZiP5_kD46PVhhHxwkdgqHX9ADt36WUfE16e7fZXqyLpwAROm3N_-ZV9PEBGtzYBbyYxOFBpG5Ru6SPMmeUhMat0' },
    { name: 'R&B', color: 'bg-[#450900]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo0UVriCyn0M5Z0dMPZ8rsCDUpLBpTmEHS7KaKBpY2DGsl_FO2BEIKp3LpQDB_5hOtXOLL38inBzg8iVnwI63pl7ugZ_jl3wwIF5OP2W2eB8gA9pySNOrrIx6mRtdGxGahZXqO9-0GkPv_9s_F8nx2B3iA9NUGhIcNk001ZILe0YVPoibbjbBZszWg2f4yPxtO2F9JXMnuLgeb9elgbvo1rOEeKod73qX7bYFJ0pezWNbmNTZYF6JLbkf6WgW_7NzOedUOCJL47ig' },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto mt-16">
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-on-surface font-headline font-extrabold text-5xl tracking-tight mb-2 text-white">Search</h1>
            <p className="text-on-surface-variant font-body text-white/60">Discover your next favorite sound</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              to="/playlist/1"
              className={`group relative ${cat.large ? 'sm:col-span-2 row-span-2 h-[420px]' : 'h-[200px]'} rounded-xl overflow-hidden ${cat.color} hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}
            >
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between text-white">
                <h2 className={`text-white font-headline font-extrabold ${cat.large ? 'text-6xl' : 'text-2xl'} tracking-tighter`}>{cat.name}</h2>
                {cat.large && (
                  <div className="flex items-center gap-2 text-white/90 font-medium bg-black/20 backdrop-blur-md self-start px-4 py-2 rounded-full text-sm">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    Trending Now
                  </div>
                )}
              </div>
              <img 
                src={cat.img} 
                alt={cat.name} 
                className={`absolute ${cat.large ? 'inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay' : '-bottom-4 -right-4 w-32 h-32 rotate-[25deg] group-hover:rotate-[15deg] transition-transform duration-300'}`}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Search;
