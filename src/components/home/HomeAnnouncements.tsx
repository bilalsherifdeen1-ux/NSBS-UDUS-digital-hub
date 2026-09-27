import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, ArrowRight, Calendar, User, FileText } from 'lucide-react';

export const HomeAnnouncements: React.FC = () => {
  const { announcements, setActivePage } = useApp();
  const publishedAnnouncements = announcements.filter(a => a.published).slice(0, 3);

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-900 mb-1">
              Official Communications
            </div>
            <h2 className="font-display-academic text-2xl sm:text-3xl font-bold text-slate-900">
              Latest Announcements & Departmental Notices
            </h2>
          </div>
          <button
            onClick={() => setActivePage('news')}
            className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All Announcements</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedAnnouncements.map((ann) => (
            <article 
              key={ann.id}
              onClick={() => setActivePage('news')}
              className="p-5 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all bg-slate-50/50 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Unboxed Metadata Header (Anti-Pill Rule) */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className={`font-semibold ${ann.priority === 'High' ? 'text-red-700' : 'text-blue-900'}`}>
                    {ann.category}
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>{ann.date}</span>
                  </span>
                </div>

                <h3 className="font-display-academic text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                  {ann.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {ann.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>{ann.authorRole}</span>
                </span>
                <span className="text-blue-900 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
