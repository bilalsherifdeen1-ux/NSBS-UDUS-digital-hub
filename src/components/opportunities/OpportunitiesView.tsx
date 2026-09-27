import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Opportunity, OpportunityType } from '../../types';
import { 
  Briefcase, 
  Search, 
  ExternalLink, 
  Clock, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Award,
  Plus,
  Edit3,
  ShieldCheck
} from 'lucide-react';

const TYPES: OpportunityType[] = [
  'Scholarship',
  'Fellowship',
  'Internship',
  'Research',
  'Conference',
  'Competition',
  'Training',
  'Grant'
];

export const OpportunitiesView: React.FC = () => {
  const { opportunities, userRole, isAdminAuthenticated, setActivePage } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const isAdministrator = isAdminAuthenticated || userRole === 'admin';

  const getDaysRemaining = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr).getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredOpportunities = opportunities.filter(opp => {
    // If not admin, hide unpublished
    if (!isAdministrator && !opp.published) return false;

    const matchesSearch = 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'all' || opp.type === selectedType;

    return matchesSearch && matchesType;
  });

  const handleOpenAdminCreate = () => {
    sessionStorage.setItem('nsbs_admin_section', 'opportunities');
    setActivePage('admin-dashboard');
  };

  const handleOpenAdminEdit = (oppId: string) => {
    sessionStorage.setItem('nsbs_admin_section', 'opportunities');
    sessionStorage.setItem('nsbs_edit_opp_id', oppId);
    setActivePage('admin-dashboard');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
              <Award className="w-4 h-4 text-blue-900" />
              <span>Career & Funding Directorate</span>
            </div>
            
            <h1 className="font-display-academic text-3xl sm:text-4xl font-bold text-slate-900">
              Biochemistry Student Opportunities Hub
            </h1>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Discover verified undergraduate scholarships (such as PTDF, NNPC, and State Government awards), international research summer fellowships, clinical internships, and national biotechnology hackathons.
            </p>
          </div>

          {isAdministrator && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-amber-50/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 rounded-b-xl border-amber-200/60">
              <div className="flex items-center gap-2 text-xs text-amber-950 font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Administrator Active: You can edit descriptions, application URLs, deadlines, or post new opportunities.</span>
              </div>
              <button
                onClick={handleOpenAdminCreate}
                className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post / Manage Opportunities in CMS</span>
              </button>
            </div>
          )}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search scholarships (e.g. PTDF), internships, or research grants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 outline-none focus:border-blue-900"
              />
            </div>
          </div>

          {/* Type Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                selectedType === 'all'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Opportunities
            </button>
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedType === t
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOpportunities.map((opp) => {
            const daysLeft = getDaysRemaining(opp.deadline);
            const isClosingSoon = daysLeft <= 14 && daysLeft > 0;
            const isExpired = daysLeft <= 0;

            return (
              <div
                key={opp.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-blue-900">{opp.type}</span>
                    <span className={`font-mono font-medium ${isClosingSoon ? 'text-amber-600 font-bold' : isExpired ? 'text-red-600' : 'text-slate-500'}`}>
                      {isExpired ? 'Application Closed' : `${daysLeft} days remaining`}
                    </span>
                  </div>

                  <h3 className="font-display-academic text-xl font-bold text-slate-900 leading-snug">
                    {opp.title}
                  </h3>

                  <div className="text-xs font-medium text-slate-700 mt-1">
                    {opp.organization} · {opp.location}
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5 text-xs">
                    <div className="font-semibold text-slate-800">Eligibility Criteria:</div>
                    <div className="text-slate-600 leading-relaxed">{opp.eligibility}</div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 text-[10px] text-slate-500">
                    {opp.tags.map((t) => (
                      <span key={t} className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Deadline: {opp.deadline}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAdministrator && (
                      <button
                        onClick={() => handleOpenAdminEdit(opp.id)}
                        className="px-3 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center gap-1.5 border border-amber-300 transition-colors shadow-xs"
                        title="Edit description, application URL, and criteria in Admin CMS"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-800" />
                        <span>Edit Call</span>
                      </button>
                    )}

                    <a
                      href={opp.applicationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Official Application</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
