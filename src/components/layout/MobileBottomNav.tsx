import React from 'react';
import { useApp, ActivePage } from '../../context/AppContext';
import { 
  Home, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  Users, 
  User, 
  ShieldCheck 
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activePage, setActivePage, isAdminAuthenticated, currentUser } = useApp();

  const navItems: { label: string; page: ActivePage; icon: React.ReactNode }[] = [
    { label: 'Home', page: 'home', icon: <Home className="w-5 h-5" /> },
    { label: 'Library', page: 'resources', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'AI Lab', page: 'ailab', icon: <Sparkles className="w-5 h-5" /> },
    { label: 'Events', page: 'events', icon: <Calendar className="w-5 h-5" /> },
    { label: 'Execs', page: 'executives', icon: <Users className="w-5 h-5" /> },
    isAdminAuthenticated
      ? { label: 'Admin', page: 'admin-dashboard', icon: <ShieldCheck className="w-5 h-5 text-amber-400" /> }
      : currentUser
      ? { label: 'Portal', page: 'student-portal', icon: <User className="w-5 h-5 text-emerald-400" /> }
      : { label: 'Portal', page: 'student-portal', icon: <User className="w-5 h-5" /> }
  ];

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-xl py-1 px-2 flex items-center justify-around select-none">
      {navItems.map((item) => {
        const isActive = activePage === item.page;
        return (
          <button
            key={item.label}
            onClick={() => {
              setActivePage(item.page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-all ${
              isActive 
                ? 'text-blue-900 font-bold scale-105' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className={`p-1 rounded-md transition-colors ${isActive ? 'bg-blue-50 text-blue-900' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
