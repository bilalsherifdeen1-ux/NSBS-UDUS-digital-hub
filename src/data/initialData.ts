import {
  Resource,
  EventItem,
  Announcement,
  Opportunity,
  Executive,
  Programme,
  ResearchProject,
  SiteSettings,
  AdministrationArchive,
  GalleryItem,
  Certificate,
  StudentUser
} from '../types';

export const initialSiteSettings: SiteSettings = {
  organizationName: 'Nigerian Society of Biochemistry Students',
  universityName: 'Usmanu Danfodiyo University, Sokoto',
  chapter: 'UDUS Chapter',
  session: '2026/2027 Academic Session',
  theme: 'Advancing the Frontiers of Biochemical Science, Innovation and Student Leadership',
  motto: 'Advancing Biochemistry · Empowering Students · Building the Future',
  presidentName: 'Office of the President',
  presidentMessage: `On behalf of the 2026/2027 Executive Council of the Nigerian Society of Biochemistry Students (NSBS), Usmanu Danfodiyo University, Sokoto Chapter, it is my distinct honor to welcome you to our official academic and student-community platform. 

Biochemistry sits at the very crossroads of modern medicine, agriculture, biotechnology, and artificial intelligence. Our administration is committed to providing every student of this historic department with world-class digital resources, rigorous tutorial frameworks, peer-reviewed literature access, cross-disciplinary innovation challenges, and career mentorship. Let this platform serve as your digital laboratory and academic launchpad as we uncover the molecular intricacies of life together.`,
  officialEmail: 'nsbs.udus@udusok.edu.ng',
  officialPhone: '+234 814 290 8821',
  departmentAddress: 'Department of Biochemistry, Faculty of Chemical and Life Sciences, Usmanu Danfodiyo University, Main Campus, Sokoto, Nigeria',
  socials: {
    whatsapp: 'https://chat.whatsapp.com/NSBS-UDUS-2026',
    instagram: 'https://instagram.com/nsbs_udus',
    linkedin: 'https://linkedin.com/company/nsbs-udus',
    twitter: 'https://x.com/nsbs_udus',
    facebook: 'https://facebook.com/nsbs.udus',
    telegram: 'https://t.me/nsbsudus',
    youtube: 'https://youtube.com/@nsbsudusofficial'
  },
  aiIntegrations: {
    geminiAssistant: {
      name: 'NSBS Gemini Academic Assistant',
      description: 'An AI-powered academic assistant tuned for Biochemistry students to clarify biochemical pathways, enzymology kinetics, and molecular genetics.',
      url: 'https://gemini.google.com/gems/nsbs-biochem-academic-tutor',
      active: true
    },
    customGpt: {
      name: 'NSBS Biochemistry GPT',
      description: 'A specialized AI assistant for literature review synthesis, lab protocol drafting, and metabolic regulation revision.',
      url: 'https://chatgpt.com/g/g-nsbs-biochemistry-expert',
      active: true
    },
    agents: [
      {
        id: 'agent-gemini',
        name: 'NSBS Gemini Academic Assistant',
        provider: 'gemini',
        providerLabel: 'Google Gemini Custom Gem',
        description: 'An AI-powered academic assistant tuned for Biochemistry students to clarify biochemical pathways, enzymology kinetics, and molecular genetics.',
        url: 'https://gemini.google.com/gems/nsbs-biochem-academic-tutor',
        active: true,
        capabilities: [
          'Biochemical pathway step-by-step resolution',
          'Michaelis-Menten kinetic derivation tutoring',
          'Carbohydrate & lipid regulation quiz generation'
        ],
        iconType: 'sparkles'
      },
      {
        id: 'agent-gpt',
        name: 'NSBS Biochemistry GPT',
        provider: 'openai',
        providerLabel: 'OpenAI Custom GPT',
        description: 'A specialized AI assistant for literature review synthesis, lab protocol drafting, and metabolic regulation revision.',
        url: 'https://chatgpt.com/g/g-nsbs-biochemistry-expert',
        active: true,
        capabilities: [
          'Phytochemical literature synthesis and summarization',
          'Standardized lab protocol & notebook formatting',
          'In silico bioinformatics primer troubleshooting'
        ],
        iconType: 'brain'
      },
      {
        id: 'agent-metabolism',
        name: 'Metabolic Pathway Navigator',
        provider: 'claude',
        providerLabel: 'Anthropic Claude Interactive Tutor',
        description: 'Specialized interactive agent for tracing cellular respiration, citric acid cycle fluxes, and electron transport chain complexes.',
        url: 'https://claude.ai/project/nsbs-metabolism',
        active: true,
        capabilities: [
          'Krebs cycle and glycolysis intermediate audits',
          'ATP stoichiometry calculators',
          'Allosteric enzyme inhibition feedback'
        ],
        iconType: 'microscope'
      }
    ]
  },
  metrics: {
    registeredStudents: 842,
    academicResources: 168,
    eventsOrganized: 24,
    trainingProgrammes: 12,
    researchInitiatives: 18,
    outreachBeneficiaries: 1450,
    communityOutreaches: 8
  }
};

