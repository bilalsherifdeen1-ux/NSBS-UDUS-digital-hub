import React from 'react';
import { useApp, ActivePage } from '../../context/AppContext';
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink, Edit3, MessageCircle, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, siteSettings, isAdminAuthenticated } = useApp();

  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminEditSettings = () => {
    sessionStorage.setItem('nsbs_admin_section', 'settings');
    navigateTo('admin-dashboard');
  };

  const openPastAdministrations = () => {
    sessionStorage.setItem('nsbs_executives_tab', 'past');
    navigateTo('executives');
    window.dispatchEvent(new Event('nsbs:open-past-executives'));
  };

  return (
    <footer className="bg-[#081528] text-slate-300 border-t border-slate-800 text-sm">
      {/* Upper Footer: Core Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Organization & University Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-blue-900/60 border border-blue-700/60 flex items-center justify-center font-display-academic font-bold text-amber-400">
                UDUS
              </div>
              <div>
                <span className="font-display-academic text-white font-bold text-base block leading-tight">
                  NIGERIAN SOCIETY OF BIOCHEMISTRY STUDENTS
                </span>
                <span className="text-xs text-blue-300 font-medium">
                  Usmanu Danfodiyo University, Sokoto · {siteSettings.session.replace(/\s*Academic Session$/i, '')}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              &ldquo;{siteSettings.motto}&rdquo;
            </p>

            {/* Official Contact Details */}
            <div className="text-xs text-slate-400 space-y-2 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{siteSettings.departmentAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a 
                  href={`mailto:${siteSettings.officialEmail}`} 
                  className="hover:text-amber-300 transition-colors font-medium text-slate-300"
                  title="Send official inquiry"
                >
                  {siteSettings.officialEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a 
                  href={`tel:${siteSettings.officialPhone}`} 
                  className="hover:text-amber-300 transition-colors font-medium text-slate-300 font-mono"
                  title="Call departmental helpline"
                >
                  {siteSettings.officialPhone}
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Official Digital Communities:
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {siteSettings.socials.whatsapp && (
                  <a 
                    href={siteSettings.socials.whatsapp} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-2.5 py-1 rounded bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 text-[11px] font-medium transition-colors"
                  >
                    WhatsApp Community
                  </a>
                )}
                {siteSettings.socials.linkedin && (
                  <a 
                    href={siteSettings.socials.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-2.5 py-1 rounded bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-700/50 text-[11px] font-medium transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {siteSettings.socials.twitter && (
                  <a 
                    href={siteSettings.socials.twitter} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-medium transition-colors"
                  >
                    X (Twitter)
                  </a>
                )}
                {siteSettings.socials.instagram && (
                  <a 
                    href={siteSettings.socials.instagram} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-2.5 py-1 rounded bg-pink-950/70 hover:bg-pink-900/80 text-pink-300 border border-pink-700/50 text-[11px] font-medium transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {siteSettings.socials.facebook && (
                  <a 
                    href={siteSettings.socials.facebook} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-2.5 py-1 rounded bg-blue-950/60 hover:bg-blue-900 text-blue-200 border border-blue-800/40 text-[11px] font-medium transition-colors"
                  >
                    Facebook
                  </a>
                )}
                {siteSettings.socials.telegram && (
                  <a 
                    href={siteSettings.socials.telegram} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-2.5 py-1 rounded bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-700/50 text-[11px] font-medium transition-colors"
                  >
                    Telegram
                  </a>
                )}
                {siteSettings.socials.youtube && (
                  <a 
                    href={siteSettings.socials.youtube} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-2.5 py-1 rounded bg-red-950/70 hover:bg-red-900 text-red-300 border border-red-700/50 text-[11px] font-medium transition-colors"
                  >
                    YouTube
                  </a>
                )}
              </div>
            </div>

            {/* Admin Quick Edit Shortcut */}
            {isAdminAuthenticated && (
              <div className="pt-2">
                <button
                  onClick={handleAdminEditSettings}
                  className="px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Footer Info &amp; Links in Admin CMS</span>
                </button>
              </div>
            )}
          </div>

          {/* Academic Columns */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Academic Hub
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('resources')} className="text-slate-400 hover:text-white transition-colors">
                  Digital Biochemistry Library
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('academics')} className="text-slate-400 hover:text-white transition-colors">
                  Course Outlines (100L - 400L)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('academics')} className="text-slate-400 hover:text-white transition-colors">
                  Constant Tutorial Classes (CATC)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('resources')} className="text-slate-400 hover:text-white transition-colors">
                  Past Examination Archives
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('research')} className="text-slate-400 hover:text-white transition-colors">
                  Final-Year Project Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Student & AI Lab */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Innovation & Portal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('ailab')} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-400">●</span>
                  <span>NSBS AI Lab</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('student-portal')} className="text-slate-400 hover:text-white transition-colors">
                  Student Dashboard Login
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('events')} className="text-slate-400 hover:text-white transition-colors">
                  Academic Calendar & Events
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('opportunities')} className="text-slate-400 hover:text-white transition-colors">
                  Scholarships & Fellowships
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('programmes')} className="text-slate-400 hover:text-white transition-colors">
                  Biotech Innovation Challenge
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Institutional Integrity */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Society & Governance
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('about')} className="text-slate-400 hover:text-white transition-colors">
                  Society Mission & Objectives
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('executives')} className="text-slate-400 hover:text-white transition-colors">
                  Executive Council {siteSettings.session.replace(/\s*Academic Session$/i, '')}
                </button>
              </li>
              <li>
                <button onClick={openPastAdministrations} className="text-slate-400 hover:text-white transition-colors">
                  Past Administrations Archive
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="text-slate-400 hover:text-white transition-colors">
                  Student Voice Ombudsman
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin-dashboard')} className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
                  Administrator CMS Portal
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Middle Academic & Ethical Disclosure */}
      <div className="bg-[#050e1b] py-6 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Digital Ethics, Fair-Use Academic Repository & Responsible AI Charter</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            The NSBS UDUS Digital Library utilizes external cloud repositories (such as Google Drive) to catalog peer-reviewed research, public syllabi, and departmental study materials solely for non-commercial educational instruction under the fair-use doctrine of the Nigerian Copyright Act and international open-access academic standards. Artificial Intelligence tools hosted or linked via the NSBS AI Lab are designed strictly as supplementary study aids. All scientific outputs, metabolic kinetic pathways, and clinical citations generated through AI must be independently corroborated with primary academic literature and verified under faculty supervision.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#030913] py-4 border-t border-slate-900 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} Nigerian Society of Biochemistry Students (NSBS), Usmanu Danfodiyo University, Sokoto. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>NUC Approved Curriculum</span>
            <span>·</span>
            <span>Faculty of Chemical & Life Sciences</span>
            <span>·</span>
            <span className="font-mono text-emerald-400">{siteSettings.session}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
