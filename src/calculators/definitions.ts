/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InputOption {
  label: { zh: string; en: string };
  value: any;
  points?: number;
}

export interface CalculatorInput {
  id: string;
  name: { zh: string; en: string };
  type: 'number' | 'boolean' | 'select';
  defaultValue: any;
  unit?: string;
  options?: InputOption[];
  min?: number;
  max?: number;
  step?: number;
  tooltip?: { zh: string; en: string };
}

export interface CalculationResult {
  score?: number;
  value?: number;
  valueText?: string;
  unit?: string;
  riskLevel?: { zh: string; en: string };
  riskColor?: string;
  description: { zh: string; en: string };
  recommendation?: { zh: string; en: string };
  error?: string;
}

export interface Calculator {
  id: string;
  name: { zh: string; en: string };
  subtitle: { zh: string; en: string };
  category: 'cardiology' | 'pulmonary' | 'nephrology' | 'acid_base' | 'gastroenterology' | 'hematology' | 'oncology' | 'endocrinology' | 'infectious_diseases' | 'rheumatology';
  inputs: CalculatorInput[];
  calculate: (values: Record<string, any>) => CalculationResult;
  reference: string;
  pearls: { zh: string[]; en: string[] };
  mdcalcLink: string;
}

export const CATEGORIES = {
  cardiology: { zh: '心臟內科', en: 'Cardiology' },
  pulmonary: { zh: '胸腔內科', en: 'Pulmonary' },
  nephrology: { zh: '腎臟內科', en: 'Nephrology' },
  acid_base: { zh: '酸鹼平衡', en: 'Acid-Base' },
  gastroenterology: { zh: '腸胃肝膽科', en: 'Gastroenterology' },
  hematology: { zh: '血液內科', en: 'Hematology' },
  oncology: { zh: '腫瘤科', en: 'Oncology' },
  endocrinology: { zh: '新陳代謝科', en: 'Endocrinology' },
  infectious_diseases: { zh: '感染科', en: 'Infectious Diseases' },
  rheumatology: { zh: '過敏免疫風濕科', en: 'Rheumatology' },
};

