/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from 'react';

type Language =
  | 'zh'
  | 'zh_hans'
  | 'en'
  | 'es'
  | 'hi'
  | 'ar'
  | 'pt'
  | 'bn'
  | 'ru'
  | 'ja'
  | 'pa';

type Translations = Record<string, string>;

const translations: Record<Language, Translations> = {
  zh: {
    'app.title': 'Pocket MedCalc',
    'app.tagline': '全球內科臨床醫學計算機',
    'app.subtitle': '專為內科醫護人員設計的高階臨床計算與風險評估工具',
    'common.points': '分',
    'common.reset': '重設',
    'common.result': '計算結果',
    'common.risk': '風險評估',
    'common.interpretation': '臨床意涵與處置建議',
    'common.copy': '複製臨床紀錄',
    'common.copied': '已複製紀錄！',
    'common.ehr_copy': '複製簡要病歷',
    'common.ehr_copied': '已複製病歷！',
    'common.clinical_pearls': '臨床指引與核心觀點',
    'common.reference': '參考來源',
    'common.smart_link.diuretic': '已使用利尿劑？考慮改用 FEUrea 計算排泄率',
    'common.smart_link.hagma': '高陰離子間隙酸中毒？使用 Winter\'s Formula 評估呼吸代償',
  },
  zh_hans: {
    'app.title': 'Pocket MedCalc',
    'app.tagline': '全球内科临床医学计算机',
    'app.subtitle': '专为内科医护人员设计的高阶临床计算与风险评估工具',
    'common.points': '分',
    'common.reset': '重置',
    'common.result': '计算结果',
    'common.risk': '风险评估',
    'common.interpretation': '临床意涵与处置建议',
    'common.copy': '复制临床纪录',
    'common.copied': '已复制纪录！',
    'common.ehr_copy': '复制简要病历',
    'common.ehr_copied': '已复制病历！',
    'common.clinical_pearls': '临床指引与核心观点',
    'common.reference': '参考来源',
    'common.smart_link.diuretic': '已使用利尿剂？考虑改用 FEUrea 计算排泄率',
    'common.smart_link.hagma': '高阴离子间隙酸中毒？使用 Winter\'s Formula 评估呼吸代偿',
  },
  en: {
    'app.title': 'Pocket MedCalc',
    'app.tagline': 'Global Top‑10 Clinical Calculator',
    'app.subtitle': 'Advanced clinical calculations and risk assessments for internal medicine professionals',
    'common.points': 'pts',
    'common.reset': 'Reset',
    'common.result': 'Result',
    'common.risk': 'Risk Assessment',
    'common.interpretation': 'Clinical Pearls & Recommendations',
    'common.copy': 'Copy Clinical Note',
    'common.copied': 'Copied!',
    'common.ehr_copy': 'Copy EHR Template',
    'common.ehr_copied': 'EHR Copied!',
    'common.clinical_pearls': 'Clinical Pearls',
    'common.reference': 'Reference',
    'common.smart_link.diuretic': 'Using diuretic? Consider FEUrea instead',
    'common.smart_link.hagma': 'High anion gap metabolic acidosis? Use Winter\'s Formula to evaluate respiratory compensation',
  },
  es: {},
  hi: {},
  ar: {},
  pt: {},
  bn: {},
  ru: {},
  ja: {},
  pa: {},
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tl: (obj: Record<string, string> | undefined) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const stored = localStorage.getItem('language') as Language | null;
  const [language, setLanguageState] = useState<Language>(stored ?? 'zh');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] ?? translations.en[key] ?? key;
  };

  const tl = (obj: Record<string, string> | undefined): string => {
    if (!obj) return '';
    // Prefer exact language, then fallback to Traditional Chinese for Simplified, then English
    if (obj[language]) {
      return obj[language];
    }
    if (language === 'zh_hans' && obj['zh']) {
      return obj['zh'];
    }
    return obj['en'] ?? '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
