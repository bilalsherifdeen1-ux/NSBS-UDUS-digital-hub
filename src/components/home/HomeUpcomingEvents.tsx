import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HomeUpcomingEvents: React.FC = () => {
  const { events, setActivePage, registerForEvent, registeredEventIds } = useApp();

  const upcomingEvents = events
    .filter(e => e.status === 'Upcoming')
    .slice(0, 3);

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-900 mb-1">
              Academic Calendar & Engagements
            </div>
            <h2 className="font-display-academic text-2xl sm:text-3xl font-bold text-slate-900">
              Upcoming Events & Academic Symposia
            </h2>
          </div>
          <button
            onClick={() => setActivePage('events')}
            className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View Full Academic Calendar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Events Grid / Mobile Swipe Reel */}
        <div className="flex md:grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-3 -mx-4 sm:mx-0 px-4 sm:px-0">
          {upcomingEvents.map((evt) => {
            const isRegistered = registeredEventIds.includes(evt.id);

            return (
              <div 
                key={evt.id}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-0 shrink-0 md:shrink snap-center bg-white rounded-lg border border-slate-200 hover:border-slate-300 shadow-sm p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Category & Date Metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-emerald-800">{evt.category}</span>
                    <span className="font-mono text-slate-400">{evt.semester}</span>
                  </div>

                  <h3 className="font-display-academic text-lg font-bold text-slate-900 leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {evt.description}
                  </p>

                  <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                      <span className="font-medium text-slate-800">{evt.date}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{evt.startTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                    {evt.speaker && (
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                        <span className="truncate text-slate-700">{evt.speaker}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Registration CTA Bar */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">{evt.registeredCount}</span> students registered
                  </div>

                  {isRegistered ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Registered</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => registerForEvent(evt.id)}
                      className="px-3.5 py-1.5 rounded bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold transition-colors"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