export const initialResources: Resource[] = [
  {
    id: 'res-1',
    title: 'Clinical Biochemistry & Biochemical Diagnostics Lecture Notes',
    courseCode: 'BCH 401',
    courseName: 'Clinical Biochemistry',
    level: '400L',
    category: 'Clinical Biochemistry',
    author: 'Prof. A. A. Jigam & Dr. M. B. Bello',
    description: 'Comprehensive lecture series covering liver function tests, renal clearance, cardiac markers, metabolic enzymology, and inborn errors of metabolism.',
    fileType: 'PDF',
    fileSize: '6.4 MB',
    uploadDate: '2026-09-12',
    uploadedBy: 'Director of Academic Initiatives',
    googleDriveUrl: 'https://drive.google.com/file/d/1BCH401_Clinical_Biochem_UDUS/view?usp=sharing',
    tags: ['Liver Function', 'Renal Biomarkers', 'Diagnostics', 'Pathology'],
    downloadsCount: 384,
    featured: true,
    published: true
  },
  {
    id: 'res-2',
    title: 'Advanced Molecular Biology & Recombinant DNA Technology Manual',
    courseCode: 'BCH 403',
    courseName: 'Molecular Biology & Genetic Engineering',
    level: '400L',
    category: 'Molecular Biology',
    author: 'Dr. K. J. Umar & NSBS Academic Directorate',
    description: 'PCR primer design, CRISPR/Cas9 molecular mechanisms, Sanger & Next-Gen sequencing, plasmid vector cloning protocols for final-year students.',
    fileType: 'PDF',
    fileSize: '9.2 MB',
    uploadDate: '2026-09-08',
    uploadedBy: 'Academic Admin',
    googleDriveUrl: 'https://drive.google.com/file/d/1BCH403_MolBio_Manual_UDUS/view?usp=sharing',
    tags: ['CRISPR', 'PCR', 'Cloning', 'Gene Expression'],
    downloadsCount: 512,
    featured: true,
    published: true
  },
  {
    id: 'res-3',
    title: 'Enzyme Kinetics & Catalytic Mechanisms: Derivations & Solved Problems',
    courseCode: 'BCH 301',
    courseName: 'General & Applied Enzymology',
    level: '300L',
    category: 'Enzymology',
    author: 'Dr. Y. Saidu',
    description: 'Detailed derivations of Michaelis-Menten, Lineweaver-Burk, Eadie-Hofstee, and allosteric Hill coefficient equations with past exam question solutions.',
    fileType: 'PDF',
    fileSize: '4.8 MB',
    uploadDate: '2026-08-30',
    uploadedBy: 'Tutorial Directorate',
    googleDriveUrl: 'https://drive.google.com/file/d/1BCH301_Enzyme_Kinetics_UDUS/view?usp=sharing',
    tags: ['Michaelis-Menten', 'Inhibition', 'Km Vmax', 'Allostery'],
    downloadsCount: 620,
    featured: true,
    published: true
  },
  {
    id: 'res-4',
    title: 'Intermediary Metabolism: Carbohydrates, Lipids & Amino Acids Chart & Notes',
    courseCode: 'BCH 305',
    courseName: 'Intermediary Metabolism I',
    level: '300L',
    category: 'Metabolism',
    author: 'Prof. L. S. Bilbis',
    description: 'High-resolution biochemical pathway maps of Glycolysis, TCA Cycle, Pentose Phosphate Pathway, Beta-Oxidation, Ketogenesis, and Urea Cycle regulation.',
    fileType: 'PDF',
    fileSize: '12.1 MB',
    uploadDate: '2026-08-15',
    uploadedBy: 'Academic Committee',
    googleDriveUrl: 'https://drive.google.com/file/d/1BCH305_Metabolism_Maps_UDUS/view?usp=sharing',
    tags: ['Glycolysis', 'Krebs Cycle', 'Beta-Oxidation', 'Bioenergetics'],
    downloadsCount: 840,
    featured: true,
    published: true
  },
  {
    id: 'res-5',
    title: 'BCH 201: General Biochemistry I Past Questions & Solutions (2018–2025)',
    courseCode: 'BCH 201',
    courseName: 'General Biochemistry I',
    level: '200L',
    category: 'Past Questions',
    author: 'NSBS UDUS Academic Committee',
    description: 'Eight-year compilation of UDUS semester examination papers with step-by-step marking schemes, structured essay guides, and multiple choice revisions.',
    fileType: 'PDF',
    fileSize: '5.1 MB',
    uploadDate: '2026-09-01',
    uploadedBy: 'Tutorial Coordinator',
    googleDriveUrl: 'https://drive.google.com/file/d/1BCH201_Past_Questions_UDUS/view?usp=sharing',
    tags: ['Past Questions', 'Exam Revision', '200 Level', 'Model Answers'],
    downloadsCount: 975,
    featured: true,
    published: true
  },
  {
    id: 'res-6',
    title: 'Lehninger Principles of Biochemistry (Digital Reference Library Access)',
    courseCode: 'GENERAL',
    courseName: 'Reference Textbooks',
    level: 'General',
    category: 'Textbooks',
    author: 'David L. Nelson & Michael M. Cox',
    description: 'Academic access guide and chapter-by-chapter reading syllabus aligned with the National Universities Commission (NUC) BMAS and UDUS curricula.',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    uploadDate: '2026-07-20',
    uploadedBy: 'Chief Librarian',
    googleDriveUrl: 'https://drive.google.com/drive/folders/1NSBS_Lehninger_Reference_UDUS?usp=sharing',
    tags: ['Textbook', 'Reference', 'Curriculum', 'NUC'],
    downloadsCount: 1140,
    featured: true,
    published: true
  },
  {
    id: 'res-7',
    title: 'Departmental Laboratory Safety & Qualitative Biochemistry Practical Manual',
    courseCode: 'BCH 203',
    courseName: 'Practical Biochemistry I',
    level: '200L',
    category: 'Practical Manuals',
    author: 'UDUS Biochemistry Lab Directorate',
    description: 'Official laboratory safety protocols, Molisch test, Biuret test, Ninhydrin reaction, spectrophotometer calibration, and lab notebook reporting conventions.',
    fileType: 'PDF',
    fileSize: '3.9 MB',
    uploadDate: '2026-09-05',
    uploadedBy: 'Health Technologist',
    googleDriveUrl: 'https://drive.google.com/file/d/1BCH203_Practical_Manual_UDUS/view?usp=sharing',
    tags: ['Lab Safety', 'Qualitative Analysis', 'Reactions', 'Protocols'],
    downloadsCount: 460,
    featured: false,
    published: true
  },
  {
    id: 'res-8',
    title: 'Industrial Biotechnology & Microbial Fermentation Processes Handout',
    courseCode: 'BCH 409',
    courseName: 'Biotechnology & Industrial Applications',
    level: '400L',
    category: 'Industrial Biochemistry',
    author: 'Dr. H. M. Maishanu',
    description: 'Bioreactor kinetics, downstream processing, enzyme immobilization, single-cell proteins, and industrial biofuel production techniques.',
    fileType: 'PDF',
    fileSize: '7.8 MB',
    uploadDate: '2026-08-28',
    uploadedBy: 'Academic Admin',
    googleDriveUrl: 'https://drive.google.com/file/d/1BCH409_Industrial_Biotech_UDUS/view?usp=sharing',
    tags: ['Bioreactors', 'Fermentation', 'Enzyme Immobilization', 'Bioprocess'],
    downloadsCount: 310,
    featured: false,
    published: true
  },
  {
    id: 'res-9',
    title: 'Undergraduate Final-Year Project Formulation & Scientific Referencing Guide',
    courseCode: 'BCH 499',
    courseName: 'Research Project',
    level: '400L',
    category: 'Final-Year Project Resources',
    author: 'NSBS Research Committee & Faculty Advisory Board',
    description: 'Standard UDUS departmental format: problem statement crafting, Phytomedicine extraction standards, statistical analysis using SPSS/GraphPad Prism, and APA/Vancouver referencing.',
    fileType: 'PDF',
    fileSize: '2.5 MB',
    uploadDate: '2026-09-15',
    uploadedBy: 'Research Director',
    googleDriveUrl: 'https://drive.google.com/file/d/1BCH499_Project_Writing_Guide_UDUS/view?usp=sharing',
    tags: ['Research Proposal', 'SPSS', 'Phytomedicine', 'Dissertation'],
    downloadsCount: 780,
    featured: true,
    published: true
  }
];

