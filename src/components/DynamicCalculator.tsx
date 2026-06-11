/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Accordion } from './Accordion';
import { calculatorsList, type Calculator } from '../calculators/definitions';
import { Copy, Check, RotateCcw, AlertTriangle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface DynamicCalculatorProps {
  calculator: Calculator;
  onSelectCalculator?: (calculator: Calculator) => void;
}

export const DynamicCalculator: React.FC<DynamicCalculatorProps> = ({ calculator, onSelectCalculator }) => {
  const { language, t } = useLanguage();

  // Dynamic state dictionary for form inputs
  const [values, setValues] = useState<Record<string, any>>(() => {
    const initialValues: Record<string, any> = {};
    calculator.inputs.forEach((input) => {
      const savedVal = sessionStorage.getItem(`medcalc_input_${input.id}`);
      if (savedVal !== null) {
        if (input.type === 'number') {
          initialValues[input.id] = savedVal === '' ? '' : parseFloat(savedVal);
        } else if (input.type === 'boolean') {
          initialValues[input.id] = savedVal === 'true';
        } else {
          initialValues[input.id] = savedVal;
        }
      } else {
        initialValues[input.id] = input.defaultValue;
      }
    });
    return initialValues;
  });
  const [copied, setCopied] = useState<boolean>(false);
  const [ehrCopied, setEhrCopied] = useState<boolean>(false);

  const handleChange = (id: string, val: any) => {
    setValues((prev) => ({ ...prev, [id]: val }));
    sessionStorage.setItem(`medcalc_input_${id}`, val !== null && val !== undefined ? val.toString() : '');
  };

  const resetAll = () => {
    const resetValues: Record<string, any> = {};
    calculator.inputs.forEach((input) => {
      resetValues[input.id] = input.defaultValue;
      sessionStorage.removeItem(`medcalc_input_${input.id}`);
    });
    setValues(resetValues);
    setCopied(false);
  };

  // Run the calculation function
  const result = calculator.calculate(values);

  // Copy clinical note function
  const copyClinicalNote = () => {
    const lang = language;
    
    // Format input key-value list for clear medical documentation
    const inputLines = calculator.inputs.map((input) => {
      const val = values[input.id];
      let valStr: string;
      if (input.type === 'boolean') {
        valStr = val ? (lang === 'zh' ? '是 (Yes)' : 'Yes') : (lang === 'zh' ? '否 (No)' : 'No');
      } else if (input.type === 'select') {
        const opt = input.options?.find((o) => o.value === val);
        valStr = opt ? opt.label[lang] : val;
      } else {
        valStr = val !== undefined && val !== null && val !== '' ? `${val} ${input.unit || ''}` : '--';
      }
      return ` - ${input.name[lang]}: ${valStr}`;
    }).join('\n');

    // Format final computed value text
    let resultStr = '';
    if (result.score !== undefined) {
      resultStr = `${result.score} ${lang === 'zh' ? '分' : 'points'}`;
    } else if (result.value !== undefined) {
      resultStr = `${result.value.toFixed(2)}${result.unit || ''}`;
    } else if (result.valueText !== undefined) {
      resultStr = result.valueText;
    }

    const riskStr = result.riskLevel ? result.riskLevel[lang] : '';
    const recommendationStr = result.recommendation ? result.recommendation[lang] : '';
    const descriptionStr = result.description ? result.description[lang] : '';

    const note = `[Clinical Note] ${calculator.name[lang]}: ${resultStr}\n` +
                 (riskStr ? `Risk Level / Interpretation: ${riskStr}\n` : '') +
                 `Inputs:\n${inputLines}\n` +
                 (descriptionStr ? `Detail: ${descriptionStr}\n` : '') +
                 (recommendationStr ? `Recommendation: ${recommendationStr}` : '');
    
    navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyEhrTemplate = () => {
    const lang = language;
    
    // Create a concise comma-separated summary of inputs
    const inputSummary = calculator.inputs.map((input) => {
      const val = values[input.id];
      if (val === undefined || val === null || val === '') return null;
      let valStr = '';
      if (input.type === 'boolean') {
        if (val) {
          return `${input.name[lang]}`;
        } else {
          return null; // Skip false values to keep it extremely clean
        }
      } else if (input.type === 'select') {
        const opt = input.options?.find((o) => o.value === val);
        if (!opt) return null;
        // Clean points annotations like (+1pt) to keep clinical note clean
        valStr = opt.label[lang].replace(/\(\+?-?\d+分\)/g, '').replace(/\(\+?-?\d+ pts?\)/g, '').trim();
      } else {
        valStr = `${val} ${input.unit || ''}`.trim();
      }
      return `${input.name[lang]}: ${valStr}`;
    }).filter(Boolean).join(', ');

    let resultStr = '';
    if (result.score !== undefined) {
      resultStr = `${result.score} ${lang === 'zh' ? '分' : 'pts'}`;
    } else if (result.value !== undefined) {
      resultStr = `${result.value.toFixed(1)}${result.unit || ''}`;
    } else if (result.valueText !== undefined) {
      resultStr = result.valueText;
    }

    const riskStr = result.riskLevel ? result.riskLevel[lang] : '';
    const recommendationStr = result.recommendation ? result.recommendation[lang] : '';

    const note = `[${calculator.name[lang]}] ${resultStr}${riskStr ? ` (${riskStr})` : ''}\n` +
                 `- 指標: ${inputSummary || (lang === 'zh' ? '無特異指標' : 'None')}\n` +
                 (recommendationStr ? `- 處置: ${recommendationStr}` : '');

    navigator.clipboard.writeText(note);
    setEhrCopied(true);
    setTimeout(() => setEhrCopied(false), 2000);
  };

  const getGlowBgColor = (riskColorStr: string | undefined) => {
    if (!riskColorStr) return 'bg-cyan-500';
    if (riskColorStr.includes('emerald')) return 'bg-emerald-500';
    if (riskColorStr.includes('amber')) return 'bg-amber-500';
    if (riskColorStr.includes('rose')) return 'bg-rose-500';
    return 'bg-cyan-500';
  };

  // Determine what score or value to display in the dial
  const showText = result.score !== undefined 
    ? result.score.toString() 
    : (result.value !== undefined ? result.value.toFixed(1) : (result.valueText ? result.valueText : '--'));
  
  const showUnit = result.score !== undefined 
    ? t('common.points') 
    : (result.unit ? result.unit : '');

  // Separate boolean inputs from others to group them in a nice layout
  const booleanInputs = calculator.inputs.filter((i) => i.type === 'boolean');
  const normalInputs = calculator.inputs.filter((i) => i.type !== 'boolean');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
      {/* Inputs Section */}
      <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl border border-glass-border shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-glass-border/40 pb-4">
          <div>
            <h2 className="text-xl font-bold font-display tracking-wide text-white">
              {calculator.name[language]}
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              {calculator.subtitle[language]}
            </p>
          </div>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/40 text-slate-300 transition-all cursor-pointer select-none"
          >
            <RotateCcw size={12} />
            {t('common.reset')}
          </button>
        </div>

        {/* Inputs List */}
        <div className="space-y-6">
          {/* Render select & number inputs */}
          {normalInputs.map((input) => (
            <div key={input.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 font-display block">
                  {input.name[language]}
                </label>
                {input.unit && <span className="text-xs text-slate-500 font-sans">{input.unit}</span>}
              </div>

              {input.type === 'number' && (
                <div className="space-y-2">
                  <input
                    type="number"
                    value={values[input.id] ?? ''}
                    min={input.min}
                    max={input.max}
                    step={input.step ?? 'any'}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleChange(input.id, val === '' ? '' : parseFloat(val));
                    }}
                    className="w-full bg-slate-950/60 border border-glass-border/80 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all font-sans"
                  />
                  {input.min !== undefined && input.max !== undefined && (
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-500 font-sans">{input.min}</span>
                      <input
                        type="range"
                        min={input.min}
                        max={input.max}
                        step={input.step ?? 1}
                        value={values[input.id] ?? input.min}
                        onChange={(e) => handleChange(input.id, parseFloat(e.target.value))}
                        className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                      <span className="text-[10px] text-slate-500 font-sans">{input.max}</span>
                    </div>
                  )}
                </div>
              )}

              {input.type === 'select' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {input.options?.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleChange(input.id, opt.value)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer text-xs relative ${
                        values[input.id] === opt.value
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-white font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                          : 'bg-slate-950/40 border-glass-border text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {opt.label[language]}
                    </button>
                  ))}
                </div>
              )}

              {input.tooltip && (
                <p className="text-[10px] text-slate-500 mt-1 font-sans leading-relaxed">
                  * {input.tooltip[language]}
                </p>
              )}
            </div>
          ))}

          {/* Render checklist boolean parameters as elegant grids */}
          {booleanInputs.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold font-display">
                {language === 'zh' ? '評估項目與臨床指標' : 'Criteria & Risk Indicators'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {booleanInputs.map((input) => (
                  <button
                    key={input.id}
                    type="button"
                    onClick={() => handleChange(input.id, !values[input.id])}
                    className={`flex items-start justify-between p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      values[input.id]
                        ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.04)]'
                        : 'bg-slate-950/30 border-glass-border hover:border-slate-750/70'
                    }`}
                  >
                    <div className="flex-1 pr-3">
                      <div className="text-xs font-semibold text-slate-200 font-display leading-snug">
                        {input.name[language]}
                      </div>
                      {input.tooltip && (
                        <p className="text-[9px] text-slate-500 mt-1 font-sans leading-normal">
                          {input.tooltip[language]}
                        </p>
                      )}
                    </div>
                    <div
                      className={`w-7 h-4 rounded-full p-0.5 mt-0.5 transition-colors duration-200 shrink-0 ${
                        values[input.id] ? 'bg-cyan-500' : 'bg-slate-800'
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full bg-white transition-transform duration-200 transform ${
                          values[input.id] ? 'translate-x-3' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Output / Result Section */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-glass-border shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Top subtle glow bar */}
          <div className="absolute top-0 w-1/2 h-1 bg-cyan-400/30 blur-md rounded-full"></div>

          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-5 font-display">
            {t('common.result')}
          </h3>

          {/* elegant radial dial */}
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border border-slate-900/60"></div>
            <div className="absolute inset-2 rounded-full border border-glass-border"></div>

            {/* Glowing neon halo based on result color */}
            <div
              className={`absolute inset-4 rounded-full filter blur-md opacity-20 transition-all duration-500 ${getGlowBgColor(
                result.riskColor
              )}`}
            ></div>

            {/* Central Values Display */}
            <div className="z-10 flex flex-col items-center px-2">
              <motion.span
                key={showText}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-extrabold font-display leading-none text-white tracking-tight break-all max-w-full"
              >
                {showText}
              </motion.span>
              {showUnit && (
                <span className="text-[10px] font-semibold text-slate-400 uppercase mt-1.5 tracking-wider font-display">
                  {showUnit}
                </span>
              )}
            </div>
          </div>

          {/* Risk Badge */}
          {result.riskLevel && (
            <div
              className={`px-4 py-1.5 rounded-full border text-xs font-bold tracking-wide flex items-center gap-1.5 mb-5 transition-all duration-300 ${
                result.riskColor || 'text-cyan-400 bg-cyan-950/40 border-cyan-800/40'
              }`}
            >
              {result.riskColor?.includes('rose') && <AlertTriangle size={13} className="animate-bounce" />}
              {result.riskLevel[language]}
            </div>
          )}

          {/* Explanatory Details */}
          <div className="space-y-4 w-full">
            <div className="border-t border-glass-border/30 my-3"></div>

            <div className="text-left space-y-3.5">
              {result.description[language] && (
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-display tracking-widest mb-1.5">
                    {t('common.risk')}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {result.description[language]}
                  </p>
                </div>
              )}

              {result.recommendation?.[language] && (
                <div className="bg-slate-950/45 border border-glass-border p-3.5 rounded-2xl">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase block font-display tracking-widest mb-1.5">
                    {t('common.interpretation')}
                  </span>
                  <p className="text-xs text-slate-200 font-semibold leading-relaxed">
                    {result.recommendation[language]}
                  </p>
                </div>
              )}

              {/* FENa -> FEUrea Smart Link */}
              {calculator.id === 'fena' && onSelectCalculator && (
                <div
                  onClick={() => {
                    const feureaCalc = calculatorsList.find((c) => c.id === 'feurea');
                    if (feureaCalc) onSelectCalculator(feureaCalc);
                  }}
                  className="mt-3 bg-cyan-950/30 hover:bg-cyan-950/50 border border-cyan-500/20 hover:border-cyan-500/40 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300 group shadow-md"
                >
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle size={14} className="text-cyan-400 shrink-0 group-hover:scale-110 transition-transform animate-pulse" />
                    <span className="text-xs text-cyan-300 font-medium text-left leading-normal">
                      {t('common.smart_link.diuretic')}
                    </span>
                  </div>
                  <ExternalLink size={12} className="text-cyan-400/70 group-hover:text-cyan-300 transition-colors shrink-0 ml-1.5" />
                </div>
              )}

              {/* Anion Gap -> Winter's Formula Smart Link */}
              {calculator.id === 'anion-gap' && result.value !== undefined && result.value > 12 && onSelectCalculator && (
                <div
                  onClick={() => {
                    const wintersCalc = calculatorsList.find((c) => c.id === 'winters-formula');
                    if (wintersCalc) onSelectCalculator(wintersCalc);
                  }}
                  className="mt-3 bg-cyan-950/30 hover:bg-cyan-950/50 border border-cyan-500/20 hover:border-cyan-500/40 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300 group shadow-md"
                >
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle size={14} className="text-cyan-400 shrink-0 group-hover:scale-110 transition-transform animate-pulse" />
                    <span className="text-xs text-cyan-300 font-medium text-left leading-normal">
                      {t('common.smart_link.hagma')}
                    </span>
                  </div>
                  <ExternalLink size={12} className="text-cyan-400/70 group-hover:text-cyan-300 transition-colors shrink-0 ml-1.5" />
                </div>
              )}
            </div>

            <div className="border-t border-glass-border/30 my-3"></div>

            {/* Actions: Copy Note & EHR Copy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
              <button
                onClick={copyClinicalNote}
                disabled={result.error !== undefined}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer shadow-md select-none ${
                  result.error
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : copied
                    ? 'bg-emerald-600 text-white shadow-emerald-700/20'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-750 text-slate-300 hover:text-white shadow-slate-900/10'
                }`}
              >
                {copied ? <Check size={13} className="shrink-0" /> : <Copy size={13} className="shrink-0" />}
                <span className="truncate">{copied ? t('common.copied') : t('common.copy')}</span>
              </button>
              
              <button
                onClick={copyEhrTemplate}
                disabled={result.error !== undefined}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer shadow-md select-none ${
                  result.error
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : ehrCopied
                    ? 'bg-emerald-600 text-white shadow-emerald-700/20'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/10 hover:shadow-cyan-600/20'
                }`}
              >
                {ehrCopied ? <Check size={13} className="shrink-0" /> : <Copy size={13} className="shrink-0" />}
                <span className="truncate">{ehrCopied ? t('common.ehr_copied') : t('common.ehr_copy')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* References & Pearls Accordion */}
      <div className="lg:col-span-12 space-y-4">
        <Accordion title={t('common.clinical_pearls')}>
          <div className="space-y-4">
            {/* Pearls list */}
            {calculator.pearls[language] && calculator.pearls[language].length > 0 && (
              <div className="bg-slate-950/30 p-4 rounded-xl border border-glass-border/40 space-y-2.5">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block font-display">
                  {language === 'zh' ? '臨床指引與核心觀點' : 'Clinical Directives & Insights'}
                </span>
                <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-300 font-sans">
                  {calculator.pearls[language].map((pearl, idx) => (
                    <li key={idx} className="leading-relaxed">{pearl}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Formula Logic and MDCalc Reference */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-glass-border/20 text-xs">
              <div className="space-y-1 text-slate-400">
                <span className="font-semibold font-display text-[10px] uppercase text-slate-500 tracking-wider block">
                  {t('common.reference')}
                </span>
                <code className="text-[11px] bg-slate-950/40 px-2 py-1 rounded border border-glass-border font-mono text-cyan-300 break-all inline-block">
                  {calculator.reference}
                </code>
              </div>
              
              {calculator.mdcalcLink && (
                <a
                  href={calculator.mdcalcLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold font-display transition-colors hover:underline shrink-0 text-xs"
                >
                  {language === 'zh' ? '在 MDCalc 上查看' : 'Verify on MDCalc'}
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
};
