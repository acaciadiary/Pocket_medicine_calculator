import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Accordion } from '../components/Accordion';
import { Copy, Check, RotateCcw, AlertCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeNa: React.FC = () => {
  const { t } = useLanguage();

  // State for laboratory inputs with defaults
  const [serumNa, setSerumNa] = useState<string>('140');
  const [urineNa, setUrineNa] = useState<string>('');
  const [serumCr, setSerumCr] = useState<string>('1.0');
  const [urineCr, setUrineCr] = useState<string>('');

  const [feNaResult, setFeNaResult] = useState<number | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Instant calculation logic on input changes
  useEffect(() => {
    const sNa = parseFloat(serumNa);
    const uNa = parseFloat(urineNa);
    const sCr = parseFloat(serumCr);
    const uCr = parseFloat(urineCr);

    // If any field is empty or not a number, reset result
    if (isNaN(sNa) || isNaN(uNa) || isNaN(sCr) || isNaN(uCr)) {
      setFeNaResult(null);
      setCalcError(null);
      return;
    }

    // Safety checks for division by zero
    if (sNa === 0 || uCr === 0) {
      setFeNaResult(null);
      setCalcError(t('common.error.divzero'));
      return;
    }

    // Prevent negative inputs
    if (sNa < 0 || uNa < 0 || sCr < 0 || uCr < 0) {
      setFeNaResult(null);
      setCalcError(t('common.error.invalid'));
      return;
    }

    setCalcError(null);
    // Formula: (Urine Na * Serum Cr) / (Serum Na * Urine Cr) * 100
    const result = (uNa * sCr) / (sNa * uCr) * 100;
    setFeNaResult(result);
  }, [serumNa, urineNa, serumCr, urineCr, t]);

  // Determine clinical interpretation and styling
  const getInterpretation = (val: number | null) => {
    if (val === null) {
      return {
        zone: '--',
        color: 'text-slate-400 bg-slate-950/40 border-slate-800',
        glow: '',
        desc: t('common.invalid_inputs'),
        type: 'none'
      };
    }

    if (val < 1.0) {
      return {
        zone: t('fena.result.prerenal'),
        color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
        desc: t('fena.result.prerenal.desc'),
        type: 'prerenal'
      };
    } else if (val > 2.0) {
      return {
        zone: t('fena.result.atn'),
        color: 'text-rose-400 bg-rose-950/40 border-rose-500/30',
        glow: 'shadow-[0_0_20px_rgba(244,63,94,0.2)]',
        desc: t('fena.result.atn.desc'),
        type: 'atn'
      };
    } else {
      return {
        zone: t('fena.result.gray'),
        color: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
        desc: t('fena.result.gray.desc'),
        type: 'gray'
      };
    }
  };

  const interpretation = getInterpretation(feNaResult);

  // Copy clinical note
  const copyClinicalNote = () => {
    if (feNaResult === null) return;
    
    const note = `[Clinical Note] FeNa (Fractional Excretion of Sodium): ${feNaResult.toFixed(2)}%\n` +
                 `Interpretation: ${interpretation.zone}\n` +
                 `Inputs:\n` +
                 ` - Serum Na: ${serumNa} mmol/L\n` +
                 ` - Urine Na: ${urineNa} mmol/L\n` +
                 ` - Serum Cr: ${serumCr} mg/dL\n` +
                 ` - Urine Cr: ${urineCr} mg/dL\n` +
                 `Note: ${t('common.diuretic_warning')}`;
    
    navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAll = () => {
    setSerumNa('140');
    setUrineNa('');
    setSerumCr('1.0');
    setUrineCr('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Input panel */}
      <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl border border-glass-border shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-glass-border/40 pb-4">
          <div>
            <h2 className="text-xl font-bold font-display tracking-wide text-white">{t('fena.title')}</h2>
            <p className="text-xs text-slate-400 mt-1 font-sans">{t('fena.subtitle')}</p>
          </div>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/40 text-slate-300 transition-all cursor-pointer"
          >
            <RotateCcw size={12} />
            {t('common.reset')}
          </button>
        </div>

        {/* Input Fields Container */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold font-display">
            {t('fena.input.group')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Serum Na */}
            <div className="space-y-2">
              <label htmlFor="serumNa" className="text-xs font-semibold text-slate-300 font-display block">
                {t('fena.serum_na')}
              </label>
              <div 
                onClick={() => document.getElementById('serumNa')?.focus()}
                className="relative rounded-xl bg-slate-950/40 border border-glass-border focus-within:border-cyan-500/50 transition-all cursor-text"
              >
                <input
                  id="serumNa"
                  type="number"
                  step="any"
                  placeholder="e.g. 140"
                  value={serumNa}
                  onChange={(e) => setSerumNa(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none p-3.5 pr-28 text-white font-semibold text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800/60 px-2 py-0.5 rounded-md uppercase pointer-events-none select-none">
                  {t('fena.unit.na')}
                </span>
              </div>
            </div>

            {/* Urine Na */}
            <div className="space-y-2">
              <label htmlFor="urineNa" className="text-xs font-semibold text-slate-300 font-display block">
                {t('fena.urine_na')}
              </label>
              <div 
                onClick={() => document.getElementById('urineNa')?.focus()}
                className="relative rounded-xl bg-slate-950/40 border border-glass-border focus-within:border-cyan-500/50 transition-all cursor-text"
              >
                <input
                  id="urineNa"
                  type="number"
                  step="any"
                  placeholder="e.g. 40"
                  value={urineNa}
                  onChange={(e) => setUrineNa(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none p-3.5 pr-28 text-white font-semibold text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800/60 px-2 py-0.5 rounded-md uppercase pointer-events-none select-none">
                  {t('fena.unit.na')}
                </span>
              </div>
            </div>

            {/* Serum Cr */}
            <div className="space-y-2">
              <label htmlFor="serumCr" className="text-xs font-semibold text-slate-300 font-display block">
                {t('fena.serum_cr')}
              </label>
              <div 
                onClick={() => document.getElementById('serumCr')?.focus()}
                className="relative rounded-xl bg-slate-950/40 border border-glass-border focus-within:border-cyan-500/50 transition-all cursor-text"
              >
                <input
                  id="serumCr"
                  type="number"
                  step="any"
                  placeholder="e.g. 1.0"
                  value={serumCr}
                  onChange={(e) => setSerumCr(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none p-3.5 pr-28 text-white font-semibold text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800/60 px-2 py-0.5 rounded-md uppercase pointer-events-none select-none">
                  {t('fena.unit.cr')}
                </span>
              </div>
            </div>

            {/* Urine Cr */}
            <div className="space-y-2">
              <label htmlFor="urineCr" className="text-xs font-semibold text-slate-300 font-display block">
                {t('fena.urine_cr')}
              </label>
              <div 
                onClick={() => document.getElementById('urineCr')?.focus()}
                className="relative rounded-xl bg-slate-950/40 border border-glass-border focus-within:border-cyan-500/50 transition-all cursor-text"
              >
                <input
                  id="urineCr"
                  type="number"
                  step="any"
                  placeholder="e.g. 100"
                  value={urineCr}
                  onChange={(e) => setUrineCr(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none p-3.5 pr-28 text-white font-semibold text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800/60 px-2 py-0.5 rounded-md uppercase pointer-events-none select-none">
                  {t('fena.unit.cr')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical warning */}
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/30 text-amber-300 flex items-start gap-3">
          <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed">{t('common.diuretic_warning')}</p>
        </div>
      </div>

      {/* Result Panel */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-glass-border shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Top light beam */}
          <div className="absolute top-0 w-1/2 h-1 bg-cyan-400/40 blur-md rounded-full"></div>

          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 font-display">
            {t('common.result')}
          </h3>

          {/* Value Display */}
          <div className="relative w-44 h-44 flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border border-slate-800/40"></div>
            <div className="absolute inset-2 rounded-full border border-glass-border"></div>

            {/* Glowing circle under result */}
            <div className={`absolute inset-4 rounded-full filter blur-md opacity-25 transition-all duration-500 ${
              feNaResult === null
                ? 'bg-slate-700'
                : feNaResult < 1.0
                ? 'bg-emerald-500'
                : feNaResult > 2.0
                ? 'bg-rose-500'
                : 'bg-amber-500'
            }`}></div>

            <div className="z-10 flex flex-col items-center">
              {calcError ? (
                <AlertCircle size={28} className="text-rose-450 mb-1" />
              ) : (
                <motion.span
                  key={feNaResult}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-extrabold font-display leading-none text-white tracking-tight"
                >
                  {feNaResult !== null ? `${feNaResult.toFixed(2)}` : '--'}
                </motion.span>
              )}
              <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">
                {calcError ? 'Error' : 'FeNa (%)'}
              </span>
            </div>
          </div>

          {/* Diagnostics Badge */}
          {calcError ? (
            <div className="px-4 py-2 rounded-full border text-xs font-bold bg-rose-950/40 border-rose-500/30 text-rose-400">
              {calcError}
            </div>
          ) : (
            <div className={`px-4 py-2 rounded-full border text-xs font-bold tracking-wide flex items-center gap-1.5 mb-5 transition-all duration-300 ${interpretation.color} ${interpretation.glow}`}>
              {interpretation.zone}
            </div>
          )}

          {/* Details & Copy */}
          <div className="space-y-4 w-full">
            <div className="border-t border-glass-border/40 my-3"></div>

            <div className="text-left space-y-3.5">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase block font-display mb-1">{t('common.risk')}</span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {calcError ? t('common.error.invalid') : interpretation.desc}
                </p>
              </div>
            </div>

            <div className="border-t border-glass-border/40 my-3"></div>

            {/* Copy button */}
            <button
              onClick={copyClinicalNote}
              disabled={feNaResult === null}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer shadow-md ${
                feNaResult === null
                  ? 'bg-slate-800 text-slate-500 border border-slate-700/30 cursor-not-allowed'
                  : copied
                  ? 'bg-emerald-600 text-white shadow-emerald-700/20'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/10'
              }`}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? t('common.copied') : t('common.copy')}
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Clinical Pearls Section */}
      <div className="lg:col-span-12">
        <Accordion title={t('common.clinical_pearls')}>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium text-slate-200 text-sm">{t('fena.result.desc')}</p>
              <div className="bg-slate-950/40 border border-glass-border p-4 rounded-xl space-y-2 font-mono text-xs text-cyan-400">
                <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest block mb-1 font-display">
                  {t('common.reference')}
                </span>
                <p>{t('fena.pearls.formula_desc')}</p>
                <p className="text-sm font-semibold select-all py-1.5 text-center bg-slate-900 rounded border border-glass-border/30">
                  {t('fena.pearls.formula_math')}
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block font-display">
                {t('fena.pearls.caveats_title')}
              </span>
              <ul className="text-xs text-slate-350 space-y-2 leading-relaxed">
                <li>{t('fena.pearls.caveat1')}</li>
                <li>{t('fena.pearls.caveat2')}</li>
                <li>{t('fena.pearls.caveat3')}</li>
              </ul>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
};
