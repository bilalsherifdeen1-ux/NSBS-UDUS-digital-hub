import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Home sections
import { HeroSection } from './components/home/HeroSection';
import { HomeAnnouncements } from './components/home/HomeAnnouncements';
import { HomeUpcomingEvents } from './components/home/HomeUpcomingEvents';
import { HomeResourcesPreview } from './components/home/HomeResourcesPreview';
import { HomeAILabPreview } from './components/home/HomeAILabPreview';
import { HomeProgrammes } from './components/home/HomeProgrammes';
import { HomePresidentMessage } from './components/home/HomePresidentMessage';

// Dedicated views
import { AboutView } from './components/about/AboutView';
import { AcademicsView } from './components/academics/AcademicsView';
import { LibraryView } from './components/library/LibraryView';
import { AILabView } from './components/ailab/AILabView';
import { EventsView } from './components/events/EventsView';
import { OpportunitiesView } from './components/opportunities/OpportunitiesView';
import { ResearchView } from './components/research/ResearchView';
import { ProgrammesView } from './components/programmes/ProgrammesView';
import { ExecutivesView } from './components/executives/ExecutivesView';
import { NewsView } from './components/news/NewsView';
import { GalleryView } from './components/gallery/GalleryView';
import { ContactView } from './components/contact/ContactView';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activePage, toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 xl:pb-0">
      <Navbar />
      <GlobalSearchModal />

      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroSection />
            <HomeAnnouncements />
            <HomeUpcomingEvents />
            <HomeResourcesPreview />
            <HomeAILabPreview />
            <HomeProgrammes />
            <HomePresidentMessage />
          </>
        )}

        {activePage === 'about' && <AboutView />}
        {activePage === 'academics' && <AcademicsView />}
        {activePage === 'resources' && <LibraryView />}
        {activePage === 'ailab' && <AILabView />}
        {activePage === 'events' && <EventsView />}
        {activePage === 'opportunities' && <OpportunitiesView />}
        {activePage === 'research' && <ResearchView />}
        {activePage === 'programmes' && <ProgrammesView />}
        {activePage === 'executives' && <ExecutivesView />}
        {activePage === 'news' && <NewsView />}
        {activePage === 'gallery' && <GalleryView />}
        {activePage === 'contact' && <ContactView />}
        {activePage === 'student-portal' && <StudentDashboard />}
        {activePage === 'admin-dashboard' && <AdminDashboard />}
      </main>

      <Footer />
      <MobileBottomNav />

      {/* Floating System Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-xl bg-slate-900 text-white text-xs border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
          {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
