import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`glass-panel rounded-2xl overflow-hidden shadow-lg border border-border-card transition-all duration-300 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-accent-pink/15 dark:hover:bg-slate-900/40 transition-colors duration-200 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-sm md:text-base font-semibold font-serif tracking-wide flex items-center gap-3 text-accent-pink-solid dark:text-accent-blue-solid">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-accent-pink-solid/80 dark:text-accent-blue-solid/85"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-5 pb-6 pt-1 text-text-body dark:text-slate-300 text-xs md:text-sm leading-relaxed border-t border-border-card/40 font-sans">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