export const initialEvents: EventItem[] = [
  {
    id: 'event-1',
    title: '2026/2027 Freshmen Academic Orientation & Laboratory Immersion',
    description: 'Official welcoming assembly for newly admitted 100L and Direct Entry 200L Biochemistry students. Features departmental survival strategies, mentorship pairings, and lab safety induction.',
    date: '2026-10-14',
    startTime: '09:00 AM',
    endTime: '01:30 PM',
    venue: 'PTDF Hall, Faculty of Science, Main Campus, UDUS',
    organizer: 'NSBS Executive Council & Deanery',
    category: 'Academic',
    speaker: 'Prof. L. S. Bilbis (Keynote Speaker)',
    speakerRole: 'Professor of Biochemistry & Former Vice-Chancellor',
    registrationDeadline: '2026-10-13',
    registrationLimit: 250,
    registeredCount: 182,
    status: 'Upcoming',
    featured: true,
    semester: 'First Semester'
  },
  {
    id: 'event-2',
    title: 'International Webinar: Molecular AI & Computational Drug Discovery',
    description: 'Exploring AlphaFold 3, molecular docking with AutoDock Vina, and how emerging biochemists can leverage machine learning for phytomedical lead compound discovery.',
    date: '2026-10-24',
    startTime: '04:00 PM',
    endTime: '06:00 PM',
    venue: 'Virtual (Zoom / NSBS Portal Live Link)',
    organizer: 'NSBS AI × Biochemistry Directorate',
    category: 'Webinar',
    speaker: 'Dr. Fatima Zahra Aliyu, PhD',
    speakerRole: 'Computational Structural Biologist, Karolinska Institutet',
    registrationDeadline: '2026-10-23',
    registrationLimit: 500,
    registeredCount: 341,
    status: 'Upcoming',
    featured: true,
    semester: 'First Semester'
  },
  {
    id: 'event-3',
    title: 'Intensive Weekend Tutorial: BCH 301 & BCH 201 Masterclass',
    description: 'Deep dive into Michaelis-Menten derivations, Lineweaver-Burk plots, amino acid titration curves, and buffer calculations before continuous assessment tests.',
    date: '2026-10-18',
    startTime: '10:00 AM',
    endTime: '02:00 PM',
    venue: 'Lecture Theatre 2 (LT 2), Science Complex, UDUS',
    organizer: 'NSBS Tutorial Directorate',
    category: 'Tutorial',
    speaker: 'Comr. Ahmad Nasir & Academic Tutors',
    speakerRole: 'NSBS Chief Academic Tutor',
    registrationDeadline: '2026-10-17',
    registrationLimit: 200,
    registeredCount: 195,
    status: 'Upcoming',
    featured: false,
    semester: 'First Semester'
  },
  {
    id: 'event-4',
    title: 'NSBS Annual Biotech Innovation Pitch & Hackathon 2026',
    description: 'Cross-faculty collaboration with UDUS Entrepreneurship Club. Student teams develop and present commercially viable solutions for local agri-waste valorization and diagnostic screening.',
    date: '2026-11-12',
    startTime: '09:30 AM',
    endTime: '04:00 PM',
    venue: 'Centre for Entrepreneurial Studies (CES) Auditorium, UDUS',
    organizer: 'Director of Project Initiatives',
    category: 'Innovation',
    speaker: 'Panel of Biotech Founders & Research Fellows',
    speakerRole: 'Industry Judges',
    registrationDeadline: '2026-11-05',
    registrationLimit: 120,
    registeredCount: 88,
    status: 'Upcoming',
    featured: true,
    semester: 'First Semester'
  },
  {
    id: 'event-5',
    title: 'Biochemistry Without Borders: Community Diabetes & Hypertension Outreach',
    description: 'Voluntary health screening, blood glucose testing, body mass index screening, and nutritional biochemistry education for local communities in Sokoto metropolis.',
    date: '2027-02-20',
    startTime: '08:00 AM',
    endTime: '03:00 PM',
    venue: 'Wamakko Community Health Centre, Sokoto State',
    organizer: 'NSBS Outreach & Health Innovation Team',
    category: 'Outreach',
    speaker: 'Health Technologist & Volunteer Clinicians',
    speakerRole: 'Outreach Coordinators',
    registrationDeadline: '2027-02-15',
    registrationLimit: 80,
    registeredCount: 64,
    status: 'Upcoming',
    featured: true,
    semester: 'Second Semester'
  },
  {
    id: 'event-6',
    title: 'NSBS Week 2027: Grand Scientific Symposium & Awards Dinner',
    description: 'The premier departmental week featuring inter-university biochemistry quiz, debates, cultural exhibition, scientific symposium, and presidential merit awards dinner.',
    date: '2027-04-05',
    startTime: '10:00 AM',
    endTime: '09:00 PM',
    venue: 'UDUS Convocation Hall, Main Campus, Sokoto',
    organizer: 'NSBS 2026/2027 Central Planning Committee',
    category: 'NSBS Week',
    speaker: 'Eminent Scientists & UDUS Biochemistry Alumni',
    speakerRole: 'Honored Dignitaries',
    registrationDeadline: '2027-04-01',
    registrationLimit: 600,
    registeredCount: 210,
    status: 'Upcoming',
    featured: true,
    semester: 'Second Semester'
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Official Launch of the NSBS UDUS Unified Digital Academic & AI Platform',
    summary: 'The Executive Council proudly unveils our state-of-the-art academic portal with integrated Google Drive repository, AI learning assistant, and research submission system.',
    content: `The Nigerian Society of Biochemistry Students (NSBS), Usmanu Danfodiyo University, Sokoto Chapter, is proud to inaugurate this modern digital ecosystem designed to serve our student community across all levels.

Key features include:
1. Direct Google Drive-backed Digital Library for all NUC & UDUS Biochemistry courses (100L through 400L).
2. The NSBS AI Lab featuring custom Gemini and GPT models built for biochemists.
3. Decentralized tutorial tracking and lecture handout archives.
4. Transparent Student Voice portal to communicate academic and welfare concerns directly to student representatives.

All students are encouraged to create their verified profiles and access our digital resources immediately.`,
    category: 'Administrative',
    author: 'NSBS Executive Council',
    authorRole: 'Office of the President',
    date: '2026-09-26',
    priority: 'High',
    published: true,
    featured: true
  },
  {
    id: 'ann-2',
    title: 'Commencement of Continuous Assessment (CA) Revision Tutorials for 200L & 300L',
    summary: 'Tutorials for BCH 201, BCH 202, BCH 301, and BCH 305 begin this Saturday at LT 2. Study handouts and past questions are now available for download.',
    content: `The Tutorial Directorate has finalized the schedule for the first semester continuous assessment preparation classes. High-achieving student tutors will guide participants through complex enzymology kinetics, thermodynamic bioenergetics, and carbohydrate metabolism pathways. Check the Events tab for exact time slots.`,
    category: 'Academic',
    author: 'Directorate of Academic Planning',
    authorRole: 'Academic Director',
    date: '2026-09-24',
    priority: 'Normal',
    published: true,
    featured: false
  },
  {
    id: 'ann-3',
    title: 'Applications Open: PTDF Undergraduate Scholarship Scheme 2026/2027',
    summary: 'Full tuition and maintenance allowance for 200L and 300L Nigerian university students in Science and Engineering. Review eligibility criteria in the Opportunities Hub.',
    content: `The Petroleum Technology Development Fund (PTDF) invites qualified 200L and 300L undergraduate Biochemistry students of Usmanu Danfodiyo University to apply for its national merit scholarship. Minimum CGPA requirement is 3.50/5.00. Deadlines and official application guidelines have been cataloged in our Opportunities Hub.`,
    category: 'Opportunities',
    author: 'NSBS Secretariat',
    authorRole: 'Information Office',
    date: '2026-09-20',
    priority: 'High',
    published: true,
    featured: true
  }
];

