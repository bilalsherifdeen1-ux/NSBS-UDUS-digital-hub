import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventItem, EventCategory } from '../../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  Filter, 
  Search, 
  Plus, 
  Share2, 
  Users,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const CATEGORIES: EventCategory[] = [
  'Academic',
  'Tutorial',
  'Webinar',
  'Career',
  'Research',
  'Innovation',
  'Outreach',
  'Social',
  'NSBS Week',
  'Leadership',
  'Competition'
];

export const EventsView: React.FC = () => {
  const { events, registerForEvent, cancelEventRegistration, registeredEventIds, userRole, setActivePage, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  const filteredEvents = events.filter(e => {
    const matchesSearch = 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
    const matchesSemester = selectedSemester === 'all' || e.semester === selectedSemester;

    return matchesSearch && matchesCategory && matchesSemester;
  });

  const copyShareLink = (evt: EventItem) => {
    navigator.clipboard.writeText(`${window.location.origin}/events#${evt.id}`);
    showToast(`Share link for "${evt.title}" copied!`);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-blue-900" />
              <span>NSBS UDUS Event Calendar</span>
            </div>
            
            <h1 className="font-display-academic text-3xl sm:text-4xl font-bold text-slate-900">
              Departmental Events, Tutorials & Symposia
            </h1>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore scheduled academic tutorials, webinars, community outreach drives, and the annual NSBS Week celebrations. Reserve your seat and receive reminders directly in your Student Portal.
            </p>
          </div>

          {userRole === 'admin' && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-amber-800 font-medium">
                Admin mode: You can schedule and edit events in the CMS.
              </span>
              <button
                onClick={() => setActivePage('admin-dashboard')}
                className="px-3 py-1.5 rounded bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Event</span>
              </button>
            </div>
          )}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search events by title, venue, or speaker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 outline-none focus:border-blue-900"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                aria-label="Filter events by semester"
                className="py-2.5 px-3 rounded-lg border border-slate-300 text-xs font-medium text-slate-800 bg-white outline-none"
              >
                <option value="all">All Semesters</option>
                <option value="First Semester">First Semester</option>
                <option value="Second Semester">Second Semester</option>
              </select>

              <div className="flex rounded-lg border border-slate-300 overflow-hidden text-xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-900 text-white' : 'bg-white text-slate-700'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-900 text-white' : 'bg-white text-slate-700'}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events View */}
        <div>
          <div className="text-xs text-slate-500 mb-4">
            Showing <span className="font-bold text-slate-800">{filteredEvents.length}</span> departmental events
          </div>

          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">No events found matching your query.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedSemester('all'); }}
                className="mt-3 text-xs text-blue-900 font-semibold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((evt) => {
                const isRegistered = registeredEventIds.includes(evt.id);

                return (
                  <div
                    key={evt.id}
                    className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm p-6 flex flex-col justify-between"
                  >
                    <div>
                      {/* Unboxed Metadata (Anti-Pill Rule) */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="font-semibold text-blue-900">{evt.category}</span>
                        <span className="font-mono text-slate-400">{evt.semester}</span>
                      </div>

                      <h3 className="font-display-academic text-lg font-bold text-slate-900 leading-snug">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                        {evt.description}
                      </p>

                      <div className="mt-4 space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                          <span className="font-medium text-slate-900">{evt.date}</span>
                          <span className="text-slate-400">·</span>
                          <span>{evt.startTime} - {evt.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                          <span className="truncate">{evt.venue}</span>
                        </div>
                        {evt.speaker && (
                          <div className="flex items-start gap-2">
                            <User className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold text-slate-800">{evt.speaker}</div>
                              {evt.speakerRole && <div className="text-[11px] text-slate-500">{evt.speakerRole}</div>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">{evt.registeredCount}</span> attending
                        {evt.registrationLimit && <span> / {evt.registrationLimit} max</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyShareLink(evt)}
                          className="p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                          title="Share event link"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>

                        {isRegistered ? (
                          <button
                            onClick={() => cancelEventRegistration(evt.id)}
                            className="px-3 py-1.5 rounded border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100"
                          >
                            ✓ Registered
                          </button>
                        ) : (
                          <button
                            onClick={() => registerForEvent(evt.id)}
                            className="px-3.5 py-1.5 rounded bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold shadow-sm transition-colors"
                          >
                            Register
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
              {filteredEvents.map((evt) => {
                const isRegistered = registeredEventIds.includes(evt.id);

                return (
                  <div key={evt.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-blue-900">{evt.category}</span>
                        <span>·</span>
                        <span>{evt.date}</span>
                        <span>·</span>
                        <span>{evt.startTime}</span>
                      </div>
                      <h4 className="font-display-academic text-base font-bold text-slate-900">{evt.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-1">{evt.description}</p>
                      <div className="text-xs text-slate-500 flex items-center gap-3 pt-1">
                        <span>Venue: {evt.venue}</span>
                        {evt.speaker && <span>Speaker: {evt.speaker}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-slate-500">{evt.registeredCount} registered</span>
                      {isRegistered ? (
                        <button
                          onClick={() => cancelEventRegistration(evt.id)}
                          className="px-3 py-1.5 rounded border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-semibold"
                        >
                          ✓ Registered
                        </button>
                      ) : (
                        <button
                          onClick={() => registerForEvent(evt.id)}
                          className="px-3.5 py-1.5 rounded bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold"
                        >
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
