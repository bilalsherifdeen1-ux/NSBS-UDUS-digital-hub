import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ExternalLink, 
  ShieldAlert, 
  Brain, 
  BookOpen, 
  RotateCw, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Layers, 
  Sliders,
  ChevronRight,
  RefreshCw,
  Copy,
  Check,
  Bot,
  Cpu,
  FlaskConical,
  Plus
} from 'lucide-react';
import { AIAgent } from '../../types';

export const AILabView: React.FC = () => {
  const { siteSettings, showToast, userRole, setActivePage } = useApp();

  const [activeTool, setActiveTool] = useState<'flashcards' | 'explainer' | 'quiz' | 'labreport' | 'citation'>('flashcards');

  // Flashcards tool state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const flashcards = [
    {
      course: 'BCH 301 · Enzymology',
      front: 'What is the physiological significance of the Michaelis Constant (Km)?',
      back: 'Km is the substrate concentration at which the reaction velocity is half of Vmax (1/2 Vmax). It reflects enzyme affinity for substrate: an inverse relationship where a lower Km indicates higher affinity.'
    },
    {
      course: 'BCH 305 · Metabolism',
      front: 'Which reaction serves as the primary rate-limiting and committed step of Glycolysis?',
      back: 'Phosphorylation of Fructose-6-phosphate to Fructose-1,6-bisphosphate catalyzed by Phosphofructokinase-1 (PFK-1). It is allosterically inhibited by high ATP and citrate, and stimulated by AMP and Fructose-2,6-bisphosphate.'
    },
    {
      course: 'BCH 401 · Clinical Biochemistry',
      front: 'Why is Alanine Aminotransferase (ALT) considered more specific for hepatic injury than Aspartate Aminotransferase (AST)?',
      back: 'ALT is primarily localized within the cytoplasm of hepatocytes, whereas AST is abundant across cardiac muscle, skeletal muscle, and erythrocytes as well as liver mitochondria. An isolated marked elevation of ALT strongly points to acute hepatocellular damage.'
    },
    {
      course: 'BCH 403 · Molecular Biology',
      front: 'What single point mutation causes Sickle Cell Hemoglobin (HbS)?',
      back: 'A single nucleotide transversion (GAG to GTG) at codon 6 of the beta-globin gene on chromosome 11, resulting in substitution of hydrophilic glutamic acid with hydrophobic valine.'
    },
    {
      course: 'BCH 311 · Bioenergetics',
      front: 'What is the net ATP yield from complete aerobic oxidation of one molecule of Palmitate (16C Fatty Acid)?',
      back: 'Complete beta-oxidation of Palmitate (16:0) yields 7 FADH2, 7 NADH, and 8 Acetyl-CoA. After subtracting 2 ATP equivalents consumed for acyl-CoA activation, the standard net yield is 106 ATP (or 108 gross).'
    }
  ];

  // Explainer tool state
  const [selectedConcept, setSelectedConcept] = useState('Allosteric Regulation');
  const [conceptLevel, setConceptLevel] = useState<'100L' | '200L-300L' | '400L'>('200L-300L');

  const conceptExplanations: Record<string, Record<string, string>> = {
    'Allosteric Regulation': {
      '100L': 'Enzymes have a main active site where chemical reactions happen. Allosteric enzymes have a second separate site (an allosteric site) where helper or inhibitor molecules bind like a key, changing the enzyme shape to speed up or slow down the reaction.',
      '200L-300L': 'Allosteric regulation involves non-covalent binding of effectors (activators or inhibitors) to regulatory sites distinct from the catalytic pocket. This induces cooperative conformational transitions (T-state low affinity vs. R-state high affinity), causing sigmoidal kinetics described by the Monod-Wyman-Changeux (MWC) or Koshland (KNF) models.',
      '400L': 'Allosteric regulation coordinates multi-enzyme fluxes and feedback loops without transcriptional latency. Heterotropic effectors alter quaternary subunit-subunit quaternary interfaces (e.g. Aspartate Transcarbamoylase regulated by ATP and CTP). In structural biology, cryo-EM and NMR elucidate allosteric transmission pathways as coupled thermodynamic networks across distant peptide backbones.'
    },
    'Henderson-Hasselbalch Equation': {
      '100L': 'A mathematical rule that shows how acid and base concentrations balance in a solution to set its pH. It is essential for understanding how blood buffers prevent dangerous acidity.',
      '200L-300L': 'pH = pKa + log([A⁻]/[HA]). It quantitatively relates pH, dissociation constant (pKa), and ratio of conjugate base to weak acid. In physiological buffers, when [A⁻] = [HA], pH = pKa, which provides maximum buffer capacity within ±1.0 pH unit.',
      '400L': 'In clinical acid-base interpretation, the bicarbonate-carbonic acid system is modeled as pH = 6.1 + log([HCO3⁻]/(0.0307 × PaCO2)). It enables clinicians to differentiate respiratory vs. metabolic acidosis/alkalosis, compute the anion gap, and predict renal compensation kinetics.'
    },
    'CRISPR/Cas9 Molecular Mechanism': {
      '100L': 'A molecular pair of scissors found in bacteria that scientists use to edit DNA with pinpoint accuracy.',
      '200L-300L': 'An adaptive bacterial immune system repurposing Cas9 endonuclease guided by single guide RNA (sgRNA). Cas9 inspects genomic DNA for Protospacer Adjacent Motifs (PAM, 5\'-NGG-3\'), unwinds the duplex, and generates a double-strand break (DSB) repaired by NHEJ or HDR.',
      '400L': 'Precise genome engineering platform utilizing RuvC and HNH catalytic nuclease domains. Advanced iterations include catalytically dead dCas9 fused to cytidine or adenine deaminases for base editing without double-strand cleavage, and prime editors using reverse transcriptase to synthesize intended genomic alterations.'
    }
  };

  // Quiz tool state
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);

  const quizQuestions = [
    {
      question: 'Which of the following competitive enzyme inhibitors will cause what kinetic change?',
      options: [
        'Vmax increases, Km remains unchanged',
        'Km increases, Vmax remains unchanged',
        'Both Km and Vmax decrease proportionally',
        'Km remains unchanged, Vmax decreases'
      ],
      correct: 1,
      explanation: 'In competitive inhibition, the inhibitor binds the active site reversibly. Increasing substrate concentration outcompetes the inhibitor; hence Vmax is unchanged while the apparent Km increases.'
    },
    {
      question: 'During severe prolonged starvation or uncontrolled diabetes, high acetyl-CoA in the liver is channeled into:',
      options: [
        'Fatty acid de novo synthesis',
        'Ketogenesis (Acetoacetate & Beta-hydroxybutyrate)',
        'Cholesterol biosynthesis via HMG-CoA reductase',
        'Urea synthesis'
      ],
      correct: 1,
      explanation: 'Oxaloacetate is depleted for gluconeogenesis, slowing the TCA cycle. Excess mitochondrial Acetyl-CoA is converted by the liver into ketone bodies for the brain and peripheral muscles.'
    },
    {
      question: 'Which biomarker is considered the gold-standard diagnostic enzyme for acute myocardial infarction within the initial 4-12 hours?',
      options: [
        'Alkaline Phosphatase (ALP)',
        'Cardiac Troponin I / T and CK-MB',
        'Alanine Aminotransferase (ALT)',
        'Amylase'
      ],
      correct: 1,
      explanation: 'Cardiac Troponins and the CK-MB isoenzyme rise rapidly following myocardial necrosis and provide high organ-specific clinical sensitivity.'
    }
  ];

  const handleQuizAnswer = (index: number) => {
    if (showAnswerFeedback) return;
    setSelectedAnswer(index);
    setShowAnswerFeedback(true);
    if (index === quizQuestions[quizQuestionIndex].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    setSelectedAnswer(null);
    setShowAnswerFeedback(false);
    if (quizQuestionIndex < quizQuestions.length - 1) {
      setQuizQuestionIndex(prev => prev + 1);
    } else {
      setQuizQuestionIndex(0);
      setQuizScore(0);
    }
  };

  // Lab Report Assistant State
  const [reportExperimentTitle, setReportExperimentTitle] = useState('Determination of Serum Alkaline Phosphatase (ALP) Activity');
  const [copiedReport, setCopiedReport] = useState(false);

  const generatedReportTemplate = `DEPARTMENT OF BIOCHEMISTRY
USMANU DANFODIYO UNIVERSITY, SOKOTO
PRACTICAL LABORATORY REPORT

TITLE: ${reportExperimentTitle}
COURSE CODE: BCH 303 / 401
NAME: [Student Name] | MATRIC NO: [22/14/XXXX] | LEVEL: 300L/400L

1. PRINCIPLE OF THE ASSAY
Serum Alkaline Phosphatase (ALP) hydrolyzes colorless p-nitrophenyl phosphate (pNPP) at an alkaline pH (approx. 10.4) to yield yellow p-nitrophenol and inorganic phosphate. The rate of yellow color formation measured spectrophotometrically at 405 nm is directly proportional to the enzymatic activity of ALP in the sample:
pNPP + H2O --(ALP, Mg2+)--> p-Nitrophenol (yellow, 405 nm) + Pi

2. REAGENTS AND APPARATUS
- Diethanolamine (DEA) buffer (pH 10.4, 1.0 mol/L) containing MgCl2 (0.5 mmol/L)
- Substrate: p-Nitrophenyl phosphate (10 mmol/L)
- UV-Vis Spectrophotometer with 1.0 cm pathlength cuvette
- Serum specimen (non-hemolyzed)
- Precision micropipettes and calibrated water bath (37°C)

3. PROCEDURE & PROTOCOL
- Pipette 1.0 mL of buffered reagent into clean cuvette; pre-warm at 37°C for 3 minutes.
- Add 0.02 mL (20 µL) of patient serum; mix immediately by inversion.
- Record initial absorbance at 405 nm, then record at 1-minute intervals for 3 minutes (ΔA/min).

4. CALCULATIONS
ALP Activity (U/L) = (ΔA/min × Total Volume × 1000) / (ε × Sample Volume × Light Path)
Where extinction coefficient (ε) of p-nitrophenol at 405 nm = 18.75 L/(mmol·cm).

5. CLINICAL INTERPRETATION
- Normal Adult Reference Range: 30 - 120 U/L at 37°C.
- Elevated values are observed in obstructive hepatobiliary disease, Paget's disease of bone, osteomalacia, and physiological growth phases in children.

6. REFERENCES (APA FORMAT)
Kaplan, L. A., & Pesce, A. J. (2010). Clinical Chemistry: Theory, Analysis, Correlation (5th ed.). Mosby Elsevier.`;

  const copyReportToClipboard = () => {
    navigator.clipboard.writeText(generatedReportTemplate);
    setCopiedReport(true);
    showToast('Lab report template copied to clipboard!');
    setTimeout(() => setCopiedReport(false), 3000);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Academic Header Banner */}
        <div className="bg-[#0a192f] text-white rounded-xl border border-blue-900/60 p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-dark-science-grid opacity-20 pointer-events-none"></div>
          
          <div className="relative max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-950 border border-blue-700 text-emerald-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NSBS ARTIFICIAL INTELLIGENCE LAB</span>
            </div>
            
            <h1 className="font-display-academic text-3xl sm:text-5xl font-bold tracking-tight">
              Biochemistry AI Study & Research Lab
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Empowering UDUS Biochemistry students with specialized machine intelligence for metabolic modeling, flashcard revisions, clinical diagnostic case studies, and lab reporting.
            </p>
          </div>

          {userRole === 'admin' && (
            <div className="relative mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-amber-300 font-medium">
                Admin note: External Gemini Gem and Custom GPT URLs can be updated in the Admin CMS.
              </span>
              <button
                onClick={() => setActivePage('admin-dashboard')}
                className="px-3 py-1.5 rounded bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold"
              >
                Configure AI Endpoints
              </button>
            </div>
          )}
        </div>

        {/* Academic Integrity Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3 text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold">Official Departmental Academic Integrity Notice: </span>
            The artificial intelligence tools provided here are supplementary educational aids designed to aid revision and literature discovery. They must not be used to replace your original academic writing, continuous assessment work, or laboratory observations. All biochemical claims, pathway sequences, and diagnostic parameters must be verified against authoritative textbooks (such as Lehninger Principles of Biochemistry, Harper&apos;s Illustrated Biochemistry, and Stryer) and verified under academic supervision.
          </div>
        </div>

        {/* External AI Integrations Launch Cards (Configurable via Admin CMS) */}
        {(() => {
          const agents: AIAgent[] = (siteSettings.aiIntegrations?.agents && siteSettings.aiIntegrations.agents.length > 0)
            ? siteSettings.aiIntegrations.agents.filter(a => a.active)
            : [
                {
                  id: 'agent-gemini-fallback',
                  name: siteSettings.aiIntegrations.geminiAssistant.name,
                  provider: 'gemini',
                  providerLabel: 'Google Gemini Custom Gem',
                  description: siteSettings.aiIntegrations.geminiAssistant.description,
                  url: siteSettings.aiIntegrations.geminiAssistant.url,
                  active: true,
                  capabilities: [
                    'Biochemical pathway step-by-step resolution',
                    'Michaelis-Menten kinetic derivation tutoring',
                    'Carbohydrate & lipid regulation quiz generation'
                  ],
                  iconType: 'sparkles'
                },
                {
                  id: 'agent-gpt-fallback',
                  name: siteSettings.aiIntegrations.customGpt.name,
                  provider: 'openai',
                  providerLabel: 'OpenAI Custom GPT',
                  description: siteSettings.aiIntegrations.customGpt.description,
                  url: siteSettings.aiIntegrations.customGpt.url,
                  active: true,
                  capabilities: [
                    'Phytochemical literature synthesis and summarization',
                    'Standardized lab protocol & notebook formatting',
                    'In silico bioinformatics primer troubleshooting'
                  ],
                  iconType: 'brain'
                }
              ];

          if (agents.length === 0) {
            return (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <Bot className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h3 className="font-display-academic text-base font-bold text-slate-800">No External AI Agents Active</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  External AI learning models can be added and configured by executive administrators.
                </p>
                {userRole === 'admin' && (
                  <button
                    onClick={() => setActivePage('admin-dashboard')}
                    className="mt-3 px-4 py-2 rounded-lg bg-blue-900 text-white text-xs font-semibold"
                  >
                    Configure AI Agents
                  </button>
                )}
              </div>
            );
          }

          return (
            <div className={`grid grid-cols-1 ${agents.length === 1 ? 'max-w-xl mx-auto' : agents.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
              {agents.map((agent) => {
                const isGemini = agent.provider === 'gemini';
                const isOpenAI = agent.provider === 'openai';
                const isClaude = agent.provider === 'claude';
                const isDeepSeek = agent.provider === 'deepseek';

                const badgeClass = isGemini 
                  ? 'text-blue-900 bg-blue-50 border-blue-200' 
                  : isOpenAI 
                  ? 'text-emerald-900 bg-emerald-50 border-emerald-200' 
                  : isClaude 
                  ? 'text-purple-900 bg-purple-50 border-purple-200' 
                  : isDeepSeek 
                  ? 'text-cyan-900 bg-cyan-50 border-cyan-200'
                  : 'text-indigo-900 bg-indigo-50 border-indigo-200';

                const buttonClass = isGemini
                  ? 'bg-blue-900 hover:bg-blue-800'
                  : isOpenAI
                  ? 'bg-emerald-800 hover:bg-emerald-700'
                  : isClaude
                  ? 'bg-purple-800 hover:bg-purple-700'
                  : isDeepSeek
                  ? 'bg-cyan-800 hover:bg-cyan-700'
                  : 'bg-indigo-800 hover:bg-indigo-700';

                const hoverBorderClass = isGemini
                  ? 'hover:border-blue-400'
                  : isOpenAI
                  ? 'hover:border-emerald-400'
                  : isClaude
                  ? 'hover:border-purple-400'
                  : 'hover:border-indigo-400';

                return (
                  <div 
                    key={agent.id} 
                    className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between ${hoverBorderClass} transition-all`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 gap-2">
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${badgeClass} truncate`}>
                          {agent.providerLabel || 'AI Agent'}
                        </span>
                        <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                          Active Integration
                        </span>
                      </div>

                      <h2 className="font-display-academic text-xl font-bold text-slate-900">
                        {agent.name}
                      </h2>

                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {agent.description}
                      </p>

                      {agent.capabilities && agent.capabilities.length > 0 && (
                        <div className="mt-3 space-y-1 text-[11px] text-slate-500">
                          {agent.capabilities.slice(0, 3).map((c, i) => (
                            <div key={i} className="flex items-center gap-1.5 truncate">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-1 font-mono">
                        <div className="truncate">• Destination: {agent.url}</div>
                        <div>• Provider: {agent.providerLabel || 'External LLM Service'}</div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <a
                        href={agent.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`w-full py-2.5 px-4 rounded-lg ${buttonClass} text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm`}
                      >
                        <span>Launch {agent.name.split(' ')[0] || 'AI Agent'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* In-Browser Interactive AI Study Tools */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Tool Navigation Bar */}
          <div className="border-b border-slate-200 bg-slate-50/70 p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Interactive In-Browser Study Tools
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTool('flashcards')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTool === 'flashcards' 
                    ? 'bg-blue-900 text-white shadow-sm' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Flashcard Practice</span>
              </button>

              <button
                onClick={() => setActiveTool('explainer')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTool === 'explainer' 
                    ? 'bg-blue-900 text-white shadow-sm' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Concept Explainer</span>
              </button>

              <button
                onClick={() => setActiveTool('quiz')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTool === 'quiz' 
                    ? 'bg-blue-900 text-white shadow-sm' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>MCQ Exam Drill</span>
              </button>

              <button
                onClick={() => setActiveTool('labreport')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTool === 'labreport' 
                    ? 'bg-blue-900 text-white shadow-sm' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Lab Report Assistant</span>
              </button>
            </div>
          </div>

          {/* Tool Body */}
          <div className="p-6 sm:p-8">
            
            {/* Tool 1: Flashcards */}
            {activeTool === 'flashcards' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-blue-900">
                    Card {flashcardIndex + 1} of {flashcards.length}
                  </span>
                  <span>{flashcards[flashcardIndex].course}</span>
                </div>

                {/* Flip Card Container */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`min-h-[220px] p-8 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between select-none ${
                    isFlipped 
                      ? 'bg-emerald-50/60 border-emerald-300 shadow-md' 
                      : 'bg-white border-blue-900/30 hover:border-blue-900 shadow-sm'
                  }`}
                >
                  <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    {isFlipped ? 'ANSWER & BIOCHEMICAL PRINCIPLE' : 'EXAM QUESTION PROMPT'}
                  </div>

                  <div className="my-4 font-serif-academic text-lg sm:text-xl text-slate-900 font-bold leading-relaxed">
                    {isFlipped ? flashcards[flashcardIndex].back : flashcards[flashcardIndex].front}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-200/60">
                    <span className="flex items-center gap-1">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Click to flip card</span>
                    </span>
                    <span className="font-medium text-slate-600">
                      {isFlipped ? 'Verified UDUS Curriculum' : 'Active Recall Mode'}
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsFlipped(false);
                      setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1));
                    }}
                    className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700"
                  >
                    ← Previous Card
                  </button>

                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800"
                  >
                    Flip Card
                  </button>

                  <button
                    onClick={() => {
                      setIsFlipped(false);
                      setFlashcardIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0));
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold"
                  >
                    Next Card →
                  </button>
                </div>
              </div>
            )}

            {/* Tool 2: Concept Explainer */}
            {activeTool === 'explainer' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div>
                  <h3 className="font-display-academic text-xl font-bold text-slate-900">
                    Biochemical Concept Explainer
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Select a core biochemical concept and adjust the academic rigor level to match your year of study.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Select Concept:</label>
                    <select
                      value={selectedConcept}
                      onChange={(e) => setSelectedConcept(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-800 bg-white"
                    >
                      {Object.keys(conceptExplanations).map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Rigor / Level:</label>
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-lg">
                      <button
                        onClick={() => setConceptLevel('100L')}
                        className={`py-1.5 text-xs font-medium rounded ${conceptLevel === '100L' ? 'bg-white text-blue-900 shadow-sm font-bold' : 'text-slate-600'}`}
                      >
                        100L Basic
                      </button>
                      <button
                        onClick={() => setConceptLevel('200L-300L')}
                        className={`py-1.5 text-xs font-medium rounded ${conceptLevel === '200L-300L' ? 'bg-white text-blue-900 shadow-sm font-bold' : 'text-slate-600'}`}
                      >
                        200L-300L
                      </button>
                      <button
                        onClick={() => setConceptLevel('400L')}
                        className={`py-1.5 text-xs font-medium rounded ${conceptLevel === '400L' ? 'bg-white text-blue-900 shadow-sm font-bold' : 'text-slate-600'}`}
                      >
                        400L Advanced
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-blue-900 uppercase font-mono mb-2">
                    {selectedConcept} ({conceptLevel})
                  </div>
                  <div className="font-serif-academic text-base text-slate-800 leading-relaxed">
                    {conceptExplanations[selectedConcept]?.[conceptLevel]}
                  </div>
                </div>
              </div>
            )}

            {/* Tool 3: MCQ Quiz Drill */}
            {activeTool === 'quiz' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-blue-900">
                    Question {quizQuestionIndex + 1} of {quizQuestions.length}
                  </span>
                  <span className="font-mono">Score: {quizScore} / {quizQuestions.length}</span>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h4 className="font-display-academic text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-4">
                    {quizQuestions[quizQuestionIndex].question}
                  </h4>

                  <div className="space-y-2.5">
                    {quizQuestions[quizQuestionIndex].options.map((opt, idx) => {
                      const isSelected = selectedAnswer === idx;
                      const isCorrect = idx === quizQuestions[quizQuestionIndex].correct;

                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-blue-900';
                      if (showAnswerFeedback) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-red-50 border-red-500 text-red-950';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuizAnswer(idx)}
                          className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showAnswerFeedback && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {showAnswerFeedback && (
                    <div className="mt-5 p-4 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-950 leading-relaxed">
                      <span className="font-bold">Model Explanation: </span>
                      {quizQuestions[quizQuestionIndex].explanation}
                    </div>
                  )}
                </div>

                {showAnswerFeedback && (
                  <div className="text-right">
                    <button
                      onClick={nextQuizQuestion}
                      className="px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold transition-colors"
                    >
                      {quizQuestionIndex < quizQuestions.length - 1 ? 'Next Question →' : 'Restart Quiz Drill'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tool 4: Lab Report Assistant */}
            {activeTool === 'labreport' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div>
                  <h3 className="font-display-academic text-xl font-bold text-slate-900">
                    Standard UDUS Practical Report Structure Assistant
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Generates standardized departmental laboratory formats for qualitative analysis, spectrophotometry, and enzyme assays.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Practical Experiment Topic:
                  </label>
                  <input
                    type="text"
                    value={reportExperimentTitle}
                    onChange={(e) => setReportExperimentTitle(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-800"
                  />
                </div>

                <div className="relative">
                  <pre className="p-5 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono leading-relaxed overflow-x-auto max-h-96">
                    {generatedReportTemplate}
                  </pre>
                  <button
                    onClick={copyReportToClipboard}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
                  >
                    {copiedReport ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedReport ? 'Copied!' : 'Copy Outline'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
