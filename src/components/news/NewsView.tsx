import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Announcement } from '../../types';
import { Bell, Calendar, User, ArrowRight, Share2, Tag, Plus, Check } from 'lucide-react';

export const NewsView: React.FC = () => {
  const { announcements, userRole, setActivePage, showToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<Announcement | null>(null);

  const categories = ['all', 'Administrative', 'Academic', 'Opportunities', 'Events', 'NSBS News'];

  const filtered = announcements.filter(a => {
    if (!a.published) return false;
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  const copyShare = (ann: Announcement) => {
    navigator.clipboard.writeText(`${window.location.origin}/news#${ann.id}`);
    showToast(`Link for "${ann.title}" copied!`);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
              <Bell className="w-4 h-4 text-blue-900" />
              <span>NSBS Press & Information Directorate</span>
            </div>
            
            <h1 className="font-display-academic text-3xl sm:text-4xl font-bold text-slate-900">
              News, Announcements & Official Notices
            </h1>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Official communiqués from the Executive Council, Departmental Headship, and Student Representatives regarding continuous assessment timetables, society meetings, and congress resolutions.
            </p>
          </div>

          {userRole === 'admin' && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-amber-800 font-medium">
                Admin mode: You can draft, schedule, and publish announcements in the CMS.
              </span>
              <button
                onClick={() => setActivePage('admin-dashboard')}
                className="px-3 py-1.5 rounded bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Publish Announcement</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md font-medium capitalize whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Bulletins' : cat}
            </button>
          ))}
        </div>

        {/* Announcements List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ann) => (
            <article
              key={ann.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                  <span className={`font-semibold ${ann.priority === 'High' ? 'text-red-700' : 'text-blue-900'}`}>
                    {ann.category}
                  </span>
                  <span className="text-slate-400">{ann.date}</span>
                </div>

                <h3 className="font-display-academic text-lg font-bold text-slate-900 leading-snug">
                  {ann.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed font-serif-academic text-sm">
                  {ann.summary}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-600 font-medium truncate max-w-[150px]">
                  {ann.authorRole}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyShare(ann)}
                    className="p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    title="Share announcement link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveArticle(ann)}
                    className="px-3 py-1.5 rounded bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold"
                  >
                    Read Full Article
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-blue-900 uppercase">
                    {activeArticle.category} · {activeArticle.date}
                  </div>
                  <h2 className="font-display-academic text-2xl font-bold text-slate-900 mt-1">
                    {activeArticle.title}
                  </h2>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Issued by: {activeArticle.author} ({activeArticle.authorRole})
                  </div>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="text-slate-400 hover:text-slate-600 font-mono text-sm px-2 py-1 rounded bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif-academic text-base space-y-3 pt-2 whitespace-pre-line border-t border-slate-100">
                {activeArticle.content}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Official NSBS UDUS Document</span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-1.5 rounded bg-blue-900 text-white font-semibold"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