export const initialOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'PTDF National Undergraduate Scholarship Scheme',
    organization: 'Petroleum Technology Development Fund (PTDF)',
    description: 'Prestigious federal scholarship covering full institutional tuition, accommodation allowances, and research stipend for full-time Nigerian students.',
    eligibility: 'Must be enrolled in 200L or 300L Biochemistry at a federal university with minimum CGPA of 3.50 on 5.00 scale.',
    deadline: '2026-11-30',
    location: 'Nigeria (National)',
    type: 'Scholarship',
    applicationUrl: 'https://scholarship.ptdf.gov.ng',
    featured: true,
    published: true,
    tags: ['Federal', 'Tuition', 'Undergraduate', 'Stipend']
  },
  {
    id: 'opp-2',
    title: 'Wellcome Trust Biomedical Summer Research Internship',
    organization: 'Wellcome Trust & African Academy of Sciences',
    description: 'Fully funded 8-week summer laboratory research fellowship in infectious disease biochemistry, parasitology, or antimicrobial resistance.',
    eligibility: 'Penultimate year (300L) students with documented interest in molecular biochemistry and phytotherapy.',
    deadline: '2026-12-15',
    location: 'Lagos & Nairobi (Hybrid)',
    type: 'Internship',
    applicationUrl: 'https://wellcome.org/grant-funding/schemes',
    featured: true,
    published: true,
    tags: ['Biomedical', 'Research', 'Funded', 'International']
  },
  {
    id: 'opp-3',
    title: 'DAAD Undergraduate & Postgraduate Research Exchange Grant',
    organization: 'German Academic Exchange Service (DAAD)',
    description: 'Support grant for students pursuing cross-border research internships in European laboratories focusing on enzymology and structural biology.',
    eligibility: 'Final-year students (400L) preparing undergraduate theses with potential for postgraduate transition.',
    deadline: '2027-01-31',
    location: 'Germany / Nigeria',
    type: 'Grant',
    applicationUrl: 'https://www.daad.de/en/study-and-research-in-germany/',
    featured: false,
    published: true,
    tags: ['DAAD', 'Germany', 'Exchange', 'Thesis Grant']
  },
  {
    id: 'opp-4',
    title: 'Nigerian Society for Experimental Biology (NISEB) Young Scientist Award',
    organization: 'NISEB National Council',
    description: 'National competition recognizing outstanding undergraduate research posters and novel biochemical extraction protocols from indigenous medicinal plants.',
    eligibility: 'All registered Nigerian biochemistry undergraduates with an original project abstract.',
    deadline: '2027-03-01',
    location: 'Abuja, Nigeria',
    type: 'Competition',
    applicationUrl: 'https://niseb.org/competitions/young-scientist',
    featured: true,
    published: true,
    tags: ['Competition', 'Poster Presentation', 'Prize', 'NISEB']
  }
];

