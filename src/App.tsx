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
import { CertificateArtwork } from './components/common/CertificateArtwork';

const MainContent: React.FC = () => {
  const { activePage, toast, certificates, setActivePage } = useApp();
  const verificationCode = new URLSearchParams(window.location.search).get('certificate');
  const verifiedCertificate = verificationCode
    ? certificates.find(certificate => certificate.certificateCode.toUpperCase() === verificationCode.trim().toUpperCase())
    : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 xl:pb-0">
      <Navbar />
      <GlobalSearchModal />

      <main className="flex-1">
        {verificationCode ? (
          <section className="min-h-[75vh] bg-slate-50 px-4 py-12 sm:px-8">
            <div className="mx-auto max-w-5xl space-y-6">
              <div className={`rounded-xl border p-6 shadow-sm ${verifiedCertificate ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
                <div className="flex items-center gap-3">
                  {verifiedCertificate ? <CheckCircle2 className="h-8 w-8 shrink-0 text-emerald-700" /> : <AlertTriangle className="h-8 w-8 shrink-0 text-amber-700" />}
                  <div>
                    <h1 className="font-display-academic text-xl font-bold text-slate-900">{verifiedCertificate ? 'Certificate found in the NSBS registry' : 'Certificate record not found'}</h1>
                    <p className="mt-1 break-all font-mono text-xs text-slate-600">Verification code: {verificationCode}</p>
                  </div>
                </div>
                {!verifiedCertificate && <p className="mt-4 text-sm text-slate-700">Check that you have the complete code and try again. This browser's stored NSBS registry does not contain this certificate.</p>}
              </div>
              {verifiedCertificate && <CertificateArtwork certificate={verifiedCertificate} />}
              <button onClick={() => { window.history.replaceState({}, '', window.location.pathname); setActivePage('home'); }} className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">Return to NSBS homepage</button>
            </div>
          </section>
        ) : activePage === 'home' && (
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

        {!verificationCode && activePage === 'about' && <AboutView />}
        {!verificationCode && activePage === 'academics' && <AcademicsView />}
        {!verificationCode && activePage === 'resources' && <LibraryView />}
        {!verificationCode && activePage === 'ailab' && <AILabView />}
        {!verificationCode && activePage === 'events' && <EventsView />}
        {!verificationCode && activePage === 'opportunities' && <OpportunitiesView />}
        {!verificationCode && activePage === 'research' && <ResearchView />}
        {!verificationCode && activePage === 'programmes' && <ProgrammesView />}
        {!verificationCode && activePage === 'executives' && <ExecutivesView />}
        {!verificationCode && activePage === 'news' && <NewsView />}
        {!verificationCode && activePage === 'gallery' && <GalleryView />}
        {!verificationCode && activePage === 'contact' && <ContactView />}
        {!verificationCode && activePage === 'student-portal' && <StudentDashboard />}
        {!verificationCode && activePage === 'admin-dashboard' && <AdminDashboard />}
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
