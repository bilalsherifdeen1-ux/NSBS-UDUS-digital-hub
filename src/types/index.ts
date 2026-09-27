export type AcademicLevel = '100L' | '200L' | '300L' | '400L' | 'Postgraduate' | 'General';

export type ResourceCategory = 
  | 'Handouts'
  | 'Textbooks'
  | 'Lecture Notes'
  | 'Journals'
  | 'Research Papers'
  | 'Past Questions'
  | 'Practical Manuals'
  | 'Laboratory Guides'
  | 'Seminar Materials'
  | 'Final-Year Project Resources'
  | 'Clinical Biochemistry'
  | 'Molecular Biology'
  | 'Enzymology'
  | 'Metabolism'
  | 'Genetics'
  | 'Immunology'
  | 'Pharmacology'
  | 'Analytical Biochemistry'
  | 'Food Biochemistry'
  | 'Industrial Biochemistry';

export interface Resource {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  level: AcademicLevel;
  category: ResourceCategory;
  author: string;
  description: string;
  fileType: 'PDF' | 'DOCX' | 'PPTX' | 'ZIP';
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  googleDriveUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  downloadsCount: number;
  featured: boolean;
  published: boolean;
}

export type EventCategory = 
  | 'Academic'
  | 'Tutorial'
  | 'Webinar'
  | 'Career'
  | 'Research'
  | 'Innovation'
  | 'Outreach'
  | 'Social'
  | 'NSBS Week'
  | 'Leadership'
  | 'Competition';

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  organizer: string;
  category: EventCategory;
  speaker?: string;
  speakerRole?: string;
  registrationDeadline: string;
  registrationLimit?: number;
  registeredCount: number;
  posterUrl?: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  featured: boolean;
  semester: 'First Semester' | 'Second Semester';
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  matricNumber: string;
  registeredAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Academic' | 'NSBS News' | 'Events' | 'Opportunities' | 'Urgent' | 'Administrative';
  author: string;
  authorRole: string;
  date: string;
  imageUrl?: string;
  attachmentName?: string;
  priority: 'High' | 'Normal' | 'Low';
  published: boolean;
  featured: boolean;
}

export type OpportunityType = 
  | 'Scholarship'
  | 'Fellowship'
  | 'Internship'
  | 'Research'
  | 'Conference'
  | 'Competition'
  | 'Training'
  | 'Grant';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  eligibility: string;
  deadline: string;
  location: string;
  type: OpportunityType;
  applicationUrl: string;
  featured: boolean;
  published: boolean;
  tags: string[];
}

export interface Executive {
  id: string;
  name: string;
  position: string;
  portfolio: string;
  level: AcademicLevel;
  areasOfInterest: string;
  biography: string;
  responsibilities: string[];
  photoUrl: string;
  email: string;
  phone?: string;
  linkedIn?: string;
  order: number;
}

export interface AdministrationArchive {
  session: string;
  theme: string;
  president: string;
  executivesCount: number;
  achievements: string[];
  summary: string;
  documentsCount: number;
}

export interface Programme {
  id: string;
  title: string;
  semester: 'First Semester' | 'Second Semester';
  category: string;
  tagline: string;
  description: string;
  objectives: string[];
  targetAudience: string;
  coordinator: string;
  status: 'Planning' | 'Active' | 'Completed';
  keyActivities: string[];
  bannerUrl: string;
  outcomes?: string[];
}

export interface ResearchProject {
  id: string;
  title: string;
  leadAuthor: string;
  coAuthors?: string[];
  level: AcademicLevel;
  specialization: 'Clinical Biochemistry' | 'Molecular Biology' | 'Phytomedicine' | 'Enzymology' | 'Bioinformatics' | 'Toxicology';
  abstract: string;
  status: 'Submitted' | 'Under Review' | 'Shortlisted' | 'Ongoing' | 'Completed';
  supervisor?: string;
  submissionDate: string;
  pdfUrl?: string;
  tags: string[];
}

export interface StudentUser {
  id: string;
  fullName: string;
  email: string;
  matricNumber: string;
  level: AcademicLevel;
  programme: string;
  department: string;
  phone: string;
  interests: string[];
  profilePhoto?: string;
  joinedDate: string;
  onboardingCompleted: boolean;
  stateOfOrigin?: string;
  password?: string;
}

export interface Certificate {
  id: string;
  certificateCode: string;
  studentId: string;
  studentName: string;
  programmeTitle: string;
  category: string;
  issueDate: string;
  issuerName: string;
  issuerRole: string;
  verificationUrl: string;
}

export interface FeedbackSubmission {
  id: string;
  name?: string;
  email?: string;
  category: 'Academic' | 'Welfare' | 'Events' | 'Resources' | 'Leadership' | 'Facilities' | 'Other';
  subject: string;
  message: string;
  submittedAt: string;
  status: 'New' | 'Under Review' | 'Resolved';
  isAnonymous: boolean;
  notes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Orientation' | 'Tutorials' | 'Webinars' | 'Outreach' | 'NSBS Week' | 'Career' | 'Research' | 'Executive Activities';
  imageUrl: string;
  date: string;
  description: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  targetResource: string;
  details: string;
}

export interface AIAgent {
  id: string;
  name: string;
  provider: 'gemini' | 'openai' | 'claude' | 'deepseek' | 'custom' | string;
  providerLabel: string;
  description: string;
  url: string;
  active: boolean;
  capabilities: string[];
  iconType?: 'sparkles' | 'brain' | 'microscope' | 'bot' | 'code' | string;
}

export interface SiteSettings {
  organizationName: string;
  universityName: string;
  chapter: string;
  session: string;
  theme: string;
  motto: string;
  presidentName: string;
  presidentMessage: string;
  officialEmail: string;
  officialPhone: string;
  departmentAddress: string;
  socials: {
    whatsapp: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    telegram: string;
    youtube: string;
  };
  aiIntegrations: {
    geminiAssistant: {
      name: string;
      description: string;
      url: string;
      active: boolean;
    };
    customGpt: {
      name: string;
      description: string;
      url: string;
      active: boolean;
    };
    agents: AIAgent[];
  };
  metrics: {
    registeredStudents: number;
    academicResources: number;
    eventsOrganized: number;
    trainingProgrammes: number;
    researchInitiatives: number;
    outreachBeneficiaries: number;
    communityOutreaches: number;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'event' | 'resource' | 'announcement' | 'opportunity' | 'system';
  read: boolean;
  link?: string;
}
