import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Target, 
  Eye, 
  Award, 
  BookOpen, 
  Compass, 
  CheckCircle2, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { siteSettings, setActivePage } = useApp();

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const knowledgeBaseItems = [
    {
      q: 'What is the professional scope of Biochemistry at Usmanu Danfodiyo University, Sokoto?',
      a: 'The B.Sc. Biochemistry curriculum at UDUS provides rigorous theoretical and practical immersion into enzymology, molecular genetics, clinical pathology, toxicology, biotechnology, and metabolic bioenergetics. Graduates are prepared for careers spanning medical diagnostic laboratories, pharmaceutical manufacturing, agricultural biotechnology, academic research, and bioinformatics.'
    },
    {
      q: 'What safety standards govern the departmental practical laboratories?',
      a: 'Undergraduate students must wear protective laboratory coats, closed-toe footwear, and safety goggles at all times. Corrosive reagents (concentrated sulfuric acid, nitric acid) must be handled within the fume hood. Biological and hazardous chemical wastes must be segregated according to Faculty safety protocols.'
    },
    {
      q: 'How does the NSBS Constant Academic Tutorial Classes (CATC) system operate?',
      a: 'The NSBS Tutorial Directorate organizes scheduled weekend revision sessions led by high-achieving 300L and 400L student tutors. Sessions focus on continuous assessment preparation, kinetic derivations, and past examination questions.'
    },
    {
      q: 'How can students access funding and research internships through NSBS?',
      a: 'The NSBS Opportunities Hub indexes verified undergraduate scholarships (such as PTDF, NNPC, and State Government bursaries) and research internships. Our Academic and Career Committee provides CV reviews and recommendation guidance.'
    }
  ];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-blue-900" />
              <span>Institutional Identity</span>
            </div>
            
            <h1 className="font-display-academic text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
              About the Nigerian Society of Biochemistry Students (UDUS)
            </h1>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-serif-academic text-base">
              The Nigerian Society of Biochemistry Students (NSBS), Usmanu Danfodiyo University, Sokoto Chapter, is the premier student academic and professional organization representing all undergraduate and postgraduate scholars in the Department of Biochemistry.
            </p>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="font-display-academic text-2xl font-bold text-slate-900">
                Our Mission
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-serif-academic text-base">
                To promote academic excellence, scientific curiosity, professional development, research culture, innovation and meaningful student engagement among Biochemistry students through rigorous tutorials, digital educational repositories, and peer mentorship.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="font-display-academic text-2xl font-bold text-slate-900">
                Our Vision
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-serif-academic text-base">
                To build a highly knowledgeable, innovative, research-driven and professionally prepared generation of Biochemists capable of solving pressing healthcare, nutritional, and industrial challenges across Nigeria and the global scientific arena.
              </p>
            </div>
          </div>

        </div>

        {/* Objectives & Strategic Priorities */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="font-display-academic text-2xl font-bold text-slate-900">
              Constitutional Objectives & Strategic Priorities
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Guiding principles established in the NSBS UDUS Chapter Constitution (2026/2027 Session).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-blue-900 text-sm">1. Academic Mastery</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide comprehensive lecture notes, solved past examination archives, and weekly peer tutorials across all undergraduate levels (100L through 400L).
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-blue-900 text-sm">2. Research Culture</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stimulate scientific literature reviews, Phytomedicine extraction methods, and bioinformatics training to elevate final-year project quality.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-blue-900 text-sm">3. Technology & AI Integration</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equip students with responsible artificial intelligence tools, Python for biologists, and molecular docking simulations.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-blue-900 text-sm">4. Community Health Service</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extend biochemical and diagnostic knowledge into host communities through voluntary blood glucose, blood pressure, and malaria outreach screening.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-blue-900 text-sm">5. Career Trajectories</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bridge undergraduate study with industry through webinars, alumni mentorship matching, and corporate internship linkages.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-blue-900 text-sm">6. Transparent Governance</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uphold rigorous fiscal accountability, maintain student voice ombudsman channels, and preserve institutional handover continuity.
              </p>
            </div>
          </div>
        </div>

        {/* UDUS Departmental Context & History */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-4">
          <h2 className="font-display-academic text-2xl font-bold text-slate-900">
            History & Academic Heritage at UDUS
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed font-serif-academic text-base">
            <p>
              Usmanu Danfodiyo University, Sokoto (formerly University of Sokoto), founded in 1975, is one of Nigeria&apos;s foremost second-generation federal universities. The Department of Biochemistry, housed within the Faculty of Chemical and Life Sciences, boasts a rich heritage of producing renowned biochemists, toxicologists, and academic leaders.
            </p>
            <p>
              Under successive faculty leadership, the department has pioneered research into indigenous medicinal plants of the Sudan savannah, biochemical mechanisms of diabetes mellitus, lipid metabolism, and enzymological diagnostics. The student society, NSBS UDUS, serves as the active bridge between students, the academic deanery, and professional bodies including the Nigerian Society of Biochemistry and Molecular Biology (NSBMB).
            </p>
          </div>
        </div>

        {/* Searchable Biochemistry Knowledge Base FAQ */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div>
            <h2 className="font-display-academic text-2xl font-bold text-slate-900">
              Departmental Knowledge Base & Academic Guidance
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Frequently referenced information on courses, laboratory protocols, and student survival at UDUS.
            </p>
          </div>

          <div className="space-y-3">
            {knowledgeBaseItems.map((item, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-4 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed font-serif-academic text-base border-t border-slate-200">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
