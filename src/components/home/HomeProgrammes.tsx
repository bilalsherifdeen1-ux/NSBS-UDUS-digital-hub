import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Compass, CheckCircle2, Target } from 'lucide-react';

export const HomeProgrammes: React.FC = () => {
  const { programmes, siteSettings, setActivePage } = useApp();

  const featuredProgrammes = programmes.slice(0, 3);

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-900 mb-1">
              {siteSettings.session.replace(/\s*Academic Session$/i, '')} Action Plan
            </div>
            <h2 className="font-display-academic text-2xl sm:text-3xl font-bold text-slate-900">
              Flagship NSBS Strategic Programmes
            </h2>
          </div>
          <button
            onClick={() => setActivePage('programmes')}
            className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore All 16 Programmes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Programmes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProgrammes.map((prog) => (
            <div
              key={prog.id}
              className="rounded-lg border border-slate-200 hover:border-slate-300 shadow-sm overflow-hidden flex flex-col justify-between bg-white"
            >
              <div>
                <div className="h-44 w-full overflow-hidden relative bg-slate-100">
                  <img
                    src={prog.bannerUrl}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0c2340]/90 text-white text-[11px] font-mono px-2.5 py-1 rounded">
                    {prog.semester}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs font-semibold text-blue-900 mb-1">
                    {prog.category}
                  </div>

                  <h3 className="font-display-academic text-lg font-bold text-slate-900 leading-snug">
                    {prog.title}
                  </h3>

                  <div className="text-xs italic text-slate-500 mt-1">
                    &ldquo;{prog.tagline}&rdquo;
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-700">Target Audience:</div>
                    <div className="text-xs text-slate-500">{prog.targetAudience}</div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setActivePage('programmes')}
                  className="w-full py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Details & Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
