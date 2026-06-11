# Cardiology and Pulmonary Medicine Collected Formulas & Risk Scores

This document compiles the key clinical calculators, medical equations, risk scores, and diagnostic criteria for Cardiology and Pulmonary Medicine referenced in MGH Pocket Medicine.

---

## Cardiology Formulas & Risk Scores

### CHA₂DS₂-VASc Score
- **Category:** Cardiology / Electrophysiology / Stroke Risk in AF
- **Clinical Indication:** Stroke risk stratification in patients with non-valvular atrial fibrillation to guide oral anticoagulation therapy.
- **Formula / Algorithm:**
  The score is calculated by summing the points for the following criteria:
  - **C**ongestive heart failure (or left ventricular dysfunction): +1
  - **H**ypertension (or treated hypertension): +1
  - **A**ge $\ge 75$ years: +2
  - **D**iabetes mellitus: +1
  - **S**troke / TIA / thromboembolism history: +2
  - **V**ascular disease (prior MI, PAD, or aortic plaque): +1
  - **A**ge 65–74 years: +1
  - **S**ex category (Female): +1
- **Input Parameters:**
  - `CHF` (Binary, Yes/No, history of congestive heart failure or LVEF $\le 40\%$)
  - `Hypertension` (Binary, Yes/No, history of hypertension)
  - `Age` (Integer, age in years)
  - `Diabetes` (Binary, Yes/No, history of diabetes)
  - `Stroke/TIA` (Binary, Yes/No, history of stroke, TIA, or systemic embolization)
  - `Vascular Disease` (Binary, Yes/No, history of prior MI, peripheral arterial disease, or complex aortic plaque)
  - `Female Sex` (Binary, Yes/No, female gender)
- **Output & Interpretation:**
  - **Score range:** 0 to 9 points.
  - **Male Patients:**
    - **0 points:** Low risk; no antithrombotic therapy recommended.
    - **1 point:** Moderate risk; oral anticoagulation (OAC) may be considered based on shared decision-making.
    - **$\ge 2$ points:** High risk; OAC is strongly recommended.
  - **Female Patients:**
    - **1 point:** Low risk (score is solely due to female sex); no antithrombotic therapy recommended.
    - **2 points:** Moderate risk; OAC may be considered.
    - **$\ge 3$ points:** High risk; OAC is strongly recommended.
- **Clinical Pearls / Pocket Medicine Context:**
  - Applies only to *non-valvular* atrial fibrillation. Patients with moderate-to-severe mitral stenosis or mechanical heart valves have an obligate indication for warfarin and do not require CHA₂DS₂-VASc scoring.
  - Direct Oral Anticoagulants (DOACs, e.g., apixaban, rivaroxaban) are preferred over warfarin (VKA) in non-valvular AF unless contraindicated (e.g., severe renal impairment, mechanical valves).
