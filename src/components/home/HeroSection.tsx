import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Sparkles, 
  Calendar, 
  Briefcase, 
  FlaskConical, 
  UserCheck, 
  ArrowRight, 
  Award,
  Users,
  Compass,
  FileText,
  HeartHandshake,
  CheckCircle2,
  Edit3
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActivePage, siteSettings, isAdminAuthenticated } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1b33] via-[#0d2242] to-[#0b1b33] text-white pt-16 pb-20 border-b border-blue-900/60">
      {/* Subtle Scientific Lattice & Hexagonal Grid Overlay */}
      <div className="absolute inset-0 bg-dark-science-grid opacity-20 pointer-events-none"></div>

      {/* Decorative Biochemical Molecular Ring Silhouette */}
      <div className="absolute top-10 right-4 lg:right-20 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 left-10 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Institutional Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-950/90 border border-blue-800/60 text-blue-200 text-xs font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>USMANU DANFODIYO UNIVERSITY, SOKOTO</span>
          <span className="text-slate-400">·</span>
              <span>{siteSettings.session.toUpperCase()}</span>
        </div>

        {/* Hero Main Headline & Text */}
        <div className="max-w-4xl space-y-6">
          <h1 className="font-display-academic text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            Advancing Biochemistry.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-emerald-200 to-amber-200">
              Empowering Students.
            </span><br />
            Building the Future.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-3xl">
            The Nigerian Society of Biochemistry Students, Usmanu Danfodiyo University Chapter, connects students with knowledge, research, innovation, opportunities and a community committed to advancing the science of life.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('resources')}
              className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-900/30 flex items-center gap-2 group"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Student Resources</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => setActivePage('programmes')}
              className="px-6 py-3.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Discover NSBS Activities</span>
            </button>

            <button
              onClick={() => setActivePage('student-portal')}
              className="px-6 py-3.5 rounded-lg bg-emerald-700/90 hover:bg-emerald-600 text-white font-semibold text-sm border border-emerald-600/60 transition-all flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Student Portal</span>
            </button>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="mt-14 pt-10 border-t border-blue-900/50">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Quick Academic Services
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            
            <div 
              onClick={() => setActivePage('student-portal')}
              className="p-4 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-600/50 cursor-pointer transition-all group"
            >
              <UserCheck className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-sm text-white">Student Portal</div>
              <div className="text-[11px] text-slate-400 mt-1">Profile, bookmarks & student ID</div>
            </div>

            <div 
              onClick={() => setActivePage('resources')}
              className="p-4 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-600/50 cursor-pointer transition-all group"
            >
              <BookOpen className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-sm text-white">Digital Library</div>
              <div className="text-[11px] text-slate-400 mt-1">Handouts, textbooks & past papers</div>
            </div>

            <div 
              onClick={() => setActivePage('ailab')}
              className="p-4 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-600/50 cursor-pointer transition-all group"
            >
              <Sparkles className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-sm text-white">AI Lab</div>
              <div className="text-[11px] text-slate-400 mt-1">Gemini Gem & study assistants</div>
            </div>

            <div 
              onClick={() => setActivePage('events')}
              className="p-4 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-600/50 cursor-pointer transition-all group"
            >
              <Calendar className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-sm text-white">Events & Calendar</div>
              <div className="text-[11px] text-slate-400 mt-1">Webinars, tutorials & NSBS week</div>
            </div>

            <div 
              onClick={() => setActivePage('opportunities')}
              className="p-4 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-600/50 cursor-pointer transition-all group"
            >
              <Briefcase className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-sm text-white">Opportunities</div>
              <div className="text-[11px] text-slate-400 mt-1">Scholarships, internships & grants</div>
            </div>

            <div 
              onClick={() => setActivePage('research')}
              className="p-4 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-600/50 cursor-pointer transition-all group"
            >
              <FlaskConical className="w-5 h-5 text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-sm text-white">Research Hub</div>
              <div className="text-[11px] text-slate-400 mt-1">Projects, methodology & submissions</div>
            </div>

          </div>
        </div>

        {/* Dynamic Factual Impact Metrics Banner */}
        <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-950/90 via-slate-900/90 to-blue-950/90 border border-blue-900/60 shadow-2xl relative">
          {/* Header indicator */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-blue-900/40 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                Official Factual Departmental Metrics
              </span>
              <span className="hidden sm:inline text-slate-500">·</span>
              <span className="hidden sm:inline text-slate-400 text-[11px]">
                {siteSettings.session} Academic Session
              </span>
            </div>

            {isAdminAuthenticated && (
              <button
                onClick={() => setActivePage('admin-dashboard')}
                className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 transition-colors font-semibold"
                title="Edit these actual and factual statistics"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Factual Numbers</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 sm:gap-6 text-center">
            
            {/* Outreach Beneficiaries */}
            <div className="p-2 sm:p-3 rounded-xl bg-slate-900/50 border border-teal-900/40">
              <div className="font-display-academic text-2xl sm:text-3xl font-bold text-teal-300">
                {(siteSettings.metrics?.outreachBeneficiaries ?? 1450).toLocaleString()}+
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">Outreach Beneficiaries</div>
              <div className="text-[9px] text-slate-500 mt-0.5 hidden sm:block">Community health screened</div>
            </div>

            {/* Community Outreaches Executed */}
            <div className="p-2 sm:p-3 rounded-xl bg-slate-900/50 border border-emerald-900/40">
              <div className="font-display-academic text-2xl sm:text-3xl font-bold text-emerald-300">
                {siteSettings.metrics?.communityOutreaches ?? 8}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">Outreaches Executed</div>
              <div className="text-[9px] text-slate-500 mt-0.5 hidden sm:block">Sokoto host communities</div>
            </div>

            {/* Enrolled Students */}
            <div className="p-2 sm:p-3 rounded-xl bg-slate-900/50 border border-blue-900/40">
              <div className="font-display-academic text-2xl sm:text-3xl font-bold text-white">
                {(siteSettings.metrics?.registeredStudents ?? 842).toLocaleString()}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">Enrolled Students</div>
              <div className="text-[9px] text-slate-500 mt-0.5 hidden sm:block">100L - Postgraduate</div>
            </div>

            {/* Academic Resources */}
            <div className="p-2 sm:p-3 rounded-xl bg-slate-900/50 border border-blue-900/40">
              <div className="font-display-academic text-2xl sm:text-3xl font-bold text-blue-300">
                {(siteSettings.metrics?.academicResources ?? 168).toLocaleString()}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">Academic Resources</div>
              <div className="text-[9px] text-slate-500 mt-0.5 hidden sm:block">Vetted lecture summaries</div>
            </div>

            {/* Annual Events */}
            <div className="p-2 sm:p-3 rounded-xl bg-slate-900/50 border border-blue-900/40">
              <div className="font-display-academic text-2xl sm:text-3xl font-bold text-blue-300">
                {siteSettings.metrics?.eventsOrganized ?? 24}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">Annual Events</div>
              <div className="text-[9px] text-slate-500 mt-0.5 hidden sm:block">Symposia & NSBS Week</div>
            </div>

            {/* Training Programmes */}
            <div className="p-2 sm:p-3 rounded-xl bg-slate-900/50 border border-amber-900/40">
              <div className="font-display-academic text-2xl sm:text-3xl font-bold text-amber-300">
                {siteSettings.metrics?.trainingProgrammes ?? 12}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">Training Modules</div>
              <div className="text-[9px] text-slate-500 mt-0.5 hidden sm:block">Biotech & Lab Masterclasses</div>
            </div>

            {/* Research Projects */}
            <div className="p-2 sm:p-3 rounded-xl bg-slate-900/50 border border-indigo-900/40">
              <div className="font-display-academic text-2xl sm:text-3xl font-bold text-indigo-300">
                {siteSettings.metrics?.researchInitiatives ?? 18}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">Research Projects</div>
              <div className="text-[9px] text-slate-500 mt-0.5 hidden sm:block">Departmental labs</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
