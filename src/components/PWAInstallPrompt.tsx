import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || (navigator as any).standalone === true;
    setIsStandalone(standalone);

    if (standalone) return; // Don't show prompt if already installed

    // Check if dismissed recently
    const dismissed = localStorage.getItem('pwa_install_dismissed');
    if (dismissed) {
      const dismissedAt = parseInt(dismissed);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedAt < sevenDays) return;
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    if (isIOSDevice) {
      // Show iOS-specific install prompt after a short delay
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    // Listen for Chrome/Android install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowPrompt(true), 2000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_install_dismissed', Date.now().toString());
  };

  if (isStandalone) return null;

  const isZh = language === 'zh' || language === 'zh_hans';

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[60]"
        >
          <div className="glass-panel rounded-2xl border border-accent-pink-solid/30 dark:border-accent-blue-solid/30 shadow-2xl p-4 backdrop-blur-xl">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-bg-secondary/60 dark:hover:bg-slate-800/60 text-text-muted hover:text-text-title transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>

            <div className="flex items-start gap-3 pr-6">
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-pink-solid/20 to-accent-blue-solid/20 dark:from-accent-blue/30 dark:to-cyan-900/30 border border-accent-pink-solid/20 dark:border-accent-blue-solid/20 flex items-center justify-center shrink-0">
                <span className="text-xl">🩺</span>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-text-title dark:text-white font-serif leading-tight">
                  {isZh ? '安裝 Pocket MedCalc' : 'Install Pocket MedCalc'}
                </h4>
                <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                  {isZh
                    ? '加到主畫面即可離線使用，在病房也能快速計算'
                    : 'Add to home screen for offline access and quick calculations'
                  }
                </p>

                {isIOS ? (
                  // iOS: Show share button instructions
                  <div className="mt-3 flex items-center gap-2 bg-accent-blue/30 dark:bg-cyan-950/30 border border-accent-blue-solid/20 dark:border-cyan-800/30 rounded-xl px-3 py-2">
                    <Share size={14} className="text-accent-blue-solid dark:text-cyan-400 shrink-0" />
                    <span className="text-[11px] text-text-body dark:text-slate-300 leading-snug">
                      {isZh
                        ? '點擊底部 分享 → 加入主畫面'
                        : 'Tap Share → Add to Home Screen'
                      }
                    </span>
                  </div>
                ) : (
                  // Chrome/Android: Show install button
                  <button
                    onClick={handleInstall}
                    className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold bg-accent-pink-solid dark:bg-cyan-600 hover:bg-accent-pink-solid/90 dark:hover:bg-cyan-500 text-white shadow-md transition-all cursor-pointer select-none"
                  >
                    <Download size={13} />
                    {isZh ? '安裝到主畫面' : 'Install App'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
