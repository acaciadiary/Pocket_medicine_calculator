import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import {
  Activity,
  Heart,
  Wind,
  Droplets,
  Dna,
  Flame,
  Layers,
  ShieldAlert,
  Zap,
  Bug,
  Sparkles,
  Search,
  Menu,
  X,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculatorsList, CATEGORIES, type Calculator } from '../calculators/definitions';

interface LayoutProps {
  selectedCalculator: Calculator;
  onSelectCalculator: (calculator: Calculator) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  selectedCalculator,
  onSelectCalculator,
  children,
}) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Map category keys to Lucide icons
  const getCategoryIcon = (categoryKey: string) => {
    switch (categoryKey) {
      case 'cardiology':
        return <Heart size={16} className="text-rose-400" />;
      case 'pulmonary':
        return <Wind size={16} className="text-sky-400" />;
      case 'nephrology':
        return <Droplets size={16} className="text-emerald-400" />;
      case 'acid_base':
        return <Dna size={16} className="text-indigo-400" />;
      case 'gastroenterology':
        return <Flame size={16} className="text-amber-500" />;
      case 'hematology':
        return <Layers size={16} className="text-purple-400" />;
      case 'oncology':
        return <ShieldAlert size={16} className="text-red-400" />;
      case 'endocrinology':
        return <Zap size={16} className="text-yellow-400" />;
      case 'infectious_diseases':
        return <Bug size={16} className="text-teal-400" />;
      case 'rheumatology':
        return <Sparkles size={16} className="text-pink-400" />;
      default:
        return <BookOpen size={16} className="text-slate-400" />;
    }
  };

  // Count calculators by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    calculatorsList.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered list of calculators based on search query and category selector
  const filteredCalculators = useMemo(() => {
    return calculatorsList.filter((c) => {
      const matchesCategory = selectedCategory ? c.category === selectedCategory : true;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = q
        ? c.name.zh.toLowerCase().includes(q) ||
          c.name.en.toLowerCase().includes(q) ||
          c.subtitle.zh.toLowerCase().includes(q) ||
          c.subtitle.en.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const sidebarContent = (
    <div className="flex flex-col h-full space-y-5">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search size={16} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === 'zh' ? '搜尋計算機...' : 'Search calculators...'}
          className="w-full bg-slate-950/60 border border-glass-border/80 focus:border-cyan-500/50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all font-sans"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Categories Selector */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-display px-2">
          {language === 'zh' ? '科別篩選' : 'Specialties'}
        </span>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {/* All category item */}
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-200 cursor-pointer ${
              selectedCategory === null
                ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold'
                : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity size={14} className={selectedCategory === null ? 'text-cyan-400' : 'text-slate-400'} />
              <span>{language === 'zh' ? '所有分類' : 'All Specialties'}</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900/60 text-slate-400 font-mono">
              {calculatorsList.length}
            </span>
          </button>

          {/* Individual Category buttons */}
          {Object.entries(CATEGORIES).map(([key, value]) => {
            const count = categoryCounts[key] || 0;
            if (count === 0) return null;
            const isSelected = selectedCategory === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold'
                    : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  {getCategoryIcon(key)}
                  <span className="truncate max-w-[150px]">{value[language]}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900/60 text-slate-400 font-mono">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculators List */}
      <div className="flex-1 flex flex-col min-h-0 space-y-1.5 pt-2">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-display px-2">
          {language === 'zh' ? '醫學計算機' : 'Calculators'}
        </span>
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 pb-4">
          {filteredCalculators.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs font-sans">
              {language === 'zh' ? '未找到符合的計算機' : 'No calculators found'}
            </div>
          ) : (
            filteredCalculators.map((c) => {
              const isSelected = selectedCalculator.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCalculator(c);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500/50 text-white font-semibold shadow-[0_4px_20px_-5px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-950/20 border-glass-border text-slate-400 hover:text-slate-200 hover:border-slate-800'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs truncate font-display font-medium text-slate-200">
                      {c.name[language]}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {c.subtitle[language]}
                    </div>
                  </div>
                  <ChevronRight size={12} className="shrink-0 text-slate-500" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      {/* Background radial effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-20 opacity-30"></div>
      
      {/* Top light bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 z-50"></div>

      {/* Desktop Sidebar (Left Panel) */}
      <aside className="hidden lg:flex flex-col w-[320px] shrink-0 border-r border-glass-border/60 bg-slate-950/30 backdrop-blur-md p-6 h-screen sticky top-0 z-30">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
            <Activity className="w-5 h-5 animate-pulse" />
            <div className="absolute inset-0 w-full h-full rounded-xl border border-cyan-400/20 scale-110 animate-ping opacity-25"></div>
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight font-display bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent m-0 leading-none">
              {t('app.title')}
            </h1>
            <p className="text-[10px] text-slate-400 font-sans mt-1">
              {t('app.tagline')}
            </p>
          </div>
        </div>

        {/* Sidebar Nav Panels */}
        <div className="flex-1 min-h-0">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Sliding Sidebar Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            {/* Sliding Drawer Container */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[300px] bg-slate-950/95 border-r border-glass-border backdrop-blur-xl p-6 z-50 flex flex-col h-full lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold font-display text-white">{t('app.title')}</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 min-h-0">
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area (Right Panel) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header/Navbar */}
        <header className="border-b border-glass-border/40 bg-slate-950/10 backdrop-blur-sm px-4 md:px-8 py-4 flex items-center justify-between gap-4 z-20">
          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-slate-900/60 border border-glass-border text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-base font-bold font-display text-white leading-none">
                {t('app.title')}
              </h1>
              <p className="text-[9px] text-slate-400 font-sans mt-0.5">
                {t('app.tagline')}
              </p>
            </div>
          </div>

          {/* Desktop spacer */}
          <div className="hidden lg:block">
            <span className="text-xs text-slate-400 bg-slate-900/40 border border-glass-border px-3 py-1.5 rounded-full font-sans">
              Clinical Guidelines Tool
            </span>
          </div>

          {/* Global Actions: Language Selector */}
          <div className="flex items-center gap-3">
            <LanguageSelector />
          </div>
        </header>

        {/* Viewport content */}
        <main className="flex-1 px-4 md:px-8 py-8 max-w-5xl w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-8 text-center text-[10px] text-slate-500 font-sans select-none border-t border-glass-border/30 bg-slate-950/5 mt-auto">
          <p>© 2026 Pocket MedCalc. All rights reserved.</p>
          <p className="mt-1 opacity-60">
            For clinical educational use only. Verify calculations independently. Source: MGH Pocket Medicine.
          </p>
        </footer>
      </div>
    </div>
  );
};