export const calculatorsList: Calculator[] = [
  {
    id: 'chads-vasc',
    name: { zh: 'CHA₂DS₂-VASc 評分', en: 'CHA₂DS₂-VASc Score' },
    subtitle: { zh: '心房顫動腦中風風險評估', en: 'Stroke Risk in Atrial Fibrillation' },
    category: 'cardiology',
    inputs: [
      {
        id: 'age',
        name: { zh: '年齡級距', en: 'Age Category' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '小於 65 歲 (0分)', en: 'Under 65 years (0 pt)' }, value: 0, points: 0 },
          { label: { zh: '65–74 歲 (+1分)', en: '65–74 years (+1 pt)' }, value: 1, points: 1 },
          { label: { zh: '75 歲或以上 (+2分)', en: '75 years or older (+2 pts)' }, value: 2, points: 2 },
        ]
      },
      {
        id: 'sex',
        name: { zh: '生理性別', en: 'Biological Sex' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '男性 (0分)', en: 'Male (0 pt)' }, value: 0, points: 0 },
          { label: { zh: '女性 (+1分)', en: 'Female (+1 pt)' }, value: 1, points: 1 },
        ]
      },
      { id: 'chf', name: { zh: '鬱血性心衰竭病史 (+1分)', en: 'Congestive Heart Failure (+1 pt)' }, type: 'boolean', defaultValue: false, tooltip: { zh: '左心室收縮功能不全或 LVEF ≤ 40%', en: 'Moderate-to-severe LV dysfunction or LVEF ≤ 40%' } },
      { id: 'htn', name: { zh: '高血壓病史 (+1分)', en: 'Hypertension (+1 pt)' }, type: 'boolean', defaultValue: false, tooltip: { zh: '血壓持續 > 140/90 mmHg 或正在服用降壓藥', en: 'BP > 140/90 mmHg or treated with antihypertensive drugs' } },
      { id: 'dm', name: { zh: '糖尿病病史 (+1分)', en: 'Diabetes Mellitus (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'stroke', name: { zh: '中風 / TIA / 全身性動脈栓塞病史 (+2分)', en: 'Stroke / TIA / Thromboembolism (+2 pts)' }, type: 'boolean', defaultValue: false },
      { id: 'vasc', name: { zh: '血管疾病病史 (+1分)', en: 'Vascular Disease (+1 pt)' }, type: 'boolean', defaultValue: false, tooltip: { zh: '心肌梗塞 (MI)、周邊動脈疾病 (PAD) 或主動脈斑塊', en: 'Prior MI, peripheral artery disease (PAD), or aortic plaque' } }
    ],
    calculate: (values) => {
      let score = 0;
      score += Number(values.age);
      score += Number(values.sex);
      if (values.chf) score += 1;
      if (values.htn) score += 1;
      if (values.dm) score += 1;
      if (values.stroke) score += 2;
      if (values.vasc) score += 1;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score === 0) {
        riskLevel = { zh: '低風險', en: 'Low Risk' };
        desc = { zh: '中風風險極低，指引建議無需口服抗凝血劑。', en: 'Very low stroke risk. Guidelines recommend no oral anticoagulation.' };
        recommendation = { zh: '不建議使用抗凝血治療。', en: 'No anticoagulation recommended.' };
      } else if (score === 1) {
        riskLevel = { zh: '中度風險', en: 'Moderate Risk' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: '中等中風風險。男性 1 分建議考慮 OAC。女性 1 分僅屬性別加分，屬低風險。', en: 'Moderate stroke risk. Consider OAC in males with 1 point. Female 1 point (sex alone) is low risk.' };
        recommendation = { zh: '建議考慮使用口服抗凝血劑 (OAC)。', en: 'Consider oral anticoagulation (OAC).' };
      } else {
        riskLevel = { zh: '高風險', en: 'High Risk' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: '中風高風險！強烈建議使用口服抗凝血劑進行中風預防，除非有禁忌症。', en: 'High stroke risk! Strong recommendation for oral anticoagulation (NOAC/DOAC or Warfarin).' };
        recommendation = { zh: '強烈建議使用口服抗凝血劑 (OAC)，首選 NOAC/DOAC。', en: 'Oral anticoagulation strongly recommended, preferably NOAC/DOAC.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'CHA₂DS₂-VASc = C + H + A₂ + D + S₂ + V + A + Sc',
    pearls: {
      zh: [
        'CHA₂DS₂-VASc 評分是用於估計非瓣膜性心房顫動患者中風機率的國際標準。',
        '性別危險因子 (女性+1分) 為修飾因子；若無其他因子，女性僅得1分時不建議抗凝血。',
        '對於瓣膜性心房顫動 (中重度二尖瓣狹窄或機械瓣膜)，必須使用 Warfarin，不可使用新一代口服抗凝血劑 (NOAC)。'
      ],
      en: [
        'CHA₂DS₂-VASc is a standard clinical prediction rule for stroke risk in non-valvular atrial fibrillation.',
        'Female sex (+1 pt) is a modifier. If no other risk factor is present, female sex alone (score 1) does not warrant anticoagulation.',
        'Valvular AF (moderate-to-severe mitral stenosis or mechanical heart valve) is an absolute indication for warfarin; DOACs are contraindicated.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/801/chads2-vasc-score-atrial-fibrillation-stroke-risk'
  },
  {
    id: 'fena',
    name: { zh: 'FeNa (鈉排泄分數)', en: 'FeNa (Fractional Excretion of Sodium)' },
    subtitle: { zh: 'AKI 腎前性與腎小管壞死之鑑別診斷', en: 'Differentiating Prerenal AKI from ATN' },
    category: 'nephrology',
    inputs: [
      { id: 'serumNa', name: { zh: '血鈉', en: 'Serum Sodium' }, type: 'number', defaultValue: 140, unit: 'mmol/L', min: 0 },
      { id: 'urineNa', name: { zh: '尿鈉', en: 'Urine Sodium' }, type: 'number', defaultValue: 20, unit: 'mmol/L', min: 0 },
      { id: 'serumCr', name: { zh: '血肌酸酐', en: 'Serum Creatinine' }, type: 'number', defaultValue: 1.0, unit: 'mg/dL', min: 0 },
      { id: 'urineCr', name: { zh: '尿肌酸酐', en: 'Urine Creatinine' }, type: 'number', defaultValue: 50, unit: 'mg/dL', min: 0 }
    ],
    calculate: (values) => {
      const sNa = Number(values.serumNa);
      const uNa = Number(values.urineNa);
      const sCr = Number(values.serumCr);
      const uCr = Number(values.urineCr);

      if (!sNa || !uCr) {
        return { error: 'Division by zero / Invalid input', description: { zh: '血鈉或尿肌酸酐不能為 0。', en: 'Serum Na or Urine Cr cannot be zero.' } };
      }

      const value = (uNa * sCr) / (sNa * uCr) * 100;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };

      if (value < 1.0) {
        riskLevel = { zh: '腎前性因素 (Prerenal)', en: 'Prerenal Azotemia' };
        desc = { zh: 'FeNa < 1%：提示腎小管重吸收功能完整，AKI 由灌流不足所致（脫水、休克、心衰竭）。治療以補充液體為主。', en: 'FeNa < 1%: Suggests intact renal tubular reabsorption. Etiology is likely prerenal volume depletion.' };
      } else if (value > 2.0) {
        riskLevel = { zh: '腎小管壞死 (ATN)', en: 'Acute Tubular Necrosis' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: 'FeNa > 2%：提示腎小管受損、無法再吸收鈉，多為急性腎小管壞死 (ATN)。須避免腎毒性藥物並調控液體平衡。', en: 'FeNa > 2%: Suggests intrinsic renal tubular injury, most commonly Acute Tubular Necrosis (ATN).' };
      } else {
        riskLevel = { zh: '混合性 / 灰色地帶', en: 'Indeterminate / Mixed' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: 'FeNa 1%–2%：不具特異性。可見於早期 ATN、慢性腎病合併 AKI，或已投予利尿劑之患者。', en: 'FeNa 1%-2%: Indeterminate. Seen in early ATN, urinary tract obstruction, or patients receiving loop diuretics.' };
      }

      return { value, unit: '%', riskLevel, riskColor, description: desc };
    },
    reference: 'FeNa (%) = \\frac{Urine\\ Na \\times Serum\\ Cr}{Serum\\ Na \\times Urine\\ Cr} \\times 100',
    pearls: {
      zh: [
        '使用利尿劑會抑制鈉的再吸收，使 FENa 假性升高（通常 >1%），此時應改用 FEUrea（尿素非鈉排泄分數）。',
        '造影劑腎病 (Contrast Nephropathy) 或急性腎絲球腎炎雖然是腎內性病變，但其 FeNa 常小於 1%。'
      ],
      en: [
        'FENa is unreliable in patients on active diuretic therapy. Use FEUrea instead (FEUrea < 35% indicates prerenal state).',
        'Contrast-induced nephropathy and acute glomerulonephritis are intrinsic renal diseases that typically present with FeNa < 1%.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/29/fractional-excretion-sodium-fena'
  },
  {
    id: 'has-bled',
    name: { zh: 'HAS-BLED 出血評分', en: 'HAS-BLED Score' },
    subtitle: { zh: '房顫抗凝血出血風險評估', en: 'Major Bleeding Risk in Atrial Fibrillation' },
    category: 'cardiology',
    inputs: [
      { id: 'h', name: { zh: '高血壓 (收縮壓 >160 mmHg) (+1分)', en: 'Uncontrolled Hypertension (SBP >160 mmHg) (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'a', name: { zh: '腎功能異常 (透析/移植/Cr >2.26) (+1分)', en: 'Abnormal Renal Function (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'l', name: { zh: '肝功能異常 (慢性肝病/膽紅素>2x/AST>3x) (+1分)', en: 'Abnormal Liver Function (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 's', name: { zh: '中風病史 (+1分)', en: 'Stroke History (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'b', name: { zh: '出血病史或傾向 (+1分)', en: 'Prior Bleeding History or Predisposition (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'e', name: { zh: 'INR 波動大 (僅限 Warfarin 使用者) (+1分)', en: 'Labile INR (for Warfarin users) (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'd', name: { zh: '年齡大於 65 歲 (+1分)', en: 'Elderly (Age >65 years) (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'drugs', name: { zh: '藥物影響 (併用抗血小板藥/NSAIDs) (+1分)', en: 'Drugs Predisposing to Bleeding (Antiplatelets/NSAIDs) (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'alcohol', name: { zh: '酗酒 (每週 ≥8 杯) (+1分)', en: 'Excess Alcohol Use (≥8 drinks/week) (+1 pt)' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let score = 0;
      if (values.h) score += 1;
      if (values.a) score += 1;
      if (values.l) score += 1;
      if (values.s) score += 1;
      if (values.b) score += 1;
      if (values.e) score += 1;
      if (values.d) score += 1;
      if (values.drugs) score += 1;
      if (values.alcohol) score += 1;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score <= 1) {
        riskLevel = { zh: '低出血風險', en: 'Low Bleeding Risk' };
        desc = { zh: '大出血年發生率低（約 1%）。使用抗凝血劑相對安全。', en: 'Low bleeding risk (major bleeding rate ~1.0%/year).' };
        recommendation = { zh: '抗凝血治療之效益顯著大於風險。', en: 'Oral anticoagulants are highly favored.' };
      } else if (score === 2) {
        riskLevel = { zh: '中度出血風險', en: 'Moderate Bleeding Risk' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: '大出血年發生率約為 1.88%。建議定期評估。', en: 'Moderate bleeding risk (major bleeding rate ~1.88%/year).' };
        recommendation = { zh: '應注意監測患者出血傾向，並矯正可控制的出血危險因子。', en: 'Monitor clinical status and manage modifiable risk factors.' };
      } else {
        riskLevel = { zh: '高出血風險', en: 'High Bleeding Risk' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: '大出血年發生率顯著升高（≥3.7%）。不應作為停用抗凝血劑的依據，但必須格外謹慎。', en: 'High bleeding risk (major bleeding rate ≥3.7%/year). Caution is warranted.' };
        recommendation = { zh: '抗凝血治療時須密切監控，避免合併使用 NSAIDs，矯正血壓並定期門診追蹤。', en: 'Careful monitoring, manage modifiable factors (BP, NSAIDs). DO NOT automatically stop OAC.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'HAS-BLED = H + A + S + B + L + E + D + Drugs + Alcohol',
    pearls: {
      zh: [
        'HAS-BLED 評分旨在識別並改善「可修正」的出血因子（如控制高血壓、停用 NSAIDs、戒酒），而非單純停用抗凝血劑。',
        '高出血風險患者 (HAS-BLED ≥3) 通常其中風風險亦高 (CHA₂DS₂-VASc 亦高)，此時抗凝血之中風預防淨臨床效益依然存在。'
      ],
      en: [
        'HAS-BLED score is designed to identify and address modifiable bleeding risk factors rather than justify stopping anticoagulation.',
        'Patients with high bleeding risk (score ≥3) usually have high stroke risk; OAC clinical net benefit is still generally positive.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/807/has-bled-score-major-bleeding-risk'
  },
  {
    id: 'timi-nstemi',
    name: { zh: 'TIMI 評分 (UA/NSTEMI)', en: 'TIMI Risk Score for UA/NSTEMI' },
    subtitle: { zh: '不穩定心絞痛 / NSTEMI 死亡及缺血事件評估', en: '14-Day Prognosis in UA/NSTEMI' },
    category: 'cardiology',
    inputs: [
      { id: 'age65', name: { zh: '年齡大於或等於 65 歲 (+1分)', en: 'Age ≥ 65 years (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'cad_risk', name: { zh: '具備 3 個或以上 CAD 危險因子 (+1分)', en: '≥3 CAD Risk Factors (+1 pt)' }, type: 'boolean', defaultValue: false, tooltip: { zh: '危險因子包括：高血壓、糖尿病、高血脂、抽菸、早發性 CAD 家族史', en: 'Risk factors: family history of CAD, hypertension, hypercholesterolemia, diabetes, active smoker' } },
      { id: 'cad_stenosis', name: { zh: '已知冠狀動脈狹窄 ≥ 50% (+1分)', en: 'Known coronary stenosis ≥ 50% (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'st_deviation', name: { zh: '心電圖顯示 ST 段偏差 (ST deviation) (+1分)', en: 'ST deviation on ECG (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'angina_episodes', name: { zh: '近 24 小時內有兩次或以上嚴重絞痛 (+1分)', en: '≥2 severe anginal episodes in 24 hours (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'aspirin', name: { zh: '近 7 天內曾使用阿斯匹靈 (Aspirin) (+1分)', en: 'Aspirin use in past 7 days (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'biomarkers', name: { zh: '心肌酵素 (Troponin/CK-MB) 升高 (+1分)', en: 'Elevated cardiac biomarkers (Troponin/CK-MB) (+1 pt)' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let score = 0;
      if (values.age65) score += 1;
      if (values.cad_risk) score += 1;
      if (values.cad_stenosis) score += 1;
      if (values.st_deviation) score += 1;
      if (values.angina_episodes) score += 1;
      if (values.aspirin) score += 1;
      if (values.biomarkers) score += 1;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score <= 2) {
        riskLevel = { zh: '低度危險 (Low Risk)', en: 'Low Risk' };
        desc = { zh: '14 天內發生全死因死亡、新發心肌梗塞或需要緊急血運重建的風險低於 8.3%。', en: '14-day risk of death, MI, or urgent revascularization is < 8.3%.' };
        recommendation = { zh: '可考慮先採取保守治療，門診追蹤或進行非侵入性負荷測試。', en: 'Conservative management and non-invasive testing are suitable.' };
      } else if (score <= 4) {
        riskLevel = { zh: '中度危險 (Intermediate Risk)', en: 'Intermediate Risk' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: '14 天內發生心血管事件之風險約為 13% - 20%。', en: '14-day risk of cardiovascular events is 13% - 20%.' };
        recommendation = { zh: '應住院評估，考慮採用早期侵入性策略 (Early Invasive Strategy) 以降低後續心梗風險。', en: 'Inpatient workup. Benefit from early invasive strategy.' };
      } else {
        riskLevel = { zh: '高度危險 (High Risk)', en: 'High Risk' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: '14 天內主要心血管不良事件 (MACE) 的風險高達 26% - 41%。', en: '14-day MACE risk is high, ranging from 26% to 41%.' };
        recommendation = { zh: '強烈建議採取早期侵入性策略（心導管檢查與冠狀動脈介入治療），並會同心臟科介入團隊。', en: 'Strongly recommend early invasive strategy (coronary angiography / PCI).' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'TIMI UA/NSTEMI = Sum of positive risk factors (max 7)',
    pearls: {
      zh: [
        'TIMI 評分主要用於急診或門診對於 UA/NSTEMI 患者的初步事件風險評估。',
        '評分 ≥ 3 分的患者，指引推薦進行早期心導管介入治療，能獲得顯著的預後效益。',
        '近 7 日內使用 Aspirin 代表病患已在常規抗血小板保護下仍發生心血管事件，反映冠脈斑塊高度不穩定。'
      ],
      en: [
        'TIMI UA/NSTEMI score assists in risk stratification and medical decision-making for chest pain triage.',
        'Patients with a score ≥ 3 gain a significant mortality and morbidity benefit from an early invasive strategy.',
        'Prior aspirin use indicates clinical event occurrence despite standard therapy, reflecting plaque instability.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/113/timi-risk-score-ua-nstemi'
  },
  {
    id: 'heart-score',
    name: { zh: 'HEART 評分', en: 'HEART Score for Chest Pain' },
    subtitle: { zh: '急診胸痛患者主要心血管事件 (MACE) 風險評估', en: '6-Week MACE Risk in ED Chest Pain' },
    category: 'cardiology',
    inputs: [
      {
        id: 'h',
        name: { zh: '病史特徵 (History)', en: 'History' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '微弱懷疑 (Slightly suspicious) (+0分)', en: 'Slightly suspicious (+0 pt)' }, value: 0 },
          { label: { zh: '中度懷疑 (Moderately suspicious) (+1分)', en: 'Moderately suspicious (+1 pt)' }, value: 1 },
          { label: { zh: '高度懷疑 (Highly suspicious) (+2分)', en: 'Highly suspicious (+2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'e',
        name: { zh: '心電圖 ST 段變化 (ECG)', en: 'ECG' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '正常 (Normal) (+0分)', en: 'Normal (+0 pt)' }, value: 0 },
          { label: { zh: '非特異性變化 (Nonspecific repolarization) (+1分)', en: 'Nonspecific (+1 pt)' }, value: 1 },
          { label: { zh: '顯著 ST 段偏差 (Significant ST deviation) (+2分)', en: 'Significant ST deviation (+2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'a',
        name: { zh: '年齡 (Age)', en: 'Age' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '小於 45 歲 (+0分)', en: '< 45 years (+0 pt)' }, value: 0 },
          { label: { zh: '45–64 歲 (+1分)', en: '45–64 years (+1 pt)' }, value: 1 },
          { label: { zh: '65 歲或以上 (+2分)', en: '≥ 65 years (+2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'r',
        name: { zh: '冠脈危險因子數量 (Risk Factors)', en: 'Risk Factors' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無危險因子 (+0分)', en: 'No risk factors (+0 pt)' }, value: 0 },
          { label: { zh: '1–2 個危險因子 (+1分)', en: '1-2 risk factors (+1 pt)' }, value: 1 },
          { label: { zh: '3 個或以上，或已知有血管硬化病史 (+2分)', en: '≥3 risk factors or atherosclerotic history (+2 pts)' }, value: 2 }
        ]
      },
      {
        id: 't',
        name: { zh: '初始肌鈣蛋白 Troponin 濃度 (Troponin)', en: 'Initial Troponin' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '正常值範圍 (≤ 正常上限值) (+0分)', en: '≤ Normal limit (+0 pt)' }, value: 0 },
          { label: { zh: '介於正常上限值的 1–3 倍之間 (+1分)', en: '1 to 3 times normal limit (+1 pt)' }, value: 1 },
          { label: { zh: '大於正常上限值的 3 倍 (+2分)', en: '>3 times normal limit (+2 pts)' }, value: 2 }
        ]
      }
    ],
    calculate: (values) => {
      const score = Number(values.h) + Number(values.e) + Number(values.a) + Number(values.r) + Number(values.t);

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score <= 3) {
        riskLevel = { zh: '低度危險 (Low Risk)', en: 'Low Risk' };
        desc = { zh: '6 週內發生主要不良心血管事件 (MACE) 的風險僅約 0.9%–1.7%。', en: '6-week MACE risk is low (0.9%–1.7%).' };
        recommendation = { zh: '若無其他高危因素，此類患者可安全地於急診直接出院並接受門診追蹤。', en: 'Candidates for early discharge and outpatient management.' };
      } else if (score <= 6) {
        riskLevel = { zh: '中度危險 (Intermediate Risk)', en: 'Intermediate Risk' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: '6 週內發生主要不良心血管事件 (MACE) 的風險為 12%–17%。', en: '6-week MACE risk is 12%–17%.' };
        recommendation = { zh: '應收治住院或在急診留觀病房進行排查 (例如重複追蹤肌鈣蛋白與非侵入性負荷測試)。', en: 'Observation, serial troponin, and cardiac workup recommended.' };
      } else {
        riskLevel = { zh: '高度危險 (High Risk)', en: 'High Risk' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: '6 週內發生主要不良心血管事件 (MACE) 的風險高達 50%–65%。', en: '6-week MACE risk is extremely high (50%–65%).' };
        recommendation = { zh: '強烈建議收治住院，並儘早採取心導管檢查及侵入性策略。', en: 'Inpatient admission and early invasive evaluation recommended.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'HEART Score = History + ECG + Age + Risk Factors + Troponin',
    pearls: {
      zh: [
        'HEART 評分目前廣泛用於急診醫學，用以安全排除低風險胸痛患者，減少不必要的留觀與心肌酵素追蹤。',
        '高危險因子包括：高血壓、高血脂、糖尿病、抽菸、肥胖、冠狀動脈疾病家族史。',
        '臨床決策應結合連續的肌鈣蛋白變化 (Troponin Trend) 判斷，若數值呈上升趨勢，應依急性冠心症 (ACS) 指引治療。'
      ],
      en: [
        'HEART score is highly sensitive for predicting 6-week MACE in emergency department chest pain patients.',
        'A score of 0-3 allows for safe discharge without further immediate invasive workup in the absence of secondary caveats.',
        'Correlate findings with serial troponin monitoring and dynamic ECG changes.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/3887/heart-score-major-cardiac-events'
  },
  {
    id: 'qtc-calculator',
    name: { zh: 'QTc 矯正公式', en: 'QTc Interval Calculator' },
    subtitle: { zh: '評估心電圖 QT 間期延長風險', en: 'Corrected QT Interval for Arrhythmia Risk' },
    category: 'cardiology',
    inputs: [
      { id: 'qt', name: { zh: '測得的 QT 間期', en: 'Measured QT Interval' }, type: 'number', defaultValue: 400, unit: 'ms', min: 0 },
      { id: 'hr', name: { zh: '心跳速率 (Heart Rate)', en: 'Heart Rate' }, type: 'number', defaultValue: 75, unit: 'bpm', min: 0 }
    ],
    calculate: (values) => {
      const qt = Number(values.qt);
      const hr = Number(values.hr);

      if (!qt || !hr) {
        return { error: 'Invalid inputs', description: { zh: '請輸入有效的 QT 與心跳數值。', en: 'Please enter valid QT and heart rate values.' } };
      }

      // Convert HR to RR interval in seconds: RR = 60 / HR
      const rr = 60 / hr;

      const bazett = qt / Math.sqrt(rr);
      const fridericia = qt / Math.pow(rr, 1/3);

      let riskLevel: { zh: string; en: string } = { zh: '正常範圍', en: 'Normal QTc' };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      
      const qtcVal = fridericia; // Use Fridericia as primary reference for clinical report
      if (qtcVal > 500) {
        riskLevel = { zh: '重度延長 (高扭轉性室速風險)', en: 'Severe Prolongation (High TdP Risk)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
      } else if (qtcVal > 470) {
        riskLevel = { zh: '中度延長', en: 'Moderate Prolongation' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
      }

      const desc = {
        zh: `基於 Fridericia 公式算出的 QTc 為 ${fridericia.toFixed(0)} ms；Bazett 公式為 ${bazett.toFixed(0)} ms。`,
        en: `QTc (Fridericia) is ${fridericia.toFixed(0)} ms. QTc (Bazett) is ${bazett.toFixed(0)} ms.`
      };

      const recommendation = {
        zh: qtcVal > 500 
          ? 'QTc > 500 ms 顯著增加 Torsades de Pointes (TdP) 惡性心律不整風險！應停用可能延長 QT 之間期藥物，補充電解質 (使 K > 4.0, Mg > 2.0 mEq/L)。'
          : 'QTc 尚在相對安全範圍。若使用多種 QT 延長藥物，需定期追蹤 ECG。',
        en: qtcVal > 500 
          ? 'QTc > 500 ms severely increases Torsades de Pointes (TdP) risk! Stop QT-prolonging drugs. Keep K > 4.0 and Mg > 2.0 mEq/L.'
          : 'QTc is in acceptable range. Monitor ECG periodically if using QT-prolonging therapies.'
      };

      return { value: fridericia, unit: 'ms', riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'Bazett: QTc = \\frac{QT}{\\sqrt{RR}} \\quad \\text{Fridericia}: QTc = \\frac{QT}{\\sqrt[3]{RR}}',
    pearls: {
      zh: [
        'Bazett 公式是臨床上最常用到的公式，但是在心跳過快或過慢時會有明顯偏差（心跳快時容易過度矯正而假性延長）。',
        'Fridericia 公式在極端心率下較為準確，是目前國際藥物安全評估首選的矯正公式。',
        '當 QTc 延長 > 500 ms 時，臨床上誘發致命性心室頻脈 (Torsades de Pointes, TdP) 的風險會成倍增長，必須高度警戒。'
      ],
      en: [
        'Bazett formula is the clinical standard but overcorrects at higher heart rates (HR >90 bpm) and undercorrects at slower rates.',
        'Fridericia formula is preferred and clinically more accurate for patients with extreme bradycardia or tachycardia.',
        'A QTc > 500 ms represents a critical threshold for increased risk of Torsades de Pointes (TdP).'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/48/corrected-qt-interval-qtc'
  },
  {
    id: 'wells-pe',
    name: { zh: 'Wells 肺栓塞臨床預測評分', en: 'Wells\' Criteria for Pulmonary Embolism' },
    subtitle: { zh: '評估急性肺栓塞 (PE) 的臨床機率', en: 'Pre-test Probability of Pulmonary Embolism' },
    category: 'pulmonary',
    inputs: [
      { id: 'signs', name: { zh: '有 DVT 的臨床症狀或體徵 (+3分)', en: 'Clinical signs or symptoms of DVT (+3 pts)' }, type: 'boolean', defaultValue: false },
      { id: 'alt_diag', name: { zh: '其他診斷的可能性小於肺栓塞 (+3分)', en: 'Alternative diagnosis less likely than PE (+3 pts)' }, type: 'boolean', defaultValue: false },
      { id: 'tachycardia', name: { zh: '心跳過速 (HR > 100 bpm) (+1.5分)', en: 'Heart rate > 100 bpm (+1.5 pts)' }, type: 'boolean', defaultValue: false },
      { id: 'immobilization', name: { zh: '近期手術或制動 (4週內制動/手術) (+1.5分)', en: 'Immobilization or surgery in past 4 weeks (+1.5 pts)' }, type: 'boolean', defaultValue: false },
      { id: 'prior_pe_dvt', name: { zh: '曾有過 PE 或 DVT 病史 (+1.5分)', en: 'Prior PE or DVT (+1.5 pts)' }, type: 'boolean', defaultValue: false },
      { id: 'hemoptysis', name: { zh: '咳血 (Hemoptysis) (+1分)', en: 'Hemoptysis (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'malignancy', name: { zh: '活動性癌症 (治療中或近6個月內) (+1分)', en: 'Active malignancy (+1 pt)' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let score = 0;
      if (values.signs) score += 3;
      if (values.alt_diag) score += 3;
      if (values.tachycardia) score += 1.5;
      if (values.immobilization) score += 1.5;
      if (values.prior_pe_dvt) score += 1.5;
      if (values.hemoptysis) score += 1;
      if (values.malignancy) score += 1;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score <= 4.0) {
        riskLevel = { zh: '肺栓塞可能性低 (PE Unlikely)', en: 'PE Unlikely' };
        desc = { zh: '臨床診斷可能性低。建議先使用「PERC Rule」排除，或抽血驗高敏感性「D-dimer」。', en: 'PE is unlikely (probability ~7.8%).' };
        recommendation = { zh: '建議加測 D-dimer。若 D-dimer 正常，可安全排除 PE。', en: 'Order high-sensitivity D-dimer. If negative, PE is ruled out.' };
      } else {
        riskLevel = { zh: '肺栓塞可能性高 (PE Likely)', en: 'PE Likely' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: '臨床診斷可能性高。不建議進行 D-dimer 檢測，應直接安排造影檢查。', en: 'PE is likely (probability ~40.7%).' };
        recommendation = { zh: '應立刻安排「電腦斷層肺血管造影 (CTA)」以確立診斷，並考慮開始給予經驗性抗凝血劑。', en: 'Proceed directly to CT pulmonary angiography (CTPA). Do not wait for D-dimer.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'Wells PE Score = Sum of weighted risk factors (0 - 12.5)',
    pearls: {
      zh: [
        'Wells 評分最核心的用途在於風險分層，指導後續應安排 D-dimer（排除低風險）還是直接安排 CTA（針對高風險）。',
        '對於 Wells 評分 ≤ 4 (PE Unlikely) 且符合 PERC 八項指標的病患，不需要抽 D-dimer 即可安全排除肺栓塞。',
        '「其他診斷可能性小於肺栓塞 (+3分)」雖為主觀指標，但常能反映臨床資深醫生的綜合直覺。'
      ],
      en: [
        'Wells PE score is the primary triage tool determining whether a patient needs a D-dimer vs. direct imaging (CTPA).',
        'If PE is "unlikely" (score ≤4), a negative D-dimer effectively rules out PE without a chest CT.',
        'If PE is "likely" (score >4), proceed straight to CTPA. D-dimer should not be checked, as a negative result cannot rule out PE in a high-probability patient.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/115/wells-criteria-pulmonary-embolism'
  },
  {
    id: 'curb-65',
    name: { zh: 'CURB-65 肺炎嚴重度評分', en: 'CURB-65 Severity Score' },
    subtitle: { zh: '社區感染性肺炎 (CAP) 事件風險與收治評估', en: 'Pneumonia Severity & Admission Triage' },
    category: 'pulmonary',
    inputs: [
      { id: 'c', name: { zh: '意識混亂 (Confusion) (+1分)', en: 'Confusion (new disorientation in person, place, or time) (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'u', name: { zh: '尿素氮高 (BUN > 19 mg/dL 或 > 7 mmol/L) (+1分)', en: 'BUN > 19 mg/dL (>7 mmol/L) (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'r', name: { zh: '呼吸急促 (RR ≥ 30 bpm) (+1分)', en: 'Respiratory Rate ≥ 30 breaths/min (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'b', name: { zh: '血壓低 (SBP < 90 或 DBP ≤ 60 mmHg) (+1分)', en: 'Blood Pressure (SBP <90 mmHg or DBP ≤60 mmHg) (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'age', name: { zh: '年齡大於或等於 65 歲 (+1分)', en: 'Age ≥ 65 years (+1 pt)' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let score = 0;
      if (values.c) score += 1;
      if (values.u) score += 1;
      if (values.r) score += 1;
      if (values.b) score += 1;
      if (values.age) score += 1;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score <= 1) {
        riskLevel = { zh: '輕度 (Low Risk, 30天死亡率 <1.5%)', en: 'Low Risk (30-day mortality <1.5%)' };
        desc = { zh: '肺炎嚴重度較低，死亡風險低。通常可安全於門診口服抗生素治療。', en: 'Low severity pneumonia.' };
        recommendation = { zh: '建議門診口服抗生素治療，居家休養。', en: 'Outpatient treatment is generally safe.' };
      } else if (score === 2) {
        riskLevel = { zh: '中度 (Moderate Risk, 30天死亡率 9.2%)', en: 'Moderate Risk (30-day mortality ~9.2%)' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: '中等嚴重度。應考慮收治普通病房住院治療，或在急診短期密切留觀。', en: 'Moderate severity pneumonia. Hospital admission should be considered.' };
        recommendation = { zh: '建議安排住院或留院觀察，給予靜脈或口服抗生素。', en: 'Consider hospital admission or close outpatient follow-up.' };
      } else {
        riskLevel = { zh: '重度 (High Risk, 30天死亡率 15-22%)', en: 'High Risk (30-day mortality 15%-22%)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: '嚴重肺炎，死亡風險高。必須立即住院，並嚴密評估是否需要入住加護病房 (ICU)。', en: 'Severe pneumonia. High mortality risk.' };
        recommendation = { zh: '應立刻安排住院治疗；若評分 ≥4 分，建議優先考慮收治 ICU。', en: 'Urgent hospitalization. Assess for ICU admission (especially if score ≥ 4).' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'CURB-65 = C + U + R + B + 65',
    pearls: {
      zh: [
        'CURB-65 評分是評估社區感染性肺炎 (CAP) 最簡便的床邊臨床指引之一。',
        '尿素氮高 (BUN > 19 mg/dL) 常反映了腎小球濾過率下降，是肺炎引起多臟器功能衰竭的敏感早期指標。',
        '若需要更全面（重病患多合併症）的評估，建議參考「肺炎嚴重指數 (PSI / PORT) 評分」。'
      ],
      en: [
        'CURB-65 is a quick bedside rule to triage community-acquired pneumonia (CAP) management settings.',
        'BUN > 19 mg/dL reflects acute kidney injury or severe dehydration secondary to systemic sepsis.',
        'For older patients or those with multiple comorbidities, the Pneumonia Severity Index (PSI) is preferred as it is more sensitive.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/325/curb-65-score-pneumonia-severity'
  },
  {
    id: 'lights-criteria',
    name: { zh: 'Light 氏標準 (胸水診斷)', en: 'Light\'s Criteria for Pleural Effusion' },
    subtitle: { zh: '區分胸膜腔積液為滲出液或漏出液', en: 'Exudate vs. Transudate Effusion' },
    category: 'pulmonary',
    inputs: [
      { id: 'fluid_prot', name: { zh: '胸水蛋白質濃度', en: 'Pleural Fluid Protein' }, type: 'number', defaultValue: 3.5, unit: 'g/dL', min: 0 },
      { id: 'serum_prot', name: { zh: '血清蛋白質濃度', en: 'Serum Protein' }, type: 'number', defaultValue: 6.5, unit: 'g/dL', min: 0 },
      { id: 'fluid_ldh', name: { zh: '胸水 LDH 活性', en: 'Pleural Fluid LDH' }, type: 'number', defaultValue: 250, unit: 'U/L', min: 0 },
      { id: 'serum_ldh', name: { zh: '血清 LDH 活性', en: 'Serum LDH' }, type: 'number', defaultValue: 180, unit: 'U/L', min: 0 },
      { id: 'ldh_uln', name: { zh: '血清 LDH 正常上限值', en: 'Serum LDH Upper Limit of Normal (ULN)' }, type: 'number', defaultValue: 200, unit: 'U/L', min: 0 }
    ],
    calculate: (values) => {
      const fProt = Number(values.fluid_prot);
      const sProt = Number(values.serum_prot);
      const fLdh = Number(values.fluid_ldh);
      const sLdh = Number(values.serum_ldh);
      const ldhUln = Number(values.ldh_uln);

      if (!sProt || !sLdh || !ldhUln) {
        return { error: 'Invalid inputs', description: { zh: '血清蛋白質、血清 LDH 或正常上限不能為 0。', en: 'Serum values cannot be zero.' } };
      }

      const ratioProt = fProt / sProt;
      const ratioLdh = fLdh / sLdh;
      const ldhRatioUln = fLdh / ldhUln;

      const cond1 = ratioProt > 0.5;
      const cond2 = ratioLdh > 0.6;
      const cond3 = ldhRatioUln > (2/3);

      const isExudate = cond1 || cond2 || cond3;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (isExudate) {
        riskLevel = { zh: '滲出液 (Exudate)', en: 'Exudative Effusion' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: '符合 Light 氏標準。提示胸水主要因局部發炎、感染、惡性腫瘤或淋巴回流受阻所致。', en: 'Meets Light\'s criteria. Pleural fluid is likely an exudate.' };
        recommendation = { zh: '應進一步安排胸水細胞學、細菌培養、酸鹼度 (pH) 與葡萄糖濃度檢測，以排查肺炎旁積液、結核或癌症。', en: 'Evaluate for local infection (pneumonia, TB), malignancy, or pulmonary embolism.' };
      } else {
        riskLevel = { zh: '漏出液 (Transudate)', en: 'Transudative Effusion' };
        desc = { zh: '不符合任何一項 Light 氏標準。提示胸水由全身性因素（如流體靜力壓升高或膠體滲透壓降低）所致。', en: 'Does not meet Light\'s criteria. Pleural fluid is likely a transudate.' };
        recommendation = { zh: '主要病因多為鬱血性心衰竭、肝硬化腹水或腎病症候群。治療應以改善全身性原發病為主。', en: 'Etiology is likely systemic (e.g., congestive heart failure, cirrhosis, nephrotic syndrome).' };
      }

      return {
        valueText: isExudate ? 'Exudate' : 'Transudate',
        riskLevel,
        riskColor,
        description: desc,
        recommendation
      };
    },
    reference: 'Exudate if: \\frac{Fluid\\ Protein}{Serum\\ Protein} > 0.5 \\quad \\text{or} \\quad \\frac{Fluid\\ LDH}{Serum\\ LDH} > 0.6 \\quad \\text{or} \\quad Fluid\\ LDH > \\frac{2}{3} \\times Serum\\ LDH\\ ULN',
    pearls: {
      zh: [
        'Light 氏標準在區分滲出液與漏出液上具有高敏感性 (~98%)。',
        '**利尿劑假陽性：** 對於心衰竭患者，若已使用利尿劑，其胸水會濃縮，可能使漏出液假性符合滲出液標準。此時若「血清與胸水的白蛋白差值 (Serum-Effusion Albumin Gradient) > 1.2 g/dL」，仍應診斷為漏出液。'
      ],
      en: [
        'Light\'s criteria is highly sensitive (~98%) for identifying exudates, but slightly less specific.',
        '**Diuretics caveat:** Heart failure patients treated with diuretics can concentrate their pleural fluid, causing a transudate to misclassify as an exudate. If this is suspected, a Serum-to-Pleural Fluid Albumin Gradient > 1.2 g/dL indicates a transudate.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/120/lights-criteria-pleural-effusion'
  },
  {
    id: 'aa-gradient',
    name: { zh: 'A-a 肺泡-動脈氧分壓差', en: 'Alveolar-arterial (A-a) Gradient' },
    subtitle: { zh: '評估肺部氣體交換異常與低氧血症原因', en: 'Alveolar-arterial Oxygen Gradient' },
    category: 'pulmonary',
    inputs: [
      { id: 'pao2', name: { zh: 'PaO₂ (動脈血氧分壓)', en: 'PaO₂ (Arterial O₂ Tension)' }, type: 'number', defaultValue: 80, unit: 'mmHg', min: 0 },
      { id: 'paco2', name: { zh: 'PaCO₂ (動脈二氧化碳分壓)', en: 'PaCO₂ (Arterial CO₂ Tension)' }, type: 'number', defaultValue: 40, unit: 'mmHg', min: 0 },
      { id: 'fio2', name: { zh: 'FiO₂ (吸入氧氣濃度百分比)', en: 'FiO₂ (Fraction of Inspired Oxygen)' }, type: 'number', defaultValue: 21, unit: '%', min: 21, max: 100 },
      { id: 'age', name: { zh: '患者年齡', en: 'Patient Age' }, type: 'number', defaultValue: 40, unit: '歲', min: 0 }
    ],
    calculate: (values) => {
      const pao2 = Number(values.pao2);
      const paco2 = Number(values.paco2);
      const fio2Pct = Number(values.fio2);
      const age = Number(values.age);

      if (fio2Pct < 21 || fio2Pct > 100) {
        return { error: 'Invalid FiO2', description: { zh: 'FiO2 應介於 21% 至 100% 之間。', en: 'FiO2 must be between 21% and 100%.' } };
      }

      const FiO2 = fio2Pct / 100;
      
      // Alveolar Gas Equation (at sea level, atmospheric pressure PB = 760 mmHg, water vapor pressure PH2O = 47 mmHg)
      // PAO2 = FiO2 * (PB - PH2O) - PaCO2 / R
      // Assuming R (respiratory quotient) = 0.8: PAO2 = FiO2 * 713 - PaCO2 / 0.8
      const pao2Alveolar = FiO2 * 713 - (paco2 / 0.8);
      const gradient = pao2Alveolar - pao2;

      // Normal age-expected gradient = (Age / 4) + 4
      const expectedNormal = (age / 4) + 4;
      const isElevated = gradient > expectedNormal;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };

      if (isElevated) {
        riskLevel = { zh: '氧分壓差增加 (Elevated)', en: 'Elevated A-a Gradient' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `實測 A-a 差值為 ${gradient.toFixed(1)} mmHg (正常預期值約 ≤ ${expectedNormal.toFixed(1)} mmHg)。提示低氧血症由肺部換氣功能障礙（如 V/Q 失調、分流、擴散障礙）引起。`, en: `Calculated A-a Gradient is ${gradient.toFixed(1)} mmHg (expected norm ≤ ${expectedNormal.toFixed(1)} mmHg). Suggests intrinsic lung disease.` };
      } else {
        riskLevel = { zh: '正常範圍 (Normal)', en: 'Normal A-a Gradient' };
        desc = { zh: `實測 A-a 差值為 ${gradient.toFixed(1)} mmHg (正常預期值約 ≤ ${expectedNormal.toFixed(1)} mmHg)。提示低氧血症原因為肺外因素（如肺泡通氣不足、吸入氧濃度低）。`, en: `Calculated A-a Gradient is ${gradient.toFixed(1)} mmHg (expected norm ≤ ${expectedNormal.toFixed(1)} mmHg).` };
      }

      return { value: gradient, unit: 'mmHg', riskLevel, riskColor, description: desc };
    },
    reference: 'PAO_2 = FiO_2 \\times (PB - PH_2O) - \\frac{PaCO_2}{0.8} \\quad \\text{Gradient} = PAO_2 - PaO_2',
    pearls: {
      zh: [
        'A-a Gradient 主要用於鑑別低氧血症 (Hypoxemia) 的原因。',
        '**A-a 差正常但低氧：** 提示為「肺泡通氣不足 (Hypoventilation)」或「高海拔缺氧」。常見於藥物過量致呼吸抑制、神經肌肉疾病。',
        '**A-a 差升高且低氧：** 提示為「通氣灌流失調 (V/Q mismatch)」、「右至左分流 (Shunt)」或「擴散障礙」。常見於肺栓塞、肺炎、肺水腫、ARDS。'
      ],
      en: [
        'A-a Gradient is a key tool in classifying the pathophysiologic cause of hypoxemia.',
        'A **normal A-a gradient** with hypoxemia implies alveolar hypoventilation (e.g., CNS depression, neuromuscular weakness) or low inspired oxygen.',
        'An **elevated A-a gradient** indicates intrinsic pulmonary issues (V/Q mismatch, shunt, or diffusion defect, e.g., PE, pneumonia, COPD flare).'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/104/alveolar-arterial-gradient'
  },
  {
    id: 'pf-ratio',
    name: { zh: 'P/F Ratio (PaO₂/FiO₂ 比值)', en: 'P/F Ratio (PaO₂/FiO₂)' },
    subtitle: { zh: '評估急性呼吸窘迫症候群 (ARDS) 嚴重度', en: 'ARDS Severity Classification' },
    category: 'pulmonary',
    inputs: [
      { id: 'pao2', name: { zh: 'PaO₂ (動脈血氧分壓)', en: 'PaO₂ (Arterial O₂ Tension)' }, type: 'number', defaultValue: 75, unit: 'mmHg', min: 0 },
      { id: 'fio2', name: { zh: 'FiO₂ (吸入氧氣濃度百分比)', en: 'FiO₂ (Fraction of Inspired Oxygen)' }, type: 'number', defaultValue: 50, unit: '%', min: 21, max: 100 }
    ],
    calculate: (values) => {
      const pao2 = Number(values.pao2);
      const fio2Pct = Number(values.fio2);

      if (!pao2 || !fio2Pct) {
        return { error: 'Invalid inputs', description: { zh: '請輸入有效的數值。', en: 'Please enter valid inputs.' } };
      }

      const value = pao2 / (fio2Pct / 100);

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };

      if (value > 300) {
        riskLevel = { zh: '正常範圍 (Normal / Mild Hypoxemia)', en: 'Normal / Mild Hypoxemia' };
        desc = { zh: `P/F Ratio 為 ${value.toFixed(0)} mmHg。氣體交換正常或輕微受損。`, en: `P/F Ratio is ${value.toFixed(0)} mmHg (normal range > 300).` };
      } else if (value > 200) {
        riskLevel = { zh: '輕度 ARDS (Mild ARDS)', en: 'Mild ARDS' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `P/F Ratio 為 ${value.toFixed(0)} mmHg。符合柏林標準之輕度 ARDS (範圍 200–300 mmHg，需搭配 PEEP/CPAP ≥ 5)。`, en: `Mild ARDS (P/F 200–300 mmHg with PEEP/CPAP ≥5).` };
      } else if (value > 100) {
        riskLevel = { zh: '中度 ARDS (Moderate ARDS)', en: 'Moderate ARDS' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `P/F Ratio 為 ${value.toFixed(0)} mmHg。符合柏林標準之中度 ARDS (範圍 100–200 mmHg)。`, en: `Moderate ARDS (P/F 100–200 mmHg with PEEP/CPAP ≥5).` };
      } else {
        riskLevel = { zh: '重度 ARDS (Severe ARDS)', en: 'Severe ARDS' };
        riskColor = 'text-rose-500 bg-rose-950/60 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)] animate-pulse';
        desc = { zh: `P/F Ratio 為 ${value.toFixed(0)} mmHg。符合柏林標準之重度 ARDS (≤ 100 mmHg)。死亡風險高，需積極通氣支持與考慮俯臥通氣 (Prone Positioning)。`, en: `Severe ARDS (P/F ≤ 100 mmHg with PEEP/CPAP ≥5). High mortality risk.` };
      }

      return { value, unit: 'mmHg', riskLevel, riskColor, description: desc };
    },
    reference: 'P/F Ratio = \\frac{PaO_2}{FiO_2} \\quad \\text{(FiO2 expressed as decimal)}',
    pearls: {
      zh: [
        'P/F Ratio 是加護病房 (ICU) 評估嚴重肺損傷最簡單、最常使用的氣體交換指標。',
        '**柏林定義 (Berlin Definition) 診斷 ARDS 條件：** 1. 急性起病（1週內）；2. 胸部影像呈雙側浸潤影；3. 排除心衰竭引起的肺水腫；4. P/F Ratio ≤ 300 mmHg，且在呼吸器設定 PEEP 或無創呼吸器 CPAP ≥ 5 cmH₂O 狀態下。'
      ],
      en: [
        'The P/F Ratio is the clinical standard to assess oxygenation impairment and stage ARDS severity.',
        'According to the Berlin definition, ARDS diagnosis requires acute onset, bilateral opacities on chest imaging, exclusion of cardiogenic pulmonary edema, and a P/F ratio ≤300 mmHg on PEEP/CPAP ≥5 cmH₂O.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/3985/pao2-fio2-ratio'
  },
  {
    id: 'cockcroft-gault',
    name: { zh: 'Cockcroft-Gault 腎功能估算', en: 'Cockcroft-Gault Creatinine Clearance' },
    subtitle: { zh: '估算肌酸酐清除率 (CrCl) 用於藥物劑量調整', en: 'Estimated Creatinine Clearance for Drug Dosing' },
    category: 'nephrology',
    inputs: [
      { id: 'age', name: { zh: '年齡', en: 'Age' }, type: 'number', defaultValue: 60, unit: '歲', min: 0 },
      { id: 'sex', name: { zh: '生理性別', en: 'Sex' }, type: 'select', defaultValue: 1, options: [
        { label: { zh: '男性 (係數 1.0)', en: 'Male (factor 1.0)' }, value: 1 },
        { label: { zh: '女性 (係數 0.85)', en: 'Female (factor 0.85)' }, value: 0.85 }
      ]},
      { id: 'scr', name: { zh: '血肌酸酐', en: 'Serum Creatinine' }, type: 'number', defaultValue: 1.0, unit: 'mg/dL', min: 0 },
      { id: 'weight', name: { zh: '體重 (Weight)', en: 'Weight' }, type: 'number', defaultValue: 60, unit: 'kg', min: 0 }
    ],
    calculate: (values) => {
      const age = Number(values.age);
      const sexFactor = Number(values.sex);
      const sCr = Number(values.scr);
      const wt = Number(values.weight);

      if (!sCr) {
        return { error: 'Invalid Serum Cr', description: { zh: '血肌酸酐不能為 0。', en: 'Serum Cr cannot be zero.' } };
      }

      // Formula: (140 - Age) * Weight / (72 * sCr) * sexFactor
      const value = ((140 - age) * wt) / (72 * sCr) * sexFactor;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      
      if (value < 15) {
        riskLevel = { zh: '末期腎衰竭 (G5)', en: 'Kidney Failure (Stage 5)' };
        riskColor = 'text-rose-550 bg-rose-950/60 border-rose-500';
      } else if (value < 30) {
        riskLevel = { zh: '重度腎功能不全 (G4)', en: 'Severe Decrease (Stage 4)' };
        riskColor = 'text-rose-450 bg-rose-950/30 border-rose-500/30';
      } else if (value < 60) {
        riskLevel = { zh: '中度腎功能不全 (G3)', en: 'Moderate Decrease (Stage 3)' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
      } else if (value < 90) {
        riskLevel = { zh: '輕度腎功能不全 (G2)', en: 'Mild Decrease (Stage 2)' };
        riskColor = 'text-emerald-300 bg-emerald-950/20 border-emerald-800/20';
      } else {
        riskLevel = { zh: '正常或高腎功能 (G1)', en: 'Normal (Stage 1)' };
      }

      return {
        value,
        unit: 'mL/min',
        riskLevel,
        riskColor,
        description: {
          zh: `估算肌酸酐清除率 (eCrCl) 為 ${value.toFixed(1)} mL/min。`,
          en: `Estimated Creatinine Clearance is ${value.toFixed(1)} mL/min.`
        }
      };
    },
    reference: 'CrCl = \\frac{(140 - Age) \\times Weight}{72 \\times Serum\\ Cr} \\times (0.85 \\text{ if Female})',
    pearls: {
      zh: [
        'Cockcroft-Gault 公式是目前大多數藥物說明書 (FDA/EMA) 推薦用於調整腎功能受損患者藥物劑量的標準公式。',
        '**體重選用原則：** 1. 實際體重 < 理想體重時，使用實際體重；2. 正常體重患者使用理想體重 (IBW)；3. 肥胖患者 (BMI > 30) 建議使用「調整體重 (Adjusted Body Weight)」。'
      ],
      en: [
        'The Cockcroft-Gault equation is the standard formula historically used by the FDA for renal drug dosing adjustments.',
        '**Weight usage selection:** Use Actual Body Weight if patient is underweight (<IBW); use Ideal Body Weight (IBW) for normal weight; use Adjusted Body Weight if obese (BMI >30).'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/293/creatinine-clearance-cockcroft-gault-equation'
  },
  {
    id: 'meld-score',
    name: { zh: 'MELD 評分 / MELD-Na (2016)', en: 'MELD Score & MELD-Na (2016)' },
    subtitle: { zh: '評估終末期肝病患者之 3 個月死亡率', en: 'End-Stage Liver Disease 3-Month Mortality' },
    category: 'gastroenterology',
    inputs: [
      { id: 'bili', name: { zh: '總膽紅素 (Total Bilirubin)', en: 'Total Bilirubin' }, type: 'number', defaultValue: 1.0, unit: 'mg/dL', min: 0.1 },
      { id: 'inr', name: { zh: 'INR (凝血酶原時間比值)', en: 'INR' }, type: 'number', defaultValue: 1.0, unit: '', min: 0.5 },
      { id: 'cr', name: { zh: '血肌酸酐 (Serum Creatinine)', en: 'Serum Creatinine' }, type: 'number', defaultValue: 1.0, unit: 'mg/dL', min: 0.1 },
      { id: 'sodium', name: { zh: '血鈉 (Serum Sodium)', en: 'Serum Sodium' }, type: 'number', defaultValue: 137, unit: 'mmol/L', min: 100, max: 150 },
      { id: 'dialysis', name: { zh: '近一週內曾接受洗腎/透析 ≥ 2次', en: 'Hemodialysis ≥2x in past week' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let bili = Number(values.bili);
      let inr = Number(values.inr);
      let cr = Number(values.cr);
      const na = Number(values.sodium);
      const hd = values.dialysis;

      if (!bili || !inr || !cr || !na) {
        return { error: 'Invalid inputs', description: { zh: '所有輸入值皆須大於 0。', en: 'Inputs must be greater than zero.' } };
      }

      // Lower limit clamps
      if (bili < 1.0) bili = 1.0;
      if (inr < 1.0) inr = 1.0;
      
      if (hd) {
        cr = 4.0; // Clamped to 4.0 for dialysis patients
      } else {
        if (cr < 1.0) cr = 1.0;
        if (cr > 4.0) cr = 4.0;
      }

      // Original MELD calculation formula:
      // MELD(i) = 0.957 * ln(Cr) + 0.378 * ln(Bilirubin) + 1.120 * ln(INR) + 0.643
      // MELD = round(MELD(i) * 10)
      const meldi = (0.957 * Math.log(cr)) + (0.378 * Math.log(bili)) + (1.120 * Math.log(inr)) + 0.643;
      let meldOriginal = Math.round(meldi * 10);
      if (meldOriginal < 6) meldOriginal = 6;

      // MELD-Na calculation (2016):
      // If MELD > 11, compute MELD-Na:
      // MELD-Na = MELD + 1.32 * (137 - Na) - 0.08 * MELD * (137 - Na)
      // Clamping Sodium to range [125, 137]
      let finalScore = meldOriginal;
      const sodiumClamped = Math.max(125, Math.min(137, na));
      
      if (meldOriginal > 11) {
        finalScore = Math.round(meldOriginal + 1.32 * (137 - sodiumClamped) - 0.08 * meldOriginal * (137 - sodiumClamped));
      }

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';

      if (finalScore >= 40) {
        riskLevel = { zh: '極度重度 (3個月死亡率 ~71.3%)', en: 'Severe (3-month mortality ~71.3%)' };
        riskColor = 'text-rose-500 bg-rose-950/60 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)] animate-pulse';
      } else if (finalScore >= 30) {
        riskLevel = { zh: '重度 (3個月死亡率 ~52.6%)', en: 'High (3-month mortality ~52.6%)' };
        riskColor = 'text-rose-450 bg-rose-950/40 border-rose-500/30';
      } else if (finalScore >= 20) {
        riskLevel = { zh: '中重度 (3個月死亡率 ~19.6%)', en: 'Intermediate-High (3-month mortality ~19.6%)' };
        riskColor = 'text-amber-450 bg-amber-950/40 border-amber-500/30';
      } else if (finalScore >= 10) {
        riskLevel = { zh: '中度 (3個月死亡率 ~6.0%)', en: 'Intermediate (3-month mortality ~6.0%)' };
        riskColor = 'text-amber-300 bg-amber-950/20 border-amber-800/20';
      } else {
        riskLevel = { zh: '輕度 (3個月死亡率 ~1.9%)', en: 'Low (3-month mortality ~1.9%)' };
      }

      const desc = {
        zh: `MELD-Na 評分為 ${finalScore} 分 (原始 MELD 評分為 ${meldOriginal} 分)。此評分廣泛用於肝臟移植器官分配優先順序。`,
        en: `MELD-Na Score is ${finalScore} (original MELD is ${meldOriginal}). This score is used for liver transplant allocation.`
      };

      return { score: finalScore, riskLevel, riskColor, description: desc };
    },
    reference: 'MELD = 3.78 \\times \\ln(Bili) + 11.2 \\times \\ln(INR) + 9.57 \\times \\ln(Cr) + 6.43',
    pearls: {
      zh: [
        'MELD 評分已被全球主要器官移植體系 (如 UNOS) 用來分配肝臟移植資源，體現「越重病越優先」的原則。',
        '**洗腎限制：** 若病患一週內透析兩次以上，其血肌酸酐數值直接以 4.0 mg/dL 計入公式計算。',
        '2016 年更新版公式中加入了低血鈉的矯正 (MELD-Na)，能更精準地預測低血鈉嚴重肝硬化病患的 waitlist 死亡率。'
      ],
      en: [
        'MELD-Na is used clinically to prioritize end-stage liver disease patients for organ transplantation.',
        'If a patient has had dialysis ≥2 times in the past week, Serum Cr is automatically locked to 4.0 mg/dL.',
        'Hyponatremia is a strong independent predictor of mortality in cirrhosis, which MELD-Na accounts for.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/2693/meld-na-original-meld-score-2016'
  },
  {
    id: 'free-water-deficit',
    name: { zh: '自由水缺乏量計算', en: 'Free Water Deficit' },
    subtitle: { zh: '計算高鈉血症病患所需補充之水量', en: 'Water Deficit for Hypernatremia Correction' },
    category: 'nephrology',
    inputs: [
      { id: 'sodium', name: { zh: '實測血鈉濃度', en: 'Measured Serum Sodium' }, type: 'number', defaultValue: 155, unit: 'mmol/L', min: 120 },
      { id: 'weight', name: { zh: '患者體重', en: 'Patient Weight' }, type: 'number', defaultValue: 60, unit: 'kg', min: 0 },
      {
        id: 'tbw_factor',
        name: { zh: '患者體液比例分類', en: 'TBW Factor Category' },
        type: 'select',
        defaultValue: 0.6,
        options: [
          { label: { zh: '成年男性 (體液佔 60%)', en: 'Adult Male (60%)' }, value: 0.6 },
          { label: { zh: '成年女性 (體液佔 50%)', en: 'Adult Female (50%)' }, value: 0.5 },
          { label: { zh: '老年男性 (體液佔 50%)', en: 'Elderly Male (50%)' }, value: 0.5 },
          { label: { zh: '老年女性 (體液佔 45%)', en: 'Elderly Female (45%)' }, value: 0.45 }
        ]
      }
    ],
    calculate: (values) => {
      const na = Number(values.sodium);
      const wt = Number(values.weight);
      const factor = Number(values.tbw_factor);

      if (!na || na <= 140) {
        return { error: 'Sodium must be > 140', description: { zh: '高鈉血症血鈉應大於 140 mmol/L。', en: 'Serum Sodium must be greater than 140 mmol/L.' } };
      }

      // TBW = Weight * factor
      const tbw = wt * factor;
      // Deficit = TBW * (Na / 140 - 1)
      const value = tbw * ((na / 140) - 1);

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      
      if (value > 5.0) {
        riskLevel = { zh: '重度缺水 (Severe Deficit)', en: 'Severe Deficit' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
      } else if (value > 2.0) {
        riskLevel = { zh: '中度缺水', en: 'Moderate Deficit' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
      } else {
        riskLevel = { zh: '輕度缺水', en: 'Mild Deficit' };
      }

      const desc = {
        zh: `自由水缺乏總量估算為 ${value.toFixed(2)} 公升 (L)。預估病患體內總水量 (TBW) 為 ${tbw.toFixed(1)} L。`,
        en: `Estimated Free Water Deficit is ${value.toFixed(2)} Liters (L). Est. TBW is ${tbw.toFixed(1)} L.`
      };

      const recommendation = {
        zh: `安全降鈉速率：24小時內降幅不宜超過 8–10 mmol/L (每小時 0.5 mmol/L)，以防引致腦水腫。首日通常僅需補充此缺乏量的一半，再加上每日生理排泄量。`,
        en: `Rate of correction should not exceed 8-10 mmol/L per 24 hours to avoid cerebral edema. Generally, replace half of the deficit in the first 24 hours, plus maintenance fluids.`
      };

      return { value, unit: 'L', riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'Deficit = Total\\ Body\\ Water\\ (TBW) \\times \\left(\\frac{Serum\\ Na}{140} - 1\\right)',
    pearls: {
      zh: [
        '此公式主要計算達到正常血鈉 (140 mmol/L) 所短缺的自由純水量，但並未包含不顯性失水等維持性水分流失。',
        '高鈉血症矯正過快會導致水分過度流入相對高滲的腦細胞，造成腦水腫、癲癇發作或不可逆的腦損傷。',
        '可選用 D5W（5% 葡萄糖水）靜脈輸注或經胃管灌水來補充足夠的自由水。'
      ],
      en: [
        'This calculator estimates the volume of free water needed to restore serum sodium to 140 mEq/L.',
        'Rapid correction of hypernatremia pulls water into brain cells, leading to cerebral edema, seizures, and death.',
        'Correction is commonly achieved using 5% Dextrose (D5W) IV or enteral tap water administration.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/86/free-water-deficit-hypernatremia'
  },
  {
    id: 'anion-gap',
    name: { zh: '陰離子間隙計算 (Anion Gap)', en: 'Serum Anion Gap' },
    subtitle: { zh: '評估酸鹼平衡失調及代謝性酸中毒病因', en: 'Anion Gap & Corrected for Albumin' },
    category: 'acid_base',
    inputs: [
      { id: 'na', name: { zh: '血鈉 (Na)', en: 'Sodium (Na)' }, type: 'number', defaultValue: 140, unit: 'mmol/L', min: 0 },
      { id: 'cl', name: { zh: '血氯 (Cl)', en: 'Chloride (Cl)' }, type: 'number', defaultValue: 104, unit: 'mmol/L', min: 0 },
      { id: 'hco3', name: { zh: '碳酸氫根 (HCO₃)', en: 'Bicarbonate (HCO₃)' }, type: 'number', defaultValue: 24, unit: 'mmol/L', min: 0 },
      { id: 'alb', name: { zh: '白蛋白 (Albumin)', en: 'Albumin' }, type: 'number', defaultValue: 4.0, unit: 'g/dL', min: 0 }
    ],
    calculate: (values) => {
      const na = Number(values.na);
      const cl = Number(values.cl);
      const hco3 = Number(values.hco3);
      const alb = Number(values.alb);

      if (!na || !cl || !hco3) {
        return { error: 'Invalid inputs', description: { zh: '請輸入有效的電解質數值。', en: 'Please enter valid electrolytes.' } };
      }

      // Formula: AG = Na - (Cl + HCO3)
      const ag = na - (cl + hco3);
      // Corrected AG = AG + 2.5 * (4.0 - Alb)
      const correctedAg = ag + 2.5 * (4.0 - alb);

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };

      if (correctedAg > 12) {
        riskLevel = { zh: '高陰離子間隙 (High AG)', en: 'High Anion Gap Acidosis' };
        riskColor = 'text-rose-450 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `矯正後陰離子間隙為 ${correctedAg.toFixed(1)} mEq/L (未矯正為 ${ag.toFixed(1)})。提示高陰離子間隙代謝性酸中毒 (HAGMA)。常規病因考慮：MUDPILES / GOLD MARK。`, en: `Corrected Anion Gap is ${correctedAg.toFixed(1)} mEq/L (uncorrected: ${ag.toFixed(1)}). Indicates HAGMA.` };
      } else {
        riskLevel = { zh: '正常範圍 (Normal AG)', en: 'Normal Anion Gap' };
        desc = { zh: `矯正後陰離子間隙為 ${correctedAg.toFixed(1)} mEq/L (正常範圍通常為 8–12 mEq/L)。酸中毒若存在，多為正常陰離子間隙酸中毒 (NAGMA)。`, en: `Corrected Anion Gap is ${correctedAg.toFixed(1)} mEq/L. Within normal limits.` };
      }

      return { value: correctedAg, unit: 'mEq/L', riskLevel, riskColor, description: desc };
    },
    reference: 'AG = Na - (Cl + HCO_3) \\quad \\text{Corrected AG} = AG + 2.5 \\times (4.0 - Albumin)',
    pearls: {
      zh: [
        '**白蛋白修正的重要性：** 帶負電荷的血清白蛋白是陰離子間隙的主要組成成分。白蛋白每下降 1 g/dL，基準陰離子間隙便下降約 2.5 mEq/L。未矯正會導致漏診 HAGMA。',
        '高陰離子間隙 (HAGMA) 常見病因 (GOLD MARK)：G - 乙醇酸(乙二醇)、O - 5-羥脯氨酸、L - 乳酸、D - D-乳酸、M - 甲醇、A - 阿斯匹靈、R - 腎衰竭(尿毒症)、K - 酮酸中毒(DKA/AKA)。'
      ],
      en: [
        '**Albumin correction is critical:** Albumin is the primary unmeasured anion in serum. For every 1 g/dL drop in albumin, the baseline anion gap decreases by ~2.5 mEq/L.',
        'High anion gap metabolic acidosis (HAGMA) differentials: GOLD MARK (Glycols, Oxoproline, L-Lactate, D-Lactate, Methanol, Aspirin, Renal Failure, Ketoacidosis).'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/95/anion-gap'
  },
  {
    id: 'winters-formula',
    name: { zh: 'Winter 氏公式', en: 'Winter\'s Formula' },
    subtitle: { zh: '評估代謝性酸中毒患者之呼吸代償是否適當', en: 'Respiratory Compensation in Metabolic Acidosis' },
    category: 'acid_base',
    inputs: [
      { id: 'hco3', name: { zh: '碳酸氫根 (HCO₃)', en: 'Bicarbonate (HCO₃)' }, type: 'number', defaultValue: 15, unit: 'mmol/L', min: 2, max: 40 },
      { id: 'paco2', name: { zh: 'PaCO₂ (實測動脈二氧化碳分壓)', en: 'Measured PaCO₂' }, type: 'number', defaultValue: 30, unit: 'mmHg', min: 10, max: 80 }
    ],
    calculate: (values) => {
      const hco3 = Number(values.hco3);
      const measuredCo2 = Number(values.paco2);

      if (!hco3 || !measuredCo2) {
        return { error: 'Invalid inputs', description: { zh: '請輸入有效的 HCO3 與 PaCO2 數值。', en: 'Please enter valid inputs.' } };
      }

      // Winters Formula: expected PaCO2 = 1.5 * HCO3 + 8 +/- 2
      const expectedCo2Base = 1.5 * hco3 + 8;
      const expectedMin = expectedCo2Base - 2;
      const expectedMax = expectedCo2Base + 2;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (measuredCo2 > expectedMax) {
        riskLevel = { zh: '合併呼吸性酸中毒', en: 'Mixed Metabolic Acidosis & Respiratory Acidosis' };
        riskColor = 'text-rose-450 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `實測 PaCO₂ (${measuredCo2} mmHg) 超過預期代償上限 (${expectedMax.toFixed(0)} mmHg)。提示代償不足。`, en: `Measured PaCO₂ (${measuredCo2}) is higher than expected compensation range (${expectedMin.toFixed(0)}–${expectedMax.toFixed(0)}).` };
        recommendation = { zh: '病患呼吸驅動力不足，需評估呼吸衰竭、中樞抑制或重症疲勞，必要時給予正壓呼吸支持。', en: 'Assess for respiratory failure, CNS depression, or respiratory muscle fatigue.' };
      } else if (measuredCo2 < expectedMin) {
        riskLevel = { zh: '合併呼吸性鹼中毒', en: 'Mixed Metabolic Acidosis & Respiratory Alkalosis' };
        riskColor = 'text-amber-450 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `實測 PaCO₂ (${measuredCo2} mmHg) 低於預期代償下限 (${expectedMin.toFixed(0)} mmHg)。提示過度過度換氣。`, en: `Measured PaCO₂ (${measuredCo2}) is lower than expected compensation range (${expectedMin.toFixed(0)}–${expectedMax.toFixed(0)}).` };
        recommendation = { zh: '需尋找誘發過度換氣原因（如敗血症早期、肺栓塞、水楊酸中毒、肝性腦病、嚴重焦慮）。', en: 'Evaluate for primary hyperventilation triggers (sepsis, pain, PE, anxiety, salicylate toxicity).' };
      } else {
        riskLevel = { zh: '單純性代謝性酸中毒 (代償適當)', en: 'Simple Metabolic Acidosis (Appropriate Compensation)' };
        desc = { zh: `實測 PaCO₂ (${measuredCo2} mmHg) 落在預期代償區間 (${expectedMin.toFixed(0)}–${expectedMax.toFixed(0)} mmHg) 內。`, en: `Measured PaCO₂ (${measuredCo2}) is within the expected compensatory range.` };
        recommendation = { zh: '為單純性代謝性酸中毒的正常生理代償反映，專注於治療原發酸中毒病因即可。', en: 'Consistent with simple metabolic acidosis with appropriate respiratory compensation.' };
      }

      return { value: expectedCo2Base, unit: 'mmHg', riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'Expected\\ PaCO_2 = 1.5 \\times HCO_3 + 8 \\pm 2',
    pearls: {
      zh: [
        'Winter 氏公式僅適用於**代謝性酸中毒**，用以判斷病患是否伴隨第二種呼吸性酸鹼失衡。',
        '如果實測 PaCO₂ 數值與預期的代償值偏差，則意味著存在混合型酸鹼中毒（呼吸性酸中毒/鹼中毒）。',
        '另一個簡易的床邊法則：預期的 PaCO₂ 數值大約等於動脈血 pH 值的最後兩位數（例如：pH = 7.25，則 PaCO₂ 預期為 25 mmHg左右）。'
      ],
      en: [
        'Winter\'s formula is validated ONLY for metabolic acidosis to evaluate for secondary respiratory disorders.',
        'A higher-than-expected PaCO₂ indicates concurrent respiratory acidosis (e.g., pending respiratory failure).',
        'A lower-than-expected PaCO₂ indicates concurrent respiratory alkalosis.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/119/winters-formula-paco2-compensation'
  },
  {
    id: 'corrected-calcium',
    name: { zh: '血鈣矯正公式', en: 'Corrected Calcium for Hypoalbuminemia' },
    subtitle: { zh: '低白蛋白血症時矯正血中總鈣濃度', en: 'Corrected Calcium for Hypoalbuminemia' },
    category: 'endocrinology',
    inputs: [
      { id: 'calcium', name: { zh: '實測總血鈣 (Total Calcium)', en: 'Measured Total Calcium' }, type: 'number', defaultValue: 7.8, unit: 'mg/dL', min: 0 },
      { id: 'albumin', name: { zh: '血清白蛋白 (Albumin)', en: 'Serum Albumin' }, type: 'number', defaultValue: 2.8, unit: 'g/dL', min: 0 }
    ],
    calculate: (values) => {
      const ca = Number(values.calcium);
      const alb = Number(values.albumin);

      if (!ca || !alb) {
        return { error: 'Invalid inputs', description: { zh: '請輸入有效的鈣與白蛋白濃度。', en: 'Please enter valid inputs.' } };
      }

      // Formula: Corrected Ca = Ca + 0.8 * (4.0 - Alb)
      // Clamped to when albumin < 4.0
      let value = ca;
      if (alb < 4.0) {
        value = ca + 0.8 * (4.0 - alb);
      }

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };

      if (value < 8.5) {
        riskLevel = { zh: '矯正後低血鈣 (Hypocalcemia)', en: 'True Hypocalcemia' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `矯正後血鈣為 ${value.toFixed(2)} mg/dL (實測為 ${ca.toFixed(2)})。提示存在真正的低血鈣，需要評估副甲狀腺與維生素 D 狀態。`, en: `Corrected Calcium is ${value.toFixed(2)} mg/dL. Indicates true hypocalcemia.` };
      } else if (value > 10.5) {
        riskLevel = { zh: '矯正後高血鈣 (Hypercalcemia)', en: 'True Hypercalcemia' };
        riskColor = 'text-rose-500 bg-rose-950/60 border-rose-500';
        desc = { zh: `矯正後血鈣為 ${value.toFixed(2)} mg/dL。提示真正的血鈣過高，應排查惡性腫瘤或副甲狀腺機能亢進。`, en: `Corrected Calcium is ${value.toFixed(2)} mg/dL. Indicates true hypercalcemia.` };
      } else {
        riskLevel = { zh: '正常範圍 (Normal)', en: 'Normal Corrected Calcium' };
        desc = { zh: `矯正後血鈣為 ${value.toFixed(2)} mg/dL。實測血鈣低是由於低白蛋白血症導致的結合鈣減少，游離鈣 (Ionized Ca) 通常正常。`, en: `Corrected Calcium is ${value.toFixed(2)} mg/dL, which is in the normal range.` };
      }

      return { value, unit: 'mg/dL', riskLevel, riskColor, description: desc };
    },
    reference: 'Corrected\\ Calcium\\ (mg/dL) = Total\\ Calcium + 0.8 \\times (4.0 - Albumin)',
    pearls: {
      zh: [
        '血清中約有 40%–50% 的鈣與白蛋白結合。低白蛋白血症會導致總血鈣下降，但具生理活性的游離鈣可能完全正常。',
        '如果臨床上對矯正結果有疑慮，最直接且精準的方法是直接抽血檢測「游離鈣 (Ionized Calcium)」。'
      ],
      en: [
        'Roughly 40-50% of serum calcium is bound to albumin. Hypoalbuminemia decreases total calcium while ionized (physiologically active) calcium remains normal.',
        'Direct measurement of ionized calcium is preferred to confirm clinical status in critical cases.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/40/corrected-calcium-hypoalbuminemia'
  },
  {
    id: 'anc-calculator',
    name: { zh: 'ANC 絕對嗜中性白血球計數', en: 'Absolute Neutrophil Count (ANC)' },
    subtitle: { zh: '評估白血球偏低患者之感染風險與嗜中性球低下症', en: 'Absolute Neutrophil Count' },
    category: 'hematology',
    inputs: [
      { id: 'wbc', name: { zh: 'WBC 白血球總計數 (WBC)', en: 'WBC (Total White Blood Cell Count)' }, type: 'number', defaultValue: 3000, unit: 'cells/µL', min: 0 },
      { id: 'segs', name: { zh: '分葉核嗜中性球比例 (Segmented %)', en: 'Segmented Neutrophils (Segs)' }, type: 'number', defaultValue: 40, unit: '%', min: 0, max: 100 },
      { id: 'bands', name: { zh: '帶狀嗜中性球比例 (Bands %)', en: 'Band Neutrophils (Bands)' }, type: 'number', defaultValue: 5, unit: '%', min: 0, max: 100 }
    ],
    calculate: (values) => {
      const wbc = Number(values.wbc);
      const segs = Number(values.segs);
      const bands = Number(values.bands);

      if (segs + bands > 100) {
        return { error: 'Sum of percentages > 100%', description: { zh: '分葉核與帶狀嗜中性球之和不能超過 100%。', en: 'Segs + Bands cannot exceed 100%.' } };
      }

      // Formula: WBC * (Segs % + Bands %) / 100
      const value = wbc * (segs + bands) / 100;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (value < 500) {
        riskLevel = { zh: '極重度低下 (Severe Neutropenia)', en: 'Severe Neutropenia' };
        riskColor = 'text-rose-500 bg-rose-950/60 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)] animate-pulse';
        desc = { zh: `ANC 為 ${value.toFixed(0)} /µL。此為極重度中性球低下症，伺機性感染機率極高。`, en: `ANC is ${value.toFixed(0)} cells/µL. High risk of life-threatening infection.` };
        recommendation = { zh: '必須採取保護性隔離措施（Neutropenic Precautions），發燒時應立刻經驗性給予廣效抗生素，並考慮給予 G-CSF。', en: 'Implement protective precautions. Empiric broad-spectrum antibiotics immediately if febrile.' };
      } else if (value < 1000) {
        riskLevel = { zh: '中度低下 (Moderate Neutropenia)', en: 'Moderate Neutropenia' };
        riskColor = 'text-rose-450 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `ANC 為 ${value.toFixed(0)} /µL。感染風險顯著增加。`, en: `ANC is ${value.toFixed(0)} cells/µL. Increased risk of infection.` };
        recommendation = { zh: '密切監控體溫，避免接觸傳染源與生食，化療患者需評估是否調整劑量。', en: 'Monitor temperature closely. Avoid raw foods and sick contacts.' };
      } else if (value < 1500) {
        riskLevel = { zh: '輕度低下 (Mild Neutropenia)', en: 'Mild Neutropenia' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `ANC 為 ${value.toFixed(0)} /µL。感染風險輕度增加。`, en: `ANC is ${value.toFixed(0)} cells/µL. Mild infection risk.` };
        recommendation = { zh: '常規追蹤，注意手部衛生與發燒症狀。', en: 'Routine follow-up and monitoring.' };
      } else {
        riskLevel = { zh: '正常範圍 (Normal)', en: 'Normal Neutrophil Count' };
        desc = { zh: `ANC 為 ${value.toFixed(0)} /µL。無嗜中性球低下。`, en: `ANC is ${value.toFixed(0)} cells/µL. Low risk.` };
        recommendation = { zh: '常規照護。', en: 'Normal care.' };
      }

      return { value, unit: '/µL', riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'ANC = WBC \\times \\frac{\\%Segs + \\%Bands}{100}',
    pearls: {
      zh: [
        '絕對嗜中性白血球計數 (ANC) 是評估化療患者、白血病患者或骨髓抑制病患免疫功能的重要指標。',
        '**發燒性中性球低下 (Febrile Neutropenia)：** 當單次體溫口溫 > 38.3°C (或持續 > 38.0°C 超過一小時) 且 ANC < 500 /µL 時，屬急症，必須於 1 小時內給予經驗性抗生素（如 Cefepime 或 Piperacillin/Tazobactam）。'
      ],
      en: [
        'ANC is the standard parameter used to assess infectious risk in immunocompromised patients (e.g., post-chemotherapy).',
        '**Febrile Neutropenia** (fever >38.3°C or >38.0°C for >1hr with ANC <500) is a medical emergency requiring immediate administration of anti-pseudomonal beta-lactam antibiotics.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/59/absolute-neutrophil-count-anc'
  },
  {
    id: 'sofa-score',
    name: { zh: 'SOFA 評分 & qSOFA', en: 'SOFA & qSOFA Scores' },
    subtitle: { zh: '評估敗血症患者器官衰竭嚴重度與死亡率', en: 'Sepsis Organ Failure & Mortality Assessment' },
    category: 'infectious_diseases',
    inputs: [
      {
        id: 'pf',
        name: { zh: '呼吸系統 - P/F Ratio', en: 'Respiration - P/F Ratio' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '≥ 400 (正常) (0分)', en: '≥ 400 (0 pt)' }, value: 0 },
          { label: { zh: '< 400 (+1分)', en: '< 400 (+1 pt)' }, value: 1 },
          { label: { zh: '< 300 (+2分)', en: '< 300 (+2 pts)' }, value: 2 },
          { label: { zh: '< 200 (且需呼吸支持) (+3分)', en: '< 200 with respiratory support (+3 pts)' }, value: 3 },
          { label: { zh: '< 100 (且需呼吸支持) (+4分)', en: '< 100 with respiratory support (+4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'plt',
        name: { zh: '血液系統 - 血小板計數 (Platelets)', en: 'Coagulation - Platelets' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '≥ 150,000 /µL (0分)', en: '≥ 150k (0 pt)' }, value: 0 },
          { label: { zh: '< 150,000 /µL (+1分)', en: '< 150k (+1 pt)' }, value: 1 },
          { label: { zh: '< 100,000 /µL (+2分)', en: '< 100k (+2 pts)' }, value: 2 },
          { label: { zh: '< 50,000 /µL (+3分)', en: '< 50k (+3 pts)' }, value: 3 },
          { label: { zh: '< 20,000 /µL (+4分)', en: '< 20k (+4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'bili',
        name: { zh: '肝臟系統 - 總膽紅素 (Bilirubin)', en: 'Liver - Total Bilirubin' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '< 1.2 mg/dL (0分)', en: '< 1.2 mg/dL (0 pt)' }, value: 0 },
          { label: { zh: '1.2–1.9 mg/dL (+1分)', en: '1.2–1.9 mg/dL (+1 pt)' }, value: 1 },
          { label: { zh: '2.0–5.9 mg/dL (+2分)', en: '2.0–5.9 mg/dL (+2 pts)' }, value: 2 },
          { label: { zh: '6.0–11.9 mg/dL (+3分)', en: '6.0–11.9 mg/dL (+3 pts)' }, value: 3 },
          { label: { zh: '≥ 12.0 mg/dL (+4分)', en: '≥ 12.0 mg/dL (+4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'cvs',
        name: { zh: '心血管系統 - 血壓 / 升壓藥使用', en: 'Cardiovascular - BP / Vasopressors' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: 'MAP ≥ 70 mmHg (正常) (0分)', en: 'MAP ≥ 70 mmHg (0 pt)' }, value: 0 },
          { label: { zh: 'MAP < 70 mmHg (+1分)', en: 'MAP < 70 mmHg (+1 pt)' }, value: 1 },
          { label: { zh: '需多巴胺 Dopamine ≤ 5 或 Dobutamine 任何劑量 (+2分)', en: 'Dopamine ≤ 5 or dobutamine (+2 pts)' }, value: 2 },
          { label: { zh: '需 Dopamine > 5, 或 Norepinephrine ≤ 0.1, 或 Epinephrine ≤ 0.1 (+3分)', en: 'Dopamine > 5 or Norepinephrine ≤ 0.1 (+3 pts)' }, value: 3 },
          { label: { zh: '需 Norepinephrine > 0.1, 或 Epinephrine > 0.1 (+4分)', en: 'Norepinephrine > 0.1 or Epinephrine > 0.1 (+4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'gcs',
        name: { zh: '中樞神經 - 格拉斯哥昏迷指數 (GCS)', en: 'CNS - Glasgow Coma Scale (GCS)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: 'GCS = 15 (正常) (0分)', en: 'GCS = 15 (0 pt)' }, value: 0 },
          { label: { zh: 'GCS = 13–14 (+1分)', en: 'GCS = 13–14 (+1 pt)' }, value: 1 },
          { label: { zh: 'GCS = 10–12 (+2分)', en: 'GCS = 10–12 (+2 pts)' }, value: 2 },
          { label: { zh: 'GCS = 6–9 (+3分)', en: 'GCS = 6–9 (+3 pts)' }, value: 3 },
          { label: { zh: 'GCS < 6 (+4分)', en: 'GCS < 6 (+4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'renal',
        name: { zh: '腎臟系統 - 肌酸酐 (Creatinine) 或尿量', en: 'Renal - Creatinine or Urine Output' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: 'Cr < 1.2 mg/dL (正常) (0分)', en: 'Cr < 1.2 mg/dL (0 pt)' }, value: 0 },
          { label: { zh: 'Cr = 1.2–1.9 mg/dL (+1分)', en: 'Cr = 1.2–1.9 mg/dL (+1 pt)' }, value: 1 },
          { label: { zh: 'Cr = 2.0–3.4 mg/dL (+2分)', en: 'Cr = 2.0–3.4 mg/dL (+2 pts)' }, value: 2 },
          { label: { zh: 'Cr = 3.5–4.9 mg/dL, 或每日尿量 < 500 mL (+3分)', en: 'Cr = 3.5–4.9 mg/dL or UO < 500 mL/day (+3 pts)' }, value: 3 },
          { label: { zh: 'Cr ≥ 5.0 mg/dL, 或每日尿量 < 200 mL (+4分)', en: 'Cr ≥ 5.0 mg/dL or UO < 200 mL/day (+4 pts)' }, value: 4 }
        ]
      }
    ],
    calculate: (values) => {
      const score = Number(values.pf) + Number(values.plt) + Number(values.bili) + Number(values.cvs) + Number(values.gcs) + Number(values.renal);

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score <= 1) {
        riskLevel = { zh: '低度器官衰竭 (Low Mortality)', en: 'Low Severity' };
        desc = { zh: `SOFA 評分 ${score} 分。預估住院死亡率極低 (< 5%)。`, en: `SOFA Score is ${score}. Estimated hospital mortality <5%.` };
        recommendation = { zh: '常規病房觀察，繼續抗感染治療。', en: 'Standard monitoring.' };
      } else if (score <= 9) {
        riskLevel = { zh: '中度器官衰竭 (Mortality ~15-20%)', en: 'Moderate Severity (Mortality ~15-20%)' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `SOFA 評分 ${score} 分。提示有顯著多器官功能不全，需密切監測。`, en: `SOFA Score is ${score}. Indicates substantial organ dysfunction.` };
        recommendation = { zh: '需加強監護（建議收治 ICU 或 Intermediate Care Unit），尋找感染源，優化血流動力學。', en: 'Close monitoring, potential ICU triage. Control infection source.' };
      } else {
        riskLevel = { zh: '重度器官衰竭 (Mortality ≥50%)', en: 'Severe Organ Failure (Mortality ≥50%)' };
        riskColor = 'text-rose-450 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `SOFA 評分 ${score} 分。提示多器官功能衰竭，短期死亡風險極高。`, en: `SOFA Score is ${score}. Critical organ dysfunction with high short-term mortality.` };
        recommendation = { zh: '強烈建議收治加護病房 (ICU)，給予積極的器官功能支持治療（如升壓藥、機械通氣、連續血液透析）。', en: 'Immediate ICU admission, aggressive organ supportive therapy.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'SOFA = Respiration + Coagulation + Liver + Cardiovascular + CNS + Renal',
    pearls: {
      zh: [
        'Sepsis-3 指引中，敗血症 (Sepsis) 被定義為「因宿主對感染的反應失調，進而引發危及生命的器官功能障礙」。臨床上以感染病患的 **SOFA 評分比基線急性升高 ≥ 2 分** 來判定。',
        '**qSOFA (快速 SOFA 評分) 床邊篩檢：** 1. 呼吸速率 ≥ 22 bpm；2. 意識狀態改變 (GCS < 15)；3. 收縮壓 ≤ 100 mmHg。符合 2 項或以上提示不良預後風險高，應高度懷疑敗血症。'
      ],
      en: [
        'Sepsis-3 defines sepsis as a life-threatening organ dysfunction caused by a dysregulated host response to infection, indicated by an acute increase in SOFA score ≥2.',
        '**qSOFA (quick SOFA) screen:** 1. Respiratory rate ≥22 breaths/min; 2. Altered mentation (GCS <15); 3. Systolic blood pressure ≤100 mmHg. A score ≥2 is associated with high mortality risk.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/1377/sequential-organ-failure-assessment-sofa-score'
  }
];
