import React, { createContext, useContext, useState, useEffect } from 'react';
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
  FeedbackSubmission,
  AuditLog,
  StudentUser,
  NotificationItem,
  AcademicLevel,
  AIAgent
} from '../types';
import {
  initialSiteSettings,
  initialResources,
  initialEvents,
  initialAnnouncements,
  initialOpportunities,
  initialExecutives,
  initialProgrammes,
  initialResearchProjects,
  initialPastAdministrations,
  initialGallery,
  initialCertificates,
  initialRegisteredStudents
} from '../data/initialData';

export type ActivePage = 
  | 'home'
  | 'about'
  | 'academics'
  | 'resources'
  | 'ailab'
  | 'events'
  | 'opportunities'
  | 'research'
  | 'programmes'
  | 'executives'
  | 'news'
  | 'gallery'
  | 'contact'
  | 'student-portal'
  | 'admin-dashboard';

export type UserRole = 'guest' | 'student' | 'admin';

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser: StudentUser | null;
  setCurrentUser: (user: StudentUser | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchFilterQuery: string;
  setSearchFilterQuery: (q: string) => void;
  
  // Data entities
  siteSettings: SiteSettings;
  updateSiteSettings: (newSettings: Partial<SiteSettings>) => void;
  
  resources: Resource[];
  addResource: (res: Omit<Resource, 'id' | 'downloadsCount' | 'uploadDate' | 'featured'> & { featured?: boolean }) => void;
  updateResource: (id: string, updated: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  incrementDownload: (id: string) => void;
  bookmarkedResourceIds: string[];
  toggleBookmark: (id: string) => void;
  reportBrokenLink: (id: string, reason: string) => void;
  
  events: EventItem[];
  addEvent: (event: Omit<EventItem, 'id' | 'registeredCount'>) => void;
  updateEvent: (id: string, updated: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  registeredEventIds: string[];
  registerForEvent: (eventId: string) => boolean;
  cancelEventRegistration: (eventId: string) => void;
  
  announcements: Announcement[];
  addAnnouncement: (ann: Omit<Announcement, 'id' | 'date'>) => void;
  updateAnnouncement: (id: string, updated: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  
  opportunities: Opportunity[];
  addOpportunity: (opp: Omit<Opportunity, 'id'>) => void;
  updateOpportunity: (id: string, updated: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  
  executives: Executive[];
  addExecutive: (exec: Omit<Executive, 'id'>) => void;
  updateExecutive: (id: string, updated: Partial<Executive>) => void;
  deleteExecutive: (id: string) => void;
  reorderExecutives: (newOrder: Executive[]) => void;
  
  programmes: Programme[];
  addProgramme: (prog: Omit<Programme, 'id'>) => void;
  updateProgramme: (id: string, updated: Partial<Programme>) => void;
  
  researchProjects: ResearchProject[];
  submitResearchProject: (project: Omit<ResearchProject, 'id' | 'status' | 'submissionDate'>) => void;
  updateResearchProjectStatus: (id: string, status: ResearchProject['status']) => void;
  
  pastAdministrations: AdministrationArchive[];
  addPastAdministration: (admin: AdministrationArchive) => void;
  
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  
  certificates: Certificate[];
  issueCertificate: (cert: Omit<Certificate, 'id' | 'certificateCode' | 'issueDate' | 'verificationUrl'>) => Certificate;
  
  feedbackList: FeedbackSubmission[];
  submitFeedback: (feedback: Omit<FeedbackSubmission, 'id' | 'submittedAt' | 'status'>) => void;
  updateFeedbackStatus: (id: string, status: FeedbackSubmission['status'], notes?: string) => void;
  
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Administrative & Student Authentication
  isAdminAuthenticated: boolean;
  adminPassword: string;
  adminLogin: (username: string, password: string) => { success: boolean; error?: string };
  adminLogout: () => void;
  requestAdminPasswordReset: () => { success: boolean; message: string; targetEmail: string; token: string; resetLink: string };
  resetAdminPassword: (token: string, newPassword: string) => { success: boolean; error?: string };
  changeAdminPassword: (oldPassword: string, newPassword: string) => { success: boolean; error?: string };

  studentLogin: (fullName: string, matricNumber: string, level?: AcademicLevel, password?: string) => void;
  studentLogout: () => void;
  updateCurrentUser: (updated: Partial<StudentUser>) => void;
  registeredStudents: StudentUser[];
  requestPasswordReset: (emailOrMatric: string) => { success: boolean; message: string; targetEmail?: string; resetLink?: string; token?: string };
  resetStudentPassword: (tokenOrEmail: string, newPassword: string) => { success: boolean; message: string };

  // AI Agent Integrations
  addAIAgent: (agent: Omit<AIAgent, 'id'>) => void;
  updateAIAgent: (id: string, updated: Partial<AIAgent>) => void;
  deleteAIAgent: (id: string) => void;
  toggleAIAgentActive: (id: string) => void;

  // Factual Home Impact Metrics
  updateMetrics: (newMetrics: Partial<SiteSettings['metrics']>) => void;
  syncMetricsFromRecords: () => void;

  // Notification toast
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const initialFeedback: FeedbackSubmission[] = [
  {
    id: 'fb-1',
    name: 'Undergraduate Student',
    email: 'student.feedback@student.udusok.edu.ng',
    category: 'Academic',
    subject: 'Request for BCH 305 CA Revision Tutorial',
    message: 'Could the tutorial directorate kindly arrange an additional session on Pentose Phosphate pathway and glycogen regulation before the continuous assessment test next Friday?',
    submittedAt: '2026-09-22 14:30',
    status: 'Under Review',
    isAnonymous: false
  },
  {
    id: 'fb-2',
    name: 'Anonymous Student',
    category: 'Facilities',
    subject: 'Spectrophotometer Calibration in Lab B',
    message: 'Two of the UV-Vis spectrophotometers in teaching lab B have loose sample holder lids, causing light leakage during absorbance readings.',
    submittedAt: '2026-09-20 11:15',
    status: 'Resolved',
    isAnonymous: true,
    notes: 'Technician recalibrated and repaired sample cell covers on Sept 23.'
  }
];

const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-09-26 10:14',
    adminName: 'Executive Administrator',
    action: 'PUBLISH_ANNOUNCEMENT',
    targetResource: 'Official Launch of the NSBS UDUS Unified Digital Academic Platform',
    details: 'Published announcement ID ann-1 to homepage and public feed.'
  },
  {
    id: 'log-2',
    timestamp: '2026-09-25 16:45',
    adminName: 'Academic Admin',
    action: 'UPDATE_RESOURCE',
    targetResource: 'BCH 401 Clinical Biochemistry Lecture Notes',
    details: 'Updated Google Drive link and verified PDF file size.'
  },
  {
    id: 'log-3',
    timestamp: '2026-09-24 09:20',
    adminName: 'Media Admin',
    action: 'CONFIG_AI_LAB',
    targetResource: 'NSBS Gemini Academic Assistant',
    details: 'Synchronized prompt parameters and custom gem endpoint.'
  }
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Resource Added: BCH 401 Clinical Lecture Notes',
    message: 'Clinical Biochemistry lecture slides and liver enzyme diagnostic guides have been added to the Digital Library.',
    date: 'Today, 08:30 AM',
    type: 'resource',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Upcoming: Freshmen Academic Orientation',
    message: 'Freshmen induction is scheduled for Oct 14 at PTDF Hall. Confirm your seat registration.',
    date: 'Yesterday',
    type: 'event',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Scholarship Alert: PTDF 2026/2027 Scheme',
    message: 'Eligible 200L and 300L students can now review criteria and apply in the Opportunities Hub.',
    date: '2 days ago',
    type: 'opportunity',
    read: true
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('nsbs_admin_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => {
    const saved = localStorage.getItem('nsbs_student_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [registeredStudents, setRegisteredStudents] = useState<StudentUser[]>(() => {
    const saved = localStorage.getItem('nsbs_registered_students');
    return saved ? JSON.parse(saved) : initialRegisteredStudents;
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    if (sessionStorage.getItem('nsbs_admin_auth') === 'true') return 'admin';
    if (localStorage.getItem('nsbs_student_user')) return 'student';
    return 'guest';
  });

  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchFilterQuery, setSearchFilterQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Administrative Credentials & Password Recovery
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('nsbs_admin_pwd') || 'NSBS_2026';
  });

  const [adminResetToken, setAdminResetToken] = useState<{
    token: string;
    expiresAt: number;
    email: string;
  } | null>(() => {
    const saved = localStorage.getItem('nsbs_admin_reset_token');
    return saved ? JSON.parse(saved) : null;
  });

  // Load / Store in LocalStorage or fallback to realistic initial states
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('nsbs_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.aiIntegrations?.agents || parsed.aiIntegrations.agents.length === 0) {
          parsed.aiIntegrations = {
            ...parsed.aiIntegrations,
            agents: initialSiteSettings.aiIntegrations.agents
          };
        }
        if (parsed.metrics && typeof parsed.metrics.communityOutreaches !== 'number') {
          parsed.metrics = {
            ...parsed.metrics,
            communityOutreaches: 8
          };
        }
        return parsed;
      } catch {
        // use initial
      }
    }
    return initialSiteSettings;
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('nsbs_resources');
    return saved ? JSON.parse(saved) : initialResources;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('nsbs_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('nsbs_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem('nsbs_opportunities');
    return saved ? JSON.parse(saved) : initialOpportunities;
  });

  const [executives, setExecutives] = useState<Executive[]>(() => {
    const saved = localStorage.getItem('nsbs_executives');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 19 && !parsed.some(e => e.name === 'Abubakar Sadiq Umar')) {
          return parsed;
        }
      } catch {
        // use initial
      }
    }
    return initialExecutives;
  });

  const [programmes, setProgrammes] = useState<Programme[]>(() => {
    const saved = localStorage.getItem('nsbs_programmes');
    return saved ? JSON.parse(saved) : initialProgrammes;
  });

  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>(() => {
    const saved = localStorage.getItem('nsbs_research');
    return saved ? JSON.parse(saved) : initialResearchProjects;
  });

  const [pastAdministrations, setPastAdministrations] = useState<AdministrationArchive[]>(() => {
    const saved = localStorage.getItem('nsbs_past_admins');
    return saved ? JSON.parse(saved) : initialPastAdministrations;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('nsbs_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('nsbs_certificates');
    return saved ? JSON.parse(saved) : initialCertificates;
  });

  const [feedbackList, setFeedbackList] = useState<FeedbackSubmission[]>(() => {
    const saved = localStorage.getItem('nsbs_feedback');
    return saved ? JSON.parse(saved) : initialFeedback;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('nsbs_audit');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const [bookmarkedResourceIds, setBookmarkedResourceIds] = useState<string[]>(['res-1', 'res-3', 'res-5']);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>(['event-1', 'event-2']);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('nsbs_settings', JSON.stringify(siteSettings));
      localStorage.setItem('nsbs_resources', JSON.stringify(resources));
      localStorage.setItem('nsbs_events', JSON.stringify(events));
      localStorage.setItem('nsbs_announcements', JSON.stringify(announcements));
      localStorage.setItem('nsbs_opportunities', JSON.stringify(opportunities));
      localStorage.setItem('nsbs_executives', JSON.stringify(executives));
      localStorage.setItem('nsbs_programmes', JSON.stringify(programmes));
      localStorage.setItem('nsbs_research', JSON.stringify(researchProjects));
      localStorage.setItem('nsbs_past_admins', JSON.stringify(pastAdministrations));
      localStorage.setItem('nsbs_gallery', JSON.stringify(gallery));
      localStorage.setItem('nsbs_certificates', JSON.stringify(certificates));
      localStorage.setItem('nsbs_feedback', JSON.stringify(feedbackList));
      localStorage.setItem('nsbs_audit', JSON.stringify(auditLogs));
      localStorage.setItem('nsbs_registered_students', JSON.stringify(registeredStudents));
      localStorage.setItem('nsbs_admin_pwd', adminPassword);
      if (adminResetToken) {
        localStorage.setItem('nsbs_admin_reset_token', JSON.stringify(adminResetToken));
      } else {
        localStorage.removeItem('nsbs_admin_reset_token');
      }
      if (currentUser) {
        localStorage.setItem('nsbs_student_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('nsbs_student_user');
      }
    } catch {
      // Ignore quota storage warnings
    }
  }, [siteSettings, resources, events, announcements, opportunities, executives, programmes, researchProjects, pastAdministrations, gallery, certificates, feedbackList, auditLogs, currentUser, registeredStudents, adminPassword, adminResetToken]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const logAdminAction = (action: string, targetResource: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      adminName: isAdminAuthenticated ? 'Admin_1' : 'Administrator',
      action,
      targetResource,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const adminLogin = (username: string, password: string): { success: boolean; error?: string } => {
    if (username.trim() === 'Admin_1' && password === adminPassword) {
      setIsAdminAuthenticated(true);
      setUserRole('admin');
      sessionStorage.setItem('nsbs_admin_auth', 'true');
      setActivePage('admin-dashboard');
      logAdminAction('ADMIN_LOGIN', 'Admin Portal', 'Admin_1 authenticated session started.');
      showToast('Welcome Admin! Access granted.', 'success');
      return { success: true };
    }
    return { success: false, error: 'Invalid administrative credentials. If you forgot your password, please use the reset option below.' };
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setUserRole('guest');
    sessionStorage.removeItem('nsbs_admin_auth');
    setActivePage('home');
    showToast('Administrative session ended.', 'info');
  };

  const requestAdminPasswordReset = () => {
    // Official NSBS secretariat email is editable by admin in siteSettings
    const targetEmail = siteSettings.officialEmail?.trim() || 'nsbs.udus@udusok.edu.ng';
    const token = `NSBS-ADM-${Math.floor(100000 + Math.random() * 900000)}`;
    const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes
    const tokenData = { token, expiresAt, email: targetEmail };

    setAdminResetToken(tokenData);
    localStorage.setItem('nsbs_admin_reset_token', JSON.stringify(tokenData));

    // Audit log
    logAdminAction('ADMIN_PWD_RESET_REQUEST', 'Administrative Security', `Password reset token dispatched to NSBS Mail: ${targetEmail}`);

    // System Notification broadcast
    const newNotif: NotificationItem = {
      id: `notif-adm-${Date.now()}`,
      title: 'Administrative Security: Password Reset Requested',
      message: `Password reset authorization token generated for official NSBS Mail: ${targetEmail}. Token: ${token}`,
      date: 'Just now',
      type: 'system',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    return {
      success: true,
      message: `Password reset instructions and security token dispatched to official NSBS mailbox: ${targetEmail}`,
      targetEmail,
      token,
      resetLink: `${window.location.origin}/#admin-reset?token=${token}`
    };
  };

  const resetAdminPassword = (token: string, newPassword: string): { success: boolean; error?: string } => {
    if (!newPassword || newPassword.trim().length < 6) {
      return { success: false, error: 'Administrator password must be at least 6 characters long.' };
    }
    const cleanToken = token.trim().toUpperCase();
    const stored = adminResetToken || (() => {
      const saved = localStorage.getItem('nsbs_admin_reset_token');
      return saved ? JSON.parse(saved) : null;
    })();

    if (!stored || stored.token !== cleanToken) {
      return { success: false, error: 'Invalid or incorrect administrative reset token. Please check the email sent to the NSBS mail.' };
    }

    if (Date.now() > stored.expiresAt) {
      return { success: false, error: 'This administrative reset token has expired. Please dispatch a new reset request.' };
    }

    const updated = newPassword.trim();
    setAdminPassword(updated);
    localStorage.setItem('nsbs_admin_pwd', updated);
    setAdminResetToken(null);
    localStorage.removeItem('nsbs_admin_reset_token');

    logAdminAction('ADMIN_PWD_RESET_SUCCESS', 'Administrative Security', 'Administrator password was reset via NSBS email verification.');
    showToast('Administrator password reset successfully! You can now log in with your new password.', 'success');
    return { success: true };
  };

  const changeAdminPassword = (oldPassword: string, newPassword: string): { success: boolean; error?: string } => {
    if (oldPassword !== adminPassword) {
      return { success: false, error: 'Current administrator password is incorrect.' };
    }
    if (!newPassword || newPassword.trim().length < 6) {
      return { success: false, error: 'New administrator password must be at least 6 characters long.' };
    }
    const updated = newPassword.trim();
    setAdminPassword(updated);
    localStorage.setItem('nsbs_admin_pwd', updated);
    logAdminAction('ADMIN_PWD_CHANGED', 'Administrative Security', 'Administrator password was changed from Dashboard settings.');
    showToast('Administrator password updated successfully.', 'success');
    return { success: true };
  };

  const studentLogin = (fullName: string, matricNumber: string, level: AcademicLevel = '300L', password?: string) => {
    const cleanMatric = matricNumber.trim();
    const normalizedMatric = cleanMatric.toLowerCase();
    
    // Check if user already exists in registered students
    const existing = registeredStudents.find(s => 
      s.matricNumber.trim().toLowerCase() === normalizedMatric ||
      s.matricNumber.replace(/[\/\s]/g, '').toLowerCase() === normalizedMatric.replace(/[\/\s]/g, '')
    );

    let student: StudentUser;
    if (existing) {
      student = {
        ...existing,
        fullName: fullName.trim() || existing.fullName,
        level: level || existing.level
      };
      if (password) {
        student.password = password;
      }
      setRegisteredStudents(prev => prev.map(s => s.id === existing.id ? student : s));
    } else {
      student = {
        id: `stud-${Date.now()}`,
        fullName: fullName.trim() || 'Biochemistry Scholar',
        email: `${cleanMatric.replace(/[\/\s]/g, '').toLowerCase()}@student.udusok.edu.ng`,
        matricNumber: cleanMatric,
        level,
        programme: 'B.Sc. Biochemistry',
        department: 'Biochemistry',
        phone: '',
        interests: ['Clinical Biochemistry', 'Molecular Biology'],
        joinedDate: new Date().toISOString().split('T')[0],
        onboardingCompleted: true,
        password: password || 'studentpassword123'
      };
      setRegisteredStudents(prev => [student, ...prev]);
    }

    setCurrentUser(student);
    setUserRole('student');
    localStorage.setItem('nsbs_student_user', JSON.stringify(student));
    showToast(`Welcome, ${student.fullName}! Student session active.`, 'success');
  };

  const studentLogout = () => {
    setCurrentUser(null);
    setUserRole('guest');
    localStorage.removeItem('nsbs_student_user');
    showToast('Student logged out successfully.', 'info');
  };

  const updateCurrentUser = (updated: Partial<StudentUser>) => {
    if (!currentUser) return;
    const merged: StudentUser = {
      ...currentUser,
      ...updated
    };
    setCurrentUser(merged);
    localStorage.setItem('nsbs_student_user', JSON.stringify(merged));

    // Also update in registeredStudents array
    setRegisteredStudents(prev => {
      const idx = prev.findIndex(s => 
        s.id === merged.id || 
        s.matricNumber.trim().toLowerCase() === merged.matricNumber.trim().toLowerCase()
      );
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = merged;
        return copy;
      }
      return [merged, ...prev];
    });

    showToast('Student dashboard profile settings saved successfully!', 'success');
  };

  const requestPasswordReset = (emailOrMatric: string): { success: boolean; message: string; targetEmail?: string; resetLink?: string; token?: string } => {
    const query = emailOrMatric.trim().toLowerCase();
    if (!query) {
      return { success: false, message: 'Please enter your registered university email or matric number.' };
    }

    let found = registeredStudents.find(s => 
      s.email.toLowerCase() === query || 
      s.matricNumber.toLowerCase() === query || 
      s.matricNumber.replace(/[\/\s]/g, '').toLowerCase() === query.replace(/[\/\s]/g, '')
    );

    if (!found && currentUser && (currentUser.email.toLowerCase() === query || currentUser.matricNumber.toLowerCase() === query)) {
      found = currentUser;
    }

    if (!found) {
      // Auto-register so user is never stranded
      const isEmail = query.includes('@');
      const matric = isEmail ? query.split('@')[0] : emailOrMatric.trim();
      const email = isEmail ? query : `${query.replace(/[\/\s]/g, '')}@student.udusok.edu.ng`;
      found = {
        id: `stud-${Date.now()}`,
        fullName: 'Biochemistry Student',
        email,
        matricNumber: matric,
        level: '300L',
        programme: 'B.Sc. Biochemistry',
        department: 'Biochemistry',
        phone: '',
        interests: ['Clinical Biochemistry', 'Enzymology'],
        joinedDate: new Date().toISOString().split('T')[0],
        onboardingCompleted: true,
        password: 'temporaryPassword123'
      };
      setRegisteredStudents(prev => [found!, ...prev]);
    }

    const token = `rst_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
    sessionStorage.setItem('nsbs_active_reset_token', token);
    sessionStorage.setItem('nsbs_active_reset_email', found.email);

    const resetLink = `${window.location.origin}/#reset-password?token=${token}&email=${encodeURIComponent(found.email)}`;

    // Add security broadcast notification in navbar
    const newNotif: NotificationItem = {
      id: `notif-pwd-${Date.now()}`,
      title: 'Portal Security: Password Reset Link Generated',
      message: `A password reset link was dispatched directly to ${found.email}.`,
      date: 'Just now',
      type: 'announcement',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    return {
      success: true,
      message: `Password reset link sent directly to ${found.email}.`,
      targetEmail: found.email,
      resetLink,
      token
    };
  };

  const resetStudentPassword = (tokenOrEmail: string, newPassword: string): { success: boolean; message: string } => {
    if (!newPassword || newPassword.trim().length < 4) {
      return { success: false, message: 'Password must be at least 4 characters long.' };
    }
    const cleanParam = tokenOrEmail.trim().toLowerCase();
    const activeToken = sessionStorage.getItem('nsbs_active_reset_token');
    const activeEmail = sessionStorage.getItem('nsbs_active_reset_email')?.toLowerCase();

    let targetStudent = registeredStudents.find(s => 
      s.email.toLowerCase() === cleanParam || 
      s.matricNumber.toLowerCase() === cleanParam ||
      (activeEmail && s.email.toLowerCase() === activeEmail)
    );

    if (!targetStudent && currentUser) {
      targetStudent = currentUser;
    }

    if (!targetStudent && activeEmail) {
      targetStudent = {
        id: `stud-${Date.now()}`,
        fullName: 'Biochemistry Student',
        email: activeEmail,
        matricNumber: activeEmail.split('@')[0],
        level: '300L',
        programme: 'B.Sc. Biochemistry',
        department: 'Biochemistry',
        phone: '',
        interests: ['Clinical Biochemistry'],
        joinedDate: new Date().toISOString().split('T')[0],
        onboardingCompleted: true,
        password: newPassword
      };
    }

    if (!targetStudent) {
      return { success: false, message: 'Unable to locate student account for password update.' };
    }

    const updatedStudent: StudentUser = {
      ...targetStudent,
      password: newPassword
    };

    setRegisteredStudents(prev => {
      const idx = prev.findIndex(s => s.id === updatedStudent.id || s.email.toLowerCase() === updatedStudent.email.toLowerCase());
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updatedStudent;
        return copy;
      }
      return [updatedStudent, ...prev];
    });

    if (currentUser && (currentUser.id === updatedStudent.id || currentUser.email.toLowerCase() === updatedStudent.email.toLowerCase())) {
      setCurrentUser(updatedStudent);
      localStorage.setItem('nsbs_student_user', JSON.stringify(updatedStudent));
    }

    sessionStorage.removeItem('nsbs_active_reset_token');
    sessionStorage.removeItem('nsbs_active_reset_email');
    showToast('Your password has been successfully changed! You can now log in with your updated details.', 'success');
    return { success: true, message: 'Password updated successfully! You can now log in.' };
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...newSettings }));
    logAdminAction('UPDATE_SITE_SETTINGS', 'Site Settings & Branding', 'Updated portal configuration and links.');
    showToast('Platform settings successfully updated.');
  };

  const addAIAgent = (agent: Omit<AIAgent, 'id'>) => {
    const newAgent: AIAgent = {
      ...agent,
      id: `agent-${Date.now()}`
    };
    setSiteSettings(prev => {
      const existingAgents = prev.aiIntegrations?.agents || [];
      const updatedAgents = [...existingAgents, newAgent];
      return {
        ...prev,
        aiIntegrations: {
          ...prev.aiIntegrations,
          agents: updatedAgents
        }
      };
    });
    logAdminAction('ADD_AI_AGENT', newAgent.name, `Added new AI Agent (${newAgent.providerLabel || newAgent.provider}).`);
    showToast(`AI Agent "${newAgent.name}" created successfully!`, 'success');
  };

  const updateAIAgent = (id: string, updated: Partial<AIAgent>) => {
    setSiteSettings(prev => {
      const existingAgents = prev.aiIntegrations?.agents || [];
      const updatedAgents = existingAgents.map(a => a.id === id ? { ...a, ...updated } : a);
      return {
        ...prev,
        aiIntegrations: {
          ...prev.aiIntegrations,
          agents: updatedAgents
        }
      };
    });
    logAdminAction('UPDATE_AI_AGENT', id, 'Modified AI Agent settings/endpoint.');
    showToast('AI Agent details updated successfully.', 'success');
  };

  const deleteAIAgent = (id: string) => {
    let deletedName = 'AI Agent';
    setSiteSettings(prev => {
      const existingAgents = prev.aiIntegrations?.agents || [];
      const target = existingAgents.find(a => a.id === id);
      if (target) deletedName = target.name;
      const updatedAgents = existingAgents.filter(a => a.id !== id);
      return {
        ...prev,
        aiIntegrations: {
          ...prev.aiIntegrations,
          agents: updatedAgents
        }
      };
    });
    logAdminAction('DELETE_AI_AGENT', deletedName, 'Removed AI Agent from portal.');
    showToast(`AI Agent "${deletedName}" removed.`, 'info');
  };

  const toggleAIAgentActive = (id: string) => {
    setSiteSettings(prev => {
      const existingAgents = prev.aiIntegrations?.agents || [];
      const updatedAgents = existingAgents.map(a => a.id === id ? { ...a, active: !a.active } : a);
      return {
        ...prev,
        aiIntegrations: {
          ...prev.aiIntegrations,
          agents: updatedAgents
        }
      };
    });
    logAdminAction('TOGGLE_AI_AGENT', id, 'Toggled AI Agent availability.');
  };

  const updateMetrics = (newMetrics: Partial<SiteSettings['metrics']>) => {
    setSiteSettings(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        ...newMetrics
      }
    }));
    logAdminAction('UPDATE_METRICS', 'Home Statistics', 'Updated factual statistical numbers for home impact banner.');
    showToast('Factual home statistical numbers updated successfully!', 'success');
  };

  const syncMetricsFromRecords = () => {
    setSiteSettings(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        registeredStudents: registeredStudents.length > 0 ? registeredStudents.length : prev.metrics.registeredStudents,
        academicResources: resources.length,
        eventsOrganized: events.length,
        trainingProgrammes: programmes.length,
        researchInitiatives: researchProjects.length
      }
    }));
    logAdminAction('SYNC_METRICS', 'Home Statistics', 'Synchronized factual home numbers with current portal records.');
    showToast('Factual counts synchronized with system records!', 'success');
  };

  const addResource = (res: Omit<Resource, 'id' | 'downloadsCount' | 'uploadDate' | 'featured'> & { featured?: boolean }) => {
    const newRes: Resource = {
      ...res,
      id: `res-${Date.now()}`,
      downloadsCount: 0,
      uploadDate: new Date().toISOString().split('T')[0],
      featured: res.featured ?? false
    };
    setResources(prev => [newRes, ...prev]);
    setSiteSettings(prev => ({
      ...prev,
      metrics: { ...prev.metrics, academicResources: prev.metrics.academicResources + 1 }
    }));
    logAdminAction('ADD_RESOURCE', newRes.title, `Added ${newRes.category} for course ${newRes.courseCode}.`);
    showToast(`Resource "${newRes.title}" published to library.`);
  };

  const updateResource = (id: string, updated: Partial<Resource>) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
    const target = resources.find(r => r.id === id);
    logAdminAction('UPDATE_RESOURCE', target?.title || id, 'Modified course resource details/links.');
    showToast('Resource updated successfully.');
  };

  const deleteResource = (id: string) => {
    const target = resources.find(r => r.id === id);
    setResources(prev => prev.filter(r => r.id !== id));
    logAdminAction('DELETE_RESOURCE', target?.title || id, 'Removed academic resource from library.');
    showToast('Resource removed.');
  };

  const incrementDownload = (id: string) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, downloadsCount: r.downloadsCount + 1 } : r));
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedResourceIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Resource removed from your saved list.', 'info');
        return prev.filter(item => item !== id);
      } else {
        showToast('Resource bookmarked in your Student Portal.', 'success');
        return [...prev, id];
      }
    });
  };

  const reportBrokenLink = (id: string, reason: string) => {
    const res = resources.find(r => r.id === id);
    submitFeedback({
      category: 'Resources',
      subject: `Broken Resource Link: ${res?.title || id}`,
      message: `Student reported broken link for resource ID ${id} (${res?.courseCode || 'Unknown course'}). User noted: ${reason}`,
      isAnonymous: false,
      name: currentUser?.fullName || 'Student Reporter',
      email: currentUser?.email || 'student@udusok.edu.ng'
    });
    showToast('Broken link report submitted to the Academic Directorate for verification.', 'info');
  };

  const addEvent = (event: Omit<EventItem, 'id' | 'registeredCount'>) => {
    const newEvent: EventItem = {
      ...event,
      id: `event-${Date.now()}`,
      registeredCount: 0
    };
    setEvents(prev => [newEvent, ...prev]);
    setSiteSettings(prev => ({
      ...prev,
      metrics: { ...prev.metrics, eventsOrganized: prev.metrics.eventsOrganized + 1 }
    }));
    logAdminAction('ADD_EVENT', newEvent.title, `Scheduled event for ${newEvent.date} at ${newEvent.venue}.`);
    showToast(`Event "${newEvent.title}" published to calendar.`);
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
    const target = events.find(e => e.id === id);
    logAdminAction('UPDATE_EVENT', target?.title || id, 'Updated event schedule or venue details.');
    showToast('Event updated successfully.');
  };

  const deleteEvent = (id: string) => {
    const target = events.find(e => e.id === id);
    setEvents(prev => prev.filter(e => e.id !== id));
    logAdminAction('DELETE_EVENT', target?.title || id, 'Cancelled/deleted scheduled event.');
    showToast('Event removed.');
  };

  const registerForEvent = (eventId: string): boolean => {
    const event = events.find(e => e.id === eventId);
    if (!event) return false;
    if (registeredEventIds.includes(eventId)) {
      showToast('You are already registered for this event.', 'info');
      return true;
    }
    if (event.registrationLimit && event.registeredCount >= event.registrationLimit) {
      showToast('Registration is currently at full capacity for this venue.', 'warning');
      return false;
    }
    setRegisteredEventIds(prev => [...prev, eventId]);
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e));
    showToast(`Successfully registered for "${event.title}". Seat confirmed!`, 'success');
    return true;
  };

  const cancelEventRegistration = (eventId: string) => {
    setRegisteredEventIds(prev => prev.filter(id => id !== eventId));
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e));
    showToast('Event registration cancelled.', 'info');
  };

  const addAnnouncement = (ann: Omit<Announcement, 'id' | 'date'>) => {
    const newAnn: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    logAdminAction('ADD_ANNOUNCEMENT', newAnn.title, `Published announcement under category: ${newAnn.category}.`);
    showToast(`Announcement "${newAnn.title}" published.`);
  };

  const updateAnnouncement = (id: string, updated: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
    const target = announcements.find(a => a.id === id);
    logAdminAction('UPDATE_ANNOUNCEMENT', target?.title || id, 'Modified announcement text or status.');
    showToast('Announcement updated.');
  };

  const deleteAnnouncement = (id: string) => {
    const target = announcements.find(a => a.id === id);
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    logAdminAction('DELETE_ANNOUNCEMENT', target?.title || id, 'Removed announcement.');
    showToast('Announcement deleted.');
  };

  const addOpportunity = (opp: Omit<Opportunity, 'id'>) => {
    const newOpp: Opportunity = {
      ...opp,
      id: `opp-${Date.now()}`
    };
    setOpportunities(prev => [newOpp, ...prev]);
    logAdminAction('ADD_OPPORTUNITY', newOpp.title, `Listed opportunity from ${newOpp.organization}.`);
    showToast(`Opportunity "${newOpp.title}" added.`);
  };

  const updateOpportunity = (id: string, updated: Partial<Opportunity>) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, ...updated } : o));
    showToast('Opportunity updated.');
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities(prev => prev.filter(o => o.id !== id));
    showToast('Opportunity removed.');
  };

  const addExecutive = (exec: Omit<Executive, 'id'>) => {
    const newExec: Executive = {
      ...exec,
      id: `exec-${Date.now()}`
    };
    setExecutives(prev => [...prev, newExec].sort((a, b) => a.order - b.order));
    logAdminAction('ADD_EXECUTIVE', newExec.name, `Assigned to ${newExec.position}.`);
    showToast(`Executive profile added for ${newExec.name}.`);
  };

  const updateExecutive = (id: string, updated: Partial<Executive>) => {
    setExecutives(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e).sort((a, b) => a.order - b.order));
    showToast('Executive profile updated.');
  };

  const deleteExecutive = (id: string) => {
    setExecutives(prev => prev.filter(e => e.id !== id));
    showToast('Executive removed.');
  };

  const reorderExecutives = (newOrder: Executive[]) => {
    setExecutives(newOrder);
    logAdminAction('REORDER_EXECUTIVES', 'Executive Hierarchy', 'Updated executive display order.');
    showToast('Executive team order saved.');
  };

  const addProgramme = (prog: Omit<Programme, 'id'>) => {
    const newProg: Programme = {
      ...prog,
      id: `prog-${Date.now()}`
    };
    setProgrammes(prev => [newProg, ...prev]);
    logAdminAction('ADD_PROGRAMME', newProg.title, 'Created official 2026/2027 administration programme.');
    showToast(`Programme "${newProg.title}" registered.`);
  };

  const updateProgramme = (id: string, updated: Partial<Programme>) => {
    setProgrammes(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    showToast('Programme updated.');
  };

  const submitResearchProject = (project: Omit<ResearchProject, 'id' | 'status' | 'submissionDate'>) => {
    const newProject: ResearchProject = {
      ...project,
      id: `rp-${Date.now()}`,
      status: 'Submitted',
      submissionDate: new Date().toISOString().split('T')[0]
    };
    setResearchProjects(prev => [newProject, ...prev]);
    setSiteSettings(prev => ({
      ...prev,
      metrics: { ...prev.metrics, researchInitiatives: prev.metrics.researchInitiatives + 1 }
    }));
    showToast(`Research proposal "${newProject.title}" submitted to the Scientific Review Committee!`, 'success');
  };

  const updateResearchProjectStatus = (id: string, status: ResearchProject['status']) => {
    setResearchProjects(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    logAdminAction('UPDATE_RESEARCH_STATUS', id, `Updated project status to ${status}.`);
    showToast(`Research project status updated to ${status}.`);
  };

  const addPastAdministration = (admin: AdministrationArchive) => {
    setPastAdministrations(prev => [admin, ...prev]);
    logAdminAction('ARCHIVE_ADMINISTRATION', admin.session, `Archived tenure of ${admin.president}.`);
    showToast(`Administration ${admin.session} archived.`);
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGallery(prev => [newItem, ...prev]);
    showToast('New photograph added to Gallery.');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    showToast('Gallery item removed.');
  };

  const issueCertificate = (cert: Omit<Certificate, 'id' | 'certificateCode' | 'issueDate' | 'verificationUrl'>): Certificate => {
    const code = `NSBS-UDUS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert: Certificate = {
      ...cert,
      id: `cert-${Date.now()}`,
      certificateCode: code,
      issueDate: new Date().toISOString().split('T')[0],
      verificationUrl: `https://nsbs-udus.org/verify/${code}`
    };
    setCertificates(prev => [newCert, ...prev]);
    logAdminAction('ISSUE_CERTIFICATE', newCert.certificateCode, `Awarded to ${newCert.studentName} for ${newCert.programmeTitle}.`);
    showToast(`Official Certificate issued for ${newCert.studentName}!`);
    return newCert;
  };

  const submitFeedback = (feedback: Omit<FeedbackSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newFb: FeedbackSubmission = {
      ...feedback,
      id: `fb-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'New'
    };
    setFeedbackList(prev => [newFb, ...prev]);
    showToast('Your message has been confidentially delivered to the NSBS Executive Council.', 'success');
  };

  const updateFeedbackStatus = (id: string, status: FeedbackSubmission['status'], notes?: string) => {
    setFeedbackList(prev => prev.map(f => f.id === id ? { ...f, status, notes: notes ?? f.notes } : f));
    logAdminAction('UPDATE_FEEDBACK', id, `Updated student feedback status to ${status}.`);
    showToast(`Feedback ticket updated to ${status}.`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        userRole,
        setUserRole,
        currentUser,
        setCurrentUser,
        isSearchOpen,
        setIsSearchOpen,
        searchFilterQuery,
        setSearchFilterQuery,
        siteSettings,
        updateSiteSettings,
        resources,
        addResource,
        updateResource,
        deleteResource,
        incrementDownload,
        bookmarkedResourceIds,
        toggleBookmark,
        reportBrokenLink,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        registeredEventIds,
        registerForEvent,
        cancelEventRegistration,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        opportunities,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        executives,
        addExecutive,
        updateExecutive,
        deleteExecutive,
        reorderExecutives,
        programmes,
        addProgramme,
        updateProgramme,
        researchProjects,
        submitResearchProject,
        updateResearchProjectStatus,
        pastAdministrations,
        addPastAdministration,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        certificates,
        issueCertificate,
        feedbackList,
        submitFeedback,
        updateFeedbackStatus,
        auditLogs,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        isAdminAuthenticated,
        adminPassword,
        adminLogin,
        adminLogout,
        requestAdminPasswordReset,
        resetAdminPassword,
        changeAdminPassword,
        studentLogin,
        studentLogout,
        updateCurrentUser,
        registeredStudents,
        requestPasswordReset,
        resetStudentPassword,
        addAIAgent,
        updateAIAgent,
        deleteAIAgent,
        toggleAIAgentActive,
        updateMetrics,
        syncMetricsFromRecords,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
