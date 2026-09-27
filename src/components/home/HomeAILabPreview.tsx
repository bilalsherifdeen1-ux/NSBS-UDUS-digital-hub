import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ExternalLink, ShieldAlert, Cpu, ArrowRight, Brain, FlaskConical, Bot, Settings } from 'lucide-react';
import { AIAgent } from '../../types';

export const HomeAILabPreview: React.FC = () => {
  const { siteSettings, setActivePage, isAdminAuthenticated } = useApp();

  const activeAgents: AIAgent[] = (siteSettings.aiIntegrations?.agents && siteSettings.aiIntegrations.agents.length > 0)
    ? siteSettings.aiIntegrations.agents.filter(a => a.active)
    : [
        {
          id: 'agent-gemini-fallback',
          name: siteSettings.aiIntegrations.geminiAssistant.name,
          provider: 'gemini',
          providerLabel: 'Google Gemini Custom Gem',
          description: siteSettings.aiIntegrations.geminiAssistant.description,
          url: siteSettings.aiIntegrations.geminiAssistant.url,
          active: true,
          capabilities: [
            'Biochemical pathway step-by-step resolution',
            'Michaelis-Menten kinetic derivation tutoring',
            'Carbohydrate & lipid regulation quiz generation'
          ],
          iconType: 'sparkles'
        },
        {
          id: 'agent-gpt-fallback',
          name: siteSettings.aiIntegrations.customGpt.name,
          provider: 'openai',
          providerLabel: 'OpenAI Custom GPT',
          description: siteSettings.aiIntegrations.customGpt.description,
          url: siteSettings.aiIntegrations.customGpt.url,
          active: true,
          capabilities: [
            'Phytochemical literature synthesis and summarization',
            'Standardized lab protocol & notebook formatting',
            'In silico bioinformatics primer troubleshooting'
          ],
          iconType: 'brain'
        }
      ];

  const getAgentTheme = (provider: string) => {
    switch (provider) {
      case 'gemini':
        return {
          border: 'border-blue-800/60 hover:border-blue-400',
          badgeBg: 'bg-blue-950/80 text-blue-300 border-blue-800',
          iconBg: 'bg-blue-600/20 border-blue-500/40 text-blue-400',
          buttonBg: 'bg-blue-600 hover:bg-blue-500',
          Icon: Sparkles
        };
      case 'openai':
        return {
          border: 'border-emerald-900/60 hover:border-emerald-400',
          badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
          iconBg: 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400',
          buttonBg: 'bg-emerald-700 hover:bg-emerald-600',
          Icon: Brain
        };
      case 'claude':
        return {
          border: 'border-purple-900/60 hover:border-purple-400',
          badgeBg: 'bg-purple-950/80 text-purple-300 border-purple-800',
          iconBg: 'bg-purple-600/20 border-purple-500/40 text-purple-400',
          buttonBg: 'bg-purple-700 hover:bg-purple-600',
          Icon: Cpu
        };
      case 'deepseek':
        return {
          border: 'border-cyan-900/60 hover:border-cyan-400',
          badgeBg: 'bg-cyan-950/80 text-cyan-300 border-cyan-800',
          iconBg: 'bg-cyan-600/20 border-cyan-500/40 text-cyan-400',
          buttonBg: 'bg-cyan-700 hover:bg-cyan-600',
          Icon: FlaskConical
        };
      default:
        return {
          border: 'border-indigo-900/60 hover:border-indigo-400',
          badgeBg: 'bg-indigo-950/80 text-indigo-300 border-indigo-800',
          iconBg: 'bg-indigo-600/20 border-indigo-500/40 text-indigo-400',
          buttonBg: 'bg-indigo-700 hover:bg-indigo-600',
          Icon: Bot
        };
    }
  };

  return (
    <section className="py-16 bg-[#0a192f] text-white border-b border-blue-900/60 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-dark-science-grid opacity-15 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-950/80 border border-blue-700/60 text-emerald-400 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>NSBS AI LEARNING ECOSYSTEM</span>
            </div>
            <h2 className="font-display-academic text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              The NSBS AI Lab: Scientific Rigor Meets Artificial Intelligence
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Harness customized artificial intelligence models and interactive study tools to dissect metabolic pathways, verify enzymological kinetics, structure research abstracts, and practice continuous assessment questions.
            </p>
          </div>

          {isAdminAuthenticated && (
            <button
              onClick={() => setActivePage('admin-dashboard')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900/80 hover:bg-blue-800 border border-blue-700 text-white text-xs font-semibold shadow-sm transition-all shrink-0 self-start md:self-auto"
            >
              <Settings className="w-3.5 h-3.5 text-amber-300" />
              <span>Manage AI Agents ({activeAgents.length})</span>
            </button>
          )}
        </div>

        {/* Dynamic AI Models Launch Deck */}
        {activeAgents.length === 0 ? (
          <div className="p-8 rounded-xl bg-slate-900/70 border border-slate-800 text-center mb-10">
            <Bot className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="font-display-academic text-lg font-bold text-white">No Active AI Agents Configured</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              The departmental administration can activate or add AI learning agents in the Admin Portal.
            </p>
            {isAdminAuthenticated && (
              <button
                onClick={() => setActivePage('admin-dashboard')}
                className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Open Admin AI Settings
              </button>
            )}
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${activeAgents.length === 1 ? 'max-w-xl mx-auto' : activeAgents.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 mb-10`}>
            {activeAgents.map((agent) => {
              const theme = getAgentTheme(agent.provider);
              const IconComp = theme.Icon;
              return (
                <div
                  key={agent.id}
                  className={`p-6 rounded-xl bg-slate-900/90 border ${theme.border} shadow-xl transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg ${theme.iconBg} border flex items-center justify-center`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${theme.badgeBg}`}>
                        {agent.providerLabel || 'AI Agent'}
                      </span>
                    </div>

                    <h3 className="font-display-academic text-xl font-bold text-white">
                      {agent.name}
                    </h3>
                    
                    <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                      {agent.description}
                    </p>

                    {agent.capabilities && agent.capabilities.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                        {agent.capabilities.slice(0, 3).map((cap, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span className="line-clamp-1">{cap}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <a
                      href={agent.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full py-2.5 px-4 rounded-lg ${theme.buttonBg} text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors`}
                    >
                      <span>Launch {agent.name.split(' ')[0] || 'Agent'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <div className="text-[10px] text-slate-400 text-center mt-2 truncate">
                      {agent.providerLabel || 'External AI Model'} · Configured by NSBS Admin
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Built-in Study Tools Trigger & Academic Integrity Notice */}
        <div className="p-5 rounded-lg bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-white">Academic Integrity Notice: </span>
              AI outputs must be independently corroborated against authoritative textbooks (Lehninger, Stryer, Harper) and lecture notes. AI does not replace lectures, laboratory supervision, or original scientific analysis.
            </div>
          </div>

          <button
            onClick={() => setActivePage('ailab')}
            className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-colors shrink-0"
          >
            <span>Explore Interactive AI Study Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