- **MDCalc Link:** [CHA2DS2-VASc Score for Atrial Fibrillation Stroke Risk](https://www.mdcalc.com/calc/801/chads2-vasc-score-atrial-fibrillation-stroke-risk)

---

### HAS-BLED Bleeding Risk Score
- **Category:** Cardiology / Electrophysiology / Anticoagulation Bleeding Risk
- **Clinical Indication:** Assess the 1-year risk of major bleeding in patients on oral anticoagulants for atrial fibrillation.
- **Formula / Algorithm:**
  Points are assigned as follows:
  - **H**ypertension (uncontrolled systolic blood pressure $> 160$ mmHg): +1
  - **A**bnormal renal or liver function (+1 point for renal, +1 point for liver; max +2):
    - **Renal:** Chronic dialysis, renal transplant, or serum creatinine $\ge 2.26$ mg/dL ($200$ µmol/L).
    - **Liver:** Chronic liver disease (e.g., cirrhosis) or biochemical evidence of significant hepatic derangement (e.g., bilirubin $> 2 \times$ ULN with transaminases $> 3 \times$ ULN).
  - **S**troke history: +1
  - **B**leeding history or predisposition (e.g., anemia, hemorrhagic diathesis): +1
  - **L**abile INRs (unstable/high INRs or time in therapeutic range $< 60\%$ in patients taking warfarin): +1
  - **E**lderly (Age $> 65$ years): +1
  - **D**rugs or Alcohol (+1 point for concomitant antiplatelet/NSAID use, +1 point for alcohol abuse [$\ge 8$ drinks/week]; max +2).
- **Input Parameters:**
  - `Hypertension` (Binary, Yes/No, uncontrolled SBP $> 160$ mmHg)
  - `Renal Impairment` (Binary, Yes/No, dialysis, transplant, or Cr $\ge 2.26$ mg/dL)
  - `Liver Disease` (Binary, Yes/No, cirrhosis or biochemical liver dysfunction)
  - `Stroke History` (Binary, Yes/No)
  - `Bleeding History` (Binary, Yes/No, prior major bleed or bleeding diathesis)
  - `Labile INR` (Binary, Yes/No, time in therapeutic range $< 60\%$)
  - `Elderly` (Binary, Yes/No, age $> 65$ years)
  - `Antiplatelet/NSAID Use` (Binary, Yes/No, concomitant antiplatelets or NSAIDs)
  - `Alcohol Excess` (Binary, Yes/No, $\ge 8$ drinks/week)
- **Output & Interpretation:**
  - **Score range:** 0 to 9 points.
  - **Score 0:** Low risk (major bleeding rate ~0.9–1.13% per year).
  - **Score 1–2:** Moderate risk (major bleeding rate ~1.02–1.88% per year).
  - **Score $\ge 3$:** High risk (major bleeding rate $\ge 3.74\%$ per year). Warrants caution, regular clinical review, and corrective actions for modifiable risk factors (e.g., control BP, stop NSAIDs, reduce alcohol).
- **Clinical Pearls / Pocket Medicine Context:**
  - A high HAS-BLED score is **not** an absolute contraindication to anticoagulation. Instead, it is used to identify and address modifiable bleeding risk factors and flag patients who need closer clinical follow-up.
- **MDCalc Link:** [HAS-BLED Score for Major Bleeding Risk](https://www.mdcalc.com/calc/802/has-bled-score-major-bleeding-risk)

---

### TIMI Risk Score (for UA/NSTEMI and STEMI)

#### A. TIMI Risk Score for UA / NSTEMI
- **Category:** Cardiology / Coronary Artery Disease / ACS
- **Clinical Indication:** Risk stratification of patients with unstable angina (UA) or non-ST-elevation myocardial infarction (NSTEMI) to predict the 14-day risk of all-cause mortality, new/recurrent MI, or severe recurrent ischemia requiring urgent revascularization.
- **Formula / Algorithm:**
  One point is assigned for each of the following (max 7 points):
  - Age $\ge 65$ years: +1
  - $\ge 3$ CAD risk factors (family history of premature CAD, hypertension, hypercholesterolemia, diabetes, or current smoker): +1
  - Known CAD with coronary stenosis $\ge 50\%$: +1
  - Aspirin use within the last 7 days: +1
  - Severe angina ($\ge 2$ episodes within the last 24 hours): +1
  - ST-segment deviation $\ge 0.5$ mm (elevation or depression): +1
  - Elevated cardiac biomarkers (Troponin or CK-MB): +1
- **Input Parameters:**
  - `Age` (Integer, years)
  - `CAD Risk Factors` (Integer, number of cardiovascular risk factors)
  - `Prior Coronary Stenosis` (Binary, Yes/No, known stenosis $\ge 50\%$)
  - `Aspirin Use` (Binary, Yes/No, use in last 7 days)
  - `Angina Frequency` (Binary, Yes/No, $\ge 2$ anginal episodes in 24 hours)
  - `ECG Deviation` (Binary, Yes/No, ST deviation $\ge 0.5$ mm)
  - `Cardiac Biomarkers` (Binary, Yes/No, elevated Troponin/CK-MB)
- **Output & Interpretation:**
  - **Score range:** 0 to 7 points.
  - **0–2 points (Low Risk):** $< 8.3\%$ risk of 14-day death, MI, or urgent revascularization.
  - **3–4 points (Intermediate Risk):** $13.2\% - 19.9\%$ risk.
  - **5–7 points (High Risk):** $26.2\% - 40.9\%$ risk.
  - **Clinical Decision Making:** Patients with intermediate to high TIMI scores ($\ge 3$) derive a greater benefit from an early invasive strategy (cardiac catheterization/revascularization) compared to a conservative ischemia-guided strategy.
- **Clinical Pearls / Pocket Medicine Context:**
  - Aspirin use within the last 7 days is included as a marker of plaque instability that occurs despite standard antiplatelet therapy.
- **MDCalc Link:** [TIMI Risk Score for UA/NSTEMI](https://www.mdcalc.com/calc/78/timi-risk-score-ua-nstemi)

#### B. TIMI Risk Score for STEMI
- **Category:** Cardiology / Coronary Artery Disease / ACS
- **Clinical Indication:** Predicts 30-day mortality in patients presenting with ST-elevation myocardial infarction (STEMI) who are candidates for reperfusion therapy.
- **Formula / Algorithm:**
  Points are calculated as follows (max 14 points):
  - Age $\ge 75$ years (+3 points) OR Age 65–74 years (+2 points)
  - History of diabetes mellitus, hypertension, or angina: +1
  - Systolic blood pressure $< 100$ mmHg: +3
  - Heart rate $> 100$ bpm: +2
  - Killip Class II–IV (signs of heart failure/cardiogenic shock): +2
  - Body weight $< 67$ kg ($150$ lbs): +1
  - Anterior ST-elevation or Left Bundle Branch Block (LBBB): +1
  - Time to reperfusion therapy $> 4$ hours: +1
- **Input Parameters:**
  - `Age` (Integer, years)
  - `Comorbidities` (Binary, Yes/No, history of DM, HTN, or angina)
  - `Systolic BP` (Integer, mmHg)
  - `Heart Rate` (Integer, bpm)
  - `Killip Class` (Class I, II, III, or IV)
  - `Weight` (Decimal, kg or lbs)
  - `ECG Findings` (Binary, Yes/No, anterior STE or LBBB)
  - `Ischemia Time` (Binary, Yes/No, symptoms-to-treatment time $> 4$ hours)
- **Output & Interpretation:**
  - **Score range:** 0 to 14 points.
  - **30-day Mortality Risk:**
    - 0 points: 0.8%
    - 1 point: 1.6%
    - 2 points: 2.2%
    - 3 points: 4.4%
    - 4 points: 7.3%
    - 5 points: 12.4%
    - 6 points: 16.1%
    - 7 points: 23.4%
    - 8 points: 26.8%
    - $> 8$ points: 35.9%
- **Clinical Pearls / Pocket Medicine Context:**
  - STEMI prognosis is heavily driven by hemodynamic indices (SBP and HR) and older age, reflecting the high risk of cardiogenic shock.
- **MDCalc Link:** [TIMI Risk Score for STEMI](https://www.mdcalc.com/calc/163/timi-risk-score-stemi)

---

### GRACE Risk Score (GRACE 2.0)
- **Category:** Cardiology / Coronary Artery Disease / ACS
- **Clinical Indication:** Estimates in-hospital and 6-month post-discharge mortality in patients presenting with acute coronary syndrome (ACS) to guide treatment strategy.
- **Formula / Algorithm:**
  Calculated using a complex multivariable regression model incorporating:
  - **Age** (points scale 0 to 100)
  - **Heart Rate** (points scale 0 to 46)
  - **Systolic Blood Pressure** (points scale 0 to 58)
  - **Serum Creatinine** (points scale 1 to 28)
  - **Killip Class** (Class I: 0, Class II: 20, Class III: 39, Class IV: 59) OR **History of Heart Failure** (+21)
  - **Cardiac Arrest** at presentation: +39
  - **ST-Segment Deviation** on ECG: +28
  - **Elevated Cardiac Biomarkers**: +14
- **Input Parameters:**
  - `Age` (Integer, years)
  - `Heart Rate` (Integer, bpm)
  - `Systolic BP` (Integer, mmHg)
  - `Serum Creatinine` (Decimal, mg/dL or µmol/L)
  - `Killip Class` (Categorical, I: no HF signs; II: rales, S3; III: pulmonary edema; IV: cardiogenic shock) or `CHF History` (Yes/No)
  - `Cardiac Arrest at Admission` (Binary, Yes/No)
  - `ST-Segment Deviation` (Binary, Yes/No)
  - `Elevated Biomarkers` (Binary, Yes/No)
- **Output & Interpretation:**
  - **In-Hospital Mortality Risk:**
    - Low Risk: Score $\le 108$ (Risk $< 1\%$)
    - Intermediate Risk: Score 109–140 (Risk 1%–3%)
    - High Risk: Score $> 140$ (Risk $> 3\%$)
  - **6-Month Mortality Risk (post-discharge):**
    - Low Risk: Score $\le 88$ (Risk $< 3\%$)
    - Intermediate Risk: Score 89–118 (Risk 3%–8%)
    - High Risk: Score $> 118$ (Risk $> 8\%$)
- **Clinical Pearls / Pocket Medicine Context:**
  - The GRACE score has superior predictive discrimination compared to the TIMI score and is recommended by guidelines to determine the timing of early invasive strategies.
- **MDCalc Link:** [GRACE ACS Risk Score 2.0](https://www.mdcalc.com/calc/162/grace-acs-risk-score-20)

---

### ASCVD Risk Estimator (2013 ACC/AHA Pooled Cohort Equations)
- **Category:** Cardiology / Prevention
- **Clinical Indication:** Estimates the 10-year risk of a first hard atherosclerotic cardiovascular disease (ASCVD) event (nonfatal MI, coronary heart disease death, or fatal/nonfatal stroke) in primary prevention patients.
- **Formula / Algorithm:**
  Uses sex- and race-specific proportional hazards models:
  $$\text{Risk}_{10\text{-year}} = 1 - S(t)^{\exp(\sum \beta_i X_i - \mu)}$$
  Where $S(t)$ is baseline survival, $\beta_i$ are regression coefficients, $X_i$ are risk factors, and $\mu$ is the population mean.
- **Input Parameters:**
  - `Age` (Integer, years; validated for ages 40–79)
  - `Sex` (Male / Female)
  - `Race` (White / African American / Other)
  - `Total Cholesterol` (Integer, mg/dL)
  - `HDL Cholesterol` (Integer, mg/dL)
  - `Systolic Blood Pressure` (Integer, mmHg)
  - `Diastolic Blood Pressure` (Integer, mmHg)
  - `Hypertension Treatment` (Binary, Yes/No)
  - `Diabetes Mellitus` (Binary, Yes/No)
  - `Current Smoker` (Binary, Yes/No)
- **Output & Interpretation:**
  - **10-Year ASCVD Risk Percentage (%):**
    - **Low Risk ($< 5\%$):** Statin generally not indicated; focus on lifestyle.
    - **Borderline Risk ($5\% \text{ to } < 7.5\%$):** Discuss risk enhancers; consider moderate-intensity statin if risk-enhancing factors are present.
    - **Intermediate Risk ($7.5\% \text{ to } < 20\%$):** Statin initiation recommended (typically moderate-intensity).
    - **High Risk ($\ge 20\%$):** High-intensity statin recommended.
- **Clinical Pearls / Pocket Medicine Context:**
  - **Not applicable** to patients with pre-existing clinical ASCVD or those with LDL-C $\ge 190$ mg/dL (both groups automatically require high-intensity statin).
  - Use clinical risk-enhancing factors (e.g., family history of premature ASCVD, coronary artery calcium score, high-sensitivity CRP, Lp(a)) to guide decision-making if the risk is borderline or intermediate and the treatment decision is unclear.
- **MDCalc Link:** [10-year ASCVD Risk Estimator (2013 ACC/AHA)](https://www.mdcalc.com/calc/3398/10-year-ascvd-risk-estimator-2013-acc-aha)

---

### QTc Interval
- **Category:** Cardiology / Electrophysiology
- **Clinical Indication:** Corrects the measured QT interval for heart rate to identify risk of ventricular arrhythmias, specifically Torsades de Pointes.
- **Formula / Algorithm:**
  - **Bazett Formula:** (most common, but overcorrects at high HR, undercorrects at low HR)
    $$QT_c = \frac{QT}{\sqrt{RR}}$$
    *Note: $RR$ is the RR interval in seconds ($RR = 60 / HR$).*
  - **Fridericia Formula:** (preferred at extreme heart rates)
    $$QT_c = \frac{QT}{\sqrt[3]{RR}}$$
  - **Framingham Formula:**
    $$QT_c = QT + 0.154 \times (1 - RR)$$
  - **Hodges Formula:**
    $$QT_c = QT + 1.75 \times (HR - 60)$$
- **Input Parameters:**
  - `QT` (Integer, milliseconds; measured from start of Q wave to end of T wave)
  - `Heart Rate` (Integer, bpm) or `RR Interval` (Decimal, seconds)
- **Output & Interpretation:**
  - **Normal QTc Limits:**
    - **Men:** $< 450$ ms
    - **Women:** $< 460$ ms
  - **Prolonged QTc:**
    - **Men:** $> 470$ ms
    - **Women:** $> 480$ ms
  - **High Risk for Torsades de Pointes:** QTc $> 500$ ms or increase $> 60$ ms from baseline.
- **Clinical Pearls / Pocket Medicine Context:**
  - When measuring QT, use the lead with the longest QT interval (usually V2 or V3, or lead II) and use the tangent method to define the end of the T wave. Exclude U-waves if they are separate, or include them if they are merged.
- **MDCalc Link:** [QT Interval Corrected (QTc)](https://www.mdcalc.com/calc/57/qt-interval-corrected-qtc)

---

### Duke Criteria for Infective Endocarditis
- **Category:** Cardiology / Infectious Disease / Endocarditis
- **Clinical Indication:** Diagnostic criteria for defining infective endocarditis (IE).
- **Formula / Algorithm:**
  - **Major Criteria:**
    1. **Positive Blood Cultures for IE:**
       - Typical microorganisms from 2 separate blood cultures: *Streptococcus viridans*, *Streptococcus bovis*, HACEK group, *Staphylococcus aureus*, or community-acquired *Enterococci* in the absence of a primary focus.
       - Persistently positive blood cultures: $\ge 2$ positive cultures drawn $> 12$ hours apart, or all of 3, or a majority of $\ge 4$ separate blood cultures (first and last drawn $\ge 1$ hour apart).
       - Single positive blood culture for *Coxiella burnetii* or phase I IgG antibody titer $> 1:800$.
    2. **Evidence of Endocardial Involvement:**
       - Positive Echocardiogram (TTE or TEE): Oscillating intracardiac mass on a valve, supporting structure, or implanted material; OR myocardial abscess; OR new partial dehiscence of a prosthetic valve.
       - New valvular regurgitation (change or worsening of a pre-existing murmur is not sufficient).
  - **Minor Criteria:**
    1. **Predisposition:** Predisposing heart condition (e.g., valve disease, prosthetic valve) or injection drug use.
    2. **Fever:** Temperature $\ge 38.0^\circ\text{C}$ ($100.4^\circ\text{F}$).
    3. **Vascular Phenomena:** Major arterial emboli, septic pulmonary infarcts, mycotic aneurysm, intracranial hemorrhage, conjunctival hemorrhages, or Janeway lesions.
    4. **Immunological Phenomena:** Glomerulonephritis, Osler's nodes, Roth's spots, or rheumatoid factor.
    5. **Microbiological Evidence:** Positive blood cultures that do not meet major criteria, or serological evidence of active infection with an organism consistent with IE.
  - **Diagnostic Thresholds:**
    - **Definite IE:** 2 Major OR 1 Major + 3 Minor OR 5 Minor.
    - **Possible IE:** 1 Major + 1 Minor OR 3 Minor.
    - **Rejected IE:** Firm alternative diagnosis; OR resolution of symptoms with antibiotics for $\le 4$ days; OR no pathological evidence at surgery/autopsy after $\le 4$ days of antibiotics; OR does not meet criteria for possible IE.
- **Input Parameters:**
  - `Blood Cultures` (Clinical description of culture results)
  - `Echocardiogram Findings` (Description of vegetations/abscess/dehiscence/regurgitation)
  - `Physical Findings` (Janeway lesions, Osler nodes, Roth spots, new murmur, temperature)
  - `Risk Factors` (IVDU, predisposing valve disease, history of IE)
- **Output & Interpretation:**
  - Categorization of patient into **Definite IE**, **Possible IE**, or **Rejected**.
- **Clinical Pearls / Pocket Medicine Context:**
  - Janeway lesions are *painless* hemorrhagic macular lesions on palms/soles representing microemboli (vascular phenomenon).
  - Osler's nodes are *painful* subcutaneous nodules on pads of fingers/toes representing immune complex deposition (immunological phenomenon).
  - The 2023 Duke-ISCVID criteria also incorporate cardiac CT and FDG-PET/CT findings as major criteria.
- **MDCalc Link:** [Modified Duke Criteria for Infective Endocarditis](https://www.mdcalc.com/calc/808/modified-duke-criteria-infective-endocarditis)

---

### HEART Score for Major Adverse Cardiac Events (MACE)
- **Category:** Cardiology / Emergency Medicine / Chest Pain
- **Clinical Indication:** Risk-stratify chest pain patients in the Emergency Department to assess the 6-week risk of a Major Adverse Cardiac Event (MACE: MI, death, or urgent revascularization).
- **Formula / Algorithm:**
  - **H**istory:
    - Highly suspicious: 2 points
    - Moderately suspicious: 1 point
    - Slightly/non-suspicious: 0 points
  - **E**CG:
    - Significant ST-segment depression: 2 points
    - Non-specific repolarization disturbance / LBBB / Pacemaker: 1 point
    - Normal: 0 points
  - **A**ge:
    - $\ge 65$ years: 2 points
    - 45–64 years: 1 point
    - $< 45$ years: 0 points
  - **R**isk Factors (HTN, HLD, DM, obesity, active/former smoking, family history of premature CAD, or history of atherosclerotic disease [prior MI/stroke/revascularization]):
    - $\ge 3$ risk factors or history of atherosclerotic disease: 2 points
    - 1 or 2 risk factors: 1 point
    - No risk factors: 0 points
  - **T**roponin (initial):
    - $\ge 3 \times$ normal limit: 2 points
    - $1 \text{ to } < 3 \times$ normal limit: 1 point
    - $\le$ normal limit (normal): 0 points
- **Input Parameters:**
  - `History Suspiciousness` (Categorical, Highly / Moderately / Slightly)
  - `ECG Findings` (Categorical, ST depression / Non-specific / Normal)
  - `Age` (Integer, years)
  - `Risk Factors` (Integer, count of coronary risk factors or history of atherosclerotic disease)
  - `Initial Troponin` (Decimal, ratio to normal limit or clinical category)
- **Output & Interpretation:**
  - **Score range:** 0 to 10 points.
  - **0–3 points (Low Risk):** ~0.9–1.7% MACE rate. Safely discharge with outpatient workup.
  - **4–6 points (Moderate Risk):** ~12–16.6% MACE rate. Admit for observation, serial troponins, and noninvasive testing (stress test, CCTA).
  - **7–10 points (High Risk):** ~50–65% MACE rate. Admit for early invasive management (cardiology consult, invasive angiography).
- **Clinical Pearls / Pocket Medicine Context:**
  - Widely validated and highly effective at reducing unnecessary admissions for low-risk chest pain while preserving safety.
- **MDCalc Link:** [HEART Score for Major Cardiovascular Events](https://www.mdcalc.com/calc/3889/heart-score-major-cardiovascular-events)

---
---

## Pulmonary Formulas & Risk Scores

### Wells' Criteria for Pulmonary Embolism (PE) and Deep Vein Thrombosis (DVT)

#### A. Wells' Criteria for Pulmonary Embolism (PE)
- **Category:** Pulmonary / Thromboembolism
- **Clinical Indication:** Estimate the pre-test probability of pulmonary embolism.
- **Formula / Algorithm:**
  Points are assigned as follows:
  - Clinical signs and symptoms of DVT (objective swelling and pain on palpation): +3.0
  - An alternative diagnosis is less likely than PE: +3.0
  - Heart rate $> 100$ bpm: +1.5
  - Immobilization ($\ge 3$ days) or surgery within the last 4 weeks: +1.5
  - Previous objectively documented PE or DVT: +1.5
  - Hemoptysis: +1.0
  - Active malignancy (treatment ongoing, within 6 months, or palliative): +1.0
- **Input Parameters:**
  - `DVT Symptoms` (Binary, Yes/No)
  - `Alternative Diagnosis` (Binary, Yes/No, PE is #1 or equally likely)
  - `Tachycardia` (Binary, Yes/No, HR $> 100$ bpm)
  - `Immobilization/Surgery` (Binary, Yes/No)
  - `Prior DVT/PE` (Binary, Yes/No)
  - `Hemoptysis` (Binary, Yes/No)
  - `Malignancy` (Binary, Yes/No)
- **Output & Interpretation:**
  - **Traditional 3-Tier Classification:**
    - **Low Probability (0–1 points):** ~10% PE prevalence.
    - **Moderate Probability (2–6 points):** ~30% PE prevalence.
    - **High Probability ($> 6$ points):** ~65% PE prevalence.
  - **Simplified 2-Tier (Clinical Probability) Classification:**
    - **PE Unlikely ($\le 4$ points):** Check high-sensitivity D-dimer. If negative, PE is ruled out. If positive, obtain CTA.
    - **PE Likely ($> 4$ points):** Bypass D-dimer and obtain CT Pulmonary Angiography (CTA).
- **Clinical Pearls / Pocket Medicine Context:**
  - Use age-adjusted D-dimer cutoffs (Age $\times 10$ µg/L for patients $> 50$ years old) to decrease false positive rates and unnecessary imaging.
- **MDCalc Link:** [Wells' Criteria for Pulmonary Embolism](https://www.mdcalc.com/calc/115/wells-criteria-pulmonary-embolism)

#### B. Wells' Criteria for Deep Vein Thrombosis (DVT)
- **Category:** Pulmonary / Thromboembolism
- **Clinical Indication:** Estimate the pre-test probability of deep vein thrombosis.
- **Formula / Algorithm:**
  Points are assigned as follows:
  - Active cancer (treatment ongoing, within 6 months, or palliative): +1
  - Paralysis, paresis, or recent plaster immobilization of lower extremity: +1
  - Recently bedridden $\ge 3$ days or major surgery within 12 weeks requiring general or regional anesthesia: +1
  - Localized tenderness along the distribution of the deep venous system: +1
  - Entire leg swollen: +1
  - Calf swelling $\ge 3$ cm larger than asymptomatic side (measured 10 cm below tibial tuberosity): +1
  - Pitting edema confined to the symptomatic leg: +1
  - Collateral superficial veins (non-varicose): +1
  - Previously documented DVT: +1
  - Alternative diagnosis at least as likely as DVT: -2
- **Input Parameters:**
  - `Active Cancer` (Binary, Yes/No)
  - `Paresis/Immobilization` (Binary, Yes/No)
  - `Bedridden/Surgery` (Binary, Yes/No)
  - `Localized Deep Tenderness` (Binary, Yes/No)
  - `Entire Leg Swelling` (Binary, Yes/No)
  - `Calf Discrepancy` (Binary, Yes/No, $\ge 3$ cm difference)
  - `Pitting Edema` (Binary, Yes/No, symptomatic leg only)
  - `Collateral Veins` (Binary, Yes/No)
  - `Prior DVT` (Binary, Yes/No)
  - `Alternative Diagnosis` (Binary, Yes/No, alternative at least as likely)
- **Output & Interpretation:**
  - **Traditional 3-Tier Classification:**
    - **High Probability ($\ge 3$ points):** ~53% DVT prevalence. Obtain ultrasound.
    - **Moderate Probability (1–2 points):** ~17% DVT prevalence. Obtain ultrasound or high-sensitivity D-dimer.
    - **Low Probability ($\le 0$ points):** ~5% DVT prevalence. D-dimer can safely rule out.
  - **Simplified 2-Tier Classification:**
    - **DVT Unlikely ($\le 1$ point):** Perform D-dimer. If negative, DVT is ruled out.
    - **DVT Likely ($\ge 2$ points):** Obtain compression ultrasound.
- **Clinical Pearls / Pocket Medicine Context:**
  - Do not forget the **-2 points** for an alternative diagnosis at least as likely as DVT (e.g., Baker's cyst, cellulitis, muscle strain), which significantly changes the clinical likelihood.
- **MDCalc Link:** [Wells' Criteria for DVT](https://www.mdcalc.com/calc/362/wells-criteria-dvt)

---

### PERC Rule (Pulmonary Embolism Rule-out Criteria)
- **Category:** Pulmonary / Thromboembolism
- **Clinical Indication:** Rule out pulmonary embolism without a D-dimer in patients who already have a low clinician-gestated pre-test probability ($< 15\%$) or a low Wells' score ($< 2$).
- **Formula / Algorithm:**
  PE is ruled out if the patient meets **ALL** of the following 8 criteria (no criteria can be positive):
  1. **Age $< 50$ years**
  2. **Heart rate $< 100$ bpm**
  3. **Oxygen saturation $\ge 95\%$ on room air**
  4. **No unilateral leg swelling**
  5. **No hemoptysis**
  6. **No recent surgery or trauma** (within 4 weeks requiring hospitalization/general anesthesia)
  7. **No prior history of DVT or PE**
  8. **No oral contraceptive or hormone replacement therapy use** (estrogen)
- **Input Parameters:**
  - `Age` (Integer, years)
  - `Heart Rate` (Integer, bpm)
  - `O2 Saturation` (Integer, % on room air)
  - `Unilateral Leg Swelling` (Binary, Yes/No)
  - `Hemoptysis` (Binary, Yes/No)
  - `Recent Surgery/Trauma` (Binary, Yes/No)
  - `Prior DVT/PE` (Binary, Yes/No)
  - `Exogenous Estrogen Use` (Binary, Yes/No)
- **Output & Interpretation:**
  - **PERC Negative (All 8 criteria met):** Risk of PE is $< 1\%$. No further testing (no D-dimer, no imaging) is indicated.
  - **PERC Positive (Any criterion is violated):** Cannot rule out PE via PERC. Proceed to D-dimer testing as the next step.
- **Clinical Pearls / Pocket Medicine Context:**
  - Applying PERC to moderate- or high-risk patients yields an unacceptably high rate of missed PEs. It is designed *only* to avoid D-dimer testing in low-risk patients, avoiding false-positive D-dimer results that lead to unnecessary CT scans.
- **MDCalc Link:** [PERC Rule for Pulmonary Embolism](https://www.mdcalc.com/calc/347/perc-rule-pulmonary-embolism)

---

### Geneva Score for PE (Revised and Simplified Revised)
- **Category:** Pulmonary / Thromboembolism
- **Clinical Indication:** Estimate the pre-test probability of pulmonary embolism using fully objective clinical variables.
- **Formula / Algorithm:**
  | Variable | Revised Geneva Points | Simplified Revised Geneva Points |
  | :--- | :---: | :---: |
  | Age $\ge 65$ years | +1 | +1 |
  | Previous DVT or PE | +3 | +1 |
  | Surgery or lower limb fracture within last month | +2 | +1 |
  | Active malignancy (solid/hematologic, active or cured $< 1$ year) | +2 | +1 |
  | Unilateral lower limb pain | +3 | +1 |
  | Hemoptysis | +2 | +1 |
  | Heart rate 75–94 bpm | +3 | +1 |
  | Heart rate $\ge 95$ bpm | +5 | +2 |
  | Pain on deep vein palpation of the lower limb and unilateral edema | +4 | +1 |
- **Input Parameters:**
  - `Age` (Integer, years)
  - `Prior DVT/PE` (Binary, Yes/No)
  - `Recent Surgery/Fracture` (Binary, Yes/No)
  - `Active Malignancy` (Binary, Yes/No)
  - `Unilateral Lower Limb Pain` (Binary, Yes/No)
  - `Hemoptysis` (Binary, Yes/No)
  - `Heart Rate` (Integer, bpm)
  - `Deep Vein Palpation Pain & Edema` (Binary, Yes/No)
- **Output & Interpretation:**
  - **Revised Geneva Score (Three-Tier):**
    - **Low Probability (0–3 points):** ~8% PE prevalence.
    - **Intermediate Probability (4–10 points):** ~28% PE prevalence.
    - **High Probability ($\ge 11$ points):** ~74% PE prevalence.
  - **Simplified Revised Geneva Score:**
    - **Low Probability (0–1 points):** ~8% PE prevalence.
    - **Intermediate Probability (2–4 points):** ~28% PE prevalence.
    - **High Probability ($\ge 5$ points):** ~74% PE prevalence.
- **Clinical Pearls / Pocket Medicine Context:**
  - Highly useful in research trials and in clinical environments where clinician subjectivity (which is part of the Wells' score) needs to be avoided.
- **MDCalc Link:** [Revised Geneva Score for Pulmonary Embolism](https://www.mdcalc.com/calc/3251/revised-geneva-score-pulmonary-embolism)

---

### CURB-65 Score for Pneumonia Severity
- **Category:** Pulmonary / Pneumonia
- **Clinical Indication:** Predict 30-day mortality in patients with community-acquired pneumonia (CAP) to assist in determining disposition (outpatient vs. inpatient vs. ICU).
- **Formula / Algorithm:**
  - **C**onfusion (new-onset disorientation to person, place, or time): +1
  - **U**rea (BUN $> 19$ mg/dL or $> 7$ mmol/L): +1
  - **R**espiratory Rate $\ge 30$ breaths/min: +1
  - **B**lood Pressure (Systolic $< 90$ mmHg or Diastolic $\le 60$ mmHg): +1
  - **Age $\ge 65$ years**: +1
- **Input Parameters:**
  - `Confusion` (Binary, Yes/No)
  - `Blood Urea Nitrogen (BUN)` (Decimal, mg/dL or mmol/L)
  - `Respiratory Rate` (Integer, breaths/min)
  - `Systolic BP` (Integer, mmHg)
  - `Diastolic BP` (Integer, mmHg)
  - `Age` (Integer, years)
- **Output & Interpretation:**
  - **Score range:** 0 to 5 points.
  - **Score 0–1:** Low risk (30-day mortality $< 3\%$). Outpatient care is generally appropriate.
  - **Score 2:** Moderate risk (30-day mortality ~9%). Consider short inpatient stay or close observation.
  - **Score $\ge 3$:** High risk (30-day mortality 15%–40%). Inpatient admission is indicated; evaluate for ICU admission if score is 4 or 5.
- **Clinical Pearls / Pocket Medicine Context:**
  - Simple and quick, but does not capture significant comorbidities (e.g., severe COPD, active malignancy) or oxygenation status. Clinical judgment is always required (e.g., a hypoxemic patient with a CURB-65 of 1 still needs admission).
- **MDCalc Link:** [CURB-65 Score for Pneumonia Severity](https://www.mdcalc.com/calc/324/curb-65-score-pneumonia-severity)

---

### Pneumonia Severity Index (PSI) / PORT Score
- **Category:** Pulmonary / Pneumonia
- **Clinical Indication:** Risk-stratification model for patients with community-acquired pneumonia (CAP) to estimate 30-day mortality and identify low-risk candidates for outpatient management.
- **Formula / Algorithm:**
  - **Step 1:** If age $\le 50$, no comorbidities (cancer, CHF, cerebrovascular disease, renal disease, liver disease), and no vital sign abnormalities (altered mental status, HR $\ge 125$, RR $\ge 30$, SBP $< 90$ mmHg, Temp $< 35^\circ\text{C}$ or $\ge 40^\circ\text{C}$), the patient is **Class I** and requires no further scoring.
  - **Step 2:** If the patient does not meet Step 1 criteria, sum the following points:
    - **Demographic Factors:**
      - Male: Age (years)
      - Female: Age (years) - 10
      - Nursing home resident: +10
    - **Comorbidities:**
      - Neoplastic disease (active or within 1 year): +30
      - Liver disease (cirrhosis, chronic active hepatitis): +20
      - Congestive heart failure: +10
      - Cerebrovascular disease (stroke, TIA): +10
      - Renal disease (history of renal failure or BUN/Cr elevation): +10
    - **Physical Examination Findings:**
      - Altered mental status: +20
      - Respiratory rate $\ge 30$ breaths/min: +20
      - Systolic blood pressure $< 90$ mmHg: +15
      - Temperature $< 35^\circ\text{C}$ ($95^\circ\text{F}$) or $\ge 40^\circ\text{C}$ ($104^\circ\text{F}$): +15
      - Heart rate $\ge 125$ bpm: +10
    - **Laboratory and Radiographic Findings:**
      - Arterial pH $< 7.35$: +30
      - Blood urea nitrogen (BUN) $\ge 30$ mg/dL ($11$ mmol/L): +20
      - Sodium $< 130$ mEq/L: +20
      - Glucose $\ge 250$ mg/dL ($14$ mmol/L): +10
      - Hematocrit $< 30\%$: +10
      - Partial pressure of oxygen ($\text{PaO}_2$) $< 60$ mmHg or oxygen saturation $< 90\%$: +10
      - Pleural effusion on CXR: +10
- **Input Parameters:**
  - `Age` & `Sex`
  - `Nursing Home Residence` (Binary, Yes/No)
  - `Comorbidities` (Neoplastic, Liver, CHF, Cerebrovascular, Renal)
  - `Physical Findings` (Altered mental status, RR, SBP, Temp, HR)
  - `Lab / Radiographic Results` (pH, BUN, Sodium, Glucose, Hematocrit, PaO2 or O2 Sat, Pleural Effusion)
- **Output & Interpretation:**
  - **Class I:** 0.1% mortality risk. Outpatient management.
  - **Class II ($\le 70$ points):** 0.6% mortality risk. Outpatient management.
  - **Class III (71–90 points):** 0.9%–2.8% mortality risk. Inpatient observation or brief stay.
  - **Class IV (91–130 points):** 8.2%–9.3% mortality risk. Inpatient admission.
  - **Class V ($> 130$ points):** 27.0%–29.2% mortality risk. Inpatient admission, high risk; evaluate for ICU admission.
- **Clinical Pearls / Pocket Medicine Context:**
  - Highly validated and preferred over CURB-65 by current IDSA/ATS guidelines because it is more sensitive and conservative, especially for ruling out admission in younger patients. However, it is more time-consuming to calculate.
- **MDCalc Link:** [PSI/PORT Score: Pneumonia Severity Index](https://www.mdcalc.com/calc/33/psi-port-score-pneumonia-severity-index)

---

### Light's Criteria
- **Category:** Pulmonary / Pleural Disease
- **Clinical Indication:** Classify pleural effusions as transudative or exudative to guide diagnostic workup.
- **Formula / Algorithm:**
  A pleural effusion is classified as an **exudate** if it meets at least **one** of the following:
  1. **Protein Ratio:**
     $$\frac{\text{Pleural Fluid Total Protein}}{\text{Serum Total Protein}} > 0.5$$
  2. **LDH Ratio:**
     $$\frac{\text{Pleural Fluid LDH}}{\text{Serum LDH}} > 0.6$$
  3. **LDH Absolute Value:**
     $$\text{Pleural Fluid LDH} > \frac{2}{3} \times \text{Upper Limit of Normal (ULN) of Serum LDH}$$
     *(Using the local lab's ULN for serum LDH, e.g., if ULN is 200, the threshold is $> 133$ U/L).*
  If **none** of these criteria are met, the effusion is a **transudate**.
- **Input Parameters:**
  - `Pleural Protein` (Decimal, g/dL)
  - `Serum Protein` (Decimal, g/dL)
  - `Pleural LDH` (Integer, U/L)
  - `Serum LDH` (Integer, U/L)
  - `Serum LDH ULN` (Integer, U/L)
- **Output & Interpretation:**
  - **Exudate:** Caused by local pulmonary/pleural inflammatory, infectious, or neoplastic processes (e.g., pneumonia, malignancy, PE, tuberculosis).
  - **Transudate:** Caused by systemic hydrostatic or oncotic pressure changes (e.g., congestive heart failure, liver cirrhosis, nephrotic syndrome).
- **Clinical Pearls / Pocket Medicine Context:**
  - **Diuretic Effect:** Diuretic therapy in patients with heart failure can concentrate pleural fluid, making a true transudate falsely meet exudative criteria (usually by protein or LDH).
  - If a patient is on diuretics and Light's criteria suggest an exudate but heart failure is suspected, calculate:
    - **Serum-to-Pleural Fluid Protein Gradient:**
      $$\text{Serum Protein} - \text{Pleural Protein} > 3.1 \text{ g/dL} \implies \text{likely transudate}$$
    - **Serum-to-Pleural Fluid Albumin Gradient:**
      $$\text{Serum Albumin} - \text{Pleural Albumin} > 1.2 \text{ g/dL} \implies \text{likely transudate}$$
- **MDCalc Link:** [Light's Criteria for Pleural Effusion](https://www.mdcalc.com/calc/22/lights-criteria-pleural-effusion)

---

### Alveolar-arterial Oxygen Gradient (A-a Gradient)
- **Category:** Pulmonary / Gas Exchange
- **Clinical Indication:** Evaluate the etiology of hypoxemia (intrapulmonary vs. extrapulmonary pathology).
- **Formula / Algorithm:**
  $$\text{A-a Gradient} = P_A O_2 - P_a O_2$$
  Where $P_a O_2$ is the arterial partial pressure of oxygen (from an ABG) and $P_A O_2$ is the alveolar partial pressure of oxygen, calculated via the Alveolar Gas Equation:
  $$P_A O_2 = \left(F_i O_2 \times (P_{atm} - P_{H_2O})\right) - \frac{P_a CO_2}{R}$$
  - **On Room Air ($F_i O_2 = 0.21$) at Sea Level ($P_{atm} = 760$ mmHg, $P_{H_2O} = 47$ mmHg) with a respiratory quotient ($R = 0.8$):**
    $$P_A O_2 \approx 150 - 1.25 \times P_a CO_2$$
    Thus, the simplified A-a gradient formula is:
    $$\text{A-a Gradient} = \left(150 - 1.25 \times P_a CO_2\right) - P_a O_2$$
  - **Expected Normal Age-Adjusted A-a Gradient:**
    $$\text{Expected A-a Gradient} = \frac{\text{Age}}{4} + 4$$
- **Input Parameters:**
  - `PaO2` (Decimal, mmHg from ABG)
  - `PaCO2` (Decimal, mmHg from ABG)
  - `Age` (Integer, years)
  - `FiO2` (Decimal, default 0.21 for room air)
  - `Barometric Pressure` (Integer, default 760 mmHg at sea level)
- **Output & Interpretation:**
  - **Normal A-a Gradient (hypoxemia present):** Indicates the lungs are functioning properly, and hypoxemia is due to:
    - Hypoventilation (CNS depression, drug overdose, neuromuscular disease)
    - Low inspired oxygen (high altitude)
  - **Elevated A-a Gradient (hypoxemia present):** Indicates intrinsic pulmonary pathology interfering with gas exchange:
    - V/Q Mismatch (e.g., PE, COPD, asthma, mild pneumonia)
    - Shunt (e.g., ARDS, severe atelectasis, lobar consolidation)
    - Diffusion Impairment (e.g., Interstitial Lung Disease)
- **Clinical Pearls / Pocket Medicine Context:**
  - Do not calculate or rely on the A-a gradient on high levels of supplemental oxygen ($F_i O_2 > 0.21$), as the math is highly sensitive to small variations in $F_i O_2$ and leads to misleadingly high gradients.
- **MDCalc Link:** [Alveolar-arterial (A-a) Oxygen Gradient](https://www.mdcalc.com/calc/116/a-a-oxygen-gradient)

---

### PaO₂/FiO₂ Ratio (P/F Ratio)
- **Category:** Pulmonary / Critical Care
- **Clinical Indication:** Evaluate the severity of hypoxemia, specifically for the diagnosis and severity staging of Acute Respiratory Distress Syndrome (ARDS).
- **Formula / Algorithm:**
  $$\text{P/F Ratio} = \frac{P_a O_2}{F_i O_2}$$
  - $P_a O_2$ is in mmHg.
  - $F_i O_2$ is represented as a fraction (e.g., room air is $0.21$).
- **Input Parameters:**
  - `PaO2` (Decimal, mmHg from ABG)
  - `FiO2` (Decimal, range 0.21 to 1.00)
- **Output & Interpretation:**
  - **Normal:** $> 400 - 500$ mmHg (e.g., $100 \text{ mmHg} / 0.21 \approx 476$ mmHg).
  - **ARDS Severity Classification (Berlin Criteria):** (requires positive pressure ventilation with PEEP/CPAP $\ge 5 \text{ cm H}_2\text{O}$)
    - **Mild ARDS:** $200 < \text{P/F Ratio} \le 300$ mmHg
    - **Moderate ARDS:** $100 < \text{P/F Ratio} \le 200$ mmHg
    - **Severe ARDS:** $\text{P/F Ratio} \le 100$ mmHg
- **Clinical Pearls / Pocket Medicine Context:**
  - Used in the SOFA (Sequential Organ Failure Assessment) score to assess respiratory dysfunction.
  - In patients with moderate-to-severe ARDS ($\text{P/F Ratio} < 150$), guidelines recommend specific management strategies such as prone positioning and neuromuscular blockade.
- **MDCalc Link:** [PaO2/FiO2 Ratio](https://www.mdcalc.com/calc/3973/pao2-fio2-ratio)

---

### Rapid Shallow Breathing Index (RSBI)
- **Category:** Pulmonary / Critical Care / Mechanical Ventilation Weaning
- **Clinical Indication:** Predict the likelihood of successful weaning and extubation in patients on mechanical ventilation.
- **Formula / Algorithm:**
  $$\text{RSBI} = \frac{f}{V_t}$$
  Where:
  - $f$ is the respiratory rate (breaths per minute).
  - $V_t$ is the tidal volume (in **liters**).
- **Input Parameters:**
  - `f` (Integer, breaths/min; measured while patient is breathing spontaneously)
  - `Vt` (Decimal, liters; spontaneous tidal volume)
- **Output & Interpretation:**
  - **RSBI $< 105$ breaths/min/L:** Predicts successful weaning (high likelihood of successful extubation).
  - **RSBI $\ge 105$ breaths/min/L:** Predicts weaning failure (patient is breathing too rapidly and shallowly, suggesting lack of endurance or respiratory muscle fatigue).
- **Clinical Pearls / Pocket Medicine Context:**
  - Spontaneous breathing parameters should be measured during a Spontaneous Breathing Trial (SBT) of 1 minute on minimal support (e.g., CPAP or pressure support $\le 5$ cm H₂O or T-piece) before extubation.
  - Combining RSBI with other clinical indicators (e.g., cough strength, mental status, secretions) improves prediction accuracy.
- **MDCalc Link:** [Rapid Shallow Breathing Index (RSBI)](https://www.mdcalc.com/calc/3720/rapid-shallow-breathing-index-rsbi)
