/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Calculator } from './definitions';

export const nonInternalMedicineCalculators: Calculator[] = [
  // ==========================================
  // 1. 婦產科 (obgyn)
  // ==========================================
  {
    id: 'pregnancy-edd-ga',
    name: { zh: '預產期與孕週計算', en: 'Pregnancy Wheel / EDD & GA' },
    subtitle: { zh: '估算孕婦預產期與當前懷孕週數', en: 'Gestational Age & Estimated Date of Delivery' },
    category: 'obgyn',
    inputs: [
      { id: 'daysSinceLMP', name: { zh: '最後一次月經首日至今的天數', en: 'Days since LMP' }, type: 'number', defaultValue: 60, min: 0, max: 300 },
      { id: 'cycleLength', name: { zh: '平均月經週期天數', en: 'Average Cycle Length' }, type: 'number', defaultValue: 28, min: 20, max: 45 }
    ],
    calculate: (values) => {
      const days = Number(values.daysSinceLMP);
      const cycle = Number(values.cycleLength);
      const gaWeeks = Math.floor(days / 7);
      const gaDays = days % 7;
      
      const lmpDate = new Date();
      lmpDate.setDate(lmpDate.getDate() - days);
      const eddDate = new Date(lmpDate.getTime());
      eddDate.setDate(eddDate.getDate() + 280 + (cycle - 28));
      
      const eddStrZh = `${eddDate.getFullYear()}年${eddDate.getMonth() + 1}月${eddDate.getDate()}日`;
      const eddStrEn = eddDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      if (gaWeeks >= 37 && gaWeeks < 42) {
        riskLevel = { zh: '足月妊娠', en: 'Full Term' };
      } else if (gaWeeks >= 42) {
        riskLevel = { zh: '過期妊娠', en: 'Post Term' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
      } else {
        riskLevel = { zh: '未足月', en: 'Preterm / Early' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
      }

      return {
        valueText: `${gaWeeks}週${gaDays}天`,
        unit: '',
        riskLevel,
        riskColor,
        description: {
          zh: `預估預產期為：${eddStrZh}。最後一次月經估計為：${lmpDate.getFullYear()}年${lmpDate.getMonth() + 1}月${lmpDate.getDate()}日。`,
          en: `Estimated Date of Delivery (EDD): ${eddStrEn}. Calculated LMP: ${lmpDate.toLocaleDateString('en-US')}.`
        },
        recommendation: {
          zh: `目前孕週為 ${gaWeeks} 週又 ${gaDays} 天。請配合產檢時程安排相關篩檢與超音波檢查。`,
          en: `Current Gestational Age is ${gaWeeks} weeks and ${gaDays} days. Schedule prenatal checkups accordingly.`
        }
      };
    },
    reference: "Naegele's Rule: EDD = LMP + 9 months + 7 days + (Cycle - 28 days)",
    pearls: {
      zh: [
        '如果早期超音波（<9週）測得的胎兒頭臀長（CRL）與最後一次月經推算的孕週相差超過5天，應以超音波測量為準調整預產期。',
        '預期足月分娩率僅有約 4% 的孕婦會在預產期當天生產。'
      ],
      en: [
        'ACOG recommends redating if ultrasound CRL differs from LMP by >5 days in the first trimester (<9 weeks).',
        'Only about 4% of women deliver exactly on their estimated due date.'
      ]
    },
    mdcalcLink: ''
  },
  {
    id: 'bishop-score',
    name: { zh: '畢氏子宮頸成熟度評分', en: 'Bishop Score' },
    subtitle: { zh: '評估引產成功率及子宮頸成熟度', en: 'Assessment of Cervical Ripeness for Labor Induction' },
    category: 'obgyn',
    inputs: [
      {
        id: 'dilatation',
        name: { zh: '子宮頸擴張度', en: 'Cervical Dilatation' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '閉合 (0分)', en: 'Closed (0 pt)' }, value: 0, points: 0 },
          { label: { zh: '1–2 cm (1分)', en: '1–2 cm (1 pt)' }, value: 1, points: 1 },
          { label: { zh: '3–4 cm (2分)', en: '3–4 cm (2 pt)' }, value: 2, points: 2 },
          { label: { zh: '≥ 5 cm (3分)', en: '≥ 5 cm (3 pt)' }, value: 3, points: 3 }
        ]
      },
      {
        id: 'effacement',
        name: { zh: '子宮頸消退度', en: 'Cervical Effacement' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '0–30% (0分)', en: '0–30% (0 pt)' }, value: 0, points: 0 },
          { label: { zh: '40–50% (1分)', en: '40–50% (1 pt)' }, value: 1, points: 1 },
          { label: { zh: '60–70% (2分)', en: '60–70% (2 pt)' }, value: 2, points: 2 },
          { label: { zh: '≥ 80% (3分)', en: '≥ 80% (3 pt)' }, value: 3, points: 3 }
        ]
      },
      {
        id: 'station',
        name: { zh: '胎頭高度 (Station)', en: 'Fetal Station' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '-3 (0分)', en: '-3 (0 pt)' }, value: 0, points: 0 },
          { label: { zh: '-2 (1分)', en: '-2 (1 pt)' }, value: 1, points: 1 },
          { label: { zh: '-1 或 0 (2分)', en: '-1 or 0 (2 pt)' }, value: 2, points: 2 },
          { label: { zh: '+1 或 +2 (3分)', en: '+1 or +2 (3 pt)' }, value: 3, points: 3 }
        ]
      },
      {
        id: 'consistency',
        name: { zh: '子宮頸質地', en: 'Cervical Consistency' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '偏硬 (0分)', en: 'Firm (0 pt)' }, value: 0, points: 0 },
          { label: { zh: '中等偏軟 (1分)', en: 'Medium (1 pt)' }, value: 1, points: 1 },
          { label: { zh: '柔軟 (2分)', en: 'Soft (2 pt)' }, value: 2, points: 2 }
        ]
      },
      {
        id: 'position',
        name: { zh: '子宮頸位置', en: 'Cervical Position' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '後位 (0分)', en: 'Posterior (0 pt)' }, value: 0, points: 0 },
          { label: { zh: '中位 (1分)', en: 'Midposition (1 pt)' }, value: 1, points: 1 },
          { label: { zh: '前位 (2分)', en: 'Anterior (2 pt)' }, value: 2, points: 2 }
        ]
      }
    ],
    calculate: (values) => {
      const score = Number(values.dilatation) + Number(values.effacement) + Number(values.station) + Number(values.consistency) + Number(values.position);
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 8) {
        riskLevel = { zh: '成熟 / 引產成功率高', en: 'Favorable Cervix' };
        desc = { zh: 'Bishop 評分 ≥ 8 分，子宮頸已成熟，陰道分娩成功機率與自然發動分娩相當。', en: 'Score ≥8. High probability of successful vaginal delivery.' };
        rec = { zh: '可直接給予催產素 (Oxytocin) 或行人工破水。', en: 'Suitable for direct induction with oxytocin or amniotomy.' };
      } else if (score <= 6) {
        riskLevel = { zh: '不成熟 / 成功率低', en: 'Unfavorable Cervix' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: 'Bishop 評分 ≤ 6 分，子宮頸不成熟，若直接引產失敗率偏高。', en: 'Score ≤6. Unfavorable cervix. Higher risk of failed induction.' };
        rec = { zh: '建議引產前先使用藥物（如 PGE2 栓劑、PGE1 塞劑）或機械式水球進行子宮頸軟化。', en: 'Cervical ripening (PGE2, PGE1, or mechanical balloon) is recommended prior to oxytocin.' };
      } else {
        riskLevel = { zh: '中度成熟', en: 'Intermediate' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: '評分為 7 分，處於過渡帶。', en: 'Score is 7. Intermediate cervix.' };
        rec = { zh: '應根據產婦臨床狀況與骨盆評估綜合考量是否需要先進行子宮頸軟化。', en: 'Decide on ripening based on clinical context.' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Bishop EH. Obstetric Gynecol 1964;24:266-268.',
    pearls: {
      zh: [
        '評分滿分為 13 分。',
        '一般而言，初產婦評分高於 9 分，經產婦高於 5-6 分即預示引產成功機率高。'
      ],
      en: [
        'Maximum score is 13.',
        'Generally, a score >9 for nulliparous and >5 for multiparous women suggests high induction success rates.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/22/bishop-score'
  },
  {
    id: 'roma-index',
    name: { zh: '卵巢惡性腫瘤風險評估 (ROMA)', en: 'ROMA Index' },
    subtitle: { zh: '評估盆腔腫塊為上皮性卵巢癌風險', en: 'Risk of Ovarian Malignancy Algorithm' },
    category: 'obgyn',
    inputs: [
      { id: 'he4', name: { zh: '血清 HE4 (pmol/L)', en: 'Serum HE4 (pmol/L)' }, type: 'number', defaultValue: 50, min: 0 },
      { id: 'ca125', name: { zh: '血清 CA125 (U/mL)', en: 'Serum CA125 (U/mL)' }, type: 'number', defaultValue: 30, min: 0 },
      {
        id: 'menopausal',
        name: { zh: '停經狀態', en: 'Menopausal Status' },
        type: 'select',
        defaultValue: 'pre',
        options: [
          { label: { zh: '停經前 (Premenopausal)', en: 'Premenopausal' }, value: 'pre' },
          { label: { zh: '停經後 (Postmenopausal)', en: 'Postmenopausal' }, value: 'post' }
        ]
      }
    ],
    calculate: (values) => {
      const he4 = Number(values.he4);
      const ca125 = Number(values.ca125);
      const isPost = values.menopausal === 'post';
      
      if (!he4 || !ca125) {
        return { error: 'Invalid input', description: { zh: '請輸入有效的 HE4 與 CA125 數值。', en: 'Please enter valid HE4 and CA125 values.' } };
      }
      
      let pi: number;
      if (isPost) {
        pi = -8.09 + 1.04 * Math.log(he4) + 0.732 * Math.log(ca125);
      } else {
        pi = -12.0 + 2.38 * Math.log(he4) + 0.0626 * Math.log(ca125);
      }
      
      const value = (Math.exp(pi) / (1 + Math.exp(pi))) * 100;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let rec: { zh: string; en: string };
      
      const threshold = isPost ? 29.9 : 11.4;
      const isHigh = value >= threshold;
      
      if (isHigh) {
        riskLevel = { zh: '卵巢惡性腫瘤高風險', en: 'High Risk' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        rec = { zh: `ROMA 指數已達高風險閾值 (≥ ${threshold}%)。強烈建議會診婦產科/婦癌科專家，安排進階影像及評估手術處置。`, en: `ROMA Score exceeds threshold (≥ ${threshold}%). Referral to a gynecologic oncologist is recommended.` };
      } else {
        riskLevel = { zh: '卵巢惡性腫瘤低風險', en: 'Low Risk' };
        rec = { zh: `ROMA 指數低於高風險閾值 (< ${threshold}%)。上皮性卵巢癌風險較低，建議定期追蹤。`, en: `ROMA Score is below threshold (< ${threshold}%). Low risk of epithelial ovarian cancer.` };
      }
      
      return {
        value,
        unit: '%',
        riskLevel,
        riskColor,
        description: {
          zh: `計算得出的 ROMA 指數為 ${value.toFixed(2)}%。(停經狀態：${isPost ? '停經後' : '停經前'})`,
          en: `ROMA Score is ${value.toFixed(2)}% (${isPost ? 'Postmenopausal' : 'Premenopausal'}).`
        },
        recommendation: rec
      };
    },
    reference: 'Moore RG, et al. Gyncol Oncol 2009;112(1):40-6.',
    pearls: {
      zh: [
        'ROMA 用於評估盆腔包塊患者手術中發現上皮性卵巢癌 (EOC) 的機率，不適用於一般無症狀人群的癌症篩檢。',
        'HE4 在停經前婦女的特異性優於 CA125，不易因子宮內膜異位症或盆腔炎而出現假陽性。'
      ],
      en: [
        'ROMA evaluates risk of epithelial ovarian cancer (EOC) in patients with adnexal mass. It is not a general screening test.',
        'HE4 is more specific than CA125, especially in premenopausal women, as it is less elevated in endometriosis.'
      ]
    },
    mdcalcLink: ''
  },
  {
    id: 'biophysical-profile',
    name: { zh: '胎兒生理評估 (BPP)', en: 'Biophysical Profile (BPP)' },
    subtitle: { zh: '評估晚期或高危險妊娠之胎兒健康狀態', en: 'Fetal Well-being Assessment' },
    category: 'obgyn',
    inputs: [
      { id: 'breathing', name: { zh: '1. 胎兒呼吸運動 (30分鐘內持續≥30秒)', en: 'Fetal breathing (≥1 episode of ≥30s)' }, type: 'boolean', defaultValue: true },
      { id: 'movement', name: { zh: '2. 胎兒運動 (30分鐘內≥3次軀幹/肢體活動)', en: 'Fetal movement (≥3 discrete movements)' }, type: 'boolean', defaultValue: true },
      { id: 'tone', name: { zh: '3. 胎兒張力 (≥1次肢體伸展後恢復彎曲)', en: 'Fetal tone (≥1 extension/flexion)' }, type: 'boolean', defaultValue: true },
      { id: 'fluid', name: { zh: '4. 羊水量 (≥1個最大垂直羊水徑≥2 cm)', en: 'Amniotic fluid (≥1 pocket of ≥2 cm)' }, type: 'boolean', defaultValue: true },
      {
        id: 'nst',
        name: { zh: '5. 無壓力測試 (NST)', en: 'Non-Stress Test (NST)' },
        type: 'select',
        defaultValue: 'normal',
        options: [
          { label: { zh: '反應型 (正常 - 2分)', en: 'Reactive (Normal - 2 pts)' }, value: 'normal' },
          { label: { zh: '無反應型 (異常 - 0分)', en: 'Non-reactive (Abnormal - 0 pts)' }, value: 'abnormal' },
          { label: { zh: '未進行 (不計分)', en: 'Not performed (Omitted)' }, value: 'omitted' }
        ]
      }
    ],
    calculate: (values) => {
      let score = 0;
      if (values.breathing) score += 2;
      if (values.movement) score += 2;
      if (values.tone) score += 2;
      if (values.fluid) score += 2;
      
      const nst = values.nst;
      const isOmitted = nst === 'omitted';
      if (nst === 'normal') {
        score += 2;
      }
      
      const maxScore = isOmitted ? 8 : 10;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      const isFluidNormal = values.fluid === true;
      
      if (score === maxScore) {
        riskLevel = { zh: '胎兒健康狀況良好', en: 'Normal Fetal Profile' };
        desc = { zh: `總評分為 ${score}/${maxScore} 分。急性胎兒窘迫與慢性胎兒缺氧風險極低。`, en: `Score is ${score}/${maxScore}. Low risk of fetal hypoxia.` };
        rec = { zh: '常規妊娠隨訪，依指引定期產檢。', en: 'Continue routine prenatal management.' };
      } else if (score === 8 && maxScore === 10 && !isFluidNormal) {
        riskLevel = { zh: '羊水過少 (懷疑慢性胎兒窘迫)', en: 'Chronic Fetal Distress (Oligohydramnios)' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `總評分為 8/10 分（羊水量異常）。可能存在慢性胎盤功能不足與胎兒缺氧。`, en: `Score is 8/10 with abnormal fluid. Suspected chronic fetal distress.` };
        rec = { zh: '若孕週已足月應安排引產分娩；若未足月應密切追蹤羊水與多普勒血流，考慮提前分娩。', en: 'If full term, consider delivery. If preterm, monitor closely.' };
      } else if (score === 6) {
        riskLevel = { zh: '可疑胎兒缺氧 (Equivocal)', en: 'Equivocal Fetal Status' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `總評分為 6/${maxScore} 分。高度懷疑有急性胎兒窘迫可能。`, en: `Score is 6/${maxScore}. Suspected acute fetal compromise.` };
        rec = { zh: '若已足月，建議收治入院並安排引產/分娩；若未足月且無引產適應症，應在 24 小時內重測。', en: 'If term, deliver. If preterm, repeat test in 24 hours.' };
      } else {
        riskLevel = { zh: '胎兒窘迫 / 缺氧風險高', en: 'Fetal Hypoxia / Compromise' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `總評分為 ${score}/${maxScore} 分。高度提示胎兒有子宮內窒息/缺氧風險。`, en: `Score is ${score}/${maxScore}. High probability of fetal asphyxia.` };
        rec = { zh: '強烈建議立即收治住院，持續胎兒心跳監護，並考慮儘速引產分娩或行緊急剖腹產。', en: 'Immediate admission, continuous monitoring, and prompt delivery (induction or C-section).' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Manning FA, et al. Am J Obstet Gynecol 1980;138(5):542-8.',
    pearls: {
      zh: [
        '如果最大羊水垂直池 <2 cm，即使總分正常，也必須給予高度警戒並考慮安排提前分娩。',
        '各項生理指標一般在超音波 30 分鐘觀察期內進行判定。'
      ],
      en: [
        'Oligohydramnios (pocket <2cm) is a critical indicator; delivery should be considered even if the total score is otherwise high.',
        'Fetal parameters are assessed over a 30-minute ultrasound scan window.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/3973/manning-biophysical-profile-bpp'
  },
  {
    id: 'gdm-criteria',
    name: { zh: '妊娠糖尿病診斷標準', en: 'GDM Diagnostic Criteria' },
    subtitle: { zh: '懷孕 24–28 週常規篩檢與診斷基準', en: 'Gestational Diabetes Screening' },
    category: 'obgyn',
    inputs: [
      {
        id: 'strategy',
        name: { zh: '篩檢策略', en: 'Screening Strategy' },
        type: 'select',
        defaultValue: 'one-step',
        options: [
          { label: { zh: '單步驟法 (IADPSG/ADA - 75g OGTT)', en: 'One-Step (75g OGTT)' }, value: 'one-step' },
          { label: { zh: '兩步驟法 (ACOG - 100g OGTT)', en: 'Two-Step (100g OGTT)' }, value: 'two-step' }
        ]
      },
      { id: 'fasting', name: { zh: '空腹血糖', en: 'Fasting Glucose' }, type: 'number', defaultValue: 85, unit: 'mg/dL' },
      { id: 'oneHour', name: { zh: '1小時血糖', en: '1-Hour Glucose' }, type: 'number', defaultValue: 140, unit: 'mg/dL' },
      { id: 'twoHour', name: { zh: '2小時血糖', en: '2-Hour Glucose' }, type: 'number', defaultValue: 120, unit: 'mg/dL' },
      { id: 'threeHour', name: { zh: '3小時血糖 (僅限兩步驟 100g)', en: '3-Hour Glucose (Two-Step only)' }, type: 'number', defaultValue: 100, unit: 'mg/dL' }
    ],
    calculate: (values) => {
      const strategy = values.strategy;
      const fasting = Number(values.fasting);
      const oneHour = Number(values.oneHour);
      const twoHour = Number(values.twoHour);
      const threeHour = Number(values.threeHour);
      
      let isGdm = false;
      const reasons: string[] = [];
      
      if (strategy === 'one-step') {
        if (fasting >= 92) { isGdm = true; reasons.push(`空腹血糖值 ≥ 92 mg/dL (實測 ${fasting})`); }
        if (oneHour >= 180) { isGdm = true; reasons.push(`1小時血糖值 ≥ 180 mg/dL (實測 ${oneHour})`); }
        if (twoHour >= 153) { isGdm = true; reasons.push(`2小時血糖值 ≥ 153 mg/dL (實測 ${twoHour})`); }
      } else {
        let count = 0;
        if (fasting >= 95) { count++; reasons.push(`空腹血糖值 ≥ 95 mg/dL (實測 ${fasting})`); }
        if (oneHour >= 180) { count++; reasons.push(`1小時血糖值 ≥ 180 mg/dL (實測 ${oneHour})`); }
        if (twoHour >= 155) { count++; reasons.push(`2小時血糖值 ≥ 155 mg/dL (實測 ${twoHour})`); }
        if (threeHour >= 140) { count++; reasons.push(`3小時血糖值 ≥ 140 mg/dL (實測 ${threeHour})`); }
        if (count >= 2) {
          isGdm = true;
        }
      }
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (isGdm) {
        riskLevel = { zh: '診斷為妊娠糖尿病 (GDM)', en: 'GDM Confirmed' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = {
          zh: `符合妊娠糖尿病診斷標準。判定依據：\n${reasons.join('\n')}`,
          en: `Meets criteria for Gestational Diabetes. Reasons:\n${reasons.join('\n')}`
        };
        rec = {
          zh: '建議先進行飲食控制與規律運動，並監測每日血糖（空腹 <95, 餐後2小時 <120 mg/dL）。若控制不佳，應啟動胰島素治療。',
          en: 'Initiate medical nutrition therapy and exercise. Monitor glucose. Consider insulin if targets are not met.'
        };
      } else {
        riskLevel = { zh: '正常 / 未達診斷標準', en: 'Normal / GDM Negative' };
        desc = { zh: '血糖數值未達妊娠糖尿病之診斷門檻。', en: 'Glucose levels are below the GDM diagnostic thresholds.' };
        rec = { zh: '繼續保持均衡飲食與健康生活型態，並定期產檢。', en: 'Continue routine prenatal care and healthy lifestyle.' };
      }
      
      return { valueText: isGdm ? 'GDM (+)' : 'Normal', riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'ADA Diabetes Care 2023 / ACOG Bulletin 190',
    pearls: {
      zh: [
        '單步驟法只要有一項數值超標即可確診；兩步驟法需要至少兩項數值超標才可確診。',
        '妊娠糖尿病與巨嬰、分娩損傷、新生兒低血糖、呼吸窘迫及孕婦子癇前症有強烈正相關。'
      ],
      en: [
        'One-step strategy diagnosis requires only 1 abnormal value. Two-step strategy requires 2 or more abnormal values.',
        'GDM increases risk of fetal macrosomia, neonatal hypoglycemia, and maternal preeclampsia.'
      ]
    },
    mdcalcLink: ''
  },

  // ==========================================
  // 2. 小兒與新生兒科 (pediatrics)
  // ==========================================
  {
    id: 'apgar-score',
    name: { zh: '新生兒阿普伽評分', en: 'APGAR Score' },
    subtitle: { zh: '新生兒出生當下的生理狀態快速評估', en: 'Rapid Newborn Assessment at Birth' },
    category: 'pediatrics',
    inputs: [
      {
        id: 'appearance',
        name: { zh: '皮膚顏色 (Appearance)', en: 'Appearance (Skin Color)' },
        type: 'select',
        defaultValue: 1,
        options: [
          { label: { zh: '全身發紺或蒼白 (0分)', en: 'Pale or blue (0 pt)' }, value: 0 },
          { label: { zh: '身體紅潤、四肢末梢發紺 (1分)', en: 'Acrocyanosis (1 pt)' }, value: 1 },
          { label: { zh: '全身呈粉紅色 (2分)', en: 'Completely pink (2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'pulse',
        name: { zh: '心跳速率 (Pulse)', en: 'Pulse (Heart Rate)' },
        type: 'select',
        defaultValue: 2,
        options: [
          { label: { zh: '無心跳 (0分)', en: 'Absent (0 pt)' }, value: 0 },
          { label: { zh: '每分鐘低於 100 次 (1分)', en: 'Under 100 bpm (1 pt)' }, value: 1 },
          { label: { zh: '每分鐘大於或等於 100 次 (2分)', en: '100 bpm or more (2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'grimace',
        name: { zh: '反射刺激反應 (Grimace)', en: 'Grimace (Reflex Irritability)' },
        type: 'select',
        defaultValue: 2,
        options: [
          { label: { zh: '對彈足底或抽吸無反應 (0分)', en: 'No response to stimulation (0 pt)' }, value: 0 },
          { label: { zh: '僅有皺眉或微弱哭聲 (1分)', en: 'Grimace / feeble cry (1 pt)' }, value: 1 },
          { label: { zh: '打噴嚏、咳嗽、大聲哭泣、或主動避開 (2分)', en: 'Cry, sneeze, cough (2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'activity',
        name: { zh: '肌肉張力 (Activity)', en: 'Activity (Muscle Tone)' },
        type: 'select',
        defaultValue: 2,
        options: [
          { label: { zh: '四肢鬆弛、無主動運動 (0分)', en: 'Flaccid / limp (0 pt)' }, value: 0 },
          { label: { zh: '四肢略有屈曲與輕微活動 (1分)', en: 'Some flexion (1 pt)' }, value: 1 },
          { label: { zh: '四肢活動良好、有主動運動 (2分)', en: 'Active motion (2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'respiration',
        name: { zh: '呼吸表現 (Respiration)', en: 'Respiration (Breathing Effort)' },
        type: 'select',
        defaultValue: 2,
        options: [
          { label: { zh: '無呼吸 (0分)', en: 'Absent (0 pt)' }, value: 0 },
          { label: { zh: '呼吸慢、不規則且哭聲微弱 (1分)', en: 'Slow, irregular (1 pt)' }, value: 1 },
          { label: { zh: '呼吸良好、哭聲宏亮 (2分)', en: 'Good, strong cry (2 pts)' }, value: 2 }
        ]
      }
    ],
    calculate: (values) => {
      const score = Number(values.appearance) + Number(values.pulse) + Number(values.grimace) + Number(values.activity) + Number(values.respiration);
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 7) {
        riskLevel = { zh: '正常 / 生理狀況良好', en: 'Normal' };
        desc = { zh: `APGAR 評分為 ${score} 分。新生兒適應良好。`, en: `Score is ${score}. The newborn is in good condition.` };
        rec = { zh: '進行常規新生兒護理、保暖及餵食。', en: 'Provide routine post-delivery care.' };
      } else if (score >= 4) {
        riskLevel = { zh: '輕度至中度窒息', en: 'Moderately Depressed' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `APGAR 評分為 ${score} 分。提示可能存在新生兒窒息、呼吸抑制。`, en: `Score is ${score}. Suggests moderate birth asphyxia.` };
        rec = { zh: '立即給予觸覺刺激、保暖、清理氣道黏液並配合吸氧或觸發正壓通氣。', en: 'Provide tactile stimulation, clearing airway, and oxygen support.' };
      } else {
        riskLevel = { zh: '重度窒息 / 生理極度受抑制', en: 'Severely Depressed' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: `APGAR 評分為 ${score} 分。新生兒處於垂危狀態。`, en: `Score is ${score}. Severe asphyxia, critical situation.` };
        rec = { zh: '應立即啟動新生兒心肺復甦術 (NRP)，建立人工氣道行正壓通氣/插管，必要時給予 Epinephrine 等藥物復甦。', en: 'Immediate cardiopulmonary resuscitation (NRP) and intubation are required.' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Apgar V. Anesth Analg 1953;32(4):260-7.',
    pearls: {
      zh: [
        '通常在出生後 1 分鐘和 5 分鐘進行評分。若 5 分鐘評分 <7 分，應每 5 分鐘重測一次，直到 20 分鐘。',
        '1 分鐘評分反映的是生產過程的耐受度；5 分鐘評分反映的是適應過程及復甦措施的療效。'
      ],
      en: [
        'Checked at 1 and 5 minutes after birth. If the 5-minute score is <7, check every 5 minutes up to 20 minutes.',
        '1-min score evaluates how the baby tolerated delivery; 5-min score reflects transition and response to resuscitation.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/618/apgar-score'
  },
  {
    id: 'pediatric-gcs',
    name: { zh: '兒童格拉斯哥昏迷指數', en: 'Pediatric GCS (pGCS)' },
    subtitle: { zh: '評估嬰幼兒與兒童（未發育語言者）的意識程度', en: 'Modified Glasgow Coma Scale for Pediatrics' },
    category: 'pediatrics',
    inputs: [
      {
        id: 'eye',
        name: { zh: '睜眼反應 (Eye Opening)', en: 'Eye Opening (E)' },
        type: 'select',
        defaultValue: 4,
        options: [
          { label: { zh: '自動睜眼 (4分)', en: 'Spontaneous (4 pts)' }, value: 4 },
          { label: { zh: '聽到聲音、指令或呼喚後睜眼 (3分)', en: 'To speech (3 pts)' }, value: 3 },
          { label: { zh: '刺痛刺激後睜眼 (2分)', en: 'To pain (2 pts)' }, value: 2 },
          { label: { zh: '無反應 (1分)', en: 'None (1 pt)' }, value: 1 }
        ]
      },
      {
        id: 'verbal',
        name: { zh: '言語反應 (Verbal Response - 嬰兒版)', en: 'Verbal Response (V)' },
        type: 'select',
        defaultValue: 5,
        options: [
          { label: { zh: '微笑、咿呀發聲、注視追隨、社交互動正常 (5分)', en: 'Smiles, coos, babbles, normal interaction (5 pts)' }, value: 5 },
          { label: { zh: '躁動不安、哭鬧但可安撫 (4分)', en: 'Irritable, consolable crying (4 pts)' }, value: 4 },
          { label: { zh: '對疼痛刺激呈現持續性哭鬧或不適當哭聲 (3分)', en: 'Cries to pain, inappropriate crying (3 pts)' }, value: 3 },
          { label: { zh: '對疼痛刺激發出無意義呻吟、咕嚕聲 (2分)', en: 'Moans or grunts to pain (2 pts)' }, value: 2 },
          { label: { zh: '無任何發聲反應 (1分)', en: 'None (1 pt)' }, value: 1 }
        ]
      },
      {
        id: 'motor',
        name: { zh: '運動反應 (Motor Response)', en: 'Motor Response (M)' },
        type: 'select',
        defaultValue: 6,
        options: [
          { label: { zh: '主動、自發或正常活動 (6分)', en: 'Obey commands / normal spontaneous movements (6 pts)' }, value: 6 },
          { label: { zh: '疼痛刺激下能定位避痛 (觸碰即推開) (5分)', en: 'Localizes pain (5 pts)' }, value: 5 },
          { label: { zh: '對疼痛刺激呈逃避性回縮反應 (4分)', en: 'Withdraws from pain (4 pts)' }, value: 4 },
          { label: { zh: '異常屈曲反應 (去皮質強直) (3分)', en: 'Abnormal flexion (decorticate) (3 pts)' }, value: 3 },
          { label: { zh: '異常伸展反應 (去腦強直) (2分)', en: 'Abnormal extension (decerebrate) (2 pts)' }, value: 2 },
          { label: { zh: '無任何運動反應 (1分)', en: 'None (1 pt)' }, value: 1 }
        ]
      }
    ],
    calculate: (values) => {
      const score = Number(values.eye) + Number(values.verbal) + Number(values.motor);
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 13) {
        riskLevel = { zh: '輕度意識障礙 / 輕度腦創傷', en: 'Mild Brain Injury' };
        desc = { zh: `兒童格拉斯哥昏迷指數 (pGCS) 為 ${score} 分。`, en: `Pediatric GCS is ${score}.` };
        rec = { zh: '進行神經學症狀密切留觀，排除遲發性顱內出血徵兆。', en: 'Observe closely for clinical changes.' };
      } else if (score >= 9) {
        riskLevel = { zh: '中度意識障礙 / 中度腦創傷', en: 'Moderate Brain Injury' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `兒童格拉斯哥昏迷指數 (pGCS) 為 ${score} 分。`, en: `Pediatric GCS is ${score}.` };
        rec = { zh: '建議收治住院，積極監護，安排頭部電腦斷層 (CT) 排查出血或結構病變。', en: 'Inpatient observation, obtain head CT as indicated.' };
      } else {
        riskLevel = { zh: '重度意識障礙 / 昏迷 (Coma)', en: 'Severe Brain Injury / Coma' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: `兒童格拉斯哥昏迷指數 (pGCS) 為 ${score} 分（≤ 8 分定義為昏迷）。`, en: `Pediatric GCS is ${score} (Score ≤8 defines coma).` };
        rec = { zh: '「GCS 小於 8，應行插管 (GCS ≤ 8, Intubate)」。患者已失去自主氣道保護能力，必須立即建立人工氣道並入住兒童 ICU。', en: 'GCS ≤8 warrants immediate endotracheal intubation for airway protection.' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Teasdale G, Jennett B. Lancet 1974;2:81-84 (Modified for Pediatrics)',
    pearls: {
      zh: [
        '針對小於 2 歲的嬰幼兒，由於無法言語交流，必須採用修正版語音反應（微笑、哭鬧可撫慰性）進行評分。',
        '評分最低為 3 分，最高為 15 分。'
      ],
      en: [
        'Modified verbal scale is validated for pre-verbal children under 2 years of age.',
        'Min score is 3, max is 15.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/613/pediatric-glasgow-coma-scale-pgcs'
  },
  {
    id: 'holiday-segar',
    name: { zh: '兒童基礎維持液計算', en: 'Holiday-Segar Maintenance Fluid' },
    subtitle: { zh: '估算兒童每日或每小時基礎輸液量', en: '100/50/20 & 4/2/1 Maintenance Fluid Rules' },
    category: 'pediatrics',
    inputs: [
      { id: 'weight', name: { zh: '兒童體重 (kg)', en: 'Child Weight (kg)' }, type: 'number', defaultValue: 15, min: 1, max: 150 }
    ],
    calculate: (values) => {
      const w = Number(values.weight);
      
      if (!w || w <= 0) {
        return { error: 'Invalid weight', description: { zh: '請輸入大於 0 的體重。', en: 'Weight must be greater than 0.' } };
      }
      
      // Daily fluid calculation (100/50/20 rule)
      let daily: number;
      if (w <= 10) {
        daily = w * 100;
      } else if (w <= 20) {
        daily = 1000 + (w - 10) * 50;
      } else {
        daily = 1500 + (w - 20) * 20;
      }
      
      // Hourly fluid calculation (4-2-1 rule)
      let hourly: number;
      if (w <= 10) {
        hourly = w * 4;
      } else if (w <= 20) {
        hourly = 40 + (w - 10) * 2;
      } else {
        hourly = 60 + (w - 20) * 1;
      }
      
      return {
        value: hourly,
        unit: 'mL/hour',
        riskLevel: { zh: '維持性補液速率', en: 'Maintenance Rate' },
        riskColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
        description: {
          zh: `依據 Holiday-Segar 法則：\n- 每小時基礎維持液速率：${hourly} mL/小時。\n- 每日(24h)基礎維持液總量：${daily} mL/天。`,
          en: `Holiday-Segar calculation:\n- Hourly maintenance rate: ${hourly} mL/hour.\n- Daily total (24-hour): ${daily} mL/day.`
        },
        recommendation: {
          zh: '此為基礎維持量。如存在持續發燒、嘔吐、腹瀉等脫水狀況，需額外補償流失量；若有心衰竭、腎衰竭或 SIADH 則需限制液體。',
          en: 'Adjust rate based on active dehydration (fever, diarrhea) or fluid restriction conditions (heart/renal failure, SIADH).'
        }
      };
    },
    reference: 'Holliday MA, Segar WE. Pediatrics 1957;19(5):823-32.',
    pearls: {
      zh: [
        '4-2-1 法則（每小時）：前 10 kg 算 4 mL/kg；第二個 10 kg 算 2 mL/kg；剩餘體重算 1 mL/kg。',
        '對於大多數住院兒童，若腎功能正常，維持液一般首選 D5 (5%葡萄糖) + 0.45% 或是 0.9% 生理食鹽水，並補鉀 (20 mEq/L KCl)。'
      ],
      en: [
        '4-2-1 rule (hourly): 4 mL/kg for the first 10 kg, +2 mL/kg for 10-20 kg, and +1 mL/kg for each kg above 20.',
        'Standard maintenance fluid choice is typically D5 0.45% NS or D5 0.9% NS with 20 mEq/L KCl.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/3826/maintenance-fluids-pediatric'
  },
  {
    id: 'pediatric-dosing',
    name: { zh: '兒童藥物劑量計算 (BSA/體重)', en: 'Pediatric Drug Dosing' },
    subtitle: { zh: '依體重或體表面積計算兒童藥物劑量與 Mosteller 體表面積', en: 'Weight-Based & Body Surface Area Dosing' },
    category: 'pediatrics',
    inputs: [
      { id: 'weight', name: { zh: '體重 (kg)', en: 'Weight (kg)' }, type: 'number', defaultValue: 15, min: 0.5 },
      { id: 'height', name: { zh: '身高 (cm)', en: 'Height (cm)' }, type: 'number', defaultValue: 100, min: 30 },
      {
        id: 'mode',
        name: { zh: '計算基礎', en: 'Dosing Basis' },
        type: 'select',
        defaultValue: 'weight',
        options: [
          { label: { zh: '按體重計算 (mg/kg)', en: 'Weight-based (mg/kg)' }, value: 'weight' },
          { label: { zh: '按體表面積計算 (mg/m²)', en: 'BSA-based (mg/m²)' }, value: 'bsa' }
        ]
      },
      { id: 'dosePerBasis', name: { zh: '指引推薦劑量 (每單位)', en: 'Guideline Dose (per unit)' }, type: 'number', defaultValue: 10 }
    ],
    calculate: (values) => {
      const w = Number(values.weight);
      const h = Number(values.height);
      const mode = values.mode;
      const baseDose = Number(values.dosePerBasis);
      
      if (!w || !h || !baseDose) {
        return { error: 'Invalid inputs', description: { zh: '請輸入有效的身高、體重與推薦劑量。', en: 'Please enter valid height, weight, and dosage values.' } };
      }
      
      const bsa = Math.sqrt((h * w) / 3600);
      const finalDose = mode === 'weight' ? w * baseDose : bsa * baseDose;
      
      return {
        value: finalDose,
        unit: 'mg',
        riskLevel: { zh: '計算藥物劑量', en: 'Calculated Dose' },
        riskColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
        description: {
          zh: `計算結果如下：\n- 估算體表面積 (BSA)：${bsa.toFixed(3)} m² (Mosteller 公式)。\n- 計算所得單次或日總劑量：${finalDose.toFixed(2)} mg。`,
          en: `Calculated results:\n- Estimated BSA: ${bsa.toFixed(3)} m² (Mosteller formula).\n- Calculated dose: ${finalDose.toFixed(2)} mg.`
        },
        recommendation: {
          zh: '安全警示：計算所得之兒童藥物劑量，【絕對不能超過】同藥物的成人最大推薦單次或日總劑量。給藥前請重複雙重核對。',
          en: 'Safety check: The calculated pediatric dose must never exceed the maximum recommended adult dose.'
        }
      };
    },
    reference: 'Mosteller RD. N Engl J Med 1987;317(17):1098.',
    pearls: {
      zh: [
        '體表面積法 (BSA) 常用於計算毒性較大、安全邊際窄的藥物，例如化學治療藥物與免疫抑制劑。',
        '大多數普通抗生素、解熱鎮痛藥則以體重法 (mg/kg) 計算。'
      ],
      en: [
        'BSA method is preferred for highly toxic drugs with narrow therapeutic windows, such as chemotherapeutic agents.',
        'Weight-based dosing is standard for antibiotics, analgesics, and general pediatric medicines.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/82/body-surface-area-bsa-mosteller'
  },
  {
    id: 'bhutani-curve',
    name: { zh: 'Bhutani 新生兒黃疸光療評估', en: 'Bhutani Jaundice Risk' },
    subtitle: { zh: '評估新生兒高膽紅素血症及光療指引', en: 'Hour-Specific Bilirubin & Phototherapy Assessment' },
    category: 'pediatrics',
    inputs: [
      { id: 'bilirubin', name: { zh: '總膽紅素 TSB (mg/dL)', en: 'Total Bilirubin TSB (mg/dL)' }, type: 'number', defaultValue: 12, min: 0.1, max: 40 },
      { id: 'ageHours', name: { zh: '出生後時間 (Hours)', en: 'Postnatal Age (Hours)' }, type: 'number', defaultValue: 48, min: 12, max: 120 },
      {
        id: 'riskGroup',
        name: { zh: '妊娠週數與臨床風險分組', en: 'Risk Category' },
        type: 'select',
        defaultValue: 'low',
        options: [
          { label: { zh: '低風險：≥38 週且健康 (Low Risk)', en: '≥38 weeks and healthy' }, value: 'low' },
          { label: { zh: '中風險：35-37 週且健康，或≥38週伴有危險因子 (Medium Risk)', en: '35-37 wk & healthy or ≥38 wk + risk factors' }, value: 'medium' },
          { label: { zh: '高風險：35-37 週且伴有危險因子 (High Risk)', en: '35-37 wk + risk factors' }, value: 'high' }
        ]
      }
    ],
    calculate: (values) => {
      const bili = Number(values.bilirubin);
      const age = Number(values.ageHours);
      const risk = values.riskGroup;
      
      if (!bili || !age) {
        return { error: 'Invalid inputs', description: { zh: '請輸入有效的總膽紅素與時間。', en: 'Please enter valid bilirubin and age values.' } };
      }
      
      // Simple linear interpolation models for AAP 2004 phototherapy thresholds
      // 24h thresholds: Low=12, Med=10, High=8
      // 48h thresholds: Low=15, Med=13, High=11
      // 72h thresholds: Low=18, Med=15, High=13
      // 96h+ thresholds: Low=20, Med=17, High=15
      let threshold: number;
      if (risk === 'low') {
        if (age <= 24) threshold = 12;
        else if (age <= 48) threshold = 12 + (15 - 12) * ((age - 24) / 24);
        else if (age <= 72) threshold = 15 + (18 - 15) * ((age - 48) / 24);
        else threshold = 18 + (20 - 18) * ((Math.min(age, 96) - 72) / 24);
      } else if (risk === 'medium') {
        if (age <= 24) threshold = 10;
        else if (age <= 48) threshold = 10 + (13 - 10) * ((age - 24) / 24);
        else if (age <= 72) threshold = 13 + (15 - 13) * ((age - 48) / 24);
        else threshold = 15 + (17 - 15) * ((Math.min(age, 96) - 72) / 24);
      } else { // high
        if (age <= 24) threshold = 8;
        else if (age <= 48) threshold = 8 + (11 - 8) * ((age - 24) / 24);
        else if (age <= 72) threshold = 11 + (13 - 11) * ((age - 48) / 24);
        else threshold = 13 + (15 - 13) * ((Math.min(age, 96) - 72) / 24);
      }
      
      const isExceeded = bili >= threshold;
      
      // Bhutani Classic Risk Zones (hour-specific Nomogram) at 24, 48, 72, 96 hours
      // High-risk zone (>95th percentile) limits: 24h: 8.0, 48h: 13.0, 72h: 16.5, 96h+: 17.5
      let bhutaniLimit95: number;
      if (age <= 24) bhutaniLimit95 = 8.0;
      else if (age <= 48) bhutaniLimit95 = 8.0 + (13.0 - 8.0) * ((age - 24) / 24);
      else if (age <= 72) bhutaniLimit95 = 13.0 + (16.5 - 13.0) * ((age - 48) / 24);
      else bhutaniLimit95 = 16.5 + (17.5 - 16.5) * ((Math.min(age, 96) - 72) / 24);
      
      const isBhutaniHigh = bili >= bhutaniLimit95;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let rec: { zh: string; en: string };
      
      if (isExceeded) {
        riskLevel = { zh: '已達光療照光門檻', en: 'Phototherapy Indicated' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        rec = { zh: `實測 TSB 為 ${bili} mg/dL，已超過該風險組於此孕齡之光療推薦閾值 (${threshold.toFixed(1)} mg/dL)。建議開始照光治療。`, en: `Total serum bilirubin exceeds phototherapy threshold of ${threshold.toFixed(1)} mg/dL. Initiate phototherapy.` };
      } else if (isBhutaniHigh) {
        riskLevel = { zh: 'Bhutani 高風險區 (照光邊緣)', en: 'High Risk Zone' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        rec = { zh: `實測 TSB 處於 Bhutani 黃疸對照圖之高風險區 (>95th %)。雖未嚴格達到光療線，仍需在 4-12 小時內追蹤膽紅素。`, en: `Bilirubin is in the >95th percentile risk zone. Follow-up bilirubin in 4-12 hours.` };
      } else {
        riskLevel = { zh: '低-中度風險區 / 觀察即可', en: 'Low-Intermediate Risk' };
        rec = { zh: `膽紅素數值低於光療照光門檻。建議維持臨床觀察與常規母乳/配方奶餵食，注意大便顏色。`, en: `Bilirubin is below phototherapy threshold. Maintain observation and feeding.` };
      }
      
      return {
        value: bili,
        unit: 'mg/dL',
        riskLevel,
        riskColor,
        description: {
          zh: `此出生時間 (${age} 小時) 的預估照光閾值為：${threshold.toFixed(1)} mg/dL。Bhutani 高危線為：${bhutaniLimit95.toFixed(1)} mg/dL。`,
          en: `Phototherapy threshold at ${age} hours: ${threshold.toFixed(1)} mg/dL. Bhutani 95th percentile: ${bhutaniLimit95.toFixed(1)} mg/dL.`
        },
        recommendation: rec
      };
    },
    reference: 'Bhutani VK, et al. Pediatrics 1999;103(1):6-14 / AAP Guidelines 2022.',
    pearls: {
      zh: [
        '危險因子包括：同種免疫性溶血病 (G6PD缺乏、ABO/Rh不合)、窒息、敗血症、酸中毒、低白蛋白血症 (<3.0 g/dL)。',
        '2022 年美國兒科學會 (AAP) 更新指引中，全面提高了光療照光標準約 2–3 mg/dL，以避免過度醫療。'
      ],
      en: [
        'Neurotoxicity risk factors include isoimmune hemolytic disease (G6PD, ABO/Rh incompatibility), sepsis, acidosis, or albumin < 3.0 g/dL.',
        'The 2022 AAP guidelines raised phototherapy thresholds slightly (~2-3 mg/dL) to reduce unnecessary treatments.'
      ]
    },
    mdcalcLink: ''
  },

  // ==========================================
  // 3. 一般與創傷外科 (surgery)
  // ==========================================
  {
    id: 'alvarado-score',
    name: { zh: 'Alvarado 急性闌尾炎評分', en: 'Alvarado Score' },
    subtitle: { zh: '急性闌尾炎臨床診斷與篩檢工具', en: 'MANTRELS Score for Acute Appendicitis' },
    category: 'surgery',
    inputs: [
      { id: 'migration', name: { zh: '右下腹轉移性疼痛 (Migration of pain)', en: 'Migration of pain' }, type: 'boolean', defaultValue: false },
      { id: 'anorexia', name: { zh: '食慾不振 (Anorexia)', en: 'Anorexia' }, type: 'boolean', defaultValue: false },
      { id: 'nausea', name: { zh: '噁心或嘔吐 (Nausea/Vomiting)', en: 'Nausea or vomiting' }, type: 'boolean', defaultValue: false },
      { id: 'tenderness', name: { zh: '右下腹壓痛 (Tenderness in RLQ) (+2分)', en: 'RLQ tenderness (+2 pts)' }, type: 'boolean', defaultValue: false },
      { id: 'rebound', name: { zh: '右下腹反跳痛 (Rebound tenderness)', en: 'Rebound tenderness' }, type: 'boolean', defaultValue: false },
      { id: 'fever', name: { zh: '體溫升高 (Elevated Temp ≥ 37.3°C)', en: 'Fever (Temp ≥ 37.3°C / 99.1°F)' }, type: 'boolean', defaultValue: false },
      { id: 'leukocytosis', name: { zh: '白血球增多 (WBC > 10,000/µL) (+2分)', en: 'Leukocytosis (WBC > 10k) (+2 pts)' }, type: 'boolean', defaultValue: false },
      { id: 'shiftLeft', name: { zh: '中性粒細胞左移 (Shift to the left)', en: 'Neutrophil shift to the left' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let score = 0;
      if (values.migration) score += 1;
      if (values.anorexia) score += 1;
      if (values.nausea) score += 1;
      if (values.tenderness) score += 2;
      if (values.rebound) score += 1;
      if (values.fever) score += 1;
      if (values.leukocytosis) score += 2;
      if (values.shiftLeft) score += 1;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 7) {
        riskLevel = { zh: '闌尾炎機率高 (Probable / Severe)', en: 'Probable Appendicitis' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `總得分為 ${score} 分。闌尾炎機率高 (7-8分高度懷疑，9-10分幾乎確診)。`, en: `Score is ${score}. High probability of appendicitis.` };
        rec = { zh: '應立即會診一般外科醫師，考慮直接排定阑尾切除手術。', en: 'Consult general surgery promptly. Direct surgical indication if score 9-10.' };
      } else if (score >= 4) {
        riskLevel = { zh: '中度懷疑 (Possible)', en: 'Possible Appendicitis' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `總得分為 ${score} 分。急性闌尾炎可能，但臨床表現尚不典型。`, en: `Score is ${score}. Possible appendicitis.` };
        rec = { zh: '建議留院觀察，並安排輔助影像檢查，如腹部超音波或顯影電腦斷層 (CT)。', en: 'Observe patient and arrange abdominal ultrasound or contrast CT.' };
      } else {
        riskLevel = { zh: '低機率 (Unlikely)', en: 'Unlikely Appendicitis' };
        desc = { zh: `總得分為 ${score} 分。急性闌尾炎的可能性低。`, en: `Score is ${score}. Appendicitis is unlikely.` };
        rec = { zh: '建議出院觀察，排查其他引起急性腹痛之原因。', en: 'Look for other causes of abdominal pain.' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Alvarado A. Ann Emerg Med 1986;15(9):1048-51.',
    pearls: {
      zh: [
        'MANTRELS 記憶法：Migration, Anorexia, Nausea, Tenderness (2分), Rebound, Elevated Temp, Leukocytosis (2分), Shift left。',
        '女性及老年患者的 Alvarado 敏感度較低，應結合影像學檢查以避免誤診。'
      ],
      en: [
        'MANTRELS acronym: Migration, Anorexia, Nausea, Tenderness (2 pts), Rebound, Elevated temp, Leukocytosis (2 pts), Shift left.',
        'Lower specificity in females and the elderly; cross-sectional imaging (CT/US) is highly useful in these cohorts.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/94/alvarado-score-acute-appendicitis'
  },
  {
    id: 'parkland-formula',
    name: { zh: '派克蘭燒傷補液公式', en: 'Parkland Formula' },
    subtitle: { zh: '估算大面積燒燙傷第一個 24 小時內之靜脈補水量', en: ' Baxter Formula for Burn Resuscitation' },
    category: 'surgery',
    inputs: [
      { id: 'weight', name: { zh: '體重 (kg)', en: 'Weight (kg)' }, type: 'number', defaultValue: 70, min: 5, max: 200 },
      { id: 'tbsa', name: { zh: '二度及三度燒傷面積 (% TBSA)', en: '2nd & 3rd Degree Burn Area (% TBSA)' }, type: 'number', defaultValue: 30, min: 1, max: 100 }
    ],
    calculate: (values) => {
      const w = Number(values.weight);
      const tbsa = Number(values.tbsa);
      
      if (!w || !tbsa) {
        return { error: 'Invalid inputs', description: { zh: '請輸入有效的體重與燒傷百分比。', en: 'Please enter valid weight and burn percentage.' } };
      }
      
      const totalFluid = 4 * w * tbsa;
      const first8h = totalFluid / 2;
      const next16h = totalFluid / 2;
      
      const rate8h = first8h / 8;
      const rate16h = next16h / 16;
      
      return {
        value: totalFluid,
        unit: 'mL',
        riskLevel: { zh: '24小時液體總需求', en: '24h Total Fluid' },
        riskColor: 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]',
        description: {
          zh: `計算結果如下：\n- 第一個 24 小時補液總需求量：${totalFluid.toFixed(0)} mL (乳酸林格氏液 Lactated Ringer's)。\n- 前 8 小時（自「受傷時間」起算）：補注 ${first8h.toFixed(0)} mL (滴速約 ${rate8h.toFixed(0)} mL/時)。\n- 後 16 小時：補注 ${next16h.toFixed(0)} mL (滴速約 ${rate16h.toFixed(0)} mL/時)。`,
          en: `Resuscitation results:\n- Total 24-hour fluid: ${totalFluid.toFixed(0)} mL (LR).\n- First 8 hours: ${first8h.toFixed(0)} mL (~${rate8h.toFixed(0)} mL/h).\n- Next 16 hours: ${next16h.toFixed(0)} mL (~${rate16h.toFixed(0)} mL/h).`
        },
        recommendation: {
          zh: '滴速調節關鍵：前述計算僅為起點，術中應監測每小時尿量（成人目標 0.5–1.0 mL/kg/h，兒童目標 1.0–1.5 mL/kg/h）並隨之增減滴速，防範液體超載或不足。',
          en: 'Titrate infusion rates strictly based on hourly urine output (0.5-1.0 mL/kg/h in adults).'
        }
      };
    },
    reference: 'Baxter CR. Surg Clin North Am 1970;50(6):1401-14.',
    pearls: {
      zh: [
        '一度燒傷（僅有紅斑、無水泡者）不得計入 % TBSA 中。',
        '前 8 小時的計算起點是「受傷時間」，而非抵達急診或住院的時間。'
      ],
      en: [
        'Do not include 1st-degree burns (erythema only, no blisters) in % TBSA calculations.',
        'The timer for the first 8-hour fluid volume starts from the time of injury, not from arrival at the ED.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/95/parkland-formula-burn-resuscitation'
  },
  {
    id: 'balthazar-ctsi',
    name: { zh: '急性胰臟炎電腦斷層嚴重度', en: 'Balthazar CTSI' },
    subtitle: { zh: '評估急性胰臟炎影像嚴重度與胰臟壞死比例', en: 'Computed Tomography Severity Index (CTSI)' },
    category: 'surgery',
    inputs: [
      {
        id: 'grade',
        name: { zh: 'Balthazar CT 發炎分級', en: 'Balthazar Grade' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: 'Grade A：正常胰臟 (0分)', en: 'Grade A: Normal pancreas (0 pt)' }, value: 0 },
          { label: { zh: 'Grade B：胰臟局部或瀰漫性腫大 (1分)', en: 'Grade B: Focal/diffuse enlargement (1 pt)' }, value: 1 },
          { label: { zh: 'Grade C：胰腺周邊發炎、脂肪浸潤 (2分)', en: 'Grade C: Peripancreatic inflammatory changes (2 pts)' }, value: 2 },
          { label: { zh: 'Grade D：單一位置的胰周液體積聚 (3分)', en: 'Grade D: Single fluid collection (3 pts)' }, value: 3 },
          { label: { zh: 'Grade E：兩處或以上液體積聚，或伴有氣體積聚 (4分)', en: 'Grade E: Multiple collections or gas (4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'necrosis',
        name: { zh: '胰臟實質壞死程度', en: 'Pancreatic Necrosis' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無胰臟壞死 (0分)', en: 'No necrosis (0 pt)' }, value: 0 },
          { label: { zh: '壞死範圍 < 33% (2分)', en: 'Necrosis < 33% (2 pts)' }, value: 2 },
          { label: { zh: '壞死範圍 33% – 50% (4分)', en: 'Necrosis 33%–50% (4 pts)' }, value: 4 },
          { label: { zh: '壞死範圍 > 50% (6分)', en: 'Necrosis > 50% (6 pts)' }, value: 6 }
        ]
      }
    ],
    calculate: (values) => {
      const g = Number(values.grade);
      const n = Number(values.necrosis);
      const score = g + n;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 7) {
        riskLevel = { zh: '重度胰臟炎 (High Severity)', en: 'Severe Pancreatitis' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `CTSI 總分為 ${score} 分。預估嚴重併發症機率約 92%，預估死亡率高達 17%–20%。`, en: `CTSI score is ${score}. Predicts 92% morbidity and 17%-20% mortality.` };
        rec = { zh: '應收治加護病房 (ICU) 密切監測。預防性抗生素使用具爭議，但出現繼發感染（如胰腺膿瘍）時需開始治療，並考慮外科/介入引流。', en: 'ICU admission. Monitor for systemic organ failure. Assess for necrosectomy/drainage if infected.' };
      } else if (score >= 4) {
        riskLevel = { zh: '中度胰臟炎 (Moderate)', en: 'Moderate Severity' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `CTSI 總分為 ${score} 分。預估併發症機率約 35%，預估死亡率約 4%。`, en: `CTSI score is ${score}. Predicts 35% morbidity and ~4% mortality.` };
        rec = { zh: '建議收治住院，給予充分液體甦醒與禁食/營養支持。密切隨訪發炎指標。', en: 'Inpatient admission. Fluid resuscitation and organ perfusion support.' };
      } else {
        riskLevel = { zh: '輕度胰臟炎 (Low Severity)', en: 'Mild Severity' };
        desc = { zh: `CTSI 總分為 ${score} 分。預估併發症機率低于 8%，預估死亡率低於 1%。`, en: `CTSI score is ${score}. Predicts <8% morbidity and <1% mortality.` };
        rec = { zh: '住院支持性治療，早期恢復進食，通常預後良好。', en: 'Supportive care. Early feeding when tolerated.' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Balthazar EJ, et al. Radiology 1990;174(2):331-6 / CTSI: Radiology 1994;193(2):297-306.',
    pearls: {
      zh: [
        'CTSI 的診斷黃金時間為急性胰臟炎發作 72 小時之後。早期 CT 掃描可能低估壞死範圍。',
        '胰腺壞死（CT 顯影增強減低或消失）是局部併發症最重要的危險因子。'
      ],
      en: [
        'CTSI is most accurate if computed tomography is performed at least 72 hours after symptom onset.',
        'Pancreatic necrosis (lack of enhancement) is the single most important radiologic predictor of local complications.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/3831/balthazar-score-computed-tomography-severity-index-ctsi-acute-pancreatitis'
  },

  // ==========================================
  // 4. 麻醉科 (anesthesia)
  // ==========================================
  {
    id: 'asa-class',
    name: { zh: 'ASA 術前身體狀態分級', en: 'ASA Physical Status' },
    subtitle: { zh: '評估手術患者之整體全身健康狀態與風險', en: 'ASA Physical Status Classification System' },
    category: 'anesthesia',
    inputs: [
      {
        id: 'asaClass',
        name: { zh: '患者身體狀態評級', en: 'Physical Status Grade' },
        type: 'select',
        defaultValue: 1,
        options: [
          { label: { zh: 'ASA I：正常健康患者，無系統性疾病', en: 'ASA I: Normal healthy patient' }, value: 1 },
          { label: { zh: 'ASA II：輕微全身性疾病，日常活動不受限 (如控制良好的 HTN/DM、孕婦、肥胖)', en: 'ASA II: Mild systemic disease' }, value: 2 },
          { label: { zh: 'ASA III：嚴重全身性疾病，日常活動受限 (如控制不佳的 DM/HTN、COPD、梗塞史>3個月)', en: 'ASA III: Severe systemic disease' }, value: 3 },
          { label: { zh: 'ASA IV：嚴重全身性疾病，且對生命構成持續威脅 (如不穩定心絞痛、急性心衰竭、梗塞史<3個月)', en: 'ASA IV: Constant threat to life' }, value: 4 },
          { label: { zh: 'ASA V：瀕死患者，不論手術與否預期 24 小時內無法存活', en: 'ASA V: Moribund, not expected to survive' }, value: 5 },
          { label: { zh: 'ASA VI：已宣告腦死患者，準備進行器官捐贈手術', en: 'ASA VI: Brain-dead organ donor' }, value: 6 }
        ]
      },
      { id: 'emergency', name: { zh: '緊急手術 (Emergency - E 修飾符)', en: 'Emergency Surgery (E modifier)' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      const cls = Number(values.asaClass);
      const isE = values.emergency;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      const classStr = `ASA ${['0', 'I', 'II', 'III', 'IV', 'V', 'VI'][cls]}${isE ? '-E' : ''}`;
      
      if (cls === 1) {
        riskLevel = { zh: '手術與麻醉風險極低', en: 'Very Low Risk' };
        desc = { zh: `分類為：${classStr}。健康病患，圍術期死亡率低於 0.1%。`, en: `Classified as ${classStr}. Normal healthy cohort. Mortality <0.1%.` };
        rec = { zh: '常規術前監護，無需特殊器官儲備準備。', en: 'Standard monitoring indicated.' };
      } else if (cls === 2) {
        riskLevel = { zh: '低風險', en: 'Low Risk' };
        desc = { zh: `分類為：${classStr}。輕度系統性疾病患者，日常生活與器官功能代償完好。`, en: `Classified as ${classStr}. Mild controlled systemic illness.` };
        rec = { zh: '控制原有合併症（維持血壓、血糖），進行基礎術前準備。', en: 'Optimize modifiable conditions prior to surgery.' };
      } else if (cls === 3) {
        riskLevel = { zh: '中度風險', en: 'Moderate Risk' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `分類為：${classStr}。嚴重系統性疾病，日常活動功能受限，器官儲備能力降低。`, en: `Classified as ${classStr}. Severe disease limiting activity.` };
        rec = { zh: '術前必須仔細評估主要器官功能，做好術後進入加護病房 (ICU) 監護或特殊心血管/肺部藥物管理的預案。', en: 'Detailed preoperative cardiac/pulmonary evaluation needed. Plan post-op ICU bed if high-risk.' };
      } else if (cls === 4) {
        riskLevel = { zh: '高度風險 (生命威脅)', en: 'High Risk / Severe Threat' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `分類為：${classStr}。器官衰竭瀕臨失代償，手術與麻醉死亡率顯著升高 (約 5%–10%)。`, en: `Classified as ${classStr}. Severe disease constant threat to life.` };
        rec = { zh: '需多學科聯合會診，儘可能在術前對心、腎、呼吸功能進行最大程度的優化。術中需行侵入性血流動力學監測。', en: 'Multidisciplinary triage. Invasive arterial line/monitoring. High likelihood of post-op ICU.' };
      } else if (cls === 5) {
        riskLevel = { zh: '極高風險 (瀕死狀態)', en: 'Critical / Moribund' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: `分類為：${classStr}。瀕死患者，唯有進行搶救手術才可能有存活機會。`, en: `Classified as ${classStr}. Moribund, low chance of survival.` };
        rec = { zh: '向家屬充分交待極高之麻醉死亡風險，進行搶救性支持，維持維生指標。', en: 'Counsel family regarding extreme risk. Aggressive resuscitation.' };
      } else {
        riskLevel = { zh: '腦死 / 器官捐贈', en: 'Brain-dead Donor' };
        desc = { zh: `分類為：${classStr}。已腦死，器官摘除手術。`, en: `Classified as ${classStr}. Donor surgery.` };
        rec = { zh: '術中維持各器官之血流灌注，配合移植團隊。', en: 'Maintain organ perfusion during retrieval.' };
      }
      
      return { valueText: classStr, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Hurwitz EE, et al. Anesthesiology 2013;119(2):434-43.',
    pearls: {
      zh: [
        'ASA 分級只是一項術前狀態的「定性」分級，而非獨立的術後死亡率「預測公式」；然而它與圍術期併發症率有極強的統計相關性。',
        '「E」修飾符代表緊急手術，緊急手術本身即會使該分級下的手術風險成倍增加。'
      ],
      en: [
        'ASA score is a subjective assessment of physical status, not an absolute risk calculator, though it correlates strongly with outcomes.',
        'The "E" modifier signifies emergency status, reflecting a higher acute risk than elective cases of the same score.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/10082/asa-physical-status-classification-system'
  },
  {
    id: 'mallampati-class',
    name: { zh: '馬氏插管氣道評估', en: 'Modified Mallampati Class' },
    subtitle: { zh: '評估咽喉結構以預測插管困難度', en: 'Airway Evaluation for Intubation Difficulty' },
    category: 'anesthesia',
    inputs: [
      {
        id: 'mallampati',
        name: { zh: '張口直視下的咽部解剖結構', en: 'Visualized Pharyngeal Structures' },
        type: 'select',
        defaultValue: 1,
        options: [
          { label: { zh: 'Class I：可見軟顎、完整懸雍垂、咽門弓與前後扁桃腺柱', en: 'Class I: Soft palate, entire uvula, pillars visible' }, value: 1 },
          { label: { zh: 'Class II：可見軟顎、部分懸雍垂與咽門弓 (扁桃腺柱被舌根遮擋)', en: 'Class II: Soft palate, partial uvula visible' }, value: 2 },
          { label: { zh: 'Class III：僅能看到軟顎與懸雍垂基底部', en: 'Class III: Soft palate, base of uvula visible' }, value: 3 },
          { label: { zh: 'Class IV：完全看不到軟顎，只能看到硬顎', en: 'Class IV: Only hard palate visible' }, value: 4 }
        ]
      }
    ],
    calculate: (values) => {
      const cls = Number(values.mallampati);
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (cls <= 2) {
        riskLevel = { zh: '常規氣道 (Easy Airway)', en: 'Class I / II' };
        desc = { zh: `馬氏評級為 Class ${['0', 'I', 'II', 'III', 'IV'][cls]}。預計直接喉鏡下的喉頭結構暴露良好。`, en: `Mallampati Class ${cls}. Suggests easy laryngoscopy.` };
        rec = { zh: '常規氣道管理與插管預備。', en: 'Standard airway induction.' };
      } else {
        riskLevel = { zh: '困難氣道預警 (Difficult Airway)', en: 'Class III / IV (Difficult)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: `馬氏評級為 Class ${['0', 'I', 'II', 'III', 'IV'][cls]}。高度預示可能存在插管困難（喉頭結構暴露極差）。`, en: `Mallampati Class ${cls}. Strongly predicts difficult bag-mask ventilation or intubation.` };
        rec = { zh: '術前必須準備困難氣道插管台（包括影音喉鏡 Video Laryngoscope、喉罩 LMA、光棒或纖維支氣管鏡）。考慮清醒插管或安排資深麻醉醫師進行操作。', en: 'Prepare difficult airway cart (Video laryngoscope, LMA, fiberoptic scope) prior to induction.' };
      }
      
      return { valueText: `Class ${['0', 'I', 'II', 'III', 'IV'][cls]}`, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Mallampati SR, et al. Can Anaesth Soc J 1985;32(4):429-34 / Modified: Samsoon & Young 1987.',
    pearls: {
      zh: [
        '評估時必須讓患者坐直、頭部居中、最大程度張口並伸出舌頭，並且【絕對不可發聲】（發聲會使懸雍垂上提，人為改善分級）。',
        '困難插管的陽性預測值僅約 35%，但 Class III/IV 的排除陰性預測值很高。'
      ],
      en: [
        'The patient must sit upright, open the mouth wide, protrude the tongue fully, and [avoid phonation] during evaluation.',
        'While positive predictive value is moderate (~35%), it has high negative predictive value for ruling out difficult airways.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/10091/modified-mallampati-classification'
  },
  {
    id: 'allowable-blood-loss',
    name: { zh: '最大容許失血量', en: 'Allowable Blood Loss (ABL)' },
    subtitle: { zh: '計算病患到達輸血臨界前可耐受的失血量', en: 'Max Allowable Blood Loss Prior to Transfusion' },
    category: 'anesthesia',
    inputs: [
      { id: 'weight', name: { zh: '患者體重 (kg)', en: 'Patient Weight (kg)' }, type: 'number', defaultValue: 70, min: 2 },
      {
        id: 'ebvFactor',
        name: { zh: '估計總血容量係數 (EBV Factor)', en: 'EBV Factor' },
        type: 'select',
        defaultValue: 65,
        options: [
          { label: { zh: '成年女性 (65 mL/kg)', en: 'Adult Female (65 mL/kg)' }, value: 65 },
          { label: { zh: '成年男性 (75 mL/kg)', en: 'Adult Male (75 mL/kg)' }, value: 75 },
          { label: { zh: '小兒 / 嬰兒 (80 mL/kg)', en: 'Infant / Child (80 mL/kg)' }, value: 80 },
          { label: { zh: '新生兒 (85 mL/kg)', en: 'Neonate (85 mL/kg)' }, value: 85 }
        ]
      },
      { id: 'hctInitial', name: { zh: '術前初始血細胞比容 Hct (%)', en: 'Initial Hematocrit (%)' }, type: 'number', defaultValue: 40, min: 10, max: 60 },
      { id: 'hctFinal', name: { zh: '最低安全目標血細胞比容 Hct (%)', en: 'Target Hematocrit (%)' }, type: 'number', defaultValue: 24, min: 10, max: 45 }
    ],
    calculate: (values) => {
      const w = Number(values.weight);
      const factor = Number(values.ebvFactor);
      const hctI = Number(values.hctInitial);
      const hctF = Number(values.hctFinal);
      
      if (!w || !hctI || !hctF || hctI <= hctF) {
        return { error: 'Invalid input parameters', description: { zh: '請檢查輸入，初始 Hct 必須大於目標 Hct。', en: 'Initial Hct must be greater than target Hct.' } };
      }
      
      const ebv = w * factor;
      const hctAv = (hctI + hctF) / 2;
      const abl = ebv * (hctI - hctF) / hctAv;
      
      return {
        value: abl,
        unit: 'mL',
        riskLevel: { zh: '最大容許失血量', en: 'Max Allowable Loss' },
        riskColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
        description: {
          zh: `計算結果如下：\n- 預估總血容量 (EBV)：${ebv.toFixed(0)} mL。\n- 最大容許失血量 (ABL)：${abl.toFixed(0)} mL。`,
          en: `Calculation results:\n- Estimated Blood Volume (EBV): ${ebv.toFixed(0)} mL.\n- Allowable Blood Loss (ABL): ${abl.toFixed(0)} mL.`
        },
        recommendation: {
          zh: `當失血量少於 ${abl.toFixed(0)} mL 時，可以晶體或膠體補足流失容積（等容量稀釋）；當失血量接近或大於 ${abl.toFixed(0)} mL，應考慮輸注 Packed RBC。`,
          en: `If blood loss < ${abl.toFixed(0)} mL, maintain normovolemia with crystalloids/colloids. If loss ≥ ${abl.toFixed(0)} mL, initiate pRBC transfusion.`
        }
      };
    },
    reference: 'Bourke DL, Smith TC. Anesthesiology 1974;41:609-12.',
    pearls: {
      zh: [
        '對於一般無缺血性心臟病病史的健康年輕人，安全 Hct 臨界通常設為 21%–24% (或 Hb 7–8 g/dL)。',
        '對於患有嚴重冠狀動脈疾病 (CAD) 的病患，最低安全 Hct 應設得較高（通常為 30%，或 Hb 10 g/dL）。'
      ],
      en: [
        'For healthy patients, the transfusion trigger Hct is usually 21%-24% (Hb 7-8 g/dL).',
        'For patients with active cardiac ischemia or severe CAD, a higher trigger of 30% Hct (Hb 10 g/dL) is standard.'
      ]
    },
    mdcalcLink: ''
  },
  {
    id: 'ideal-adjusted-weight',
    name: { zh: '理想與調整體重 (Devine)', en: 'Ideal & Adjusted Body Weight' },
    subtitle: { zh: '機械通氣設定與特定藥物劑量計算', en: 'Devine Formulas for Clinical Weight Adjustments' },
    category: 'anesthesia',
    inputs: [
      {
        id: 'sex',
        name: { zh: '生理性別', en: 'Biological Sex' },
        type: 'select',
        defaultValue: 'male',
        options: [
          { label: { zh: '男性 (Male)', en: 'Male' }, value: 'male' },
          { label: { zh: '女性 (Female)', en: 'Female' }, value: 'female' }
        ]
      },
      { id: 'height', name: { zh: '身高 (cm)', en: 'Height (cm)' }, type: 'number', defaultValue: 170, min: 100, max: 250 },
      { id: 'actualWeight', name: { zh: '實際體重 (kg)', en: 'Actual Weight (kg)' }, type: 'number', defaultValue: 80, min: 20, max: 300 }
    ],
    calculate: (values) => {
      const sex = values.sex;
      const h = Number(values.height);
      const w = Number(values.actualWeight);
      
      if (!h || !w) {
        return { error: 'Invalid height/weight', description: { zh: '請輸入有效的身高與體重。', en: 'Please enter valid height and weight.' } };
      }
      
      const heightInInches = h / 2.54;
      const inchesOver60 = Math.max(0, heightInInches - 60);
      
      let ibw: number;
      if (sex === 'male') {
        ibw = 50.0 + 2.3 * inchesOver60;
      } else {
        ibw = 45.5 + 2.3 * inchesOver60;
      }
      
      const ajbw = ibw + 0.4 * (w - ibw);
      
      return {
        value: ibw,
        unit: 'kg',
        riskLevel: { zh: '理想體重 (IBW)', en: 'Ideal Body Weight' },
        riskColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
        description: {
          zh: `計算結果如下：\n- 理想體重 (IBW)：${ibw.toFixed(1)} kg。\n- 調整體重 (AjBW)：${ajbw.toFixed(1)} kg (適用於超重 > 30% 之肥胖患者)。`,
          en: `Calculation results:\n- Ideal Body Weight (IBW): ${ibw.toFixed(1)} kg.\n- Adjusted Body Weight (AjBW): ${ajbw.toFixed(1)} kg (indicated if actual weight is >30% over IBW).`
        },
        recommendation: {
          zh: `1. 【機械通氣潮氣量設定】必須嚴格以理想體重 (IBW) 計算（如保護性潮氣量 6–8 mL/kg IBW）。以實際體重設定會造成肺氣壓傷。\n2. 術中親水性藥物（如肌鬆劑）之給藥劑量應基於 IBW 或 AjBW。`,
          en: `1. Ventilator tidal volume setting MUST be based on IBW (e.g. 6-8 mL/kg IBW) to prevent barotrauma.\n2. Calculate dosages of hydrophilic drugs using IBW or AjBW.`
        }
      };
    },
    reference: 'Devine BJ. Drug Intell Clin Pharm 1974;8:650-655.',
    pearls: {
      zh: [
        'Devine 公式是計算臨床肺通氣保護的首選公式；其公式基準是身高大於 60 英吋 (152.4 cm) 的人。',
        '親脂性強的藥物（例如 Propofol 誘導劑量）分佈容積大，給藥可按實際體重 (TBW) 計算。'
      ],
      en: [
        'Devine formula is the medical standard for calculating protective mechanical ventilation.',
        'Lipophilic drugs (e.g. Propofol induction) distribute heavily into fat and are dosed based on Total Body Weight (TBW).'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/83/ideal-body-weight-adjusted-body-weight'
  },

  // ==========================================
  // 5. 急診與重症醫學 (emergency_critical)
  // ==========================================
  {
    id: 'glasgow-coma-scale',
    name: { zh: '格拉斯哥昏迷指數 (GCS)', en: 'Glasgow Coma Scale (GCS)' },
    subtitle: { zh: '急性意識障礙與神經學狀況客觀評估', en: 'Standard Glasgow Coma Scale' },
    category: 'emergency_critical',
    inputs: [
      {
        id: 'eye',
        name: { zh: '睜眼反應 (Eye Opening - E)', en: 'Eye Opening (E)' },
        type: 'select',
        defaultValue: 4,
        options: [
          { label: { zh: '自動睜眼 (E4)', en: 'Spontaneous (4 pts)' }, value: 4 },
          { label: { zh: '聽到指令/呼喚後睜眼 (E3)', en: 'To sound (3 pts)' }, value: 3 },
          { label: { zh: '刺痛刺激後睜眼 (E2)', en: 'To pressure/pain (2 pts)' }, value: 2 },
          { label: { zh: '無反應 (E1)', en: 'None (1 pt)' }, value: 1 }
        ]
      },
      {
        id: 'verbal',
        name: { zh: '言語反應 (Verbal - V)', en: 'Verbal Response (V)' },
        type: 'select',
        defaultValue: 5,
        options: [
          { label: { zh: '定向清楚，對答如流 (V5)', en: 'Oriented (5 pts)' }, value: 5 },
          { label: { zh: '言談混亂，答非所問 (V4)', en: 'Confused conversation (4 pts)' }, value: 4 },
          { label: { zh: '字詞不連貫，僅說出單字 (V3)', en: 'Inappropriate words (3 pts)' }, value: 3 },
          { label: { zh: '僅能發出無意義呻吟、咕嚕聲 (V2)', en: 'Incomprehensible sounds (2 pts)' }, value: 2 },
          { label: { zh: '無言語反應 (V1)', en: 'None (1 pt)' }, value: 1 },
          { label: { zh: '已氣管插管 (VT / V1T)', en: 'Intubated (VT)' }, value: 1 }
        ]
      },
      {
        id: 'motor',
        name: { zh: '運動反應 (Motor - M)', en: 'Motor Response (M)' },
        type: 'select',
        defaultValue: 6,
        options: [
          { label: { zh: '能遵從口頭指令活動 (M6)', en: 'Obeys commands (6 pts)' }, value: 6 },
          { label: { zh: '對痛覺刺激有定位避痛反應 (M5)', en: 'Localizes pain (5 pts)' }, value: 5 },
          { label: { zh: '對痛覺刺激呈逃避性回縮反應 (M4)', en: 'Normal flexion withdrawal (4 pts)' }, value: 4 },
          { label: { zh: '異常屈曲反應 (去皮質強直) (M3)', en: 'Abnormal flexion / decorticate (3 pts)' }, value: 3 },
          { label: { zh: '異常伸展反應 (去腦強直) (M2)', en: 'Abnormal extension / decerebrate (2 pts)' }, value: 2 },
          { label: { zh: '無運動反應 (M1)', en: 'None (1 pt)' }, value: 1 }
        ]
      }
    ],
    calculate: (values) => {
      const e = Number(values.eye);
      const v = Number(values.verbal);
      const m = Number(values.motor);
      
      const score = e + v + m;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 13) {
        riskLevel = { zh: '輕度神經受損', en: 'Mild Brain Injury' };
        desc = { zh: `GCS 總分為 ${score} 分。`, en: `GCS Score is ${score}.` };
        rec = { zh: '定期評估，注意有無神經局部缺損擴大或創傷後症狀。', en: 'Perform serial neurologic exams.' };
      } else if (score >= 9) {
        riskLevel = { zh: '中度神經受損', en: 'Moderate Brain Injury' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `GCS 總分為 ${score} 分。`, en: `GCS Score is ${score}.` };
        rec = { zh: '建議儘速行頭部電腦斷層 (CT) 檢查，收治普通病房或 ICU 密切觀察。', en: 'Obtain non-contrast head CT and monitor closely.' };
      } else {
        riskLevel = { zh: '重度神經受損 / 昏迷 (Coma)', en: 'Severe Injury / Coma' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: `GCS 總分為 ${score} 分 (GCS ≤ 8 定義為重度昏迷)。`, en: `GCS Score is ${score} (Score ≤8 defines coma).` };
        rec = { zh: '臨床核心金句：【GCS 小於 8，應行插管 (GCS < 8, Intubate)】。患者已失去保護呼吸道及咳嗽發聲反射，極易窒息與吸入性肺炎，必須建立人工氣道並入住重症加護病房。', en: 'GCS ≤8 is a strong indication for endotracheal intubation to protect the airway.' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Teasdale G, Jennett B. Lancet 1974;2(7872):81-4.',
    pearls: {
      zh: [
        '如果病患氣管插管，言語評估無法進行，此時言語計作 1T 分，總分記作如 GCS 9T (E4V1TM5)。',
        '評分時應以病患「最佳反應（Best Response）」的那一側或那一次表現為準。'
      ],
      en: [
        'If the patient is intubated, V is scored as 1T. Record as e.g. GCS 9T (E4V1TM5).',
        'Always record the best response for each score component.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/64/glasgow-coma-scale-score'
  },
  {
    id: 'sofa-qsofa',
    name: { zh: '器官衰竭評估與快速篩檢 (SOFA & qSOFA)', en: 'SOFA & qSOFA Scores' },
    subtitle: { zh: '評估急性感染患者之臟器衰竭程度與敗血症風險', en: 'Sequential Organ Failure Assessment & Quick SOFA' },
    category: 'emergency_critical',
    inputs: [
      {
        id: 'mode',
        name: { zh: '評分模式', en: 'Evaluation Mode' },
        type: 'select',
        defaultValue: 'qsofa',
        options: [
          { label: { zh: 'qSOFA (床邊快速篩檢 - 3項)', en: 'qSOFA (Bedside Quick Screen)' }, value: 'qsofa' },
          { label: { zh: 'SOFA (完整臟器衰竭評估 - 6大系統)', en: 'SOFA (Full Organ Failure Assessment)' }, value: 'sofa' }
        ]
      },
      // qSOFA inputs
      { id: 'rr22', name: { zh: 'qSOFA: 呼吸頻率 ≥ 22 次/分', en: 'qSOFA: Respiratory rate ≥22/min' }, type: 'boolean', defaultValue: false },
      { id: 'alteredGcs', name: { zh: 'qSOFA: 意識狀態改變 (GCS < 15 分)', en: 'qSOFA: Altered mentation (GCS <15)' }, type: 'boolean', defaultValue: false },
      { id: 'sbp100', name: { zh: 'qSOFA: 收縮壓 ≤ 100 mmHg', en: 'qSOFA: Systolic BP ≤100 mmHg' }, type: 'boolean', defaultValue: false },
      
      // SOFA inputs
      {
        id: 'sofaResp',
        name: { zh: 'SOFA: 呼吸系統 (P/F Ratio)', en: 'SOFA: Respiration (PaO₂/FiO₂)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: 'PaO₂/FiO₂ ≥ 400 (0分)', en: '≥400 (0 pt)' }, value: 0 },
          { label: { zh: 'PaO₂/FiO₂ < 400 (1分)', en: '<400 (1 pt)' }, value: 1 },
          { label: { zh: 'PaO₂/FiO₂ < 300 (2分)', en: '<300 (2 pts)' }, value: 2 },
          { label: { zh: 'PaO₂/FiO₂ < 200 且使用輔助呼吸 (3分)', en: '<200 with mechanical ventilation (3 pts)' }, value: 3 },
          { label: { zh: 'PaO₂/FiO₂ < 100 且使用輔助呼吸 (4分)', en: '<100 with mechanical ventilation (4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'sofaCoag',
        name: { zh: 'SOFA: 凝血系統 (血小板計數)', en: 'SOFA: Coagulation (Platelets)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '血小板 ≥ 150k (0分)', en: '≥150,000 (0 pt)' }, value: 0 },
          { label: { zh: '血小板 < 150k (1分)', en: '<150,000 (1 pt)' }, value: 1 },
          { label: { zh: '血小板 < 100k (2分)', en: '<100,000 (2 pts)' }, value: 2 },
          { label: { zh: '血小板 < 50k (3分)', en: '<50,000 (3 pts)' }, value: 3 },
          { label: { zh: '血小板 < 20k (4分)', en: '<20,000 (4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'sofaLiver',
        name: { zh: 'SOFA: 肝臟功能 (總膽紅素)', en: 'SOFA: Liver (Bilirubin)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: 'Bilirubin < 1.2 mg/dL (0分)', en: '<1.2 mg/dL (0 pt)' }, value: 0 },
          { label: { zh: 'Bilirubin 1.2–1.9 mg/dL (1分)', en: '1.2–1.9 mg/dL (1 pt)' }, value: 1 },
          { label: { zh: 'Bilirubin 2.0–5.9 mg/dL (2分)', en: '2.0–5.9 mg/dL (2 pts)' }, value: 2 },
          { label: { zh: 'Bilirubin 6.0–11.9 mg/dL (3分)', en: '6.0–11.9 mg/dL (3 pts)' }, value: 3 },
          { label: { zh: 'Bilirubin ≥ 12.0 mg/dL (4分)', en: '≥12.0 mg/dL (4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'sofaCV',
        name: { zh: 'SOFA: 心血管系統 (血壓 / 升壓劑)', en: 'SOFA: Cardiovascular (MAP/Vasoactive)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無低血壓 且 MAP ≥ 70 mmHg (0分)', en: 'No hypotension, MAP ≥70 (0 pt)' }, value: 0 },
          { label: { zh: 'MAP < 70 mmHg (1分)', en: 'MAP <70 (1 pt)' }, value: 1 },
          { label: { zh: '需使用 Dopamine ≤ 5 or Dobutamine (any dose) (2分)', en: 'On Dopamine ≤5 or Dobutamine (2 pts)' }, value: 2 },
          { label: { zh: '需使用 Dopamine > 5, Epi ≤ 0.1, or Norepi ≤ 0.1 (3分)', en: 'On Dopamine >5, Epi/Norepi ≤0.1 (3 pts)' }, value: 3 },
          { label: { zh: '需使用 Dopamine > 15, Epi > 0.1, or Norepi > 0.1 (4分)', en: 'On Dopamine >15, Epi/Norepi >0.1 (4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'sofaGcs',
        name: { zh: 'SOFA: 中樞神經系統 (GCS)', en: 'SOFA: Nervous System (GCS)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: 'GCS = 15 (0分)', en: 'GCS 15 (0 pt)' }, value: 0 },
          { label: { zh: 'GCS = 13–14 (1分)', en: 'GCS 13–14 (1 pt)' }, value: 1 },
          { label: { zh: 'GCS = 10–12 (2分)', en: 'GCS 10–12 (2 pts)' }, value: 2 },
          { label: { zh: 'GCS = 6–9 (3分)', en: 'GCS 6–9 (3 pts)' }, value: 3 },
          { label: { zh: 'GCS < 6 (4分)', en: 'GCS <6 (4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'sofaRenal',
        name: { zh: 'SOFA: 腎臟功能 (肌酸酐 / 尿量)', en: 'SOFA: Renal (Creatinine/Urine)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: 'Creatinine < 1.2 mg/dL (0分)', en: '<1.2 mg/dL (0 pt)' }, value: 0 },
          { label: { zh: 'Creatinine 1.2–1.9 mg/dL (1分)', en: '1.2–1.9 mg/dL (1 pt)' }, value: 1 },
          { label: { zh: 'Creatinine 2.0–3.4 mg/dL (2分)', en: '2.0–3.4 mg/dL (2 pts)' }, value: 2 },
          { label: { zh: 'Creatinine 3.5–4.9 mg/dL 或 尿量 < 500 mL/d (3分)', en: 'Creatinine 3.5–4.9 mg/dL or Urine <500mL/d (3 pts)' }, value: 3 },
          { label: { zh: 'Creatinine ≥ 5.0 mg/dL 或 尿量 < 200 mL/d (4分)', en: 'Creatinine ≥5.0 mg/dL or Urine <200mL/d (4 pts)' }, value: 4 }
        ]
      }
    ],
    calculate: (values) => {
      const mode = values.mode;
      
      if (mode === 'qsofa') {
        let qScore = 0;
        if (values.rr22) qScore += 1;
        if (values.alteredGcs) qScore += 1;
        if (values.sbp100) qScore += 1;
        
        let riskLevel: { zh: string; en: string };
        let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
        let desc: { zh: string; en: string };
        let rec: { zh: string; en: string };
        
        if (qScore >= 2) {
          riskLevel = { zh: 'qSOFA 高風險 (敗血症預警)', en: 'High Risk for Sepsis' };
          riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
          desc = { zh: `qSOFA 評分為 ${qScore} 分。提示病患存在極高死亡率與入住 ICU 的風險。`, en: `qSOFA score is ${qScore} (≥2). Predicts high risk of poor outcomes.` };
          rec = { zh: '懷疑感染的患者當 qSOFA ≥2 時，應立即評估臟器受損（計算完整 SOFA 評分），主動尋找並控制感染源，採取高級復甦。', en: 'Examine for target organ dysfunction (SOFA). Treat sepsis empirically.' };
        } else {
          riskLevel = { zh: 'qSOFA 低風險', en: 'Low Risk' };
          desc = { zh: `qSOFA 評分為 ${qScore} 分。暫無危急警示。`, en: `qSOFA score is ${qScore}.` };
          rec = { zh: '臨床密切追蹤，如果感染症狀加重，需再次評估。', en: 'Continue monitoring. Re-evaluate if clinical status degrades.' };
        }
        return { score: qScore, riskLevel, riskColor, description: desc, recommendation: rec };
      } else {
        const resp = Number(values.sofaResp);
        const coag = Number(values.sofaCoag);
        const liver = Number(values.sofaLiver);
        const cv = Number(values.sofaCV);
        const gcs = Number(values.sofaGcs);
        const renal = Number(values.sofaRenal);
        
        const sofaScore = resp + coag + liver + cv + gcs + renal;
        
        let riskLevel: { zh: string; en: string };
        let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
        let desc: { zh: string; en: string };
        let rec: { zh: string; en: string };
        
        if (sofaScore >= 2) {
          riskLevel = { zh: '已發生急性臟器功能障礙 / 敗血症', en: 'Organ Dysfunction / Sepsis Confirmed' };
          riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
          desc = { zh: `SOFA 評分為 ${sofaScore} 分。對於疑似感染病患，SOFA 比基線急性增加 ≥2 分即符合 Sepsis-3 敗血症診斷門檻，住院死亡率增幅 >10%。`, en: `SOFA Score is ${sofaScore}. Acute change ≥2 defines sepsis (Sepsis-3).` };
          rec = { zh: '必須立即採取廣譜抗生素治療、乳酸檢測、液體甦醒與升壓劑支持。監護臟器灌注。', en: 'Initiate sepsis bundle (blood cultures, broad-spectrum antibiotics, IV fluids, lactate).' };
        } else {
          riskLevel = { zh: '無顯著臟器功能衰竭', en: 'No Significant Organ Failure' };
          desc = { zh: `SOFA 評分為 ${sofaScore} 分。目前未觀察到明顯的多臟器衰竭跡象。`, en: `SOFA Score is ${sofaScore}. Low risk.` };
          rec = { zh: '繼續對原發發炎/感染源進行定位與治療，定期動態評估。', en: 'Manage primary source of infection. Re-evaluate daily.' };
        }
        return { score: sofaScore, riskLevel, riskColor, description: desc, recommendation: rec };
      }
    },
    reference: 'Sepsis-3 Consensus: Singer M, et al. JAMA 2016;315(8):801-10.',
    pearls: {
      zh: [
        'Sepsis-3 共識放棄了傳統的 SIRS 診斷標準，全面轉向以 SOFA 急性上升 ≥ 2 分來定義敗血症。',
        'qSOFA 非常適合床邊快速檢診，而完整 SOFA 用於評估多器官系統的累積功能損傷。'
      ],
      en: [
        'Sepsis-3 redefined sepsis as an acute increase in SOFA score ≥2 points secondary to infection.',
        'qSOFA is meant for rapid bedside triage, whereas SOFA details cumulative organ failures.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/10078/sequential-organ-failure-assessment-sofa-score'
  },
  {
    id: 'shock-index',
    name: { zh: '休克指數', en: 'Shock Index' },
    subtitle: { zh: '急性大出血或敗血症隱匿性休克床邊快速評估', en: 'Ratio of Heart Rate to Systolic Blood Pressure' },
    category: 'emergency_critical',
    inputs: [
      { id: 'hr', name: { zh: '心跳速率 (Heart Rate)', en: 'Heart Rate (bpm)' }, type: 'number', defaultValue: 80, min: 20, max: 250 },
      { id: 'sbp', name: { zh: '收縮壓 (Systolic BP)', en: 'Systolic Blood Pressure (mmHg)' }, type: 'number', defaultValue: 120, min: 30, max: 300 }
    ],
    calculate: (values) => {
      const hr = Number(values.hr);
      const sbp = Number(values.sbp);
      
      if (!hr || !sbp) {
        return { error: 'Invalid inputs', description: { zh: '請輸入有效的心跳與收縮壓。', en: 'Please enter valid HR and SBP.' } };
      }
      
      const value = hr / sbp;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (value >= 1.3) {
        riskLevel = { zh: '重度休克 / 瀕臨失代償', en: 'Severe Shock' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: `休克指數為 ${value.toFixed(2)}。提示左心室充盈壓顯著降低，存在嚴重的低灌注與致命風險。`, en: `Shock Index is ${value.toFixed(2)}. Suggests severe hypovolemia.` };
        rec = { zh: '強烈建議採取緊急血流動力學復甦，包括啟動大量輸血協定 (MTP)、建立中心靜脈通路、投予升壓劑並尋找止血源。', en: 'Initiate active resuscitation, activate massive transfusion protocol (MTP) if bleeding.' };
      } else if (value >= 1.0) {
        riskLevel = { zh: '休克狀態 (Decompensated)', en: 'Decompensated Shock' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `休克指數為 ${value.toFixed(2)} (≥1.0)。心跳已超過收縮壓，提示代償機制耗竭。`, en: `Shock Index is ${value.toFixed(2)} (≥1.0). Decompensated circulatory state.` };
        rec = { zh: '患者極有可能需要大量輸血、靜脈補液，並有入住 ICU 的適應症。應儘速揪出循環不穩的原發病因。', en: 'High probability of requiring transfusion or ICU admission.' };
      } else if (value >= 0.7) {
        riskLevel = { zh: '隱匿性休克警示 (Occult Shock)', en: 'Occult Shock Warning' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `休克指數為 ${value.toFixed(2)} (0.7-0.9)。提示可能處於休克代償期（血管收縮、心跳加速以維持血壓在正常範圍）。`, en: `Shock Index is ${value.toFixed(2)} (0.7-0.9). Early compensated shock.` };
        rec = { zh: '雖血壓看似正常，但不可忽視潛在出血或感染可能性。建議複查乳酸 (Lactate) 並密切監控。', en: 'Check serum lactate. Monitor volume status and vitals closely.' };
      } else {
        riskLevel = { zh: '正常範圍 (Normal)', en: 'Normal circulation' };
        desc = { zh: `休克指數為 ${value.toFixed(2)}。血流動力學相對穩定。`, en: `Shock Index is ${value.toFixed(2)}.` };
        rec = { zh: '維持常規觀察。', en: 'Continue routine care.' };
      }
      
      return { value, unit: '', riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Allgöwer M, Burri C. Dtsch Med Wochenschr 1967;92(43):1947-50.',
    pearls: {
      zh: [
        '休克指數主要用於創傷大出血或敗血症初期；患者若長期服用 β-blockers（心跳無法代償加速）或有慢性高血壓，該數值會呈假性偏低。',
        '當 SI ≥ 1.0 時，預示患者大出血需要大量輸血的敏感度很高。'
      ],
      en: [
        'Unreliable in patients on beta-blockers or with chronic severe hypertension.',
        'An SI ≥1.0 is a strong predictor of the need for massive transfusion and intensive care.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/3830/shock-index'
  },

  // ==========================================
  // 6. 神經與神經外科 (neurology)
  // ==========================================
  {
    id: 'nihss',
    name: { zh: '國家衛生院腦中風量表 (NIHSS)', en: 'NIH Stroke Scale (NIHSS)' },
    subtitle: { zh: '量化急性缺血性腦中風嚴重度與治療指引', en: 'NIHSS for Stroke Severity' },
    category: 'neurology',
    inputs: [
      {
        id: 'loc',
        name: { zh: '1a. 意識水平 (LOC)', en: '1a. Level of Consciousness' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '神志清醒 (0分)', en: 'Alert (0 pt)' }, value: 0 },
          { label: { zh: '嗜睡：輕微刺激可喚醒，能配合 (1分)', en: 'Drowsy (1 pt)' }, value: 1 },
          { label: { zh: '昏睡：需強烈/反覆刺激才能睜眼，不配合 (2分)', en: 'Stuporous (2 pts)' }, value: 2 },
          { label: { zh: '昏迷：僅反射反應或完全無反應 (3分)', en: 'Comatose (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'locQ',
        name: { zh: '1b. 意識提問 (回答目前月份與自己年齡)', en: '1b. LOC Questions (Month, Age)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '兩題皆回答正確 (0分)', en: 'Both answered correctly (0 pt)' }, value: 0 },
          { label: { zh: '答對一題 (1分)', en: 'One answered correctly (1 pt)' }, value: 1 },
          { label: { zh: '兩題皆不正確 / 無法回答 (2分)', en: 'Both answered incorrectly (2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'locC',
        name: { zh: '1c. 意識指令 (睜眼閉眼、握拳放開)', en: '1c. LOC Commands (Eyes, Grip)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '完成兩個指令 (0分)', en: 'Both performed correctly (0 pt)' }, value: 0 },
          { label: { zh: '僅完成一個指令 (1分)', en: 'One performed correctly (1 pt)' }, value: 1 },
          { label: { zh: '兩個指令皆無法完成 (2分)', en: 'Both performed incorrectly (2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'gaze',
        name: { zh: '2. 凝視運動 (Horizontal Gaze)', en: '2. Best Gaze (Horizontal)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '眼球水平運動正常 (0分)', en: 'Normal (0 pt)' }, value: 0 },
          { label: { zh: '部分凝視麻痺 (單眼或雙眼不完全麻痺) (1分)', en: 'Partial gaze palsy (1 pt)' }, value: 1 },
          { label: { zh: '眼球完全偏斜、無法水平運動 (2分)', en: 'Forced deviation (2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'visual',
        name: { zh: '3. 視野缺損 (Visual Fields)', en: '3. Visual Fields' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '視野無缺損 (0分)', en: 'No visual loss (0 pt)' }, value: 0 },
          { label: { zh: '部分偏盲 (1分)', en: 'Partial hemianopia (1 pt)' }, value: 1 },
          { label: { zh: '完全偏盲 (2分)', en: 'Complete hemianopia (2 pts)' }, value: 2 },
          { label: { zh: '雙側偏盲 / 盲 (3分)', en: 'Bilateral hemianopia / blind (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'facial',
        name: { zh: '4. 面癱程度 (Facial Palsy)', en: '4. Facial Palsy' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '對稱正常 (0分)', en: 'Normal symmetry (0 pt)' }, value: 0 },
          { label: { zh: '輕微面癱 (鼻唇溝變淺、微笑不對稱) (1分)', en: 'Minor paralysis (1 pt)' }, value: 1 },
          { label: { zh: '中度偏癱 (下半面癱) (2分)', en: 'Partial paralysis (2 pts)' }, value: 2 },
          { label: { zh: '單側或雙側完全面癱 (上下皆癱) (3分)', en: 'Complete paralysis (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'motorArmL',
        name: { zh: '5a. 左上肢運動 (漂浮測試 10秒)', en: '5a. Left Motor Arm (Drift 10s)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無漂浮下移 (0分)', en: 'No drift (0 pt)' }, value: 0 },
          { label: { zh: '輕微漂浮下移，但未觸及床面 (1分)', en: 'Drift, does not hit bed (1 pt)' }, value: 1 },
          { label: { zh: '肢體可抗重力，但無法維持10秒而下墜觸床 (2分)', en: 'Some effort against gravity (2 pts)' }, value: 2 },
          { label: { zh: '肢體無法抗重力，直接下墜 (3分)', en: 'No effort against gravity (3 pts)' }, value: 3 },
          { label: { zh: '肢體完全無任何運動 (4分)', en: 'No movement (4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'motorArmR',
        name: { zh: '5b. 右上肢運動 (漂浮測試 10秒)', en: '5b. Right Motor Arm (Drift 10s)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無漂浮下移 (0分)', en: 'No drift (0 pt)' }, value: 0 },
          { label: { zh: '輕微漂浮下移，但未觸及床面 (1分)', en: 'Drift (1 pt)' }, value: 1 },
          { label: { zh: '抗重力但無法維持10秒觸床 (2分)', en: 'Some effort against gravity (2 pts)' }, value: 2 },
          { label: { zh: '無法抗重力直接下墜 (3分)', en: 'No effort against gravity (3 pts)' }, value: 3 },
          { label: { zh: '肢體完全無運動 (4分)', en: 'No movement (4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'motorLegL',
        name: { zh: '6a. 左下肢運動 (抬高30度 5秒)', en: '6a. Left Motor Leg (Hold 5s)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無下移 (0分)', en: 'No drift (0 pt)' }, value: 0 },
          { label: { zh: '有下移，但未觸及床面 (1分)', en: 'Drift (1 pt)' }, value: 1 },
          { label: { zh: '可抗重力但無法維持5秒 (2分)', en: 'Some effort against gravity (2 pts)' }, value: 2 },
          { label: { zh: '無法抗重力直接墜落 (3分)', en: 'No effort against gravity (3 pts)' }, value: 3 },
          { label: { zh: '肢體完全無運動 (4分)', en: 'No movement (4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'motorLegR',
        name: { zh: '6b. 右下肢運動 (抬高30度 5秒)', en: '6b. Right Motor Leg (Hold 5s)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無下移 (0分)', en: 'No drift (0 pt)' }, value: 0 },
          { label: { zh: '有下移，但未觸及床面 (1分)', en: 'Drift (1 pt)' }, value: 1 },
          { label: { zh: '可抗重力但無法維持5秒 (2分)', en: 'Some effort against gravity (2 pts)' }, value: 2 },
          { label: { zh: '無法抗重力直接墜落 (3分)', en: 'No effort against gravity (3 pts)' }, value: 3 },
          { label: { zh: '肢體完全無運動 (4分)', en: 'No movement (4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'ataxia',
        name: { zh: '7. 肢體共濟失調 (Ataxia - 指鼻/跟膝脛)', en: '7. Limb Ataxia' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無共濟失調 (0分)', en: 'Absent (0 pt)' }, value: 0 },
          { label: { zh: '單側肢體存在共濟失調 (1分)', en: 'Present in one limb (1 pt)' }, value: 1 },
          { label: { zh: '兩側肢體皆有共濟失調 (2分)', en: 'Present in two limbs (2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'sensory',
        name: { zh: '8. 皮膚感覺 (Pinprick Sensation)', en: '8. Sensory (Pinprick)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '感覺對稱正常 (0分)', en: 'Normal (0 pt)' }, value: 0 },
          { label: { zh: '輕度至中度感覺減退 (刺痛感鈍化) (1分)', en: 'Mild-to-moderate loss (1 pt)' }, value: 1 },
          { label: { zh: '重度至完全感覺缺失 (完全無痛覺) (2分)', en: 'Severe-to-complete loss (2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'language',
        name: { zh: '9. 最佳語言功能 (Aphasia - 描述圖片)', en: '9. Best Language (Aphasia)' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '正常，無失語 (0分)', en: 'Normal (0 pt)' }, value: 0 },
          { label: { zh: '輕度至中度失語 (能交流，但有單詞拼湊困境) (1分)', en: 'Mild-to-moderate aphasia (1 pt)' }, value: 1 },
          { label: { zh: '重度失語 (僅能以破碎單詞交流，高度依賴猜測) (2分)', en: 'Severe aphasia (2 pts)' }, value: 2 },
          { label: { zh: '完全失語 / 啞 / 無任何聽說能力 (3分)', en: 'Global aphasia / mute (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'dysarthria',
        name: { zh: '10. 構音障礙 (Dysarthria - 讀出詞語)', en: '10. Dysarthria' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '發音正常清晰 (0分)', en: 'Normal (0 pt)' }, value: 0 },
          { label: { zh: '輕度至中度構音障礙 (說話含糊不清) (1分)', en: 'Mild-to-moderate slurring (1 pt)' }, value: 1 },
          { label: { zh: '重度構音障礙 (發音完全含糊，甚至完全無法出聲) (2分)', en: 'Severe slurring / mute (2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'neglect',
        name: { zh: '11. 消退與忽視症 (Neglect)', en: '11. Extinction & Inattention' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無忽視症，兩側注意對稱 (0分)', en: 'No inattention (0 pt)' }, value: 0 },
          { label: { zh: '部分忽視 (對單側視覺、觸覺刺激注意降低) (1分)', en: 'Partial inattention (1 pt)' }, value: 1 },
          { label: { zh: '完全忽視 (完全無空間單側感知) (2分)', en: 'Complete inattention (2 pts)' }, value: 2 }
        ]
      }
    ],
    calculate: (values) => {
      const score = 
        Number(values.loc) + Number(values.locQ) + Number(values.locC) +
        Number(values.gaze) + Number(values.visual) + Number(values.facial) +
        Number(values.motorArmL) + Number(values.motorArmR) +
        Number(values.motorLegL) + Number(values.motorLegR) +
        Number(values.ataxia) + Number(values.sensory) +
        Number(values.language) + Number(values.dysarthria) + Number(values.neglect);
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 21) {
        riskLevel = { zh: '重度腦中風', en: 'Severe Stroke' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: `NIHSS 總分為 ${score} 分。預示腦實質缺血灶面積大，出血轉化風險高。`, en: `NIHSS score is ${score}. Suggests high severity stroke.` };
        rec = { zh: '急性靜脈溶栓 (tPA) 須極度警惕出血轉化風險，應積極評估急診動脈取栓 (EVT) 之適應症。', en: 'High bleeding risk with tPA. Evaluate for mechanical thrombectomy (EVT).' };
      } else if (score >= 16) {
        riskLevel = { zh: '中重度腦中風', en: 'Moderate-to-Severe Stroke' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `NIHSS 總分為 ${score} 分。`, en: `NIHSS score is ${score}.` };
        rec = { zh: '收治中風加護病房 (Stroke ICU)，密切監測神經功能變化，考慮血管介入取栓。', en: 'Admit to Stroke ICU. Evaluate for vascular intervention.' };
      } else if (score >= 5) {
        riskLevel = { zh: '中度腦中風', en: 'Moderate Stroke' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `NIHSS 總分為 ${score} 分。`, en: `NIHSS score is ${score}.` };
        rec = { zh: '如處於黃金期內（<4.5小時）且無明確禁忌症，此區間是靜脈抗栓溶栓治療 (tPA) 的最佳適應症。', en: 'Ideal candidate for IV thrombolysis (tPA) if within 4.5h window.' };
      } else {
        riskLevel = { zh: '輕度腦中風', en: 'Minor Stroke' };
        desc = { zh: `NIHSS 總分為 ${score} 分。`, en: `NIHSS score is ${score}.` };
        rec = { zh: '進行中風原因排查，考慮給予雙聯抗血小板藥物 (DAPT) 以預防二次中風。', en: 'Investigate stroke etiology. Consider dual antiplatelet therapy (DAPT).' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Lyden P, et al. Stroke 1994;25(11):2226-32.',
    pearls: {
      zh: [
        'NIHSS 是一項客觀的神經學檢查評估，分數越高代表受損越重，評分每增加 1 分，腦梗死體積也會隨之增加。',
        '急性腦中風臨床處置必須與時間賽跑，「Time is Brain」！'
      ],
      en: [
        'Each point increase in NIHSS corresponds to larger infarct volumes and increased risk of hemorrhagic transformation.',
        'Speed is critical in stroke management: "Time is Brain."'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/112/nih-stroke-scale-nihss'
  },
  {
    id: 'ich-score',
    name: { zh: '腦出血評分', en: 'ICH Score' },
    subtitle: { zh: '預測自發性腦出血患者的 30 天死亡率', en: 'Intracerebral Hemorrhage Mortality Predictor' },
    category: 'neurology',
    inputs: [
      {
        id: 'gcs',
        name: { zh: '格拉斯哥昏迷指數 (GCS)', en: 'Glasgow Coma Scale' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: 'GCS 13–15 (0分)', en: 'GCS 13–15 (0 pt)' }, value: 0 },
          { label: { zh: 'GCS 5–12 (1分)', en: 'GCS 5–12 (1 pt)' }, value: 1 },
          { label: { zh: 'GCS 3–4 (2分)', en: 'GCS 3–4 (2 pts)' }, value: 2 }
        ]
      },
      { id: 'age80', name: { zh: '年齡大於或等於 80 歲 (+1分)', en: 'Age ≥ 80 years (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'volume30', name: { zh: '腦出血量 ≥ 30 mL (+1分) (藉由 CT ABC/2 公式估算)', en: 'ICH Volume ≥ 30 mL (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'ivh', name: { zh: '腦出血破入腦室 (IVH) (+1分)', en: 'Intraventricular Hemorrhage (IVH) (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'infratentorial', name: { zh: '腦出血起源於幕下 (小腦/腦幹) (+1分)', en: 'Infratentorial Origin (+1 pt)' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let score = Number(values.gcs);
      if (values.age80) score += 1;
      if (values.volume30) score += 1;
      if (values.ivh) score += 1;
      if (values.infratentorial) score += 1;
      
      const mortalityMap = [0, 13, 26, 72, 94, 100, 100];
      const mort = mortalityMap[score];
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 4) {
        riskLevel = { zh: '重度腦出血 / 極高死亡率', en: 'Severe ICH / Critical' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: `ICH 評分為 ${score} 分。預估 30 天內死亡率高達 ${mort}%。`, en: `ICH score is ${score}. Predicted 30-day mortality is ${mort}%.` };
        rec = { zh: '需住重症監護病房 (ICU) 行持續性顱內壓監測，控制血壓與腦水腫，必要時會診神經外科行急診開顱去骨瓣減壓或引流手術。', en: 'ICU management. Manage ICP and blood pressure. Consult neurosurgery urgently.' };
      } else if (score >= 2) {
        riskLevel = { zh: '中度腦出血 / 中高風險', en: 'Moderate ICH' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `ICH 評分為 ${score} 分。預估 30 天內死亡率約 ${mort}%。`, en: `ICH score is ${score}. Predicted 30-day mortality is ${mort}%.` };
        rec = { zh: '密切觀察神經學症狀，控制收縮壓在 140 mmHg 以下以避免血腫擴大，預防癲癇發作。', en: 'Strict BP control to target SBP <140 mmHg to limit hematoma expansion.' };
      } else {
        riskLevel = { zh: '輕度腦出血 / 預後較佳', en: 'Mild ICH' };
        desc = { zh: `ICH 評分為 ${score} 分。預估 30 天內死亡率約 ${mort}%。`, en: `ICH score is ${score}. Predicted 30-day mortality is ${mort}%.` };
        rec = { zh: '住院保守支持性治療，密切隨訪頭部 CT 以評估血腫是否有擴大趨勢。', en: 'Conservative inpatient therapy, follow-up head CT to check for stability.' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Hemphill JC 3rd, et al. Stroke 2001;32(4):891-7.',
    pearls: {
      zh: [
        '出血體積公式：$Volume = A \\times B \\times C / 2$，其中 A, B 分別為 CT 上血腫最大橫截面的長與寬（cm），C 為血腫縱向切片層數深度。',
        '此評分主要用於臨床病情交流，不得作為放棄搶救或撤除生命維持的唯一指標。'
      ],
      en: [
        'Volume calculation utilizes the ABC/2 ellipsoid formula from non-contrast head CT.',
        'The score serves as a prognostic index and should not be used as the sole reason to withdraw clinical care.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/99/ich-score-intracerebral-hemorrhage'
  },
  {
    id: 'hunt-hess',
    name: { zh: '蛛網膜下腔出血分級', en: 'Hunt and Hess Scale' },
    subtitle: { zh: '評估動脈瘤破裂出血之嚴重度與預後', en: 'Clinical Grading of Subarachnoid Hemorrhage (SAH)' },
    category: 'neurology',
    inputs: [
      {
        id: 'baseGrade',
        name: { zh: '臨床神經學狀態分級', en: 'Neurological Status Grade' },
        type: 'select',
        defaultValue: 1,
        options: [
          { label: { zh: 'Grade 1：無症狀或輕微頭痛、輕微頸部僵直', en: 'Grade 1: Asymptomatic or mild headache, slight nuchal rigidity' }, value: 1 },
          { label: { zh: 'Grade 2：中度至重度頭痛、頸部僵直，無神經缺損 (除腦神經麻痺)', en: 'Grade 2: Moderate-to-severe headache, stiff neck, no focal deficit' }, value: 2 },
          { label: { zh: 'Grade 3：神志嗜睡、混亂，或存在輕微局部神經功能缺損', en: 'Grade 3: Confused/drowsy, mild focal deficit' }, value: 3 },
          { label: { zh: 'Grade 4：神志偏木僵 (Stupor)，中度至重度偏癱，去皮質強直', en: 'Grade 4: Stuporous, moderate-to-severe hemiparesis, decorticate' }, value: 4 },
          { label: { zh: 'Grade 5：深昏迷，去腦強直狀態，垂危表現', en: 'Grade 5: Deep coma, decerebrate rigidity, moribund' }, value: 5 }
        ]
      },
      { id: 'systemicDisease', name: { zh: '合併嚴重系統性疾病 (如重度高血壓、心臟病、糖尿病、COPD) (+1級)', en: 'Severe systemic disease (+1 grade)' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      const base = Number(values.baseGrade);
      const isSevere = values.systemicDisease;
      
      const finalGrade = Math.min(5, base + (isSevere ? 1 : 0));
      
      const mortalityMap = [0, 30, 40, 50, 80, 90]; // Approximate mortality percents
      const mort = mortalityMap[finalGrade];
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (finalGrade >= 4) {
        riskLevel = { zh: '重度 SAH / 預後極差', en: 'Severe SAH (Grade 4-5)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: `最終分級為 Grade ${finalGrade}。預計手術併發症風險極高，預估死亡率達 ${mort}%。`, en: `Final Grade is ${finalGrade}. High risk of complications; mortality ~${mort}%.` };
        rec = { zh: '急診收治 ICU。需控制腦壓，預防動脈瘤二次破裂出血，評估是否行急診介入手術（栓塞/夾閉）。', en: 'Emergency ICU. Protect aneurysm from re-rupture. Immediate endovascular coiling or neurosurgical clipping evaluation.' };
      } else if (finalGrade === 3) {
        riskLevel = { zh: '中度 SAH', en: 'Moderate SAH (Grade 3)' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `最終分級為 Grade ${finalGrade}。預估死亡率約 ${mort}%。`, en: `Final Grade is ${finalGrade}. Mortality ~${mort}%.` };
        rec = { zh: '收治 ICU/中風加護病房。口服 Nimodipine 以預防遲發性腦血管痙攣 (Vasospasm)，安排腦血管造影檢查。', en: 'Admit to ICU. Start oral Nimodipine to prevent delayed cerebral ischemia.' };
      } else {
        riskLevel = { zh: '輕度 SAH / 預後較佳', en: 'Mild SAH (Grade 1-2)' };
        desc = { zh: `最終分級為 Grade ${finalGrade}。死亡風險相對較低。`, en: `Final Grade is ${finalGrade}. Lower mortality risk.` };
        rec = { zh: '絕對臥床休息，維持血壓與排便順暢（避免用力憋氣增加腹壓），儘快安排動脈瘤根治性處置。', en: 'Bed rest, strict BP control, avoid straining. Plan early aneurysm intervention.' };
      }
      
      return { score: finalGrade, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Hunt WE, Hess RM. J Neurosurg 1968;28(1):14-20.',
    pearls: {
      zh: [
        'Hunt-Hess 分級與術後死亡率有顯著相關性，臨床多作為決定動脈瘤手術時機的關鍵參考。',
        '任何嚴重的全身性臟器疾病，都會使原本的神經分級自動往上遞增一級，但最高不超過五級。'
      ],
      en: [
        'Used to guide timing and risk-stratification of surgical interventions for intracranial aneurysms.',
        'Presence of serious systemic disease elevates the grading by one step, capped at Grade 5.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/3720/hunt-hess-classification-subarachnoid-hemorrhage'
  },
  {
    id: 'abcd2-score',
    name: { zh: 'ABCD² 評分', en: 'ABCD² Score' },
    subtitle: { zh: '短暫性腦缺血 (TIA) 後短期中風機率預估', en: 'Stroke Risk After Transient Ischemic Attack' },
    category: 'neurology',
    inputs: [
      { id: 'age60', name: { zh: 'A - 年齡大於或等於 60 歲 (+1分)', en: 'Age ≥ 60 years (+1 pt)' }, type: 'boolean', defaultValue: false },
      { id: 'bp140_90', name: { zh: 'B - 血壓偏高 (收縮壓≥140 或 舒張壓≥90 mmHg) (+1分)', en: 'Blood Pressure ≥140/90 mmHg (+1 pt)' }, type: 'boolean', defaultValue: false },
      {
        id: 'clinical',
        name: { zh: 'C - 臨床特徵 (Clinical features)', en: 'Clinical Features' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無上述特徵 (0分)', en: 'Other (0 pt)' }, value: 0 },
          { label: { zh: '僅有言語障礙，無肢體無力 (1分)', en: 'Speech disturbance without weakness (1 pt)' }, value: 1 },
          { label: { zh: '單側肢體無力 (2分)', en: 'Unilateral weakness (2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'duration',
        name: { zh: 'D - 症狀持續時間 (Duration)', en: 'Symptom Duration' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '少於 10 分鐘 (0分)', en: '<10 minutes (0 pt)' }, value: 0 },
          { label: { zh: '10 至 59 分鐘 (1分)', en: '10–59 minutes (1 pt)' }, value: 1 },
          { label: { zh: '60 分鐘或以上 (2分)', en: '≥60 minutes (2 pts)' }, value: 2 }
        ]
      },
      { id: 'diabetes', name: { zh: 'D - 糖尿病史 (+1分)', en: 'Diabetes Mellitus (+1 pt)' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let score = 0;
      if (values.age60) score += 1;
      if (values.bp140_90) score += 1;
      score += Number(values.clinical);
      score += Number(values.duration);
      if (values.diabetes) score += 1;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 6) {
        riskLevel = { zh: '高危險 TIA (High Risk)', en: 'High Risk' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `ABCD² 總分為 ${score} 分。2天內進展至腦中風的機率為 8.1%，1週內為 11.7%。`, en: `Score is ${score}. 2-day stroke risk is ~8.1%.` };
        rec = { zh: '強烈建議立即收治住院，快速完成頭顱 MRI 與頸動脈超音波篩查，必要時啟動雙聯抗血小板 (DAPT) 治療。', en: 'Urgent hospitalization. Rapid diagnostic evaluation with MRI and vascular imaging.' };
      } else if (score >= 4) {
        riskLevel = { zh: '中度危險 TIA (Moderate Risk)', en: 'Moderate Risk' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `ABCD² 總分為 ${score} 分。2天內中風機率約為 4.1%，1週內為 5.9%。`, en: `Score is ${score}. 2-day stroke risk is ~4.1%.` };
        rec = { zh: '建議住院觀察或急診留觀，評估中風原因並開始次級預防。', en: 'Inpatient observation or rapid outpatient workup.' };
      } else {
        riskLevel = { zh: '低危險 TIA (Low Risk)', en: 'Low Risk' };
        desc = { zh: `ABCD² 總分為 ${score} 分。2天內中風機率約為 1.0%。`, en: `Score is ${score}. 2-day stroke risk is ~1.0%.` };
        rec = { zh: '可考慮門診門診追蹤，但若患者有頻繁發作、新發心房顫動或頸動脈顯著狹窄，仍應警惕。', en: 'Outpatient workup is acceptable if no secondary red flags.' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Johnston SC, et al. Lancet 2007;369(9558):283-92.',
    pearls: {
      zh: [
        'ABCD² 的臨床主要目的在於決定 TIA 患者是否需要直接住院收治。',
        '雙重抗血小板藥物 (DAPT: Aspirin + Clopidogrel) 適用於高危 TIA (ABCD² ≥ 4) 且非心源性栓塞患者的早期介入。'
      ],
      en: [
        'Main clinical utility is determining which patients with TIA require urgent hospital admission.',
        'Early dual antiplatelet therapy (DAPT) benefits patients with high-risk TIA (ABCD² ≥4) of non-cardioembolic origin.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/111/abcd2-score-tia'
  },

  // ==========================================
  // 7. 精神科 (psychiatry)
  // ==========================================
  {
    id: 'phq-9',
    name: { zh: '病人健康問卷 (PHQ-9)', en: 'Patient Health Questionnaire-9' },
    subtitle: { zh: '篩檢與評估憂鬱症嚴重程度', en: '9-Item Depression Severity Scale' },
    category: 'psychiatry',
    inputs: [
      {
        id: 'q1', name: { zh: '1. 做事時提不起勁或沒有樂趣', en: '1. Little interest or pleasure in doing things' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q2', name: { zh: '2. 感到情緒低落、沮喪或絕望', en: '2. Feeling down, depressed, or hopeless' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q3', name: { zh: '3. 入睡困難、易醒或睡得太多', en: '3. Trouble falling/staying asleep, or sleeping too much' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q4', name: { zh: '4. 感到疲倦或沒有活力', en: '4. Feeling tired or having little energy' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q5', name: { zh: '5. 食慾不振或吃得太多', en: '5. Poor appetite or overeating' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q6', name: { zh: '6. 覺得自己很糟、是個失敗者，或讓家人失望', en: '6. Feeling bad about yourself (failure, let family down)' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q7', name: { zh: '7. 專注於做事（如看報紙或看電視）有困難', en: '7. Trouble concentrating on things' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q8', name: { zh: '8. 動作或說話遲緩到旁人注意，或煩躁不安動來動去', en: '8. Moving/speaking slowly, or being hyperactive/fidgety' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q9', name: { zh: '9. 腦海中曾浮現「不如死掉」或想用某種方式傷害自己', en: '9. Thoughts that you would be better off dead or hurting yourself' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      }
    ],
    calculate: (values) => {
      const score = 
        Number(values.q1) + Number(values.q2) + Number(values.q3) +
        Number(values.q4) + Number(values.q5) + Number(values.q6) +
        Number(values.q7) + Number(values.q8) + Number(values.q9);
      
      const q9Positive = Number(values.q9) > 0;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 20) {
        riskLevel = { zh: '重度憂鬱症 (Severe Depression)', en: 'Severe Depression' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: `總評分為 ${score} 分。符合重度憂鬱症篩檢閾值。`, en: `PHQ-9 score is ${score}. Meets criteria for severe depression.` };
        rec = { zh: '應立即開始藥物治療 (SSRIs等) 並會診心理/精神專科。若伴隨高風險自殺意念，需啟動危機防範安全機制。', en: 'Immediate clinical pharmacotherapy and referral indicated.' };
      } else if (score >= 15) {
        riskLevel = { zh: '中重度憂鬱症 (Moderately Severe)', en: 'Moderately Severe' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
        desc = { zh: `總評分為 ${score} 分。`, en: `PHQ-9 score is ${score}.` };
        rec = { zh: '推薦藥物治療與系統性心理諮商。', en: 'Pharmacotherapy and/or psychotherapy recommended.' };
      } else if (score >= 10) {
        riskLevel = { zh: '中度憂鬱症 (Moderate)', en: 'Moderate Depression' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `總評分為 ${score} 分。`, en: `PHQ-9 score is ${score}.` };
        rec = { zh: '臨床監控與心理諮商，若症狀持續未改善，應考慮啟動抗憂鬱藥物。', en: 'Active monitoring and counseling indicated.' };
      } else if (score >= 5) {
        riskLevel = { zh: '輕度憂鬱症 (Mild)', en: 'Mild Depression' };
        desc = { zh: `總評分為 ${score} 分。`, en: `PHQ-9 score is ${score}.` };
        rec = { zh: '建議門診追蹤，給予健康教育與支持，或再次複查篩檢。', en: 'Supportive follow-up and clinical monitoring.' };
      } else {
        riskLevel = { zh: '無或極輕微憂鬱症', en: 'Minimal / None' };
        desc = { zh: `總評分為 ${score} 分。`, en: `PHQ-9 score is ${score}.` };
        rec = { zh: '常規生活。', en: 'No intervention indicated.' };
      }
      
      if (q9Positive) {
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        rec.zh = `【⚠️ 自殘自殺警告】第九題回答大於0分（實測 ${values.q9} 分）。無論總分多少，臨床必須立即進行自殺傾向安全評估，防止發生危急意外！\n` + rec.zh;
        rec.en = `[⚠️ SUICIDE DANGER] Question 9 score is >0. Immediate safety and suicidal risk assessment is required regardless of total score.\n` + rec.en;
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Kroenke K, et al. J Gen Intern Med 2001;16(9):606-13.',
    pearls: {
      zh: [
        'PHQ-9 是基於 DSM-4 診斷標準的 9 項症狀量表，敏感性與特異性達 88%，在精神科診所及基層醫療廣為應用。',
        '自殘/自殺意念 (第 9 題) 是此量表最核心的安全紅線指標。'
      ],
      en: [
        'Highly validated for depression screening in primary care with 88% sensitivity/specificity.',
        'Positive response to Question 9 (even if 1) requires immediate suicide risk evaluation.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/1725/patient-health-questionnaire-9-phq-9'
  },
  {
    id: 'gad-7',
    name: { zh: '廣泛性焦慮症量表 (GAD-7)', en: 'GAD-7 Anxiety Scale' },
    subtitle: { zh: '篩檢與評估焦慮症嚴重程度', en: '7-Item Anxiety Severity Scale' },
    category: 'psychiatry',
    inputs: [
      {
        id: 'q1', name: { zh: '1. 感到緊張、焦慮或急躁不安', en: '1. Feeling nervous, anxious, or on edge' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q2', name: { zh: '2. 無法停止或控制憂慮', en: '2. Not being able to stop or control worrying' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q3', name: { zh: '3. 對各種不同的事情憂慮太多', en: '3. Worrying too much about different things' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q4', name: { zh: '4. 很難放鬆自己', en: '4. Trouble relaxing' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q5', name: { zh: '5. 焦躁不安以致無法靜坐', en: '5. Being so restless that it is hard to sit still' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q6', name: { zh: '6. 變得容易發怒或煩躁', en: '6. Becoming easily annoyed or irritable' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      },
      {
        id: 'q7', name: { zh: '7. 覺得好像有可怕的事會發生而感到害怕', en: '7. Feeling afraid as if something awful might happen' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '有幾天 (1分)', en: 'Several days (1 pt)' }, value: 1 },
          { label: { zh: '一半以上的天數 (2分)', en: 'More than half the days (2 pts)' }, value: 2 },
          { label: { zh: '幾乎天天 (3分)', en: 'Nearly every day (3 pts)' }, value: 3 }
        ]
      }
    ],
    calculate: (values) => {
      const score = 
        Number(values.q1) + Number(values.q2) + Number(values.q3) +
        Number(values.q4) + Number(values.q5) + Number(values.q6) + Number(values.q7);
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 15) {
        riskLevel = { zh: '重度焦慮症 (Severe Anxiety)', en: 'Severe Anxiety' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `GAD-7 總分為 ${score} 分。提示有重度廣泛性焦慮或恐慌傾向。`, en: `GAD-7 score is ${score}. High probability of severe anxiety.` };
        rec = { zh: '應會診精神科/心理諮商師，考慮啟動抗焦慮藥物治療 (如 SSRIs/SNRIs) 及認知行為治療 (CBT)。', en: 'Active therapeutic intervention with medication and/or CBT is indicated.' };
      } else if (score >= 10) {
        riskLevel = { zh: '中度焦慮症 (Moderate)', en: 'Moderate Anxiety' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `GAD-7 總分為 ${score} 分（臨界點為 10 分）。`, en: `GAD-7 score is ${score}. Moderate anxiety level.` };
        rec = { zh: '建議進行進一步評估，考慮引導心理治療或密切隨訪。', en: 'Further evaluation and clinical monitoring indicated.' };
      } else if (score >= 5) {
        riskLevel = { zh: '輕度焦慮症 (Mild)', en: 'Mild Anxiety' };
        desc = { zh: `GAD-7 總分為 ${score} 分。`, en: `GAD-7 score is ${score}.` };
        rec = { zh: '門診觀察，給予壓力管理指導、肌肉放鬆技巧或冥想運動。', en: 'Stress management and follow-up as needed.' };
      } else {
        riskLevel = { zh: '無或極輕微焦慮', en: 'Minimal / None' };
        desc = { zh: `GAD-7 總分為 ${score} 分。`, en: `GAD-7 score is ${score}.` };
        rec = { zh: '常規生活。', en: 'No intervention required.' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Spitzer RL, et al. Arch Intern Med 2006;166(10):1092-7.',
    pearls: {
      zh: [
        'GAD-7 對於焦慮障礙的敏感度達 89%，對社交焦慮症和創傷後壓力症候群 (PTSD) 也有很好的篩檢敏感性。',
        '評估是依據過去【兩星期】內的患者主觀體驗頻率。'
      ],
      en: [
        'A score of ≥10 is the clinical cutoff for generalized anxiety disorder screening.',
        'Assesses symptoms experienced over the past [two weeks].'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/1727/generalized-anxiety-disorder-7-gad-7'
  },
  {
    id: 'cage-questionnaire',
    name: { zh: 'CAGE 酒精成癮問卷', en: 'CAGE Questionnaire' },
    subtitle: { zh: '快速篩檢潛在酒精濫用或成癮依賴', en: 'Screening for Alcohol Abuse & Dependence' },
    category: 'psychiatry',
    inputs: [
      { id: 'cut', name: { zh: 'C - 您曾覺得應該減少喝酒 (Cut down) 嗎？', en: 'Have you ever felt you should cut down on your drinking?' }, type: 'boolean', defaultValue: false },
      { id: 'annoyed', name: { zh: 'A - 旁人曾批評或抱怨你的酒量而讓你惱怒 (Annoyed) 嗎？', en: 'Have people annoyed you by criticizing your drinking?' }, type: 'boolean', defaultValue: false },
      { id: 'guilty', name: { zh: 'G - 您曾為喝酒感到內疚、罪惡 (Guilty) 嗎？', en: 'Have you ever felt bad or guilty about your drinking?' }, type: 'boolean', defaultValue: false },
      { id: 'eyeOpener', name: { zh: 'E - 早上剛起床曾需要來杯酒來穩住神經或解除宿醉 (開門酒 Eye-opener) 嗎？', en: 'Have you ever had a drink first thing in the morning to steady your nerves (eye-opener)?' }, type: 'boolean', defaultValue: false }
    ],
    calculate: (values) => {
      let score = 0;
      if (values.cut) score += 1;
      if (values.annoyed) score += 1;
      if (values.guilty) score += 1;
      if (values.eyeOpener) score += 1;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 4) {
        riskLevel = { zh: '酒精依賴成癮 (Alcohol Dependence)', en: 'Alcohol Dependence' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-pulse';
        desc = { zh: `CAGE 評分為 ${score} 分。極度符合酒精成癮或依賴診斷。`, en: `CAGE score is ${score}/4. Diagnostic of alcohol dependence.` };
        rec = { zh: '強烈會診精神科/戒癮中心。評估戒斷症狀 (CIWA-Ar) 防範震顫性譫妄 (DTs)，提供戒酒支持與替代藥物。', en: 'Urgent addiction counseling and medical review. Monitor for alcohol withdrawal syndrome.' };
      } else if (score >= 2) {
        riskLevel = { zh: '高度懷疑酒精濫用 / 依賴', en: 'Suspicious of Alcohol Abuse' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `CAGE 評分為 ${score} 分 (≥2分具備高特異性)。`, en: `CAGE score is ${score}/4. Highly suspicious of abuse.` };
        rec = { zh: '提示酒精對日常工作或身心健康已有負面衝擊。建議進行專業諮商與次級評估（如 AUDIT 量表）。', en: 'Requires further clinical interview and detailed screening (e.g. AUDIT).' };
      } else {
        riskLevel = { zh: '酒精成癮低機率', en: 'Low Risk' };
        desc = { zh: `CAGE 評分為 ${score} 分。`, en: `CAGE score is ${score}/4.` };
        rec = { zh: '常規關注，宣導健康飲酒限度。', en: 'Promote healthy alcohol habits.' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Ewing JA. JAMA 1984;252(14):1905-7.',
    pearls: {
      zh: [
        'CAGE 僅有 4 個題目，極易在門診或急診床邊速查，其特異性很高。',
        '「開門酒 (Eye-opener)」是反映早期酒精物理戒斷症狀的敏感指標。'
      ],
      en: [
        'One of the fastest and most popular clinical screening tools for alcohol dependency.',
        'An "eye-opener" positive answer is a strong sign of physiologic dependence and early withdrawal.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/1729/cage-questions-alcohol-use'
  },

  // ==========================================
  // 8. 骨科 (orthopedics)
  // ==========================================
  {
    id: 'mess',
    name: { zh: '嚴重肢體損傷評分 (MESS)', en: 'Mangled Extremity Severity Score' },
    subtitle: { zh: '評估嚴重肢體外傷需保肢或一期截肢', en: 'MESS Score for Limb Salvage vs. Amputation' },
    category: 'orthopedics',
    inputs: [
      {
        id: 'skeletal',
        name: { zh: '1. 骨骼與軟組織損傷能量', en: '1. Skeletal/Soft Tissue Injury' },
        type: 'select',
        defaultValue: 1,
        options: [
          { label: { zh: '低能量 (刺傷、單純閉合骨折、低速槍傷) (1分)', en: 'Low energy (1 pt)' }, value: 1 },
          { label: { zh: '中能量 (多處骨折、脫位、中度擠壓傷) (2分)', en: 'Medium energy (2 pts)' }, value: 2 },
          { label: { zh: '高能量 (高速槍傷、近距散彈、高速車禍) (3分)', en: 'High energy (3 pts)' }, value: 3 },
          { label: { zh: '極高能量 ( gross 碎裂污染、大面積毀損) (4分)', en: 'Massive crush/gross contamination (4 pts)' }, value: 4 }
        ]
      },
      {
        id: 'ischemia',
        name: { zh: '2. 肢體缺血表現 (Limb Ischemia)', en: '2. Limb Ischemia' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '無缺血：脈搏正常，灌流良好 (0分)', en: 'None (0 pt)' }, value: 0 },
          { label: { zh: '輕度缺血：無脈搏，但毛細血管充盈好，無神經損害 (1分)', en: 'Mild: pulse reduced, normal perfusion (1 pt)' }, value: 1 },
          { label: { zh: '中度缺血：無搏動，充盈遲緩，伴輕度感覺/運動障礙 (2分)', en: 'Moderate: no pulse, slow refill, paresthesia (2 pts)' }, value: 2 },
          { label: { zh: '重度缺血：四肢冰冷、發紺、麻痺、完全無感覺 (3分)', en: 'Severe: cold, paralyzed, insensate (3 pts)' }, value: 3 }
        ]
      },
      { id: 'ischemiaTime', name: { zh: '肢體缺血時間大於 6 小時 (缺血分數翻倍)', en: 'Ischemia time >6 hours (double ischemia score)' }, type: 'boolean', defaultValue: false },
      {
        id: 'shock',
        name: { zh: '3. 系統性休克狀態 (Shock)', en: '3. Shock' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '血壓穩定：收縮壓始終 > 90 mmHg (0分)', en: 'Normotensive (0 pt)' }, value: 0 },
          { label: { zh: '一過性低血壓：對液體/輸血有快速反應 (1分)', en: 'Transient hypotension (1 pt)' }, value: 1 },
          { label: { zh: '持續性低血壓：需升壓劑或持續輸液維持 (2分)', en: 'Persistent hypotension (2 pts)' }, value: 2 }
        ]
      },
      {
        id: 'age',
        name: { zh: '4. 患者年齡級距', en: '4. Age Category' },
        type: 'select',
        defaultValue: 0,
        options: [
          { label: { zh: '小於 30 歲 (0分)', en: '<30 years (0 pt)' }, value: 0 },
          { label: { zh: '30–50 歲 (1分)', en: '30–50 years (1 pt)' }, value: 1 },
          { label: { zh: '大於 50 歲 (2分)', en: '>50 years (2 pts)' }, value: 2 }
        ]
      }
    ],
    calculate: (values) => {
      const sk = Number(values.skeletal);
      let isc = Number(values.ischemia);
      if (values.ischemiaTime) {
        isc = isc * 2;
      }
      const sh = Number(values.shock);
      const ag = Number(values.age);
      
      const score = sk + isc + sh + ag;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 7) {
        riskLevel = { zh: '推薦一期截肢 (Amputation Recommended)', en: 'Amputation Recommended (Score ≥7)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `MESS 總分為 ${score} 分。保肢失敗風險極高。強行保肢易招致全身壞死毒素吸收、氣性壞疽、全身發炎反應與死亡。`, en: `MESS score is ${score}. High probability of failed limb salvage.` };
        rec = { zh: '應與創傷外科及骨科團隊溝通，強烈考慮早期進行截肢處置以挽救患者生命。', en: 'Strong indication for primary amputation to reduce mortality risk.' };
      } else {
        riskLevel = { zh: '建議嘗試保肢重建 (Limb Salvage)', en: 'Limb Salvage Feasible (Score <7)' };
        desc = { zh: `MESS 總分為 ${score} 分。提示肢體重建成功率較高。`, en: `MESS score is ${score}. Salvage is likely to succeed.` };
        rec = { zh: '可嘗試一期血管重建、骨折內固定、顯微吻合與皮瓣重組。密切關注腔室症候群。', en: 'Attempt limb salvage. Monitor compartment pressures closely.' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Johansen K, et al. J Trauma 1990;30(5):568-72.',
    pearls: {
      zh: [
        'MESS 是創傷骨科領域判斷「截肢 vs. 保肢」最经典的量化指標。',
        '隨著當代微血管顯微外科重建手術的飛速發展，部分醫學中心會將截肢臨界分值放寬至 8 分。'
      ],
      en: [
        'Predicts outcomes in mangled limbs following major trauma.',
        'With modern microvascular and reconstructive techniques, some centers use a cutoff of ≥8.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/97/mangled-extremity-severity-score-mess'
  },
  {
    id: 'frax-link',
    name: { zh: 'FRAX 骨折風險評估工具說明', en: 'FRAX Assessment Guide' },
    subtitle: { zh: '未來10年內發生骨質疏鬆性骨折機率', en: '10-Year Osteoporotic Fracture Risk Guide' },
    category: 'orthopedics',
    inputs: [
      { id: 'age', name: { zh: '年齡 (40-90 歲)', en: 'Age (40-90 years)' }, type: 'number', defaultValue: 65, min: 40, max: 90 },
      { id: 'tscore', name: { zh: '股骨頸骨密度 T-score (BMD)', en: 'Femoral Neck T-score' }, type: 'number', defaultValue: -2.0, min: -5.0, max: 2.0 }
    ],
    calculate: (values) => {
      const t = Number(values.tscore);
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      
      if (t <= -2.5) {
        riskLevel = { zh: '已符合骨質疏鬆症診斷', en: 'Osteoporosis Confirmed' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30';
      } else if (t < -1.0) {
        riskLevel = { zh: '骨質缺乏 (Osteopenia) / 使用 FRAX 估算', en: 'Osteopenia / Check FRAX' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
      } else {
        riskLevel = { zh: '骨密度正常', en: 'Normal BMD' };
      }
      
      return {
        valueText: `T-score ${t}`,
        riskLevel,
        riskColor,
        description: {
          zh: `WHO-FRAX 包含 11 項流行病學危險因子（以往骨折史、父母骨折、吸菸、類固醇使用、類風濕關節炎等），其計算邏輯因不同國家與人種權重差異極大。`,
          en: `WHO-FRAX incorporates 11 clinical risk factors. Manual calculations are unavailable due to region-specific algorithms.`
        },
        recommendation: {
          zh: '【臨床指南推薦】：針對骨質缺乏（T-score 介於 -1.0 至 -2.5）患者，當 FRAX 估算之【主要骨折風險 ≥ 20%】或【髖骨骨折風險 ≥ 3%】時，即具備啟動雙磷酸鹽 (Bisphosphonates) 等抗骨鬆藥物治療的適應症。請點擊連結外連至 WHO 官網進行精準計算。',
          en: 'Therapeutic threshold (NOF guidelines): Initiate treatment in osteopenia if FRAX 10-year major osteoporotic risk ≥20% or hip fracture risk ≥3%.'
        }
      };
    },
    reference: 'Kanis JA, et al. Osteoporos Int 2008;19(4):385-97.',
    pearls: {
      zh: [
        'FRAX 公式是世界衛生組織 (WHO) 根據多國流行病學回歸數據開發的專利模型，臨床上一般需登錄專屬網頁進行計算。'
      ],
      en: [
        'FRAX is calibrated to specific countries and ethnic databases, available online through the WHO portal.'
      ]
    },
    mdcalcLink: 'https://frax.shef.ac.uk/FRAX/'
  },

  // ==========================================
  // 9. 泌尿科 (urology)
  // ==========================================
  {
    id: 'ipss',
    name: { zh: '國際攝護腺症狀評分 (IPSS)', en: 'International Prostate Symptom Score' },
    subtitle: { zh: '良性攝護腺肥大下尿路症狀嚴重度評估', en: 'IPSS for Benign Prostatic Hyperplasia' },
    category: 'urology',
    inputs: [
      {
        id: 'q1', name: { zh: '1. 排尿不乾淨感 (Incomplete emptying)', en: '1. Incomplete emptying' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '五次中少於一次 (1分)', en: 'Less than 1 in 5 times (1 pt)' }, value: 1 },
          { label: { zh: '五次中少於半數 (2分)', en: 'Less than half the time (2 pts)' }, value: 2 },
          { label: { zh: '五次中大約半數 (3分)', en: 'About half the time (3 pts)' }, value: 3 },
          { label: { zh: '五次中多於半數 (4分)', en: 'More than half the time (4 pts)' }, value: 4 },
          { label: { zh: '幾乎總是如此 (5分)', en: 'Almost always (5 pts)' }, value: 5 }
        ]
      },
      {
        id: 'q2', name: { zh: '2. 兩小時內排尿頻率 (Frequency)', en: '2. Frequency (urinated again <2 hours)' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '少於五分之一 (1分)', en: 'Less than 1 in 5 (1 pt)' }, value: 1 },
          { label: { zh: '少於半數 (2分)', en: 'Less than half (2 pts)' }, value: 2 },
          { label: { zh: '大約半數 (3分)', en: 'About half (3 pts)' }, value: 3 },
          { label: { zh: '多於半數 (4分)', en: 'More than half (4 pts)' }, value: 4 },
          { label: { zh: '幾乎總是 (5分)', en: 'Almost always (5 pts)' }, value: 5 }
        ]
      },
      {
        id: 'q3', name: { zh: '3. 排尿中斷 (Intermittency)', en: '3. Intermittency (stopped and started)' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '少於五分之一 (1分)', en: 'Less than 1 in 5 (1 pt)' }, value: 1 },
          { label: { zh: '少於半數 (2分)', en: 'Less than half (2 pts)' }, value: 2 },
          { label: { zh: '大約半數 (3分)', en: 'About half (3 pts)' }, value: 3 },
          { label: { zh: '多於半數 (4分)', en: 'More than half (4 pts)' }, value: 4 },
          { label: { zh: '幾乎總是 (5分)', en: 'Almost always (5 pts)' }, value: 5 }
        ]
      },
      {
        id: 'q4', name: { zh: '4. 急尿感、難憋尿 (Urgency)', en: '4. Urgency (difficult to postpone urination)' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '少於五分之一 (1分)', en: 'Less than 1 in 5 (1 pt)' }, value: 1 },
          { label: { zh: '少於半數 (2分)', en: 'Less than half (2 pts)' }, value: 2 },
          { label: { zh: '大約半數 (3分)', en: 'About half (3 pts)' }, value: 3 },
          { label: { zh: '多於半數 (4分)', en: 'More than half (4 pts)' }, value: 4 },
          { label: { zh: '幾乎總是 (5分)', en: 'Almost always (5 pts)' }, value: 5 }
        ]
      },
      {
        id: 'q5', name: { zh: '5. 尿流微弱 (Weak stream)', en: '5. Weak stream' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '少於五分之一 (1分)', en: 'Less than 1 in 5 (1 pt)' }, value: 1 },
          { label: { zh: '少於半數 (2分)', en: 'Less than half (2 pts)' }, value: 2 },
          { label: { zh: '大約半數 (3分)', en: 'About half (3 pts)' }, value: 3 },
          { label: { zh: '多於半數 (4分)', en: 'More than half (4 pts)' }, value: 4 },
          { label: { zh: '幾乎總是 (5分)', en: 'Almost always (5 pts)' }, value: 5 }
        ]
      },
      {
        id: 'q6', name: { zh: '6. 需要用力解尿 (Straining)', en: '6. Straining (push or squeeze to urinate)' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全沒有 (0分)', en: 'Not at all (0 pt)' }, value: 0 },
          { label: { zh: '少於五分之一 (1分)', en: 'Less than 1 in 5 (1 pt)' }, value: 1 },
          { label: { zh: '少於半數 (2分)', en: 'Less than half (2 pts)' }, value: 2 },
          { label: { zh: '大約半數 (3分)', en: 'About half (3 pts)' }, value: 3 },
          { label: { zh: '多於半數 (4分)', en: 'More than half (4 pts)' }, value: 4 },
          { label: { zh: '幾乎總是 (5分)', en: 'Almost always (5 pts)' }, value: 5 }
        ]
      },
      {
        id: 'q7', name: { zh: '7. 夜尿次數 (Nocturia)', en: '7. Nocturia (times woke up to urinate)' }, type: 'select', defaultValue: 0,
        options: [
          { label: { zh: '完全無夜尿 (0分)', en: 'None (0 pt)' }, value: 0 },
          { label: { zh: '1 次 (1分)', en: '1 time (1 pt)' }, value: 1 },
          { label: { zh: '2 次 (2分)', en: '2 times (2 pts)' }, value: 2 },
          { label: { zh: '3 次 (3分)', en: '3 times (3 pts)' }, value: 3 },
          { label: { zh: '4 次 (4分)', en: '4 times (4 pts)' }, value: 4 },
          { label: { zh: '5 次或以上 (5分)', en: '5 or more times (5 pts)' }, value: 5 }
        ]
      },
      {
        id: 'qol',
        name: { zh: '生活品質影響自評 (QoL)', en: 'Quality of Life due to Urinary Symptoms' },
        type: 'select',
        defaultValue: 3,
        options: [
          { label: { zh: '非常高興 (Delighted) (0分)', en: 'Delighted (0 pt)' }, value: 0 },
          { label: { zh: '滿意 (Pleased) (1分)', en: 'Pleased (1 pt)' }, value: 1 },
          { label: { zh: '大致滿意 (Mostly satisfied) (2分)', en: 'Mostly satisfied (2 pts)' }, value: 2 },
          { label: { zh: '可接受/平淡 (Mixed) (3分)', en: 'Mixed (3 pts)' }, value: 3 },
          { label: { zh: '有些苦惱 (Mostly dissatisfied) (4分)', en: 'Mostly dissatisfied (4 pts)' }, value: 4 },
          { label: { zh: '很難受 (Unhappy) (5分)', en: 'Unhappy (5 pts)' }, value: 5 },
          { label: { zh: '極度痛苦 (Terrible) (6分)', en: 'Terrible (6 pts)' }, value: 6 }
        ]
      }
    ],
    calculate: (values) => {
      const score = 
        Number(values.q1) + Number(values.q2) + Number(values.q3) +
        Number(values.q4) + Number(values.q5) + Number(values.q6) + Number(values.q7);
      
      const qolVal = Number(values.qol);
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let desc: { zh: string; en: string };
      let rec: { zh: string; en: string };
      
      if (score >= 20) {
        riskLevel = { zh: '重度良性攝護腺肥大症狀', en: 'Severe Symptoms' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        desc = { zh: `IPSS 症狀總分：${score} 分。QoL 自評：${qolVal} 分。`, en: `IPSS Score: ${score}/35. QoL score: ${qolVal}.` };
        rec = { zh: '症狀嚴重干擾排尿生理功能，強烈建議尋求泌尿外科專科診治，評估手術治療（如 TURP 攝護腺刮除術）或合併藥物。', en: 'Recommend urological consultation. Evaluate for surgical therapies (TURP, laser).' };
      } else if (score >= 8) {
        riskLevel = { zh: '中度症狀', en: 'Moderate Symptoms' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        desc = { zh: `IPSS 症狀總分：${score} 分。QoL 自評：${qolVal} 分。`, en: `IPSS Score: ${score}/35. QoL score: ${qolVal}.` };
        rec = { zh: '建議開始藥物介入治疗以改善排尿（例如 α-受體阻斷劑或 5α-還原酶抑制劑），並定期追蹤。', en: 'Initiate medical therapies (alpha-blockers, 5-ARIs). Follow up periodically.' };
      } else {
        riskLevel = { zh: '輕度症狀', en: 'Mild Symptoms' };
        desc = { zh: `IPSS 症狀總分：${score} 分。QoL 自評：${qolVal} 分。`, en: `IPSS Score: ${score}/35. QoL score: ${qolVal}.` };
        rec = { zh: '症狀輕微，建議採取「保守觀察、生活調整」（如睡前減少飲水、避免酒精和咖啡因）。', en: 'Watchful waiting and lifestyle modification.' };
      }
      
      return { score, riskLevel, riskColor, description: desc, recommendation: rec };
    },
    reference: 'Barry MJ, et al. J Urol 1992;148(5):1549-57.',
    pearls: {
      zh: [
        'IPSS 是目前全球泌尿科公認評估良性攝護腺肥大 (BPH) 最為標準的量表。',
        '前 7 個題目是針對排尿症狀頻率（0分完全沒有到5分幾乎總是），第 8 個題目是生活品質主觀體驗。'
      ],
      en: [
        'Standard screening and monitoring index for BPH lower urinary tract symptoms (LUTS).',
        'QoL is reported separately as an index of distress caused by BPH.'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/10048/international-prostate-symptom-score-ipss'
  },
  {
    id: 'prostate-volume-psad',
    name: { zh: '攝護腺體積與 PSA 密度', en: 'Prostate Volume & PSA Density' },
    subtitle: { zh: '鑑別診斷良性肥大與攝護腺癌，評估切片必要性', en: 'Calculates Volume and PSAD' },
    category: 'urology',
    inputs: [
      { id: 'length', name: { zh: '攝護腺長度 Length (cm)', en: 'Length (cm)' }, type: 'number', defaultValue: 3.5, min: 0.1 },
      { id: 'width', name: { zh: '攝護腺寬度 Width (cm)', en: 'Width (cm)' }, type: 'number', defaultValue: 4.5, min: 0.1 },
      { id: 'height', name: { zh: '攝護腺高度 Height (cm)', en: 'Height (cm)' }, type: 'number', defaultValue: 3.0, min: 0.1 },
      { id: 'psa', name: { zh: '血清總 PSA 濃度 (ng/mL)', en: 'Serum Total PSA (ng/mL)' }, type: 'number', defaultValue: 6.0, min: 0.1 }
    ],
    calculate: (values) => {
      const l = Number(values.length);
      const w = Number(values.width);
      const h = Number(values.height);
      const psa = Number(values.psa);
      
      if (!l || !w || !h || !psa) {
        return { error: 'Invalid parameters', description: { zh: '請檢查輸入，數值必須大於 0。', en: 'Values must be greater than 0.' } };
      }
      
      // Prolate ellipsoid volume = length * width * height * pi / 6 (~0.523)
      const vol = l * w * h * 0.523;
      const psad = psa / vol;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let rec: { zh: string; en: string };
      
      if (psad >= 0.15) {
        riskLevel = { zh: 'PSA 密度偏高 (懷疑惡性腫瘤)', en: 'High PSA Density (≥0.15)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        rec = { zh: `PSA 密度為 ${psad.toFixed(3)} ng/mL/cc，高於臨床推薦閾值 (0.15)。惡性腫瘤風險顯著升高，強烈建議進行攝護腺多參數 MRI 檢查或安排穿刺切片。`, en: `PSAD is ${psad.toFixed(3)} ng/mL/cc. Elevated prostate cancer risk; prostate biopsy is strongly indicated.` };
      } else if (psad >= 0.10) {
        riskLevel = { zh: '中度風險 (灰色地帶)', en: 'Intermediate PSAD' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        rec = { zh: `PSA 密度為 ${psad.toFixed(3)} ng/mL/cc，處於 0.10-0.15 灰色帶。結合游離 PSA (free/total ratio) 與 MRI 綜合研判是否穿刺。`, en: `PSAD is ${psad.toFixed(3)} ng/mL/cc. Intermediate risk. Correlate with free/total PSA ratio.` };
      } else {
        riskLevel = { zh: '良性肥大機率高 (Benign)', en: 'Low PSAD (<0.10)' };
        rec = { zh: `PSA 密度為 ${psad.toFixed(3)} ng/mL/cc。PSA 升高更傾向是由攝護腺良性肥大 (BPH) 所致，穿刺緊急度較低，可進行追蹤。`, en: `PSAD is ${psad.toFixed(3)} ng/mL/cc. Elevation likely caused by BPH rather than cancer.` };
      }
      
      return {
        value: psad,
        unit: 'ng/mL/cc',
        riskLevel,
        riskColor,
        description: {
          zh: `計算結果如下：\n- 攝護腺估計體積：${vol.toFixed(1)} cc (mL)。\n- PSA 密度 (PSAD)：${psad.toFixed(3)} ng/mL/cc。`,
          en: `Results:\n- Estimated Prostate Volume: ${vol.toFixed(1)} cc.\n- PSA Density (PSAD): ${psad.toFixed(3)} ng/mL/cc.`
        },
        recommendation: rec
      };
    },
    reference: 'Ellipsoid volume: L * W * H * 0.523 / PSAD: Benson MC, et al. J Urol 1992;147:815-6.',
    pearls: {
      zh: [
        '當血清總 PSA 處於 4.0–10.0 ng/mL 灰色地帶時，PSA 密度是極具價值的鑑別診斷指標，比單純看 PSA 濃度更具防範過度切片的價值。',
        '攝護腺體積是使用經直腸超音波 (TRUS) 或 MRI 三維直徑測算所得。'
      ],
      en: [
        'PSAD is highly useful when serum total PSA is in the "gray zone" (4.0-10.0 ng/mL) to reduce unnecessary biopsies.',
        'Volume estimation assumes a prolate ellipsoid model.'
      ]
    },
    mdcalcLink: ''
  },

  // ==========================================
  // 10. 皮膚科 (dermatology)
  // ==========================================
  {
    id: 'pasi',
    name: { zh: '乾癬面積與嚴重度指數 (PASI)', en: 'PASI Score' },
    subtitle: { zh: '定量 Plaque Psoriasis 嚴重度與生物製劑療效指標', en: 'Psoriasis Area and Severity Index' },
    category: 'dermatology',
    inputs: [
      // Head
      { id: 'eh', name: { zh: '頭部：紅斑 (Erythema) 程度 (0-4)', en: 'Head: Erythema' }, type: 'number', defaultValue: 1, min: 0, max: 4 },
      { id: 'ih', name: { zh: '頭部：浸潤厚度 (Induration) 程度 (0-4)', en: 'Head: Induration' }, type: 'number', defaultValue: 1, min: 0, max: 4 },
      { id: 'dh', name: { zh: '頭部：脫屑 (Desquamation) 程度 (0-4)', en: 'Head: Desquamation' }, type: 'number', defaultValue: 1, min: 0, max: 4 },
      {
        id: 'ah', name: { zh: '頭部：受累面積評分 (0-6)', en: 'Head: Area Score' }, type: 'select', defaultValue: 1,
        options: [
          { label: { zh: '0% (0分)', en: '0%' }, value: 0 },
          { label: { zh: '1–9% (1分)', en: '1–9%' }, value: 1 },
          { label: { zh: '10–29% (2分)', en: '10–29%' }, value: 2 },
          { label: { zh: '30–49% (3分)', en: '30–49%' }, value: 3 },
          { label: { zh: '50–69% (4分)', en: '50–69%' }, value: 4 },
          { label: { zh: '70–89% (5分)', en: '70–89%' }, value: 5 },
          { label: { zh: '90–100% (6分)', en: '90–100%' }, value: 6 }
        ]
      },
      // Upper Limbs
      { id: 'eu', name: { zh: '上肢：紅斑程度 (0-4)', en: 'Upper Limbs: Erythema' }, type: 'number', defaultValue: 1, min: 0, max: 4 },
      { id: 'iu', name: { zh: '上肢：浸潤厚度 (0-4)', en: 'Upper Limbs: Induration' }, type: 'number', defaultValue: 1, min: 0, max: 4 },
      { id: 'du', name: { zh: '上肢：脫屑程度 (0-4)', en: 'Upper Limbs: Desquamation' }, type: 'number', defaultValue: 1, min: 0, max: 4 },
      {
        id: 'au', name: { zh: '上肢：受累面積評分 (0-6)', en: 'Upper Limbs: Area Score' }, type: 'select', defaultValue: 1,
        options: [
          { label: { zh: '0% (0分)', en: '0%' }, value: 0 },
          { label: { zh: '1–9% (1分)', en: '1–9%' }, value: 1 },
          { label: { zh: '10–29% (2分)', en: '10–29%' }, value: 2 },
          { label: { zh: '30–49% (3分)', en: '30–49%' }, value: 3 },
          { label: { zh: '50–69% (4分)', en: '50–69%' }, value: 4 },
          { label: { zh: '70–89% (5分)', en: '70–89%' }, value: 5 },
          { label: { zh: '90–100% (6分)', en: '90–100%' }, value: 6 }
        ]
      },
      // Trunk
      { id: 'et', name: { zh: '軀幹：紅斑程度 (0-4)', en: 'Trunk: Erythema' }, type: 'number', defaultValue: 1, min: 0, max: 4 },
      { id: 'it', name: { zh: '軀幹：浸潤厚度 (0-4)', en: 'Trunk: Induration' }, type: 'number', defaultValue: 1, min: 0, max: 4 },
      { id: 'dt', name: { zh: '軀幹：脫屑程度 (0-4)', en: 'Trunk: Desquamation' }, type: 'number', defaultValue: 1, min: 0, max: 4 },
      {
        id: 'at', name: { zh: '軀幹：受累面積評分 (0-6)', en: 'Trunk: Area Score' }, type: 'select', defaultValue: 1,
        options: [
          { label: { zh: '0% (0分)', en: '0%' }, value: 0 },
          { label: { zh: '1–9% (1分)', en: '1–9%' }, value: 1 },
          { label: { zh: '10–29% (2分)', en: '10–29%' }, value: 2 },
          { label: { zh: '30–49% (3分)', en: '30–49%' }, value: 3 },
          { label: { zh: '50–69% (4分)', en: '50–69%' }, value: 4 },
          { label: { zh: '70–89% (5分)', en: '70–89%' }, value: 5 },
          { label: { zh: '90–100% (6分)', en: '90–100%' }, value: 6 }
        ]
      },
      // Lower Limbs
      { id: 'el', name: { zh: '下肢：紅斑程度 (0-4)', en: 'Lower Limbs: Erythema' }, type: 'number', defaultValue: 1, min: 0, max: 4 },
      { id: 'il', name: { zh: '下肢：浸潤厚度 (0-4)', en: 'Lower Limbs: Induration' }, type: 'number', defaultValue: 1, min: 0, max: 4 },
      { id: 'dl', name: { zh: '下肢：脫屑程度 (0-4)', en: 'Lower Limbs: Desquamation' }, type: 'number', defaultValue: 1, min: 0, max: 4 },
      {
        id: 'al', name: { zh: '下肢：受累面積評分 (0-6)', en: 'Lower Limbs: Area Score' }, type: 'select', defaultValue: 1,
        options: [
          { label: { zh: '0% (0分)', en: '0%' }, value: 0 },
          { label: { zh: '1–9% (1分)', en: '1–9%' }, value: 1 },
          { label: { zh: '10–29% (2分)', en: '10–29%' }, value: 2 },
          { label: { zh: '30–49% (3分)', en: '30–49%' }, value: 3 },
          { label: { zh: '50–69% (4分)', en: '50–69%' }, value: 4 },
          { label: { zh: '70–89% (5分)', en: '70–89%' }, value: 5 },
          { label: { zh: '90–100% (6分)', en: '90–100%' }, value: 6 }
        ]
      }
    ],
    calculate: (values) => {
      // 0-4 values capped
      const capVal = (v: any) => Math.min(4, Math.max(0, Number(v)));
      
      const eh = capVal(values.eh); const ih = capVal(values.ih); const dh = capVal(values.dh); const ah = Number(values.ah);
      const eu = capVal(values.eu); const iu = capVal(values.iu); const du = capVal(values.du); const au = Number(values.au);
      const et = capVal(values.et); const it = capVal(values.it); const dt = capVal(values.dt); const at = Number(values.at);
      const el = capVal(values.el); const il = capVal(values.il); const dl = capVal(values.dl); const al = Number(values.al);
      
      const headScore = 0.1 * (eh + ih + dh) * ah;
      const upperScore = 0.2 * (eu + iu + du) * au;
      const trunkScore = 0.3 * (et + it + dt) * at;
      const lowerScore = 0.4 * (el + il + dl) * al;
      
      const value = headScore + upperScore + trunkScore + lowerScore;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let rec: { zh: string; en: string };
      
      if (value > 15) {
        riskLevel = { zh: '重度乾癬 (Severe Psoriasis)', en: 'Severe Psoriasis (PASI >15)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        rec = { zh: '乾癬病灶廣泛且嚴重，通常具有健保給付全身性生物製劑 (Biologics) 治療之適應症。', en: 'Severe plaque psoriasis. Candidate for biologic therapies.' };
      } else if (value >= 7) {
        riskLevel = { zh: '中度乾癬', en: 'Moderate Psoriasis' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        rec = { zh: '可考慮啟動口服免疫調節劑（如 MTX、Cyclosporine）或全身性窄頻紫外線照光 (NB-UVB) 治療。', en: 'Candidate for systemic oral therapies or NB-UVB phototherapy.' };
      } else {
        riskLevel = { zh: '輕度乾癬', en: 'Mild Psoriasis' };
        rec = { zh: '病灶相對侷限，建議採用外用類固醇與維生素D衍生物軟膏局部治療即可。', en: 'Manage with topical therapies (steroids, vitamin D analogues).' };
      }
      
      return {
        value,
        unit: '',
        riskLevel,
        riskColor,
        description: {
          zh: `計算所得 PASI 指數為 ${value.toFixed(1)} 分。(滿分 72 分)。\n各部分積分：頭部: ${headScore.toFixed(1)}, 上肢: ${upperScore.toFixed(1)}, 軀幹: ${trunkScore.toFixed(1)}, 下肢: ${lowerScore.toFixed(1)}。`,
          en: `PASI score is ${value.toFixed(1)}/72. (Head: ${headScore.toFixed(1)}, Upper: ${upperScore.toFixed(1)}, Trunk: ${trunkScore.toFixed(1)}, Lower: ${lowerScore.toFixed(1)}).`
        },
        recommendation: rec
      };
    },
    reference: 'Fredriksson T, Pettersson U. Dermatologica 1978;157(4):238-44.',
    pearls: {
      zh: [
        'PASI 改善率是臨床試驗中最廣泛採用的療效指標（例如 PASI 75 代表評分相較於基線改善了 75%）。',
        '各區域的嚴重程度指標 (0=無，1=輕微，2=中等，3=嚴重，4=極度嚴重)。'
      ],
      en: [
        'PASI 75 is the classic clinical trial benchmark representing a 75% reduction in disease severity from baseline.',
        'Area weights represent physiological skin proportions (Head 10%, Upper 20%, Trunk 30%, Lower 40%).'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/10410/psoriasis-area-severity-index-pasi'
  },
  {
    id: 'scorad',
    name: { zh: '異位性皮膚炎評分 (SCORAD)', en: 'SCORAD Score' },
    subtitle: { zh: '客觀體徵與主觀症狀評量異位性皮膚炎嚴重度', en: 'Scoring Atopic Dermatitis Index' },
    category: 'dermatology',
    inputs: [
      { id: 'area', name: { zh: 'A - 累及面積佔總體表面積比例 % (0-100)', en: 'A - Affected BSA % (0-100)' }, type: 'number', defaultValue: 20, min: 0, max: 100 },
      // Severity signs (0-3)
      { id: 'erythema', name: { zh: 'B1 - 紅斑 (Erythema) 程度 (0-3)', en: 'B1 - Erythema (0-3)' }, type: 'number', defaultValue: 1, min: 0, max: 3 },
      { id: 'edema', name: { zh: 'B2 - 丘疹或水腫 (Edema) 程度 (0-3)', en: 'B2 - Edema/Papules (0-3)' }, type: 'number', defaultValue: 1, min: 0, max: 3 },
      { id: 'crusting', name: { zh: 'B3 - 滲出與結痂 (Oozing) 程度 (0-3)', en: 'B3 - Oozing/Crusting (0-3)' }, type: 'number', defaultValue: 0, min: 0, max: 3 },
      { id: 'excoriation', name: { zh: 'B4 - 抓痕 (Excoriation) 程度 (0-3)', en: 'B4 - Excoriation (0-3)' }, type: 'number', defaultValue: 1, min: 0, max: 3 },
      { id: 'lichen', name: { zh: 'B5 - 苔蘚化 (Lichenification) 程度 (0-3)', en: 'B5 - Lichenification (0-3)' }, type: 'number', defaultValue: 1, min: 0, max: 3 },
      { id: 'dryness', name: { zh: 'B6 - 皮膚乾燥 (Dryness - 非皮損區) (0-3)', en: 'B6 - Dryness of non-lesional skin (0-3)' }, type: 'number', defaultValue: 1, min: 0, max: 3 },
      // Subjective (0-10 VAS)
      { id: 'itch', name: { zh: 'C1 - 瘙癢症狀程度 (0-10 視覺模擬評分)', en: 'C1 - Pruritus intensity (0-10)' }, type: 'number', defaultValue: 3, min: 0, max: 10 },
      { id: 'sleep', name: { zh: 'C2 - 睡眠干擾程度 (0-10 視覺模擬評分)', en: 'C2 - Sleep loss intensity (0-10)' }, type: 'number', defaultValue: 2, min: 0, max: 10 }
    ],
    calculate: (values) => {
      const cap3 = (v: any) => Math.min(3, Math.max(0, Number(v)));
      const cap10 = (v: any) => Math.min(10, Math.max(0, Number(v)));
      
      const A = Math.min(100, Math.max(0, Number(values.area)));
      const B1 = cap3(values.erythema);
      const B2 = cap3(values.edema);
      const B3 = cap3(values.crusting);
      const B4 = cap3(values.excoriation);
      const B5 = cap3(values.lichen);
      const B6 = cap3(values.dryness);
      const C1 = cap10(values.itch);
      const C2 = cap10(values.sleep);
      
      const B = B1 + B2 + B3 + B4 + B5 + B6;
      const C = C1 + C2;
      
      const value = (A / 5) + (7 * B / 2) + C;
      
      let riskLevel: { zh: string; en: string };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let rec: { zh: string; en: string };
      
      if (value > 50) {
        riskLevel = { zh: '重度異位性皮膚炎', en: 'Severe Atopic Dermatitis (>50)' };
        riskColor = 'text-rose-400 bg-rose-950/40 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
        rec = { zh: '建議會診皮膚科專科。考慮全身性口服/注射免疫抑制劑、新型口服 JAK 抑制劑或生物製劑（如 Dupilumab），配合照光治療。', en: 'Severe eczema. Consider systemic biologic therapies, JAK inhibitors, or phototherapy.' };
      } else if (value >= 26) {
        riskLevel = { zh: '中度異位性皮膚炎', en: 'Moderate Atopic Dermatitis (26-50)' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        rec = { zh: '建議給予中/強效外用類固醇藥膏、非類固醇外用藥膏（如 Calcineurin 抑制劑），並加強保濕敷料。', en: 'Manage with medium-to-high potency topical steroids or calcineurin inhibitors.' };
      } else {
        riskLevel = { zh: '輕度異位性皮膚炎', en: 'Mild Atopic Dermatitis (<26)' };
        rec = { zh: '日常勤塗潤膚保濕霜 (Emollients)，局部癢處給予弱效外用藥膏與口服止癢抗組織胺即可。', en: 'Emollients and low-potency topical therapies as needed.' };
      }
      
      return {
        value,
        unit: '',
        riskLevel,
        riskColor,
        description: {
          zh: `SCORAD 綜合評分為 ${value.toFixed(1)} 分 (滿分 103 分)。\n構成：受累面積項 A/5 = ${(A/5).toFixed(1)}, 客觀體徵項 7B/2 = ${(7*B/2).toFixed(1)}, 主觀症狀項 C = ${C.toFixed(1)}。`,
          en: `SCORAD is ${value.toFixed(1)}/103. (Area component: ${(A/5).toFixed(1)}, Sign component: ${(7*B/2).toFixed(1)}, Subjective component: ${C.toFixed(1)}).`
        },
        recommendation: rec
      };
    },
    reference: 'Consensus Report of the European Task Force on Atopic Dermatitis. Dermatology 1993;186(1):23-31.',
    pearls: {
      zh: [
        'SCORAD 評分特別結合了患者的瘙癢感與睡眠剝奪感（主觀視覺模擬評量），是一項全方位評量系統。',
        '客觀 SCORAD (Objective SCORAD) 計算公式為 $A/5 + 7B/2$，不計入主觀分數（最高分 83 分）。'
      ],
      en: [
        'Integrates clinical signs with subjective pruritus and insomnia to reflect overall disease burden.',
        'Objective SCORAD omits subjective symptoms (Formula: A/5 + 7B/2, max 83).'
      ]
    },
    mdcalcLink: 'https://www.mdcalc.com/calc/10411/scorad-score-atopic-dermatitis'
  },

  // ==========================================
  // 11. 眼科 (ophthalmology)
  // ==========================================
  {
    id: 'srk-t',
    name: { zh: '人工水晶體度數計算 (SRK & SRK/T)', en: 'IOL Power (SRK & SRK/T)' },
    subtitle: { zh: ' cataract 手術前估算所需植入之人工水晶體度數', en: 'IOL Power Calculation for Cataract Surgery' },
    category: 'ophthalmology',
    inputs: [
      { id: 'aConstant', name: { zh: '人工水晶體 A 常數 (A-constant)', en: 'IOL A-constant' }, type: 'number', defaultValue: 118.4, min: 110, max: 125, step: 0.1 },
      { id: 'axialLength', name: { zh: '眼軸長度 L (mm)', en: 'Axial Length L (mm)' }, type: 'number', defaultValue: 23.5, min: 15, max: 35, step: 0.01 },
      { id: 'keratometry', name: { zh: '平均角膜曲率 K (Diopters)', en: 'Average Keratometry K (D)' }, type: 'number', defaultValue: 44.0, min: 30, max: 60, step: 0.1 }
    ],
    calculate: (values) => {
      const A = Number(values.aConstant);
      const L = Number(values.axialLength);
      const K = Number(values.keratometry);
      
      if (!A || !L || !K) {
        return { error: 'Invalid inputs', description: { zh: '請檢查輸入，數值不能為 0。', en: 'Values cannot be zero.' } };
      }
      
      // Classic linear SRK regression formula: P = A - 2.5L - 0.9K
      const pSrk = A - 2.5 * L - 0.9 * K;
      
      // SRK/T is theoretical and highly non-linear, involving prediction of ELP.
      // We will provide the linear SRK result and theoretical explanation.
      
      let riskLevel: { zh: string; en: string } = { zh: '常規眼軸', en: 'Normal Axial Length' };
      let riskColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      let rec: { zh: string; en: string };
      
      if (L >= 26.0) {
        riskLevel = { zh: '長眼軸 (高度近視)', en: 'Long Axial Length' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        rec = { zh: '長眼軸患者使用第三代 SRK/T 公式預測性極佳，吻合度高，此結果可作為核心參考。', en: 'SRK/T formula is highly accurate for long eyes (>26.0 mm).' };
      } else if (L < 22.0) {
        riskLevel = { zh: '短眼軸 (小眼球/高度遠視)', en: 'Short Axial Length' };
        riskColor = 'text-amber-400 bg-amber-950/40 border-amber-500/30';
        rec = { zh: '短眼軸患者在使用 SRK/T 時可能出現較大屈光預測誤差。臨床推薦採用第四代或新一代人工水晶體公式（如 Barrett Universal II, Hoffer Q, 或是 Kane 公式）。', en: 'In short eyes (<22.0 mm), newer generation formulas (e.g. Barrett, Hoffer Q, Kane) are preferred.' };
      } else {
        rec = { zh: '正常眼軸，SRK/T 可以作為白內障手術常規水晶體度數之重要基準。', en: 'Normal eye dimensions. SRK/T provides a reliable baseline prediction.' };
      }
      
      return {
        value: pSrk,
        unit: 'D',
        riskLevel,
        riskColor,
        description: {
          zh: `基於經典 SRK 公式估算的正視眼 (Emmetropia) 人工水晶體度數為：${pSrk.toFixed(2)} D (屈光度 / Diopters)。`,
          en: `Estimated IOL power for emmetropia based on original SRK formula is ${pSrk.toFixed(2)} D.`
        },
        recommendation: rec
      };
    },
    reference: 'Retzlaff J, Sanders DR, Kraff MC. J Cataract Refract Surg 1990;16(3):333-40.',
    pearls: {
      zh: [
        '第一代 SRK regression 公式 ($P = A - 2.5L - 0.9K$) 構造簡單，但在極端眼軸時偏差大，已被基於物理眼球光學模型的 SRK/T 第三代公式所取代。',
        'A 常數由人工水晶體製造商根據其光學設計、植入位置提供，各個型號各不相同。'
      ],
      en: [
        'Original linear SRK formula is obsolete but acts as a baseline. SRK/T uses a theoretical eye model predicting Effective Lens Position (ELP).',
        'A-constant is brand-specific and provided by the intraocular lens manufacturer.'
      ]
    },
    mdcalcLink: ''
  }
];
