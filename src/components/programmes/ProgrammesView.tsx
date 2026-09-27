import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Programme } from '../../types';
import { 
  Compass, 
  Calendar, 
  Target, 
  CheckCircle2, 
  Clock, 
  Users, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ProgrammesView: React.FC = () => {
  const { programmes, setActivePage } = useApp();

  const [selectedSemester, setSelectedSemester] = useState<'all' | 'First Semester' | 'Second Semester'>('all');
  const [activeModalProg, setActiveModalProg] = useState<Programme | null>(null);

  const filteredProgrammes = programmes.filter(p => {
    if (selectedSemester === 'all') return true;
    return p.semester === selectedSemester;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
              <Compass className="w-4 h-4 text-blue-900" />
              <span>NSBS UDUS 2026/2027 ADMINISTRATION</span>
            </div>
            
            <h1 className="font-display-academic text-3xl sm:text-4xl font-bold text-slate-900">
              Departmental Programme Ecosystem & Strategic Roadmap
            </h1>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore the 16 strategic flagship initiatives powering academic excellence, community outreach, and biotechnology innovation throughout the 2026/2027 academic session.
            </p>
          </div>
        </div>

        {/* Semester Filter Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedSemester('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              selectedSemester === 'all'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Programmes ({programmes.length})
          </button>
          <button
            onClick={() => setSelectedSemester('First Semester')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              selectedSemester === 'First Semester'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            First Semester Initiatives
          </button>
          <button
            onClick={() => setSelectedSemester('Second Semester')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              selectedSemester === 'Second Semester'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Second Semester Initiatives
          </button>
        </div>

        {/* Programmes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProgrammes.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={prog.bannerUrl}
                    alt={prog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0c2340]/90 text-white text-[11px] font-mono px-2.5 py-1 rounded backdrop-blur-sm">
                    {prog.semester}
                  </div>
                  <div className={`absolute top-3 right-3 text-[11px] font-semibold px-2 py-0.5 rounded ${prog.status === 'Active' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'}`}>
                    {prog.status}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs font-semibold text-blue-900 mb-1">
                    {prog.category}
                  </div>

                  <h3 className="font-display-academic text-lg font-bold text-slate-900 leading-snug">
                    {prog.title}
                  </h3>

                  <div className="text-xs italic text-slate-500 mt-1">
                    &ldquo;{prog.tagline}&rdquo;
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-800">Target: </span>
                      <span>{prog.targetAudience}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Coordinator: </span>
                      <span>{prog.coordinator}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveModalProg(prog)}
                  className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Read Full Charter & Activities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Full Programme Details */}
        {activeModalProg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono text-blue-900 font-bold uppercase">
                    {activeModalProg.semester} · {activeModalProg.category}
                  </div>
                  <h2 className="font-display-academic text-2xl font-bold text-slate-900 mt-1">
                    {activeModalProg.title}
                  </h2>
                  <p className="text-xs italic text-slate-500 mt-0.5">&ldquo;{activeModalProg.tagline}&rdquo;</p>
                </div>
                <button 
                  onClick={() => setActiveModalProg(null)}
                  className="text-slate-400 hover:text-slate-600 font-mono text-sm px-2 py-1 rounded bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif-academic text-base">
                {activeModalProg.description}
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-2">Key Objectives</h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {activeModalProg.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-2">Activities & Deliverables</h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {activeModalProg.keyActivities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-900 font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeModalProg.outcomes && activeModalProg.outcomes.length > 0 && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-950 mb-1">Documented Outcomes</h4>
                  <ul className="text-xs text-emerald-900 space-y-1">
                    {activeModalProg.outcomes.map((out, i) => (
                      <li key={i}>✓ {out}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div>
                  <span className="font-semibold text-slate-700">Coordinator: </span>
                  {activeModalProg.coordinator}
                </div>
                <button
                  onClick={() => setActiveModalProg(null)}
                  className="px-4 py-1.5 rounded bg-blue-900 text-white font-semibold"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
