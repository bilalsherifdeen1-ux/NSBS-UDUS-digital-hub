import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AcademicLevel, Certificate, StudentUser } from '../../types';
import { 
  User, 
  BookOpen, 
  Calendar, 
  Award, 
  Sparkles, 
  BookmarkCheck, 
  Bell, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  LogOut,
  Settings,
  ShieldCheck,
  Printer,
  Mail,
  Phone,
  MapPin,
  Lock,
  Key,
  RefreshCw,
  Edit3,
  Save,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  CheckCheck,
  ImagePlus,
  Trash2
} from 'lucide-react';
import { fileToOptimizedDataUrl } from '../../utils/images';
import { downloadCertificatePdf } from '../../utils/certificatePdf';
import { CertificateArtwork } from '../common/CertificateArtwork';

export const StudentDashboard: React.FC = () => {
  const { 
    currentUser, 
    siteSettings,
    setCurrentUser, 
    userRole, 
    setUserRole, 
    resources, 
    events, 
    opportunities, 
    certificates, 
    bookmarkedResourceIds, 
    registeredEventIds,
    toggleBookmark,
    cancelEventRegistration,
    setActivePage,
    notifications,
    showToast,
    studentLogin,
    updateCurrentUser,
    requestPasswordReset,
    resetStudentPassword,
    registeredStudents
  } = useApp();

  // Auth form states if not logged in
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot' | 'reset'>('login');
  const [loginMatric, setLoginMatric] = useState('');
  const [loginStudentName, setLoginStudentName] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMatric, setRegMatric] = useState('');
  const [regLevel, setRegLevel] = useState<AcademicLevel>('300L');
  const [regPhone, setRegPhone] = useState('');
  const [regInterests, setRegInterests] = useState<string[]>(['Clinical Biochemistry', 'Enzymology']);
  const [regPass, setRegPass] = useState('');

  // Password Recovery States
  const [resetInput, setResetInput] = useState('');
  const [resetTargetEmail, setResetTargetEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [resetLink, setResetLink] = useState('');
  const [resetDispatched, setResetDispatched] = useState(false);
  const [resetNewPass, setResetNewPass] = useState('');
  const [resetConfirmPass, setResetConfirmPass] = useState('');
  const [showResetPass, setShowResetPass] = useState(false);

  // Certificate Modal State
  const [viewingCertificate, setViewingCertificate] = useState<Certificate | null>(null);

  // Active dashboard tab
  const [dashTab, setDashTab] = useState<'overview' | 'bookmarks' | 'events' | 'certificates' | 'settings'>('overview');

  // Student Profile Settings States (Editable by student)
  const [editFullName, setEditFullName] = useState('');
  const [editMatric, setEditMatric] = useState('');
  const [editLevel, setEditLevel] = useState<AcademicLevel>('300L');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editState, setEditState] = useState('');
  const [editProgramme, setEditProgramme] = useState('B.Sc. Biochemistry');
  const [editDepartment, setEditDepartment] = useState('Biochemistry');
  const [editInterests, setEditInterests] = useState<string[]>([]);
  const [editFutureAspirations, setEditFutureAspirations] = useState<string[]>([]);
  const [editProfilePhoto, setEditProfilePhoto] = useState<string | undefined>();
  const [customInterestInput, setCustomInterestInput] = useState('');
  const [customAspirationInput, setCustomAspirationInput] = useState('');
  const [newPortalPass, setNewPortalPass] = useState('');
  const [confirmPortalPass, setConfirmPortalPass] = useState('');
  const [showNewPortalPass, setShowNewPortalPass] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Sync profile editing fields whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      setEditFullName(currentUser.fullName || '');
      setEditMatric(currentUser.matricNumber || '');
      setEditLevel(currentUser.level || '300L');
      setEditEmail(currentUser.email || '');
      setEditPhone(currentUser.phone || '');
      setEditState(currentUser.stateOfOrigin || 'Sokoto');
      setEditProgramme(currentUser.programme || 'B.Sc. Biochemistry');
      setEditDepartment(currentUser.department || 'Biochemistry');
      setEditInterests(currentUser.interests || ['Clinical Biochemistry', 'Enzymology']);
      setEditFutureAspirations(currentUser.futureAspirations || []);
      setEditProfilePhoto(currentUser.profilePhoto);
    }
  }, [currentUser]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginMatric.trim()) return;

    // Check if student exists in registeredStudents
    const found = registeredStudents.find(s => 
      s.matricNumber.trim().toLowerCase() === loginMatric.trim().toLowerCase() ||
      s.matricNumber.replace(/[\/\s]/g, '').toLowerCase() === loginMatric.trim().toLowerCase()
    );

    const nameToUse = loginStudentName.trim() || found?.fullName || 'Biochemistry Scholar';
    const levelToUse = found?.level || '300L';

    studentLogin(nameToUse, loginMatric.trim(), levelToUse, loginPass);
  };

  // Handle Register
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regMatric.trim()) return;

    const email = regEmail.trim() || `${regMatric.replace(/[\/\s]/g, '').toLowerCase()}@student.udusok.edu.ng`;
    const newStudent: StudentUser = {
      id: `stud-${Date.now()}`,
      fullName: regName.trim(),
      email,
      matricNumber: regMatric.trim(),
      level: regLevel,
      programme: 'B.Sc. Biochemistry',
      department: 'Biochemistry',
      phone: regPhone || '',
      interests: regInterests,
      joinedDate: new Date().toISOString().split('T')[0],
      onboardingCompleted: true,
      password: regPass || 'studentpassword123'
    };

    setCurrentUser(newStudent);
    setUserRole('student');
    localStorage.setItem('nsbs_student_user', JSON.stringify(newStudent));
    showToast(`Profile created for ${newStudent.fullName}! Welcome to NSBS.`, 'success');
  };

  // Handle Forgot Password Request
  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetInput.trim()) {
      showToast('Please provide your registered matric number or university email.', 'warning');
      return;
    }

    const result = requestPasswordReset(resetInput.trim());
    if (result.success) {
      setResetTargetEmail(result.targetEmail || '');
      setResetToken(result.token || '');
      setResetLink(result.resetLink || '');
      setResetDispatched(true);
      showToast(`Password reset link dispatched to ${result.targetEmail}`, 'success');
    } else {
      showToast(result.message || 'Error processing request.', 'warning');
    }
  };

  // Handle Password Reset Submission
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetNewPass || resetNewPass.trim().length < 4) {
      showToast('New password must be at least 4 characters long.', 'warning');
      return;
    }
    if (resetNewPass !== resetConfirmPass) {
      showToast('Passwords do not match. Please verify and re-enter.', 'warning');
      return;
    }

    const result = resetStudentPassword(resetTargetEmail || resetInput, resetNewPass);
    if (result.success) {
      showToast('Password successfully updated! You can now sign in.', 'success');
      setLoginMatric(resetInput || resetTargetEmail);
      setLoginPass(resetNewPass);
      setAuthMode('login');
      setResetDispatched(false);
      setResetNewPass('');
      setResetConfirmPass('');
    } else {
      showToast(result.message || 'Failed to update password.', 'warning');
    }
  };

  // Handle Save Profile Settings
  const handleSaveProfileSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFullName.trim() || !editMatric.trim()) {
      showToast('Student Full Name and Matric Number are required.', 'warning');
      return;
    }

    if (newPortalPass && newPortalPass !== confirmPortalPass) {
      showToast('New passwords do not match. Please verify both fields.', 'warning');
      return;
    }

    setIsSavingProfile(true);

    const updatedData: Partial<StudentUser> = {
      fullName: editFullName.trim(),
      matricNumber: editMatric.trim(),
      level: editLevel,
      email: editEmail.trim(),
      phone: editPhone.trim(),
      stateOfOrigin: editState.trim(),
      programme: editProgramme.trim(),
      department: editDepartment.trim(),
      interests: editInterests,
      futureAspirations: editFutureAspirations,
      profilePhoto: editProfilePhoto
    };

    if (newPortalPass && newPortalPass.trim().length >= 4) {
      updatedData.password = newPortalPass;
    }

    updateCurrentUser(updatedData);
    setIsSavingProfile(false);
    setNewPortalPass('');
    setConfirmPortalPass('');
  };

  const handleProfilePhotoChange = async (file?: File) => {
    if (!file) return;
    try {
      const photo = await fileToOptimizedDataUrl(file, { maxWidth: 720, maxHeight: 720, quality: 0.8, maxBytes: 250_000 });
      setEditProfilePhoto(photo);
      showToast('Profile photo is ready. Save your profile to keep the change.', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Unable to process the selected photo.', 'warning');
    }
  };

  const addListEntries = (value: string, current: string[], setter: (entries: string[]) => void) => {
    const additions = value.split(/[;,\n]/).map(item => item.trim()).filter(Boolean);
    if (!additions.length) return;
    const merged = [...current];
    additions.forEach(item => {
      if (!merged.some(existing => existing.toLocaleLowerCase() === item.toLocaleLowerCase())) merged.push(item);
    });
    setter(merged);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole('guest');
    localStorage.removeItem('nsbs_student_user');
    showToast('Signed out of student session.', 'info');
  };

  // Saved resources
  const savedResources = resources.filter(r => bookmarkedResourceIds.includes(r.id));
  const studentCertificates = certificates.filter(cert =>
    cert.studentId === currentUser?.id || cert.studentName?.trim().toLocaleLowerCase() === currentUser?.fullName.trim().toLocaleLowerCase()
  );
  
  // Registered events
  const registeredEvents = events.filter(e => registeredEventIds.includes(e.id));

  // Personalized recommendations
  const recommendedResources = resources.filter(r => {
    if (!currentUser) return false;
    return currentUser.interests.some(interest => 
      r.category.toLowerCase().includes(interest.toLowerCase()) ||
      r.title.toLowerCase().includes(interest.toLowerCase())
    );
  }).slice(0, 3);

  // If user is not logged in as student, display the high-grade academic login/registration portal
  if (!currentUser || userRole !== 'student') {
    return (
      <div className="py-16 bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#0c2340] text-white p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-blue-900 border border-blue-700 flex items-center justify-center font-display-academic text-amber-400 font-bold mx-auto mb-3">
              UDUS
            </div>
            <h2 className="font-display-academic text-xl font-bold">NSBS Student Portal</h2>
            <p className="text-xs text-blue-200 mt-1">Usmanu Danfodiyo University, Sokoto · Chapter</p>
          </div>

          {/* Student Portal Info Box */}
          <div className="p-4 bg-blue-50 border-b border-blue-200 text-xs text-blue-950 flex items-center justify-between">
            <div className="text-[11px] leading-relaxed">
              <span className="font-bold">Official Student Hub: </span>
              Access course materials, tutorial registrations, profile management and certificates.
            </div>
          </div>

          <div className="p-6">
            {/* Tab navigation between Login & Register */}
            {(authMode === 'login' || authMode === 'register') && (
              <div className="flex border-b border-slate-200 mb-6 text-xs font-semibold">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 text-center border-b-2 transition-colors ${authMode === 'login' ? 'border-blue-900 text-blue-900 font-bold' : 'border-transparent text-slate-500'}`}
                >
                  Sign In with Matric No.
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-2 text-center border-b-2 transition-colors ${authMode === 'register' ? 'border-blue-900 text-blue-900 font-bold' : 'border-transparent text-slate-500'}`}
                >
                  Create Student Profile
                </button>
              </div>
            )}

            {/* MODE 1: LOGIN */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Student Full Name (Optional):
                  </label>
                  <input
                    type="text"
                    value={loginStudentName}
                    onChange={(e) => setLoginStudentName(e.target.value)}
                    placeholder="Enter full name (or auto-retrieved by Matric No.)"
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Matriculation Number / Student ID:
                  </label>
                  <input
                    type="text"
                    required
                    value={loginMatric}
                    onChange={(e) => setLoginMatric(e.target.value)}
                    placeholder="e.g. 23/14/0842"
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Demo accounts available: <code className="text-blue-900 font-semibold">23/14/0842</code> (Aliyu Ibrahim) or <code className="text-blue-900 font-semibold">22/14/0118</code> (Fatima Bello)
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Portal Password:
                  </label>
                  <div className="relative">
                    <input
                      type={showLoginPass ? 'text' : 'password'}
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      placeholder="Enter portal password"
                      className="w-full p-2.5 pr-9 rounded-lg border border-slate-300 text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPass(!showLoginPass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Remember this session</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => {
                      setResetInput(loginMatric || '');
                      setResetDispatched(false);
                      setAuthMode('forgot');
                    }} 
                    className="text-blue-900 font-semibold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold transition-colors shadow-sm"
                >
                  Enter Student Portal
                </button>
              </form>
            )}

            {/* MODE 2: REGISTER */}
            {authMode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Legal Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your legal full name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Matric Number:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 23/14/0118"
                      value={regMatric}
                      onChange={(e) => setRegMatric(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Academic Level:</label>
                    <select
                      value={regLevel}
                      onChange={(e) => setRegLevel(e.target.value as AcademicLevel)}
                      className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="100L">100L</option>
                      <option value="200L">200L</option>
                      <option value="300L">300L</option>
                      <option value="400L">400L</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student University Email:</label>
                  <input
                    type="email"
                    placeholder="student@udusok.edu.ng"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Choose Portal Password:</label>
                  <input
                    type="password"
                    placeholder="Create a portal password"
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Scientific Interests:</label>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
                    {['Clinical Biochemistry', 'Enzymology', 'Molecular Biology', 'Phytomedicine', 'AI in Healthcare', 'Biotechnology'].map((int) => (
                      <label key={int} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={regInterests.includes(int)}
                          onChange={(e) => {
                            if (e.target.checked) setRegInterests([...regInterests, int]);
                            else setRegInterests(regInterests.filter(i => i !== int));
                          }}
                        />
                        <span>{int}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold transition-colors mt-2"
                >
                  Complete Registration &amp; Onboard
                </button>
              </form>
            )}

            {/* MODE 3: FORGOT PASSWORD */}
            {authMode === 'forgot' && (
              <div className="space-y-4 text-xs">
                <div className="text-center pb-2 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center mx-auto mb-2">
                    <Key className="w-5 h-5 text-blue-900" />
                  </div>
                  <h3 className="font-display-academic font-bold text-slate-900 text-sm">
                    Password Reset Link Dispatch
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Enter your matriculation number or university email. A secure password reset link will be sent directly to your registered address.
                  </p>
                </div>

                {!resetDispatched ? (
                  <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Matriculation No. or Student Email:
                      </label>
                      <input
                        type="text"
                        required
                        value={resetInput}
                        onChange={(e) => setResetInput(e.target.value)}
                        placeholder="e.g. 23/14/0842 or aliyu.ibrahim@student.udusok.edu.ng"
                        className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Password Reset Link to Email</span>
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3 animate-in fade-in">
                    {/* Simulated Official Email Dispatch Notice */}
                    <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Official Reset Link Dispatched Directly!</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-emerald-900">
                        An authorized password reset link has been dispatched to:
                        <span className="font-mono font-bold block mt-0.5 text-blue-950">{resetTargetEmail}</span>
                      </p>
                      
                      <div className="bg-white/90 p-2.5 rounded border border-emerald-300/60 font-mono text-[10px] break-all text-slate-700">
                        <span className="text-slate-400 block text-[9px] uppercase font-sans">Simulated Secure Email Link:</span>
                        {resetLink}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setAuthMode('reset')}
                      className="w-full py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Open Reset Link &amp; Change Password Now</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setResetDispatched(false)}
                      className="w-full py-2 text-slate-500 hover:text-slate-800 text-[11px] text-center"
                    >
                      Resend link or use a different email / matric number
                    </button>
                  </div>
                )}

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setResetDispatched(false);
                    }}
                    className="text-xs text-blue-900 font-semibold hover:underline"
                  >
                    ← Return to Sign In
                  </button>
                </div>
              </div>
            )}

            {/* MODE 4: RESET PASSWORD FORM */}
            {authMode === 'reset' && (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-4 text-xs animate-in fade-in">
                <div className="text-center pb-2 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-2">
                    <Lock className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-display-academic font-bold text-slate-900 text-sm">
                    Configure New Portal Password
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Setting new login credentials for: <span className="font-mono font-bold text-blue-900">{resetTargetEmail || resetInput}</span>
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Enter New Password:
                  </label>
                  <div className="relative">
                    <input
                      type={showResetPass ? 'text' : 'password'}
                      required
                      value={resetNewPass}
                      onChange={(e) => setResetNewPass(e.target.value)}
                      placeholder="Minimum 4 characters"
                      className="w-full p-2.5 pr-9 rounded-lg border border-slate-300 text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetPass(!showResetPass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showResetPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Confirm New Password:
                  </label>
                  <input
                    type="password"
                    required
                    value={resetConfirmPass}
                    onChange={(e) => setResetConfirmPass(e.target.value)}
                    placeholder="Re-enter your new password"
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Update Password &amp; Enter Portal</span>
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    ← Cancel and Return to Sign In
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <button
                onClick={() => setActivePage('home')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                ← Return to Public Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Authenticated Student Portal
  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Student Welcome Banner */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center font-display-academic text-xl font-bold shadow-md overflow-hidden shrink-0">
              {currentUser.profilePhoto ? (
                <img src={currentUser.profilePhoto} alt={`${currentUser.fullName} profile`} className="w-full h-full object-cover" />
              ) : currentUser.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span className="font-bold text-blue-900">{currentUser.matricNumber}</span>
                <span>·</span>
                <span>{currentUser.level}</span>
                <span>·</span>
                <span>{currentUser.programme}</span>
              </div>
              <h1 className="font-display-academic text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
                Welcome back, {currentUser.fullName}
              </h1>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {currentUser.interests.map((int) => (
                  <span key={int} className="text-[10px] bg-blue-50 text-blue-900 px-2 py-0.5 rounded font-medium border border-blue-200">
                    {int}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setDashTab('settings')}
              className="px-3.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Edit Matric Number, Level, Name & Bio"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-800" />
              <span>Dashboard Settings</span>
            </button>

            <button
              onClick={() => setActivePage('ailab')}
              className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Launch AI Lab</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <button
            onClick={() => setActivePage('resources')}
            className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-900 shadow-sm transition-all"
          >
            <BookOpen className="w-5 h-5 text-blue-900 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-800">Find Resources</span>
          </button>

          <button
            onClick={() => setActivePage('events')}
            className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-900 shadow-sm transition-all"
          >
            <Calendar className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-800">Tutorial Schedule</span>
          </button>

          <button
            onClick={() => setActivePage('opportunities')}
            className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-900 shadow-sm transition-all"
          >
            <Award className="w-5 h-5 text-amber-600 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-800">Scholarships</span>
          </button>

          <button
            onClick={() => setActivePage('ailab')}
            className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-900 shadow-sm transition-all"
          >
            <Sparkles className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-800">AI Study Tools</span>
          </button>

          <button
            onClick={() => setActivePage('contact')}
            className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-900 shadow-sm transition-all"
          >
            <ShieldCheck className="w-5 h-5 text-rose-600 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-800">Student Voice</span>
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setDashTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              dashTab === 'overview'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Overview &amp; Recommendations
          </button>

          <button
            onClick={() => setDashTab('bookmarks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              dashTab === 'bookmarks'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Saved Resources ({savedResources.length})</span>
          </button>

          <button
            onClick={() => setDashTab('events')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              dashTab === 'events'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Registered Events ({registeredEvents.length})</span>
          </button>

          <button
            onClick={() => setDashTab('certificates')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              dashTab === 'certificates'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>My Certificates ({studentCertificates.length})</span>
          </button>

          <button
            onClick={() => setDashTab('settings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              dashTab === 'settings'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Profile &amp; Dashboard Settings</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {dashTab === 'overview' && (
          <div className="space-y-6">
            {/* Personalized Recommendations */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display-academic text-lg font-bold text-slate-900">
                    Recommended for Your Academic Profile
                  </h3>
                  <p className="text-xs text-slate-500">
                    Curated materials matching your interests in {currentUser.interests.join(', ')}.
                  </p>
                </div>
                <button
                  onClick={() => setActivePage('resources')}
                  className="text-xs font-semibold text-blue-900 hover:underline"
                >
                  View All Resources →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedResources.map((res) => (
                  <div key={res.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-mono font-bold text-blue-900">{res.courseCode}</span>
                        <span>{res.level}</span>
                      </div>
                      <h4 className="font-display-academic text-sm font-bold text-slate-900 line-clamp-2">
                        {res.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{res.description}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{res.fileSize}</span>
                      <a
                        href={res.googleDriveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Registered Events Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-display-academic text-lg font-bold text-slate-900 mb-3">
                Your Upcoming Schedule
              </h3>
              {registeredEvents.length === 0 ? (
                <div className="text-xs text-slate-500 py-4 text-center">
                  You have not registered for any events yet. Check out the Events calendar!
                </div>
              ) : (
                <div className="space-y-3">
                  {registeredEvents.map((evt) => (
                    <div key={evt.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">{evt.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{evt.date} · {evt.startTime} · {evt.venue}</div>
                      </div>
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Seat Confirmed</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Bookmarks */}
        {dashTab === 'bookmarks' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-display-academic text-lg font-bold text-slate-900 mb-4">
              Saved Lecture Notes &amp; Handouts
            </h3>
            {savedResources.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No saved resources yet. Click the bookmark icon on any material in the Digital Library to pin it here.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedResources.map((res) => (
                  <div key={res.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-blue-900">{res.courseCode} · {res.level}</div>
                      <div className="font-display-academic font-bold text-slate-900 text-sm mt-0.5">{res.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{res.fileType} · {res.fileSize}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={res.googleDriveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded bg-blue-900 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Open</span>
                      </a>
                      <button
                        onClick={() => toggleBookmark(res.id)}
                        className="text-xs text-red-600 hover:underline p-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Registered Events */}
        {dashTab === 'events' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-display-academic text-lg font-bold text-slate-900 mb-4">
              Your Registered Events &amp; Tutorial Sessions
            </h3>
            {registeredEvents.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No event registrations found.
              </div>
            ) : (
              <div className="space-y-3">
                {registeredEvents.map((evt) => (
                  <div key={evt.id} className="p-4 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-blue-900 font-bold">{evt.category}</div>
                      <div className="font-display-academic font-bold text-slate-900 text-base mt-0.5">{evt.title}</div>
                      <div className="text-xs text-slate-500 mt-1">{evt.date} · {evt.startTime} · {evt.venue}</div>
                    </div>
                    <button
                      onClick={() => cancelEventRegistration(evt.id)}
                      className="px-3 py-1 rounded border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Verified Certificates */}
        {dashTab === 'certificates' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-display-academic text-lg font-bold text-slate-900 mb-4">
              Your Official Issued Certificates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentCertificates.length === 0 && (
                <div className="md:col-span-2 rounded-lg border border-dashed border-slate-300 py-10 text-center text-sm text-slate-500">
                  No certificates have been issued to your profile yet. Your administrator can issue them here when you complete a programme.
                </div>
              )}
              {studentCertificates.map((cert) => (
                <div key={cert.id} className="p-5 rounded-lg border-2 border-blue-900/20 bg-blue-50/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-mono font-bold text-blue-900">{cert.certificateCode}</span>
                      <span className="text-emerald-700 font-semibold font-mono text-[11px]">✓ Verified</span>
                    </div>
                    <h4 className="font-display-academic text-base font-bold text-slate-900">
                      {cert.programmeTitle}
                    </h4>
                    <div className="text-xs text-slate-600 mt-1">
                      Awarded to: <span className="font-semibold text-slate-900">{cert.studentName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Issued by: {cert.issuerName} ({cert.issuerRole}) · {cert.issueDate}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-blue-900/20 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">Digital Signature Valid</span>
                    <button
                      onClick={() => setViewingCertificate(cert)}
                      className="px-3 py-1.5 rounded bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Preview &amp; Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Profile & Dashboard Settings */}
        {dashTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-900 text-white shadow-sm">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display-academic text-lg font-bold text-slate-900">
                    Student Profile &amp; Dashboard Settings
                  </h3>
                  <p className="text-xs text-slate-500">
                    Modify your legal name, matriculation number, study level, contact details, research fields, and portal security password.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (currentUser) {
                      setEditFullName(currentUser.fullName);
                      setEditMatric(currentUser.matricNumber);
                      setEditLevel(currentUser.level);
                      setEditEmail(currentUser.email);
                      setEditPhone(currentUser.phone);
                      setEditState(currentUser.stateOfOrigin || 'Sokoto');
                      setEditProgramme(currentUser.programme);
                      setEditDepartment(currentUser.department);
                      setEditInterests(currentUser.interests);
                      setNewPortalPass('');
                      setConfirmPortalPass('');
                      showToast('Reverted fields to current profile.', 'info');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Form</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveProfileSettings} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Two Columns: Academic & Contact Fields */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Academic Credentials Card */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <User className="w-4 h-4 text-blue-900" />
                      <h4 className="font-display-academic text-sm font-bold text-slate-900 uppercase tracking-wide">
                        Academic Identity &amp; Level
                      </h4>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Full Legal Name:
                        </label>
                        <input
                          type="text"
                          required
                          value={editFullName}
                          onChange={(e) => setEditFullName(e.target.value)}
                          placeholder="e.g. Aliyu Ibrahim"
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Matriculation Number / Student ID:
                          </label>
                          <input
                            type="text"
                            required
                            value={editMatric}
                            onChange={(e) => setEditMatric(e.target.value)}
                            placeholder="e.g. 23/14/0842"
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Academic Study Level:
                          </label>
                          <select
                            value={editLevel}
                            onChange={(e) => setEditLevel(e.target.value as AcademicLevel)}
                            className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          >
                            <option value="100L">100L (Freshman Scholar)</option>
                            <option value="200L">200L (Sophomore Scholar)</option>
                            <option value="300L">300L (Penultimate Scholar)</option>
                            <option value="400L">400L (Final Year Scholar)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Degree Programme:
                          </label>
                          <input
                            type="text"
                            value={editProgramme}
                            onChange={(e) => setEditProgramme(e.target.value)}
                            placeholder="B.Sc. Biochemistry"
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Academic Department:
                          </label>
                          <input
                            type="text"
                            value={editDepartment}
                            onChange={(e) => setEditDepartment(e.target.value)}
                            placeholder="Biochemistry"
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact & Personal Information Card */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <Mail className="w-4 h-4 text-emerald-700" />
                      <h4 className="font-display-academic text-sm font-bold text-slate-900 uppercase tracking-wide">
                        Contact Details &amp; Personal Info
                      </h4>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Student University Email Address:
                        </label>
                        <input
                          type="email"
                          required
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          placeholder="e.g. aliyu.ibrahim@student.udusok.edu.ng"
                          className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">
                          Official email used for event registrations, certificate delivery and password recovery.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Telephone / WhatsApp Contact:
                          </label>
                          <input
                            type="tel"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            placeholder="e.g. +234 814 552 1902"
                            className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            State of Origin:
                          </label>
                          <input
                            type="text"
                            value={editState}
                            onChange={(e) => setEditState(e.target.value)}
                            placeholder="e.g. Sokoto"
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scientific & Research Interests Card */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <Sparkles className="w-4 h-4 text-purple-700" />
                      <h4 className="font-display-academic text-sm font-bold text-slate-900 uppercase tracking-wide">
                        Scientific Research &amp; Academic Interests
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500">
                      Choose any number of fields and add your own specialist areas. There is no selection limit.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {editInterests.map(interest => (
                        <button key={interest} type="button" onClick={() => setEditInterests(editInterests.filter(item => item !== interest))}
                          className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-950 hover:bg-red-50 hover:border-red-200 hover:text-red-700">
                          {interest}<span aria-hidden="true">×</span>
                        </button>
                      ))}
                      {editInterests.length === 0 && <span className="text-xs text-slate-400">No interest selected yet.</span>}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
                      {[
                        'Clinical Biochemistry', 'Medical Biochemistry', 'Molecular Biology', 'Molecular Diagnostics',
                        'Enzymology', 'Protein Biochemistry', 'Structural Biology', 'Metabolism', 'Nutritional Biochemistry',
                        'Food Biochemistry', 'Industrial Biochemistry', 'Plant Biochemistry', 'Phytochemistry',
                        'Phytomedicine & Drug Discovery', 'Pharmacology', 'Toxicology', 'Environmental Biochemistry',
                        'Analytical Biochemistry', 'Physical Biochemistry', 'Immunochemistry', 'Immunology', 'Genetics',
                        'Epigenetics', 'Genomics', 'Proteomics', 'Lipidomics', 'Bioinformatics', 'Computational Biology',
                        'Biotechnology', 'Microbiology', 'Neurochemistry', 'Hematology', 'Oncology', 'Virology',
                        'Biochemical Engineering', 'AI in Healthcare', 'Public Health Biochemistry'
                      ].map((interest) => {
                        const isSelected = editInterests.includes(interest);
                        return (
                          <button
                            type="button"
                            key={interest}
                            onClick={() => {
                              if (isSelected) {
                                setEditInterests(editInterests.filter(i => i !== interest));
                              } else {
                                setEditInterests([...editInterests, interest]);
                              }
                            }}
                            className={`p-2.5 rounded-lg border text-left transition-all flex items-start gap-2 ${
                              isSelected 
                                ? 'bg-blue-50 border-blue-300 text-blue-950 font-semibold' 
                                : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 mt-0.5 rounded flex items-center justify-center text-[10px] shrink-0 ${
                              isSelected ? 'bg-blue-900 text-white' : 'border border-slate-300'
                            }`}>
                              {isSelected ? '✓' : ''}
                            </span>
                            <span className="text-[11px] leading-tight">{interest}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input value={customInterestInput} onChange={event => setCustomInterestInput(event.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); addListEntries(customInterestInput, editInterests, setEditInterests); setCustomInterestInput(''); } }}
                        placeholder="Add any other field or specialist research area" className="min-w-0 flex-1 p-2.5 rounded-lg border border-slate-300 text-xs" />
                      <button type="button" onClick={() => { addListEntries(customInterestInput, editInterests, setEditInterests); setCustomInterestInput(''); }}
                        className="px-4 py-2 rounded-lg bg-blue-900 text-white text-xs font-semibold">Add interest</button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <h4 className="font-display-academic text-sm font-bold text-slate-900 uppercase tracking-wide">Future Aspirations</h4>
                    </div>
                    <p className="text-xs text-slate-500">Add any number of career, research, postgraduate, or professional goals. These remain private to your profile.</p>
                    <div className="flex flex-wrap gap-2">
                      {editFutureAspirations.map(aspiration => (
                        <button key={aspiration} type="button" onClick={() => setEditFutureAspirations(editFutureAspirations.filter(item => item !== aspiration))}
                          className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-950 hover:bg-red-50 hover:border-red-200 hover:text-red-700">
                          {aspiration}<span aria-hidden="true">×</span>
                        </button>
                      ))}
                      {editFutureAspirations.length === 0 && <span className="text-xs text-slate-400">No future aspirations added yet.</span>}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input value={customAspirationInput} onChange={event => setCustomAspirationInput(event.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); addListEntries(customAspirationInput, editFutureAspirations, setEditFutureAspirations); setCustomAspirationInput(''); } }}
                        placeholder="e.g. PhD in clinical enzymology, medical research, biotech founder" className="min-w-0 flex-1 p-2.5 rounded-lg border border-slate-300 text-xs" />
                      <button type="button" onClick={() => { addListEntries(customAspirationInput, editFutureAspirations, setEditFutureAspirations); setCustomAspirationInput(''); }}
                        className="px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold">Add aspiration</button>
                    </div>
                  </div>

                  {/* Change Password Card */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <Lock className="w-4 h-4 text-amber-700" />
                      <h4 className="font-display-academic text-sm font-bold text-slate-900 uppercase tracking-wide">
                        Security &amp; Portal Password
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500">
                      Leave blank if you do not wish to change your current login password.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          New Portal Password:
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPortalPass ? 'text' : 'password'}
                            value={newPortalPass}
                            onChange={(e) => setNewPortalPass(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full p-2.5 pr-9 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPortalPass(!showNewPortalPass)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showNewPortalPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Confirm New Password:
                        </label>
                        <input
                          type="password"
                          value={confirmPortalPass}
                          onChange={(e) => setConfirmPortalPass(e.target.value)}
                          placeholder="Re-enter new password"
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      className="px-6 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSavingProfile ? 'Saving Changes...' : 'Save Profile & Settings'}</span>
                    </button>
                  </div>

                </div>

                {/* Right One Column: Live Student Identity Card Preview */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-100 bg-slate-100 flex items-center justify-center text-blue-900 font-display-academic text-xl font-bold shrink-0">
                        {editProfilePhoto ? <img src={editProfilePhoto} alt="Profile preview" className="w-full h-full object-cover" /> : (editFullName || 'Scholar').split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-slate-900">Profile picture</h4>
                        <p className="text-[11px] text-slate-500 mt-1">JPG, PNG, or WebP. Images are resized to protect your profile storage.</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-900 px-3 py-2 text-[11px] font-semibold text-white hover:bg-blue-800">
                            <ImagePlus className="w-3.5 h-3.5" />
                            {editProfilePhoto ? 'Change photo' : 'Upload photo'}
                            <input type="file" accept="image/*" className="sr-only" onChange={event => { void handleProfilePhotoChange(event.target.files?.[0]); event.currentTarget.value = ''; }} />
                          </label>
                          {editProfilePhoto && (
                            <button type="button" onClick={() => setEditProfilePhoto(undefined)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-[11px] font-semibold text-red-700 hover:bg-red-50">
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#0c2340] to-[#1d3557] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border border-blue-800 sticky top-24">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                    
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-blue-800/80 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-900/80 border border-blue-700 flex items-center justify-center font-display-academic font-bold text-amber-400 text-xs shadow-xs">
                          UDUS
                        </div>
                        <div>
                          <div className="text-[10px] font-mono tracking-wider text-blue-200 leading-none">
                            NSBS DIGITAL ID
                          </div>
                          <div className="text-xs font-bold text-white leading-tight">
                            STUDENT CREDENTIAL
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-600/50 px-2 py-0.5 rounded-full font-bold">
                        ACTIVE · {siteSettings.session.replace(/\s*Academic Session$/i, '')}
                      </span>
                    </div>

                    {/* Student Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-blue-950 border-2 border-amber-400/60 flex items-center justify-center text-amber-300 font-display-academic font-bold text-lg shadow-md shrink-0 overflow-hidden">
                        {editProfilePhoto ? <img src={editProfilePhoto} alt="Student identity preview" className="w-full h-full object-cover" /> : (editFullName || 'Scholar').split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-display-academic text-base font-bold text-white truncate">
                          {editFullName || 'Biochemistry Scholar'}
                        </div>
                        <div className="text-xs font-mono font-bold text-amber-400 mt-0.5">
                          {editMatric || 'Matric Pending'}
                        </div>
                        <div className="text-[11px] text-blue-200 font-medium">
                          {editLevel} · {editProgramme}
                        </div>
                      </div>
                    </div>

                    {/* Details Rows */}
                    <div className="space-y-1.5 text-[11px] bg-blue-950/50 p-3 rounded-lg border border-blue-800/50 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Department:</span>
                        <span className="text-slate-200">{editDepartment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Email:</span>
                        <span className="text-slate-200 truncate max-w-[150px]">{editEmail || 'pending@student.udusok.edu.ng'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Phone:</span>
                        <span className="text-slate-200">{editPhone || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">State:</span>
                        <span className="text-slate-200">{editState || 'Sokoto'}</span>
                      </div>
                    </div>

                    {/* Interests tags */}
                    <div className="mt-4 pt-3 border-t border-blue-800/80">
                      <div className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold mb-2">
                        Registered Interests ({editInterests.length}):
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {editInterests.slice(0, 4).map((int) => (
                          <span key={int} className="text-[9px] bg-blue-900/60 text-blue-200 px-1.5 py-0.5 rounded border border-blue-700/40">
                            {int}
                          </span>
                        ))}
                        {editInterests.length > 4 && (
                          <span className="text-[9px] bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded border border-blue-700/40">
                            +{editInterests.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 text-[10px] text-blue-200">
                      Future aspirations: <span className="font-bold text-white">{editFutureAspirations.length}</span>
                    </div>

                  </div>
                </div>

              </div>
            </form>
          </div>
        )}

        {/* Verified Certificate Modal View */}
        {viewingCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-xl max-w-5xl w-full p-4 sm:p-7 border-4 border-[#0c2340] shadow-2xl relative max-h-[95vh] overflow-y-auto">
              <button
                onClick={() => setViewingCertificate(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-mono"
              >
                ✕
              </button>

              <CertificateArtwork certificate={viewingCertificate} />

              <div className="pt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  Verify at: {viewingCertificate.verificationUrl}
                </span>
                <button
                  onClick={() => downloadCertificatePdf(viewingCertificate)}
                  className="px-4 py-2 rounded bg-blue-900 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Download official PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
