import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResearchProject, AcademicLevel } from '../../types';
import { 
  FlaskConical, 
  BookOpen, 
  Send, 
  Search, 
  FileText, 
  CheckCircle2, 
  User, 
  Tag, 
  Award,
  Sparkles,
  X
} from 'lucide-react';

export const ResearchView: React.FC = () => {
  const { researchProjects, submitResearchProject, userRole, setActivePage } = useApp();

  const [activeTab, setActiveTab] = useState<'projects' | 'submit' | 'methodology'>('projects');
  const [filterSpec, setFilterSpec] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Proposal form state
  const [formTitle, setFormTitle] = useState('');
  const [formLeadAuthor, setFormLeadAuthor] = useState('');
  const [formLevel, setFormLevel] = useState<AcademicLevel>('400L');
  const [formSpec, setFormSpec] = useState<ResearchProject['specialization']>('Phytomedicine');
  const [formAbstract, setFormAbstract] = useState('');
  const [formSupervisor, setFormSupervisor] = useState('');
  const [formTags, setFormTags] = useState('');

  const filteredProjects = researchProjects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.leadAuthor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abstract.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpec = filterSpec === 'all' || p.specialization === filterSpec;

    return matchesSearch && matchesSpec;
  });

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formLeadAuthor || !formAbstract) return;

    submitResearchProject({
      title: formTitle,
      leadAuthor: formLeadAuthor,
      level: formLevel,
      specialization: formSpec,
      abstract: formAbstract,
      supervisor: formSupervisor || 'Faculty Committee Reviewer',
      tags: formTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    // Reset form
    setFormTitle('');
    setFormLeadAuthor('');
    setFormAbstract('');
    setFormSupervisor('');
    setFormTags('');
    setActiveTab('projects');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
              <FlaskConical className="w-4 h-4 text-blue-900" />
              <span>NSBS Scientific Research Directorate</span>
            </div>
            
            <h1 className="font-display-academic text-3xl sm:text-4xl font-bold text-slate-900">
              Biochemistry Research & Innovation Portal
            </h1>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Showcasing undergraduate dissertations, phytomedical screening breakthroughs, molecular docking simulations, and scientific methodology standards at Usmanu Danfodiyo University, Sokoto.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Undergraduate Research Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('submit')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'submit'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Submit Proposal for Review</span>
          </button>

          <button
            onClick={() => setActiveTab('methodology')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'methodology'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Scientific Writing & Referencing Guide</span>
          </button>
        </div>

        {/* Tab 1: Projects Showcase */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search abstracts, Phytomedicine, biomarkers, or lead authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <select
                value={filterSpec}
                onChange={(e) => setFilterSpec(e.target.value)}
                aria-label="Filter research projects by specialization"
                className="py-2 px-3 rounded-lg border border-slate-300 text-xs font-medium text-slate-800 bg-white"
              >
                <option value="all">All Specializations</option>
                <option value="Phytomedicine">Phytomedicine</option>
                <option value="Clinical Biochemistry">Clinical Biochemistry</option>
                <option value="Bioinformatics">Bioinformatics</option>
                <option value="Molecular Biology">Molecular Biology</option>
                <option value="Enzymology">Enzymology</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-blue-900">{p.specialization}</span>
                      <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {p.status}
                      </span>
                    </div>

                    <h3 className="font-display-academic text-lg font-bold text-slate-900 leading-snug">
                      {p.title}
                    </h3>

                    <div className="text-xs text-slate-600 mt-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-800">{p.leadAuthor}</span>
                      <span className="text-slate-400">·</span>
                      <span>{p.level}</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-3 font-serif-academic leading-relaxed">
                      {p.abstract}
                    </p>

                    {p.supervisor && (
                      <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">Faculty Supervisor: </span>
                        {p.supervisor}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-500">
                    {p.tags.map((t) => (
                      <span key={t} className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Submit Research Proposal */}
        {activeTab === 'submit' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="font-display-academic text-2xl font-bold text-slate-900">
                Submit Research Concept / Undergraduate Proposal
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your proposal will be reviewed by the NSBS Scientific Advisory Committee for alignment with departmental research themes and innovation grants.
              </p>
            </div>

            <form onSubmit={handleProposalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Title (Formal Scientific Nomenclature):
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Phytochemical Analysis and Hypoglycemic Efficacy of Momordica charantia..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lead Researcher / Author:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Umar Sadiq"
                    value={formLeadAuthor}
                    onChange={(e) => setFormLeadAuthor(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Level:</label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value as AcademicLevel)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    <option value="400L">400L (Final-Year Project)</option>
                    <option value="300L">300L (Penultimate)</option>
                    <option value="200L">200L</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Area of Specialization:</label>
                  <select
                    value={formSpec}
                    onChange={(e) => setFormSpec(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    <option value="Phytomedicine">Phytomedicine & Natural Products</option>
                    <option value="Clinical Biochemistry">Clinical Biochemistry & Diagnostics</option>
                    <option value="Bioinformatics">Bioinformatics & Computational Biology</option>
                    <option value="Molecular Biology">Molecular Biology & Genetics</option>
                    <option value="Enzymology">Enzymology & Kinetics</option>
                    <option value="Toxicology">Biochemical Toxicology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Assigned / Proposed Supervisor:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Y. Saidu or Prof. L. S. Bilbis"
                    value={formSupervisor}
                    onChange={(e) => setFormSupervisor(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Structured Abstract (Problem statement, Methodology, Expected findings):
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline the scientific background, extraction solvents, assay parameters (e.g. DPPH, spectrophotometry), and expected biochemical relevance..."
                  value={formAbstract}
                  onChange={(e) => setFormAbstract(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Keywords (comma separated):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Antioxidant, DPPH, Sokoto Flora, In Vitro"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Proposal for Committee Verification</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Methodology Guide */}
        {activeTab === 'methodology' && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="font-display-academic text-2xl font-bold text-slate-900">
              Departmental Scientific Writing & Referencing Standards
            </h2>

            <div className="prose prose-slate text-xs sm:text-sm text-slate-600 space-y-4">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-950 text-sm mb-1">Structure of the UDUS B.Sc. Biochemistry Dissertation</h4>
                <p>
                  Every final-year undergraduate project must follow the standard departmental 5-chapter format:
                  Chapter 1 (Introduction & Literature Review), Chapter 2 (Materials & Methods), Chapter 3 (Results & Data Plotting), Chapter 4 (Discussion & Limitations), and Chapter 5 (Summary, Conclusion & Recommendations).
                </p>
              </div>

              <h3 className="font-display-academic text-base font-bold text-slate-900 pt-2">
                1. Phytomedicine Extraction Protocols
              </h3>
              <p>
                When working with indigenous northern Nigerian medicinal plants, plant specimens must be formally authenticated at the Herbarium of the Department of Botany, Usmanu Danfodiyo University, Sokoto. Record the official voucher specimen number in Chapter 2.
              </p>

              <h3 className="font-display-academic text-base font-bold text-slate-900 pt-2">
                2. Data Presentation & Statistical Rigor
              </h3>
              <p>
                All quantitative experiments (spectrophotometry, enzymatic assays, animal blood glucose measurements) must be conducted in triplicate (n = 3 or n = 5). Report values as Mean ± Standard Deviation (SD) or Standard Error of the Mean (SEM). State the statistical package utilized (GraphPad Prism version 9.0 or SPSS version 26) with p-values &lt; 0.05 considered statistically significant.
              </p>

              <h3 className="font-display-academic text-base font-bold text-slate-900 pt-2">
                3. APA 7th Edition & Vancouver Citation Formats
              </h3>
              <div className="p-3 bg-slate-100 rounded-md font-mono text-[11px] text-slate-800 space-y-2">
                <div>
                  <span className="font-bold text-blue-900">[Journal Article APA]:</span><br />
                  Bilbis, L. S., Shehu, R. A., &amp; Abubakar, M. G. (2002). Hypoglycemic and hypolipidemic effects of aqueous extract of Arachis hypogaea in normal and diabetic rats. <em>Phytomedicine</em>, 9(6), 553-555.
                </div>
                <div>
                  <span className="font-bold text-blue-900">[Book Reference APA]:</span><br />
                  Nelson, D. L., &amp; Cox, M. M. (2021). <em>Lehninger Principles of Biochemistry</em> (8th ed.). W. H. Freeman and Company.
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
