import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Resource, AcademicLevel, ResourceCategory } from '../../types';
import { 
  BookOpen, 
  Search, 
  Download, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  AlertCircle, 
  Filter, 
  FileText, 
  ArrowUpDown,
  CheckCircle2,
  X,
  Plus
} from 'lucide-react';

const CATEGORIES: ResourceCategory[] = [
  'Handouts',
  'Textbooks',
  'Lecture Notes',
  'Journals',
  'Research Papers',
  'Past Questions',
  'Practical Manuals',
  'Laboratory Guides',
  'Seminar Materials',
  'Final-Year Project Resources',
  'Clinical Biochemistry',
  'Molecular Biology',
  'Enzymology',
  'Metabolism',
  'Genetics',
  'Immunology',
  'Pharmacology',
  'Analytical Biochemistry',
  'Food Biochemistry',
  'Industrial Biochemistry'
];

const LEVELS: AcademicLevel[] = ['100L', '200L', '300L', '400L', 'General'];

export const LibraryView: React.FC = () => {
  const { 
    resources, 
    incrementDownload, 
    toggleBookmark, 
    bookmarkedResourceIds, 
    reportBrokenLink, 
    userRole,
    setActivePage 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'downloads' | 'title'>('newest');
  const [reportingResource, setReportingResource] = useState<Resource | null>(null);
  const [reportReason, setReportReason] = useState('');

  // Filtered and sorted resources
  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      if (!res.published) return false;
      
      const matchesSearch = 
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLevel = selectedLevel === 'all' || res.level === selectedLevel;
      const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;

      return matchesSearch && matchesLevel && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
      if (sortBy === 'downloads') {
        return b.downloadsCount - a.downloadsCount;
      }
      return a.title.localeCompare(b.title);
    });
  }, [resources, searchQuery, selectedLevel, selectedCategory, sortBy]);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingResource) return;
    reportBrokenLink(reportingResource.id, reportReason || 'Link inaccessible or requires unauthorized permissions.');
    setReportingResource(null);
    setReportReason('');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Academic Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-blue-900" />
              <span>NSBS Digital Academic Repository</span>
            </div>
            
            <h1 className="font-display-academic text-3xl sm:text-4xl font-bold text-slate-900">
              Departmental Digital Biochemistry Library
            </h1>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Access official course lecture handouts, NUC-accredited reference syllabi, past examination solutions, and laboratory manuals. All external volumes are indexed via secure Google Drive cloud links for student study.
            </p>
          </div>

          {/* Admin shortcut if logged in */}
          {userRole === 'admin' && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-amber-800 font-medium">
                Admin mode active: You can upload and configure resources in the CMS.
              </span>
              <button
                onClick={() => setActivePage('admin-dashboard')}
                className="px-3 py-1.5 rounded bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Resource to Library</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          
          {/* Search bar and Sort row */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by course code (e.g. BCH 301), topic, author or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort resources"
                className="py-2.5 px-3 rounded-lg border border-slate-300 text-xs font-medium text-slate-800 bg-white outline-none focus:border-blue-900"
              >
                <option value="newest">Latest Uploads</option>
                <option value="downloads">Most Downloaded</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Level Filter Tabs (Interactive Segmented Control) */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 mr-1">Level:</span>
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedLevel === 'all'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Levels
            </button>
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Category Dropdown & Scrollable Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="font-semibold text-slate-500 shrink-0">Category:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded text-xs whitespace-nowrap font-medium transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-emerald-800 text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.slice(0, 10).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs whitespace-nowrap font-medium transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-emerald-800 text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
            <div>
              Showing <span className="font-bold text-slate-800">{filteredResources.length}</span> verified academic resources
            </div>
            {(selectedLevel !== 'all' || selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => { setSelectedLevel('all'); setSelectedCategory('all'); setSearchQuery(''); }}
                className="text-blue-900 font-semibold hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filteredResources.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-display-academic text-lg font-bold text-slate-800">
                No Academic Resources Match Your Search
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try loosening your filters, changing the academic level, or submit a request to the Academic Committee.
              </p>
              <button
                onClick={() => { setSelectedLevel('all'); setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-3 px-4 py-2 rounded bg-blue-900 text-white text-xs font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => {
                const isBookmarked = bookmarkedResourceIds.includes(res.id);

                return (
                  <div
                    key={res.id}
                    className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Unboxed Metadata Header (Anti-Pill Rule) */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-900 text-sm">
                            {res.courseCode}
                          </span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="font-medium text-slate-600">{res.level}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">{res.fileType}</span>
                      </div>

                      <h3 className="font-display-academic text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {res.title}
                      </h3>

                      <div className="text-xs text-slate-500 mt-1">
                        <span>{res.category}</span>
                        <span className="mx-1.5 text-slate-300">·</span>
                        <span>{res.author}</span>
                      </div>

                      <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                        {res.description}
                      </p>

                      {/* Tag list */}
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-500">
                        {res.tags.map((tag) => (
                          <span key={tag} className="text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 mt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                        <span>Size: {res.fileSize}</span>
                        <span>{res.downloadsCount} downloads</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={res.googleDriveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => incrementDownload(res.id)}
                          className="flex-1 py-2 px-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Google Drive Access</span>
                        </a>

                        <button
                          onClick={() => toggleBookmark(res.id)}
                          className={`p-2 rounded-lg border transition-colors ${
                            isBookmarked
                              ? 'bg-amber-50 text-amber-700 border-amber-300'
                              : 'text-slate-400 border-slate-200 hover:text-slate-700 hover:bg-slate-50'
                          }`}
                          title={isBookmarked ? 'Saved in Student Portal' : 'Save to bookmarks'}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => setReportingResource(res)}
                          className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                          title="Report broken or inaccessible link"
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Broken Link Reporting Modal */}
        {reportingResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Report Inaccessible Resource</span>
                </div>
                <button onClick={() => setReportingResource(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <div className="text-xs text-slate-500">Resource:</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">{reportingResource.title}</div>
                <div className="text-xs text-blue-900 font-mono mt-0.5">{reportingResource.courseCode}</div>
              </div>

              <form onSubmit={handleReportSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Describe the issue with the Google Drive link:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="e.g. Link asks for permission request, file not found (404), or empty folder..."
                    className="w-full p-2.5 text-xs rounded border border-slate-300 outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportingResource(null)}
                    className="px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
