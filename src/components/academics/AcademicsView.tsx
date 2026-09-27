import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AcademicLevel } from '../../types';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ArrowRight,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface CourseItem {
  code: string;
  title: string;
  units: number;
  semester: 'First Semester' | 'Second Semester';
  level: AcademicLevel;
  description: string;
  prerequisite?: string;
}

const UDUS_COURSES: CourseItem[] = [
  // 100 Level
  {
    code: 'BIO 101',
    title: 'General Biology I (Cell Biology & Genetics)',
    units: 3,
    semester: 'First Semester',
    level: '100L',
    description: 'Cell structure, organelle functions, Mendelian genetics, mitosis and meiosis, biomolecules introduction.'
  },
  {
    code: 'CHM 101',
    title: 'General Chemistry I (Physical & Inorganic)',
    units: 3,
    semester: 'First Semester',
    level: '100L',
    description: 'Atomic structure, chemical bonding, gas laws, chemical equilibrium, acids, bases, and buffer solutions.'
  },
  // 200 Level
  {
    code: 'BCH 201',
    title: 'General Biochemistry I',
    units: 3,
    semester: 'First Semester',
    level: '200L',
    description: 'Structure, classification, and physiological roles of carbohydrates, lipids, amino acids, proteins, and nucleic acids.',
    prerequisite: 'CHM 101, BIO 101'
  },
  {
    code: 'BCH 202',
    title: 'General Biochemistry II',
    units: 3,
    semester: 'Second Semester',
    level: '200L',
    description: 'Introduction to biochemical thermodynamics, bioenergetics, oxidative phosphorylation, and membrane transport kinetics.',
    prerequisite: 'BCH 201'
  },
  {
    code: 'BCH 203',
    title: 'Practical Biochemistry I',
    units: 2,
    semester: 'First Semester',
    level: '200L',
    description: 'Qualitative analysis of biomolecules, colorimetric reactions, buffer preparation, and basic spectrophotometry.'
  },
  // 300 Level
  {
    code: 'BCH 301',
    title: 'General & Applied Enzymology',
    units: 3,
    semester: 'First Semester',
    level: '300L',
    description: 'Kinetics of single-substrate reactions, Michaelis-Menten derivations, inhibition mechanisms, allosteric regulation, and coenzymes.',
    prerequisite: 'BCH 201, BCH 202'
  },
  {
    code: 'BCH 303',
    title: 'Chemistry of Macromolecules',
    units: 2,
    semester: 'First Semester',
    level: '300L',
    description: 'Primary, secondary, tertiary, and quaternary structures of proteins, nucleic acid conformations, and biophysical separation methods.'
  },
  {
    code: 'BCH 305',
    title: 'Intermediary Metabolism I',
    units: 3,
    semester: 'First Semester',
    level: '300L',
    description: 'Carbohydrate and lipid catabolism and anabolism: Glycolysis, Pentose Phosphate Pathway, TCA cycle, Beta-oxidation, and Ketogenesis.'
  },
  {
    code: 'BCH 306',
    title: 'Intermediary Metabolism II',
    units: 3,
    semester: 'Second Semester',
    level: '300L',
    description: 'Amino acid deamination, urea cycle, purine and pyrimidine nucleotide metabolism, and integration of metabolic pathways.'
  },
  // 400 Level
  {
    code: 'BCH 401',
    title: 'Clinical Biochemistry & Biochemical Diagnostics',
    units: 3,
    semester: 'First Semester',
    level: '400L',
    description: 'Biochemical assessment of liver function, renal clearance, myocardial infarction, inborn errors of metabolism, and diagnostic enzymology.',
    prerequisite: 'BCH 301, BCH 305'
  },
  {
    code: 'BCH 403',
    title: 'Molecular Biology & Genetic Engineering',
    units: 3,
    semester: 'First Semester',
    level: '400L',
    description: 'DNA replication, transcription, translation, recombinant DNA technology, PCR, cloning vectors, and CRISPR genome editing.',
    prerequisite: 'BCH 303'
  },
  {
    code: 'BCH 405',
    title: 'Biochemical Toxicology & Pharmacological Biochemistry',
    units: 2,
    semester: 'First Semester',
    level: '400L',
    description: 'Xenobiotic metabolism, Cytochrome P450 monooxygenases, phase I and II biotransformation, reactive oxygen species, and lipid peroxidation.'
  },
  {
    code: 'BCH 409',
    title: 'Biotechnology & Industrial Applications',
    units: 2,
    semester: 'Second Semester',
    level: '400L',
    description: 'Fermentation technology, bioreactor design, enzyme immobilization, single-cell protein production, and biofuel synthesis.'
  },
  {
    code: 'BCH 499',
    title: 'Undergraduate Research Project & Dissertation',
    units: 6,
    semester: 'Second Semester',
    level: '400L',
    description: 'Independent supervised experimental investigation, statistical analysis, dissertation writing, and oral defense before external examiners.'
  }
];

