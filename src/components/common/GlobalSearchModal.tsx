import React, { useState, useEffect } from 'react';
import { useApp, ActivePage } from '../../context/AppContext';
import { Search, X, BookOpen, Calendar, Bell, Briefcase, FileCode2, Users, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    resources, 
    events, 
    announcements, 
    opportunities, 
    researchProjects, 
    executives,
    setActivePage 
  } = useApp();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Ctrl+K or Cmd+K, Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchedResources = cleanQuery ? resources.filter(r => 
    r.title.toLowerCase().includes(cleanQuery) || 
    r.courseCode.toLowerCase().includes(cleanQuery) || 
    r.category.toLowerCase().includes(cleanQuery) ||
    r.tags.some(t => t.toLowerCase().includes(cleanQuery))
  ).slice(0, 4) : [];

  const matchedEvents = cleanQuery ? events.filter(e => 
    e.title.toLowerCase().includes(cleanQuery) || 
    e.description.toLowerCase().includes(cleanQuery) ||
    e.category.toLowerCase().includes(cleanQuery)
  ).slice(0, 3) : [];

  const matchedAnnouncements = cleanQuery ? announcements.filter(a => 
    a.title.toLowerCase().includes(cleanQuery) || 
    a.summary.toLowerCase().includes(cleanQuery)
  ).slice(0, 2) : [];

  const matchedOpportunities = cleanQuery ? opportunities.filter(o => 
    o.title.toLowerCase().includes(cleanQuery) || 
    o.organization.toLowerCase().includes(cleanQuery) ||
    o.type.toLowerCase().includes(cleanQuery)
  ).slice(0, 2) : [];

  const matchedExecutives = cleanQuery ? executives.filter(ex => 
    ex.name.toLowerCase().includes(cleanQuery) || 
    ex.position.toLowerCase().includes(cleanQuery)
  ).slice(0, 2) : [];

  const totalResults = matchedResources.length + matchedEvents.length + matchedAnnouncements.length + matchedOpportunities.length + matchedExecutives.length;

  const handleSelect = (page: ActivePage) => {
    setActivePage(page);
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources, lecture notes, events, scholarships, courses (e.g., 'BCH 401', 'Enzymology', 'PTDF')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-sm sm:text-base outline-none text-slate-900 placeholder-slate-400 bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 text-xs font-mono text-slate-500 bg-slate-100 hover:bg-slate-200 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!cleanQuery ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              <p className="font-medium text-slate-700">Instant Search Across the NSBS Academic Ecosystem</p>
              <p className="text-xs text-slate-400 mt-1">Try typing a course code (BCH 201, BCH 301, BCH 401), topic (Michaelis-Menten, Glycolysis), or opportunity.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                <button onClick={() => setQuery('BCH 301')} className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200">BCH 301</button>
                <button onClick={() => setQuery('Clinical')} className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200">Clinical Biochemistry</button>
                <button onClick={() => setQuery('Past Questions')} className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200">Past Questions</button>
                <button onClick={() => setQuery('Scholarship')} className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200">Scholarships</button>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              <p>No results found for &ldquo;<span className="font-semibold">{query}</span>&rdquo;.</p>
              <p className="text-xs text-slate-400 mt-1">Check for spelling or browse the Digital Library directly.</p>
            </div>
          ) : (
            <>
              {/* Resources Match */}
              {matchedResources.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Academic Resources & Textbooks</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedResources.map((res) => (
                      <div
                        key={res.id}
                        onClick={() => handleSelect('resources')}
                        className="p-2.5 rounded-lg hover:bg-blue-50/60 cursor-pointer border border-transparent hover:border-blue-200 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{res.title}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-blue-900 font-medium">{res.courseCode}</span>
                            <span>·</span>
                            <span>{res.level}</span>
                            <span>·</span>
                            <span>{res.category}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Match */}
              {matchedEvents.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Events & Programmes</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedEvents.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => handleSelect('events')}
                        className="p-2.5 rounded-lg hover:bg-emerald-50/60 cursor-pointer border border-transparent hover:border-emerald-200 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{evt.title}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{evt.date}</span>
                            <span>·</span>
                            <span>{evt.venue}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Opportunities Match */}
              {matchedOpportunities.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Scholarships & Grants</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedOpportunities.map((opp) => (
                      <div
                        key={opp.id}
                        onClick={() => handleSelect('opportunities')}
                        className="p-2.5 rounded-lg hover:bg-amber-50/60 cursor-pointer border border-transparent hover:border-amber-200 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{opp.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{opp.organization} · Deadline: {opp.deadline}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Executives Match */}
              {matchedExecutives.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Executive Leadership</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedExecutives.map((exec) => (
                      <div
                        key={exec.id}
                        onClick={() => handleSelect('executives')}
                        className="p-2.5 rounded-lg hover:bg-slate-100 cursor-pointer border border-transparent hover:border-slate-200 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{exec.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{exec.position} · {exec.level}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Search index updated live from CMS database</span>
          <span className="font-mono text-[10px]">NSBS UDUS v2.6</span>
        </div>
      </div>
    </div>
  );
};
