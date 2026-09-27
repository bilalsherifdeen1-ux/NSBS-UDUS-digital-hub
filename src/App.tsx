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

import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { CertificateArtwork } from './components/common/CertificateArtwork';

const StudentDashboard = React.lazy(() => import('./components/student/StudentDashboard').then(module => ({ default: module.StudentDashboard })));
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AboutView = React.lazy(() => import('./components/about/AboutView').then(module => ({ default: module.AboutView })));
const AcademicsView = React.lazy(() => import('./components/academics/AcademicsView').then(module => ({ default: module.AcademicsView })));
const LibraryView = React.lazy(() => import('./components/library/LibraryView').then(module => ({ default: module.LibraryView })));
const AILabView = React.lazy(() => import('./components/ailab/AILabView').then(module => ({ default: module.AILabView })));
const EventsView = React.lazy(() => import('./components/events/EventsView').then(module => ({ default: module.EventsView })));
const OpportunitiesView = React.lazy(() => import('./components/opportunities/OpportunitiesView').then(module => ({ default: module.OpportunitiesView })));
const ResearchView = React.lazy(() => import('./components/research/ResearchView').then(module => ({ default: module.ResearchView })));
const ProgrammesView = React.lazy(() => import('./components/programmes/ProgrammesView').then(module => ({ default: module.ProgrammesView })));
const ExecutivesView = React.lazy(() => import('./components/executives/ExecutivesView').then(module => ({ default: module.ExecutivesView })));
const NewsView = React.lazy(() => import('./components/news/NewsView').then(module => ({ default: module.NewsView })));
const GalleryView = React.lazy(() => import('./components/gallery/GalleryView').then(module => ({ default: module.GalleryView })));
const ContactView = React.lazy(() => import('./components/contact/ContactView').then(module => ({ default: module.ContactView })));

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

      <React.Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-sm font-semibold text-slate-600">Loading portal…</div>}>
      <main className="flex-1">
        {verificationCode ? (
          <section className="min-h-[75vh] bg-slate-50 px-4 py-12 sm:px-8">
            <div className="mx-auto max-w-5xl space-y-6">
              <div className={`rounded-xl border p-6 shadow-sm ${verifiedCertificate ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
                <div className="flex items-center gap-3">
                  {verifiedCertificate ? <CheckCircle2 className="h-8 w-8 shrink-0 text-emerald-700" /> : <AlertTriangle className="h-8 w-8 shrink-0 text-amber-700" />}
                  <div>
                    <h1 className="font-display-academic text-xl font-bold text-slate-900">{verifiedCertificate ? 'Certificate record found on this device' : 'No certificate record found on this device'}</h1>
                    <p className="mt-1 break-all font-mono text-xs text-slate-600">Verification code: {verificationCode}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-700">This page only matches certificate records saved in the current browser. It is not a central NSBS registry and cannot independently authenticate a certificate.</p>
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
      </React.Suspense>

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