export const AcademicsView: React.FC = () => {
  const { setActivePage } = useApp();

  const [selectedLevel, setSelectedLevel] = useState<AcademicLevel>('300L');
  const [activeTab, setActiveTab] = useState<'curriculum' | 'tutorials'>('curriculum');

  const filteredCourses = UDUS_COURSES.filter(c => c.level === selectedLevel);

  const tutorialSchedule = [
    {
      course: 'BCH 301: General & Applied Enzymology',
      topic: 'Michaelis-Menten & Lineweaver-Burk Kinetic Derivations',
      day: 'Saturdays',
      time: '10:00 AM - 12:00 PM',
      venue: 'Lecture Theatre 2 (LT 2), Science Complex',
      tutor: 'Departmental Academic Directorate (400L Lead Tutor)',
      level: '300L'
    },
    {
      course: 'BCH 201: General Biochemistry I',
      topic: 'Amino Acid Titration Curves, Isoelectric Point (pI) & Buffers',
      day: 'Saturdays',
      time: '12:30 PM - 02:30 PM',
      venue: 'Lecture Theatre 2 (LT 2), Science Complex',
      tutor: 'CATC Tutorial Directorate (Peer Tutor)',
      level: '200L'
    },
    {
      course: 'BCH 305: Intermediary Metabolism I',
      topic: 'Regulation of Glycolysis, PFK-1 Allostery & TCA Cycle Energetics',
      day: 'Sundays',
      time: '02:00 PM - 04:00 PM',
      venue: 'Biochemistry Seminar Room, Lab Block',
      tutor: 'Academic Directorate (Enzymology Specialist)',
      level: '300L'
    },
    {
      course: 'BCH 401: Clinical Biochemistry',
      topic: 'Diagnostic Interpretation of LFTs, RFTs, and Cardiac Biomarkers',
      day: 'Fridays',
      time: '04:00 PM - 06:00 PM',
      venue: 'PTDF Hall B, Faculty of Science',
      tutor: 'Lead Clinical Biochemistry Tutor (400L)',
      level: '400L'
    }
  ];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-blue-900" />
              <span>Departmental Academic Framework</span>
            </div>
            
            <h1 className="font-display-academic text-3xl sm:text-4xl font-bold text-slate-900">
              Biochemistry Syllabi, Curriculum &amp; Tutorials
            </h1>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore the National Universities Commission (NUC) BMAS and UDUS Department of Biochemistry syllabus across all levels, along with our weekly Constant Academic Tutorial Classes (CATC).
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'curriculum'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Course Curriculum (100L - 400L)</span>
          </button>

          <button
            onClick={() => setActiveTab('tutorials')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'tutorials'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Constant Tutorial Classes (CATC)</span>
          </button>
        </div>

        {/* Tab 1: Curriculum */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            {/* Level Selector */}
            <div className="flex items-center gap-2">
              {(['100L', '200L', '300L', '400L'] as AcademicLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    selectedLevel === lvl
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {lvl} Courses
                </button>
              ))}
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map((c) => (
                <div
                  key={c.code}
                  className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-mono font-bold text-blue-900 text-sm">{c.code}</span>
                      <span className="font-semibold text-slate-700">{c.units} Units · {c.semester}</span>
                    </div>

                    <h3 className="font-display-academic text-lg font-bold text-slate-900 leading-snug">
                      {c.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-serif-academic text-sm">
                      {c.description}
                    </p>

                    {c.prerequisite && (
                      <div className="mt-3 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">Prerequisite: </span>
                        <span className="font-mono text-blue-900">{c.prerequisite}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">NUC Accredited Course</span>
                    <button
                      onClick={() => setActivePage('resources')}
                      className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>Find Course Materials</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Constant Academic Tutorial Classes (CATC) */}
        {activeTab === 'tutorials' && (
          <div className="space-y-6">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950">
              <span className="font-bold">Peer-to-Peer Academic Masterclass: </span>
              Tutorial classes run weekly at Lecture Theatre 2 (LT 2). Attendance is open to all registered Biochemistry students. Bring lecture notebooks and past question booklets.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorialSchedule.map((t, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                      {t.level}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800">{t.day}</span>
                  </div>

                  <div>
                    <h3 className="font-display-academic text-base font-bold text-slate-900">
                      {t.course}
                    </h3>
                    <div className="text-xs text-slate-600 mt-1">
                      Focus: <span className="font-medium text-slate-800">{t.topic}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                      <span>{t.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                      <span>{t.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                      <span>Tutor: {t.tutor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
