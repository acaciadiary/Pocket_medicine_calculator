import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Accordion } from '../components/Accordion';
import { Info, Copy, Check, RotateCcw, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChadsVasc: React.FC = () => {
  const { t, language } = useLanguage();

  // State values
  const [ageGroup, setAgeGroup] = useState<'under65' | '65-74' | '75plus'>('under65');
  const [isFemale, setIsFemale] = useState<boolean>(false);
  const [chf, setChf] = useState<boolean>(false);
  const [htn, setHtn] = useState<boolean>(false);
  const [dm, setDm] = useState<boolean>(false);
  const [stroke, setStroke] = useState<boolean>(false);
  const [vasc, setVasc] = useState<boolean>(false);
  
  const [score, setScore] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Recalculate score instantly when inputs change
  useEffect(() => {
    let newScore = 0;
    
    // Age criteria
    if (ageGroup === '65-74') newScore += 1;
    else if (ageGroup === '75plus') newScore += 2;
    
    // Sex criteria
    if (isFemale) newScore += 1;
    
    // Comorbidities
    if (chf) newScore += 1;
    if (htn) newScore += 1;
    if (dm) newScore += 1;
    if (stroke) newScore += 2;
    if (vasc) newScore += 1;

    setScore(newScore);
  }, [ageGroup, isFemale, chf, htn, dm, stroke, vasc]);

  // Determine Risk Level
  const getRiskInfo = (s: number) => {
    if (s === 0) {
      return {
        level: t('common.risk.low'),
        color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
        desc: t('chads.risk.low.desc'),
        recommendation: language === 'zh' ? '不建議抗凝血治療。' : 'Anticoagulation therapy not recommended.'
      };
    } else if (s === 1) {
      return {
        level: t('common.risk.medium'),
        color: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
        desc: t('chads.risk.medium.desc'),
        recommendation: language === 'zh' ? '建議考慮使用口服抗凝血劑 (OAC)。' : 'Consider oral anticoagulation (OAC) therapy.'
      };
    } else {
      return {
        level: t('common.risk.high'),
        color: 'text-rose-400 bg-rose-950/40 border-rose-500/30',
        glow: 'shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse',
        desc: t('chads.risk.high.desc'),
        recommendation: language === 'zh' ? '強烈建議使用口服抗凝血劑 (OAC)。' : 'Oral anticoagulation (OAC) therapy is strongly recommended.'
      };
    }
  };

  const risk = getRiskInfo(score);

  // Copy clinical note function
  const copyClinicalNote = () => {
    const ageText = ageGroup === 'under65' ? '<65' : ageGroup === '65-74' ? '65-74' : '≥75';
    const sexText = isFemale ? 'Female' : 'Male';
    
    const details: string[] = [];
    if (ageGroup === '65-74') details.push('Age 65-74 (+1)');
    else if (ageGroup === '75plus') details.push('Age ≥75 (+2)');
    if (isFemale) details.push('Female (+1)');
    if (chf) details.push('CHF (+1)');
    if (htn) details.push('Hypertension (+1)');
    if (dm) details.push('Diabetes (+1)');
    if (stroke) details.push('Stroke/TIA (+2)');
    if (vasc) details.push('Vascular Disease (+1)');
    
    const detailsStr = details.length > 0 ? ` (${details.join(', ')})` : '';

    const note = `[Clinical Note] CHA₂DS₂-VASc Score: ${score} points\n` +
                 `Risk Level: ${risk.level}\n` +
                 `Demographics: ${sexText}, ${ageText} yrs\n` +
                 `Factors checked:${detailsStr || ' None'}\n` +
                 `Clinical recommendation: ${risk.recommendation}`;
    
    navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset calculations
  const resetAll = () => {
    setAgeGroup('under65');
    setIsFemale(false);
    setChf(false);
    setHtn(false);
    setDm(false);
    setStroke(false);
    setVasc(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Input panel */}
      <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl border border-glass-border shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-glass-border/40 pb-4">
          <div>
            <h2 className="text-xl font-bold font-display tracking-wide text-white">{t('chads.title')}</h2>
            <p className="text-xs text-slate-400 mt-1 font-sans">{t('chads.subtitle')}</p>
          </div>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/40 text-slate-300 transition-all cursor-pointer"
          >
            <RotateCcw size={12} />
            {t('common.reset')}
          </button>
        </div>

        {/* Form elements */}
        <div className="space-y-5">
          {/* Age Group - Segmented Control */}
          <div className="space-y-2.5">
            <label className="text-sm font-semibold text-slate-300 font-display flex items-center gap-2">
              {t('chads.input.age')}
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-950/50 p-1 rounded-xl border border-glass-border">
              {(['under65', '65-74', '75plus'] as const).map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setAgeGroup(group)}
                  className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer relative ${
                    ageGroup === group ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="relative z-10">
                    {group === 'under65' && t('chads.age.under65')}
                    {group === '65-74' && t('chads.age.65_74')}
                    {group === '75plus' && t('chads.age.75plus')}
                  </span>
                  {ageGroup === group && (
                    <motion.div
                      layoutId="chadsAgeBg"
                      className="absolute inset-0 bg-cyan-600/30 border border-cyan-500/40 rounded-lg"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Biological Sex - Segmented Control */}
          <div className="space-y-2.5">
            <label className="text-sm font-semibold text-slate-300 font-display flex items-center gap-2">
              {t('chads.input.sex')}
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-950/50 p-1 rounded-xl border border-glass-border">
              <button
                type="button"
                onClick={() => setIsFemale(false)}
                className={`py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer relative ${
                  !isFemale ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="relative z-10">{t('chads.sex.male')}</span>
                {!isFemale && (
                  <motion.div
                    layoutId="chadsSexBg"
                    className="absolute inset-0 bg-cyan-600/30 border border-cyan-500/40 rounded-lg"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsFemale(true)}
                className={`py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer relative ${
                  isFemale ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="relative z-10">{t('chads.sex.female')}</span>
                {isFemale && (
                  <motion.div
                    layoutId="chadsSexBg"
                    className="absolute inset-0 bg-cyan-600/30 border border-cyan-500/40 rounded-lg"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Risk Factors Checkboxes */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300 font-display block">
              {t('chads.input.criteria')}
            </label>
            
            <div className="space-y-2.5">
              {/* CHF */}
              <div
                onClick={() => setChf(!chf)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                  chf 
                    ? 'bg-cyan-950/30 border-cyan-500/40 text-white shadow-[0_2px_10px_rgba(6,182,212,0.05)]' 
                    : 'bg-slate-900/40 border-glass-border/60 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                    chf ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-500/50'
                  }`}>
                    {chf && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className="text-xs md:text-sm font-medium">{t('chads.chf')}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTooltip(activeTooltip === 'chf' ? null : 'chf');
                  }}
                  className="text-slate-500 hover:text-cyan-400 p-1 transition-colors"
                >
                  <Info size={16} />
                </button>
              </div>
              <AnimatePresence>
                {activeTooltip === 'chf' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-slate-900/80 border border-glass-border/30 rounded-xl px-4 py-2.5 text-xs text-slate-400"
                  >
                    {t('chads.chf.tooltip')}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* HTN */}
              <div
                onClick={() => setHtn(!htn)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                  htn 
                    ? 'bg-cyan-950/30 border-cyan-500/40 text-white shadow-[0_2px_10px_rgba(6,182,212,0.05)]' 
                    : 'bg-slate-900/40 border-glass-border/60 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                    htn ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-500/50'
                  }`}>
                    {htn && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className="text-xs md:text-sm font-medium">{t('chads.htn')}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTooltip(activeTooltip === 'htn' ? null : 'htn');
                  }}
                  className="text-slate-500 hover:text-cyan-400 p-1 transition-colors"
                >
                  <Info size={16} />
                </button>
              </div>
              <AnimatePresence>
                {activeTooltip === 'htn' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-slate-900/80 border border-glass-border/30 rounded-xl px-4 py-2.5 text-xs text-slate-400"
                  >
                    {t('chads.htn.tooltip')}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* DM */}
              <div
                onClick={() => setDm(!dm)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                  dm 
                    ? 'bg-cyan-950/30 border-cyan-500/40 text-white shadow-[0_2px_10px_rgba(6,182,212,0.05)]' 
                    : 'bg-slate-900/40 border-glass-border/60 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                    dm ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-500/50'
                  }`}>
                    {dm && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className="text-xs md:text-sm font-medium">{t('chads.dm')}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTooltip(activeTooltip === 'dm' ? null : 'dm');
                  }}
                  className="text-slate-500 hover:text-cyan-400 p-1 transition-colors"
                >
                  <Info size={16} />
                </button>
              </div>
              <AnimatePresence>
                {activeTooltip === 'dm' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-slate-900/80 border border-glass-border/30 rounded-xl px-4 py-2.5 text-xs text-slate-400"
                  >
                    {t('chads.dm.tooltip')}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stroke */}
              <div
                onClick={() => setStroke(!stroke)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                  stroke 
                    ? 'bg-cyan-950/30 border-cyan-500/40 text-white shadow-[0_2px_10px_rgba(6,182,212,0.05)]' 
                    : 'bg-slate-900/40 border-glass-border/60 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                    stroke ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-500/50'
                  }`}>
                    {stroke && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className="text-xs md:text-sm font-medium text-rose-300/90 font-semibold">{t('chads.stroke')}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTooltip(activeTooltip === 'stroke' ? null : 'stroke');
                  }}
                  className="text-slate-500 hover:text-cyan-400 p-1 transition-colors"
                >
                  <Info size={16} />
                </button>
              </div>
              <AnimatePresence>
                {activeTooltip === 'stroke' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-slate-900/80 border border-glass-border/30 rounded-xl px-4 py-2.5 text-xs text-slate-400"
                  >
                    {t('chads.stroke.tooltip')}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Vascular */}
              <div
                onClick={() => setVasc(!vasc)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                  vasc 
                    ? 'bg-cyan-950/30 border-cyan-500/40 text-white shadow-[0_2px_10px_rgba(6,182,212,0.05)]' 
                    : 'bg-slate-900/40 border-glass-border/60 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                    vasc ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-500/50'
                  }`}>
                    {vasc && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className="text-xs md:text-sm font-medium">{t('chads.vasc')}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTooltip(activeTooltip === 'vasc' ? null : 'vasc');
                  }}
                  className="text-slate-500 hover:text-cyan-400 p-1 transition-colors"
                >
                  <Info size={16} />
                </button>
              </div>
              <AnimatePresence>
                {activeTooltip === 'vasc' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-slate-900/80 border border-glass-border/30 rounded-xl px-4 py-2.5 text-xs text-slate-400"
                  >
                    {t('chads.vasc.tooltip')}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Output / Result Panel */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-glass-border shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Top subtle glow light */}
          <div className="absolute top-0 w-1/2 h-1 bg-cyan-400/40 blur-md rounded-full"></div>
          
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 font-display">
            {t('common.result')}
          </h3>

          {/* Elegant Circular Score Indicator */}
          <div className="relative w-44 h-44 flex items-center justify-center mb-6">
            {/* Outer rings */}
            <div className="absolute inset-0 rounded-full border border-slate-800/40"></div>
            <div className="absolute inset-2 rounded-full border border-glass-border"></div>
            
            {/* Pulsing glow under score */}
            <div className={`absolute inset-4 rounded-full filter blur-md opacity-25 transition-all duration-500 ${
              score === 0 ? 'bg-emerald-500' : score === 1 ? 'bg-amber-500' : 'bg-rose-500'
            }`}></div>

            {/* Score Text */}
            <div className="z-10 flex flex-col items-center">
              <motion.span
                key={score}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-extrabold font-display leading-none text-white tracking-tight"
              >
                {score}
              </motion.span>
              <span className="text-xs font-semibold text-slate-400 uppercase mt-1 tracking-wider">
                {t('common.points')}
              </span>
            </div>
          </div>

          {/* Risk Level Badge */}
          <div className={`px-4 py-2 rounded-full border text-xs font-bold tracking-wide flex items-center gap-1.5 mb-5 transition-all duration-300 ${risk.color} ${risk.glow}`}>
            {score >= 2 && <AlertTriangle size={13} className="animate-bounce" />}
            {risk.level}
          </div>

          {/* Description & Clinical Recommendation */}
          <div className="space-y-4 w-full">
            <div className="border-t border-glass-border/40 my-3"></div>
            
            <div className="text-left space-y-3.5">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase block font-display mb-1">{t('common.risk')}</span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">{risk.desc}</p>
              </div>
              
              <div className="bg-slate-950/45 border border-glass-border p-3.5 rounded-2xl">
                <span className="text-xs font-semibold text-cyan-400 uppercase block font-display mb-1">{t('common.interpretation')}</span>
                <p className="text-xs md:text-sm text-slate-200 font-semibold leading-relaxed">{risk.recommendation}</p>
              </div>
            </div>

            <div className="border-t border-glass-border/40 my-3"></div>

            {/* Actions: Copy Clinical note */}
            <button
              onClick={copyClinicalNote}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer shadow-md ${
                copied
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
            <p className="font-medium text-slate-200 text-sm">{t('chads.pearls.content1')}</p>
            
            <div className="bg-slate-950/30 p-4 rounded-xl border border-glass-border/40 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block font-display">
                {t('chads.pearls.content2')}
              </span>
              <p className="text-xs text-slate-300">{t('chads.pearls.content3')}</p>
              <p className="text-xs text-slate-300">{t('chads.pearls.content4')}</p>
              <p className="text-xs text-slate-300">{t('chads.pearls.content5')}</p>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1 mt-2 border-t border-glass-border/20 pt-3 leading-relaxed">
              <p>* 註：性別危險因子 (女性 +1分) 屬於修飾因子。在無其他危險因子的情況下，僅女性一項得 1 分者不建議予以抗凝血劑。</p>
              <p>* 臨床決策須搭配出血風險（如 HAS-BLED 評分）以及患者臨床意願共同評估。</p>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
};
