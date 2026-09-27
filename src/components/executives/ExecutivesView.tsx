import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Executive, AdministrationArchive } from '../../types';
import { 
  Users, 
  Mail, 
  Linkedin, 
  Phone, 
  CheckCircle2, 
  History, 
  Award, 
  ChevronRight, 
  ShieldCheck, 
  Plus,
  User,
  SlidersHorizontal,
  ChevronLeft
} from 'lucide-react';

export const ExecutivesView: React.FC = () => {
  const { executives, pastAdministrations, userRole, isAdminAuthenticated, setActivePage } = useApp();

  const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');
  const [selectedExecutive, setSelectedExecutive] = useState<Executive | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'swipe'>('grid');

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
              <Users className="w-4 h-4 text-blue-900" />
              <span>NSBS UDUS Leadership Directory</span>
            </div>
            
            <h1 className="font-display-academic text-3xl sm:text-4xl font-bold text-slate-900">
              The 2026/2027 Executive Council (19 Offices)
            </h1>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Meet the student leaders elected to steer the Nigerian Society of Biochemistry Students at Usmanu Danfodiyo University, Sokoto. Dedicated to academic excellence, digital innovation, research culture, and student welfare.
            </p>
          </div>

          {isAdminAuthenticated && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-amber-900 font-medium bg-amber-50 border border-amber-200 px-3 py-1 rounded-md">
                Admin mode active: You can configure names, positions, and upload pictures in Executive Settings.
              </span>
              <button
                onClick={() => setActivePage('admin-dashboard')}
                className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Open Executive Settings in Admin CMS</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab & View Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('current')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'current'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Current Administration (19 Executives)</span>
            </button>

            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'past'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Past Administrations</span>
            </button>
          </div>

          {activeTab === 'current' && (
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
              <span className="text-[11px] font-mono text-slate-500 px-2 hidden sm:inline">View Mode:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('swipe')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  viewMode === 'swipe' ? 'bg-blue-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Swipe Reel
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Current Executive Team */}
        {activeTab === 'current' && (
          <div className="space-y-6">
            
            {/* Swipe hint on touch devices */}
            <div className="text-xs text-slate-500 font-mono flex items-center justify-between">
              <span>Showing all 19 Constitutional Executive Positions</span>
              <span className="text-blue-900 font-semibold md:hidden">← Swipe horizontally to explore →</span>
            </div>

            {/* View Mode: Horizontal Swipe Reel */}
            {viewMode === 'swipe' ? (
              <div className="flex overflow-x-auto gap-4 pb-6 pt-1 px-1 snap-x snap-mandatory no-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0">
                {executives.map((exec) => (
                  <div
                    key={exec.id}
                    className="min-w-[280px] sm:min-w-[320px] max-w-[320px] shrink-0 snap-center bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Photo / Avatar */}
                      <div className="h-64 w-full relative overflow-hidden bg-slate-100 flex items-center justify-center">
                        {exec.photoUrl ? (
                          <img
                            src={exec.photoUrl}
                            alt={exec.name || exec.position}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#0c2340] to-blue-900 flex flex-col items-center justify-center text-white p-4">
                            <ShieldCheck className="w-16 h-16 text-amber-300 mb-2" />
                            <div className="font-display-academic font-bold text-sm text-center">NSBS UDUS</div>
                            <div className="text-[11px] text-blue-200 text-center font-mono">Office #{exec.order}</div>
                          </div>
                        )}
                        <div className="absolute top-2 left-2 bg-[#0c2340]/90 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-sm uppercase font-bold">
                          #{exec.order} · {exec.level}
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="text-xs font-mono font-bold text-blue-900 uppercase">
                          {exec.position}
                        </div>

                        <h3 className="font-display-academic text-base font-bold text-slate-900 mt-1 leading-snug">
                          {exec.name?.trim() ? exec.name : (
                            <span className="text-slate-400 italic font-normal text-xs">[Pending Council Update]</span>
                          )}
                        </h3>

                        <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                          {exec.portfolio}
                        </div>

                        <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                          {exec.biography}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                      <span className="text-[11px] text-slate-400 font-mono">Level: {exec.level}</span>
                      <button
                        onClick={() => setSelectedExecutive(exec)}
                        className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* View Mode: Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {executives.map((exec) => (
                  <div
                    key={exec.id}
                    className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm overflow-hidden flex flex-col justify-between transition-all"
                  >
                    <div>
                      {/* Photo / Avatar */}
                      <div className="h-60 w-full relative overflow-hidden bg-slate-100 flex items-center justify-center">
                        {exec.photoUrl ? (
                          <img
                            src={exec.photoUrl}
                            alt={exec.name || exec.position}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#0c2340] to-blue-900 flex flex-col items-center justify-center text-white p-4">
                            <ShieldCheck className="w-14 h-14 text-amber-300 mb-1.5" />
                            <div className="font-display-academic font-bold text-sm text-center">NSBS UDUS</div>
                            <div className="text-[10px] text-blue-200 text-center font-mono">Executive #{exec.order}</div>
                          </div>
                        )}
                        <div className="absolute top-2 left-2 bg-[#0c2340]/90 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-sm uppercase font-bold">
                          #{exec.order} · {exec.level}
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="text-xs font-mono font-bold text-blue-900 uppercase">
                          {exec.position}
                        </div>

                        <h3 className="font-display-academic text-base font-bold text-slate-900 mt-1 leading-snug">
                          {exec.name?.trim() ? exec.name : (
                            <span className="text-slate-400 italic font-normal text-xs">[Pending Council Update]</span>
                          )}
                        </h3>

                        <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                          {exec.portfolio}
                        </div>

                        <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                          {exec.biography}
                        </p>

                        <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                          <div className="font-semibold text-slate-700">Areas of Interest:</div>
                          <div className="truncate text-slate-600">{exec.areasOfInterest || 'Biochemical Sciences'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100/80 flex items-center justify-between mt-2">
                      <a
                        href={`mailto:${exec.email}`}
                        className="text-xs text-slate-500 hover:text-blue-900 flex items-center gap-1"
                        title={exec.email}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[120px]">Email</span>
                      </a>

                      <button
                        onClick={() => setSelectedExecutive(exec)}
                        className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                      >
                        <span>View Profile</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Past Administrations Archive */}
        {activeTab === 'past' && (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-950">
              <span className="font-bold">Administrative Continuity &amp; Handover Records: </span>
              In accordance with institutional guidelines, NSBS maintains comprehensive historical documentation of all past executive sessions, achievements, and hand-over files to guarantee seamless leadership transitions.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastAdministrations.map((admin) => (
                <div key={admin.session} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded">
                      {admin.session} Academic Session
                    </span>
                    <span className="text-xs text-slate-500">{admin.executivesCount} Council Members</span>
                  </div>

                  <div>
                    <h3 className="font-display-academic text-xl font-bold text-slate-900">
                      {admin.president}
                    </h3>
                    <div className="text-xs italic text-slate-500 mt-0.5">
                      Theme: &ldquo;{admin.theme}&rdquo;
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-serif-academic text-sm">
                    {admin.summary}
                  </p>

                  <div>
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Key Benchmark Achievements
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {admin.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{admin.documentsCount} Archived Constitutional Documents</span>
                    <span className="font-mono text-emerald-700 font-semibold">✓ Verified Archive</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Executive Detail Modal */}
        {selectedExecutive && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl animate-in zoom-in-95">
              
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    {selectedExecutive.photoUrl ? (
                      <img
                        src={selectedExecutive.photoUrl}
                        alt={selectedExecutive.name || selectedExecutive.position}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#0c2340] text-amber-300 flex items-center justify-center font-bold text-lg font-mono">
                        #{selectedExecutive.order}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-blue-900 uppercase">
                      Office #{selectedExecutive.order} · {selectedExecutive.level}
                    </div>
                    <h2 className="font-display-academic text-xl font-bold text-slate-900">
                      {selectedExecutive.name?.trim() ? selectedExecutive.name : '[Pending Council Update]'}
                    </h2>
                    <div className="text-xs text-slate-600 font-medium">
                      {selectedExecutive.position}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedExecutive(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Portfolio Scope
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-serif-academic text-sm">
                  {selectedExecutive.portfolio}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Biography &amp; Academic Focus
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedExecutive.biography}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Constitutional Responsibilities
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedExecutive.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`mailto:${selectedExecutive.email}`}
                  className="text-xs text-blue-900 font-semibold hover:underline flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  <span>{selectedExecutive.email}</span>
                </a>

                <button
                  onClick={() => setSelectedExecutive(null)}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
