import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Resource, 
  EventItem, 
  Announcement, 
  Opportunity, 
  OpportunityType,
  Executive, 
  AcademicLevel, 
  ResourceCategory, 
  EventCategory,
  AuditLog,
  FeedbackSubmission,
  Certificate
} from '../../types';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Bell, 
  Briefcase, 
  Users, 
  Sparkles, 
  MessageSquare, 
  Settings, 
  History, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Check, 
  Save, 
  Search,
  Award,
  Layers,
  FileText,
  Lock,
  LogOut,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Globe,
  UserCheck,
  Eye,
  EyeOff,
  Filter,
  Key,
  ShieldAlert,
  Cpu,
  Brain,
  Bot,
  ToggleLeft,
  ToggleRight,
  Send,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { AIAgent } from '../../types';
import { fileToOptimizedDataUrl } from '../../utils/images';
import { CertificateArtwork } from '../common/CertificateArtwork';
import { downloadCertificatePdf } from '../../utils/certificatePdf';

export const STANDARD_EXECUTIVE_POSITIONS = [
  'President',
  'Vice President',
  'Secretary General',
  'Assistant Secretary General',
  'Financial Secretary',
  'Treasurer',
  'Public Relations Officer (PRO) 1',
  'Public Relations Officer (PRO) 2',
  'Welfare Director 1',
  'Welfare Director 2',
  'Director of Socials 1',
  'Director of Socials 2',
  'Sports Director 1',
  'Sports Director 2',
  'Director of Academics 1',
  'Director of Academics 2',
  'Project Manager 1',
  'Project Manager 2',
  'Auditor General'
];

const CATEGORIES: ResourceCategory[] = [
  'Handouts',
  'Textbooks',
  'Lecture Notes',
  'Journals',
  'Research Papers',
  'Past Questions',
  'Practical Manuals',
  'Laboratory Guides',
  'Seminar Materials',
  'Final-Year Project Resources',
  'Clinical Biochemistry',
  'Molecular Biology',
  'Enzymology',
  'Metabolism',
  'Genetics',
  'Immunology',
  'Pharmacology',
  'Analytical Biochemistry',
  'Food Biochemistry',
  'Industrial Biochemistry'
];

