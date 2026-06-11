import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Activity, Heart, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface LayoutProps {
  activeTab: 'cardiology' | 'nephrology';
  setActiveTab: (tab: 'cardiology' | 'nephrology') => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  activeTab,
  setActiveTab,
  children,
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen pb-16 flex flex-col items-center">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-20 opacity-40"></div>
      
      {/* Decorative top light bar */}
      <div className="w-full h-1.5 bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500"></div>

      {/* Main Header Container */}
      <header className="w-full max-w-5xl px-4 mt-6 md:mt-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Activity className="w-6 h-6 animate-pulse" />
            <div className="absolute inset-0 w-full h-full rounded-2xl border border-cyan-400/20 scale-110 animate-ping opacity-25"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight font-display bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent m-0 leading-none">
                {t('app.title')}
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                v1.0 MVP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-1">
              {t('app.tagline')}
            </p>
          </div>
        </div>

        {/* Global actions: Language Selection */}
        <div className="flex items-center gap-4">
          <LanguageSelector />
        </div>
      </header>

      {/* Specialty Navigation bar */}
      <nav className="w-full max-w-3xl px-4 mb-8 z-10">
        <div className="glass-panel p-1.5 rounded-2xl flex items-center justify-between border border-glass-border shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
          {/* Cardiology Tab */}
          <button
            onClick={() => setActiveTab('cardiology')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer relative z-10 ${
              activeTab === 'cardiology'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart size={18} className={activeTab === 'cardiology' ? 'text-rose-400' : 'text-slate-400'} />
            <span className="hidden sm:inline font-display">{t('nav.cardiology')}</span>
            <span className="sm:hidden font-display">{t('nav.cardiology.abbr')}</span>
            
            {activeTab === 'cardiology' && (
              <motion.div
                layoutId="activeSpecialtyTab"
                className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 -z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_16px_-4px_rgba(0,0,0,0.5)]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>

          {/* Nephrology Tab */}
          <button
            onClick={() => setActiveTab('nephrology')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer relative z-10 ${
              activeTab === 'nephrology'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert size={18} className={activeTab === 'nephrology' ? 'text-emerald-400' : 'text-slate-400'} />
            <span className="hidden sm:inline font-display">{t('nav.nephrology')}</span>
            <span className="sm:hidden font-display">{t('nav.nephrology.abbr')}</span>
            
            {activeTab === 'nephrology' && (
              <motion.div
                layoutId="activeSpecialtyTab"
                className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 -z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_16px_-4px_rgba(0,0,0,0.5)]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl px-4 flex-1 flex flex-col z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-slate-500 font-sans select-none">
        <p>© 2026 Pocket MedCalc. All rights reserved.</p>
        <p className="mt-1.5 opacity-60">For clinical educational use only. Verify calculations independently.</p>
      </footer>
    </div>
  );
};
