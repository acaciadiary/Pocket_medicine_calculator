import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
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
  BookOpen,
  Sun,
  Moon,
  Venus,
  Baby,
  Scissors,
  Syringe,
  AlertTriangle,
  Brain,
  Smile,
  Bone,
  Fingerprint,
  Eye,
  Settings,
  Globe,
  Share,
  Download,
  Check,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculatorsList, CATEGORIES, type Calculator } from '../calculators/definitions';

const FAVORITES_FILTER = '__favorites';
const FAVORITES_STORAGE_KEY = 'pocket_medcalc_favorites';

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
  const { language, setLanguage, t, tl } = useLanguage();
  // Set HTML language attribute and SEO meta tags
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t('app.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('app.subtitle'));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = t('app.subtitle');
      document.head.appendChild(meta);
    }
  }, [language, t]);

  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Settings Popover State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // PWA State & Logic
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showNotificationDot, setShowNotificationDot] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || (navigator as any).standalone === true;
    setIsStandalone(standalone);

    if (standalone) return;

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    if (isIOSDevice) {
      const dismissed = localStorage.getItem('pwa_install_dismissed');
      if (!dismissed) {
        setShowNotificationDot(true);
      }
      return;
    }

    // Listen for Chrome/Android install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      const dismissed = localStorage.getItem('pwa_install_dismissed');
      if (!dismissed) {
        setShowNotificationDot(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);
  const favoriteCount = favoriteIds.length;
  const selectedIsFavorite = favoriteSet.has(selectedCalculator.id);

  const toggleFavorite = (calculatorId: string) => {
    setFavoriteIds((prev) => {
      if (prev.includes(calculatorId)) {
        return prev.filter((id) => id !== calculatorId);
      }
      return [...prev, calculatorId];
    });
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsStandalone(true);
      setShowNotificationDot(false);
    }
    setDeferredPrompt(null);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    if (!isSettingsOpen) {
      setShowNotificationDot(false);
      localStorage.setItem('pwa_install_dismissed', Date.now().toString());
    }
  };

  // Map category keys to Lucide icons
  const getCategoryIcon = (categoryKey: string) => {
    switch (categoryKey) {
      case 'cardiology':
        return <Heart size={14} className="text-rose-400 dark:text-rose-500" />;
      case 'pulmonary':
        return <Wind size={14} className="text-sky-400 dark:text-sky-500" />;
      case 'nephrology':
        return <Droplets size={14} className="text-emerald-400 dark:text-emerald-500" />;
      case 'acid_base':
        return <Dna size={14} className="text-indigo-400 dark:text-indigo-500" />;
      case 'gastroenterology':
        return <Flame size={14} className="text-amber-500 dark:text-amber-600" />;
      case 'hematology':
        return <Layers size={14} className="text-purple-400 dark:text-purple-500" />;
      case 'oncology':
        return <ShieldAlert size={14} className="text-red-400 dark:text-red-500" />;
      case 'endocrinology':
        return <Zap size={14} className="text-yellow-450 dark:text-yellow-500" />;
      case 'infectious_diseases':
        return <Bug size={14} className="text-teal-400 dark:text-teal-500" />;
      case 'rheumatology':
        return <Sparkles size={14} className="text-pink-400 dark:text-pink-500" />;
      case 'obgyn':
        return <Venus size={14} className="text-fuchsia-400 dark:text-fuchsia-500" />;
      case 'pediatrics':
        return <Baby size={14} className="text-violet-400 dark:text-violet-500" />;
      case 'surgery':
        return <Scissors size={14} className="text-slate-400 dark:text-slate-500" />;
      case 'anesthesia':
        return <Syringe size={14} className="text-cyan-400 dark:text-cyan-500" />;
      case 'emergency_critical':
        return <AlertTriangle size={14} className="text-orange-400 dark:text-orange-500" />;
      case 'neurology':
        return <Brain size={14} className="text-indigo-550 dark:text-indigo-500" />;
      case 'psychiatry':
        return <Smile size={14} className="text-lime-500 dark:text-lime-650" />;
      case 'orthopedics':
        return <Bone size={14} className="text-stone-400 dark:text-stone-500" />;
      case 'urology':
        return <Droplets size={14} className="text-blue-400 dark:text-blue-500" />;
      case 'dermatology':
        return <Fingerprint size={14} className="text-orange-400 dark:text-orange-500" />;
      case 'ophthalmology':
        return <Eye size={14} className="text-teal-500 dark:text-teal-650" />;
      default:
        return <BookOpen size={14} className="text-slate-400" />;
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
      const matchesCategory = selectedCategory === FAVORITES_FILTER
        ? favoriteSet.has(c.id)
        : selectedCategory
          ? c.category === selectedCategory
          : true;
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
  }, [favoriteSet, searchQuery, selectedCategory]);

