import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { siteSettings, submitFeedback, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'contact' | 'voice'>('voice');

  // Contact Form State
  const [contactName, setContactName] = useState(currentUser?.fullName || '');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSpamCheck, setContactSpamCheck] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Student Voice State
  const [voiceCategory, setVoiceCategory] = useState<'Academic' | 'Welfare' | 'Events' | 'Resources' | 'Leadership' | 'Facilities' | 'Other'>('Academic');
  const [voiceSubject, setVoiceSubject] = useState('');
  const [voiceMessage, setVoiceMessage] = useState('');
  const [voiceIsAnonymous, setVoiceIsAnonymous] = useState(false);
  const [voiceSubmitted, setVoiceSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactSpamCheck.trim() !== '4') {
      alert('Spam protection answer is incorrect (2 + 2 = 4).');
      return;
    }

    submitFeedback({
      name: contactName,
      email: contactEmail,
      subject: `[General Enquiry] ${contactSubject}`,
      message: contactMessage,
      category: 'Other',
      isAnonymous: false
    });

    setContactSubmitted(true);
    setContactSubject('');
    setContactMessage('');
    setContactSpamCheck('');
  };

  const handleVoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voiceSubject || !voiceMessage) return;

    submitFeedback({
      name: voiceIsAnonymous ? 'Anonymous Student' : (currentUser?.fullName || 'UDUS Student'),
      email: voiceIsAnonymous ? undefined : (currentUser?.email || 'student@udusok.edu.ng'),
      subject: voiceSubject,
      message: voiceMessage,
      category: voiceCategory,
      isAnonymous: voiceIsAnonymous
    });

    setVoiceSubmitted(true);
    setVoiceSubject('');
    setVoiceMessage('');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-blue-900" />
              <span>Secretariat &amp; Ombudsman Services</span>
            </div>
            
            <h1 className="font-display-academic text-3xl sm:text-4xl font-bold text-slate-900">
              Contact NSBS &amp; Student Voice Portal
            </h1>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Reach out to the Executive Council, Departmental Headship, or submit confidential feedback regarding academic challenges, lecture notes, or student welfare.
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('voice')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'voice'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Student Voice / Feedback Ombudsman</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Official Inquiries &amp; Secretariat Contact</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form Area */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            
            {/* Student Voice Tab */}
            {activeTab === 'voice' && (
              <div>
                <div className="mb-6">
                  <h2 className="font-display-academic text-2xl font-bold text-slate-900">
                    Student Voice Ombudsman System
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Your voice matters. Submit concerns, course registration delays, textbook requests, or welfare issues. You may choose to submit anonymously.
                  </p>
                </div>

                {voiceSubmitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h3 className="font-display-academic text-xl font-bold text-emerald-950">
                      Feedback Successfully Received
                    </h3>
                    <p className="text-xs text-emerald-800 max-w-md mx-auto">
                      Your message has been assigned a confidential tracking ticket and forwarded to the Vice President and Executive Ombudsman Committee.
                    </p>
                    <button
                      onClick={() => setVoiceSubmitted(false)}
                      className="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
                    >
                      Submit Another Concern
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleVoiceSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Feedback Category:
                        </label>
                        <select
                          value={voiceCategory}
                          onChange={(e) => setVoiceCategory(e.target.value as any)}
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                        >
                          <option value="Academic">Academic (Lectures, Tutorials, Past Questions)</option>
                          <option value="Welfare">Student Welfare &amp; Health</option>
                          <option value="Facilities">Laboratory Equipment &amp; Lecture Halls</option>
                          <option value="Resources">Digital Library &amp; Google Drive Files</option>
                          <option value="Events">NSBS Week &amp; Programmes</option>
                          <option value="Leadership">Executive Accountability &amp; Congress</option>
                          <option value="Other">Other Issues</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Submission Privacy:
                        </label>
                        <div className="flex items-center gap-3 pt-2">
                          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              name="anon"
                              checked={!voiceIsAnonymous}
                              onChange={() => setVoiceIsAnonymous(false)}
                              className="text-blue-900"
                            />
                            <span>Include My Student Details</span>
                          </label>

                          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              name="anon"
                              checked={voiceIsAnonymous}
                              onChange={() => setVoiceIsAnonymous(true)}
                              className="text-blue-900"
                            />
                            <span className="font-semibold text-emerald-800">100% Anonymous</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subject / Brief Title:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Request for additional BCH 301 tutorial before continuous assessment..."
                        value={voiceSubject}
                        onChange={(e) => setVoiceSubject(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Detailed Message / Suggestion:
                      </label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Describe the issue clearly, including course codes or specific dates where relevant..."
                        value={voiceMessage}
                        onChange={(e) => setVoiceMessage(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>Deliver to Executive Council</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Official Contact Tab */}
            {activeTab === 'contact' && (
              <div>
                <div className="mb-6">
                  <h2 className="font-display-academic text-2xl font-bold text-slate-900">
                    Official Secretariat Inquiries
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    For corporate partnerships, inter-university collaborations, guest speaker invitations, and general inquiries.
                  </p>
                </div>

                {contactSubmitted ? (
                  <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-blue-900 mx-auto" />
                    <h3 className="font-display-academic text-xl font-bold text-slate-900">
                      Message Dispatched
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Thank you for contacting the NSBS Secretariat. Our General Secretary will respond within 48 business hours.
                    </p>
                    <button
                      onClick={() => setContactSubmitted(false)}
                      className="px-4 py-2 rounded bg-blue-900 text-white text-xs font-semibold"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name:</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address:</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Subject:</label>
                      <input
                        type="text"
                        required
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Message:</label>
                      <textarea
                        rows={4}
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                      />
                    </div>

                    {/* Anti-spam math protection */}
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                      <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                        Security verification: What is 2 + 2?
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Answer"
                        value={contactSpamCheck}
                        onChange={(e) => setContactSpamCheck(e.target.value)}
                        className="w-20 p-1.5 rounded border border-slate-300 text-xs text-center"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit Official Communication</span>
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>

          {/* Official Contact Info Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-display-academic text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Official Departmental Information
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800">Physical Secretariat</div>
                    <div className="mt-0.5 leading-relaxed">{siteSettings.departmentAddress}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800">Email Address</div>
                    <div className="mt-0.5">{siteSettings.officialEmail}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800">Official Helpline</div>
                    <div className="mt-0.5">{siteSettings.officialPhone}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0c2340] to-[#15345d] text-white rounded-xl p-6 shadow-sm space-y-3 text-xs">
              <div className="font-display-academic text-base font-bold text-amber-300">
                Presidential Hours
              </div>
              <p className="text-slate-300 leading-relaxed">
                The President and General Secretary hold physical office hours for student consultations on Mondays and Wednesdays (2:00 PM – 4:00 PM) at the NSBS Secretariat room, Lab Complex.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
