import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, ExternalLink, Download, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';

export const HomeResourcesPreview: React.FC = () => {
  const { resources, setActivePage, incrementDownload, toggleBookmark, bookmarkedResourceIds } = useApp();

  const featuredResources = resources
    .filter(r => r.published && r.featured)
    .slice(0, 4);

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-900 mb-1">
              Curriculum & Repositories
            </div>
            <h2 className="font-display-academic text-2xl sm:text-3xl font-bold text-slate-900">
              Featured Biochemistry Resources & Handouts
            </h2>
          </div>
          <button
            onClick={() => setActivePage('resources')}
            className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore All Digital Resources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Resources Grid / Mobile Swipe Reel */}
        <div className="flex lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar pb-3 -mx-4 sm:mx-0 px-4 sm:px-0">
          {featuredResources.map((res) => {
            const isBookmarked = bookmarkedResourceIds.includes(res.id);

            return (
              <div
                key={res.id}
                className="min-w-[270px] sm:min-w-[300px] lg:min-w-0 shrink-0 lg:shrink snap-center rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all p-5 flex flex-col justify-between bg-slate-50/40"
              >
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-mono font-bold text-blue-900">{res.courseCode}</span>
                    <span className="text-slate-400">{res.level}</span>
                  </div>

                  <h3 className="font-display-academic text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {res.title}
                  </h3>

                  <div className="text-xs text-slate-500 mt-1">
                    {res.category} · {res.author}
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
                    <span>{res.fileType} · {res.fileSize}</span>
                    <span>{res.downloadsCount} accesses</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={res.googleDriveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => incrementDownload(res.id)}
                      className="flex-1 py-1.5 px-3 rounded bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Access File</span>
                    </a>
                    
                    <button
                      onClick={() => toggleBookmark(res.id)}
                      className={`p-1.5 rounded border transition-colors ${
                        isBookmarked 
                          ? 'bg-amber-50 text-amber-600 border-amber-300' 
                          : 'text-slate-400 border-slate-200 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Save to bookmarks'}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
