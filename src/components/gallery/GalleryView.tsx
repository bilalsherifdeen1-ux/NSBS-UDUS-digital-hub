import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GalleryItem } from '../../types';
import { Image, Calendar, Tag, Plus, X, Maximize2 } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const { gallery, userRole, setActivePage } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = [
    'all',
    'Orientation',
    'Tutorials',
    'Webinars',
    'Outreach',
    'NSBS Week',
    'Career',
    'Research',
    'Executive Activities'
  ];

  const filtered = gallery.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
              <Image className="w-4 h-4 text-blue-900" />
              <span>NSBS Media Directorate</span>
            </div>
            
            <h1 className="font-display-academic text-3xl sm:text-4xl font-bold text-slate-900">
              Departmental Photographic &amp; Media Archive
            </h1>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Visual documentation capturing academic symposia, laboratory practical sessions, community health outreach missions, and the vibrant student life of Usmanu Danfodiyo University Biochemists.
            </p>
          </div>

          {userRole === 'admin' && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-amber-800 font-medium">
                Admin mode: You can upload photographs and create albums in the CMS.
              </span>
              <button
                onClick={() => setActivePage('admin-dashboard')}
                className="px-3 py-1.5 rounded bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Media Item</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Photographs' : cat}
            </button>
          ))}
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="h-60 w-full relative overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 rounded-full bg-white/90 text-slate-900 shadow">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-[#0c2340]/90 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-sm">
                  {item.category}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>{item.date}</span>
                </div>
                <h3 className="font-display-academic text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-xl max-w-3xl w-full overflow-hidden border border-slate-200 shadow-2xl flex flex-col">
              <div className="relative max-h-[60vh] bg-slate-950 flex items-center justify-center">
                <img
                  src={activeImage.imageUrl}
                  alt={activeImage.title}
                  className="max-h-[60vh] w-auto object-contain"
                />
                <button
                  onClick={() => setActiveImage(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-blue-900">{activeImage.category}</span>
                  <span>{activeImage.date}</span>
                </div>
                <h3 className="font-display-academic text-xl font-bold text-slate-900">
                  {activeImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif-academic text-base">
                  {activeImage.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
