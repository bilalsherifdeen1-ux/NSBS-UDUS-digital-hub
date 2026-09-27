import React, { useState, useRef, useEffect } from 'react';
import { useApp, ActivePage } from '../../context/AppContext';
import { NotificationItem } from '../../types';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Bell, 
  User, 
  ShieldCheck, 
  Lock,
  LogOut,
  GraduationCap,
  CheckCheck,
  Check,
  Calendar,
  FileText,
  Sparkles,
  Award,
  ExternalLink,
  Clock,
  BellOff
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    userRole, 
    currentUser, 
    isAdminAuthenticated,
    adminLogout,
    studentLogout,
    setIsSearchOpen, 
    notifications,
    markNotificationRead,
    markAllNotificationsRead
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [notifFilter, setNotifFilter] = useState<'all' | 'unread'>('all');

  const notifDropdownRef = useRef<HTMLDivElement>(null);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setShowNotificationsDropdown(false);
      }
    };

    if (showNotificationsDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificationsDropdown]);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setShowNotificationsDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNotificationClick = (n: NotificationItem) => {
    markNotificationRead(n.id);
    if (n.type === 'opportunity') {
      navigateTo('opportunities');
    } else if (n.type === 'resource') {
      navigateTo('resources');
    } else if (n.type === 'event') {
      navigateTo('events');
    } else if (n.type === 'announcement') {
      navigateTo('news');
    } else {
      navigateTo('student-portal');
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (notifFilter === 'unread') return !n.read;
    return true;
  });

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'event':
        return <Calendar className="w-3.5 h-3.5 text-blue-600" />;
      case 'resource':
        return <FileText className="w-3.5 h-3.5 text-emerald-600" />;
      case 'announcement':
        return <Sparkles className="w-3.5 h-3.5 text-amber-600" />;
      case 'opportunity':
        return <Award className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  const getNotifBg = (type: NotificationItem['type']) => {
    switch (type) {
      case 'event':
        return 'bg-blue-50 border-blue-200';
      case 'resource':
        return 'bg-emerald-50 border-emerald-200';
      case 'announcement':
        return 'bg-amber-50 border-amber-200';
      case 'opportunity':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-slate-100 border-slate-200';
    }
  };

  const navLinks: { label: string; page: ActivePage; dropdown?: { label: string; page: ActivePage; desc: string }[] }[] = [
    { label: 'Home', page: 'home' },
    { 
      label: 'About', 
      page: 'about',
      dropdown: [
        { label: 'About NSBS & Vision', page: 'about', desc: 'Mission, history & strategic priorities' },
        { label: 'Executive Team', page: 'executives', desc: '19 Executive Offices & past administrations' },
        { label: 'Biochemistry Knowledge Base', page: 'about', desc: 'Career paths, safety & project guidance' }
      ]
    },
    { 
      label: 'Academics', 
      page: 'academics',
      dropdown: [
        { label: 'Curriculum & Syllabi (100L-400L)', page: 'academics', desc: 'Official NUC & departmental courses' },
        { label: 'Tutorial Classes', page: 'academics', desc: 'Weekly CATC timetable & assigned tutors' },
        { label: 'Past Questions Bank', page: 'resources', desc: 'Departmental past examinations repository' }
      ]
    },
    { label: 'Digital Library', page: 'resources' },
    { label: 'AI Lab', page: 'ailab' },
    { label: 'Events', page: 'events' },
    { label: 'Opportunities', page: 'opportunities' },
    { label: 'Research', page: 'research' },
    { label: 'Programmes', page: 'programmes' },
    { label: 'Executives', page: 'executives' },
    { label: 'News', page: 'news' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Institutional Banner */}
      <div className="bg-[#0b1b33] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wider uppercase text-blue-200 text-[11px]">
              Usmanu Danfodiyo University, Sokoto
            </span>
            <span className="text-slate-400 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-slate-300 hidden sm:inline text-[11px]">
              Faculty of Chemical & Life Sciences · Dept. of Biochemistry
            </span>
            <span className="text-slate-400 hidden md:inline" aria-hidden="true">·</span>
            <span className="text-emerald-400 font-mono text-[11px] hidden md:inline">
              Session: 2026/2027
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-xs">
            {/* Authenticated Admin Status Badge */}
            {isAdminAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('admin-dashboard')}
                  className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 hover:bg-amber-400/30 transition-colors font-bold text-[11px]"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Session Active</span>
                </button>
                <button
                  onClick={adminLogout}
                  className="text-slate-300 hover:text-red-300 transition-colors flex items-center gap-1 text-[11px]"
                  title="Sign out of admin"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('student-portal')}
                  className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 hover:bg-emerald-900 transition-colors text-[11px]"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentUser.fullName} ({currentUser.level})</span>
                </button>
                <button
                  onClick={studentLogout}
                  className="text-slate-300 hover:text-red-300 transition-colors flex items-center gap-1 text-[11px]"
                  title="Sign out of student portal"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigateTo('student-portal')}
                  className="text-slate-300 hover:text-white transition-colors text-[11px]"
                >
                  Student Access
                </button>
                <button
                  onClick={() => navigateTo('admin-dashboard')}
                  className="flex items-center gap-1 text-slate-300 hover:text-amber-300 transition-colors text-[11px]"
                  title="Restricted Administrative Access"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo & Academic Crest */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none min-w-0"
          >
            {/* Scientific Insignia Crest */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#0c2340] to-[#1d3557] flex items-center justify-center text-white shadow-sm border border-blue-900/30 group-hover:border-blue-600 transition-all shrink-0">
              <div className="relative flex flex-col items-center">
                <span className="font-display-academic font-bold text-xs sm:text-sm tracking-wider text-amber-400 leading-none">UDUS</span>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-blue-200 mt-0.5 leading-none">NSBS</span>
              </div>
            </div>
            
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="font-display-academic text-xs sm:text-sm md:text-base font-bold tracking-tight text-[#0c2340] whitespace-nowrap truncate max-w-[195px] xs:max-w-[275px] sm:max-w-[390px] md:max-w-none">
                  NIGERIAN SOCIETY OF BIOCHEMISTRY STUDENTS
                </span>
                <span className="shrink-0 text-[10px] font-mono font-bold bg-[#0c2340] text-amber-300 border border-blue-900/40 px-1.5 py-0.5 rounded leading-none shadow-xs">
                  UDUS
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap mt-0.5 min-w-0">
                <span className="text-slate-600 font-semibold tracking-wide truncate max-w-[185px] xs:max-w-[255px] sm:max-w-none">
                  USMANU DANFODIYO UNIVERSITY, SOKOTO
                </span>
                <span aria-hidden="true" className="text-slate-300 hidden sm:inline shrink-0">·</span>
                <span className="text-emerald-700 font-medium hidden sm:inline shrink-0">UDUS Chapter</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 7).map((link) => (
              <div key={link.label} className="relative group">
                <button
                  onClick={() => !link.dropdown && navigateTo(link.page)}
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 rounded-md ${
                    activePage === link.page 
                      ? 'text-blue-900 font-bold bg-blue-50/80' 
                      : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.dropdown && <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform" />}
                </button>

                {link.dropdown && activeDropdown === link.label && (
                  <div 
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 w-72 bg-white border border-slate-200 shadow-xl rounded-lg py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-1"
                  >
                    {link.dropdown.map((subItem) => (
                      <button
                        key={subItem.label}
                        onClick={() => navigateTo(subItem.page)}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors block"
                      >
                        <div className="text-sm font-semibold text-slate-800">{subItem.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{subItem.desc}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* More Menu for additional items */}
            <div className="relative group">
              <button 
                className="px-2.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 flex items-center gap-1"
                onMouseEnter={() => setActiveDropdown('More')}
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'More' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full right-0 w-60 bg-white border border-slate-200 shadow-xl rounded-lg py-2 mt-1 z-50 animate-in fade-in"
                >
                  <button onClick={() => navigateTo('executives')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-semibold text-blue-950 flex items-center justify-between">
                    <span>Executive Team (19)</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono">19</span>
                  </button>
                  <button onClick={() => navigateTo('programmes')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium text-slate-700">
                    2026/2027 Programmes
                  </button>
                  <button onClick={() => navigateTo('research')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium text-slate-700">
                    Research & Publications
                  </button>
                  <button onClick={() => navigateTo('news')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium text-slate-700">
                    News & Announcements
                  </button>
                  <button onClick={() => navigateTo('gallery')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium text-slate-700">
                    Photo & Media Gallery
                  </button>
                  <button onClick={() => navigateTo('contact')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium text-slate-700">
                    Student Voice / Suggestion Box
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Action Hub (Search, Notifications, Portal Buttons, Hamburger) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="h-9 sm:h-10 px-2.5 sm:px-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200/80 transition-colors flex items-center justify-center gap-1.5 shrink-0"
              title="Search library, events, announcements (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="text-[11px] text-slate-400 hidden lg:inline font-mono font-medium">⌘K</span>
            </button>

            {/* Notifications Trigger */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                className={`h-9 sm:h-10 w-9 sm:w-10 rounded-lg border transition-colors flex items-center justify-center relative shrink-0 ${
                  showNotificationsDropdown 
                    ? 'text-blue-900 bg-blue-50 border-blue-300' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200/80'
                }`}
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white animate-pulse" />
                )}
              </button>

              {/* Mobile Backdrop to cleanly close on tap */}
              {showNotificationsDropdown && (
                <div 
                  className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 sm:hidden"
                  onClick={() => setShowNotificationsDropdown(false)}
                />
              )}

              {/* Notifications Popover: Never hides off-screen! */}
              {showNotificationsDropdown && (
                <div 
                  ref={notifDropdownRef}
                  className="fixed inset-x-3 top-20 sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[410px] max-w-[calc(100vw-1.5rem)] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col text-xs animate-in fade-in zoom-in-95 duration-150"
                >
                  {/* Standard Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-blue-50/60 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-900 text-white rounded-lg shadow-sm">
                        <Bell className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">Notifications</span>
                          {unreadNotifs > 0 ? (
                            <span className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {unreadNotifs} unread
                            </span>
                          ) : (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Caught up
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono block">NSBS UDUS Chapter Broadcasts</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {unreadNotifs > 0 && (
                        <button
                          onClick={() => markAllNotificationsRead()}
                          className="text-[11px] text-blue-900 font-semibold hover:bg-blue-100/70 px-2 py-1 rounded transition-colors flex items-center gap-1"
                          title="Mark all notifications as read"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Mark all read</span>
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotificationsDropdown(false)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Close notifications"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Standard Filter Tabs */}
                  <div className="px-4 py-2 border-b border-slate-100 bg-white flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setNotifFilter('all')}
                        className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                          notifFilter === 'all'
                            ? 'bg-blue-900 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        All ({notifications.length})
                      </button>
                      <button
                        onClick={() => setNotifFilter('unread')}
                        className={`px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                          notifFilter === 'unread'
                            ? 'bg-blue-900 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span>Unread</span>
                        {unreadNotifs > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            notifFilter === 'unread' ? 'bg-white text-blue-950' : 'bg-red-100 text-red-700'
                          }`}>
                            {unreadNotifs}
                          </span>
                        )}
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">Tap item to view</span>
                  </div>

                  {/* Notification List with proper responsive scrolling */}
                  <div className="max-h-[350px] sm:max-h-[380px] overflow-y-auto divide-y divide-slate-100">
                    {filteredNotifs.length === 0 ? (
                      <div className="py-12 px-4 text-center flex flex-col items-center justify-center text-slate-400 space-y-2">
                        <BellOff className="w-9 h-9 text-slate-300 mb-1" />
                        <div className="text-xs font-bold text-slate-700">All caught up!</div>
                        <div className="text-[11px] text-slate-400 max-w-[200px] leading-relaxed">
                          {notifFilter === 'unread' 
                            ? 'No unread notifications to review right now.' 
                            : 'No announcements or broadcasts currently available.'}
                        </div>
                      </div>
                    ) : (
                      filteredNotifs.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n)}
                          className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3 text-left ${
                            !n.read ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          {/* Type Icon Badge */}
                          <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${getNotifBg(n.type)}`}>
                            {getNotifIcon(n.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className={`font-semibold text-xs truncate ${!n.read ? 'text-blue-950 font-bold' : 'text-slate-800'}`}>
                                {n.title}
                              </span>
                              {!n.read && (
                                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" title="Unread" />
                              )}
                            </div>

                            <p className="text-slate-600 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                              {n.message}
                            </p>

                            <div className="flex items-center justify-between gap-2 mt-2 text-[10px] text-slate-400">
                              <div className="flex items-center gap-1 font-mono">
                                <Clock className="w-3 h-3" />
                                <span>{n.date}</span>
                              </div>
                              <span className="text-blue-900 font-semibold hover:underline flex items-center gap-0.5">
                                <span>Open details</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Standard Footer with Quick Actions */}
                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button 
                      onClick={() => { navigateTo('student-portal'); setShowNotificationsDropdown(false); }}
                      className="text-blue-900 font-bold hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Student Portal Hub</span>
                    </button>
                    <button 
                      onClick={() => { navigateTo('news'); setShowNotificationsDropdown(false); }}
                      className="text-slate-600 hover:text-slate-900 font-semibold text-[11px]"
                    >
                      All Announcements →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dedicated Portal Action Buttons */}
            {isAdminAuthenticated ? (
              <button
                onClick={() => navigateTo('admin-dashboard')}
                className="h-9 sm:h-10 flex items-center gap-1.5 px-3 sm:px-3.5 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 border border-amber-500/50 rounded-lg transition-all shadow-xs shrink-0"
                title="Admin Dashboard"
              >
                <ShieldCheck className="w-4 h-4 shrink-0 text-amber-900" />
                <span className="hidden sm:inline">Admin CMS</span>
              </button>
            ) : currentUser ? (
              <button
                onClick={() => navigateTo('student-portal')}
                className="h-9 sm:h-10 flex items-center gap-1.5 px-2.5 sm:px-3.5 text-xs font-semibold text-white bg-[#0c2340] hover:bg-[#15345d] border border-blue-900 rounded-lg transition-colors shadow-xs shrink-0"
                title="Student Hub"
              >
                <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="hidden sm:inline">Student Hub</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('student-portal')}
                className="h-9 sm:h-10 flex items-center gap-1.5 px-2.5 sm:px-3.5 text-xs font-semibold text-white bg-[#0c2340] hover:bg-[#15345d] border border-blue-900 rounded-lg transition-colors shadow-xs shrink-0"
                title="Student Portal"
              >
                <User className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Student Portal</span>
              </button>
            )}

            {/* Mobile Hamburger Menu (Three horizontal lines) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden h-9 sm:h-10 w-9 sm:w-10 flex items-center justify-center rounded-lg transition-colors shrink-0 border ${
                mobileMenuOpen 
                  ? 'bg-blue-900 text-white border-blue-900 shadow-xs' 
                  : 'text-slate-700 hover:text-blue-900 hover:bg-slate-100 border-slate-200/80'
              }`}
              aria-label="Toggle navigation menu"
              title="Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 max-h-[85vh] overflow-y-auto">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-blue-900 uppercase">
              NSBS Navigation Menu
            </span>
            <span className="text-[11px] text-slate-500 font-mono">Session 2026/2027</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
            <button
              onClick={() => navigateTo('student-portal')}
              className="py-2.5 px-3 text-center text-xs font-bold rounded-lg bg-[#0c2340] text-white flex items-center justify-center gap-1.5 shadow-sm"
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </button>
            <button
              onClick={() => navigateTo('admin-dashboard')}
              className="py-2.5 px-3 text-center text-xs font-bold rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>

          <div className="space-y-1 pt-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigateTo(link.page)}
                className={`w-full text-left px-3.5 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  activePage === link.page 
                    ? 'bg-blue-50 text-blue-950 font-bold border-l-4 border-blue-900' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.label === 'Executives' && (
                  <span className="text-[10px] bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-mono font-bold">
                    19
                  </span>
                )}
              </button>
            ))}
          </div>

          {isAdminAuthenticated && (
            <div className="pt-3 border-t border-slate-200">
              <button
                onClick={adminLogout}
                className="w-full py-2.5 text-center text-xs font-bold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out Admin Session</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