// duplicate toggleLanguage removed
    

  const sidebarContent = (
    <div className="flex flex-col h-full space-y-4 font-sans">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
          <Search size={14} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === 'zh' ? '搜尋計算機...' : 'Search calculators...'}
          className="w-full bg-white/50 dark:bg-slate-950/60 border border-border-card focus:border-accent-pink-solid dark:focus:border-accent-blue-solid rounded-xl pl-9 pr-8 py-2 text-xs text-text-title placeholder-text-muted focus:outline-none transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-title"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Categories Selector */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest block font-display px-2">
          {language === 'zh' ? '科別篩選' : 'Specialties'}
        </span>
        <div className="space-y-0.5 max-h-40 overflow-y-auto pr-1">
          {/* All category item */}
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all duration-200 cursor-pointer ${
              selectedCategory === null
                ? 'bg-accent-blue dark:bg-accent-blue border border-accent-blue-solid/40 dark:border-accent-blue-solid/30 text-text-title dark:text-white font-semibold'
                : 'border border-transparent text-text-body dark:text-slate-400 hover:text-text-title dark:hover:text-slate-200 hover:bg-accent-pink/20 dark:hover:bg-slate-900/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity size={12} className={selectedCategory === null ? 'text-text-title dark:text-accent-blue-solid' : 'text-text-muted'} />
              <span>{language === 'zh' ? '所有分類' : 'All Specialties'}</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/70 dark:bg-slate-900/60 text-text-muted font-mono border border-border-card/30">
              {calculatorsList.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory(FAVORITES_FILTER)}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all duration-200 cursor-pointer ${
              selectedCategory === FAVORITES_FILTER
                ? 'bg-accent-pink/60 dark:bg-accent-blue border border-accent-pink-solid/50 dark:border-accent-blue-solid/30 text-text-title dark:text-white font-semibold'
                : 'border border-transparent text-text-body dark:text-slate-400 hover:text-text-title dark:hover:text-slate-200 hover:bg-accent-pink/20 dark:hover:bg-slate-900/40'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Star
                size={12}
                className={selectedCategory === FAVORITES_FILTER ? 'fill-accent-pink-solid text-accent-pink-solid dark:fill-accent-blue-solid dark:text-accent-blue-solid' : 'text-text-muted'}
              />
              <span className="truncate">{language === 'zh' ? '我的最愛' : 'Favorites'}</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/70 dark:bg-slate-900/60 text-text-muted font-mono border border-border-card/30">
              {favoriteCount}
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
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-accent-blue dark:bg-accent-blue border border-accent-blue-solid/40 dark:border-accent-blue-solid/30 text-text-title dark:text-white font-semibold'
                    : 'border border-transparent text-text-body dark:text-slate-400 hover:text-text-title dark:hover:text-slate-200 hover:bg-accent-pink/20 dark:hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  {getCategoryIcon(key)}
                  <span className="truncate max-w-[140px]">{tl(value)}</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/70 dark:bg-slate-900/60 text-text-muted font-mono border border-border-card/30">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculators List */}
      <div className="flex-1 flex flex-col min-h-0 space-y-1 pt-1">
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest block font-display px-2">
          {language === 'zh' ? '醫學計算機' : 'Calculators'}
        </span>
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 pb-4">
          {filteredCalculators.length === 0 ? (
            <div className="text-center py-6 text-text-muted text-xs">
              {language === 'zh' ? '未找到符合的計算機' : 'No calculators found'}
            </div>
          ) : (
            filteredCalculators.map((c) => {
              const isSelected = selectedCalculator.id === c.id;
              const isFavorite = favoriteSet.has(c.id);
              return (
                <div
                  key={c.id}
                  className={`w-full rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'bg-accent-pink/55 dark:bg-accent-blue border-accent-pink-solid dark:border-accent-blue-solid text-text-title dark:text-white font-bold shadow-md'
                      : 'bg-white/40 dark:bg-slate-950/20 border-border-card text-text-body dark:text-slate-450 hover:text-text-title dark:hover:text-slate-200 hover:border-accent-pink-solid/35 dark:hover:border-slate-800'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCalculator(c);
                      setIsMobileMenuOpen(false);
                    }}
                    className="min-w-0 flex-1 text-left p-3 cursor-pointer"
                  >
                    <div className="text-xs truncate font-display font-medium">
                      {tl(c.name)}
                    </div>
                    <div className="text-[9px] text-text-muted truncate mt-0.5">
                      {tl(c.subtitle)}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(c.id)}
                    className="mr-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-text-muted hover:bg-white/70 hover:text-accent-pink-solid dark:hover:bg-slate-900/70 dark:hover:text-accent-blue-solid transition-all cursor-pointer"
                    title={isFavorite ? '從我的最愛移除' : '加入我的最愛'}
                    aria-label={isFavorite ? '從我的最愛移除' : '加入我的最愛'}
                  >
                    <Star size={14} className={isFavorite ? 'fill-accent-pink-solid text-accent-pink-solid dark:fill-accent-blue-solid dark:text-accent-blue-solid' : ''} />
                  </button>
                  <ChevronRight size={12} className="mr-3 shrink-0 text-text-muted" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative grid-notebook-pattern">
      
      {/* Top light accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-pink-solid via-accent-blue-solid to-accent-beige z-50"></div>

      {/* Desktop Sidebar (Left Panel) */}
      <aside className="hidden lg:flex flex-col w-[320px] shrink-0 border-r border-border-card bg-bg-card/70 dark:bg-slate-950/30 backdrop-blur-md p-5 h-screen sticky top-0 z-30">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-accent-pink-solid/25 dark:bg-accent-blue/20 border border-accent-pink-solid/40 dark:border-accent-blue-solid/30 text-accent-pink-solid dark:text-accent-blue-solid">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-bold font-serif text-text-title tracking-tight m-0 leading-none">
              {t('app.title')}
            </h1>
            <p className="text-[9px] text-text-muted font-sans mt-0.5 leading-none">
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
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            {/* Sliding Drawer Container */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[300px] max-w-[90vw] bg-bg-primary dark:bg-slate-950 border-r border-border-card backdrop-blur-xl p-5 z-50 flex flex-col h-full lg:hidden"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-accent-pink-solid" />
                  <span className="font-bold font-serif text-text-title text-sm">{t('app.title')}</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-bg-secondary dark:hover:bg-slate-900 border border-transparent text-text-muted hover:text-text-title transition-all cursor-pointer"
                >
                  <X size={16} />
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
        <header className="border-b border-border-card/40 bg-bg-card/30 dark:bg-slate-950/10 backdrop-blur-sm px-4 md:px-6 py-3 flex items-center justify-between gap-4 z-20">
          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-white/70 dark:bg-slate-900 border border-border-card text-text-body hover:text-text-title transition-all cursor-pointer"
            >
              <Menu size={18} />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold font-serif text-text-title leading-none">
                {t('app.title')}
              </h1>
              <p className="text-[9px] text-text-muted font-sans mt-0.5">
                {t('app.tagline')}
              </p>
            </div>
          </div>

          {/* Desktop header tag */}
          <div className="hidden lg:block">
            <span className="text-[10px] text-text-muted bg-white/60 dark:bg-slate-900/60 border border-border-card px-3 py-1 rounded-full font-sans">
              Clinical Guidelines Tool
            </span>
          </div>

          {/* Top Actions: Keep header relatively clean, toggles placed here on desktop */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(selectedCalculator.id)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-bold shadow-sm transition-all cursor-pointer select-none ${
                selectedIsFavorite
                  ? 'border-accent-pink-solid/60 bg-accent-pink/70 text-text-title dark:border-accent-blue-solid/60 dark:bg-cyan-950/50 dark:text-cyan-300'
                  : 'border-border-card bg-white/80 text-text-body hover:border-accent-pink-solid hover:text-text-title dark:bg-slate-900/80 dark:hover:border-accent-blue-solid dark:hover:text-white'
              }`}
              title={selectedIsFavorite ? '從我的最愛移除' : '加入我的最愛'}
            >
              <Star size={14} className={selectedIsFavorite ? 'fill-accent-pink-solid text-accent-pink-solid dark:fill-accent-blue-solid dark:text-accent-blue-solid' : ''} />
              <span className="hidden sm:inline">{language === 'zh' ? '我的最愛' : 'Favorite'}</span>
            </button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Round inline theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 border border-border-card hover:border-accent-pink-solid dark:hover:border-accent-blue-solid text-text-body hover:text-text-title shadow-sm transition-all cursor-pointer select-none"
              title={theme === 'light' ? '切換至深色模式' : '切換至暖沙筆記模式'}
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </div>
        </header>

        {/* Viewport content */}
        <main className="flex-1 px-4 md:px-8 py-6 max-w-5xl w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-[9px] text-text-muted font-sans select-none border-t border-border-card/30 bg-bg-card/5 mt-auto">
          <p>© 2026 Pocket MedCalc. All rights reserved.</p>
          <p className="mt-0.5 opacity-60">
            For clinical educational use only. Verify calculations independently. Source: MGH Pocket Medicine.
          </p>
        </footer>
      </div>

      {/* Floating Action Buttons on the Right Side (Unified Settings Menu) */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50 font-sans">
        
        {/* Settings Popover Card */}
        <AnimatePresence>
          {isSettingsOpen && (
            <>
              {/* Overlay backdrop for click-away */}
              <div 
                className="fixed inset-0 z-40 cursor-default" 
                onClick={() => setIsSettingsOpen(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="glass-panel z-50 w-72 rounded-3xl p-5 shadow-2xl border border-accent-pink-solid/35 dark:border-accent-blue-solid/35 backdrop-blur-xl mb-2 origin-bottom-right"
              >
                <div className="flex items-center justify-between pb-3 border-b border-border-card/45 dark:border-slate-800/40">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-accent-pink-solid dark:text-accent-blue-solid animate-[spin_10s_linear_infinite]" />
                    <span className="text-sm font-bold text-text-title dark:text-white font-serif">
                      {language === 'zh' ? '功能設定' : language === 'zh_hans' ? '功能设置' : 'Settings'}
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-1 rounded-full hover:bg-bg-secondary dark:hover:bg-slate-900/60 text-text-muted hover:text-text-title cursor-pointer transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-4 pt-4">
                  {/* Language Selector Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-text-title dark:text-slate-350">
                      <Globe size={13} className="text-text-muted" />
                      <span>{language === 'zh' ? '選擇語言' : language === 'zh_hans' ? '选择语言' : 'Language'}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 bg-bg-secondary/40 dark:bg-slate-900/65 p-1 rounded-2xl border border-border-card/50 dark:border-slate-800/40">
                      {[
                        { code: 'zh', label: '繁中' },
                        { code: 'zh_hans', label: '简中' },
                        { code: 'en', label: 'EN' }
                      ].map((lang) => {
                        const isActive = language === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => setLanguage(lang.code as any)}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                              isActive
                                ? 'bg-accent-pink-solid dark:bg-cyan-600 text-white shadow-sm font-bold'
                                : 'text-text-muted hover:text-text-title dark:hover:text-slate-200'
                            }`}
                          >
                            {lang.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Theme Selector Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-text-title dark:text-slate-350">
                      {theme === 'light' ? <Sun size={13} className="text-text-muted" /> : <Moon size={13} className="text-text-muted" />}
                      <span>{language === 'zh' ? '深淺主題' : language === 'zh_hans' ? '深浅主题' : 'Appearance'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 bg-bg-secondary/40 dark:bg-slate-900/65 p-1 rounded-2xl border border-border-card/50 dark:border-slate-800/40">
                      <button
                        onClick={() => theme !== 'light' && toggleTheme()}
                        className={`flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                          theme === 'light'
                            ? 'bg-accent-pink-solid text-white shadow-sm font-bold'
                            : 'text-text-muted hover:text-text-title dark:hover:text-slate-200'
                        }`}
                      >
                        <Sun size={12} />
                        {language === 'zh' ? '暖沙筆記' : language === 'zh_hans' ? '暖沙笔记' : 'Light'}
                      </button>
                      <button
                        onClick={() => theme !== 'dark' && toggleTheme()}
                        className={`flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                          theme === 'dark'
                            ? 'bg-cyan-600 text-white shadow-sm font-bold'
                            : 'text-text-muted hover:text-text-title dark:hover:text-slate-200'
                        }`}
                      >
                        <Moon size={12} />
                        {language === 'zh' ? '深藍極客' : language === 'zh_hans' ? '深蓝极客' : 'Dark'}
                      </button>
                    </div>
                  </div>

                  {/* PWA Installation Section */}
                  <div className="space-y-2 pt-2 border-t border-border-card/30 dark:border-slate-800/35">
                    {isStandalone ? (
                      <div className="flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-2.5">
                        <Check size={14} className="text-emerald-500 shrink-0" />
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          {language === 'zh' ? '已安裝至桌面' : language === 'zh_hans' ? '已安装至桌面' : 'App Installed'}
                        </span>
                      </div>
                    ) : isIOS ? (
                      <div className="bg-accent-blue/20 dark:bg-cyan-950/20 border border-accent-blue-solid/35 dark:border-cyan-800/30 rounded-2xl p-2.5 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-text-title dark:text-cyan-400">
                          <Share size={12} />
                          <span>{language === 'zh' ? '加到主畫面' : language === 'zh_hans' ? '添加到主画面' : 'Add to Home Screen'}</span>
                        </div>
                        <p className="text-[10px] text-text-body dark:text-slate-350 leading-normal">
                          {language === 'zh' 
                            ? '請點擊 Safari 底部的「分享」按鈕，然後選擇「加入主畫面」即可離線使用' 
                            : language === 'zh_hans' 
                            ? '请点击 Safari 底部的“分享”按钮，然后选择“添加到主画面”即可离线使用' 
                            : 'Tap Safari Share → Add to Home Screen for offline access.'}
                        </p>
                      </div>
                    ) : deferredPrompt ? (
                      <div className="space-y-2">
                        <p className="text-[10px] text-text-muted leading-normal">
                          {language === 'zh' 
                            ? '安裝 Pocket MedCalc 到桌面，在病房能離線快速計算' 
                            : language === 'zh_hans' 
                            ? '安装 Pocket MedCalc 到桌面，在病房能离线快速计算' 
                            : 'Install Pocket MedCalc for quick offline ward calculations.'}
                        </p>
                        <button
                          onClick={handleInstall}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-accent-pink-solid dark:bg-cyan-600 hover:bg-accent-pink-solid/90 dark:hover:bg-cyan-500 text-white shadow-md transition-all cursor-pointer select-none"
                        >
                          <Download size={13} />
                          {language === 'zh' ? '安裝到桌面' : language === 'zh_hans' ? '安装到桌面' : 'Install App'}
                        </button>
                      </div>
                    ) : (
                      <div className="bg-bg-secondary/45 dark:bg-slate-900/40 border border-border-card/45 dark:border-slate-800/35 rounded-2xl p-2.5">
                        <p className="text-[10px] text-text-muted leading-normal">
                          {language === 'zh' 
                            ? '提示：您可以在瀏覽器選單中選擇「安裝」或「新增至主畫面」' 
                            : language === 'zh_hans' 
                            ? '提示：您可以在浏览器菜单中选择“安装”或“添加到主画面”' 
                            : 'Tip: Install via browser menu (Settings → Install/Add to Home Screen).'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating Settings FAB Gear Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSettings}
          className="relative w-11 h-11 rounded-full flex items-center justify-center text-white bg-gradient-to-tr from-accent-pink-solid to-pink-400 dark:from-accent-blue-solid dark:to-cyan-400 shadow-lg border border-white/20 cursor-pointer select-none"
          title={language === 'zh' ? '設定' : language === 'zh_hans' ? '设置' : 'Settings'}
        >
          <Settings 
            size={18} 
            className={`transition-transform duration-500 ${isSettingsOpen ? 'rotate-90' : 'rotate-0'}`} 
          />
          
          {/* Notification Badge / Dot */}
          {showNotificationDot && (
            <span className="absolute top-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-white dark:ring-slate-950 bg-rose-500 animate-pulse" />
          )}
        </motion.button>
      </div>

    </div>
  );
};
