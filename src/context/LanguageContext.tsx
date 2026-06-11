import React, { createContext, useContext, useState } from 'react';

type Language = 'zh' | 'en';

type Translations = Record<string, string>;

const translations: Record<Language, Translations> = {
  zh: {
    // App Header
    'app.title': 'Pocket MedCalc',
    'app.tagline': '全球內科臨床醫學計算機',
    'app.subtitle': '專為內科醫護人員設計的高階臨床計算與風險評估工具',
    
    // Navigation
    'nav.cardiology': '心臟內科',
    'nav.nephrology': '腎臟內科',
    'nav.cardiology.abbr': 'Cardio',
    'nav.nephrology.abbr': 'Nephro',
    
    // Common
    'common.clinical_pearls': '小麻臨床指引 (Clinical Pearls)',
    'common.result': '即時計算結果',
    'common.risk': '風險評估',
    'common.points': '分',
    'common.interpretation': '臨床決策與解讀',
    'common.reference': '醫學邏輯與公式',
    'common.copy': '複製臨床紀錄',
    'common.copied': '已複製！',
    'common.reset': '重設',
    'common.diuretic_warning': '注意：患者若使用利尿劑，FeNa 結果可能失真。',
    'common.error.divzero': '錯誤：尿肌酸酐或血鈉不能為 0',
    'common.error.invalid': '請輸入有效的數值',
    
    // CHA2DS2-VASc
    'chads.title': 'CHA₂DS₂-VASc Score',
    'chads.subtitle': '非瓣膜性心房顫動患者中風風險評估',
    'chads.input.age': '年齡級距 (Age)',
    'chads.age.under65': '小於 65 歲 (0分)',
    'chads.age.65_74': '65–74 歲 (+1分)',
    'chads.age.75plus': '75 歲或以上 (+2分)',
    'chads.input.sex': '生理性別 (Sex)',
    'chads.sex.male': '男性 (0分)',
    'chads.sex.female': '女性 (+1分)',
    'chads.input.criteria': '臨床病史與危險因子',
    'chads.chf': '鬱血性心衰竭病史 (+1分)',
    'chads.chf.tooltip': '鬱血性心衰竭、中重度左心室收縮功能不全或 LVEF ≤ 40%',
    'chads.htn': '高血壓病史 (+1分)',
    'chads.htn.tooltip': '血壓持續 > 140/90 mmHg 或正在服用降血壓藥物',
    'chads.dm': '糖尿病病史 (+1分)',
    'chads.dm.tooltip': '空腹血糖 ≥ 126 mg/dL 或正在使用胰島素/口服降糖藥物',
    'chads.stroke': '中風 / TIA / 血栓病史 (+2分)',
    'chads.stroke.tooltip': '先前發生過缺血性腦中風、短暫性腦缺血發作 (TIA) 或全身性動脈栓塞',
    'chads.vasc': '血管疾病病史 (+1分)',
    'chads.vasc.tooltip': '先前發生過心肌梗塞 (MI)、周邊動脈疾病 (PAD) 或主動脈斑塊',
    
    // CHA2DS2-VASc Risk Interpretation
    'chads.risk.low': '低風險 (Low Risk)',
    'chads.risk.medium': '中度風險 (Moderate Risk)',
    'chads.risk.high': '高風險 (High Risk)',
    'chads.risk.low.desc': '中風風險極低，臨床指引一般建議無需抗凝血或抗血小板治療。',
    'chads.risk.medium.desc': '中度中風風險。若為男性 1 分，建議考慮使用口服抗凝血劑 (OAC)。若為女性 1 分（僅因性別），則屬低風險，可不予治療。',
    'chads.risk.high.desc': '高達中風高風險！強烈建議使用口服抗凝血劑 (如 NOAC 或 Warfarin) 進行中風預防，除非有絕對禁忌症。',
    
    // FeNa
    'fena.title': 'FeNa (鈉排泄分數)',
    'fena.subtitle': '急性腎損傷 (AKI) 腎前性與腎小管壞死之鑑別診斷',
    'fena.input.group': '實驗室數據輸入',
    'fena.serum_na': '血鈉 (Serum Na)',
    'fena.urine_na': '尿鈉 (Urine Na)',
    'fena.serum_cr': '血肌酸酐 (Serum Cr)',
    'fena.urine_cr': '尿肌酸酐 (Urine Cr)',
    'fena.unit.na': 'mmol/L (mEq/L)',
    'fena.unit.cr': 'mg/dL',
    
    // FeNa Risk Interpretation
    'fena.result.prerenal': '腎前性因素 (Prerenal Azotemia)',
    'fena.result.atn': '急性腎小管壞死 (ATN)',
    'fena.result.gray': '灰色地帶 / 混合性因素 (Indeterminate / Mixed)',
    'fena.result.prerenal.desc': 'FeNa < 1%：表示腎小管重吸收鈉的功能完整，提示急性腎損傷由腎臟灌流不足（如脫水、失血、心衰竭、敗血症早期等）所致。治療應以補充輸液與改善灌流為主。',
    'fena.result.atn.desc': 'FeNa > 2%：表示腎小管受損、無法有效重吸收鈉，提示急性腎小管壞死 (ATN)。常見於腎毒性藥物、嚴重缺血、急性間質性腎炎等。需著重於控制液體與電解質平衡，並停用腎毒性藥物。',
    'fena.result.gray.desc': 'FeNa 介於 1% 至 2% 之間：臨床意義較不具特異性。可能見於早期 ATN、慢性腎臟病 (CKD) 合併急性腎損傷、腎阻塞，或者因患者已使用利尿劑導致鈉排泄增加。需綜合臨床症狀判斷。',
    
    // Pearls Content
    'chads.pearls.content1': 'CHA₂DS₂-VASc 評分是用於預測非瓣膜性心房顫動患者缺血性中風風險的國際標準指引。',
    'chads.pearls.content2': '治療決策指引：',
    'chads.pearls.content3': '• 男性 0 分 / 女性 1 分：不建議抗凝血治療。',
    'chads.pearls.content4': '• 男性 1 分 / 女性 2 分：應考慮使用口服抗凝血劑 (OAC)，並根據患者意願與出血風險（如 HAS-BLED 評分）進行個體化評估。',
    'chads.pearls.content5': '• 男性 ≥ 2 分 / 女性 ≥ 3 分：強烈建議（Class I 推薦）使用口服抗凝血劑，目前指引首選非維生素 K 拮抗劑口服抗凝血劑 (NOAC/DOAC)。',
    
    'fena.pearls.formula_desc': 'FeNa 的計算基於鈉與肌酸酐的清除率比值，公式如下：',
    'fena.pearls.formula_math': 'FeNa (%) = (Urine Na × Serum Cr) / (Serum Na × Urine Cr) × 100',
    'fena.pearls.caveats_title': '臨床決策限制：',
    'fena.pearls.caveat1': '1. 利尿劑影響：使用 Loop 類利尿劑會抑制鈉的重吸收，導致 FeNa 假性升高（通常 > 1% 甚至 > 2%）。此時應改用「尿素排泄分數 (FeUrea)」評估，FeUrea < 35% 提示腎前性。',
    'fena.pearls.caveat2': '2. 慢性腎臟病 (CKD)：慢性腎病患者由於功能性腎元減少，基線 FeNa 常大於 1%，即使在腎前性狀態下亦然。',
    'fena.pearls.caveat3': '3. 特殊例外：造影劑腎病 (Contrast Nephropathy) 或急性腎絲球腎炎 (Acute Glomerulonephritis) 雖為腎內性病變，但其 FeNa 常小於 1%。',
  },
  en: {
    // App Header
    'app.title': 'Pocket MedCalc',
    'app.tagline': 'Global Internal Medicine Clinical Calculator',
    'app.subtitle': 'Premium clinical calculator & risk assessment tool designed for internal medicine professionals',
    
    // Navigation
    'nav.cardiology': 'Cardiology',
    'nav.nephrology': 'Nephrology',
    'nav.cardiology.abbr': 'Cardio',
    'nav.nephrology.abbr': 'Nephro',
    
    // Common
    'common.clinical_pearls': 'Clinical Pearls',
    'common.result': 'Real-time Result',
    'common.risk': 'Risk Assessment',
    'common.points': 'pts',
    'common.interpretation': 'Clinical Interpretation',
    'common.reference': 'Medical Logic & Formula',
    'common.copy': 'Copy Clinical Note',
    'common.copied': 'Copied!',
    'common.reset': 'Reset',
    'common.diuretic_warning': 'Warning: FeNa may be unreliable if the patient is on diuretics.',
    'common.error.divzero': 'Error: Urine Cr or Serum Na cannot be 0',
    'common.error.invalid': 'Please enter valid numbers',
    
    // CHA2DS2-VASc
    'chads.title': 'CHA₂DS₂-VASc Score',
    'chads.subtitle': 'Stroke risk assessment in patients with non-valvular atrial fibrillation',
    'chads.input.age': 'Age Category',
    'chads.age.under65': 'Under 65 years (0 pt)',
    'chads.age.65_74': '65–74 years (+1 pt)',
    'chads.age.75plus': '75 years or older (+2 pts)',
    'chads.input.sex': 'Biological Sex',
    'chads.sex.male': 'Male (0 pt)',
    'chads.sex.female': 'Female (+1 pt)',
    'chads.input.criteria': 'Clinical Co-morbidities & Risk Factors',
    'chads.chf': 'Congestive Heart Failure (+1 pt)',
    'chads.chf.tooltip': 'Congestive heart failure, moderate-to-severe LV dysfunction, or LVEF ≤ 40%',
    'chads.htn': 'Hypertension (+1 pt)',
    'chads.htn.tooltip': 'BP consistently > 140/90 mmHg or treated with antihypertensive drugs',
    'chads.dm': 'Diabetes Mellitus (+1 pt)',
    'chads.dm.tooltip': 'Fasting glucose ≥ 126 mg/dL or on insulin/oral hypoglycemic therapy',
    'chads.stroke': 'Stroke / TIA / Thromboembolism (+2 pts)',
    'chads.stroke.tooltip': 'Prior stroke, transient ischemic attack (TIA), or systemic embolism',
    'chads.vasc': 'Vascular Disease (+1 pt)',
    'chads.vasc.tooltip': 'Prior myocardial infarction (MI), peripheral artery disease (PAD), or aortic plaque',
    
    // CHA2DS2-VASc Risk Interpretation
    'chads.risk.low': 'Low Risk',
    'chads.risk.medium': 'Moderate Risk',
    'chads.risk.high': 'High Risk',
    'chads.risk.low.desc': 'Very low stroke risk. Guidelines recommend no antithrombotics or anticoagulation therapy.',
    'chads.risk.medium.desc': 'Moderate stroke risk. If male 1 score, OAC should be considered. If female 1 score (due to female sex alone), it is classified as low risk, and no treatment is recommended.',
    'chads.risk.high.desc': 'High stroke risk! Oral anticoagulation (OAC) therapy (preferably NOAC/DOAC, or Warfarin) is strongly recommended to prevent stroke, unless contraindicated.',
    
    // FeNa
    'fena.title': 'Fractional Excretion of Sodium (FeNa)',
    'fena.subtitle': 'Differentiating prerenal etiology from acute tubular necrosis (ATN) in AKI',
    'fena.input.group': 'Laboratory Values',
    'fena.serum_na': 'Serum Sodium (Serum Na)',
    'fena.urine_na': 'Urine Sodium (Urine Na)',
    'fena.serum_cr': 'Serum Creatinine (Serum Cr)',
    'fena.urine_cr': 'Urine Creatinine (Urine Cr)',
    'fena.unit.na': 'mmol/L (mEq/L)',
    'fena.unit.cr': 'mg/dL',
    
    // FeNa Risk Interpretation
    'fena.result.prerenal': 'Prerenal Azotemia',
    'fena.result.atn': 'Acute Tubular Necrosis (ATN)',
    'fena.result.gray': 'Indeterminate / Mixed Zone',
    'fena.result.prerenal.desc': 'FeNa < 1%: Indicates intact tubular sodium reabsorption. Suggests AKI is due to decreased renal perfusion (e.g., dehydration, blood loss, heart failure, early sepsis). Treatment centers on fluid resuscitation and correcting volume status.',
    'fena.result.atn.desc': 'FeNa > 2%: Indicates damaged tubules unable to reabsorb sodium. Suggests intrinsic renal injury, typically Acute Tubular Necrosis (ATN) due to ischemia or nephrotoxins. Focus on fluid balance, avoiding nephrotoxins, and electrolyte management.',
    'fena.result.gray.desc': 'FeNa 1%–2%: Indeterminate. May represent early ATN, pre-existing chronic kidney disease (CKD) with superimposed acute injury, urinary obstruction, or the effect of prior diuretic therapy. Correlate with sediment analysis and clinical history.',
    
    // Pearls Content
    'chads.pearls.content1': 'The CHA₂DS₂-VASc score is a clinical prediction rule used to estimate the risk of stroke in patients with non-valvular atrial fibrillation.',
    'chads.pearls.content2': 'Treatment Decision Framework:',
    'chads.pearls.content3': '• Male 0 / Female 1: Anticoagulation not recommended.',
    'chads.pearls.content4': '• Male 1 / Female 2: OAC should be considered based on patient preference and bleeding risk (e.g., HAS-BLED score).',
    'chads.pearls.content5': '• Male ≥ 2 / Female ≥ 3: OAC is strongly recommended (Class I recommendation), with NOACs preferred over Warfarin in eligible patients.',
    
    'fena.pearls.formula_desc': 'FeNa is calculated based on the clearance ratio of sodium relative to creatinine:',
    'fena.pearls.formula_math': 'FeNa (%) = (Urine Na × Serum Cr) / (Serum Na × Urine Cr) × 100',
    'fena.pearls.caveats_title': 'Clinical Limitations:',
    'fena.pearls.caveat1': '1. Diuretics: Loop diuretics inhibit sodium reabsorption and artificially elevate FeNa (often > 1-2%). Fractional Excretion of Urea (FEUrea) is preferred in this setting, with FEUrea < 35% suggesting a prerenal state.',
    'fena.pearls.caveat2': '2. CKD: Patients with chronic kidney disease have a baseline reduction in nephron mass, causing chronic sodium wasting (baseline FeNa > 1%), even when depleted.',
    'fena.pearls.caveat3': '3. Exceptions: Contrast nephropathy and acute glomerulonephritis are intrinsic renal diseases that frequently present with a FeNa < 1% due to rapid ischemic/vascular reflexes.',
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('pocket_medcalc_lang');
    return (saved === 'en' || saved === 'zh') ? saved as Language : 'zh';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('pocket_medcalc_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