export const initialExecutives: Executive[] = [
  {
    id: 'exec-1',
    name: '',
    position: 'President',
    portfolio: 'Executive Council Leadership & Departmental Liaison',
    level: '400L',
    areasOfInterest: 'Clinical Biochemistry, Health Innovations',
    biography: 'Leads the NSBS Executive Council, representing biochemistry students across university administration, faculty committees, and external partnerships.',
    responsibilities: [
      'Presides over Executive Council and General Congress meetings',
      'Official student liaison with HOD, Deanery, and University Management',
      'Oversees execution of the 2026/2027 administration action plan',
      'Chief custodian of the NSBS Constitution and strategic vision'
    ],
    photoUrl: '',
    email: 'president.nsbs@udusok.edu.ng',
    order: 1
  },
  {
    id: 'exec-2',
    name: '',
    position: 'Vice President',
    portfolio: 'Academic Directorate & Internal Affairs',
    level: '400L',
    areasOfInterest: 'Phytomedicine, Student Mentorship',
    biography: 'Directly oversees academic support structures, student tutorial committees, and coordinates orientation for incoming students.',
    responsibilities: [
      'Deputizes for the President in executive and ceremonial functions',
      'Supervises the Academic and Tutorial Planning Committee',
      'Coordinates freshmen academic orientation and study circles',
      'Heads the student academic mentorship framework'
    ],
    photoUrl: '',
    email: 'vp.nsbs@udusok.edu.ng',
    order: 2
  },
  {
    id: 'exec-3',
    name: '',
    position: 'General Secretary',
    portfolio: 'Secretariat & Official Correspondence',
    level: '300L',
    areasOfInterest: 'Molecular Biology, Bioinformatics',
    biography: 'Manages official secretarial documentation, congress minutes, university correspondence, and institutional archives.',
    responsibilities: [
      'Maintains official secretarial records, minutes, and society archives',
      'Issues official notices of meetings and general assemblies',
      'Drafts executive memoranda and administrative reports',
      'Supervises annual administrative handover documentation'
    ],
    photoUrl: '',
    email: 'gensec.nsbs@udusok.edu.ng',
    order: 3
  },
  {
    id: 'exec-4',
    name: '',
    position: 'Assistant General Secretary',
    portfolio: 'Secretariat Assistance & Records Management',
    level: '200L',
    areasOfInterest: 'Enzymology, Metabolism',
    biography: 'Assists the General Secretary with administrative logistics, meeting registers, and documentation.',
    responsibilities: [
      'Assists the General Secretary in taking minutes and drafting notices',
      'Maintains digital registers of meetings and congress attendance',
      'Coordinates logistical preparation for executive sessions',
      'Deputizes in secretarial affairs when the General Secretary is indisposed'
    ],
    photoUrl: '',
    email: 'asstgensec.nsbs@udusok.edu.ng',
    order: 4
  },
  {
    id: 'exec-5',
    name: '',
    position: 'Financial Secretary',
    portfolio: 'Financial Records & Society Accounts',
    level: '300L',
    areasOfInterest: 'Biotechnology, Fiscal Accounting',
    biography: 'Ensures immaculate bookkeeping, dues collection tracking, and prepares balance sheets for executive review.',
    responsibilities: [
      'Maintains accurate records of all society receipts, income, and dues',
      'Issues official society receipts for payments and contributions',
      'Prepares financial statements for auditing and congress presentation',
      'Works closely with the Treasurer on budget allocation'
    ],
    photoUrl: '',
    email: 'finsec.nsbs@udusok.edu.ng',
    order: 5
  },
  {
    id: 'exec-6',
    name: '',
    position: 'Treasurer',
    portfolio: 'Disbursement & Budgetary Custody',
    level: '300L',
    areasOfInterest: 'Clinical Chemistry, Bioethics',
    biography: 'Custodian of approved funds, managing banking transactions and ensuring transparent fiscal disbursements.',
    responsibilities: [
      'Custody of society funds and management of approved disbursements',
      'Maintains official bank deposit books and cash flow ledger',
      'Collaborates with Financial Secretary on budget execution',
      'Presents financial ledger for internal and external audit reviews'
    ],
    photoUrl: '',
    email: 'treasurer.nsbs@udusok.edu.ng',
    order: 6
  },
  {
    id: 'exec-7',
    name: '',
    position: 'Public Relations Officer (P.R.O I)',
    portfolio: 'Public Relations, Press & Media Broadcasts',
    level: '300L',
    areasOfInterest: 'Science Communication, Public Health',
    biography: 'The chief image maker of the society, overseeing official press releases, university media relations, and publicity.',
    responsibilities: [
      'Directs public relations, departmental announcements, and external press',
      'Manages official media correspondence and university broadcast channels',
      'Leads publicity campaigns for society events and academic seminars',
      'Protects and promotes the corporate image of NSBS UDUS'
    ],
    photoUrl: '',
    email: 'pro1.nsbs@udusok.edu.ng',
    order: 7
  },
  {
    id: 'exec-8',
    name: '',
    position: 'Assistant Public Relations Officer (P.R.O II)',
    portfolio: 'Digital Media & Social Broadcasts',
    level: '200L',
    areasOfInterest: 'Digital Media, Graphic Design',
    biography: 'Assists with digital broadcast channels, infographics, social media platforms, and online student outreach.',
    responsibilities: [
      'Assists PRO I in managing announcements and information dissemination',
      'Coordinates digital channels including WhatsApp, Telegram, and social media',
      'Designs digital banners and notices for departmental activities',
      'Monitors student inquiries across official broadcast channels'
    ],
    photoUrl: '',
    email: 'pro2.nsbs@udusok.edu.ng',
    order: 8
  },
  {
    id: 'exec-9',
    name: '',
    position: 'Director of Socials',
    portfolio: 'Social Activities, Culture & Dinner Organization',
    level: '300L',
    areasOfInterest: 'Community Engagement, Cultural Heritage',
    biography: 'Plans and executes social gatherings, cultural showcases, welcome banquets, and the annual NSBS Dinner.',
    responsibilities: [
      'Plans and coordinates departmental social events and cultural gatherings',
      'Heads the organizing subcommittee for the annual NSBS Dinner',
      'Promotes camaraderie and positive social interaction among students',
      'Ensures decorum and discipline during all social functions'
    ],
    photoUrl: '',
    email: 'socials.nsbs@udusok.edu.ng',
    order: 9
  },
  {
    id: 'exec-10',
    name: '',
    position: 'Assistant Director of Socials',
    portfolio: 'Logistics & Social Assistance',
    level: '200L',
    areasOfInterest: 'Event Coordination, Media Operations',
    biography: 'Supports social event logistics, stage staging, refreshment arrangement, and student entertainment.',
    responsibilities: [
      'Assists the Director of Socials in organizing all social events',
      'Coordinates venue setups, audio-visual systems, and guest hosting',
      'Assists in organizing student talent exhibitions and cultural nights',
      'Ensures smooth logistics flow during departmental celebrations'
    ],
    photoUrl: '',
    email: 'asstsocials.nsbs@udusok.edu.ng',
    order: 10
  },
  {
    id: 'exec-11',
    name: '',
    position: 'Director of Sports',
    portfolio: 'Athletics, Tournaments & Fitness Activities',
    level: '300L',
    areasOfInterest: 'Sports Biochemistry, Exercise Physiology',
    biography: 'Coordinates departmental sports competitions, inter-level football matches, and fitness activities.',
    responsibilities: [
      'Organizes the annual Inter-Level Biochemistry Football Tournament',
      'Coordinates track, field, and indoor sports competitions for students',
      'Maintains society sports equipment and uniforms',
      'Promotes physical fitness and mental wellbeing across all levels'
    ],
    photoUrl: '',
    email: 'sports.nsbs@udusok.edu.ng',
    order: 11
  },
  {
    id: 'exec-12',
    name: '',
    position: 'Assistant Director of Sports',
    portfolio: 'Athletics Assistance & Field Coordination',
    level: '200L',
    areasOfInterest: 'Athletics, Health Promotion',
    biography: 'Assists in staging matches, officiating coordination, pitch bookings, and sports logistics.',
    responsibilities: [
      'Assists the Director of Sports with fixture scheduling and field bookings',
      'Coordinates student team formations and training drills',
      'Manages match officiating logistics and safety measures on match days',
      'Assists in encouraging female student participation in sporting events'
    ],
    photoUrl: '',
    email: 'asstsports.nsbs@udusok.edu.ng',
    order: 12
  },
  {
    id: 'exec-13',
    name: '',
    position: 'Welfare Director',
    portfolio: 'Student Welfare, Health Support & Assistance',
    level: '300L',
    areasOfInterest: 'Nutrition, Public Health Advocacy',
    biography: 'Champions student wellbeing, health emergencies, hostel welfare representation, and hardship relief.',
    responsibilities: [
      'Champions student welfare, illness support, and hardship concerns',
      'Liaises with faculty on examination hall comfort and study environments',
      'Coordinates health screening and first-aid provisions during events',
      'Operates the Student Voice support desk for welfare matters'
    ],
    photoUrl: '',
    email: 'welfare.nsbs@udusok.edu.ng',
    order: 13
  },
  {
    id: 'exec-14',
    name: '',
    position: 'Assistant Welfare Director',
    portfolio: 'Welfare Assistance & Emergency Support',
    level: '200L',
    areasOfInterest: 'Community Welfare, Health Support',
    biography: 'Assists in addressing student welfare cases, hospital visits, and emergency support services.',
    responsibilities: [
      'Assists the Welfare Director in investigating and resolving welfare cases',
      'Coordinates visits and society support for hospitalized students',
      'Assists in organizing welfare outreach for new students',
      'Maintains welfare log of student assistance cases'
    ],
    photoUrl: '',
    email: 'asstwelfare.nsbs@udusok.edu.ng',
    order: 14
  },
  {
    id: 'exec-15',
    name: '',
    position: 'Academic Director / Librarian',
    portfolio: 'Digital Library, Study Resources & Course Guides',
    level: '400L',
    areasOfInterest: 'Enzymology Kinetics, Molecular Genetics',
    biography: 'Curates departmental study materials, past question archives, digital library resources, and textbook access.',
    responsibilities: [
      'Curates and updates the NSBS Digital Library and Google Drive repositories',
      'Collects and verifies lecture notes, handouts, and solved past questions',
      'Organizes weekly study groups and syllabus tracking for difficult courses',
      'Collaborates with tutorial coordinators to ensure rigorous coverage'
    ],
    photoUrl: '',
    email: 'academic.nsbs@udusok.edu.ng',
    order: 15
  },
  {
    id: 'exec-16',
    name: '',
    position: 'Assistant Academic Director',
    portfolio: 'Tutorial Coordination & Study Sessions',
    level: '300L',
    areasOfInterest: 'Metabolic Pathways, General Biochemistry',
    biography: 'Coordinates the CATC weekly timetable, tutor assignments, and revision sessions for 100L-300L courses.',
    responsibilities: [
      'Assists the Academic Director in managing tutorial timetables and venues',
      'Coordinates assigned peer tutors for 100L, 200L, and 300L classes',
      'Monitors attendance and student feedback for all tutorial sessions',
      'Distributes solved past question booklets prior to assessments'
    ],
    photoUrl: '',
    email: 'asstacademic.nsbs@udusok.edu.ng',
    order: 16
  },
  {
    id: 'exec-17',
    name: '',
    position: 'Director of Project Initiatives',
    portfolio: 'Special Projects, Innovation Labs & Hackathons',
    level: '400L',
    areasOfInterest: 'Biotechnology Innovation, Entrepreneurship',
    biography: 'Drives special projects, biotech innovation labs, entrepreneurship collaborations, and hackathons.',
    responsibilities: [
      'Directs special projects, innovation incubators, and student hackathons',
      'Coordinates interdisciplinary partnerships with biotech and tech hubs',
      'Manages student project exhibitions and funding applications',
      'Oversees digital platform feature enhancements and AI lab initiatives'
    ],
    photoUrl: '',
    email: 'projects.nsbs@udusok.edu.ng',
    order: 17
  },
  {
    id: 'exec-18',
    name: '',
    position: 'Project Manager 1',
    portfolio: 'Academic Seminars, Webinars & Logistics',
    level: '300L',
    areasOfInterest: 'Immunology, Vaccine Development',
    biography: 'Executes academic seminars, international guest lectures, webinar staging, and speaker liaison.',
    responsibilities: [
      'Coordinates logistics for academic seminars, masterclasses, and webinars',
      'Liaises with guest speakers, faculty lecturers, and alumni presenters',
      'Manages virtual webinar streaming and certificate issuance tracking',
      'Prepares comprehensive event execution and outcome reports'
    ],
    photoUrl: '',
    email: 'pm1.nsbs@udusok.edu.ng',
    order: 18
  },
  {
    id: 'exec-19',
    name: '',
    position: 'Auditor General',
    portfolio: 'Constitutional Oversight & Financial Audit',
    level: '400L',
    areasOfInterest: 'Forensic Chemistry, Quality Assurance',
    biography: 'Conducts independent financial audits, monitors asset inventories, and ensures strict adherence to the NSBS Constitution.',
    responsibilities: [
      'Audits the financial books of the Financial Secretary and Treasurer semesterly',
      'Monitors compliance of all executive activities with the NSBS Constitution',
      'Conducts physical verification of society assets and equipment',
      'Submits an independent audit report directly to the General Congress'
    ],
    photoUrl: '',
    email: 'auditor.nsbs@udusok.edu.ng',
    order: 19
  }
];

