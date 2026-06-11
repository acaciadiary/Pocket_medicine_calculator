/* eslint-disable @typescript-eslint/no-explicit-any */
import { nonInternalMedicineCalculators } from './nonInternalMedicineCalculators';

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
  category: 'cardiology' | 'pulmonary' | 'nephrology' | 'acid_base' | 'gastroenterology' | 'hematology' | 'oncology' | 'endocrinology' | 'infectious_diseases' | 'rheumatology' | 'obgyn' | 'pediatrics' | 'surgery' | 'anesthesia' | 'emergency_critical' | 'neurology' | 'psychiatry' | 'orthopedics' | 'urology' | 'dermatology' | 'ophthalmology';
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
  obgyn: { zh: '婦產科', en: 'OB/GYN' },
  pediatrics: { zh: '小兒科', en: 'Pediatrics' },
  surgery: { zh: '外科', en: 'Surgery' },
  anesthesia: { zh: '麻醉科', en: 'Anesthesiology' },
  emergency_critical: { zh: '急診重症', en: 'Emergency & Critical Care' },
  neurology: { zh: '神經科', en: 'Neurology' },
  psychiatry: { zh: '精神科', en: 'Psychiatry' },
  orthopedics: { zh: '骨科', en: 'Orthopedics' },
  urology: { zh: '泌尿科', en: 'Urology' },
  dermatology: { zh: '皮膚科', en: 'Dermatology' },
  ophthalmology: { zh: '眼科', en: 'Ophthalmology' },
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
  },
  {
    id: 'mascc-score',
    name: { zh: 'MASCC 發熱性中性球減少風險指數', en: 'MASCC Risk Index for Febrile Neutropenia' },
    subtitle: { zh: '評估發熱性中性球低下患者嚴重併發症之風險', en: 'Outpatient Triage for Febrile Neutropenia' },
    category: 'oncology',
    inputs: [
      {
        id: 'burden',
        name: { zh: '發熱性中性球減少的症狀嚴重度', en: 'Burden of Febrile Neutropenia' },
        type: 'select',
        defaultValue: 5,
        options: [
          { label: { zh: '無或輕微症狀 (+5分)', en: 'No or mild symptoms (+5 pts)' }, value: 5 },
          { label: { zh: '中度症狀 (+3分)', en: 'Moderate symptoms (+3 pts)' }, value: 3 },
          { label: { zh: '嚴重症狀 (0分)', en: 'Severe symptoms (0 pt)' }, value: 0 }
        ]
      },
      {
        id: 'no_hypotension',
        name: { zh: '無低血壓 (收縮壓 ≥ 90 mmHg) (+5分)', en: 'No Hypotension (SBP ≥ 90 mmHg) (+5 pts)' },
        type: 'boolean',
        defaultValue: true
      },
      {
        id: 'no_copd',
        name: { zh: '無活動性慢性肺病 (COPD) (+4分)', en: 'No Active COPD (+4 pts)' },
        type: 'boolean',
        defaultValue: true
      },
      {
        id: 'cancer_type',
        name: { zh: '癌症類型與真菌感染史', en: 'Type of Cancer' },
        type: 'select',
        defaultValue: 4,
        options: [
          { label: { zh: '固態腫瘤，或無前次真菌感染之血液惡性腫瘤 (+4分)', en: 'Solid tumor or hematologic without prior fungal infection (+4 pts)' }, value: 4 },
          { label: { zh: '伴有前次真菌感染之血液惡性腫瘤 (0分)', en: 'Hematologic malignancy with prior fungal infection (0 pt)' }, value: 0 }
        ]
      },
      {
        id: 'no_dehydration',
        name: { zh: '無脫水症狀 (無需靜脈液體支持) (+3分)', en: 'No Dehydration (+3 pts)' },
        type: 'boolean',
        defaultValue: true
      },
      {
        id: 'outpatient',
        name: { zh: '發熱時為門診狀態 (+3分)', en: 'Outpatient Status at Onset of Fever (+3 pts)' },
        type: 'boolean',
        defaultValue: true
      },
      {
        id: 'age_under_60',
        name: { zh: '年齡小於 60 歲 (+2分)', en: 'Age Under 60 Years (+2 pts)' },
        type: 'boolean',
        defaultValue: true
      }
    ],
    calculate: (values) => {
      let score = Number(values.burden);
      if (values.no_hypotension) score += 5;
      if (values.no_copd) score += 4;
      score += Number(values.cancer_type);
      if (values.no_dehydration) score += 3;
      if (values.outpatient) score += 3;
      if (values.age_under_60) score += 2;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score >= 21) {
        riskLevel = { zh: '低風險 (Low Risk)', en: 'Low Risk' };
        desc = { zh: `MASCC 評分為 ${score} 分 (≥ 21 分)。發生嚴重臨床併發症的機率低 (< 5%)。`, en: `MASCC Score is ${score} (≥ 21). Low risk of serious complications (< 5%).` };
        recommendation = { zh: '若無其他禁忌且社會支持良好，可考慮門診口服抗生素治療與密切追蹤。', en: 'Consider outpatient management with oral antibiotics.' };
      } else {
        riskLevel = { zh: '高風險 (High Risk)', en: 'High Risk' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `MASCC 評分為 ${score} 分 (< 21 分)。發生嚴重臨床併發症或死亡的風險顯著增高 (≥ 15%)。`, en: `MASCC Score is ${score} (< 21). High risk of serious complications or death (≥ 15%).` };
        recommendation = { zh: '必須住院接受經驗性靜脈廣效抗生素治療，並密切監測生命徵象。', en: 'Inpatient admission for intravenous empiric antibiotics is required.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'MASCC = Burden + Hypotension + COPD + CancerType + Dehydration + Outpatient + Age',
    pearls: {
      zh: [
        'MASCC 指數是國際公認用於篩選「低風險發熱性中性球低下」患者的工具。',
        '**門診口服抗生素首選組合：** Ciprofloxacin (500mg q12h) 加上 Amoxicillin-Clavulanate (875mg q12h)。',
        '**絕對排除標準：** 即使評分 ≥ 21，若病患接受異體造血幹細胞移植、處於急性白血病誘導化療期，或預期中性球低下持續時間 > 7 天，仍屬高風險，應強制住院治療。'
      ],
      en: [
        'MASCC Risk Index identifies cancer patients with febrile neutropenia at low risk for complications.',
        '**Standard oral regimen:** Ciprofloxacin 500 mg q12h plus Amoxicillin-Clavulanate 875 mg q12h.',
        '**Exceptions:** Patients undergoing induction chemotherapy for acute leukemia or allogeneic stem cell transplant must be admitted regardless of score.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/113/mascc-risk-index-febrile-neutropenia'
  },
  {
    id: 'slim-crab',
    name: { zh: 'SLiM-CRAB 多發性骨髓瘤診斷標準', en: 'SLiM-CRAB Multiple Myeloma Criteria' },
    subtitle: { zh: '區分多發性骨髓瘤與冒煙型/MGUS 之診斷指標', en: 'Diagnostic Criteria for Active Multiple Myeloma' },
    category: 'oncology',
    inputs: [
      {
        id: 'prereq',
        name: { zh: '前提條件：骨髓克隆性漿細胞比例 ≥ 10% 或切片證實為漿細胞瘤', en: 'BM plasma cells ≥ 10% or biopsy-proven plasmacytoma' },
        type: 'boolean',
        defaultValue: true
      },
      {
        id: 's_sixty',
        name: { zh: 'S：骨髓克隆性漿細胞比例 ≥ 60%', en: 'S: Clonal bone marrow plasma cells ≥ 60%' },
        type: 'boolean',
        defaultValue: false
      },
      {
        id: 'li_light_chain',
        name: { zh: 'Li：受累與未受累血清游離輕鏈比值 ≥ 100', en: 'Li: Involved/uninvolved free light chain ratio ≥ 100' },
        type: 'boolean',
        defaultValue: false,
        tooltip: { zh: '且受累游離輕鏈絕對濃度必須 ≥ 100 mg/L', en: 'And involved free light chain must be ≥ 100 mg/L' }
      },
      {
        id: 'm_mri',
        name: { zh: 'M：MRI 顯示 > 1 處局灶性骨質病變 (≥ 5 mm)', en: 'M: >1 focal bone lesion on MRI (each ≥5 mm)' },
        type: 'boolean',
        defaultValue: false
      },
      {
        id: 'c_calcium',
        name: { zh: 'C：高血鈣 (血鈣 > 11 mg/dL 或高於正常上限 > 1 mg/dL)', en: 'C: Calcium elevation (> 11 mg/dL or >1 mg/dL above ULN)' },
        type: 'boolean',
        defaultValue: false
      },
      {
        id: 'r_renal',
        name: { zh: 'R：腎功能不全 (血肌酸酐 > 2.0 mg/dL 或 CrCl < 40 mL/min)', en: 'R: Renal insufficiency (Serum Cr >2.0 mg/dL or CrCl <40 mL/min)' },
        type: 'boolean',
        defaultValue: false
      },
      {
        id: 'a_anemia',
        name: { zh: 'A：貧血 (血紅素 < 10 g/dL 或比正常下限低 > 2 g/dL)', en: 'A: Anemia (Hb <10 g/dL or >2 g/dL below LLN)' },
        type: 'boolean',
        defaultValue: false
      },
      {
        id: 'b_bone',
        name: { zh: 'B：骨骼侵蝕性病變 (skeletal survey/CT/PET-CT 顯示溶骨病變)', en: 'B: Bone lesions (≥1 osteolytic lesion on skeletal survey, CT, or PET-CT)' },
        type: 'boolean',
        defaultValue: false
      }
    ],
    calculate: (values) => {
      const prereq = !!values.prereq;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-slate-400 bg-slate-900/40 border-glass-border';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (!prereq) {
        riskLevel = { zh: '不符合 MM 前提', en: 'Ineligible for MM' };
        desc = { zh: '未滿足骨髓克隆性漿細胞比例 ≥ 10% 或組織切片證實漿細胞瘤之前提，無法診斷為多發性骨髓瘤。請考慮單株免疫球蛋白血症 (MGUS)。', en: 'Does not meet prerequisite of ≥10% clonal plasma cells. Ineligible for myeloma diagnosis.' };
        recommendation = { zh: '建議進行常規臨床監測、血清蛋白電泳與免疫固定電泳追蹤。', en: 'Routine clinical surveillance recommended.' };
        return { valueText: 'Ineligible', riskLevel, riskColor, description: desc, recommendation };
      }

      const hasSLiM = values.s_sixty || values.li_light_chain || values.m_mri;
      const hasCRAB = values.c_calcium || values.r_renal || values.a_anemia || values.b_bone;
      const isActiveMM = hasSLiM || hasCRAB;

      if (isActiveMM) {
        riskLevel = { zh: '活動性多發性骨髓瘤 (Active MM)', en: 'Active Multiple Myeloma' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: '符合 SLiM-CRAB 診斷標準。滿足前提條件且具備至少一項骨髓瘤定義性事件 (SLiM 或 CRAB)。', en: 'Meets SLiM-CRAB criteria. Diagnostic of active multiple myeloma.' };
        recommendation = { zh: '強烈建議開始系統性抗骨髓瘤治療 (如蛋白酶體抑制劑、免疫調節劑、單株抗體與類固醇)。考慮進行自體幹細胞移植評估。', en: 'Strong recommendation to initiate systemic anti-myeloma therapy.' };
      } else {
        riskLevel = { zh: '冒煙型骨髓瘤 (Smoldering MM)', en: 'Smoldering Myeloma' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: '滿足前提條件，但無任何 SLiM 或 CRAB 終末器官受損指標。提示為冒煙型多發性骨髓瘤 (SMM)。', en: 'No SLiM or CRAB features met. Suggestive of Smoldering Multiple Myeloma (SMM).' };
        recommendation = { zh: '目前指引建議常規門診追蹤，無症狀時暫不需要化學治療，除非屬於極高危 SMM 亞群。', en: 'Observation and close follow-up. Chemo is generally not indicated unless high-risk SMM.' };
      }

      return {
        valueText: isActiveMM ? 'Active MM' : 'Smoldering MM',
        riskLevel,
        riskColor,
        description: desc,
        recommendation
      };
    },
    reference: 'Active Myeloma = Prerequisite (BM Plasma Cells ≥10%) + at least 1 SLiM or CRAB feature',
    pearls: {
      zh: [
        '**SLiM 指標（骨髓瘤定義事件）：** 這些指標預測病患在 2 年內發生 CRAB 器官受損的機率高達 80%，因此在無症狀時即應開始介入治療。',
        '**腎臟受損限制：** 骨髓瘤引起的腎衰竭通常是由游離輕鏈造成的管型腎病 (Cast Nephropathy) 引起，臨床常伴隨顯著蛋白尿但尿液試紙檢驗 (Dipstick) 呈陰性。',
        '**溶骨病變評估：** 骨髓瘤的骨病變主要是溶骨性 (Osteolytic)，X 光、低劑量全身 CT 或 PET-CT 是首選；骨骼核醫掃描 (Bone Scan) 在骨髓瘤中常呈假陰性。'
      ],
      en: [
        '**SLiM features (Myeloma-defining events):** Predict an 80% risk of progression to symptomatic organ damage within 2 years, justifying immediate therapy.',
        '**Renal injury:** Myeloma cast nephropathy is typical. Urine dipstick is often negative for protein because it primarily detects albumin, not light chains (Bence Jones proteins).',
        '**Bone imaging:** Skeletal surveys, low-dose whole-body CT, or PET-CT are preferred. Technetium-99m bone scans are insensitive for osteolytic lesions.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/10398/imwg-multiple-myeloma-diagnostic-criteria'
  },
  {
    id: 'cairo-bishop',
    name: { zh: 'Cairo-Bishop 腫瘤溶解症候群標準', en: 'Cairo-Bishop Tumor Lysis Syndrome Criteria' },
    subtitle: { zh: '評估化療前後發生實驗室或臨床 TLS 之嚴重度', en: 'Laboratory and Clinical Tumor Lysis Syndrome (TLS)' },
    category: 'oncology',
    inputs: [
      { id: 'uric_acid', name: { zh: '高尿酸 (Uric Acid ≥ 8.0 mg/dL 或上升 25%)', en: 'Uric Acid ≥8.0 mg/dL (476 µmol/L) or 25% increase' }, type: 'boolean', defaultValue: false },
      { id: 'potassium', name: { zh: '高血鉀 (Potassium ≥ 6.0 mEq/L 或上升 25%)', en: 'Potassium ≥6.0 mEq/L (mmol/L) or 25% increase' }, type: 'boolean', defaultValue: false },
      { id: 'phosphorus', name: { zh: '高血磷 (Phosphorus ≥ 4.5 mg/dL 或上升 25%)', en: 'Phosphorus ≥4.5 mg/dL (1.45 mmol/L) or 25% increase' }, type: 'boolean', defaultValue: false },
      { id: 'calcium', name: { zh: '低血鈣 (Calcium ≤ 7.0 mg/dL 或下降 25%)', en: 'Calcium ≤7.0 mg/dL (1.75 mmol/L) or 25% decrease' }, type: 'boolean', defaultValue: false },
      { id: 'renal', name: { zh: '臨床指標：腎臟受損 (血肌酸酐 ≥ 1.5x ULN)', en: 'Clinical: Renal dysfunction (Creatinine ≥ 1.5x ULN)' }, type: 'boolean', defaultValue: false },
      { id: 'arrhythmia', name: { zh: '臨床指標：心律不整 / 猝死', en: 'Clinical: Cardiac arrhythmia or sudden death' }, type: 'boolean', defaultValue: false },
      { id: 'seizure', name: { zh: '臨床指標：癲癇發作', en: 'Clinical: Seizures' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let ltlsCount = 0;
      if (values.uric_acid) ltlsCount += 1;
      if (values.potassium) ltlsCount += 1;
      if (values.phosphorus) ltlsCount += 1;
      if (values.calcium) ltlsCount += 1;

      const isLTLS = ltlsCount >= 2;
      const isCTLS = isLTLS && (values.renal || values.arrhythmia || values.seizure);

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (isCTLS) {
        riskLevel = { zh: '臨床腫瘤溶解症候群 (Clinical TLS)', en: 'Clinical TLS' };
        riskColor = 'text-rose-450 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: '符合 Clinical TLS 診斷。具備實驗室 TLS，且合併至少一項終末器官功能障礙指標。', en: 'Meets Clinical TLS criteria. Laboratory TLS present with clinical organ dysfunction.' };
        recommendation = { zh: '這是醫療急症！強烈建議轉加護病房 (ICU)，給予大量生理食鹽水補水、靜脈注射 Rasburicase，並密切監測電解質與心電圖。準備緊急血液透析之評估。', en: 'Medical emergency! Intensive care admission, aggressive IV hydration, Rasburicase therapy.' };
      } else if (isLTLS) {
        riskLevel = { zh: '實驗室腫瘤溶解症候群 (Laboratory TLS)', en: 'Laboratory TLS' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `符合 Laboratory TLS 診斷。代謝指標異常數為 ${ltlsCount} 項 (≥ 2項)，目前無臨床受損表現。`, en: `Meets Laboratory TLS criteria with ${ltlsCount} metabolic abnormalities. No clinical symptoms.` };
        recommendation = { zh: '應給予積極靜脈補水，停用所有含鉀/磷的藥物，考慮口服 Allopurinol 或靜脈使用 Rasburicase，每 6–8 小時追蹤電解質。', en: 'Aggressive IV hydration, hold potassium/phosphate, initiate allopurinol/rasburicase.' };
      } else {
        riskLevel = { zh: '無 TLS 徵兆 (No TLS)', en: 'No TLS' };
        desc = { zh: `目前符合的代謝指標僅有 ${ltlsCount} 項 (< 2項)。未達到 TLS 實驗室診斷標準。`, en: `Only ${ltlsCount} metabolic abnormalities. Does not meet TLS criteria.` };
        recommendation = { zh: '常規補水，持續監測化療前後之電解質與尿酸值。', en: 'Standard hydration and routine laboratory monitoring.' };
      }

      return {
        valueText: isCTLS ? 'Clinical TLS' : (isLTLS ? 'Lab TLS' : 'No TLS'),
        riskLevel,
        riskColor,
        description: desc,
        recommendation
      };
    },
    reference: 'LTLS = ≥2 metabolic parameters. CTLS = LTLS + 1 clinical parameter (Renal/Arrhythmia/Seizure)',
    pearls: {
      zh: [
        '**Rasburicase 禁忌症：** 對於 **G6PD 缺乏症 (蠶豆症)** 患者，Rasburicase 會誘發嚴重的急性溶血與變性血紅素血症，為絕對禁忌症；此時應改用高劑量 Allopurinol，並積極補水與鹼化尿液（有爭議）。',
        '**低血鈣治療警示：** 除非病患出現抽搐、強直 (tetany) 或 QTc 延長等臨床症狀，否則不建議常規補鈣，因為給予外源性鈣離子會與高血磷結合，在腎臟形成磷酸鈣結晶，加重急性腎功能衰竭。'
      ],
      en: [
        '**Rasburicase Contraindication:** Strictly contraindicated in **G6PD deficiency** due to the risk of severe hemolysis. Use allopurinol instead.',
        '**Calcium infusion warning:** Do not treat asymptomatic hypocalcemia in TLS. Calcium infusion increases the calcium-phosphate product, exacerbating renal tubule crystal deposition.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/10427/cairo-bishop-definition-tumor-lysis-syndrome'
  },
  {
    id: 'child-pugh',
    name: { zh: 'Child-Pugh 肝臟功能分級', en: 'Child-Pugh Score for Cirrhosis Mortality' },
    subtitle: { zh: '評估肝硬化病患之功能儲備與手術死亡風險', en: 'Classifying Severity of Cirrhosis' },
    category: 'gastroenterology',
    inputs: [
      {
        id: 'bilirubin',
        name: { zh: '總膽紅素 (Total Bilirubin)', en: 'Total Bilirubin' },
        type: 'select',
        defaultValue: 1,
        options: [
          { label: { zh: '< 2.0 mg/dL (1分)', en: '< 2.0 mg/dL (1 pt)' }, value: 1 },
          { label: { zh: '2.0–3.0 mg/dL (2分)', en: '2.0–3.0 mg/dL (2 pts)' }, value: 2 },
          { label: { zh: '> 3.0 mg/dL (3分)', en: '> 3.0 mg/dL (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'albumin',
        name: { zh: '血清白蛋白 (Serum Albumin)', en: 'Serum Albumin' },
        type: 'select',
        defaultValue: 1,
        options: [
          { label: { zh: '> 3.5 g/dL (1分)', en: '> 3.5 g/dL (1 pt)' }, value: 1 },
          { label: { zh: '2.8–3.5 g/dL (2分)', en: '2.8–3.5 g/dL (2 pts)' }, value: 2 },
          { label: { zh: '< 2.8 g/dL (3分)', en: '< 2.8 g/dL (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'inr',
        name: { zh: '凝血指標 (INR)', en: 'INR' },
        type: 'select',
        defaultValue: 1,
        options: [
          { label: { zh: '< 1.7 (1分)', en: '< 1.7 (1 pt)' }, value: 1 },
          { label: { zh: '1.7–2.3 (2分)', en: '1.7–2.3 (2 pts)' }, value: 2 },
          { label: { zh: '> 2.3 (3分)', en: '> 2.3 (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'ascites',
        name: { zh: '腹水嚴重度 (Ascites)', en: 'Ascites' },
        type: 'select',
        defaultValue: 1,
        options: [
          { label: { zh: '無腹水 (None) (1分)', en: 'None (1 pt)' }, value: 1 },
          { label: { zh: '輕微 (利尿劑可控制) (2分)', en: 'Mild / Controlled with diuretics (2 pts)' }, value: 2 },
          { label: { zh: '中重度 / 難治性腹水 (3分)', en: 'Moderate-Severe / Refractory (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'encephalopathy',
        name: { zh: '肝腦病變分級 (Hepatic Encephalopathy)', en: 'Hepatic Encephalopathy' },
        type: 'select',
        defaultValue: 1,
        options: [
          { label: { zh: '無腦病變 (None) (1分)', en: 'None (1 pt)' }, value: 1 },
          { label: { zh: 'I–II 級 (輕微嗜睡/混亂) (2分)', en: 'Grade I-II (mild sleepiness/confusion) (2 pts)' }, value: 2 },
          { label: { zh: 'III–IV 級 (昏睡/昏迷) (3分)', en: 'Grade III-IV (stupor/coma) (3 pts)' }, value: 3 }
        ]
      }
    ],
    calculate: (values) => {
      const score = Number(values.bilirubin) + Number(values.albumin) + Number(values.inr) + Number(values.ascites) + Number(values.encephalopathy);

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score <= 6) {
        riskLevel = { zh: 'Child-Pugh A 級 (代償良好)', en: 'Child-Pugh Class A' };
        desc = { zh: `總分為 ${score} 分。預估 1 年存活率約為 100%，2 年存活率約為 85%。腹部手術死亡風險較低。`, en: `Score is ${score}. 1-year survival ~100%, 2-year survival ~85%. Well-compensated.` };
        recommendation = { zh: '肝功能儲備良好。藥物治療相對安全，常規追蹤即可。', en: 'Good hepatic functional reserve.' };
      } else if (score <= 9) {
        riskLevel = { zh: 'Child-Pugh B 級 (中度受損)', en: 'Child-Pugh Class B' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `總分為 ${score} 分。預估 1 年存活率約為 80%，2 年存活率約為 60%。腹部手術死亡風險中等。`, en: `Score is ${score}. 1-year survival ~80%, 2-year survival ~60%. Significant impairment.` };
        recommendation = { zh: '肝功能受損。需謹慎調整肝臟代謝藥物劑量，嚴密評估手術適應症。', en: 'Moderate liver impairment. Carefully adjust drug dosages.' };
      } else {
        riskLevel = { zh: 'Child-Pugh C 級 (重度失代償)', en: 'Child-Pugh Class C' };
        riskColor = 'text-rose-450 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `總分為 ${score} 分。預估 1 年存活率僅約 45%，2 年存活率約 35%。腹部手術死亡風險極高 (通常為手術禁忌)。`, en: `Score is ${score}. 1-year survival ~45%, 2-year survival ~35%. Severe decompensation.` };
        recommendation = { zh: '嚴重失代償。建議積極評估肝臟移植可行性，處理併發症 (食道靜脈瘤、腹水、肝腦病變)。', en: 'Severe decompensation. Evaluate for liver transplantation.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'Child-Pugh = Bilirubin + Albumin + INR + Ascites + Encephalopathy (Score 5-15)',
    pearls: {
      zh: [
        'Child-Pugh 評級納入了腹水與肝腦病變等「主觀臨床評分」，因此在移植配對上已被更客觀的 MELD 評分取代。',
        '**FDA 藥物劑量調整：** 目前大多數製藥廠在進行藥物動力學測試時，仍以 Child-Pugh 分級作為調整肝功能受損患者劑量的主要依據。',
        '**原發性膽汁性膽管炎 (PBC) 的例外：** 由於此類病患膽紅素常居高不下，其膽紅素評分標準不同 (<4 mg/dL 爲1分, 4-10 爲2分, >10 爲3分)。'
      ],
      en: [
        'Child-Pugh classification incorporates subjective components (ascites, encephalopathy) and remains useful for drug dosing adjustment.',
        '**Surgical risk:** Class A has low risk (~10% mortality); Class B has intermediate risk; Class C is generally contraindicated for elective major surgery (>80% mortality).',
        '**Primary Biliary Cholangitis (PBC) scoring:** Uses higher bilirubin cutoffs (<4 mg/dL = 1, 4-10 = 2, >10 = 3).'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/340/child-pugh-score-cirrhosis-mortality'
  },
  {
    id: 'saag-calculator',
    name: { zh: 'SAAG 腹水診斷梯度', en: 'SAAG (Serum-Ascites Albumin Gradient)' },
    subtitle: { zh: '評估腹水病因是否為門脈高壓所致', en: 'Differentiating Causes of Ascites' },
    category: 'gastroenterology',
    inputs: [
      { id: 'serum_alb', name: { zh: '血清白蛋白濃度', en: 'Serum Albumin' }, type: 'number', defaultValue: 3.5, unit: 'g/dL', min: 0 },
      { id: 'ascites_alb', name: { zh: '腹水白蛋白濃度', en: 'Ascitic Fluid Albumin' }, type: 'number', defaultValue: 2.0, unit: 'g/dL', min: 0 },
      { id: 'ascites_prot', name: { zh: '腹水總蛋白質濃度 (選填，用於細分心臟/肝臟原因)', en: 'Ascitic Fluid Total Protein (Optional)' }, type: 'number', defaultValue: 2.0, unit: 'g/dL', min: 0 }
    ],
    calculate: (values) => {
      const sAlb = Number(values.serum_alb);
      const aAlb = Number(values.ascites_alb);
      const aProt = Number(values.ascites_prot);

      if (sAlb < aAlb) {
        return { error: 'Invalid inputs', description: { zh: '血清白蛋白應大於腹水白蛋白。', en: 'Serum albumin must be greater than ascitic albumin.' } };
      }

      const value = sAlb - aAlb;
      const isHighSAAG = value >= 1.1;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (isHighSAAG) {
        riskLevel = { zh: '高梯度 (SAAG ≥ 1.1 g/dL)', en: 'High SAAG (≥ 1.1 g/dL)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        
        let subTypeZh = '提示存在門脈高壓 (Portal Hypertension) (準確率 ~97%)。';
        let subTypeEn = 'Suggests Portal Hypertension (accuracy ~97%).';

        if (aProt >= 2.5) {
          subTypeZh += ' 腹水總蛋白 ≥ 2.5 g/dL，提示病因為「心臟源性腹水」(如鬱血性心衰竭、縮窄性心包炎) 或肝竇前阻塞。';
          subTypeEn += ' Ascitic protein ≥ 2.5 g/dL suggests cardiac etiology (e.g., CHF) or early Budd-Chiari.';
        } else if (aProt > 0) {
          subTypeZh += ' 腹水總蛋白 < 2.5 g/dL，提示病因為「肝硬化」(Cirrhosis)、晚期肝衰竭。';
          subTypeEn += ' Ascitic protein < 2.5 g/dL suggests hepatic etiology (e.g., cirrhosis).';
        }

        desc = { zh: `SAAG 值為 ${value.toFixed(2)} g/dL。${subTypeZh}`, en: `SAAG is ${value.toFixed(2)} g/dL. ${subTypeEn}` };
        recommendation = { zh: '若診斷為肝硬化腹水，治療以限鈉 (2g/day) 及併用利尿劑 (Spironolactone 100mg : Furosemide 40mg) 為主。', en: 'Management includes sodium restriction (2g/day) and combination diuretics.' };
      } else {
        riskLevel = { zh: '低梯度 (SAAG < 1.1 g/dL)', en: 'Low SAAG (< 1.1 g/dL)' };
        desc = { zh: `SAAG 值為 ${value.toFixed(2)} g/dL。提示無門脈高壓。常見原因包括：腹膜轉移 (Peritoneal Carcinomatosis)、結核性腹膜炎、胰臟源性腹水或腎病症候群。`, en: `SAAG is ${value.toFixed(2)} g/dL. Portal hypertension is unlikely. Differentials include peritoneal carcinomatosis, TB peritonitis, or nephrotic syndrome.` };
        recommendation = { zh: '應進一步安排腹水細胞學檢查 (Cytology)、結核菌培養，以排查腫瘤或感染性病因。', en: 'Perform ascitic fluid cytology, cultures, and biochemistry to rule out malignancy or infection.' };
      }

      return { value, unit: 'g/dL', riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'SAAG = Serum Albumin - Ascitic Albumin (g/dL)',
    pearls: {
      zh: [
        'SAAG 已經完全取代了傳統依胸水定義的「滲出液 vs. 漏出液」腹水分類法。',
        '**心臟性 vs. 肝性腹水：** 心臟衰竭患者的肝竇結構完整，故高壓可把富含蛋白質的液體逼入腹腔 (腹水總蛋白 ≥ 2.5)；肝硬化患者的肝竇已纖維化且硬化，故濾出的蛋白質較少 (腹水總蛋白 < 2.5)。',
        '嚴重的全身性低白蛋白血症 (血清白蛋白 < 1.1 g/dL) 會窄化梯度，使 SAAG 假性變小。'
      ],
      en: [
        'SAAG has replaced the old transudate/exudate classification (based on total protein) for ascites.',
        '**Cardiac vs. Cirrhotic:** In heart failure, hepatic sinusoids are healthy, allowing protein filtration (protein ≥2.5 g/dL); in cirrhosis, sinusoidal fibrosis blocks protein passage (protein <2.5 g/dL).',
        'Severe systemic hypoalbuminemia can narrow the gradient, leading to false low values.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/3096/serum-ascites-albumin-gradient-saag'
  },
  {
    id: 'maddrey-df',
    name: { zh: 'Maddrey 判別函數 (DF)', en: 'Maddrey\'s Discriminant Function (DF)' },
    subtitle: { zh: '評估急性酒精性肝炎嚴重度與類固醇使用指引', en: 'Steroid Eligibility in Acute Alcoholic Hepatitis' },
    category: 'gastroenterology',
    inputs: [
      { id: 'patient_pt', name: { zh: '患者凝血酶原時間 (Patient PT)', en: 'Patient Prothrombin Time (PT)' }, type: 'number', defaultValue: 15.0, unit: '秒', min: 0 },
      { id: 'control_pt', name: { zh: '對照組凝血酶原時間 (Control PT)', en: 'Control Prothrombin Time (PT)' }, type: 'number', defaultValue: 12.0, unit: '秒', min: 0 },
      { id: 'bilirubin', name: { zh: '總膽紅素 (Total Bilirubin)', en: 'Total Bilirubin' }, type: 'number', defaultValue: 5.0, unit: 'mg/dL', min: 0 }
    ],
    calculate: (values) => {
      const pPt = Number(values.patient_pt);
      const cPt = Number(values.control_pt);
      const bili = Number(values.bilirubin);

      if (!pPt || !cPt) {
        return { error: 'Invalid inputs', description: { zh: '凝血時間不能為 0。', en: 'PT values cannot be zero.' } };
      }

      const value = 4.6 * (pPt - cPt) + bili;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (value >= 32.0) {
        riskLevel = { zh: '重度酒精性肝炎 (DF ≥ 32)', en: 'Severe Alcoholic Hepatitis (DF ≥ 32)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `DF 值為 ${value.toFixed(1)} (≥ 32)。提示為重度酒精性肝炎，一個月內死亡率高達 30%–50%。`, en: `DF is ${value.toFixed(1)} (≥ 32). High short-term mortality risk (30%-50% at 28 days).` };
        recommendation = { zh: '若無禁忌症 (如活動性感染、腎衰竭、大出血)，建議給予類固醇治療 (Prednisolone 40 mg/day，使用 28 天) 以降低死亡率。', en: 'Initiate corticosteroids (Prednisolone 40 mg/day for 28 days) if no contraindications.' };
      } else {
        riskLevel = { zh: '輕中度酒精性肝炎 (DF < 32)', en: 'Mild-to-Moderate Alcoholic Hepatitis' };
        desc = { zh: `DF 值為 ${value.toFixed(1)} (< 32)。短期死亡率低，通常不需類固醇治療。`, en: `DF is ${value.toFixed(1)} (< 32). Lower risk of short-term mortality.` };
        recommendation = { zh: '以支持性治療、營養支持與戒癮諮商為主，避免使用類固醇。', en: 'Supportive care, nutritional support, and alcohol cessation.' };
      }

      return { value, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'DF = 4.6 \\times (Patient\\ PT - Control\\ PT) + Total\\ Bilirubin\\ (mg/dL)',
    pearls: {
      zh: [
        'Maddrey 判別函數 (DF) 是評估酒精性肝炎嚴重度與決定是否使用類固醇的黃金標準指標。',
        '**類固醇治療療效評估：** 開始類固醇治療後，應在第 7 天使用 **Lille Model** 評估病患的療效反應，以決定繼續使用還是及時停藥以免併發嚴重感染。'
      ],
      en: [
        'Maddrey\'s DF score evaluates 28-day mortality in patients with acute alcoholic hepatitis and determines steroid eligibility.',
        '**Response Assessment:** Corticosteroid treatment response must be re-evaluated at Day 7 using the **Lille Model** to avoid futile immunosuppression.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/33/maddreys-discriminant-function-alcoholic-hepatitis'
  },
  {
    id: 'lille-model',
    name: { zh: 'Lille 酒精性肝炎預後模型 (第 7 天)', en: 'Lille Model for Alcoholic Hepatitis' },
    subtitle: { zh: '急性酒精性肝炎患者在使用類固醇第 7 天時的療效評估', en: 'Assessing Steroid Responsiveness at Day 7' },
    category: 'gastroenterology',
    inputs: [
      { id: 'age', name: { zh: '患者年齡', en: 'Age' }, type: 'number', defaultValue: 45, unit: '歲', min: 0 },
      { id: 'albumin', name: { zh: '第 0 天血清白蛋白', en: 'Day 0 Albumin' }, type: 'number', defaultValue: 3.0, unit: 'g/dL', min: 0 },
      { id: 'renal', name: { zh: '第 0 天腎功能異常 (血肌酸酐 > 1.3 mg/dL 或透析)', en: 'Day 0 Renal insufficiency (Creatinine > 1.3 mg/dL)' }, type: 'boolean', defaultValue: false },
      { id: 'pt', name: { zh: '第 0 天凝血酶原時間 (PT)', en: 'Day 0 Prothrombin Time (PT)' }, type: 'number', defaultValue: 15.0, unit: '秒', min: 0 },
      { id: 'bili_d0', name: { zh: '第 0 天總膽紅素', en: 'Day 0 Total Bilirubin' }, type: 'number', defaultValue: 12.0, unit: 'mg/dL', min: 0 },
      { id: 'bili_d7', name: { zh: '第 7 天總膽紅素', en: 'Day 7 Total Bilirubin' }, type: 'number', defaultValue: 9.0, unit: 'mg/dL', min: 0 }
    ],
    calculate: (values) => {
      const age = Number(values.age);
      const albG_L = Number(values.albumin) * 10; // Convert g/dL to g/L
      const pt = Number(values.pt);
      const biliD0_umol = Number(values.bili_d0) * 17.1; // Convert mg/dL to umol/L
      const biliD7_umol = Number(values.bili_d7) * 17.1;
      const renalVal = values.renal ? 1 : 0;

      if (!biliD0_umol || !pt || !albG_L) {
        return { error: 'Invalid inputs', description: { zh: '請輸入有效的數據。', en: 'Please enter valid inputs.' } };
      }

      const diffBili = biliD0_umol - biliD7_umol;

      const R = 3.19 - (0.101 * age) + (0.147 * albG_L) + (0.0165 * diffBili) - (0.206 * renalVal) - (0.0065 * biliD0_umol) - (0.111 * pt);
      const value = Math.exp(-R) / (1 + Math.exp(-R));

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (value >= 0.45) {
        riskLevel = { zh: '療效不佳 (Non-responder, Lille ≥ 0.45)', en: 'Steroid Non-responder (Lille ≥ 0.45)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `Lille 評估值為 ${value.toFixed(3)} (≥ 0.45)。提示對類固醇治療無反應，預期 6 個月存活率低於 25%。`, en: `Lille Score is ${value.toFixed(3)} (≥ 0.45). Predicted 6-month survival is < 25%.` };
        recommendation = { zh: '建議立即停用類固醇，以防嚴重的伺機性感染。應儘快會診肝臟移植團隊評估。', en: 'Stop corticosteroids to prevent infections. Evaluate for early liver transplantation.' };
      } else {
        riskLevel = { zh: '療效良好 (Responder, Lille < 0.45)', en: 'Steroid Responder (Lille < 0.45)' };
        desc = { zh: `Lille 評估值為 ${value.toFixed(3)} (< 0.45)。提示患者對類固醇治療有反應，預期 6 個月存活率達 85% 以上。`, en: `Lille Score is ${value.toFixed(3)} (< 0.45). Predicted 6-month survival is ~85%.` };
        recommendation = { zh: '建議繼續完成標準的 28 天類固醇療程。', en: 'Complete the full 28-day course of prednisolone.' };
      }

      return { value, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'Lille = \\frac{e^{-R}}{1 + e^{-R}} \\quad \\text{R calculation incorporates Age, Alb, PT, Bili trend}',
    pearls: {
      zh: [
        'Lille 模型被各國肝病指引推薦用於重度酒精性肝炎類固醇治療的動態效能評估。',
        '**及時停藥原則：** 在第 7 天及時識別無反應者並停藥，可顯著減少致命性敗血症等嚴重併發症的發生率。'
      ],
      en: [
        'Lille model is standard for assessing corticosteroid treatment responsiveness in severe alcoholic hepatitis at Day 7.',
        'Discontinuing steroids in non-responders (Lille ≥0.45) significantly decreases fatal infectious complications.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/2024/lille-model-alcoholic-hepatitis'
  },
  {
    id: 'ransons-criteria',
    name: { zh: 'Ranson 氏急性胰臟炎評分', en: 'Ranson\'s Criteria for Acute Pancreatitis' },
    subtitle: { zh: '評估急性胰臟炎入院及 48 小時內之預後與死亡率', en: 'Predicting Pancreatitis Severity & Mortality' },
    category: 'gastroenterology',
    inputs: [
      {
        id: 'etiology',
        name: { zh: '胰臟炎病因分類 (Etiology)', en: 'Pancreatitis Etiology' },
        type: 'select',
        defaultValue: 'non-gallstone',
        options: [
          { label: { zh: '非膽結石性 (Non-gallstone)', en: 'Non-gallstone' }, value: 'non-gallstone' },
          { label: { zh: '膽結石性 (Gallstone)', en: 'Gallstone' }, value: 'gallstone' }
        ]
      },
      { id: 'age', name: { zh: '入庫指標: 年齡 (非膽結石 >55 歲; 膽結石 >70 歲)', en: 'Admission: Age (>55 non-gallstone / >70 gallstone)' }, type: 'boolean', defaultValue: false },
      { id: 'wbc', name: { zh: '入庫指標: 白血球 (非膽結石 >16k; 膽結石 >18k)', en: 'Admission: WBC (>16k non-gallstone / >18k gallstone)' }, type: 'boolean', defaultValue: false },
      { id: 'glucose', name: { zh: '入庫指標: 血糖 (非膽結石 >200; 膽結石 >220 mg/dL)', en: 'Admission: Glucose (>200 non-gallstone / >220 gallstone mg/dL)' }, type: 'boolean', defaultValue: false },
      { id: 'ast', name: { zh: '入庫指標: AST (均 >250 U/L)', en: 'Admission: AST (>250 U/L)' }, type: 'boolean', defaultValue: false },
      { id: 'ldh', name: { zh: '入庫指標: LDH (非膽結石 >350; 膽結石 >400 U/L)', en: 'Admission: LDH (>350 non-gallstone / >400 gallstone U/L)' }, type: 'boolean', defaultValue: false },
      
      { id: 'hct', name: { zh: '48小時指標: 血細胞比容 (Hct) 下降 > 10%', en: '48 Hours: Hematocrit decrease > 10%' }, type: 'boolean', defaultValue: false },
      { id: 'bun', name: { zh: '48小時指標: BUN 上升 (非膽結石 >5; 膽結石 >2 mg/dL)', en: '48 Hours: BUN increase (>5 non-gallstone / >2 gallstone mg/dL)' }, type: 'boolean', defaultValue: false },
      { id: 'calcium', name: { zh: '48小時指標: 血鈣 < 8.0 mg/dL', en: '48 Hours: Serum Calcium < 8.0 mg/dL' }, type: 'boolean', defaultValue: false },
      { id: 'pao2', name: { zh: '48小時指標: PaO₂ < 60 mmHg (僅適用非膽結石)', en: '48 Hours: PaO₂ < 60 mmHg (Non-gallstone only)' }, type: 'boolean', defaultValue: false },
      { id: 'base_deficit', name: { zh: '48小時指標: 鹼不足 (Base Deficit) (非膽結石 >4; 膽結石 >5 mEq/L)', en: '48 Hours: Base deficit (>4 non-gallstone / >5 gallstone mEq/L)' }, type: 'boolean', defaultValue: false },
      { id: 'fluid', name: { zh: '48小時指標: 估算液體扣留量 (Fluid Sequestration) (非膽結石 >6; 膽結石 >4 L)', en: '48 Hours: Est. fluid sequestration (>6L non-gallstone / >4L gallstone)' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      const isGallstone = values.etiology === 'gallstone';
      let score = 0;
      
      if (values.age) score += 1;
      if (values.wbc) score += 1;
      if (values.glucose) score += 1;
      if (values.ast) score += 1;
      if (values.ldh) score += 1;

      if (values.hct) score += 1;
      if (values.bun) score += 1;
      if (values.calcium) score += 1;
      if (!isGallstone && values.pao2) score += 1;
      if (values.base_deficit) score += 1;
      if (values.fluid) score += 1;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score <= 2) {
        riskLevel = { zh: '輕度胰臟炎 (Mild, 死亡率 < 1%)', en: 'Mild Pancreatitis (Mortality <1%)' };
        desc = { zh: `Ranson 評分為 ${score} 分。屬於輕度急性胰臟炎，死亡風險極低。`, en: `Ranson Score is ${score}. Mild severity with low mortality.` };
        recommendation = { zh: '常規補水與對症治療，根據疼痛緩解情況逐步恢復經口進食。', en: 'Standard supportive care and hydration.' };
      } else if (score <= 4) {
        riskLevel = { zh: '中度胰臟炎 (Moderate, 死亡率 ~15%)', en: 'Moderate Pancreatitis (Mortality ~15%)' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `Ranson 評分為 ${score} 分。屬於中度嚴重胰臟炎，預估住院死亡率約為 15%。`, en: `Ranson Score is ${score}. Moderate severity.` };
        recommendation = { zh: '建議收治住院，給予更積極的靜脈補水，密切監測重要器官功能。', en: 'Inpatient stay with active IV fluid resuscitation.' };
      } else if (score <= 6) {
        riskLevel = { zh: '重度胰臟炎 (Severe, 死亡率 ~40%)', en: 'Severe Pancreatitis (Mortality ~40%)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `Ranson 評分為 ${score} 分。屬於重度胰臟炎，預估死亡率高達 40%。`, en: `Ranson Score is ${score}. Severe pancreatitis with high mortality.` };
        recommendation = { zh: '強烈建議收治加護病房 (ICU)，密切評估系統性發炎反應 (SIRS) 與多器官衰竭，給予積極多學科聯合支持治療。', en: 'ICU admission strongly recommended for aggressive management.' };
      } else {
        riskLevel = { zh: '極重度胰臟炎 (Very Severe, 死亡率 ~100%)', en: 'Very Severe Pancreatitis (Mortality ~100%)' };
        riskColor = 'text-rose-550 bg-rose-950/60 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)] animate-pulse';
        desc = { zh: `Ranson 評分為 ${score} 分。死亡風險接近 100%。`, en: `Ranson Score is ${score}. Extremely high mortality risk.` };
        recommendation = { zh: '立即收治加護病房，維持臟器灌流，密切排查壞死性胰臟炎與繼發感染，必要時行外科介入。', en: 'Immediate ICU admission and multidisciplinary organ support.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'Ranson Score = Sum of positive criteria (max 11 for non-gallstone, max 10 for gallstone)',
    pearls: {
      zh: [
        'Ranson 氏評分的核心缺點在於需要滿 48 小時才能評估完成，對於急診室早期的超早期液體復甦決策略嫌延遲。',
        '**液體扣留量 (Fluid Sequestration) 估算：** 指在 48 小時內，病患輸入的總液體量減去尿量與排出量後，存留於體內的液體體積。',
        '在急診室，目前更推薦使用 **BISAP 評分** 或 **SIRS 評分** 進行早期評估。'
      ],
      en: [
        'Ranson criteria takes 48 hours to complete, which limits its utility in guiding immediate hyper-hydration.',
        'For early risk stratification in the ED, the BISAP score or serial BUN monitoring is preferred.',
        '**Fluid sequestration:** Sum of fluid intake minus output over 48 hours; high levels reflect third-spacing secondary to systemic inflammation.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/46/ransons-criteria-pancreatitis-mortality'
  },
  {
    id: 'fib-4-index',
    name: { zh: 'FIB-4 肝纖維化指數', en: 'FIB-4 Index for Liver Fibrosis' },
    subtitle: { zh: '使用常規生化指標非侵入性評估慢性肝病之纖維化程度', en: 'Non-invasive Screening for Advanced Fibrosis' },
    category: 'gastroenterology',
    inputs: [
      { id: 'age', name: { zh: '患者年齡', en: 'Age' }, type: 'number', defaultValue: 50, unit: '歲', min: 0 },
      { id: 'ast', name: { zh: 'AST 活性', en: 'AST' }, type: 'number', defaultValue: 30, unit: 'U/L', min: 0 },
      { id: 'alt', name: { zh: 'ALT 活性', en: 'ALT' }, type: 'number', defaultValue: 30, unit: 'U/L', min: 0 },
      { id: 'plt', name: { zh: '血小板計數 (Platelets)', en: 'Platelet Count' }, type: 'number', defaultValue: 200, unit: 'x10³/µL', min: 0, tooltip: { zh: '請輸入如 200 代表 200,000 /µL', en: 'Enter e.g. 200 to represent 200,000 /µL' } }
    ],
    calculate: (values) => {
      const age = Number(values.age);
      const ast = Number(values.ast);
      const alt = Number(values.alt);
      const plt = Number(values.plt);

      if (!alt || !plt) {
        return { error: 'Invalid inputs', description: { zh: 'ALT 與血小板數值不能為 0。', en: 'ALT and Platelets cannot be zero.' } };
      }

      const value = (age * ast) / (plt * Math.sqrt(alt));

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (value < 1.30) {
        riskLevel = { zh: '低風險 (Low Risk, < 1.30)', en: 'Low Risk of Advanced Fibrosis' };
        desc = { zh: `FIB-4 指數為 ${value.toFixed(2)} (< 1.30)。排除進展性肝纖維化 (F3-F4) 的陰性預測值 (NPV) 大於 90%。`, en: `FIB-4 is ${value.toFixed(2)} (< 1.30). High negative predictive value (>90%) for advanced fibrosis.` };
        recommendation = { zh: '進展性肝纖維化機率極低。可在基層醫院常規門診追蹤。', en: 'Advanced fibrosis unlikely. Manage in primary care.' };
      } else if (value > 2.67) {
        riskLevel = { zh: '高風險 (High Risk, > 2.67)', en: 'High Risk of Advanced Fibrosis' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `FIB-4 指數為 ${value.toFixed(2)} (> 2.67)。提示有高度可能性存在進展性肝纖維化或肝硬化。`, en: `FIB-4 is ${value.toFixed(2)} (> 2.67). High risk of advanced liver fibrosis.` };
        recommendation = { zh: '建議儘快轉診至肝膽專科，考慮安排肝臟彈性造影 (FibroScan) 或肝臟切片以明確分期。', en: 'Refer to hepatology for staging (e.g., FibroScan) and management.' };
      } else {
        riskLevel = { zh: '中度風險 / 灰色地帶 (1.30–2.67)', en: 'Indeterminate Risk / Gray Zone' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `FIB-4 指數為 ${value.toFixed(2)} (介於 1.30 至 2.67 之間)。纖維化狀態不確定。`, en: `FIB-4 is ${value.toFixed(2)} (1.30–2.67). Indeterminate fibrosis status.` };
        recommendation = { zh: '建議安排二線非侵入性檢測（如 FibroScan），或在 6–12 個月後重新評估。', en: 'Order secondary testing (e.g., transient elastography) or re-evaluate in 6-12 months.' };
      }

      return { value, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'FIB-4 = \\frac{Age\\ (years) \\times AST\\ (U/L)}{Platelets\\ (x10^9/L) \\times \\sqrt{ALT\\ (U/L)}}',
    pearls: {
      zh: [
        'FIB-4 指數在臨床上廣泛用於代謝相關脂肪性肝病 (MASLD) 患者的篩檢，避免了非必要的肝臟切片。',
        '**老年患者校正：** 對於大於 65 歲的老年病患，低風險排除的切點通常放寬至 < 2.00，以減少假陽性率。',
        '**血小板單位：** 請輸入標準血小板計數，如 150 代表 150,000 /µL。'
      ],
      en: [
        'FIB-4 is highly sensitive for screening advanced fibrosis in MASLD/NAFLD and Hepatitis C.',
        '**Elderly Cutoff:** For patients >65 years old, the low-risk rule-out threshold is adjusted to <2.00.',
        'Input platelets count in standard clinical format (e.g., 150 = 150,000 /µL).'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/2200/fibrosis-4-fib-4-index-liver-fibrosis'
  },
  {
    id: 'apri-index',
    name: { zh: 'APRI 肝纖維化比例指數', en: 'APRI (AST to Platelet Ratio Index)' },
    subtitle: { zh: '評估慢性 C 型肝炎患者纖維化與肝硬化之極簡床邊公式', en: 'AST to Platelet Ratio Index' },
    category: 'gastroenterology',
    inputs: [
      { id: 'ast', name: { zh: 'AST 活性', en: 'AST' }, type: 'number', defaultValue: 30, unit: 'U/L', min: 0 },
      { id: 'ast_uln', name: { zh: 'AST 實驗室正常上限值 (ULN)', en: 'AST Upper Limit of Normal (ULN)' }, type: 'number', defaultValue: 40, unit: 'U/L', min: 0 },
      { id: 'plt', name: { zh: '血小板計數 (Platelets)', en: 'Platelet Count' }, type: 'number', defaultValue: 200, unit: 'x10³/µL', min: 0 }
    ],
    calculate: (values) => {
      const ast = Number(values.ast);
      const uln = Number(values.ast_uln);
      const plt = Number(values.plt);

      if (!uln || !plt) {
        return { error: 'Invalid inputs', description: { zh: '正常上限值與血小板不能為 0。', en: 'ULN and Platelets cannot be zero.' } };
      }

      const value = ((ast / uln) * 100) / plt;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (value < 0.5) {
        riskLevel = { zh: '無顯著纖維化 (APRI < 0.5)', en: 'Significant Fibrosis Excluded' };
        desc = { zh: `APRI 指數為 ${value.toFixed(2)} (< 0.5)。排除顯著肝纖維化 (Ishak 評分 ≥ 3) 的陰性預測值約為 90%。`, en: `APRI is ${value.toFixed(2)} (< 0.5). High negative predictive value (~90%) for significant fibrosis.` };
        recommendation = { zh: '可排除顯著纖維化，定期於門診追蹤原發肝臟疾病即可。', en: 'Significant fibrosis excluded. Manage routinely.' };
      } else if (value > 1.5) {
        riskLevel = { zh: '顯著纖維化機率高 (APRI > 1.5)', en: 'Significant Fibrosis Likely (APRI > 1.5)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `APRI 指數為 ${value.toFixed(2)} (> 1.5)。提示高機率存在顯著肝臟纖維化。若 APRI > 2.0，更強烈提示已進展為肝硬化。`, en: `APRI is ${value.toFixed(2)} (> 1.5). High probability of significant fibrosis. APRI >2.0 indicates cirrhosis.` };
        recommendation = { zh: '建議安排影像學造影與肝組織分期評估。', en: 'Refer for advanced staging and clinical intervention.' };
      } else {
        riskLevel = { zh: '中度纖維化風險 (0.5–1.5)', en: 'Indeterminate Fibrosis Risk' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `APRI 指數為 ${value.toFixed(2)} (介於 0.5 至 1.5 之間)。`, en: `APRI is ${value.toFixed(2)} (0.5–1.5). Indeterminate status.` };
        recommendation = { zh: '建議結合 FIB-4、肝臟超音波等進行綜合評估。', en: 'Correlate with FIB-4 or elastography testing.' };
      }

      return { value, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'APRI = \\frac{(AST\\ /\\ AST\\ ULN) \\times 100}{Platelets\\ (x10^9/L)}',
    pearls: {
      zh: [
        'APRI 評分主要在慢性 C 型肝炎 (HCV) 患者中獲得廣泛驗證，是 WHO 推薦在醫療資源受限地區評估肝纖維化的首選極簡公式。',
        '**FIB-4 與 APRI 比較：** FIB-4 引入了年齡與 ALT 變數，整體診斷效能略高於 APRI，通常建議兩者聯動參考。'
      ],
      en: [
        'APRI is widely validated in chronic Hepatitis C (HCV) and recommended by WHO for low-resource settings.',
        '**APRI vs FIB-4:** FIB-4 incorporates age and ALT, offering slightly superior diagnostic accuracy.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/3094/ast-platelet-ratio-index-apri'
  },
  {
    id: 'glasgow-blatchford',
    name: { zh: 'Glasgow-Blatchford 消化道出血評分 (GBS)', en: 'Glasgow-Blatchford Bleeding Score (GBS)' },
    subtitle: { zh: '評估急性上消化道出血患者是否可安全於門診治療', en: 'Triage for Acute Upper GI Bleeding' },
    category: 'gastroenterology',
    inputs: [
      { id: 'bun', name: { zh: '尿素氮 (BUN)', en: 'Blood Urea Nitrogen (BUN)' }, type: 'number', defaultValue: 15.0, unit: 'mg/dL', min: 0 },
      {
        id: 'sex',
        name: { zh: '生理性別', en: 'Sex' },
        type: 'select',
        defaultValue: 'male',
        options: [
          { label: { zh: '男性 (Male)', en: 'Male' }, value: 'male' },
          { label: { zh: '女性 (Female)', en: 'Female' }, value: 'female' }
        ]
      },
      { id: 'hb', name: { zh: '血紅素 (Hemoglobin)', en: 'Hemoglobin (Hb)' }, type: 'number', defaultValue: 13.0, unit: 'g/dL', min: 0 },
      { id: 'sbp', name: { zh: '收縮壓 (Systolic BP)', en: 'Systolic Blood Pressure' }, type: 'number', defaultValue: 120, unit: 'mmHg', min: 0 },
      { id: 'hr', name: { zh: '心跳速率 (Heart Rate)', en: 'Heart Rate' }, type: 'number', defaultValue: 80, unit: 'bpm', min: 0 },
      { id: 'melena', name: { zh: '呈黑便表現 (Melena)', en: 'Presentation with Melena' }, type: 'boolean', defaultValue: false },
      { id: 'syncope', name: { zh: '呈暈厥表現 (Syncope)', en: 'Presentation with Syncope' }, type: 'boolean', defaultValue: false },
      { id: 'hepatic', name: { zh: '伴有慢性或急性肝病史', en: 'History of Hepatic Disease' }, type: 'boolean', defaultValue: false },
      { id: 'cardiac', name: { zh: '伴有慢性心臟衰竭史', en: 'History of Cardiac Failure' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      const bun = Number(values.bun);
      const hb = Number(values.hb);
      const sbp = Number(values.sbp);
      const hr = Number(values.hr);
      const isMale = values.sex === 'male';

      let score = 0;

      // BUN points
      if (bun >= 70.0) score += 6;
      else if (bun >= 28.1) score += 4;
      else if (bun >= 22.4) score += 3;
      else if (bun >= 18.2) score += 2;

      // Hb points
      if (isMale) {
        if (hb < 10.0) score += 6;
        else if (hb < 12.0) score += 3;
        else if (hb < 13.0) score += 1;
      } else {
        if (hb < 10.0) score += 6;
        else if (hb < 12.0) score += 1;
      }

      // SBP points
      if (sbp < 90) score += 3;
      else if (sbp < 100) score += 2;
      else if (sbp < 110) score += 1;

      // HR points
      if (hr >= 100) score += 1;

      // Other features
      if (values.melena) score += 1;
      if (values.syncope) score += 2;
      if (values.hepatic) score += 2;
      if (values.cardiac) score += 2;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score === 0) {
        riskLevel = { zh: '極低風險 (GBS = 0)', en: 'Very Low Risk (GBS = 0)' };
        desc = { zh: '評估得分為 0 分。預估需要輸血、急診內視鏡止血或因大出血死亡的風險極低 (< 1%)。', en: 'Score is 0. Extremely low risk of requiring intervention or death (<1%).' };
        recommendation = { zh: '若臨床狀態穩定且無其他紅色指徵，可安全考慮直接安排門診追蹤，無需住院。', en: 'Safe for outpatient management without admission.' };
      } else {
        riskLevel = { zh: '高風險 (GBS ≥ 1)', en: 'High Risk (GBS ≥ 1)' };
        riskColor = 'text-rose-450 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `評估得分為 ${score} 分 (≥ 1分)。提示有高機率需要接受輸血、內視鏡止血、外科或放射科止血介入。`, en: `Score is ${score} (≥ 1). High likelihood of requiring clinical intervention.` };
        recommendation = { zh: '建議收治住院，補充足夠靜脈輸液，安排內視鏡檢查評估出血點。', en: 'Admit to hospital, monitor hemoglobin, and arrange diagnostic endoscopy.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'GBS = Sum of points from BUN, Hb, SBP, HR, Melena, Syncope, Hepatic, and Cardiac history',
    pearls: {
      zh: [
        'Glasgow-Blatchford 評分 (GBS) 在預測消化道出血是否需要介入上，其敏感度明顯優於傳統的 Rockall 評分。',
        '**門診安全出院：** GBS 得分為 0 是目前公認最安全可讓急性上消化道出血病患不經急診內視鏡直接出院的標準。',
        '**尿素氮高 (BUN) 的生理意義：** 消化道出血後，血液在腸道被消化吸收，會導致血液中的尿素氮假性升高，故 BUN 升高是上消化道出血的敏感血清指標。'
      ],
      en: [
        'GBS is highly sensitive (~99%) for predicting the need for clinical intervention (transfusion or hemostasis) in GI bleeding.',
        'A GBS of 0 is the widely accepted standard for safe discharge and outpatient management.',
        'BUN elevation in GI bleeding reflects both hypoventilation/renal hypoperfusion and the absorption of blood proteins from the upper GI tract.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/518/glasgow-blatchford-bleeding-score-gbs'
  },
  {
    id: 'feurea',
    name: { zh: 'FEUrea (尿素排泄分數)', en: 'FEUrea (Fractional Excretion of Urea)' },
    subtitle: { zh: '已使用利尿劑患者之 AKI 鑑別診斷', en: 'Differentiating Prerenal AKI from ATN under Diuretic Use' },
    category: 'nephrology',
    inputs: [
      { id: 'serumCr', name: { zh: '血肌酸酐 (Serum Cr)', en: 'Serum Creatinine' }, type: 'number', defaultValue: 1.0, unit: 'mg/dL', min: 0 },
      { id: 'bun', name: { zh: '尿素氮 (BUN)', en: 'Blood Urea Nitrogen' }, type: 'number', defaultValue: 20, unit: 'mg/dL', min: 0 },
      { id: 'urineCr', name: { zh: '尿肌酸酐 (Urine Cr)', en: 'Urine Creatinine' }, type: 'number', defaultValue: 50, unit: 'mg/dL', min: 0 },
      { id: 'uun', name: { zh: '尿液尿素氮 (UUN)', en: 'Urine Urea Nitrogen' }, type: 'number', defaultValue: 300, unit: 'mg/dL', min: 0 }
    ],
    calculate: (values) => {
      const sCr = Number(values.serumCr);
      const bun = Number(values.bun);
      const uCr = Number(values.urineCr);
      const uun = Number(values.uun);

      if (!bun || !uCr) {
        return { error: 'Invalid inputs', description: { zh: 'BUN 與尿肌酸酐不能為 0。', en: 'BUN and Urine Cr cannot be zero.' } };
      }

      // Formula: FEUrea (%) = (UUN * sCr) / (BUN * uCr) * 100
      const value = (uun * sCr) / (bun * uCr) * 100;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };

      if (value < 35.0) {
        riskLevel = { zh: '腎前性因素 (Prerenal)', en: 'Prerenal Azotemia' };
        desc = { zh: `FEUrea 為 ${value.toFixed(1)}% (< 35%)。提示腎小管重吸收功能完整，AKI 由腎灌流不足引起。即使病患已使用利尿劑，此評估依然高度可靠。`, en: `FEUrea is ${value.toFixed(1)}% (< 35%). Highly suggestive of prerenal etiology, even with concurrent diuretic use.` };
      } else {
        riskLevel = { zh: '腎小管壞死 (ATN)', en: 'Acute Tubular Necrosis' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `FEUrea 為 ${value.toFixed(1)}% (≥ 35%)。提示腎小管已受損、無法正常重吸收尿素，多為急性腎小管壞死 (ATN)。`, en: `FEUrea is ${value.toFixed(1)}% (≥ 35%). Suggests intrinsic tubular damage / Acute Tubular Necrosis (ATN).` };
      }

      return { value, unit: '%', riskLevel, riskColor, description: desc };
    },
    reference: 'FEUrea (%) = \\frac{Urine\\ Urea\\ Nitrogen\\ (UUN) \\times Serum\\ Creatinine}{Blood\\ Urea\\ Nitrogen\\ (BUN) \\times Urine\\ Creatinine} \\times 100',
    pearls: {
      zh: [
        '**利尿劑的首選指標：** 使用利尿劑會直接干擾腎小管對鈉的重吸收，使 FENa 假性升高（>1%），此時使用不直接受利尿劑干擾的 FEUrea 較為準確。',
        'FEUrea < 35% 診斷腎前性 AKI 的敏感度與特異度在利尿劑使用者中依然表現良好。'
      ],
      en: [
        'FEUrea is the preferred metric for AKI triage when patients are on active diuretics (loop/thiazide).',
        'FEUrea < 35% strongly supports a prerenal state, whereas FENa is falsely elevated in the presence of diuretics.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/62/fractional-excretion-urea-feurea'
  },
  {
    id: 'mentzer-index',
    name: { zh: 'Mentzer 指數', en: 'Mentzer Index for Anemia' },
    subtitle: { zh: '評估小球性貧血患者為缺鐵或地中海貧血帶因', en: 'Differentiating Iron Deficiency Anemia from Thalassemia Trait' },
    category: 'hematology',
    inputs: [
      { id: 'mcv', name: { zh: '平均紅血球體積 (MCV)', en: 'Mean Corpuscular Volume (MCV)' }, type: 'number', defaultValue: 75.0, unit: 'fL', min: 0 },
      { id: 'rbc', name: { zh: '紅血球計數 (RBC Count)', en: 'Red Blood Cell (RBC) Count' }, type: 'number', defaultValue: 4.5, unit: 'x10⁶/µL', min: 0 }
    ],
    calculate: (values) => {
      const mcv = Number(values.mcv);
      const rbc = Number(values.rbc);

      if (!rbc) {
        return { error: 'Invalid inputs', description: { zh: 'RBC 不能為 0。', en: 'RBC count cannot be zero.' } };
      }

      const value = mcv / rbc;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (value < 13.0) {
        riskLevel = { zh: '地中海貧血帶因者 (Thalassemia Trait)', en: 'Thalassemia Trait' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `Mentzer 指數為 ${value.toFixed(1)} (< 13)。提示病患在小細胞低色素 (Microcytic) 狀態下，RBC 數量代償性增高，地中海貧血 trait 機率大。`, en: `Mentzer Index is ${value.toFixed(1)} (< 13). Suggestive of Beta Thalassemia Trait.` };
        recommendation = { zh: '建議安排血紅素電泳分析 (Hemoglobin Electrophoresis) 以確診是否有 HbA₂ 或 HbF 上升。避免盲目補鐵。', en: 'Order hemoglobin electrophoresis. Avoid empiric iron supplementation.' };
      } else {
        riskLevel = { zh: '缺鐵性貧血 (Iron Deficiency Anemia)', en: 'Iron Deficiency Anemia (IDA)' };
        desc = { zh: `Mentzer 指數為 ${value.toFixed(1)} (≥ 13)。提示因鐵質缺乏限制了 RBC 的增生與成熟，缺鐵性貧血機率大。`, en: `Mentzer Index is ${value.toFixed(1)} (≥ 13). Suggestive of Iron Deficiency Anemia.` };
        recommendation = { zh: '建議安排血清鐵蛋白 (Ferritin) 檢測。若 Ferritin < 30 ng/mL 即可診斷。應進一步尋找鐵流失原因 (如消化道出血、月經量多)。', en: 'Verify with serum Ferritin. Investigate source of blood loss.' };
      }

      return { value, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'Mentzer Index = \\frac{MCV\\ (fL)}{RBC\\ (10^6/\\mu L)}',
    pearls: {
      zh: [
        'Mentzer 指數是一項非常實用的門診「初步篩檢」工具，僅適用於 MCV < 80 fL 的小球性貧血病患。',
        '**混合病因：** 當病患同時合併缺鐵與地中海貧血帶因，或存在慢性發炎貧血時，此公式的準確度會下降。'
      ],
      en: [
        'Mentzer index is a screening tool, validated only for microcytic anemia (MCV <80 fL).',
        'Confirm Thalassemia Trait with Hb electrophoresis (HbA₂ >3.5%) and IDA with serum Ferritin.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/10425/mentzer-index-microcytic-anemia'
  },
  {
    id: 'hit-4ts',
    name: { zh: '4Ts 肝素誘導血小板低下評分 (HIT)', en: '4Ts Score for Heparin-Induced Thrombocytopenia' },
    subtitle: { zh: '評估住院病患發生 HIT 之前置臨床機率', en: 'Pre-test Probability of Heparin-Induced Thrombocytopenia' },
    category: 'hematology',
    inputs: [
      {
        id: 'thrombocytopenia',
        name: { zh: '1. 血小板減少程度 (Thrombocytopenia)', en: 'Thrombocytopenia' },
        type: 'select',
        defaultValue: 2,
        options: [
          { label: { zh: '血小板下降 > 50% 且最低值 ≥ 20k (+2分)', en: 'Plt fall > 50% AND nadir ≥ 20,000/µL (+2 pts)' }, value: 2 },
          { label: { zh: '血小板下降 30–50% 或最低值在 10–19k (+1分)', en: 'Plt fall 30–50% OR nadir 10,000–19,000/µL (+1 pt)' }, value: 1 },
          { label: { zh: '血小板下降 < 30% 或最低值 < 10k (0分)', en: 'Plt fall < 30% OR nadir < 10,000/µL (0 pt)' }, value: 0 }
        ]
      },
      {
        id: 'timing',
        name: { zh: '2. 血小板下降發生的時間點 (Timing)', en: 'Timing of Platelet Fall' },
        type: 'select',
        defaultValue: 2,
        options: [
          { label: { zh: '在肝素暴露後第 5–10 天，或近 30 天曾用過肝素且在 1 天內下降 (+2分)', en: 'Onset Days 5–10, or ≤1 day if heparin within past 30 days (+2 pts)' }, value: 2 },
          { label: { zh: '第 5–10 天但資訊不全、10天後下降，或近 31–100 天曾用過肝素且 1 天內下降 (+1分)', en: 'Onset >Day 10, or ≤1 day if heparin within 31–100 days (+1 pt)' }, value: 1 },
          { label: { zh: '暴露少於 4 天且近期無肝素暴露史 (0分)', en: 'Onset ≤4 days without recent heparin exposure (0 pt)' }, value: 0 }
        ]
      },
      {
        id: 'thrombosis',
        name: { zh: '3. 是否有新發血栓或血管病變 (Thrombosis)', en: 'Thrombosis or Other Sequelae' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '確診新血栓、注射部位皮膚壞死，或注射後急性全身反應 (+2分)', en: 'Proven new thrombosis, skin necrosis, or systemic reaction (+2 pts)' }, value: 2 },
          { label: { zh: '懷疑血栓但未確診、血栓復發，或注射部位非壞死性皮損 (+1分)', en: 'Recurrent thrombosis or suspected thrombosis (+1 pt)' }, value: 1 },
          { label: { zh: '無相關症狀 (0分)', en: 'None (0 pt)' }, value: 0 }
        ]
      },
      {
        id: 'other_cause',
        name: { zh: '4. 是否有其他引起血小板低下的原因 (Other Cause)', en: 'Other Cause(s) for Thrombocytopenia' },
        type: 'select',
        defaultValue: 2,
        options: [
          { label: { zh: '無其他顯而易見的原因 (+2分)', en: 'No other apparent cause (+2 pts)' }, value: 2 },
          { label: { zh: '可能有其他原因存在 (+1分)', en: 'Possible other cause (+1 pt)' }, value: 1 },
          { label: { zh: '有非常明確的其他病因 (0分)', en: 'Definite other cause (0 pt)' }, value: 0 }
        ]
      }
    ],
    calculate: (values) => {
      const score = Number(values.thrombocytopenia) + Number(values.timing) + Number(values.thrombosis) + Number(values.other_cause);

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score <= 3) {
        riskLevel = { zh: '低臨床機率 (Low Probability, ≤ 3)', en: 'Low Probability (≤ 3)' };
        desc = { zh: `4Ts 評分為 ${score} 分。發生 HIT 的機率低於 5%。其陰性預測值 (NPV) 大於 99%。`, en: `4Ts Score is ${score}. Very low probability of HIT (< 5%). NPV is > 99%.` };
        recommendation = { zh: '不建議常規安排抗 PF4/肝素抗體篩檢。可繼續使用肝素製劑。', en: 'Do not test for HIT antibodies. Continue heparin if indicated.' };
      } else if (score <= 5) {
        riskLevel = { zh: '中臨床機率 (Intermediate, 4–5)', en: 'Intermediate Probability (4–5)' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `4Ts 評分為 ${score} 分。確診 HIT 的機率約為 14%。`, en: `4Ts Score is ${score}. Intermediate probability of HIT (~ 14%).` };
        recommendation = { zh: '建議立即停用所有肝素產品，啟動替代性非肝素抗凝血劑 (如 Argatroban 或 Fondaparinux)，並安排 HIT 抗體篩檢。', en: 'Discontinue all heparin, initiate alternative anticoagulants, and order HIT ELISA.' };
      } else {
        riskLevel = { zh: '高臨床機率 (High Probability, 6–8)', en: 'High Probability (6–8)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `4Ts 評分為 ${score} 分。確診 HIT 的機率高達 64% 左右。`, en: `4Ts Score is ${score}. High probability of HIT (~ 64%).` };
        recommendation = { zh: '必須立即停用所有肝素（包括生理鹽水沖洗管路、肝素塗層導管），啟動非肝素抗凝血治療，安排 HIT 抗體篩檢，並以 SRA 試驗確認。', en: 'Discontinue all heparin immediately. Initiate non-heparin anticoagulation. Order HIT antibody and SRA.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: '4Ts Score = Thrombocytopenia + Timing + Thrombosis + Other Cause (0 - 8)',
    pearls: {
      zh: [
        '**Warfarin 禁忌：** 在急性 HIT 期且血小板尚未恢復至 ≥ 150,000/µL 前，**絕對禁止使用 Warfarin**，以防引發微血管血栓導致嚴重的肢體壞疽 (venous limb gangrene)。',
        '**替代抗凝血劑：** 常用選擇有 Argatroban (肝臟代謝，需監測 aPTT) 與 Bivalirudin (腎臟代謝)。'
      ],
      en: [
        'Warfarin is contraindicated during the acute phase of HIT until platelets recover to ≥ 150,000/µL due to risk of venous limb gangrene.',
        'The 4Ts score has a >99% negative predictive value, effectively ruling out HIT in low-probability patients.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/1787/4ts-score-heparin-induced-thrombocytopenia'
  },
  {
    id: 'ipss-r',
    name: { zh: 'IPSS-R 骨髓增生異常症候群預後評分', en: 'IPSS-R for Myelodysplastic Syndrome (MDS)' },
    subtitle: { zh: '評估 newly diagnosed MDS 患者之生存期及轉白血病風險', en: 'Revised International Prognostic Scoring System for MDS' },
    category: 'hematology',
    inputs: [
      {
        id: 'cytogenetics',
        name: { zh: '細胞遺傳學染色體異常分級 (Cytogenetics)', en: 'Cytogenetics' },
        type: 'select',
        defaultValue: 1,
        options: [
          { label: { zh: '極佳 (Very Good: -Y, del(11q)) (0分)', en: 'Very Good: -Y, del(11q) (0 pt)' }, value: 0 },
          { label: { zh: '良好 (Good: Normal, del(5q), del(12p), del(20q)) (1分)', en: 'Good: Normal, del(5q), del(12p), del(20q) (1 pt)' }, value: 1 },
          { label: { zh: '中等 (Intermediate: del(7q), +8, +19, i(17q)) (2分)', en: 'Intermediate: del(7q), +8, +19, i(17q) (2 pts)' }, value: 2 },
          { label: { zh: '不良 (Poor: -7, inv(3)/t(3q)/del(3q)) (3分)', en: 'Poor: -7, inv(3)/t(3q)/del(3q) (3 pts)' }, value: 3 },
          { label: { zh: '極差 (Very Poor: 染色體異常 > 3 個) (4分)', en: 'Very Poor: >3 cytogenetic abnormalities (4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'blasts',
        name: { zh: '骨髓原始細胞比例 (BM Blasts %)', en: 'Bone Marrow Blasts' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '≤ 2% (0分)', en: '≤ 2% (0 pt)' }, value: 0 },
          { label: { zh: '> 2% 且 < 5% (1分)', en: '> 2% to < 5% (1 pt)' }, value: 1 },
          { label: { zh: '5% - 10% (2分)', en: '5% - 10% (2 pts)' }, value: 2 },
          { label: { zh: '> 10% (3分)', en: '> 10% (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'hemoglobin',
        name: { zh: '血紅素濃度 (Hb)', en: 'Hemoglobin' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '≥ 10.0 g/dL (0分)', en: '≥ 10.0 g/dL (0 pt)' }, value: 0 },
          { label: { zh: '8.0–9.9 g/dL (1分)', en: '8.0–9.9 g/dL (1 pt)' }, value: 1 },
          { label: { zh: '< 8.0 g/dL (1.5分)', en: '< 8.0 g/dL (1.5 pts)' }, value: 1.5 }
        ]
      },
      {
        id: 'platelets',
        name: { zh: '血小板計數 (Platelets)', en: 'Platelet Count' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '≥ 100 x10³/µL (0分)', en: '≥ 100 x10³/µL (0 pt)' }, value: 0 },
          { label: { zh: '50–99 x10³/µL (0.5分)', en: '50–99 x10³/µL (0.5 pt)' }, value: 0.5 },
          { label: { zh: '< 50 x10³/µL (1分)', en: '< 50 x10³/µL (1 pt)' }, value: 1 }
        ]
      },
      {
        id: 'anc',
        name: { zh: '絕對嗜中性球計數 (ANC)', en: 'Absolute Neutrophil Count (ANC)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '≥ 0.8 x10³/µL (0分)', en: '≥ 0.8 x10³/µL (0 pt)' }, value: 0 },
          { label: { zh: '< 0.8 x10³/µL (0.5分)', en: '< 0.8 x10³/µL (0.5 pt)' }, value: 0.5 }
        ]
      }
    ],
    calculate: (values) => {
      const score = Number(values.cytogenetics) + Number(values.blasts) + Number(values.hemoglobin) + Number(values.platelets) + Number(values.anc);

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score <= 1.5) {
        riskLevel = { zh: '極低危 (Very Low Risk, ≤ 1.5)', en: 'Very Low Risk (≤ 1.5)' };
        desc = { zh: `總分為 ${score} 分。預估中位生存期為 8.8 年，轉為急性骨髓性白血病 (AML) 的時間中位數尚未達到。`, en: `Score is ${score}. Median survival: 8.8 years; progression to AML: Not Reached.` };
        recommendation = { zh: '以觀察、對症支持治療為主。非必要不需介入化療。', en: 'Supportive care and monitoring. Avoid aggressive chemotherapy.' };
      } else if (score <= 3.0) {
        riskLevel = { zh: '低危 (Low Risk, 1.6–3.0)', en: 'Low Risk (1.6–3.0)' };
        desc = { zh: `總分為 ${score} 分。預估中位生存期為 5.3 年，轉白血病中位時間為 10.8 年。`, en: `Score is ${score}. Median survival: 5.3 years; progression to AML: 10.8 years.` };
        recommendation = { zh: '以支持性治療為主，可考慮紅血球生成素 (ESA) 以改善貧血。', en: 'Supportive care, consider erythropoiesis-stimulating agents (ESAs).' };
      } else if (score <= 4.5) {
        riskLevel = { zh: '中危 (Intermediate Risk, 3.1–4.5)', en: 'Intermediate Risk (3.1–4.5)' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `總分為 ${score} 分。預估中位生存期為 3.0 年，轉白血病中位時間為 3.2 年。`, en: `Score is ${score}. Median survival: 3.0 years; progression to AML: 3.2 years.` };
        recommendation = { zh: '需密切監測血球變化。部分病患可考慮去甲基化藥物 (HMA，如 Azacitidine)。', en: 'Close monitoring. Consider hypomethylating agents (HMAs).' };
      } else if (score <= 6.0) {
        riskLevel = { zh: '高危 (High Risk, 4.6–6.0)', en: 'High Risk (4.6–6.0)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `總分為 ${score} 分。預估中位生存期為 1.6 年，轉白血病中位時間縮短至 1.4 年。`, en: `Score is ${score}. Median survival: 1.6 years; progression to AML: 1.4 years.` };
        recommendation = { zh: '建議啟動去甲基化藥物治療，並積極評估同種異體造血幹細胞移植 (Allogeneic HSCT，唯一根治手段)。', en: 'Initiate HMAs. Actively evaluate for allogeneic stem cell transplant.' };
      } else {
        riskLevel = { zh: '極高危 (Very High Risk, > 6.0)', en: 'Very High Risk (> 6.0)' };
        riskColor = 'text-rose-550 bg-rose-950/60 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)] animate-pulse';
        desc = { zh: `總分為 ${score} 分。預估中位生存期僅 0.8 年，轉白血病中位時間僅 0.7 年。`, en: `Score is ${score}. Median survival: 0.8 years; progression to AML: 0.7 years.` };
        recommendation = { zh: '強烈建議積極介入 HMA 治療，符合條件者應優先安排異體造血幹細胞移植或臨床試驗。', en: 'Urgent HMA therapy. Prioritize allogeneic stem cell transplantation.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'IPSS-R = Cytogenetics + Blasts + Hb + Platelets + ANC (0 - 10 pts)',
    pearls: {
      zh: [
        'IPSS-R 預後分期系統僅適用於**新診斷且未接受治療**的原發性 MDS 患者。',
        '染色體異常是決定預後最關鍵的因子之一，-Y 及 del(11q) 屬於極佳預後；而複雜染色體核型 (>3種異常) 則屬極差。'
      ],
      en: [
        'IPSS-R is validated ONLY for newly diagnosed, untreated primary MDS patients.',
        'Allogeneic stem cell transplantation remains the only curative therapy, reserved for higher-risk patient cohorts.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/3981/revised-international-prognostic-scoring-system-ipss-r-myelodysplastic-syndrome-mds'
  },
  {
    id: 'isth-dic',
    name: { zh: 'ISTH 顯性 DIC 診斷評分', en: 'ISTH DIC Diagnostic Score' },
    subtitle: { zh: '對已知誘因患者診斷瀰漫性血管內凝血', en: 'Diagnosing Overt Disseminated Intravascular Coagulation' },
    category: 'hematology',
    inputs: [
      {
        id: 'prereq',
        name: { zh: '前提條件：具備已知的 DIC 誘因 (敗血症/重症/創傷/惡性腫瘤)', en: 'Patient has an underlying disorder known to be associated with DIC' },
        type: 'boolean',
        defaultValue: true
      },
      {
        id: 'platelets',
        name: { zh: '血小板計數 (Platelets)', en: 'Platelet Count' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '≥ 100 x10³/µL (0分)', en: '≥ 100 x10³/µL (0 pt)' }, value: 0 },
          { label: { zh: '50–99 x10³/µL (+1分)', en: '50–99 x10³/µL (+1 pt)' }, value: 1 },
          { label: { zh: '< 50 x10³/µL (+2分)', en: '< 50 x10³/µL (+2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'markers',
        name: { zh: '纖維蛋白降解產物 (如 D-dimer / FDP) 升高程度', en: 'Fibrin Degradation Products (FDP) / D-dimer' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無明顯升高 (0分)', en: 'No increase (0 pt)' }, value: 0 },
          { label: { zh: '中度升高 (+2分)', en: 'Moderate increase (+2 pts)' }, value: 2 },
          { label: { zh: '顯著/重度升高 (+3分)', en: 'Strong increase (+3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'pt',
        name: { zh: '凝血酶原時間 (PT) 延長毫秒數', en: 'PT Prolongation' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '< 3 秒 (0分)', en: '< 3 seconds (0 pt)' }, value: 0 },
          { label: { zh: '3–5.9 秒 (+1分)', en: '3–5.9 seconds (+1 pt)' }, value: 1 },
          { label: { zh: '≥ 6 秒 (+2分)', en: '≥ 6 seconds (+2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'fibrinogen',
        name: { zh: '纖維蛋白原濃度 (Fibrinogen)', en: 'Fibrinogen' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '≥ 100 mg/dL (1.0 g/L) (0分)', en: '≥ 100 mg/dL (0 pt)' }, value: 0 },
          { label: { zh: '< 100 mg/dL (1.0 g/L) (+1分)', en: '< 100 mg/dL (+1 pt)' }, value: 1 }
        ]
      }
    ],
    calculate: (values) => {
      const prereq = !!values.prereq;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-slate-400 bg-slate-900/40 border-glass-border';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (!prereq) {
        riskLevel = { zh: '不符合前提', en: 'Ineligible' };
        desc = { zh: '缺乏已知可誘發 DIC 的基礎病因，不建議進行此評估。', en: 'No underlying disorder associated with DIC. Scoring not valid.' };
        recommendation = { zh: '必須優先診斷並處理原發病因。', en: 'Address underlying clinical etiology first.' };
        return { valueText: 'Ineligible', riskLevel, riskColor, description: desc, recommendation };
      }

      const score = Number(values.platelets) + Number(values.markers) + Number(values.pt) + Number(values.fibrinogen);
      const isOvert = score >= 5;

      if (isOvert) {
        riskLevel = { zh: '符合顯性 DIC (Overt DIC, ≥ 5)', en: 'Overt DIC' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `總分為 ${score} 分。符合國際血栓與止血學會 (ISTH) 顯性/急性 DIC 之診斷標準。`, en: `Score is ${score} (≥ 5). Diagnostically compatible with overt DIC.` };
        recommendation = { zh: '首要任務為治療病因 (如控制敗血症)。若有活動性出血，建議補充血小板、冷凍血漿 (FFP) 或冷凍沉澱品 (Cryoprecipitate) 補充纖維蛋白原。每日監控評分。', en: 'Treat the underlying cause immediately. Supportive blood transfusion if actively bleeding.' };
      } else {
        riskLevel = { zh: '非顯性 DIC (Non-overt DIC, < 5)', en: 'Non-overt DIC' };
        desc = { zh: `總分為 ${score} 分。未達顯性 DIC 診斷閾值。提示可能為早期或非顯性 DIC。`, en: `Score is ${score} (< 5). Suggestive of non-overt or early-stage DIC.` };
        recommendation = { zh: '不需要常規大量補充凝血因子。建議在 1–2 天內重複追蹤評估與常規血液檢查。', en: 'Monitor and repeat the score in 24–48 hours.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'ISTH DIC = Platelets + Markers + PT + Fibrinogen (Score 0-8)',
    pearls: {
      zh: [
        '此診斷工具只在**已知具備 DIC 誘因**的重症/感染病患中有效，不可用於無相關病史之突發血小板低下患者。',
        '**輸血決策指標：** 纖維蛋白原 < 100 mg/dL 建議給予 Cryoprecipitate；PT/aPTT 顯著延長且有出血時給予 FFP。'
      ],
      en: [
        'ISTH DIC score is only valid if an underlying predisposing clinical cause (e.g. sepsis, trauma) is present.',
        'Monitor daily. Transfuse platelets if <10,000/µL (<50,000/µL with active bleeding), or cryoprecipitate if fibrinogen <100 mg/dL.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/173/isth-criteria-disseminated-intravascular-coagulation-dic'
  },
  {
    id: 'ldl-friedewald',
    name: { zh: 'LDL Friedewald 脂質計算公式', en: 'LDL Friedewald Equation' },
    subtitle: { zh: '從總膽固醇、HDL-C 與三酸甘油酯估算低密度脂蛋白', en: 'Estimated LDL Cholesterol' },
    category: 'endocrinology',
    inputs: [
      { id: 'total_chol', name: { zh: '總膽固醇 (Total Cholesterol)', en: 'Total Cholesterol' }, type: 'number', defaultValue: 200, unit: 'mg/dL', min: 0 },
      { id: 'hdl', name: { zh: '高密度脂蛋白 (HDL-C)', en: 'HDL Cholesterol' }, type: 'number', defaultValue: 50, unit: 'mg/dL', min: 0 },
      { id: 'tg', name: { zh: '三酸甘油酯 (Triglycerides)', en: 'Triglycerides' }, type: 'number', defaultValue: 150, unit: 'mg/dL', min: 0 }
    ],
    calculate: (values) => {
      const tc = Number(values.total_chol);
      const hdl = Number(values.hdl);
      const tg = Number(values.tg);

      if (!tc || !hdl || !tg) {
        return { error: 'Invalid inputs', description: { zh: '請輸入有效的脂質數值。', en: 'Please enter valid lipid values.' } };
      }

      // Formula: LDL = TC - HDL - TG / 5
      const value = tc - hdl - (tg / 5);

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string } = { zh: '', en: '' };

      if (tg > 400) {
        riskLevel = { zh: '不可靠 (Inaccurate, TG > 400)', en: 'Unreliable due to High Triglycerides' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `當三酸甘油酯 (TG) 大於 400 mg/dL 時，極低密度脂蛋白比值打破 1:5 的假設，Friedewald 公式會嚴重低估 LDL-C (當前算值為 ${value.toFixed(1)} mg/dL)。`, en: `Friedewald formula is unreliable when Triglycerides > 400 mg/dL. Calculated LDL: ${value.toFixed(1)} mg/dL.` };
        recommendation = { zh: '必須改抽血檢測「直接法低密度脂蛋白 (Direct LDL-C)」或使用 Martin-Hopkins 公式。', en: 'Order a Direct LDL-C test or use the Martin-Hopkins equation instead.' };
      } else {
        if (value >= 190) {
          riskLevel = { zh: '極高度升高 (Severe Elevation, ≥ 190)', en: 'Severe Elevation (≥ 190 mg/dL)' };
          riskColor = 'text-rose-450 bg-rose-950/40 border-rose-500/30';
        } else if (value >= 130) {
          riskLevel = { zh: '輕度至中度升高 (130–189)', en: 'Mild-to-Moderate Elevation' };
          riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        } else {
          riskLevel = { zh: '正常 / 目標值範圍 (< 130)', en: 'Desirable Range (< 130 mg/dL)' };
        }

        desc = { zh: `估算 LDL-C 濃度為 ${value.toFixed(1)} mg/dL。`, en: `Estimated LDL-C is ${value.toFixed(1)} mg/dL.` };
        
        if (value >= 190) {
          recommendation = { zh: '若無禁忌症，此類病患無論心血管風險高低，皆具備使用高強度 Statin 降脂藥物之適應症。', en: 'Indicated for high-intensity statin therapy regardless of cardiovascular risk score.' };
        }
      }

      return { value, unit: 'mg/dL', riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'LDL = Total\\ Cholesterol - HDL - \\frac{Triglycerides}{5}',
    pearls: {
      zh: [
        'Friedewald 公式僅適用於**空腹抽血**且三酸甘油酯 (TG) < 400 mg/dL 的狀態。',
        '當估算出來的 LDL-C 數值極低 (<70 mg/dL) 且 TG > 150 mg/dL 時，該公式也容易產生低估，此時亦建議直接抽血定量。'
      ],
      en: [
        'The formula assumes a constant 5:1 ratio between triglycerides and VLDL-C, which breaks down if TG > 400 mg/dL.',
        'Underestimates LDL-C at very low levels (<70 mg/dL). Consider Direct LDL measurement.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/166/friedewald-equation-for-ldl-cholesterol'
  },
  {
    id: 'burch-wartofsky',
    name: { zh: 'Burch-Wartofsky 甲狀腺風暴評分', en: 'Burch-Wartofsky Point Scale' },
    subtitle: { zh: '評估甲狀腺功能亢進患者發生甲狀腺風暴之可能性', en: 'Diagnosing Thyroid Storm Severity' },
    category: 'endocrinology',
    inputs: [
      {
        id: 'temp',
        name: { zh: '體溫 (Thermoregulatory Dysfunction / Temp)', en: 'Body Temperature' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '正常 (< 99.0°F / < 37.2°C) (0分)', en: 'Normal (< 99.0°F / < 37.2°C) (0 pt)' }, value: 0 },
          { label: { zh: '99.0–99.9°F (37.2–37.7°C) (+5分)', en: '99.0–99.9°F (37.2–37.7°C) (+5 pts)' }, value: 5 },
          { label: { zh: '100.0–100.9°F (37.8–38.2°C) (+10分)', en: '100.0–100.9°F (37.8–38.2°C) (+10 pts)' }, value: 10 },
          { label: { zh: '101.0–101.9°F (38.3–38.8°C) (+15分)', en: '101.0–101.9°F (38.3–38.8°C) (+15 pts)' }, value: 15 },
          { label: { zh: '102.0–102.9°F (38.9–39.4°C) (+20分)', en: '102.0–102.9°F (38.9–39.4°C) (+20 pts)' }, value: 20 },
          { label: { zh: '103.0–103.9°F (39.5–39.9°C) (+25分)', en: '103.0–103.9°F (39.5–39.9°C) (+25 pts)' }, value: 25 },
          { label: { zh: '≥ 104.0°F (≥ 40.0°C) (+30分)', en: '≥ 104.0°F (≥ 40.0°C) (+30 pts)' }, value: 30 }
        ]
      },
      {
        id: 'cns',
        name: { zh: '中樞神經系統症狀 (CNS Effects)', en: 'CNS Effects' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無症狀 (0分)', en: 'Absent (0 pt)' }, value: 0 },
          { label: { zh: '輕度 (焦慮、激動) (+10分)', en: 'Mild: agitation, anxiety (+10 pts)' }, value: 10 },
          { label: { zh: '中度 (精神錯亂、譫妄、極度嗜睡) (+20分)', en: 'Moderate: delirium, psychosis, stupor (+20 pts)' }, value: 20 },
          { label: { zh: '重度 (癲癇發作、昏迷) (+30分)', en: 'Severe: seizures, coma (+30 pts)' }, value: 30 }
        ]
      },
      {
        id: 'hr',
        name: { zh: '心跳速率 (Heart Rate / bpm)', en: 'Heart Rate' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '< 90 bpm (0分)', en: '< 90 bpm (0 pt)' }, value: 0 },
          { label: { zh: '90–109 bpm (+5分)', en: '90–109 bpm (+5 pts)' }, value: 5 },
          { label: { zh: '110–119 bpm (+10分)', en: '110–119 bpm (+10 pts)' }, value: 10 },
          { label: { zh: '120–129 bpm (+15分)', en: '120–129 bpm (+15 pts)' }, value: 15 },
          { label: { zh: '130–139 bpm (+20分)', en: '130–139 bpm (+20 pts)' }, value: 20 },
          { label: { zh: '≥ 140 bpm (+25分)', en: '≥ 140 bpm (+25 pts)' }, value: 25 }
        ]
      },
      { id: 'afib', name: { zh: '合併心房顫動 (Atrial Fibrillation) (+10分)', en: 'Atrial Fibrillation (+10 pts)' }, type: 'boolean', defaultValue: false },
      {
        id: 'chf',
        name: { zh: '鬱血性心衰竭症狀 (Heart Failure)', en: 'Heart Failure' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無症狀 (0分)', en: 'Absent (0 pt)' }, value: 0 },
          { label: { zh: '輕度 (下肢水腫) (+5分)', en: 'Mild: pedal edema (+5 pts)' }, value: 5 },
          { label: { zh: '中度 (肺底囉音/溼囉音) (+10分)', en: 'Moderate: bibasilar rales (+10 pts)' }, value: 10 },
          { label: { zh: '重度 (肺水腫) (+15分)', en: 'Severe: pulmonary edema (+15 pts)' }, value: 15 }
        ]
      },
      {
        id: 'gi_hepatic',
        name: { zh: '腸胃道與肝臟功能障礙', en: 'Gastrointestinal-Hepatic Dysfunction' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無症狀 (0分)', en: 'Absent (0 pt)' }, value: 0 },
          { label: { zh: '中度 (噁心、嘔吐、腹瀉、腹痛) (+10分)', en: 'Moderate: diarrhea, nausea, vomiting (+10 pts)' }, value: 10 },
          { label: { zh: '重度 (黃疸原因不明) (+20分)', en: 'Severe: unexplained jaundice (+20 pts)' }, value: 20 }
        ]
      },
      { id: 'precipitant', name: { zh: '具備已知誘發病史 (如感染、手術、停藥、創傷等) (+10分)', en: 'History of precipitating event (+10 pts)' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let score = Number(values.temp) + Number(values.cns) + Number(values.hr) + Number(values.chf) + Number(values.gi_hepatic);
      if (values.afib) score += 10;
      if (values.precipitant) score += 10;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score < 25) {
        riskLevel = { zh: '非甲狀腺風暴 (Score < 25)', en: 'Thyroid Storm Unlikely' };
        desc = { zh: `總分為 ${score} 分。臨床表徵不符合甲狀腺風暴，可能為普通甲狀腺機能亢進。`, en: `Score is ${score}. Thyroid storm unlikely.` };
        recommendation = { zh: '給予標準的抗甲狀腺藥物與症狀控制（如口服 beta-blocker）即可。', en: 'Standard thyrotoxicosis management.' };
      } else if (score <= 44) {
        riskLevel = { zh: '即將發生甲狀腺風暴 (Impending Storm, 25–44)', en: 'Impending Thyroid Storm' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `總分為 ${score} 分。高度提示正處於急性甲狀腺風暴前期，隨時有惡化風險。`, en: `Score is ${score}. Impending thyroid storm. Close observation required.` };
        recommendation = { zh: '強烈建議收治入院，密切監測，並考慮開始積極的症狀支持治療，排除可能之誘發原因。', en: 'Hospital admission and close monitoring. Consider initiating therapeutic measures.' };
      } else {
        riskLevel = { zh: '確診甲狀腺風暴 (Thyroid Storm, ≥ 45)', en: 'Thyroid Storm Highly Suggestive' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: `總分為 ${score} 分。高度懷疑甲狀腺風暴！此為高死亡率的內科急症。`, en: `Score is ${score}. Highly suggestive of Thyroid Storm. High mortality risk.` };
        recommendation = { zh: '強烈建議收治 ICU！應立即依序啟動雞尾酒多聯治療：1. Beta-blocker (Propranolol); 2. 高劑量 Thionamide (PTU 為首選); 3. 至少一小時後給予無機碘 (Lugol\'s solution); 4. 類固醇 (Hydrocortisone)。', en: 'ICU admission. Initiate immediate therapy in order: Propranolol, PTU, Inorganic Iodine (1hr later), Hydrocortisone.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'Burch-Wartofsky = Temp + CNS + HR + AFib + CHF + GI/Hepatic + Precipitant (0 - 140 pts)',
    pearls: {
      zh: [
        '**無機碘給藥時機極其重要：** 必須在給予 PTU 或抗甲狀腺藥物 **1 小時後** 才能給予 Lugol 氏液或碘劑，以防甲狀腺將新輸入的碘作為原料，假性加重甲狀腺素的合成。',
        '**PTU 優點：** 相較於 Methimazole，高劑量的 PTU 不僅能抑制腺體分泌，還能阻斷外周組織中 T₄ 向活性 T₃ 的轉化，因此在風暴期為首選。'
      ],
      en: [
        'A score ≥45 is highly suggestive of thyroid storm, warranting immediate intensive care intervention.',
        '**Order of Therapy:** Always administer thionamide (PTU) at least 1 hour BEFORE inorganic iodine to prevent organification of iodine (Wolff-Chaikoff effect).'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/3816/burch-wartofsky-point-scale-bwps-thyrotoxicosis'
  },
  {
    id: 'dka-hhs',
    name: { zh: 'DKA vs. HHS 診斷分型', en: 'DKA vs. HHS Diagnostic Criteria' },
    subtitle: { zh: '鑑別高血糖急症 DKA (糖尿病酮酸中毒) 與 HHS (高滲透壓狀態)', en: 'Differentiating Diabetic Ketoacidosis from Hyperosmolar Hyperglycemic State' },
    category: 'endocrinology',
    inputs: [
      { id: 'glucose', name: { zh: '血漿血糖值 (Plasma Glucose)', en: 'Plasma Glucose' }, type: 'number', defaultValue: 350, unit: 'mg/dL', min: 0 },
      { id: 'ph', name: { zh: '動脈血 pH 值 (Arterial pH)', en: 'Arterial pH' }, type: 'number', defaultValue: 7.15, unit: '', min: 6.0, max: 8.0, step: 0.01 },
      { id: 'hco3', name: { zh: '血清碳酸氫根 (Serum Bicarbonate)', en: 'Serum Bicarbonate (HCO₃)' }, type: 'number', defaultValue: 12.0, unit: 'mEq/L', min: 0 },
      {
        id: 'ketones',
        name: { zh: '尿酮 / 血酮 (Ketones)', en: 'Ketones (Urine or Serum)' },
        type: 'select',
        defaultValue: 'positive',
        options: [
          { label: { zh: '強陽性 (Positive)', en: 'Positive' }, value: 'positive' },
          { label: { zh: '微量或無 (Small / Absent)', en: 'Small or Absent' }, value: 'negative' }
        ]
      },
      { id: 'sodium', name: { zh: '實測血鈉 (用於計算有效滲透壓)', en: 'Measured Serum Sodium (Na)' }, type: 'number', defaultValue: 135, unit: 'mEq/L', min: 100 },
      { id: 'anion_gap', name: { zh: '陰離子間隙 (Anion Gap)', en: 'Anion Gap' }, type: 'number', defaultValue: 14, unit: 'mEq/L', min: 0 },
      {
        id: 'mental',
        name: { zh: '精神意識狀態 (Mental Status)', en: 'Mental Status' },
        type: 'select',
        defaultValue: 'alert',
        options: [
          { label: { zh: '清醒 (Alert)', en: 'Alert' }, value: 'alert' },
          { label: { zh: '嗜睡/輕度混亂 (Drowsy / Mild Confusion)', en: 'Drowsy / Mild Confusion' }, value: 'drowsy' },
          { label: { zh: '木僵/昏迷 (Stupor / Coma)', en: 'Stupor or Coma' }, value: 'coma' }
        ]
      }
    ],
    calculate: (values) => {
      const gl = Number(values.glucose);
      const ph = Number(values.ph);
      const hco3 = Number(values.hco3);
      const na = Number(values.sodium);
      const hasKetones = values.ketones === 'positive';
      const mental = values.mental;

      // Effective Osmolality = 2*Na + Glucose / 18
      const effOsm = (2 * na) + (gl / 18);

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-slate-400 bg-slate-900/40 border-glass-border';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      const isDKA = gl > 250 && ph < 7.30 && hco3 < 18 && hasKetones;
      const isHHS = gl > 600 && ph > 7.30 && hco3 > 18 && !hasKetones && effOsm > 320;

      if (isHHS) {
        riskLevel = { zh: '高滲透壓高血糖狀態 (HHS)', en: 'Hyperosmolar Hyperglycemic State (HHS)' };
        riskColor = 'text-rose-450 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `符合 HHS 診斷。血糖為 ${gl} mg/dL，有效滲透壓達 ${effOsm.toFixed(1)} mOsm/kg (>320)，意識狀態偏向昏迷。`, en: `Meets HHS criteria. Glucose: ${gl} mg/dL, Effective Osmolality: ${effOsm.toFixed(1)} mOsm/kg (>320).` };
        recommendation = { zh: '重度失水，治療首重補水（首個 24 小時常需補液 6–10L）；點滴胰島素使用速度可較 DKA 慢；需嚴密監測心功能與滲透壓下降速度。', en: 'Severe dehydration. Aggressive fluid resuscitation is paramount (6–10L in 24h).' };
      } else if (isDKA) {
        let severityZh = '輕度 (Mild)';
        let severityEn = 'Mild';
        if (ph < 7.00 || hco3 < 10 || mental === 'coma') {
          severityZh = '重度 (Severe)';
          severityEn = 'Severe';
          riskColor = 'text-rose-450 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        } else if (ph < 7.24 || hco3 < 15) {
          severityZh = '中度 (Moderate)';
          severityEn = 'Moderate';
          riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        }

        riskLevel = { zh: `${severityZh} 糖尿病酮酸中毒 (DKA)`, en: `${severityEn} DKA` };
        desc = { zh: `符合 DKA 診斷。血糖 ${gl} mg/dL，pH 值 ${ph}，Bicarbonate ${hco3} mEq/L，酮體呈陽性。`, en: `Meets DKA criteria. Glucose: ${gl} mg/dL, pH: ${ph}, Bicarbonate: ${hco3} mEq/L.` };
        recommendation = { zh: '補水、靜脈點滴胰島素 (0.1 U/kg/h)；**特別注意：若血鉀 < 3.3 mEq/L，應先補鉀，禁止給予胰島素**以免發生致命性低血鉀與心律不整。', en: 'Hydration and insulin drip. Important: Delay insulin if K < 3.3 mEq/L until corrected.' };
      } else {
        // Fallback or mixed/indeterminate
        riskLevel = { zh: '未達明確診斷 / 混合型', en: 'Indeterminate / Mixed Picture' };
        desc = { zh: `目前血糖為 ${gl} mg/dL，pH ${ph}，碳酸氫根 ${hco3}，有效滲透壓 ${effOsm.toFixed(1)} mOsm/kg。不符合標準的 DKA 或 HHS 閾值。`, en: `Glucose: ${gl}, pH: ${ph}, Osmolality: ${effOsm.toFixed(1)}. Mixed or subclinical presentation.` };
        recommendation = { zh: '需提防「正常血糖型 DKA (Euglycemic DKA)」，特別是正在服用 SGLT2 抑制劑之患者，即使血糖正常亦可能酮酸中毒。', en: 'Rule out euglycemic DKA, especially if the patient is taking SGLT2 inhibitors.' };
      }

      return { value: effOsm, unit: 'mOsm/kg', riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'Effective\\ Osmolality = 2 \\times Na + \\frac{Glucose}{18} \\quad DKA\\ requires\\ Acidosis\\ +\\ Ketosis',
    pearls: {
      zh: [
        '**正常血糖 DKA (Euglycemic DKA)：** 使用 SGLT2 抑制劑（如排糖藥）患者由於尿排糖增加，高血糖表現不顯著，但因體內絕對缺乏胰島素，仍可誘發重度 DKA，臨床極易漏診。',
        '**補鉀指引：** 1. K < 3.3 mEq/L：暫緩胰島素，先補鉀至 >3.3；2. K 3.3–5.2：點滴中加入鉀離子維持；3. K > 5.2：不需補鉀，但每 2 小時追蹤。'
      ],
      en: [
        '**Euglycemic DKA:** Seen with SGLT2 inhibitors (e.g. Empagliflozin). Patients present with mild hyperglycemia (glucose <250 mg/dL) but severe acidosis and ketosis.',
        '**Potassium rule:** Insulin shifts potassium intracellularly. If baseline K < 3.3 mEq/L, do NOT start insulin until K is corrected.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/10397/ada-diabetic-ketoacidosis-dka-diagnostic-criteria'
  },
  {
    id: 'centor-criteria',
    name: { zh: 'Centor 咽喉炎臨床預測評分', en: 'Centor Criteria for Strep Pharyngitis' },
    subtitle: { zh: '評估急性喉嚨痛患者為 A 群鏈球菌感染之機率', en: 'Pre-test Probability of Streptococcal Pharyngitis' },
    category: 'infectious_diseases',
    inputs: [
      { id: 'exudate', name: { zh: '扁桃腺有滲出物或腫脹 (+1分)', en: 'Tonsillar exudate or swelling (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'nodes', name: { zh: '頸部前淋巴結腫大且有壓痛 (+1分)', en: 'Tender anterior cervical adenopathy (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'fever', name: { zh: '發熱病史 (體溫 > 38°C / 100.4°F) (+1分)', en: 'Fever history (> 38°C or 100.4°F) (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'no_cough', name: { zh: '無咳嗽症狀 (Absence of Cough) (+1分)', en: 'Absence of cough (+1 pt)' }, type: 'boolean', defaultValue: false },
      {
        id: 'age',
        name: { zh: '患者年齡級距 (Modified McIsaac 修正)', en: 'Patient Age Group (McIsaac Modification)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '3–14 歲 (+1分)', en: '3–14 years (+1 pt)' }, value: 1 },
          { label: { zh: '15–44 歲 (0分)', en: '15–44 years (0 pt)' }, value: 0 },
          { label: { zh: '≥ 45 歲 (-1分)', en: '45 years or older (-1 pt)' }, value: -1 }
        ]
      }
    ],
    calculate: (values) => {
      let score = Number(values.age);
      if (values.exudate) score += 1;
      if (values.nodes) score += 1;
      if (values.fever) score += 1;
      if (values.no_cough) score += 1;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score <= 1) {
        riskLevel = { zh: '極低機率 (GAS Risk < 10%)', en: 'Low Probability' };
        desc = { zh: `修正後 Centor 評分為 ${score} 分。A 群鏈球菌 (GAS) 感染機率極低 (~5%)。常見病因為病毒性感染。`, en: `Modified Centor Score is ${score}. Low probability of Strep (~5%).` };
        recommendation = { zh: '建議給予對症支持治療與觀察。無需做快篩或開立抗生素。', en: 'No throat culture or antibiotics indicated. Supportive care.' };
      } else if (score <= 3) {
        riskLevel = { zh: '中等機率 (GAS Risk 11–35%)', en: 'Intermediate Probability' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `修正後 Centor 評分為 ${score} 分。A 群鏈球菌感染機率為中等 (約 11%–35%)。`, en: `Modified Centor Score is ${score}. Intermediate probability of Strep.` };
        recommendation = { zh: '建議安排喉頭急速抗原篩檢 (RADT) 或喉頭培養，呈陽性才開立抗生素治療。', en: 'Perform Rapid Antigen Detection Test (RADT) or culture. Treat only if positive.' };
      } else {
        riskLevel = { zh: '高機率 (GAS Risk > 50%)', en: 'High Probability' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `修正後 Centor 評分為 ${score} 分。A 群鏈球菌感染機率大於 50%。`, en: `Modified Centor Score is ${score}. High probability of Strep (>50%).` };
        recommendation = { zh: '應優先安排快篩或培養。若臨床高度懷疑或無法快篩，可考慮給予經驗性抗生素治療 (如 Penicillin V 或 Amoxicillin)。', en: 'RADT recommended. Empiric antibiotics may be considered if testing is unavailable.' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'Centor = Exudate + LymphNodes + Fever + NoCough + AgeModifier (Score -1 to 5)',
    pearls: {
      zh: [
        '治療咽喉炎 A 群鏈球菌的主要目的在於**預防急性風濕熱 (Acute Rheumatic Fever)**（必須在症狀出現 9 天內給藥），而對於預防急性腎絲球腎炎的療效並不顯著。',
        '若病患伴有流鼻水、聲音沙啞、結膜炎、口腔水泡或咳嗽等症狀，多提示為感冒病毒或腺病毒感染，非鏈球菌感染。'
      ],
      en: [
        'Antibiotic therapy for GAS pharyngitis is primarily indicated to prevent acute rheumatic fever.',
        'If viral symptoms (rhinorrhea, hoarseness, cough, conjunctivitis) are present, Strep pharyngitis is highly unlikely.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/104/centor-score-modified-mcisaac-strep-pharyngitis'
  },
  {
    id: 'duke-ie',
    name: { zh: 'Modified Duke 感染性心內膜炎診斷標準', en: 'Modified Duke Criteria for Infective Endocarditis' },
    subtitle: { zh: '診斷確定、可能或排除之感染性心內膜炎 (IE)', en: 'Modified Duke Criteria' },
    category: 'infectious_diseases',
    inputs: [
      { id: 'culture_major', name: { zh: '主要指標 1: 血液培養陽性 (典型菌種 2 套, 或持續陽性)', en: 'Major 1: Positive blood cultures for IE (typical pathogen in 2 bottles)' }, type: 'boolean', defaultValue: false },
      { id: 'echo_major', name: { zh: '主要指標 2: 心臟超音波證實心內膜受累 (贅生物/膿瘍/新瓣膜反流)', en: 'Major 2: Evidence of endocardial involvement (Vegetation/abscess/new regurgitation)' }, type: 'boolean', defaultValue: false },
      
      { id: 'predisposition', name: { zh: '次要指標 1: 易感因素 (心臟瓣膜病史/人工瓣膜/靜脈藥癮者)', en: 'Minor 1: Predisposition (heart condition or IV drug use)' }, type: 'boolean', defaultValue: false },
      { id: 'fever', name: { zh: '次要指標 2: 發熱 (體溫 ≥ 38.0°C / 100.4°F)', en: 'Minor 2: Fever (Temp ≥ 38.0°C / 100.4°F)' }, type: 'boolean', defaultValue: false },
      { id: 'vascular', name: { zh: '次要指標 3: 血管現象 (主要動脈栓塞/ Janeway 損害/結膜出血)', en: 'Minor 3: Vascular phenomena (emboli, Janeway lesions)' }, type: 'boolean', defaultValue: false },
      { id: 'immunological', name: { zh: '次要指標 4: 免疫現象 (腎絲球腎炎/ Osler 結節/ Roth 斑/ RF陽性)', en: 'Minor 4: Immunological phenomena (glomerulonephritis, Osler nodes)' }, type: 'boolean', defaultValue: false },
      { id: 'micro_minor', name: { zh: '次要指標 5: 微生物學證據 (血培陽性但未達主要指標標準)', en: 'Minor 5: Microbiological evidence (positive culture not meeting major)' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      const majorCount = (values.culture_major ? 1 : 0) + (values.echo_major ? 1 : 0);
      let minorCount = 0;
      if (values.predisposition) minorCount += 1;
      if (values.fever) minorCount += 1;
      if (values.vascular) minorCount += 1;
      if (values.immunological) minorCount += 1;
      if (values.micro_minor) minorCount += 1;

      const isDefinite = majorCount === 2 || (majorCount === 1 && minorCount >= 3) || minorCount === 5;
      const isPossible = (majorCount === 1 && minorCount >= 1) || minorCount === 3;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-slate-400 bg-slate-900/40 border-glass-border';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (isDefinite) {
        riskLevel = { zh: '確診心內膜炎 (Definite IE)', en: 'Definite Infective Endocarditis' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `符合 Modified Duke 確診標準。主要指標: ${majorCount} 項, 次要指標: ${minorCount} 項。`, en: `Meets Definite IE criteria. Majors: ${majorCount}, Minors: ${minorCount}.` };
        recommendation = { zh: '應住院開始為期 2–6 週的足量靜脈抗生素治療（依藥敏試驗決定），並密切追蹤心臟超音波，評估是否需要外科手術介入。', en: 'Inpatient admission for a 2–6 week course of bactericidal IV antibiotics.' };
      } else if (isPossible) {
        riskLevel = { zh: '可能心內膜炎 (Possible IE)', en: 'Possible Infective Endocarditis' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `符合 Modified Duke 可能心內膜炎標準。主要指標: ${majorCount} 項, 次要指標: ${minorCount} 項。`, en: `Meets Possible IE criteria. Majors: ${majorCount}, Minors: ${minorCount}.` };
        recommendation = { zh: '應高度警惕。強烈建議安排「經食道心臟超音波 (TEE)」以提高檢出率（TEE 敏感度 >90%，而 TTE 僅 ~60%）。', en: 'High clinical suspicion. Transesophageal echocardiogram (TEE) is strongly recommended.' };
      } else {
        riskLevel = { zh: '排除心內膜炎 (Rejected)', en: 'IE Rejected' };
        desc = { zh: '不符合 Definite 或 Possible 診斷標準。提示心內膜炎診斷已被排除，或存在更明確的替代診斷。', en: 'Does not meet criteria for possible IE.' };
        recommendation = { zh: '繼續尋找發熱或菌血症的其他病因。', en: 'Investigate alternative sources of bacteremia.' };
      }

      return {
        valueText: isDefinite ? 'Definite' : (isPossible ? 'Possible' : 'Rejected'),
        riskLevel,
        riskColor,
        description: desc,
        recommendation
      };
    },
    reference: 'Definite: 2 Major OR 1 Major + 3 Minor OR 5 Minor. Possible: 1 Major + 1 Minor OR 3 Minor.',
    pearls: {
      zh: [
        '**Janeway 損害 vs. Osler 結節：** Janeway lesions 屬於**無痛性**小皮疹，分布於手掌腳底，是栓塞引起的血管現象；Osler\'s nodes 屬於**有痛性**皮下結節，多在指尖，是免疫複合物沉積。',
        '**金黃色葡萄球菌菌血症 (SAB)：** 其心臟植入物感染率高。任何 SAB 患者若伴有人工瓣膜或血管內導管，皆應常規安排 TEE 排除心內膜炎。'
      ],
      en: [
        'Janeway lesions are painless erythematous macules (vascular); Osler nodes are painful nodular lesions on digits (immunological).',
        'Transesophageal Echocardiography (TEE) is highly sensitive (>90%) and preferred over TTE for prosthetic valves or device-associated bacteremia.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/808/modified-duke-criteria-infective-endocarditis'
  },
  {
    id: 'janssens-gout',
    name: { zh: 'Janssens 急性痛風診斷規則', en: 'Janssens Acute Gout Diagnosis Rule' },
    subtitle: { zh: '急性單關節炎患者免關節液穿刺之痛風診斷預測', en: 'Clinical Rule for Acute Gouty Arthritis' },
    category: 'rheumatology',
    inputs: [
      { id: 'male', name: { zh: '1. 患者生理性別為男性 (+2分)', en: 'Male sex (+2 pts)' }, type: 'boolean', defaultValue: false },
      { id: 'prev_attack', name: { zh: '2. 曾有過急性關節發炎史 (+2分)', en: 'Previous joint attack (+2 pts)' }, type: 'boolean', defaultValue: false },
      { id: 'rapid_onset', name: { zh: '3. 症狀在 24 小時內達到高峰 (+0.5分)', en: 'Rapid onset (max pain within 24 hours) (+0.5 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'redness', name: { zh: '4. 發炎關節表面有皮膚發紅現象 (+1分)', en: 'Joint redness (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'mtp', name: { zh: '5. 第一趾骨關節 (第一 MTP) 腫痛 (+2.5分)', en: '1st MTP joint involvement (+2.5 pts)' }, type: 'boolean', defaultValue: false },
      { id: 'cvd_htn', name: { zh: '6. 伴有高血壓或心血管疾病史 (+1.5分)', en: 'Hypertension or cardiovascular disease (+1.5 pts)' }, type: 'boolean', defaultValue: false },
      { id: 'uric_acid_gt', name: { zh: '7. 血尿酸值 > 5.88 mg/dL (350 µmol/L) (+3分)', en: 'Serum uric acid > 5.88 mg/dL (+3 pts)' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let score = 0;
      if (values.male) score += 2;
      if (values.prev_attack) score += 2;
      if (values.rapid_onset) score += 0.5;
      if (values.redness) score += 1;
      if (values.mtp) score += 2.5;
      if (values.cvd_htn) score += 1.5;
      if (values.uric_acid_gt) score += 3;

      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let recommendation: { zh: string; en: string };

      if (score <= 4.0) {
        riskLevel = { zh: '低臨床機率 (Gout Unlikely, ≤ 4.0)', en: 'Low Probability (≤ 4.0)' };
        desc = { zh: `總分為 ${score} 分。診斷痛風的機率極低。排除痛風的陰性預測值 (NPV) 大於 95%。`, en: `Score is ${score}. Low probability of gout (NPV > 95%).` };
        recommendation = { zh: '應積極尋找其他單關節炎原因，如假性痛風 (CPPD)、蜂窩組織炎或關節扭傷。', en: 'Evaluate for other causes like pseudogout (CPPD) or septic arthritis.' };
      } else if (score <= 7.5) {
        riskLevel = { zh: '中等臨床機率 (Intermediate, 4.5–7.5)', en: 'Intermediate Probability' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `總分為 ${score} 分。痛風診斷機率為灰色地帶，臨床表現不具特異性。`, en: `Score is ${score}. Indeterminate clinical probability.` };
        recommendation = { zh: '建議進行關節穿刺抽取關節液以尋找尿酸鈉結晶 (MSU)，或安排雙能 CT (DECT) / 關節超音波確診。', en: 'Arthrocentesis (joint aspiration) for MSU crystal check is recommended.' };
      } else {
        riskLevel = { zh: '高臨床機率 (Gout Highly Likely, ≥ 8.0)', en: 'High Probability (≥ 8.0)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `總分為 ${score} 分。痛風診斷機率高達 80%–92% 左右。`, en: `Score is ${score}. High probability of gout (PPV ~80%-92%).` };
        recommendation = { zh: '可安全地進行痛風經驗性口服治療（如 NSAIDs、Colchicine 或類固醇），暫無需進行侵入性關節穿刺。', en: 'Can treat empirically for acute gout flare (NSAIDs, Colchicine, or steroids).' };
      }

      return { score, riskLevel, riskColor, description: desc, recommendation };
    },
    reference: 'Janssens Score = Male(2) + PriorAttack(2) + Onset(0.5) + Redness(1) + 1stMTP(2.5) + CVD/HTN(1.5) + Urate>5.88(3)',
    pearls: {
      zh: [
        '此簡易預測規則專門用於臨床「急性單關節炎」床邊評估，旨在減少非必要的關節穿刺。',
        '**黃金診斷標準：** 痛風唯一的確診方式依然是**偏光顯微鏡下看到關節液中呈負性雙折光的針狀尿酸鈉 (MSU) 結晶**。',
        '痛風急性發作期，部分患者血尿酸值可能因發炎代償而顯示正常或偏低。'
      ],
      en: [
        'Janssens rule avoids unnecessary invasive joint aspirations in primary care settings.',
        'The gold standard for gout diagnosis remains polarized microscopy demonstrating needle-shaped negatively birefringent MSU crystals.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/3620/clinical-diagnosis-gout-without-joint-fluid-analysis'
  },
  ...nonInternalMedicineCalculators
];
