import React from 'react';
import { useApp } from '../../context/AppContext';
import { Quote, ArrowRight, Award, ShieldCheck } from 'lucide-react';

export const HomePresidentMessage: React.FC = () => {
  const { siteSettings, executives, setActivePage } = useApp();

  const presidentExec = executives.find(e => e.position.toLowerCase() === 'president') || executives[0];
  const displayName = presidentExec?.name?.trim() ? presidentExec.name : (siteSettings.presidentName || 'Office of the President');
  const displayPhoto = presidentExec?.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
  const displayLevel = presidentExec?.level || '400L';

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* President Portrait & Formal Credentials */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden border-2 border-blue-900/20 shadow-md bg-slate-100 flex items-center justify-center">
                  {presidentExec?.photoUrl ? (
                    <img
                      src={displayPhoto}
                      alt={displayName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0c2340] to-blue-900 flex flex-col items-center justify-center text-white p-4">
                      <ShieldCheck className="w-16 h-16 text-amber-300 mb-2" />
                      <div className="font-display-academic font-bold text-sm text-center">NSBS UDUS</div>
                      <div className="text-[11px] text-blue-200 text-center font-mono">Office of the President</div>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0c2340] text-amber-300 text-[10px] font-mono px-3 py-1 rounded shadow uppercase font-bold tracking-wider whitespace-nowrap">
                  President 2026/2027
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-display-academic text-lg font-bold text-slate-900">
                  {displayName}
                </h3>
                <div className="text-xs text-blue-900 font-semibold mt-0.5">
                  President, NSBS UDUS Chapter
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Department of Biochemistry · {displayLevel}
                </div>
              </div>
            </div>

            {/* Presidential Address */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
                <Quote className="w-4 h-4 text-blue-900" />
                <span>Executive Council Address</span>
              </div>

              <h2 className="font-display-academic text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                Fostering Scientific Curiosity, Academic Rigor & Community Solidarity
              </h2>

              <div className="text-sm text-slate-600 space-y-3 leading-relaxed font-serif-academic text-base">
                {siteSettings.presidentMessage.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActivePage('executives')}
                  className="px-4 py-2 rounded bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Meet the Full 2026/2027 Executive Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                
                <button
                  onClick={() => setActivePage('about')}
                  className="px-4 py-2 rounded border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Read Society Constitution & Objectives
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