export const AdminDashboard: React.FC = () => {
  const { 
    siteSettings, 
    updateSiteSettings, 
    resources, 
    addResource, 
    updateResource, 
    deleteResource, 
    events, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
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
    researchProjects, 
    updateResearchProjectStatus, 
    feedbackList, 
    updateFeedbackStatus, 
    auditLogs, 
    issueCertificate,
    updateCertificate,
    certificates,
    setActivePage,
    isAdminAuthenticated,
    adminPassword,
    adminLogin,
    adminLogout,
    requestAdminPasswordReset,
    resetAdminPassword,
    changeAdminPassword,
    registeredStudents,
    programmes,
    addAIAgent,
    updateAIAgent,
    deleteAIAgent,
    toggleAIAgentActive,
    updateMetrics,
    syncMetricsFromRecords,
    showToast 
  } = useApp();

  // Authentication Login State (when not authenticated)
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Administrative Password Recovery State
  const [showAdminForgotPassword, setShowAdminForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState<'request' | 'verify'>('request');
  const [forgotResetToken, setForgotResetToken] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [dispatchedToken, setDispatchedToken] = useState('');
  const [dispatchedEmail, setDispatchedEmail] = useState('');
  const [isRequestingReset, setIsRequestingReset] = useState(false);

  // Administrative In-Dashboard Password Change State
  const [adminOldPassword, setAdminOldPassword] = useState('');
  const [adminNewPassword, setAdminNewPassword] = useState('');
  const [adminConfirmPassword, setAdminConfirmPassword] = useState('');
  const [adminPwdMsg, setAdminPwdMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Active section
  const [currentSection, setCurrentSection] = useState<
    'executives' | 'overview' | 'resources' | 'events' | 'announcements' | 'opportunities' | 'ailab' | 'feedback' | 'certificates' | 'audit' | 'settings'
  >('executives');

  // Executive Settings State
  const [execFilter, setExecFilter] = useState('');
  const [editingExecId, setEditingExecId] = useState<string | null>(null);

  // Temporary edit buffer for each executive
  const [execEditData, setExecEditData] = useState<{ [id: string]: Partial<Executive> }>({});

  // Resource Form State
  const [resTitle, setResTitle] = useState('');
  const [resCourseCode, setResCourseCode] = useState('BCH 401');
  const [resCourseName, setResCourseName] = useState('Clinical Biochemistry');
  const [resLevel, setResLevel] = useState<AcademicLevel>('400L');
  const [resCategory, setResCategory] = useState<ResourceCategory>('Clinical Biochemistry');
  const [resAuthor, setResAuthor] = useState('');
  const [resDesc, setResDesc] = useState('');
  const [resDriveUrl, setResDriveUrl] = useState('');
  const [resFileType, setResFileType] = useState<'PDF' | 'DOCX' | 'PPTX' | 'ZIP'>('PDF');
  const [resFileSize, setResFileSize] = useState('5.4 MB');

  // Event Form State
  const [evtTitle, setEvtTitle] = useState('');
  const [evtDesc, setEvtDesc] = useState('');
  const [evtDate, setEvtDate] = useState('2026-11-20');
  const [evtStartTime, setEvtStartTime] = useState('10:00 AM');
  const [evtEndTime, setEvtEndTime] = useState('01:00 PM');
  const [evtVenue, setEvtVenue] = useState('Lecture Theatre 2 (LT 2), Science Complex');
  const [evtOrganizer, setEvtOrganizer] = useState('NSBS Tutorial Directorate');
  const [evtCategory, setEvtCategory] = useState<EventCategory>('Academic');
  const [evtSemester, setEvtSemester] = useState<'First Semester' | 'Second Semester'>('First Semester');

  // Announcement Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annSummary, setAnnSummary] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState<Announcement['category']>('Academic');
  const [annPriority, setAnnPriority] = useState<'High' | 'Normal' | 'Low'>('Normal');

  // Opportunity Form State & Editing State
  const [editingOppId, setEditingOppId] = useState<string | null>(null);
  const [oppTitle, setOppTitle] = useState('');
  const [oppOrg, setOppOrg] = useState('');
  const [oppType, setOppType] = useState<OpportunityType>('Scholarship');
  const [oppDesc, setOppDesc] = useState('');
  const [oppEligibility, setOppEligibility] = useState('');
  const [oppDeadline, setOppDeadline] = useState('2026-12-31');
  const [oppLocation, setOppLocation] = useState('Nigeria (National)');
  const [oppUrl, setOppUrl] = useState('');
  const [oppTags, setOppTags] = useState('Biochemistry, Undergraduate, Scholarship');
  const [oppFeatured, setOppFeatured] = useState(true);
  const [oppPublished, setOppPublished] = useState(true);
  const [oppFilterQuery, setOppFilterQuery] = useState('');
  const [oppFilterType, setOppFilterType] = useState<string>('all');

  // Listen for navigation requests from other parts of the app
  useEffect(() => {
    const targetSection = sessionStorage.getItem('nsbs_admin_section') as any;
    if (targetSection && ['executives', 'overview', 'resources', 'events', 'announcements', 'opportunities', 'ailab', 'feedback', 'certificates', 'audit', 'settings'].includes(targetSection)) {
      setCurrentSection(targetSection);
      sessionStorage.removeItem('nsbs_admin_section');
    }

    const editOppId = sessionStorage.getItem('nsbs_edit_opp_id');
    if (editOppId) {
      sessionStorage.removeItem('nsbs_edit_opp_id');
      const targetOpp = opportunities.find(o => o.id === editOppId);
      if (targetOpp) {
        handleStartEditOpportunity(targetOpp);
      }
    }
  }, [opportunities]);

  // AI Agent Management State
  const [isAddingAgent, setIsAddingAgent] = useState(false);
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [agentNameInput, setAgentNameInput] = useState('');
  const [agentProviderInput, setAgentProviderInput] = useState<'gemini' | 'openai' | 'claude' | 'deepseek' | 'custom'>('gemini');
  const [agentProviderLabelInput, setAgentProviderLabelInput] = useState('Google Gemini Custom Gem');
  const [agentUrlInput, setAgentUrlInput] = useState('');
  const [agentDescriptionInput, setAgentDescriptionInput] = useState('');
  const [agentCapabilitiesInput, setAgentCapabilitiesInput] = useState('');
  const [agentActiveInput, setAgentActiveInput] = useState(true);

  // Factual Home Statistics State
  const [metricOutreaches, setMetricOutreaches] = useState<number>(siteSettings.metrics?.communityOutreaches ?? 8);
  const [metricBeneficiaries, setMetricBeneficiaries] = useState<number>(siteSettings.metrics?.outreachBeneficiaries ?? 1450);
  const [metricStudents, setMetricStudents] = useState<number>(siteSettings.metrics?.registeredStudents ?? 842);
  const [metricResources, setMetricResources] = useState<number>(siteSettings.metrics?.academicResources ?? 168);
  const [metricEvents, setMetricEvents] = useState<number>(siteSettings.metrics?.eventsOrganized ?? 24);
  const [metricProgrammes, setMetricProgrammes] = useState<number>(siteSettings.metrics?.trainingProgrammes ?? 12);
  const [metricResearch, setMetricResearch] = useState<number>(siteSettings.metrics?.researchInitiatives ?? 18);

  // Issue Certificate State
  const [certStudentName, setCertStudentName] = useState('');
  const [certStudentId, setCertStudentId] = useState('');
  const [certProgTitle, setCertProgTitle] = useState('Biochemistry Clinical Diagnostics Workshop');
  const [certCategory, setCertCategory] = useState('Workshop');
  const [certTitle, setCertTitle] = useState('Certificate of Achievement');
  const [certStatement, setCertStatement] = useState('This certificate is proudly presented to');
  const [certIssuerName, setCertIssuerName] = useState(siteSettings.presidentName || 'NSBS UDUS President');
  const [certIssuerRole, setCertIssuerRole] = useState('President, NSBS UDUS');
  const [certOrganization, setCertOrganization] = useState('NIGERIAN SOCIETY OF BIOCHEMISTRY STUDENTS (NSBS)');
  const [certUniversity, setCertUniversity] = useState('USMANU DANFODIYO UNIVERSITY, SOKOTO');
  const [certDate, setCertDate] = useState(new Date().toISOString().slice(0, 10));
  const [certLogo, setCertLogo] = useState<string | undefined>();
  const [certSignature, setCertSignature] = useState<string | undefined>();
  const [editingCertificateId, setEditingCertificateId] = useState<string | null>(null);

  // Handle Admin Login
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    const result = adminLogin(loginUsername, loginPassword);
    setIsLoggingIn(false);

    if (!result.success) {
      setLoginError(result.error || 'Authentication failed. Please verify credentials.');
    } else {
      setLoginUsername('');
      setLoginPassword('');
    }
  };

  // Administrative Password Reset Handlers
  const handleRequestAdminReset = () => {
    setForgotError('');
    setForgotSuccess('');
    setIsRequestingReset(true);
    const res = requestAdminPasswordReset();
    setIsRequestingReset(false);
    if (res.success) {
      setDispatchedToken(res.token);
      setDispatchedEmail(res.targetEmail);
      setForgotStep('verify');
      setForgotSuccess(res.message);
      setForgotResetToken(res.token); // Convenience for rapid testing
    } else {
      setForgotError(res.message);
    }
  };

  const handleVerifyAdminReset = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    if (!forgotResetToken.trim()) {
      setForgotError('Please enter the authorization token sent to the NSBS mail.');
      return;
    }
    if (forgotNewPassword.length < 6) {
      setForgotError('New administrator password must be at least 6 characters long.');
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotError('New passwords do not match.');
      return;
    }

    const res = resetAdminPassword(forgotResetToken, forgotNewPassword);
    if (res.success) {
      setShowAdminForgotPassword(false);
      setLoginUsername('Admin_1');
      setLoginPassword(forgotNewPassword);
      setLoginError('');
      showToast('Admin password reset successfully! You can now log in with your updated password.', 'success');
    } else {
      setForgotError(res.error || 'Failed to reset password. Please check the token.');
    }
  };

  const handleChangeAdminPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminPwdMsg(null);
    if (adminNewPassword !== adminConfirmPassword) {
      setAdminPwdMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    const res = changeAdminPassword(adminOldPassword, adminNewPassword);
    if (res.success) {
      setAdminPwdMsg({ type: 'success', text: 'Administrator password updated successfully!' });
      setAdminOldPassword('');
      setAdminNewPassword('');
      setAdminConfirmPassword('');
    } else {
      setAdminPwdMsg({ type: 'error', text: res.error || 'Failed to update password.' });
    }
  };

  // AI Agent Management Handlers
  const handleOpenAddAgent = () => {
    setIsAddingAgent(true);
    setEditingAgentId(null);
    setAgentNameInput('');
    setAgentProviderInput('gemini');
    setAgentProviderLabelInput('Google Gemini Custom Gem');
    setAgentUrlInput('https://gemini.google.com/gems/');
    setAgentDescriptionInput('AI-powered academic assistant for Biochemistry students.');
    setAgentCapabilitiesInput('Pathway analysis, Enzymology, CA revision');
    setAgentActiveInput(true);
  };

  const handleStartEditAgent = (agent: AIAgent) => {
    setEditingAgentId(agent.id);
    setIsAddingAgent(false);
    setAgentNameInput(agent.name);
    setAgentProviderInput(agent.provider as any || 'custom');
    setAgentProviderLabelInput(agent.providerLabel || '');
    setAgentUrlInput(agent.url);
    setAgentDescriptionInput(agent.description);
    setAgentCapabilitiesInput(agent.capabilities ? agent.capabilities.join(', ') : '');
    setAgentActiveInput(agent.active);
  };

  const handleSaveAIAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentNameInput.trim() || !agentUrlInput.trim()) {
      showToast('Agent name and launch destination URL are required.', 'warning');
      return;
    }

    const caps = agentCapabilitiesInput
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const defaultLabelMap: Record<string, string> = {
      gemini: 'Google Gemini Custom Gem',
      openai: 'OpenAI Custom GPT',
      claude: 'Anthropic Claude Interactive Tutor',
      deepseek: 'DeepSeek Research Model',
      custom: 'Custom Biochemical AI Agent'
    };

    const finalProviderLabel = agentProviderLabelInput.trim() || defaultLabelMap[agentProviderInput] || 'AI Assistant';

    if (editingAgentId) {
      updateAIAgent(editingAgentId, {
        name: agentNameInput.trim(),
        provider: agentProviderInput,
        providerLabel: finalProviderLabel,
        url: agentUrlInput.trim(),
        description: agentDescriptionInput.trim(),
        capabilities: caps.length > 0 ? caps : ['Biochemistry Revision'],
        active: agentActiveInput
      });
      setEditingAgentId(null);
    } else {
      addAIAgent({
        name: agentNameInput.trim(),
        provider: agentProviderInput,
        providerLabel: finalProviderLabel,
        url: agentUrlInput.trim(),
        description: agentDescriptionInput.trim() || 'AI assistant specialized for biochemistry curriculum tutoring.',
        capabilities: caps.length > 0 ? caps : ['Biochemistry Revision'],
        active: agentActiveInput,
        iconType: agentProviderInput === 'gemini' ? 'sparkles' : agentProviderInput === 'openai' ? 'brain' : agentProviderInput === 'claude' ? 'cpu' : 'bot'
      });
      setIsAddingAgent(false);
    }
  };

  const handleDeleteAgent = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove the AI Agent "${name}"? It will no longer be visible on the public AI Lab or Home page.`)) {
      deleteAIAgent(id);
    }
  };

  // Factual Metrics Handlers
  const handleSaveFactualMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    updateMetrics({
      communityOutreaches: Number(metricOutreaches),
      outreachBeneficiaries: Number(metricBeneficiaries),
      registeredStudents: Number(metricStudents),
      academicResources: Number(metricResources),
      eventsOrganized: Number(metricEvents),
      trainingProgrammes: Number(metricProgrammes),
      researchInitiatives: Number(metricResearch)
    });
  };

  const handleSyncMetricsFromDB = () => {
    const updated = {
      communityOutreaches: Number(metricOutreaches),
      outreachBeneficiaries: Number(metricBeneficiaries),
      registeredStudents: registeredStudents.length > 0 ? registeredStudents.length : Number(metricStudents),
      academicResources: resources.length,
      eventsOrganized: events.length,
      trainingProgrammes: programmes.length,
      researchInitiatives: researchProjects.length
    };
    setMetricStudents(updated.registeredStudents);
    setMetricResources(updated.academicResources);
    setMetricEvents(updated.eventsOrganized);
    setMetricProgrammes(updated.trainingProgrammes);
    setMetricResearch(updated.researchInitiatives);
    updateMetrics(updated);
  };

  // Handle Photo Upload for an Executive
  const handlePhotoFileUpload = (execId: string, file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP).', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        // Update in executive edit buffer or directly
        updateExecutive(execId, { photoUrl: dataUrl });
        showToast('Executive picture uploaded successfully!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Executive Field Changes
  const handleExecFieldChange = (id: string, field: keyof Executive, value: any) => {
    setExecEditData(prev => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [field]: value
      }
    }));
  };

  // Save specific executive
  const handleSaveExecutive = (exec: Executive) => {
    const changes = execEditData[exec.id] || {};
    const updatedName = changes.name !== undefined ? changes.name : exec.name;
    const updatedPosition = changes.position !== undefined ? changes.position : exec.position;
    const updatedLevel = changes.level !== undefined ? changes.level : exec.level;
    const updatedPhoto = changes.photoUrl !== undefined ? changes.photoUrl : exec.photoUrl;

    updateExecutive(exec.id, {
      ...changes,
      name: updatedName.trim(),
      position: updatedPosition.trim(),
      level: updatedLevel,
      photoUrl: updatedPhoto
    });

    // If this is the President position and name changed, update site settings president name
    if (exec.position.toLowerCase() === 'president' || updatedPosition.toLowerCase() === 'president') {
      if (updatedName.trim()) {
        updateSiteSettings({ presidentName: updatedName.trim() });
      }
    }

    // Clear buffer for this executive
    setExecEditData(prev => {
      const copy = { ...prev };
      delete copy[exec.id];
      return copy;
    });

    showToast(`Executive #${exec.order} (${updatedPosition}) updated successfully!`, 'success');
  };

  // Handlers for other entities
  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle || !resDriveUrl) return;

    addResource({
      title: resTitle,
      courseCode: resCourseCode,
      courseName: resCourseName,
      level: resLevel,
      category: resCategory,
      author: resAuthor || 'UDUS Biochemistry Faculty',
      description: resDesc || 'Standard departmental course handout and reference syllabus.',
      fileType: resFileType,
      fileSize: resFileSize,
      uploadedBy: 'Executive Administrator',
      googleDriveUrl: resDriveUrl,
      tags: [resCourseCode, resCategory, resLevel],
      featured: true,
      published: true
    });

    setResTitle('');
    setResDriveUrl('');
    setResDesc('');
    showToast('Resource published directly to Student Library!');
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evtTitle || !evtVenue) return;

    addEvent({
      title: evtTitle,
      description: evtDesc,
      date: evtDate,
      startTime: evtStartTime,
      endTime: evtEndTime,
      venue: evtVenue,
      organizer: evtOrganizer,
      category: evtCategory,
      registrationDeadline: evtDate,
      status: 'Upcoming',
      featured: true,
      semester: evtSemester
    });

    setEvtTitle('');
    setEvtDesc('');
    showToast('Event created and published to calendar!');
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    addAnnouncement({
      title: annTitle,
      summary: annSummary || annContent.slice(0, 140) + '...',
      content: annContent,
      category: annCategory,
      author: 'Office of the President',
      authorRole: 'NSBS Executive Council',
      priority: annPriority,
      published: true,
      featured: true
    });

    setAnnTitle('');
    setAnnSummary('');
    setAnnContent('');
    showToast('Announcement broadcasted to public homepage!');
  };

  const handleStartEditOpportunity = (opp: Opportunity) => {
    setEditingOppId(opp.id);
    setOppTitle(opp.title);
    setOppOrg(opp.organization);
    setOppType(opp.type);
    setOppDesc(opp.description);
    setOppEligibility(opp.eligibility);
    setOppDeadline(opp.deadline);
    setOppLocation(opp.location);
    setOppUrl(opp.applicationUrl);
    setOppTags(opp.tags ? opp.tags.join(', ') : '');
    setOppFeatured(opp.featured);
    setOppPublished(opp.published);

    const formEl = document.getElementById('opp-form-card');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCancelEditOpportunity = () => {
    setEditingOppId(null);
    setOppTitle('');
    setOppOrg('');
    setOppType('Scholarship');
    setOppDesc('');
    setOppEligibility('');
    setOppDeadline('2026-12-31');
    setOppLocation('Nigeria (National)');
    setOppUrl('');
    setOppTags('Biochemistry, Undergraduate, Scholarship');
    setOppFeatured(true);
    setOppPublished(true);
  };

  const handleSaveOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oppTitle.trim() || !oppUrl.trim()) {
      showToast('Opportunity Title and Application URL are required.', 'warning');
      return;
    }

    const parsedTags = oppTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const finalTags = parsedTags.length > 0 ? parsedTags : ['Biochemistry', oppType];

    if (editingOppId) {
      updateOpportunity(editingOppId, {
        title: oppTitle.trim(),
        organization: oppOrg.trim() || 'NSBS / Partner Organization',
        type: oppType,
        description: oppDesc.trim(),
        eligibility: oppEligibility.trim() || 'All Biochemistry Students',
        deadline: oppDeadline,
        location: oppLocation.trim() || 'Nigeria (National)',
        applicationUrl: oppUrl.trim(),
        featured: oppFeatured,
        published: oppPublished,
        tags: finalTags
      });
      showToast(`Opportunity "${oppTitle}" updated successfully!`, 'success');
      setEditingOppId(null);
    } else {
      addOpportunity({
        title: oppTitle.trim(),
        organization: oppOrg.trim() || 'NSBS / Partner Organization',
        type: oppType,
        description: oppDesc.trim(),
        eligibility: oppEligibility.trim() || 'All Biochemistry Students',
        deadline: oppDeadline,
        location: oppLocation.trim() || 'Nigeria (National)',
        applicationUrl: oppUrl.trim(),
        featured: oppFeatured,
        published: oppPublished,
        tags: finalTags
      });
      showToast(`Opportunity "${oppTitle}" published to Opportunities Hub!`, 'success');
    }

    // Reset Form
    setOppTitle('');
    setOppOrg('');
    setOppType('Scholarship');
    setOppDesc('');
    setOppEligibility('');
    setOppDeadline('2026-12-31');
    setOppLocation('Nigeria (National)');
    setOppUrl('');
    setOppTags('Biochemistry, Undergraduate, Scholarship');
    setOppFeatured(true);
    setOppPublished(true);
  };

  const handleAddNewExecutive = () => {
    const nextOrder = executives.length + 1;
    const defaultPosition = STANDARD_EXECUTIVE_POSITIONS[nextOrder - 1] || `Executive Officer ${nextOrder}`;
    addExecutive({
      name: '',
      position: defaultPosition,
      portfolio: `${defaultPosition} Directorate`,
      level: '300L',
      areasOfInterest: 'Biochemical Sciences',
      biography: `Serves in the NSBS UDUS Executive Council as ${defaultPosition}.`,
      responsibilities: ['Assist Executive Council in advancing departmental goals and student welfare.'],
      photoUrl: '',
      email: `exec${nextOrder}.nsbs@udusok.edu.ng`,
      order: nextOrder
    });
    showToast(`Added Executive Slot #${nextOrder} (${defaultPosition}). Edit details below!`, 'success');
  };

  const handleIssueCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certStudentName.trim() || !certProgTitle.trim() || !certTitle.trim() || !certIssuerName.trim() || !certIssuerRole.trim()) {
      showToast('Complete the recipient, achievement, certificate title, and signatory fields before saving.', 'warning');
      return;
    }
    const matchedStudent = registeredStudents.find(student => student.id === certStudentId) ||
      registeredStudents.find(student => student.fullName.trim().toLocaleLowerCase() === certStudentName.trim().toLocaleLowerCase());
    const certificateData = {
      studentId: matchedStudent?.id || certStudentId || `manual-${Date.now()}`,
      studentName: certStudentName.trim(),
      programmeTitle: certProgTitle.trim(),
      category: certCategory.trim() || 'Certificate',
      issueDate: certDate,
      issuerName: certIssuerName.trim(),
      issuerRole: certIssuerRole.trim(),
      certificateTitle: certTitle.trim(),
      completionStatement: certStatement.trim(),
      organizationName: certOrganization.trim(),
      universityName: certUniversity.trim(),
      logoDataUrl: certLogo,
      signatureDataUrl: certSignature
    };

    if (editingCertificateId) {
      updateCertificate(editingCertificateId, certificateData);
      showToast('Issued certificate details saved. The student will see the revised certificate.', 'success');
    } else {
      const issued = issueCertificate(certificateData);
      showToast(`Certificate ${issued.certificateCode} issued to ${issued.studentName}.`, 'success');
    }
    setEditingCertificateId(null);
  };

  const handleEditCertificate = (certificate: Certificate) => {
    setEditingCertificateId(certificate.id);
    setCertStudentId(certificate.studentId || '');
    setCertStudentName(certificate.studentName || '');
    setCertProgTitle(certificate.programmeTitle || '');
    setCertCategory(certificate.category || 'Certificate');
    setCertTitle(certificate.certificateTitle || 'Certificate of Achievement');
    setCertStatement(certificate.completionStatement || 'This certificate is proudly presented to');
    setCertIssuerName(certificate.issuerName || siteSettings.presidentName || 'NSBS UDUS President');
    setCertIssuerRole(certificate.issuerRole || 'President, NSBS UDUS');
    setCertOrganization(certificate.organizationName || 'NIGERIAN SOCIETY OF BIOCHEMISTRY STUDENTS (NSBS)');
    setCertUniversity(certificate.universityName || 'USMANU DANFODIYO UNIVERSITY, SOKOTO');
    setCertDate(certificate.issueDate || new Date().toISOString().slice(0, 10));
    setCertLogo(certificate.logoDataUrl);
    setCertSignature(certificate.signatureDataUrl);
  };

  const handleCertificateImage = async (file: File | undefined, kind: 'logo' | 'signature') => {
    if (!file) return;
    try {
      const image = await fileToOptimizedDataUrl(file, { maxWidth: kind === 'logo' ? 900 : 1000, maxHeight: kind === 'logo' ? 500 : 320, quality: 0.88, maxBytes: 400_000 });
      (kind === 'logo' ? setCertLogo : setCertSignature)(image);
      showToast(`${kind === 'logo' ? 'Logo' : 'Signature'} added to the certificate preview.`, 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : `Unable to process this ${kind}.`, 'warning');
    }
  };

  // -------------------------------------------------------------
  // GUARD: If not authenticated as Admin, show secure login gate or Password Recovery
  // -------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[85vh] bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Top Banner */}
          <div className="bg-[#0b1b33] p-6 text-center text-white relative">
            <div className="inline-flex p-3 rounded-full bg-blue-900/60 border border-blue-700/50 mb-3">
              {showAdminForgotPassword ? (
                <Key className="w-7 h-7 text-amber-300" />
              ) : (
                <Lock className="w-7 h-7 text-amber-300" />
              )}
            </div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-blue-300">
              Usmanu Danfodiyo University, Sokoto
            </div>
            <h2 className="font-display-academic text-xl font-bold mt-1 text-white">
              {showAdminForgotPassword ? 'Administrative Password Recovery' : 'NSBS Administrative Portal'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {showAdminForgotPassword 
                ? 'Authorized password reset via official NSBS Secretariat Mail' 
                : 'Restricted to authorized Executive Administrators only'}
            </p>
          </div>

          {/* MODE A: Standard Login Form */}
          {!showAdminForgotPassword ? (
            <form onSubmit={handleAdminLoginSubmit} className="p-6 sm:p-8 space-y-4">
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Administrator Username:
                </label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  placeholder="Enter administrator username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm text-slate-900"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Administrator Password:
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminForgotPassword(true);
                      setForgotStep('request');
                      setForgotError('');
                      setForgotSuccess('');
                    }}
                    className="text-[11px] font-semibold text-blue-900 hover:text-blue-700 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  autoComplete="off"
                  placeholder="Enter administrator password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 px-4 rounded-lg bg-[#0c2340] hover:bg-[#15345d] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>{isLoggingIn ? 'Verifying Session...' : 'Authenticate & Enter Dashboard'}</span>
                </button>
              </div>

              <div className="text-center pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminForgotPassword(true);
                    setForgotStep('request');
                    setForgotError('');
                    setForgotSuccess('');
                  }}
                  className="text-blue-900 hover:underline font-medium"
                >
                  Reset password via NSBS mail
                </button>

                <button
                  type="button"
                  onClick={() => setActivePage('home')}
                  className="hover:text-slate-800 transition-colors"
                >
                  ← Return to Website
                </button>
              </div>
            </form>
          ) : (
            /* MODE B: Administrative Password Reset Form */
            <div className="p-6 sm:p-8 space-y-4">
              {/* NSBS Secretariat Email Notification Banner */}
              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-blue-950 uppercase tracking-wide text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-blue-700" />
                  <span>Destination Official NSBS Email</span>
                </div>
                <div className="font-mono text-xs font-bold text-blue-900 break-all bg-white p-2 rounded border border-blue-200">
                  {siteSettings.officialEmail || 'nsbs.udus@udusok.edu.ng'}
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  * Note: The NSBS email address is maintained by the administration and can be updated anytime in the NSBS Admin Settings.
                </p>
              </div>

              {forgotError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{forgotError}</span>
                </div>
              )}

              {forgotSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Password Reset Mail Dispatched!</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    An official authorization token was generated and dispatched to <strong className="font-mono">{dispatchedEmail}</strong>.
                  </p>
                  {dispatchedToken && (
                    <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px]">
                      <span>Authorization Token: <strong className="font-mono font-bold text-emerald-950 bg-white px-2 py-0.5 rounded border border-emerald-300">{dispatchedToken}</strong></span>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotResetToken(dispatchedToken);
                          showToast('Token copied to input!', 'info');
                        }}
                        className="text-emerald-700 underline font-semibold ml-2 hover:text-emerald-900"
                      >
                        Auto-fill
                      </button>
                    </div>
                  )}
                </div>
              )}

              {forgotStep === 'request' ? (
                <div className="space-y-4 pt-1">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Click the button below to send an encrypted password reset token to the official NSBS Secretariat email address (<strong className="font-mono text-blue-900">{siteSettings.officialEmail}</strong>).
                  </p>

                  <button
                    type="button"
                    onClick={handleRequestAdminReset}
                    disabled={isRequestingReset}
                    className="w-full py-3 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>{isRequestingReset ? 'Dispatching Mail...' : 'Send Password Reset Mail to NSBS Email'}</span>
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotStep('verify')}
                      className="text-xs text-slate-600 hover:text-blue-900 underline font-medium"
                    >
                      Already have an authorization token? Enter Token →
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleVerifyAdminReset} className="space-y-3.5 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Reset Authorization Token:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NSBS-ADM-123456"
                      value={forgotResetToken}
                      onChange={(e) => setForgotResetToken(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-xs font-bold text-blue-950 focus:ring-2 focus:ring-blue-900 outline-none"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Check your NSBS Secretariat inbox ({siteSettings.officialEmail}) for this token.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      New Administrator Password:
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Minimum 6 characters"
                      value={forgotNewPassword}
                      onChange={(e) => setForgotNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Confirm New Password:
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Re-enter new password"
                      value={forgotConfirmPassword}
                      onChange={(e) => setForgotConfirmPassword(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Verify Token &amp; Update Password</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => setForgotStep('request')}
                      className="text-slate-500 hover:text-slate-800 text-[11px]"
                    >
                      Resend reset mail
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAdminForgotPassword(false)}
                      className="text-blue-900 font-semibold hover:underline text-[11px]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="text-center pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAdminForgotPassword(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
                >
                  ← Return to Administrator Login
                </button>
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="bg-slate-50 px-6 py-3 text-[11px] text-slate-500 text-center border-t border-slate-100">
            Protected by cryptographic session validation · Access is strictly monitored
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED: Display the Full Admin Dashboard
  // -------------------------------------------------------------
  const configuredExecsCount = executives.filter(e => e.name && e.name.trim().length > 0).length;
  const execsWithPhotosCount = executives.filter(e => e.photoUrl && e.photoUrl.trim().length > 0).length;

  const filteredExecutives = executives.filter(e => 
    e.position.toLowerCase().includes(execFilter.toLowerCase()) ||
    e.name.toLowerCase().includes(execFilter.toLowerCase()) ||
    e.level.toLowerCase().includes(execFilter.toLowerCase())
  );

  return (
    <div className="py-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        
        {/* Top Executive Header with WELCOME ADMIN */}
        <div className="bg-gradient-to-r from-[#0b1b33] via-[#0c2340] to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-900/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-300 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>NSBS UDUS Executive Administration</span>
            </div>
            
            {/* Prominent Welcome Admin Heading */}
            <h1 className="font-display-academic text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
              <span>Welcome Admin</span>
              <span className="text-xs font-mono font-normal px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                Session 2026/2027
              </span>
            </h1>
            
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Full control over the 19 Executive Offices, Digital Biochemistry Library, Academic Timetables, AI Lab, Announcements, and Student Registrations.
            </p>
          </div>

          {/* Action Badges & Logout */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-center shrink-0">
            <button
              onClick={() => setActivePage('home')}
              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={adminLogout}
              className="px-3.5 py-2 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Securely log out of administrative portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Admin</span>
            </button>
          </div>
        </div>

        {/* Module Navigation: Responsive Design */}
        {/* On Mobile & Tablet (< lg): Compact Horizontal Swipeable Bar (STATIC, NEVER STICKY OVER CONTENT) */}
        <div className="lg:hidden bg-white rounded-xl border border-slate-200 p-3 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Admin Module:
            </span>
            <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              {currentSection === 'executives' && 'Executive Settings (19)'}
              {currentSection === 'overview' && 'Metrics & Overview'}
              {currentSection === 'resources' && `Digital Library (${resources.length})`}
              {currentSection === 'events' && `Events (${events.length})`}
              {currentSection === 'announcements' && `Announcements (${announcements.length})`}
              {currentSection === 'opportunities' && 'Opportunities'}
              {currentSection === 'ailab' && 'AI Lab Config'}
              {currentSection === 'feedback' && `Student Voice (${feedbackList.length})`}
              {currentSection === 'certificates' && 'Certificates'}
              {currentSection === 'audit' && `Audit Log (${auditLogs.length})`}
              {currentSection === 'settings' && 'Settings'}
            </span>
          </div>

          {/* Swipeable horizontal pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 touch-pan-x">
            <button
              type="button"
              onClick={() => setCurrentSection('executives')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                currentSection === 'executives'
                  ? 'bg-blue-900 text-white shadow-sm ring-1 ring-blue-900'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Executives (19)</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentSection('overview')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentSection === 'overview'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentSection('resources')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentSection === 'resources'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Library ({resources.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentSection('events')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentSection === 'events'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Events ({events.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentSection('announcements')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentSection === 'announcements'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Announcements</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentSection('opportunities')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentSection === 'opportunities'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Opportunities</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentSection('ailab')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentSection === 'ailab'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Lab</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentSection('feedback')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentSection === 'feedback'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inbox ({feedbackList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentSection('certificates')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentSection === 'certificates'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certificates</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentSection('audit')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentSection === 'audit'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Audit</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentSection('settings')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentSection === 'settings'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Dashboard Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Desktop Navigation Sidebar (hidden on mobile, sticky only on lg screens) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1 lg:sticky lg:top-24 z-10">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1 font-bold">
                Administration Modules
              </div>

              <button
                type="button"
                onClick={() => setCurrentSection('executives')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors ${
                  currentSection === 'executives' 
                    ? 'bg-blue-900 text-white shadow-sm' 
                    : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Executive Settings (19)</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${currentSection === 'executives' ? 'bg-blue-800 text-amber-300' : 'bg-slate-100 text-slate-600'}`}>
                  19
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentSection('overview')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                  currentSection === 'overview' ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Metrics &amp; Overview</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentSection('resources')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                  currentSection === 'resources' ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Digital Library ({resources.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentSection('events')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                  currentSection === 'events' ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Events &amp; Tutorials ({events.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentSection('announcements')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                  currentSection === 'announcements' ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Announcements ({announcements.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentSection('opportunities')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                  currentSection === 'opportunities' ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Opportunities Hub</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentSection('ailab')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                  currentSection === 'ailab' ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Lab Configuration</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentSection('feedback')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                  currentSection === 'feedback' ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>Student Voice / Inbox</span>
                </div>
                {feedbackList.length > 0 && (
                  <span className="bg-amber-400 text-amber-950 font-bold px-1.5 py-0.5 rounded text-[10px]">
                    {feedbackList.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setCurrentSection('certificates')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                  currentSection === 'certificates' ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Certificate Issuer</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentSection('audit')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                  currentSection === 'audit' ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Audit Log ({auditLogs.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentSection('settings')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                  currentSection === 'settings' ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Platform Settings</span>
              </button>
            </div>
          </div>

          {/* Main Workspace Stage */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* ============================================================== */}
            {/* SECTION: EXECUTIVE COUNCIL SETTINGS (TOTAL: 19 EXECUTIVES)     */}
            {/* ============================================================== */}
            {currentSection === 'executives' && (
              <div className="space-y-6">
                
                {/* Header Summary Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase">
                        <Users className="w-4 h-4 text-blue-900" />
                        <span>Executive Council Directory</span>
                      </div>
                      <h2 className="font-display-academic text-2xl font-bold text-slate-900 mt-1">
                        Executive Settings (19 Positions)
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Set names, official positions, academic levels, and upload portrait pictures for each of the 19 executives.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="bg-blue-50 border border-blue-200 text-blue-950 px-3 py-1.5 rounded-lg text-xs font-mono">
                        <span className="font-bold">{configuredExecsCount}</span> of {executives.length} with Names · <span className="font-bold">{execsWithPhotosCount}</span> Photos
                      </div>
                      <button
                        type="button"
                        onClick={handleAddNewExecutive}
                        className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Executive Position</span>
                      </button>
                    </div>
                  </div>

                  {/* Standard Positions Suggestion Datalist */}
                  <datalist id="standard-positions">
                    {STANDARD_EXECUTIVE_POSITIONS.map(pos => (
                      <option key={pos} value={pos} />
                    ))}
                  </datalist>

                  {/* Filter & Search Bar */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search positions (e.g. President, Vice President, Sports, Socials...)"
                        value={execFilter}
                        onChange={(e) => setExecFilter(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                      />
                    </div>
                    {execFilter && (
                      <button
                        onClick={() => setExecFilter('')}
                        className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Quick Jump Bar for 19 Executive Offices */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5 flex items-center justify-between">
                      <span>Quick Jump to Office (19):</span>
                      <span className="text-[10px] text-blue-900 font-semibold hidden sm:inline">Tap to jump directly to any office</span>
                    </div>
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 touch-pan-x">
                      {executives.map((e) => (
                        <a
                          key={e.id}
                          href={`#exec-${e.id}`}
                          className="shrink-0 px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 text-[11px] font-mono font-medium text-slate-700 hover:text-blue-900 border border-slate-200 transition-colors"
                        >
                          #{e.order} {e.position.replace('Assistant ', 'Asst. ')}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 19 Executives Form Cards */}
                <div className="space-y-4">
                  {filteredExecutives.map((exec) => {
                    const changes = execEditData[exec.id] || {};
                    const currentName = changes.name !== undefined ? changes.name : exec.name;
                    const currentPosition = changes.position !== undefined ? changes.position : exec.position;
                    const currentLevel = changes.level !== undefined ? changes.level : exec.level;
                    const currentPhoto = changes.photoUrl !== undefined ? changes.photoUrl : exec.photoUrl;
                    const currentPortfolio = changes.portfolio !== undefined ? changes.portfolio : exec.portfolio;
                    const currentEmail = changes.email !== undefined ? changes.email : exec.email;
                    const currentPhone = changes.phone !== undefined ? changes.phone : (exec.phone || '');

                    const hasChanges = Object.keys(changes).length > 0;

                    return (
                      <div 
                        key={exec.id} 
                        id={`exec-${exec.id}`}
                        className={`bg-white rounded-xl border p-4 sm:p-6 shadow-sm transition-all scroll-mt-24 ${
                          hasChanges ? 'border-amber-400 ring-2 ring-amber-100' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Mobile Quick Card Header with Save action if changed */}
                        <div className="flex sm:hidden items-center justify-between border-b border-slate-100 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="bg-[#0c2340] text-amber-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                              #{exec.order}
                            </span>
                            <span className="font-bold text-xs text-slate-900 truncate max-w-[170px]">
                              {currentPosition}
                            </span>
                          </div>
                          {hasChanges && (
                            <button
                              type="button"
                              onClick={() => handleSaveExecutive(exec)}
                              className="px-2.5 py-1 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm"
                            >
                              <Save className="w-3 h-3" />
                              <span>Save</span>
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                          
                          {/* Col 1: Photo & Image Upload (3 cols) */}
                          <div className="md:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
                            <div className="relative group w-32 h-36 sm:w-36 sm:h-44 rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-50 shadow-inner flex items-center justify-center">
                              {currentPhoto ? (
                                <img
                                  src={currentPhoto}
                                  alt={currentName || currentPosition}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="p-3 text-center flex flex-col items-center justify-center text-slate-400">
                                  <ImageIcon className="w-8 h-8 mb-1 text-slate-300" />
                                  <span className="text-[10px] font-semibold text-slate-500">No Photo</span>
                                  <span className="text-[9px] text-slate-400">Click upload below</span>
                                </div>
                              )}
                              
                              <div className="absolute top-1 left-1 bg-[#0c2340] text-amber-300 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">
                                #{exec.order}
                              </div>
                            </div>

                            {/* Picture Upload Buttons */}
                            <div className="w-full space-y-1.5">
                              <label 
                                htmlFor={`upload-${exec.id}`}
                                className="w-full cursor-pointer py-1.5 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                              >
                                <Upload className="w-3.5 h-3.5 text-blue-700" />
                                <span>Upload Picture</span>
                              </label>
                              <input
                                id={`upload-${exec.id}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handlePhotoFileUpload(exec.id, file);
                                }}
                              />

                              {currentPhoto && (
                                <button
                                  type="button"
                                  onClick={() => handleExecFieldChange(exec.id, 'photoUrl', '')}
                                  className="w-full py-1 text-[11px] text-red-600 hover:text-red-800 transition-colors"
                                >
                                  Remove Photo
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Col 2: Executive Details Form (9 cols) */}
                          <div className="md:col-span-9 space-y-3.5">
                            
                            {/* Position & Level Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                              <div className="sm:col-span-8">
                                <div className="flex items-center justify-between mb-1">
                                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                    <span>Position Held / Office Title:</span>
                                    <span className="text-[10px] text-amber-600 font-semibold">(Editable by Admin)</span>
                                  </label>
                                  {currentPosition !== exec.position && (
                                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded border border-amber-200">
                                      Changed from "{exec.position}"
                                    </span>
                                  )}
                                </div>
                                <div className="relative">
                                  <input
                                    type="text"
                                    list="standard-positions"
                                    value={currentPosition}
                                    onChange={(e) => handleExecFieldChange(exec.id, 'position', e.target.value)}
                                    className="w-full p-2.5 rounded-lg border-2 border-blue-900/30 focus:border-blue-900 font-bold text-sm text-slate-900 bg-white focus:outline-none transition-colors"
                                    placeholder="e.g. President, Vice President, Sports Director..."
                                  />
                                </div>
                                <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                                  <span>Type custom office title or choose from suggested positions</span>
                                  {hasChanges && (
                                    <span className="text-amber-600 font-semibold font-mono">Unsaved changes</span>
                                  )}
                                </div>
                              </div>

                              <div className="sm:col-span-4">
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                                  Academic Level:
                                </label>
                                <select
                                  value={currentLevel}
                                  onChange={(e) => handleExecFieldChange(exec.id, 'level', e.target.value as AcademicLevel)}
                                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:border-blue-900 focus:outline-none"
                                >
                                  <option value="100L">100L</option>
                                  <option value="200L">200L</option>
                                  <option value="300L">300L</option>
                                  <option value="400L">400L</option>
                                  <option value="Postgraduate">Postgraduate</option>
                                </select>
                              </div>
                            </div>

                            {/* Executive Name */}
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                                Executive Full Name:
                              </label>
                              <input
                                type="text"
                                value={currentName}
                                onChange={(e) => handleExecFieldChange(exec.id, 'name', e.target.value)}
                                placeholder={`Enter full name for ${currentPosition} (e.g. Comr. Full Name)`}
                                className="w-full p-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:ring-1 focus:ring-blue-900 focus:outline-none"
                              />
                            </div>

                            {/* Portfolio / Role Responsibilities */}
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                                Portfolio / Role Description:
                              </label>
                              <input
                                type="text"
                                value={currentPortfolio}
                                onChange={(e) => handleExecFieldChange(exec.id, 'portfolio', e.target.value)}
                                placeholder="e.g. Secretariat & Official Correspondence"
                                className="w-full p-2 rounded-lg border border-slate-300 text-xs text-slate-700 bg-white"
                              />
                            </div>

                            {/* Contact Email & Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                                  Official Email:
                                </label>
                                <input
                                  type="email"
                                  value={currentEmail}
                                  onChange={(e) => handleExecFieldChange(exec.id, 'email', e.target.value)}
                                  placeholder="office@udusok.edu.ng"
                                  className="w-full p-2 rounded-lg border border-slate-300 text-xs text-slate-700 font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                                  Contact Phone (Optional):
                                </label>
                                <input
                                  type="text"
                                  value={currentPhone}
                                  onChange={(e) => handleExecFieldChange(exec.id, 'phone', e.target.value)}
                                  placeholder="+234 800 000 0000"
                                  className="w-full p-2 rounded-lg border border-slate-300 text-xs text-slate-700 font-mono"
                                />
                              </div>
                            </div>

                            {/* Image URL Alternative Input */}
                            <div>
                              <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                                Image URL (Optional Web link alternative):
                              </label>
                              <input
                                type="url"
                                value={currentPhoto}
                                onChange={(e) => handleExecFieldChange(exec.id, 'photoUrl', e.target.value)}
                                placeholder="https://... or upload above"
                                className="w-full p-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-600 font-mono"
                              />
                            </div>

                            {/* Save Button & Actions */}
                            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">
                                  {currentName ? (
                                    <span className="text-emerald-700 font-medium">✓ Name: {currentName}</span>
                                  ) : (
                                    <span className="text-amber-700 font-medium">⚠ Awaiting name assignment</span>
                                  )}
                                </span>
                                {hasChanges && (
                                  <span className="bg-amber-100 text-amber-900 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                                    Changes ready to save
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {exec.order > 19 && (
                                  <button
                                    type="button"
                                    onClick={() => deleteExecutive(exec.id)}
                                    className="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete Slot</span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleSaveExecutive(exec)}
                                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                                    hasChanges 
                                      ? 'bg-amber-500 hover:bg-amber-600 text-white ring-2 ring-amber-300' 
                                      : 'bg-blue-900 hover:bg-blue-800 text-white'
                                  }`}
                                >
                                  <Save className="w-3.5 h-3.5" />
                                  <span>Save Position & Details (#{exec.order})</span>
                                </button>
                              </div>
                            </div>

                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* ============================================================== */}
            {/* SECTION: OVERVIEW                                              */}
            {/* ============================================================== */}
            {currentSection === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-xs text-slate-500 font-medium">Executive Council</div>
                    <div className="font-display-academic text-2xl font-bold text-slate-900 mt-1">
                      {executives.length} Positions
                    </div>
                    <div className="text-[11px] text-emerald-700 mt-1 font-medium">
                      ✓ {configuredExecsCount} of 19 configured
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-xs text-slate-500 font-medium">Library Resources</div>
                    <div className="font-display-academic text-2xl font-bold text-blue-900 mt-1">
                      {resources.length} Files
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Google Drive indexed</div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-xs text-slate-500 font-medium">Events &amp; Tutorials</div>
                    <div className="font-display-academic text-2xl font-bold text-emerald-800 mt-1">
                      {events.length} Active
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">CATC timetable</div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-xs text-slate-500 font-medium">Student Voice Tickets</div>
                    <div className="font-display-academic text-2xl font-bold text-amber-600 mt-1">
                      {feedbackList.length}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Ombudsman inbox</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-display-academic text-lg font-bold text-slate-900 mb-3">
                    Recent Administrative Audit Trail
                  </h3>
                  <div className="divide-y divide-slate-100 text-xs">
                    {auditLogs.slice(0, 8).map((log) => (
                      <div key={log.id} className="py-2.5 flex items-center justify-between">
                        <div>
                          <span className="font-mono font-bold text-blue-900">{log.action}</span>
                          <span className="text-slate-600 ml-2">{log.details}</span>
                        </div>
                        <span className="text-slate-400 font-mono text-[11px]">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* SECTION: RESOURCES MANAGEMENT                                  */}
            {/* ============================================================== */}
            {currentSection === 'resources' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-display-academic text-lg font-bold text-slate-900 mb-1">
                    Add New Course Resource to Digital Library
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Instantly publish handouts, lecture notes, or past questions accessible via Google Drive URL.
                  </p>

                  <form onSubmit={handleCreateResource} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Resource Title:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Clinical Biochemistry Lecture Notes & Diagnostic Biomarkers"
                        value={resTitle}
                        onChange={(e) => setResTitle(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Course Code:</label>
                        <input
                          type="text"
                          required
                          value={resCourseCode}
                          onChange={(e) => setResCourseCode(e.target.value)}
                          className="w-full p-2 rounded-lg border border-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Level:</label>
                        <select
                          value={resLevel}
                          onChange={(e) => setResLevel(e.target.value as AcademicLevel)}
                          className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                        >
                          <option value="100L">100L</option>
                          <option value="200L">200L</option>
                          <option value="300L">300L</option>
                          <option value="400L">400L</option>
                          <option value="General">General Reference</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Category:</label>
                        <select
                          value={resCategory}
                          onChange={(e) => setResCategory(e.target.value as ResourceCategory)}
                          className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                        >
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Google Drive Shareable Link:</label>
                      <input
                        type="url"
                        required
                        placeholder="https://drive.google.com/file/d/..."
                        value={resDriveUrl}
                        onChange={(e) => setResDriveUrl(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-blue-900"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-lg bg-blue-900 text-white font-semibold flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publish Resource to Library</span>
                    </button>
                  </form>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <h4 className="font-bold text-xs text-slate-800 mb-3">Published Resources ({resources.length})</h4>
                  <div className="space-y-2 text-xs">
                    {resources.map((r) => (
                      <div key={r.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{r.title}</div>
                          <div className="text-slate-500 mt-0.5">{r.courseCode} · {r.level} · {r.category} · {r.downloadsCount} downloads</div>
                        </div>
                        <button
                          onClick={() => deleteResource(r.id)}
                          className="text-red-600 hover:text-red-800 p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* SECTION: EVENTS & TUTORIALS                                    */}
            {/* ============================================================== */}
            {currentSection === 'events' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-display-academic text-lg font-bold text-slate-900 mb-3">
                    Schedule New Event or Tutorial Session
                  </h3>
                  <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Event Title:</label>
                      <input
                        type="text"
                        required
                        value={evtTitle}
                        onChange={(e) => setEvtTitle(e.target.value)}
                        placeholder="e.g. BCH 301 Kinetics Problem-Solving Workshop"
                        className="w-full p-2 rounded-lg border border-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Date:</label>
                        <input
                          type="date"
                          required
                          value={evtDate}
                          onChange={(e) => setEvtDate(e.target.value)}
                          className="w-full p-2 rounded-lg border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Time:</label>
                        <input
                          type="text"
                          value={evtStartTime}
                          onChange={(e) => setEvtStartTime(e.target.value)}
                          className="w-full p-2 rounded-lg border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Venue:</label>
                        <input
                          type="text"
                          required
                          value={evtVenue}
                          onChange={(e) => setEvtVenue(e.target.value)}
                          className="w-full p-2 rounded-lg border border-slate-300"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-900 text-white font-semibold"
                    >
                      Publish Event to Calendar
                    </button>
                  </form>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <h4 className="font-bold text-xs text-slate-800 mb-3">Scheduled Events ({events.length})</h4>
                  <div className="space-y-2 text-xs">
                    {events.map((e) => (
                      <div key={e.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{e.title}</div>
                          <div className="text-slate-500 mt-0.5">{e.date} · {e.venue} · {e.registeredCount} registered</div>
                        </div>
                        <button
                          onClick={() => deleteEvent(e.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* SECTION: ANNOUNCEMENTS                                         */}
            {/* ============================================================== */}
            {currentSection === 'announcements' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-display-academic text-lg font-bold text-slate-900 mb-3">
                    Draft &amp; Broadcast Announcement
                  </h3>
                  <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Title:</label>
                      <input
                        type="text"
                        required
                        value={annTitle}
                        onChange={(e) => setAnnTitle(e.target.value)}
                        placeholder="Announcement headline"
                        className="w-full p-2 rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Full Content:</label>
                      <textarea
                        rows={4}
                        required
                        value={annContent}
                        onChange={(e) => setAnnContent(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-900 text-white font-semibold"
                    >
                      Publish Announcement
                    </button>
                  </form>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2 text-xs">
                  {announcements.map((a) => (
                    <div key={a.id} className="p-3 border rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{a.title}</div>
                        <div className="text-slate-500 mt-0.5">{a.category} · {a.date}</div>
                      </div>
                      <button onClick={() => deleteAnnouncement(a.id)} className="text-red-600 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* SECTION: OPPORTUNITIES MANAGEMENT HUB (SCHOLARSHIPS & INTERNS) */}
            {/* ============================================================== */}
            {currentSection === 'opportunities' && (
              <div className="space-y-6">
                
                {/* Header Summary Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 uppercase">
                        <Briefcase className="w-4 h-4 text-blue-900" />
                        <span>Career & Funding Directorate</span>
                      </div>
                      <h2 className="font-display-academic text-2xl font-bold text-slate-900 mt-1">
                        Opportunities Hub Manager
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Publish and edit verified undergraduate scholarships (PTDF, Shell, NNPC), research grants, clinical internships, and competition calls.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="bg-blue-50 border border-blue-200 text-blue-950 px-3 py-1.5 rounded-lg text-xs font-mono">
                        <span className="font-bold">{opportunities.length}</span> Total Calls · <span className="font-bold">{opportunities.filter(o => o.published).length}</span> Published
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          handleCancelEditOpportunity();
                          const formEl = document.getElementById('opp-form-card');
                          if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Post New Opportunity</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Guide Banner */}
                  <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
                    <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <span className="font-bold">Admin Notice:</span> Every opportunity posted here appears on the public <span className="font-semibold text-blue-900">Opportunities Hub</span> with direct application URLs, description, eligibility criteria, and deadline countdowns.
                    </div>
                  </div>
                </div>

                {/* Form Card: Create / Edit Opportunity */}
                <div id="opp-form-card" className={`bg-white rounded-xl border p-6 shadow-sm space-y-4 transition-all ${
                  editingOppId ? 'border-amber-400 ring-2 ring-amber-100' : 'border-slate-200'
                }`}>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      {editingOppId ? (
                        <div className="p-1 bg-amber-100 text-amber-900 rounded-md">
                          <Edit3 className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="p-1 bg-blue-100 text-blue-900 rounded-md">
                          <Plus className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-display-academic text-base font-bold text-slate-900">
                          {editingOppId ? 'Edit Opportunity Call' : 'Post New Opportunity'}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          {editingOppId ? 'Modify the description, application URL, deadline, and eligibility criteria below.' : 'Add a verified opportunity for biochemistry students.'}
                        </p>
                      </div>
                    </div>

                    {editingOppId && (
                      <button
                        type="button"
                        onClick={handleCancelEditOpportunity}
                        className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                      >
                        Cancel Editing
                      </button>
                    )}
                  </div>

                  {/* Opportunity Edit Form */}
                  <form onSubmit={handleSaveOpportunity} className="space-y-4 text-xs">
                    
                    {/* Row 1: Title & Organization */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-7">
                        <label className="block font-bold text-slate-700 mb-1">
                          Opportunity Title: <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={oppTitle}
                          onChange={(e) => setOppTitle(e.target.value)}
                          placeholder="e.g. PTDF National Undergraduate Scholarship Scheme"
                          className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold text-sm text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                        />
                      </div>

                      <div className="sm:col-span-5">
                        <label className="block font-bold text-slate-700 mb-1">
                          Organization / Sponsor:
                        </label>
                        <input
                          type="text"
                          value={oppOrg}
                          onChange={(e) => setOppOrg(e.target.value)}
                          placeholder="e.g. Petroleum Technology Development Fund"
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                        />
                      </div>
                    </div>

                    {/* Row 2: Type, Deadline, Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-4">
                        <label className="block font-bold text-slate-700 mb-1">
                          Opportunity Category:
                        </label>
                        <select
                          value={oppType}
                          onChange={(e) => setOppType(e.target.value as OpportunityType)}
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                        >
                          <option value="Scholarship">Scholarship</option>
                          <option value="Fellowship">Fellowship</option>
                          <option value="Internship">Internship</option>
                          <option value="Research">Research Grant</option>
                          <option value="Conference">Conference</option>
                          <option value="Competition">Competition</option>
                          <option value="Training">Training & Workshop</option>
                          <option value="Grant">Travel / Project Grant</option>
                        </select>
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block font-bold text-slate-700 mb-1">
                          Application Deadline:
                        </label>
                        <input
                          type="date"
                          required
                          value={oppDeadline}
                          onChange={(e) => setOppDeadline(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block font-bold text-slate-700 mb-1">
                          Location / Scope:
                        </label>
                        <input
                          type="text"
                          value={oppLocation}
                          onChange={(e) => setOppLocation(e.target.value)}
                          placeholder="e.g. Nigeria (National), Sokoto, Virtual"
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                        />
                      </div>
                    </div>

                    {/* Row 3: Application URL (Critical requirement) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-bold text-slate-700 flex items-center gap-1.5">
                          <span>Official Application URL:</span>
                          <span className="text-red-500">*</span>
                        </label>
                        {oppUrl && (
                          <a
                            href={oppUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-blue-900 font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>Test link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="url"
                          required
                          value={oppUrl}
                          onChange={(e) => setOppUrl(e.target.value)}
                          placeholder="https://scholarship.ptdf.gov.ng or application portal link"
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-mono text-blue-950 bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                        />
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        Students clicking "Official Application" will be directed to this destination URL.
                      </div>
                    </div>

                    {/* Row 4: Description (Critical requirement) */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Opportunity Description & Coverage: <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={oppDesc}
                        onChange={(e) => setOppDesc(e.target.value)}
                        placeholder="Detail the scholarship benefits (e.g. tuition fees, monthly stipends, accommodation support, laptop grant, or research laboratory access)..."
                        className="w-full p-2.5 rounded-lg border border-slate-300 text-xs leading-relaxed text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                      />
                    </div>

                    {/* Row 5: Eligibility Criteria */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Eligibility Criteria & Requirements:
                      </label>
                      <textarea
                        rows={2}
                        value={oppEligibility}
                        onChange={(e) => setOppEligibility(e.target.value)}
                        placeholder="e.g. Must be a full-time 200L or 300L Biochemistry student with minimum CGPA of 3.50, state indigeneship certificate, and valid student ID card."
                        className="w-full p-2.5 rounded-lg border border-slate-300 text-xs leading-relaxed text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                      />
                    </div>

                    {/* Row 6: Tags & Visibility */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-6">
                        <label className="block font-bold text-slate-700 mb-1">
                          Tags / Keywords (comma separated):
                        </label>
                        <input
                          type="text"
                          value={oppTags}
                          onChange={(e) => setOppTags(e.target.value)}
                          placeholder="e.g. Federal, Tuition, 300L, Research"
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                        />
                      </div>

                      <div className="sm:col-span-6 flex items-center gap-6 pt-2 sm:pt-4">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={oppPublished}
                            onChange={(e) => setOppPublished(e.target.checked)}
                            className="w-4 h-4 text-blue-900 rounded border-slate-300"
                          />
                          <span className="font-semibold text-slate-800">Published & Live</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={oppFeatured}
                            onChange={(e) => setOppFeatured(e.target.checked)}
                            className="w-4 h-4 text-blue-900 rounded border-slate-300"
                          />
                          <span className="font-semibold text-slate-800">Featured Highlight</span>
                        </label>
                      </div>
                    </div>

                    {/* Form Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-[11px] text-slate-500">
                        {editingOppId ? (
                          <span className="text-amber-700 font-semibold">Editing active call #{editingOppId}</span>
                        ) : (
                          <span>Publishing will immediately reflect on the Opportunities page</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {editingOppId && (
                          <button
                            type="button"
                            onClick={handleCancelEditOpportunity}
                            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                          >
                            Cancel
                          </button>
                        )}

                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
                        >
                          <Save className="w-4 h-4" />
                          <span>{editingOppId ? 'Update Opportunity' : 'Publish Opportunity'}</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Directory of Existing Opportunities */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-display-academic text-lg font-bold text-slate-900">
                        Current Opportunities Directory ({opportunities.length})
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Manage active and past calls. Click "Edit" on any opportunity to update its description or link.
                      </p>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search calls..."
                          value={oppFilterQuery}
                          onChange={(e) => setOppFilterQuery(e.target.value)}
                          className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900 w-44"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Opportunities Cards Grid */}
                  <div className="space-y-3.5">
                    {opportunities
                      .filter(opp => {
                        const q = oppFilterQuery.toLowerCase();
                        return (
                          opp.title.toLowerCase().includes(q) ||
                          opp.organization.toLowerCase().includes(q) ||
                          opp.description.toLowerCase().includes(q)
                        );
                      })
                      .map((opp) => (
                        <div
                          key={opp.id}
                          className={`p-4 rounded-xl border transition-all ${
                            editingOppId === opp.id
                              ? 'border-amber-400 bg-amber-50/20 ring-1 ring-amber-200'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="space-y-1.5 flex-1">
                              <div className="flex flex-wrap items-center gap-2 text-xs">
                                <span className="bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded text-[10px]">
                                  {opp.type}
                                </span>
                                <span className="text-slate-500 font-medium text-[11px]">
                                  {opp.organization} · {opp.location}
                                </span>
                                <span className="font-mono text-[10px] text-slate-400">
                                  Deadline: {opp.deadline}
                                </span>
                                {opp.featured && (
                                  <span className="bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded text-[10px] flex items-center gap-0.5">
                                    <Sparkles className="w-2.5 h-2.5" />
                                    <span>Featured</span>
                                  </span>
                                )}
                                {!opp.published && (
                                  <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px]">
                                    Draft (Hidden)
                                  </span>
                                )}
                              </div>

                              <h4 className="font-display-academic font-bold text-base text-slate-900">
                                {opp.title}
                              </h4>

                              {/* Description Preview */}
                              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                                {opp.description}
                              </p>

                              {/* Eligibility Criteria Box */}
                              {opp.eligibility && (
                                <div className="text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-100 text-slate-700">
                                  <span className="font-semibold text-slate-900">Eligibility: </span>
                                  <span>{opp.eligibility}</span>
                                </div>
                              )}

                              {/* Application URL & Tags */}
                              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                                <a
                                  href={opp.applicationUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-900 font-semibold hover:underline flex items-center gap-1 font-mono text-[11px]"
                                >
                                  <span>{opp.applicationUrl}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>

                                {opp.tags && opp.tags.length > 0 && (
                                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                    {opp.tags.map(t => (
                                      <span key={t} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                        #{t}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex sm:flex-col items-center gap-1.5 shrink-0 self-end sm:self-start pt-2 sm:pt-0">
                              <button
                                type="button"
                                onClick={() => handleStartEditOpportunity(opp)}
                                className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs flex items-center gap-1.5 border border-amber-200 transition-colors"
                                title="Edit this opportunity"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-amber-800" />
                                <span>Edit</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  updateOpportunity(opp.id, { published: !opp.published });
                                  showToast(`Opportunity ${opp.published ? 'hidden' : 'published'}.`);
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 transition-colors"
                                title={opp.published ? 'Hide from students' : 'Make live'}
                              >
                                {opp.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                <span className="hidden sm:inline">{opp.published ? 'Hide' : 'Show'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`Delete opportunity "${opp.title}"?`)) {
                                    deleteOpportunity(opp.id);
                                    showToast('Opportunity removed.');
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs flex items-center gap-1 transition-colors"
                                title="Delete opportunity"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            )}

            {/* ============================================================== */}
            {/* SECTION: AI LAB & AGENTS CONFIGURATION                         */}
            {/* ============================================================== */}
            {currentSection === 'ailab' && (
              <div className="space-y-6">
                {/* Header & Controls */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 font-mono text-[11px] font-bold mb-1">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>AI LEARNING AGENTS CMS</span>
                    </div>
                    <h3 className="font-display-academic text-xl font-bold text-slate-900">
                      NSBS AI Agents &amp; Learning Models Manager
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Add, customize, toggle active status, or remove specialized external AI models (Google Gemini Custom Gems, OpenAI Custom GPTs, Anthropic Claude Projects, DeepSeek, and custom models).
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isAddingAgent && !editingAgentId && (
                      <button
                        type="button"
                        onClick={handleOpenAddAgent}
                        className="px-4 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New AI Agent</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* ADD / EDIT AI AGENT FORM MODAL / PANEL */}
                {(isAddingAgent || editingAgentId) && (
                  <div className="bg-white rounded-xl border-2 border-blue-900/30 p-6 shadow-md space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-blue-900" />
                        <h4 className="font-display-academic text-base font-bold text-slate-900">
                          {editingAgentId ? 'Edit AI Learning Agent' : 'Create New AI Learning Agent'}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingAgent(false);
                          setEditingAgentId(null);
                        }}
                        className="text-xs text-slate-400 hover:text-slate-700 font-semibold"
                      >
                        ✕ Close Form
                      </button>
                    </div>

                    <form onSubmit={handleSaveAIAgent} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Agent Name */}
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Agent / Model Name: *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. NSBS Molecular Biology Tutor"
                            value={agentNameInput}
                            onChange={(e) => setAgentNameInput(e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold text-slate-900 focus:ring-2 focus:ring-blue-900 outline-none"
                          />
                        </div>

                        {/* AI Provider Type */}
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Model Ecosystem / Provider: *
                          </label>
                          <select
                            value={agentProviderInput}
                            onChange={(e) => {
                              const val = e.target.value as any;
                              setAgentProviderInput(val);
                              if (val === 'gemini') {
                                setAgentProviderLabelInput('Google Gemini Custom Gem');
                                if (!agentUrlInput || agentUrlInput.includes('chatgpt') || agentUrlInput.includes('claude')) {
                                  setAgentUrlInput('https://gemini.google.com/gems/');
                                }
                              } else if (val === 'openai') {
                                setAgentProviderLabelInput('OpenAI Custom GPT');
                                if (!agentUrlInput || agentUrlInput.includes('gemini') || agentUrlInput.includes('claude')) {
                                  setAgentUrlInput('https://chatgpt.com/g/');
                                }
                              } else if (val === 'claude') {
                                setAgentProviderLabelInput('Anthropic Claude Interactive Tutor');
                                if (!agentUrlInput || agentUrlInput.includes('gemini') || agentUrlInput.includes('chatgpt')) {
                                  setAgentUrlInput('https://claude.ai/project/');
                                }
                              } else if (val === 'deepseek') {
                                setAgentProviderLabelInput('DeepSeek Biochemical Assistant');
                                setAgentUrlInput('https://chat.deepseek.com');
                              } else {
                                setAgentProviderLabelInput('Custom Biochemical LLM');
                              }
                            }}
                            className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-blue-900 outline-none"
                          >
                            <option value="gemini">Google Gemini (Custom Gem)</option>
                            <option value="openai">OpenAI ChatGPT (Custom GPT)</option>
                            <option value="claude">Anthropic Claude (Custom Project/Artifact)</option>
                            <option value="deepseek">DeepSeek AI Assistant</option>
                            <option value="custom">Custom Web Endpoint / Other LLM</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Custom Provider Label */}
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Display Badge Label:
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Google Gemini Custom Gem"
                            value={agentProviderLabelInput}
                            onChange={(e) => setAgentProviderLabelInput(e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900 outline-none"
                          />
                        </div>

                        {/* Destination Launch URL */}
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Destination Launch URL: *
                          </label>
                          <input
                            type="url"
                            required
                            placeholder="https://..."
                            value={agentUrlInput}
                            onChange={(e) => setAgentUrlInput(e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs text-blue-900 focus:ring-2 focus:ring-blue-900 outline-none"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Academic Purpose &amp; Context:
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Explain what the AI agent specializes in (e.g., metabolic regulation, kinetics derivation, lab protocols)..."
                          value={agentDescriptionInput}
                          onChange={(e) => setAgentDescriptionInput(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 outline-none"
                        />
                      </div>

                      {/* Capabilities */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Core Capabilities (Comma-separated features):
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Biochemical pathway resolution, Enzyme kinetics problem solver, CA revision"
                          value={agentCapabilitiesInput}
                          onChange={(e) => setAgentCapabilitiesInput(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 outline-none"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">
                          Each item separated by a comma will appear as a bullet point on the card.
                        </p>
                      </div>

                      {/* Active Status Toggle */}
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <input
                          type="checkbox"
                          id="agentActiveToggle"
                          checked={agentActiveInput}
                          onChange={(e) => setAgentActiveInput(e.target.checked)}
                          className="w-4 h-4 text-blue-900 rounded border-slate-300"
                        />
                        <label htmlFor="agentActiveToggle" className="font-semibold text-slate-800 cursor-pointer select-none">
                          Active &amp; Visible to Students on Public AI Lab and Homepage
                        </label>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingAgent(false);
                            setEditingAgentId(null);
                          }}
                          className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold flex items-center gap-1.5 shadow-sm"
                        >
                          <Save className="w-4 h-4" />
                          <span>{editingAgentId ? 'Save Agent Changes' : 'Create & Activate Agent'}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* DIRECTORY OF CONFIGURED AI AGENTS */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="font-display-academic text-base font-bold text-slate-900">
                        Configured AI Agents Directory ({(siteSettings.aiIntegrations?.agents || []).length})
                      </h4>
                      <p className="text-xs text-slate-500">
                        Manage active and deactivated AI models. Students will only see active integrations.
                      </p>
                    </div>

                    <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                      {(siteSettings.aiIntegrations?.agents || []).filter(a => a.active).length} Active Online
                    </span>
                  </div>

                  {(!siteSettings.aiIntegrations?.agents || siteSettings.aiIntegrations.agents.length === 0) ? (
                    <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-6 space-y-3">
                      <Bot className="w-10 h-10 text-slate-400 mx-auto" />
                      <p className="text-sm font-semibold text-slate-700">No AI Agents Added Yet</p>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Add a specialized Gemini Custom Gem, OpenAI Custom GPT, or Claude Project to provide AI learning assistance to biochemistry students.
                      </p>
                      <button
                        type="button"
                        onClick={handleOpenAddAgent}
                        className="px-4 py-2 rounded-lg bg-blue-900 text-white font-bold text-xs"
                      >
                        + Add First AI Agent
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {siteSettings.aiIntegrations.agents.map((agent) => {
                        const isGemini = agent.provider === 'gemini';
                        const isOpenAI = agent.provider === 'openai';
                        const isClaude = agent.provider === 'claude';
                        const isDeepSeek = agent.provider === 'deepseek';

                        const badgeColor = isGemini 
                          ? 'bg-blue-100 text-blue-900 border-blue-200' 
                          : isOpenAI 
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-200' 
                          : isClaude 
                          ? 'bg-purple-100 text-purple-900 border-purple-200' 
                          : isDeepSeek 
                          ? 'bg-cyan-100 text-cyan-900 border-cyan-200' 
                          : 'bg-indigo-100 text-indigo-900 border-indigo-200';

                        return (
                          <div
                            key={agent.id}
                            className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                              agent.active 
                                ? 'bg-white border-slate-200 shadow-sm hover:border-blue-300' 
                                : 'bg-slate-50 border-slate-200 opacity-60'
                            }`}
                          >
                            <div className="space-y-3">
                              {/* Provider & Active toggle */}
                              <div className="flex items-center justify-between gap-2">
                                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                                  {agent.providerLabel || agent.provider.toUpperCase()}
                                </span>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      toggleAIAgentActive(agent.id);
                                      showToast(`Agent "${agent.name}" ${agent.active ? 'deactivated' : 'activated'}.`);
                                    }}
                                    className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded transition-colors ${
                                      agent.active 
                                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                    }`}
                                  >
                                    {agent.active ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-slate-500" />}
                                    <span>{agent.active ? 'Active' : 'Inactive'}</span>
                                  </button>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-display-academic text-base font-bold text-slate-900">
                                  {agent.name}
                                </h4>
                                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                                  {agent.description}
                                </p>
                              </div>

                              {/* Capabilities tags */}
                              {agent.capabilities && agent.capabilities.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {agent.capabilities.map((cap, i) => (
                                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                                      ✓ {cap}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Destination URL */}
                              <div className="p-2 rounded bg-slate-50 border border-slate-100 font-mono text-[11px] text-blue-900 truncate">
                                {agent.url}
                              </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                              <a
                                href={agent.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-900 hover:underline font-semibold flex items-center gap-1 text-[11px]"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Test Launch</span>
                              </a>

                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleStartEditAgent(agent)}
                                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1 text-[11px] transition-colors"
                                >
                                  <Edit3 className="w-3 h-3 text-slate-600" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteAgent(agent.id, agent.name)}
                                  className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 font-semibold flex items-center gap-1 text-[11px] transition-colors"
                                  title="Delete AI Agent"
                                >
                                  <Trash2 className="w-3 h-3 text-red-600" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* SECTION: STUDENT VOICE / OMBUDSMAN                             */}
            {/* ============================================================== */}
            {currentSection === 'feedback' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-display-academic text-lg font-bold text-slate-900">
                      Student Voice / Feedback Inbox
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage course concerns, suggestions, and welfare requests submitted by students.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-900">{feedbackList.length} Tickets</span>
                </div>

                <div className="space-y-3">
                  {feedbackList.map((fb) => (
                    <div key={fb.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-blue-900">{fb.category}</span>
                          <span className="text-slate-400">·</span>
                          <span className="font-medium text-slate-700">{fb.name || 'Anonymous'}</span>
                        </div>
                        <select
                          value={fb.status}
                          onChange={(e) => updateFeedbackStatus(fb.id, e.target.value as any)}
                          className="p-1 rounded border border-slate-300 text-[11px] bg-white"
                        >
                          <option value="New">New</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>

                      <div className="font-bold text-slate-900 text-sm">{fb.subject}</div>
                      <p className="text-slate-600 leading-relaxed font-serif-academic text-sm">{fb.message}</p>
                      <div className="text-[10px] text-slate-400">{fb.submittedAt}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* SECTION: CERTIFICATE ISSUER                                    */}
            {/* ============================================================== */}
            {currentSection === 'certificates' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-display-academic text-lg font-bold text-slate-900">Certificate studio &amp; issuance</h3>
                    <p className="text-xs text-slate-500 mt-1">Create, live-preview, issue, revise, and download genuine landscape PDF certificates. Student details are copied into the credential at issue time.</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-900">{certificates.length} issued</span>
                </div>

                <form onSubmit={handleIssueCertSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                  <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5 text-xs">
                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="font-bold text-slate-900">{editingCertificateId ? 'Edit issued certificate' : 'New certificate'}</h4>
                        <p className="mt-1 text-[11px] text-slate-500">Fields below update the live preview.</p>
                      </div>
                      {editingCertificateId && <button type="button" onClick={() => setEditingCertificateId(null)} className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-600 hover:bg-slate-50">New certificate</button>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Link to a registered student (recommended)</label>
                        <select value={certStudentId} onChange={event => { const student = registeredStudents.find(item => item.id === event.target.value); setCertStudentId(event.target.value); if (student) setCertStudentName(student.fullName); }} className="w-full p-2.5 rounded-lg border border-slate-300 bg-white">
                          <option value="">Manual recipient / not in student list</option>
                          {registeredStudents.map(student => <option key={student.id} value={student.id}>{student.fullName} · {student.matricNumber}</option>)}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Name exactly as it should appear</label>
                        <input required value={certStudentName} onChange={event => setCertStudentName(event.target.value)} placeholder="Student full name" className="w-full p-2.5 rounded-lg border border-slate-300" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Programme / achievement awarded</label>
                        <input required value={certProgTitle} onChange={event => setCertProgTitle(event.target.value)} placeholder="e.g. Clinical Diagnostics Workshop" className="w-full p-2.5 rounded-lg border border-slate-300" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Certificate heading</label>
                        <input required value={certTitle} onChange={event => setCertTitle(event.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Category</label>
                        <input value={certCategory} onChange={event => setCertCategory(event.target.value)} placeholder="Workshop, award, etc." className="w-full p-2.5 rounded-lg border border-slate-300" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">Presentation statement</label>
                        <input value={certStatement} onChange={event => setCertStatement(event.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Issuing organization</label>
                        <input value={certOrganization} onChange={event => setCertOrganization(event.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">University / institution</label>
                        <input value={certUniversity} onChange={event => setCertUniversity(event.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Signatory name</label>
                        <input required value={certIssuerName} onChange={event => setCertIssuerName(event.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Signatory title / role</label>
                        <input required value={certIssuerRole} onChange={event => setCertIssuerRole(event.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Issue date</label>
                        <input type="date" required value={certDate} onChange={event => setCertDate(event.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-lg border border-slate-200 p-3">
                        <div className="text-xs font-semibold text-slate-800">Organization logo</div>
                        <p className="mt-1 text-[10px] text-slate-500">Uploaded image is embedded in the saved certificate and PDF.</p>
                        <div className="flex items-center gap-2 mt-2">
                          <label className="cursor-pointer rounded-lg bg-slate-100 px-3 py-2 text-[11px] font-semibold hover:bg-slate-200">{certLogo ? 'Replace logo' : 'Upload logo'}<input type="file" accept="image/*" className="sr-only" onChange={event => { void handleCertificateImage(event.target.files?.[0], 'logo'); event.currentTarget.value = ''; }} /></label>
                          {certLogo && <button type="button" onClick={() => setCertLogo(undefined)} className="text-[11px] font-semibold text-red-700 hover:underline">Remove</button>}
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 p-3">
                        <div className="text-xs font-semibold text-slate-800">Signature image</div>
                        <p className="mt-1 text-[10px] text-slate-500">A handwritten signature scan or image. The signatory name remains editable.</p>
                        <div className="flex items-center gap-2 mt-2">
                          <label className="cursor-pointer rounded-lg bg-slate-100 px-3 py-2 text-[11px] font-semibold hover:bg-slate-200">{certSignature ? 'Replace signature' : 'Upload signature'}<input type="file" accept="image/*" className="sr-only" onChange={event => { void handleCertificateImage(event.target.files?.[0], 'signature'); event.currentTarget.value = ''; }} /></label>
                          {certSignature && <button type="button" onClick={() => setCertSignature(undefined)} className="text-[11px] font-semibold text-red-700 hover:underline">Remove</button>}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                      <button type="submit" className="rounded-lg bg-blue-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-800">
                        {editingCertificateId ? 'Save certificate edits' : 'Issue certificate'}
                      </button>
                      {!editingCertificateId && <span className="text-[10px] text-slate-500">Unique certificate ID is assigned automatically.</span>}
                    </div>
                  </div>

                  <div className="space-y-3 xl:sticky xl:top-24">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">Live certificate preview</h4>
                      <span className="text-[10px] text-slate-500">Landscape A4</span>
                    </div>
                    <CertificateArtwork preview certificate={{
                      studentId: certStudentId,
                      studentName: certStudentName,
                      programmeTitle: certProgTitle,
                      category: certCategory,
                      issueDate: certDate,
                      issuerName: certIssuerName,
                      issuerRole: certIssuerRole,
                      verificationUrl: editingCertificateId ? certificates.find(cert => cert.id === editingCertificateId)?.verificationUrl || '' : 'Assigned on issue',
                      certificateCode: editingCertificateId ? certificates.find(cert => cert.id === editingCertificateId)?.certificateCode || 'NSBS-UDUS-PREVIEW' : 'Assigned on issue',
                      certificateTitle: certTitle,
                      completionStatement: certStatement,
                      organizationName: certOrganization,
                      universityName: certUniversity,
                      logoDataUrl: certLogo,
                      signatureDataUrl: certSignature
                    }} />
                    <p className="text-[10px] leading-relaxed text-slate-500">The downloaded PDF embeds this logo and signature and preserves the issued recipient name, award, date, and unique certificate ID.</p>
                  </div>
                </form>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <h4 className="font-display-academic font-bold text-slate-900">Issued certificates</h4>
                  {certificates.length === 0 ? <p className="mt-3 text-xs text-slate-500">No certificates have been issued yet.</p> : (
                    <div className="mt-3 divide-y divide-slate-100">
                      {certificates.map(certificate => (
                        <div key={certificate.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-slate-900">{certificate.studentName} · {certificate.programmeTitle}</div>
                            <div className="mt-1 text-[10px] text-slate-500 font-mono">{certificate.certificateCode} · {certificate.issueDate} · {certificate.category}</div>
                          </div>
                          <div className="flex shrink-0 gap-2">
                            <button type="button" onClick={() => handleEditCertificate(certificate)} className="rounded-lg border border-blue-200 px-3 py-1.5 text-[11px] font-semibold text-blue-900 hover:bg-blue-50">Edit &amp; preview</button>
                            <button type="button" onClick={() => downloadCertificatePdf(certificate)} className="rounded-lg bg-blue-900 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-blue-800">Download PDF</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* SECTION: AUDIT TRAIL                                           */}
            {/* ============================================================== */}
            {currentSection === 'audit' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-display-academic text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Institutional Continuity Audit Trail
                </h3>
                <div className="space-y-2 text-xs">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
                      <div>
                        <div className="font-mono font-bold text-blue-900">{log.action}</div>
                        <div className="text-slate-700 mt-0.5">{log.details}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">By {log.adminName}</div>
                      </div>
                      <span className="font-mono text-slate-400 text-[11px] shrink-0">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* SECTION: SETTINGS                                              */}
            {/* ============================================================== */}
            {currentSection === 'settings' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-900 text-white shadow-sm">
                      <Settings className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display-academic text-lg font-bold text-slate-900">
                        Official Institutional Settings &amp; Footer Links
                      </h3>
                      <p className="text-xs text-slate-500">
                        Modify official contact details, physical address, and original social media community links displayed on the website footer.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        updateSiteSettings({
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
                          }
                        });
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      title="Reset contact information to standard UDUS institutional defaults"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Defaults</span>
                    </button>
                    <button
                      onClick={() => showToast('All footer contact information and social media links are saved.', 'success')}
                      className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save All Changes</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Official Contact & Address (2 cols) */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Official Contact Info Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <Mail className="w-4 h-4 text-blue-900" />
                        <h4 className="font-display-academic text-sm font-bold text-slate-900 uppercase tracking-wide">
                          Official Departmental Contact Channels
                        </h4>
                      </div>

                      <div className="space-y-4 text-xs">
                        {/* Official Email */}
                        <div>
                          <label className="block font-semibold text-slate-800 mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-blue-700" />
                              <span>Official Departmental Inquiry Email:</span>
                            </span>
                            {siteSettings.officialEmail && (
                              <a 
                                href={`mailto:${siteSettings.officialEmail}`}
                                className="text-blue-900 hover:underline flex items-center gap-1 text-[11px] font-normal"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Test mailto</span>
                              </a>
                            )}
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. nsbs.udus@udusok.edu.ng"
                            value={siteSettings.officialEmail}
                            onChange={(e) => updateSiteSettings({ officialEmail: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                          <div className="mt-2 p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 flex items-start gap-2">
                            <Key className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                            <div className="text-[11px] leading-relaxed">
                              <span className="font-bold">Administrative Password Reset Mailbox: </span>
                              If an administrator forgets their login credentials, password reset verification tokens are dispatched to this NSBS email. Updating this address here immediately redirects future recovery tokens to the new inbox.
                            </div>
                          </div>
                        </div>

                        {/* Official Phone Number */}
                        <div>
                          <label className="block font-semibold text-slate-800 mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Official Department Helpline Phone Number:</span>
                            </span>
                            {siteSettings.officialPhone && (
                              <a 
                                href={`tel:${siteSettings.officialPhone}`}
                                className="text-emerald-700 hover:underline flex items-center gap-1 text-[11px] font-normal font-mono"
                              >
                                <Phone className="w-3 h-3" />
                                <span>Test Call</span>
                              </a>
                            )}
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. +234 814 290 8821"
                            value={siteSettings.officialPhone}
                            onChange={(e) => updateSiteSettings({ officialPhone: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                          <p className="text-[11px] text-slate-500 mt-1">
                            Official phone line displayed in footer and emergency contacts for biochemistry students.
                          </p>
                        </div>

                        {/* Physical Department Address */}
                        <div>
                          <label className="block font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-rose-600" />
                            <span>Physical Department Address:</span>
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Department of Biochemistry, Faculty of Chemical and Life Sciences, Usmanu Danfodiyo University, Sokoto..."
                            value={siteSettings.departmentAddress}
                            onChange={(e) => updateSiteSettings({ departmentAddress: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none leading-relaxed"
                          />
                        </div>

                        {/* Session Motto */}
                        <div>
                          <label className="block font-semibold text-slate-800 mb-1">
                            Official Administration Motto / Slogan:
                          </label>
                          <input
                            type="text"
                            placeholder="Advancing Biochemistry · Empowering Students · Building the Future"
                            value={siteSettings.motto}
                            onChange={(e) => updateSiteSettings({ motto: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none italic font-serif"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Social Media Communities Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <Globe className="w-4 h-4 text-emerald-700" />
                        <h4 className="font-display-academic text-sm font-bold text-slate-900 uppercase tracking-wide">
                          Official Social Media &amp; Digital Community Links
                        </h4>
                      </div>

                      <div className="space-y-3.5 text-xs">
                        {/* WhatsApp */}
                        <div>
                          <label className="block font-semibold text-slate-800 mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                              <span>WhatsApp Official Community Link:</span>
                            </span>
                            {siteSettings.socials.whatsapp && (
                              <a 
                                href={siteSettings.socials.whatsapp} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-emerald-700 hover:underline flex items-center gap-1 text-[11px]"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Open Link</span>
                              </a>
                            )}
                          </label>
                          <input
                            type="url"
                            placeholder="https://chat.whatsapp.com/..."
                            value={siteSettings.socials.whatsapp || ''}
                            onChange={(e) => updateSiteSettings({ socials: { ...siteSettings.socials, whatsapp: e.target.value } })}
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                        </div>

                        {/* LinkedIn */}
                        <div>
                          <label className="block font-semibold text-slate-800 mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                              <span>LinkedIn Organization Page URL:</span>
                            </span>
                            {siteSettings.socials.linkedin && (
                              <a 
                                href={siteSettings.socials.linkedin} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-blue-700 hover:underline flex items-center gap-1 text-[11px]"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Open Link</span>
                              </a>
                            )}
                          </label>
                          <input
                            type="url"
                            placeholder="https://linkedin.com/company/nsbs-udus"
                            value={siteSettings.socials.linkedin || ''}
                            onChange={(e) => updateSiteSettings({ socials: { ...siteSettings.socials, linkedin: e.target.value } })}
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                        </div>

                        {/* X / Twitter */}
                        <div>
                          <label className="block font-semibold text-slate-800 mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block" />
                              <span>X (formerly Twitter) Profile URL:</span>
                            </span>
                            {siteSettings.socials.twitter && (
                              <a 
                                href={siteSettings.socials.twitter} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-slate-800 hover:underline flex items-center gap-1 text-[11px]"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Open Link</span>
                              </a>
                            )}
                          </label>
                          <input
                            type="url"
                            placeholder="https://x.com/nsbs_udus"
                            value={siteSettings.socials.twitter || ''}
                            onChange={(e) => updateSiteSettings({ socials: { ...siteSettings.socials, twitter: e.target.value } })}
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                        </div>

                        {/* Instagram */}
                        <div>
                          <label className="block font-semibold text-slate-800 mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-pink-600 inline-block" />
                              <span>Instagram Profile / Handle URL:</span>
                            </span>
                            {siteSettings.socials.instagram && (
                              <a 
                                href={siteSettings.socials.instagram} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-pink-700 hover:underline flex items-center gap-1 text-[11px]"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Open Link</span>
                              </a>
                            )}
                          </label>
                          <input
                            type="url"
                            placeholder="https://instagram.com/nsbs_udus"
                            value={siteSettings.socials.instagram || ''}
                            onChange={(e) => updateSiteSettings({ socials: { ...siteSettings.socials, instagram: e.target.value } })}
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                        </div>

                        {/* Facebook */}
                        <div>
                          <label className="block font-semibold text-slate-800 mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-700 inline-block" />
                              <span>Facebook Page URL:</span>
                            </span>
                            {siteSettings.socials.facebook && (
                              <a 
                                href={siteSettings.socials.facebook} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-blue-700 hover:underline flex items-center gap-1 text-[11px]"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Open Link</span>
                              </a>
                            )}
                          </label>
                          <input
                            type="url"
                            placeholder="https://facebook.com/nsbs.udus"
                            value={siteSettings.socials.facebook || ''}
                            onChange={(e) => updateSiteSettings({ socials: { ...siteSettings.socials, facebook: e.target.value } })}
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                        </div>

                        {/* Telegram */}
                        <div>
                          <label className="block font-semibold text-slate-800 mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                              <span>Telegram Channel / Broadcast Group:</span>
                            </span>
                            {siteSettings.socials.telegram && (
                              <a 
                                href={siteSettings.socials.telegram} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-sky-700 hover:underline flex items-center gap-1 text-[11px]"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Open Link</span>
                              </a>
                            )}
                          </label>
                          <input
                            type="url"
                            placeholder="https://t.me/nsbsudus"
                            value={siteSettings.socials.telegram || ''}
                            onChange={(e) => updateSiteSettings({ socials: { ...siteSettings.socials, telegram: e.target.value } })}
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                        </div>

                        {/* YouTube */}
                        <div>
                          <label className="block font-semibold text-slate-800 mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                              <span>YouTube Channel URL:</span>
                            </span>
                            {siteSettings.socials.youtube && (
                              <a 
                                href={siteSettings.socials.youtube} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-red-700 hover:underline flex items-center gap-1 text-[11px]"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Open Link</span>
                              </a>
                            )}
                          </label>
                          <input
                            type="url"
                            placeholder="https://youtube.com/@nsbsudusofficial"
                            value={siteSettings.socials.youtube || ''}
                            onChange={(e) => updateSiteSettings({ socials: { ...siteSettings.socials, youtube: e.target.value } })}
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Home Impact Statistics & Factual Numbers Manager Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold mb-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>FACTUAL IMPACT METRICS</span>
                          </div>
                          <h4 className="font-display-academic text-base font-bold text-slate-900">
                            Home Impact Banner: Actual &amp; Factual Numbers
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Ensure the numbers displayed on the public homepage banner reflect genuine and factual metrics (Community Outreaches, Beneficiaries, Enrolment, Resources, and Events).
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleSyncMetricsFromDB}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
                          title="Count records from database (students, resources, events, programmes, projects)"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Sync Live Records</span>
                        </button>
                      </div>

                      <form onSubmit={handleSaveFactualMetrics} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Outreach Beneficiaries */}
                          <div className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/30 space-y-1.5">
                            <label className="block font-bold text-teal-950 text-xs">
                              Community Outreach Beneficiaries (Factual Count):
                            </label>
                            <input
                              type="number"
                              min="0"
                              required
                              value={metricBeneficiaries}
                              onChange={(e) => setMetricBeneficiaries(Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-teal-300 font-bold text-teal-900 text-sm bg-white"
                            />
                            <p className="text-[10px] text-teal-800">
                              Actual number of citizens and students screened during NSBS health outreaches (Blood Glucose, Hypertension, Sickle Cell).
                            </p>
                          </div>

                          {/* Community Outreaches Executed */}
                          <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-1.5">
                            <label className="block font-bold text-emerald-950 text-xs">
                              Community Outreaches Conducted:
                            </label>
                            <input
                              type="number"
                              min="0"
                              required
                              value={metricOutreaches}
                              onChange={(e) => setMetricOutreaches(Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-emerald-300 font-bold text-emerald-900 text-sm bg-white"
                            />
                            <p className="text-[10px] text-emerald-800">
                              Total verified community health and academic outreach drives executed across Sokoto host communities.
                            </p>
                          </div>

                          {/* Enrolled Students */}
                          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/30 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <label className="block font-bold text-blue-950 text-xs">
                                Enrolled Departmental Students:
                              </label>
                              <button
                                type="button"
                                onClick={() => setMetricStudents(registeredStudents.length)}
                                className="text-[10px] text-blue-800 underline font-medium"
                              >
                                Use DB ({registeredStudents.length})
                              </button>
                            </div>
                            <input
                              type="number"
                              min="0"
                              required
                              value={metricStudents}
                              onChange={(e) => setMetricStudents(Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-blue-300 font-bold text-blue-900 text-sm bg-white"
                            />
                            <p className="text-[10px] text-blue-800">
                              Factual student enrolment across 100L, 200L, 300L, 400L, and Postgraduate Biochemistry cohorts.
                            </p>
                          </div>

                          {/* Academic Resources */}
                          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <label className="block font-bold text-slate-800 text-xs">
                                Academic Resources Published:
                              </label>
                              <button
                                type="button"
                                onClick={() => setMetricResources(resources.length)}
                                className="text-[10px] text-blue-800 underline font-medium"
                              >
                                Use DB ({resources.length})
                              </button>
                            </div>
                            <input
                              type="number"
                              min="0"
                              required
                              value={metricResources}
                              onChange={(e) => setMetricResources(Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm bg-white"
                            />
                            <p className="text-[10px] text-slate-500">
                              Vetted course lecture notes, past questions, and laboratory practical manuals.
                            </p>
                          </div>

                          {/* Annual Events */}
                          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <label className="block font-bold text-slate-800 text-xs">
                                Annual Events &amp; Symposia:
                              </label>
                              <button
                                type="button"
                                onClick={() => setMetricEvents(events.length)}
                                className="text-[10px] text-blue-800 underline font-medium"
                              >
                                Use DB ({events.length})
                              </button>
                            </div>
                            <input
                              type="number"
                              min="0"
                              required
                              value={metricEvents}
                              onChange={(e) => setMetricEvents(Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm bg-white"
                            />
                            <p className="text-[10px] text-slate-500">
                              Academic symposia, research workshops, webinars, and NSBS Week programs.
                            </p>
                          </div>

                          {/* Training Programmes */}
                          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/30 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <label className="block font-bold text-amber-950 text-xs">
                                Flagship Training Modules:
                              </label>
                              <button
                                type="button"
                                onClick={() => setMetricProgrammes(programmes.length)}
                                className="text-[10px] text-amber-800 underline font-medium"
                              >
                                Use DB ({programmes.length})
                              </button>
                            </div>
                            <input
                              type="number"
                              min="0"
                              required
                              value={metricProgrammes}
                              onChange={(e) => setMetricProgrammes(Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-amber-300 font-bold text-amber-900 text-sm bg-white"
                            />
                            <p className="text-[10px] text-amber-800">
                              Hands-on clinical diagnostics, bioinformatics masterclasses, and software sessions.
                            </p>
                          </div>

                          {/* Research Projects */}
                          <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/30 space-y-1.5 sm:col-span-2">
                            <div className="flex items-center justify-between">
                              <label className="block font-bold text-indigo-950 text-xs">
                                Supervised Research Projects &amp; Initiatives:
                              </label>
                              <button
                                type="button"
                                onClick={() => setMetricResearch(researchProjects.length)}
                                className="text-[10px] text-indigo-800 underline font-medium"
                              >
                                Use DB ({researchProjects.length})
                              </button>
                            </div>
                            <input
                              type="number"
                              min="0"
                              required
                              value={metricResearch}
                              onChange={(e) => setMetricResearch(Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-indigo-300 font-bold text-indigo-900 text-sm bg-white"
                            />
                            <p className="text-[10px] text-indigo-800">
                              Faculty-reviewed phytochemical, clinical enzymology, and infectious disease research projects.
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                          <button
                            type="submit"
                            className="px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold flex items-center gap-1.5 shadow-sm"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Factual Statistical Numbers</span>
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Administrative Security & Password Management Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <Key className="w-4 h-4 text-blue-900" />
                        <div>
                          <h4 className="font-display-academic text-sm font-bold text-slate-900 uppercase tracking-wide">
                            Administrative Security &amp; Password Management
                          </h4>
                          <p className="text-xs text-slate-500">
                            Update administrator credentials or test password recovery dispatch to the official NSBS mail.
                          </p>
                        </div>
                      </div>

                      {adminPwdMsg && (
                        <div className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                          adminPwdMsg.type === 'success' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {adminPwdMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-red-600" />}
                          <span>{adminPwdMsg.text}</span>
                        </div>
                      )}

                      <form onSubmit={handleChangeAdminPassword} className="space-y-3.5 text-xs">
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-slate-700">Administrator Username:</span>
                            <span className="ml-2 font-mono font-bold text-blue-900">Admin_1</span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Current Recovery Mail: <strong className="font-mono text-slate-800">{siteSettings.officialEmail}</strong>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              Current Password:
                            </label>
                            <input
                              type="password"
                              required
                              placeholder="Current admin password"
                              value={adminOldPassword}
                              onChange={(e) => setAdminOldPassword(e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              New Password:
                            </label>
                            <input
                              type="password"
                              required
                              placeholder="Minimum 6 characters"
                              value={adminNewPassword}
                              onChange={(e) => setAdminNewPassword(e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              Confirm New Password:
                            </label>
                            <input
                              type="password"
                              required
                              placeholder="Re-type new password"
                              value={adminConfirmPassword}
                              onChange={(e) => setAdminConfirmPassword(e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              const res = requestAdminPasswordReset();
                              showToast(`Test reset mail sent to NSBS Mail: ${res.targetEmail}. Token: ${res.token}`, 'info');
                            }}
                            className="px-3.5 py-2 rounded-lg border border-blue-200 text-blue-900 hover:bg-blue-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Send className="w-3.5 h-3.5 text-blue-700" />
                            <span>Send Test Password Reset Email to NSBS Mail</span>
                          </button>

                          <button
                            type="submit"
                            className="px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                          >
                            <Key className="w-3.5 h-3.5" />
                            <span>Update Administrator Password</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Right Column: Live Footer Preview (1 col) */}
                  <div className="space-y-6">
                    <div className="bg-[#081528] rounded-xl border border-slate-800 p-5 text-slate-300 shadow-md">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                        <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                          Live Footer Preview
                        </span>
                        <span className="text-[10px] text-slate-400">Updates Instantly</span>
                      </div>

                      {/* Organization identity */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded bg-blue-900/60 border border-blue-700/60 flex items-center justify-center font-display-academic font-bold text-amber-400 text-xs shrink-0">
                          UDUS
                        </div>
                        <div>
                          <div className="font-display-academic text-white font-bold text-xs leading-tight">
                            NIGERIAN SOCIETY OF BIOCHEMISTRY STUDENTS
                          </div>
                          <div className="text-[10px] text-blue-300">
                            Usmanu Danfodiyo University, Sokoto · 2026/2027
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 italic mb-4 leading-relaxed">
                        &ldquo;{siteSettings.motto}&rdquo;
                      </p>

                      {/* Contact details */}
                      <div className="text-[11px] text-slate-300 space-y-2 border-t border-slate-800/80 pt-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="text-slate-400 leading-snug">{siteSettings.departmentAddress}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span className="text-amber-300 font-mono">{siteSettings.officialEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span className="text-amber-300 font-mono">{siteSettings.officialPhone}</span>
                        </div>
                      </div>

                      {/* Social communities */}
                      <div className="border-t border-slate-800/80 pt-3 mt-3">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2">
                          Digital Communities:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {siteSettings.socials.whatsapp && (
                            <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 text-[10px]">
                              WhatsApp
                            </span>
                          )}
                          {siteSettings.socials.linkedin && (
                            <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-700/50 text-[10px]">
                              LinkedIn
                            </span>
                          )}
                          {siteSettings.socials.twitter && (
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 text-[10px]">
                              X (Twitter)
                            </span>
                          )}
                          {siteSettings.socials.instagram && (
                            <span className="px-2 py-0.5 rounded bg-pink-950/70 text-pink-300 border border-pink-700/50 text-[10px]">
                              Instagram
                            </span>
                          )}
                          {siteSettings.socials.facebook && (
                            <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-200 border border-blue-800/40 text-[10px]">
                              Facebook
                            </span>
                          )}
                          {siteSettings.socials.telegram && (
                            <span className="px-2 py-0.5 rounded bg-sky-950/70 text-sky-300 border border-sky-700/50 text-[10px]">
                              Telegram
                            </span>
                          )}
                          {siteSettings.socials.youtube && (
                            <span className="px-2 py-0.5 rounded bg-red-950/70 text-red-300 border border-red-700/50 text-[10px]">
                              YouTube
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Presidential Welcome Address Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                        <UserCheck className="w-4 h-4 text-blue-900" />
                        <h4 className="font-display-academic font-bold text-slate-900">
                          Presidential Address
                        </h4>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          President Title / Name:
                        </label>
                        <input
                          type="text"
                          value={siteSettings.presidentName || ''}
                          onChange={(e) => updateSiteSettings({ presidentName: e.target.value })}
                          placeholder="Office of the President"
                          className="w-full p-2 rounded-lg border border-slate-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Homepage Welcome Message:
                        </label>
                        <textarea
                          rows={4}
                          value={siteSettings.presidentMessage}
                          onChange={(e) => updateSiteSettings({ presidentMessage: e.target.value })}
                          className="w-full p-2 rounded-lg border border-slate-300 text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