export const initialProgrammes: Programme[] = [
  {
    id: 'prog-1',
    title: 'New-Student Academic Orientation & Mentorship Induction',
    semester: 'First Semester',
    category: 'Orientation',
    tagline: 'Fostering Academic Resilience and Excellence from Day One',
    description: 'A comprehensive onboarding initiative tailored to demystify university biochemistry, guide freshmen through curriculum requirements, introduce laboratory etiquette, and assign senior student mentors.',
    objectives: [
      'Transition freshmen seamlessly into the Usmanu Danfodiyo University academic ecosystem',
      'Provide structured course-selection guidance and effective note-taking techniques',
      'Establish one-on-one senior student mentorship pairings'
    ],
    targetAudience: '100L Freshmen & 200L Direct Entry Undergraduates',
    coordinator: 'Vice President & Academic Directorate',
    status: 'Active',
    keyActivities: [
      'Deanery & Head of Department Welcome Address',
      'Surviving Biochemistry: Insights from First-Class Graduates',
      'Interactive Laboratory Safety & Practical Notebook Induction',
      'Digital Library & AI Study Tools Demonstration'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    outcomes: [
      '220+ freshmen onboarded onto the digital portal',
      '100% paired with trained 300L/400L academic mentors'
    ]
  },
  {
    id: 'prog-2',
    title: 'Constant Academic Tutorial Classes (CATC)',
    semester: 'First Semester',
    category: 'Academics',
    tagline: 'Peer-to-Peer Mastery of Core Biochemical Concepts',
    description: 'Weekly scheduled revision sessions covering high-rigor courses including BCH 201 (General Biochemistry), BCH 301 (Enzymology), BCH 305 (Metabolism), and BCH 401 (Clinical Biochemistry).',
    objectives: [
      'Solidify theoretical foundations in metabolic pathways and kinetics',
      'Solve past exam problems under timed examination conditions',
      'Clarify continuous assessment (CA) focus topics'
    ],
    targetAudience: 'All Undergraduate Students (100L - 400L)',
    coordinator: 'Director of Academic Initiatives & Tutorial Corps',
    status: 'Active',
    keyActivities: [
      'Weekend intensive kinetics derivation workshops',
      'Biochemical calculations and molarity/pH problem solving',
      'Monthly mock continuous assessment examinations'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-3',
    title: 'Research Methodology & Scientific Skills Masterclass',
    semester: 'First Semester',
    category: 'Research',
    tagline: 'Bridging Undergraduate Study with Global Scientific Inquiry',
    description: 'A structured skill-building workshop training students on rigorous scientific literature searches, peer-reviewed paper comprehension, Phytomedical extraction protocols, statistical analysis with GraphPad Prism, and citation management.',
    objectives: [
      'Equip students with tools to read, critique, and synthesize scientific papers',
      'Master Mendeley and Zotero reference management tools',
      'Prepare 400L students for high-impact final year dissertations'
    ],
    targetAudience: '300L and 400L Undergraduates',
    coordinator: 'Research Directorate & Faculty Advisors',
    status: 'Active',
    keyActivities: [
      'Navigating PubMed, ScienceDirect, and Google Scholar',
      'Scientific data plotting and error-bar statistical interpretations',
      'Drafting publishable research abstracts'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-4',
    title: 'NSBS International Webinar Series: Frontiers of Life Sciences',
    semester: 'First Semester',
    category: 'Webinar',
    tagline: 'Global Insights Delivered to the Sokoto Student Community',
    description: 'Monthly virtual symposia hosting eminent biochemists, toxicologists, and biotechnology founders from across Africa, Europe, and North America.',
    objectives: [
      'Expose UDUS students to modern international research trends',
      'Foster direct engagement between undergraduates and diaspora alumni scientists',
      'Inspire postgraduate scholarship aspirations'
    ],
    targetAudience: 'University-wide Science Community',
    coordinator: 'Project Manager 1 & Media Team',
    status: 'Active',
    keyActivities: [
      'Keynote lecture presentations followed by interactive Q&A',
      'Post-webinar discussion circles on the NSBS Portal',
      'E-certificate issuance for registered attendees'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-5',
    title: 'Biochemist Career Pathways & Professional Mentorship',
    semester: 'First Semester',
    category: 'Career',
    tagline: 'Charting Tangible Trajectories in Science and Industry',
    description: 'Connecting students with seasoned professionals working in pharmaceutical manufacturing, clinical diagnostics, food technology quality control, forensic laboratories, and academia.',
    objectives: [
      'Clarify diverse career paths available to Biochemistry graduates in Nigeria and abroad',
      'Provide resume reviews and LinkedIn profile optimization sessions',
      'Facilitate student internships with leading Nigerian diagnostic centers'
    ],
    targetAudience: 'All Levels (Focus on 300L & 400L)',
    coordinator: 'Vice President & General Secretary',
    status: 'Active',
    keyActivities: [
      'Industry Panel: The Modern Biochemist in Healthcare & Biotech',
      'CV Writing and Cold-Emailing for Research Internships',
      'One-on-one alumni mentorship matching'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-6',
    title: 'AI × Biochemistry Initiative: Computational Biology & Machine Learning',
    semester: 'First Semester',
    category: 'Innovation',
    tagline: 'Empowering Future Scientists with Artificial Intelligence',
    description: 'Hands-on training series introducing Python for biologists, protein sequence alignment with BLAST, structural prediction using AlphaFold databases, and responsible AI usage for literature review.',
    objectives: [
      'Demystify bioinformatics and computational biology for life sciences students',
      'Teach foundational Python libraries (BioPython, Pandas, Matplotlib)',
      'Promote ethical, verified use of generative AI tools in academia'
    ],
    targetAudience: 'Enthusiastic Undergraduates across All Levels',
    coordinator: 'Health Innovator & Media Directorate',
    status: 'Active',
    keyActivities: [
      'Introduction to BioPython and NCBI Entrez API',
      'Molecular Docking Fundamentals with PyMOL & SwissDock',
      'NSBS AI Study Tools Practical Sessions'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-7',
    title: 'NSBS × Entrepreneurship Club: Biotech Innovation Lab',
    semester: 'First Semester',
    category: 'Innovation',
    tagline: 'Translating Biochemical Knowledge into Sustainable Ventures',
    description: 'Collaborative incubator challenging students to commercialize biochemical knowledge—such as natural bio-fertilizers, solar-powered diagnostic coolers, and local food preservation formulations.',
    objectives: [
      'Foster entrepreneurial mindsets among life science scholars',
      'Form interdisciplinary student venture teams',
      'Compete for seed capital at the annual NSBS Pitch Day'
    ],
    targetAudience: 'Biochemistry & Entrepreneurship Students',
    coordinator: 'Director of Project Initiatives',
    status: 'Active',
    keyActivities: [
      'Design Thinking for Biotechnology Workshops',
      'Business Model Canvas for Life Science Innovations',
      'Grand Pitch Finale with Industry Seed Prizes'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-8',
    title: 'Biochemistry Without Borders: Public Health & STEM Outreach',
    semester: 'Second Semester',
    category: 'Outreach',
    tagline: 'Democratizing Science & Serving Our Host Community',
    description: 'Taking laboratory science into rural communities and secondary schools across Sokoto State. Offering free blood pressure, random blood glucose, and malaria rapid diagnostic tests alongside secondary school science career rallies.',
    objectives: [
      'Provide basic diagnostic screenings for underserved populations',
      'Inspire secondary school pupils to pursue careers in biochemistry and life sciences',
      'Instill public health service ethos in undergraduate student clinicians'
    ],
    targetAudience: 'Local Host Communities & Secondary School Pupils',
    coordinator: 'Outreach Manager & Health Technologist',
    status: 'Planning',
    keyActivities: [
      'Free community health screenings and nutritional counseling',
      'Secondary school science quiz and live laboratory experiments',
      'Donation of essential science laboratory charts'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-9',
    title: 'NSBS Week 2027: Annual Scientific Festival & Grand Dinner',
    semester: 'Second Semester',
    category: 'NSBS Week',
    tagline: 'Celebrating Academic Excellence, Culture and Brotherhood',
    description: 'The crowning departmental celebration spanning seven days of intellectual, cultural, athletic, and scientific activities.',
    objectives: [
      'Foster unity and solidarity among Biochemistry students and faculty staff',
      'Showcase cutting-edge undergraduate research projects',
      'Honor outstanding academic achievers, tutors, and alumni donors'
    ],
    targetAudience: 'Students, Faculty Members, Alumni, and University Guests',
    coordinator: 'Project Manager 2 & Central Planning Committee',
    status: 'Planning',
    keyActivities: [
      'Day 1: Awareness Walk & Clean-up Drive',
      'Day 2: Inter-Level Football & Sports Tournaments',
      'Day 3: Inter-Level Scientific Debate & Quiz Competition',
      'Day 4: Cultural & Traditional Dress Day',
      'Day 5: Scientific Exhibition & Innovation Challenge',
      'Day 6: Career & Mentorship Symposium',
      'Day 7: Grand Presidential Awards Dinner & Handover Ceremony'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-10',
    title: 'Student Voice & Welfare Ombudsman Framework',
    semester: 'First Semester',
    category: 'Welfare',
    tagline: 'Transparent, Accountable Representation for Every Student',
    description: 'A formal feedback and mediation system empowering students to submit confidential academic concerns, course material complaints, or welfare suggestions directly to executive leadership.',
    objectives: [
      'Eliminate barriers between student body and departmental leadership',
      'Swiftly resolve course registration and lab access hurdles',
      'Publish quarterly action reports on student feedback'
    ],
    targetAudience: 'All Biochemistry Undergraduates',
    coordinator: 'Vice President & General Secretary',
    status: 'Active',
    keyActivities: [
      'Confidential digital feedback processing via portal',
      'Monthly town hall sessions with class representatives',
      'Executive advocacy with Departmental Examination Officers'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialResearchProjects: ResearchProject[] = [
  {
    id: 'rp-1',
    title: 'Phytochemical Screening & In Vitro Antioxidant Evaluation of Acacia nilotica Seed Extracts Against Lipid Peroxidation',
    leadAuthor: 'Departmental Phytomedicine Research Group',
    coAuthors: ['Dr. Y. Saidu, Faculty Supervisor'],
    level: '400L',
    specialization: 'Phytomedicine',
    abstract: 'Investigation of polyphenol and flavonoid concentrations in ethanolic extracts of Acacia nilotica sourced from Sokoto scrublands. Assessed free-radical scavenging capacity using DPPH and FRAP assays, revealing significant inhibitory concentrations against hepatic microsomal lipid peroxidation.',
    status: 'Ongoing',
    supervisor: 'Dr. Y. Saidu, Associate Professor of Biochemistry',
    submissionDate: '2026-08-20',
    tags: ['Antioxidant', 'Acacia nilotica', 'Phytomedicine', 'DPPH Assay']
  },
  {
    id: 'rp-2',
    title: 'Serum Lipid Profile & Liver Enzyme Biomarkers Among Type 2 Diabetic Patients in Sokoto Metropolis',
    leadAuthor: 'Clinical Biochemistry Student Cohort',
    coAuthors: ['Prof. L. S. Bilbis'],
    level: '400L',
    specialization: 'Clinical Biochemistry',
    abstract: 'Cross-sectional biochemical evaluation of fasting blood glucose, glycated hemoglobin (HbA1c), total cholesterol, triglycerides, AST, and ALT in 120 diabetic patients undergoing therapy at Usmanu Danfodiyo University Teaching Hospital (UDUTH).',
    status: 'Completed',
    supervisor: 'Prof. L. S. Bilbis, Professor of Biochemistry',
    submissionDate: '2026-07-15',
    tags: ['Diabetes', 'HbA1c', 'Lipid Profile', 'UDUTH', 'Clinical Biomarkers']
  },
  {
    id: 'rp-3',
    title: 'In Silico Molecular Docking of Indigenous Calotropis procera Alkaloids with Plasmodium falciparum Lactate Dehydrogenase (PfLDH)',
    leadAuthor: 'Bioinformatics Research Initiative',
    coAuthors: ['Student Research Team'],
    level: '300L',
    specialization: 'Bioinformatics',
    abstract: 'Computational structural analysis investigating binding affinities of calotropin and related cardenolides against the catalytic site of PfLDH using AutoDock Vina and SwissADME pharmacokinetics modeling.',
    status: 'Shortlisted',
    supervisor: 'Dr. K. J. Umar',
    submissionDate: '2026-09-02',
    tags: ['Molecular Docking', 'PfLDH', 'AutoDock', 'Antimalarial']
  }
];

export const initialPastAdministrations: AdministrationArchive[] = [
  {
    id: 'archive-2025-2026',
    session: '2025/2026',
    theme: 'Consolidating Excellence through Innovation and Unity',
    president: 'Executive President (2025/2026)',
    executivesCount: 19,
    achievements: [
      'Inaugurated the first physical departmental resource room at LT 2',
      'Hosted the 2026 Regional Life Sciences Quiz Championship',
      'Secured 15 corporate internship placements for penultimate year students'
    ],
    summary: 'The 2025/2026 administration set strong benchmarks in student welfare and inter-faculty collaboration, paving the way for our digital transformation.',
    documentsCount: 14
  },
  {
    id: 'archive-2024-2025',
    session: '2024/2025',
    theme: 'Rekindling Scientific Curiosity and Academic Rigor',
    president: 'Executive President (2024/2025)',
    executivesCount: 19,
    achievements: [
      'Launched the maiden Biochemistry Without Borders rural screening campaign',
      'Secured departmental subscription to international open-access biochemical repositories',
      'Published the 2025 NSBS UDUS Research Compendium'
    ],
    summary: 'A transformative tenure marked by student academic leadership and community health outreach across Sokoto State.',
    documentsCount: 18
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Biochemistry Laboratory Practical Induction Session',
    category: 'Orientation',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    date: '2026-09-10',
    description: 'Undergraduate students conducting spectrophotometric determinations and titration curves in the Departmental Lab.'
  },
  {
    id: 'gal-2',
    title: 'Departmental Academic Symposium at PTDF Hall',
    category: 'Career',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    date: '2026-08-25',
    description: 'Faculty members and visiting researchers addressing the student assembly on genomics and drug synthesis.'
  },
  {
    id: 'gal-3',
    title: 'Biochemistry Without Borders Health Screening',
    category: 'Outreach',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    date: '2026-07-14',
    description: 'Voluntary student clinicians offering free capillary blood glucose testing to community elders.'
  },
  {
    id: 'gal-4',
    title: 'NSBS Executive Council Strategic Planning Session',
    category: 'Executive Activities',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    date: '2026-09-02',
    description: 'The 2026/2027 Executive Council debating the semester action plan and budget allocation.'
  },
  {
    id: 'gal-5',
    title: 'Undergraduate Research Poster Presentation',
    category: 'Research',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    date: '2026-06-28',
    description: 'Final-year scholars presenting phytochemical separation charts and antimicrobial data to external examiners.'
  },
  {
    id: 'gal-6',
    title: 'NSBS Week Grand Cultural Celebration',
    category: 'NSBS Week',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    date: '2026-05-18',
    description: 'Students and faculty members celebrating traditional heritage and academic solidarity in colorful regalia.'
  }
];

export const initialCertificates: Certificate[] = [];

export const initialRegisteredStudents: StudentUser[] = [
  {
    id: 'stud-default-1',
    fullName: 'Aliyu Ibrahim',
    email: 'aliyu.ibrahim@student.udusok.edu.ng',
    matricNumber: '23/14/0842',
    level: '300L',
    programme: 'B.Sc. Biochemistry',
    department: 'Biochemistry',
    phone: '+234 814 552 1902',
    interests: ['Clinical Biochemistry', 'Enzymology', 'AI in Healthcare', 'Molecular Biology'],
    joinedDate: '2026-01-15',
    onboardingCompleted: true,
    stateOfOrigin: 'Sokoto',
    password: 'studentpassword123'
  },
  {
    id: 'stud-default-2',
    fullName: 'Fatima Abubakar Bello',
    email: 'fatima.bello@student.udusok.edu.ng',
    matricNumber: '22/14/0118',
    level: '400L',
    programme: 'B.Sc. Biochemistry',
    department: 'Biochemistry',
    phone: '+234 803 762 9011',
    interests: ['Phytomedicine', 'Molecular Biology', 'Biotechnology'],
    joinedDate: '2025-10-20',
    onboardingCompleted: true,
    stateOfOrigin: 'Kebbi',
    password: 'studentpassword123'
  }
];
