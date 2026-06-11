# Nephrology and Gastroenterology Clinical Formulas, Scores, and Criteria

This document compiles the key clinical equations, risk calculators, and diagnostic criteria referenced in the Nephrology (Renal/Acid-Base) and Gastroenterology chapters of MGH Pocket Medicine. All parameters, equations, and clinical interpretations have been cross-referenced with clinical standards and MDCalc.

---

## Table of Contents
- [Nephrology and Acid-Base Formulas](#nephrology-and-acid-base-formulas)
  - [Fractional Excretion of Sodium (FENa)](#fractional-excretion-of-sodium-fena)
  - [Fractional Excretion of Urea (FEUrea)](#fractional-excretion-of-urea-feurea)
  - [Cockcroft-Gault Creatinine Clearance](#cockcroft-gault-creatinine-clearance)
  - [CKD-EPI Glomerular Filtration Rate (eGFR - 2021)](#ckd-epi-glomerular-filtration-rate-egfr---2021)
  - [Free Water Deficit](#free-water-deficit)
  - [Sodium Correction for Hyperglycemia](#sodium-correction-for-hyperglycemia)
  - [Transtubular Potassium Gradient (TTKG)](#transtubular-potassium-gradient-ttkg)
  - [Serum Anion Gap](#serum-anion-gap)
  - [Corrected Anion Gap (for Hypoalbuminemia)](#corrected-anion-gap-for-hypoalbuminemia)
  - [Delta-Delta Ratio (\(\Delta AG / \Delta HCO_3^-\))](#delta-delta-ratio-delta-ag--delta-hco_3-)
  - [Winter's Formula](#winters-formula)
  - [Serum Osmolal Gap](#serum-osmolal-gap)
  - [Urine Anion Gap](#urine-anion-gap)
  - [Bicarbonate Deficit](#bicarbonate-deficit)
- [Gastroenterology and Hepatology Scores](#gastroenterology-and-hepatology-scores)
  - [Model for End-Stage Liver Disease (MELD) Score (Original pre-2016)](#model-for-end-stage-liver-disease-meld-score-original-pre-2016)
  - [MELD-Na Score (2016)](#meld-na-score-2016)
  - [Child-Pugh Classification for Severity of Liver Disease](#child-pugh-classification-for-severity-of-liver-disease)
  - [Serum-Ascites Albumin Gradient (SAAG)](#serum-ascites-albumin-gradient-saag)
  - [Maddrey's Discriminant Function (DF)](#maddreys-discriminant-function-df)
  - [Lille Model for Alcoholic Hepatitis](#lille-model-for-alcoholic-hepatitis)
  - [Ranson's Criteria for Acute Pancreatitis](#ransons-criteria-for-acute-pancreatitis)
  - [FIB-4 Index (Fibrosis-4)](#fib-4-index-fibrosis-4)
  - [AST to Platelet Ratio Index (APRI)](#ast-to-platelet-ratio-index-apri)
  - [Glasgow-Blatchford Bleeding Score (GBS)](#glasgow-blatchford-bleeding-score-gbs)

---

## Nephrology and Acid-Base Formulas

### Fractional Excretion of Sodium (FENa)
- **Category:** Nephrology / Acute Kidney Injury (AKI)
- **Clinical Indication:** Differentiating prerenal AKI from intrinsic renal injury (e.g., Acute Tubular Necrosis [ATN]) in oliguric patients.
- **Formula / Algorithm:** 
  $$FENa (\%) = \left( \frac{U_{Na} \times P_{Cr}}{P_{Na} \times U_{Cr}} \right) \times 100$$
- **Input Parameters:**
  - `P_Na` (mEq/L or mmol/L, Serum/Plasma Sodium)
  - `P_Cr` (mg/dL or \(\mu\)mol/L, Serum/Plasma Creatinine)
  - `U_Na` (mEq/L or mmol/L, Urine Sodium)
  - `U_Cr` (mg/dL or \(\mu\)mol/L, Urine Creatinine)
- **Output & Interpretation:**
  - **FENa < 1%:** Suggests prerenal etiology (renal hypoperfusion, volume depletion, heart failure, hepatorenal syndrome) where kidneys appropriately conserve sodium.
  - **FENa > 2%:** Suggests intrinsic renal etiology (ATN) where damaged tubules lose the ability to reabsorb sodium.
  - **FENa 1% - 2%:** Indeterminate/mixed picture.
- **Clinical Pearls / Pocket Medicine Context:**
  - Only valid in oliguric patients (\(<400\) mL/day) with acute kidney injury.
  - **Invalidated by diuretic use** (which increases sodium excretion, mimicking ATN). Use FEUrea instead.
  - *Exceptions (FENa > 1% but prerenal):* CKD, diuretic use, severe vomiting (bicarbonaturia drags sodium out).
  - *Exceptions (FENa < 1% but intrinsic):* Contrast-induced nephropathy, pigment-induced nephropathy (rhabdomyolysis, hemolysis), early glomerulonephritis, or chronic prerenal states (hepatorenal syndrome).
- **MDCalc Link:** [https://www.mdcalc.com/calc/32/fractional-excretion-sodium-fena](https://www.mdcalc.com/calc/32/fractional-excretion-sodium-fena)

---

### Fractional Excretion of Urea (FEUrea)
- **Category:** Nephrology / Acute Kidney Injury (AKI)
- **Clinical Indication:** Differentiating prerenal AKI from intrinsic ATN, especially in patients who have received diuretics.
- **Formula / Algorithm:** 
  $$FEUrea (\%) = \left( \frac{U_{Urea} \times P_{Cr}}{P_{Urea} \times U_{Cr}} \right) \times 100$$
  Or, using Blood Urea Nitrogen (BUN) and Urine Urea Nitrogen (UUN):
  $$FEUrea (\%) = \left( \frac{UUN \times P_{Cr}}{BUN \times U_{Cr}} \right) \times 100$$
- **Input Parameters:**
  - `P_Cr` (mg/dL or \(\mu\)mol/L, Serum/Plasma Creatinine)
  - `BUN` (mg/dL or mmol/L, Blood Urea Nitrogen)
  - `U_Cr` (mg/dL or \(\mu\)mol/L, Urine Creatinine)
  - `UUN` (mg/dL or mmol/L, Urine Urea Nitrogen)
- **Output & Interpretation:**
  - **FEUrea < 35%:** Suggests prerenal etiology.
  - **FEUrea > 35%:** Suggests intrinsic renal etiology (ATN).
- **Clinical Pearls / Pocket Medicine Context:**
  - Preferred over FENa in patients taking diuretics. Loop and thiazide diuretics affect distal sodium transporters but do not directly block the passive reabsorption of urea in the proximal tubule.
- **MDCalc Link:** [https://www.mdcalc.com/calc/62/fractional-excretion-urea-feurea](https://www.mdcalc.com/calc/62/fractional-excretion-urea-feurea)

---

### Cockcroft-Gault Creatinine Clearance
- **Category:** Nephrology / Renal Function
- **Clinical Indication:** Estimating creatinine clearance (CrCl) to guide drug dosing.
- **Formula / Algorithm:** 
  $$CrCl \text{ (mL/min)} = \frac{(140 - \text{Age}) \times \text{Weight (kg)}}{72 \times P_{Cr} \text{ (mg/dL)}} \times [0.85 \text{ if Female}]$$
- **Input Parameters:**
  - `Age` (years)
  - `Sex` (Male / Female)
  - `Weight` (kg)
  - `Serum Creatinine (P_Cr)` (mg/dL)
- **Output & Interpretation:**
  - Estimated Creatinine Clearance (mL/min). Dosing schedules of renal-cleared medications are adjusted based on this value.
- **Clinical Pearls / Pocket Medicine Context:**
  - Historically the standard equation for FDA drug dosing guidelines.
  - Overestimates true GFR due to renal tubular secretion of creatinine.
  - **Weight Selection:**
    - If actual body weight (ABW) < ideal body weight (IBW), use ABW.
    - If ABW \(\approx\) IBW, use ABW.
    - If obese (ABW > 1.3 * IBW), use Adjusted Body Weight (\(AdjBW = IBW + 0.4 \times [ABW - IBW]\)).
    - *Ideal Body Weight Formula:*
      - Male: \(50.0 \text{ kg} + 2.3 \text{ kg per inch over 5 feet}\)
      - Female: \(45.5 \text{ kg} + 2.3 \text{ kg per inch over 5 feet}\)
  - Underestimates clearance in cachectic or elderly patients due to reduced muscle mass (resulting in deceptively low serum creatinine levels).
- **MDCalc Link:** [https://www.mdcalc.com/calc/63/creatinine-clearance-cockcroft-gault-equation](https://www.mdcalc.com/calc/63/creatinine-clearance-cockcroft-gault-equation)

---

### CKD-EPI Glomerular Filtration Rate (eGFR - 2021)
- **Category:** Nephrology / Renal Function
- **Clinical Indication:** Estimating GFR to diagnose, stage, and monitor Chronic Kidney Disease (CKD).
- **Formula / Algorithm:** 
  The 2021 CKD-EPI creatinine equation (which removes race):
  $$\text{eGFR} = 142 \times \min(S_{Cr}/\kappa, 1)^\alpha \times \max(S_{Cr}/\kappa, 1)^{-1.200} \times 0.9938^{\text{Age}} \times [1.012 \text{ if Female}]$$
  where:
  - \(S_{Cr}\) is Serum Creatinine in mg/dL
  - \(\kappa = 0.7\) for females and \(0.9\) for males
  - \(\alpha = -0.241\) for females and \(-0.302\) for males
- **Input Parameters:**
  - `Serum Creatinine (S_Cr)` (mg/dL)
  - `Age` (years)
  - `Sex` (Male / Female)
- **Output & Interpretation:**
  - Estimated GFR in \(\text{mL/min/1.73 m}^2\).
  - **KDIGO CKD Staging:**
    - **G1:** \(\ge 90\) (Normal or high)
    - **G2:** \(60-89\) (Mildly decreased)
    - **G3a:** \(45-59\) (Mildly to moderately decreased)
    - **G3b:** \(30-44\) (Moderately to severely decreased)
    - **G4:** \(15-29\) (Severely decreased)
    - **G5:** \(< 15\) (Kidney failure / ESRD)
- **Clinical Pearls / Pocket Medicine Context:**
  - The 2021 equation was updated to eliminate the race coefficient from prior equations to ensure equitable clinical assessment.
  - Less accurate in patients with atypical muscle mass (bodybuilders, amputees, chronic wasting diseases) or during pregnancy.
- **MDCalc Link:** [https://www.mdcalc.com/calc/3931/ckd-epi-equations-glomerular-filtration-rate-gfr](https://www.mdcalc.com/calc/3931/ckd-epi-equations-glomerular-filtration-rate-gfr)

---

### Free Water Deficit
- **Category:** Nephrology / Electrolytes
- **Clinical Indication:** Calculating the volume of free water required to correct hypernatremia.
- **Formula / Algorithm:** 
  $$\text{Free Water Deficit (L)} = \text{TBW} \times \left( \frac{\text{Serum } Na^+}{140} - 1 \right)$$
  where Total Body Water (TBW) is:
  - Young Male: \(0.60 \times \text{Weight (kg)}\)
  - Young Female / Elderly Male: \(0.50 \times \text{Weight (kg)}\)
  - Elderly Female: \(0.45 \times \text{Weight (kg)}\)
- **Input Parameters:**
  - `Serum Sodium (Na)` (mEq/L)
  - `Weight` (kg)
  - `Sex` (Male / Female)
  - `Age Group` (Young / Elderly)
- **Output & Interpretation:**
  - Free water deficit in Liters.
- **Clinical Pearls / Pocket Medicine Context:**
  - **Crucial Rule:** Correct hypernatremia slowly to avoid cerebral edema, seizures, and permanent neurological damage. The correction rate should not exceed **10-12 mEq/L in 24 hours** (or ~0.5 mEq/L per hour).
  - This formula only estimates the *current deficit* to bring sodium to 140 mEq/L. It does **not** account for ongoing urinary or insensible losses, which must be added to the daily fluid prescription.
  - Enteral free water (via NG/PEG tube) is preferred if the gut is functional; otherwise, IV D5W is the standard.
- **MDCalc Link:** [https://www.mdcalc.com/calc/113/free-water-deficit-hypernatremia](https://www.mdcalc.com/calc/113/free-water-deficit-hypernatremia)

---

### Sodium Correction for Hyperglycemia
- **Category:** Nephrology / Electrolytes
- **Clinical Indication:** Estimating the true sodium concentration in the presence of hypertonic hyperglycemia.
- **Formula / Algorithm:** 
  For Glucose > 100 mg/dL:
  $$\text{Corrected } Na^+ = \text{Measured } Na^+ + 1.6 \times \left( \frac{\text{Glucose (mg/dL)} - 100}{100} \right)$$
  - *Alternative factor for glucose > 400 mg/dL:*
    $$\text{Corrected } Na^+ = \text{Measured } Na^+ + 2.4 \times \left( \frac{\text{Glucose (mg/dL)} - 100}{100} \right)$$
- **Input Parameters:**
  - `Measured Sodium` (mEq/L)
  - `Glucose` (mg/dL)
- **Output & Interpretation:**
  - Corrected Sodium (mEq/L) represents the expected serum sodium if hyperglycemia were normalized to 100 mg/dL.
- **Clinical Pearls / Pocket Medicine Context:**
  - Hyperglycemia acts as an osmolyte, shifting water from the intracellular to extracellular space and diluting measured serum sodium (translocational hyponatremia).
  - If the corrected sodium is high (>145 mEq/L), the patient has an underlying free water deficit (hypernatremia) that is currently masked by the hyperglycemia.
- **MDCalc Link:** [https://www.mdcalc.com/calc/258/sodium-correction-hyperglycemia](https://www.mdcalc.com/calc/258/sodium-correction-hyperglycemia)

---

### Transtubular Potassium Gradient (TTKG)
- **Category:** Nephrology / Electrolytes
- **Clinical Indication:** Evaluating renal response to hypokalemia or hyperkalemia by assessing aldosterone activity in the cortical collecting duct.
- **Formula / Algorithm:** 
  $$\text{TTKG} = \frac{U_K \times P_{Osm}}{P_K \times U_{Osm}}$$
  - **Prerequisites for Validity:**
    - Urine \(Na^+ > 25\) mEq/L (guarantees adequate distal delivery of sodium).
    - Urine Osmolality \(\ge\) Plasma Osmolality (\(U_{Osm} \ge P_{Osm}\)).
- **Input Parameters:**
  - `Serum Potassium (P_K)` (mEq/L)
  - `Urine Potassium (U_K)` (mEq/L)
  - `Serum Osmolality (P_Osm)` (mOsm/kg H2O)
  - `Urine Osmolality (U_Osm)` (mOsm/kg H2O)
- **Output & Interpretation:**
  - **In Hyperkalemia:**
    - **TTKG < 6-7:** Suggests hypoaldosteronism or aldosterone resistance (renal cause).
    - **TTKG > 10:** Suggests normal renal response (extrarenal cause).
  - **In Hypokalemia:**
    - **TTKG < 3:** Suggests extrarenal potassium loss or transcellular shift (renal conservation is intact).
    - **TTKG > 7:** Suggests renal potassium wasting (aldosterone excess, diuretics, RTA).
- **Clinical Pearls / Pocket Medicine Context:**
  - Under physiological conditions, aldosterone increases potassium secretion in the collecting duct, elevating TTKG.
  - Pocket Medicine notes that the validity of TTKG has been questioned in recent years because water reabsorption does occur in the medullary collecting duct, which violates assumptions. However, it remains a frequently tested clinical concept.
- **MDCalc Link:** [https://www.mdcalc.com/calc/3944/transtubular-potassium-gradient-ttkg](https://www.mdcalc.com/calc/3944/transtubular-potassium-gradient-ttkg)

---

### Serum Anion Gap
- **Category:** Nephrology / Acid-Base
- **Clinical Indication:** Evaluating metabolic acidosis to differentiate between anion gap and non-anion gap metabolic acidosis (NAGMA).
- **Formula / Algorithm:** 
  $$AG = Na^+ - (Cl^- + HCO_3^-)$$
- **Input Parameters:**
  - `Serum Sodium` (mEq/L)
  - `Serum Chloride` (mEq/L)
  - `Serum Bicarbonate` (mEq/L)
- **Output & Interpretation:**
  - **Normal Anion Gap:** Typically 8 to 12 mEq/L.
  - **AG > 12:** High Anion Gap Metabolic Acidosis (HAGMA).
- **Clinical Pearls / Pocket Medicine Context:**
  - Causes of HAGMA can be remembered by the mnemonic **GOLD MARK** or **MUDPILES**:
    - **G**lycols (ethylene and propylene)
    - **O**xoproline (associated with chronic acetaminophen use)
    - **L**-lactate (shock, hypoperfusion)
    - **D**-lactate (short bowel syndrome)
    - **M**ethanol
    - **A**spirin (salicylates)
    - **R**enal failure (uremia)
    - **K**etoacidosis (DKA, alcoholic, starvation)
  - Causes of a low anion gap (< 6 mEq/L): Hypoalbuminemia (most common), myeloma (IgG cationic paraproteinemia), bromide or iodide toxicity, severe hypermagnesemia or hypercalcemia.
- **MDCalc Link:** [https://www.mdcalc.com/calc/13/anion-gap](https://www.mdcalc.com/calc/13/anion-gap)

---

### Corrected Anion Gap (for Hypoalbuminemia)
- **Category:** Nephrology / Acid-Base
- **Clinical Indication:** Adjusting the measured anion gap in patients with hypoalbuminemia.
- **Formula / Algorithm:** 
  $$\text{Corrected } AG = AG_{measured} + 2.5 \times (4.0 - \text{Albumin [g/dL]})$$
- **Input Parameters:**
  - `Measured Anion Gap` (mEq/L)
  - `Serum Albumin` (g/dL)
- **Output & Interpretation:**
  - Corrected Anion Gap (mEq/L).
- **Clinical Pearls / Pocket Medicine Context:**
  - Albumin is the primary unmeasured anion in normal serum. For every 1 g/dL drop in serum albumin below 4.0 g/dL, the baseline normal anion gap decreases by approximately 2.5 mEq/L.
  - Correcting for hypoalbuminemia is crucial in critically ill patients, as severe hypoalbuminemia can easily mask HAGMA.
- **MDCalc Link:** [https://www.mdcalc.com/calc/26/serum-anion-gap](https://www.mdcalc.com/calc/26/serum-anion-gap) *(integrated within Serum Anion Gap)*

---

### Delta-Delta Ratio (\(\Delta AG / \Delta HCO_3^-\))
- **Category:** Nephrology / Acid-Base
- **Clinical Indication:** Identifying mixed acid-base disorders in patients with HAGMA.
- **Formula / Algorithm:** 
  $$\Delta-\Delta = \frac{\Delta AG}{\Delta HCO_3^-} = \frac{AG_{measured} - 12}{24 - HCO_3^-}$$
  Alternatively, calculated as the expected Bicarbonate:
  $$\text{Expected } HCO_3^- = HCO_3^- + (AG_{measured} - 12)$$
- **Input Parameters:**
  - `Measured Anion Gap` (mEq/L)
  - `Serum Bicarbonate` (mEq/L)
- **Output & Interpretation:**
  - **Ratio < 0.8:** Mixed HAGMA and NAGMA. The bicarbonate level is lower than expected for the degree of anion gap increase (e.g., patient with both uremic acidosis and diarrhea).
  - **Ratio 0.8 - 2.0:** Pure HAGMA (1.0 in lactic acidosis, 1.0-1.6 in DKA due to urinary excretion of ketoanions).
  - **Ratio > 2.0:** Mixed HAGMA and Metabolic Alkalosis. The bicarbonate level is higher than expected, indicating a concurrent alkalosis (e.g., patient with lactic acidosis who is vomiting or taking loop diuretics).
- **Clinical Pearls / Pocket Medicine Context:**
  - Analyzing the delta-delta is standard practice in complex clinical scenarios like DKA, renal failure, or sepsis to uncover underlying, coexisting acid-base disturbances.
- **MDCalc Link:** Commonly calculated manually. Reference: [Serum Anion Gap on MDCalc](https://www.mdcalc.com/calc/26/serum-anion-gap).

---

### Winter's Formula
- **Category:** Nephrology / Acid-Base
- **Clinical Indication:** Evaluating if respiratory compensation in metabolic acidosis is appropriate.
- **Formula / Algorithm:** 
  $$\text{Expected } PCO_2 \text{ (mmHg)} = (1.5 \times HCO_3^-) + 8 \pm 2$$
- **Input Parameters:**
  - `Serum Bicarbonate` (mEq/L)
- **Output & Interpretation:**
  - Expected arterial partial pressure of carbon dioxide (\(PCO_2\)).
  - **Measured \(PCO_2 >\) Expected:** Coexisting primary Respiratory Acidosis (hypoventilation, respiratory muscle fatigue, COPD, airway obstruction).
  - **Measured \(PCO_2 <\) Expected:** Coexisting primary Respiratory Alkalosis (hyperventilation, pain, sepsis, salicylate toxicity).
- **Clinical Pearls / Pocket Medicine Context:**
  - Respiratory compensation begins within hours and reaches its steady state in 12-24 hours.
  - Shortcut rule: the last two digits of the pH should roughly equal the \(PCO_2\) in a pure metabolic acidosis (e.g., pH 7.25 \(\rightarrow PCO_2 \approx 25\) mmHg).
- **MDCalc Link:** [https://www.mdcalc.com/calc/117/winters-formula-metabolic-acidosis-compensation](https://www.mdcalc.com/calc/117/winters-formula-metabolic-acidosis-compensation)

---

### Serum Osmolal Gap
- **Category:** Nephrology / Acid-Base / Toxicology
- **Clinical Indication:** Screening for toxic alcohol ingestion (methanol, ethylene glycol, isopropyl alcohol, propylene glycol) in patients with unexplained acid-base or neurological conditions.
- **Formula / Algorithm:** 
  $$\text{Osmolal Gap} = \text{Measured Osmolality} - \text{Calculated Osmolality}$$
  where:
  $$\text{Calculated Osmolality (mOsm/kg H}_2\text{O)} = 2 \times Na^+ + \frac{\text{Glucose (mg/dL)}}{18} + \frac{\text{BUN (mg/dL)}}{2.8}$$
  If ethanol is present:
  $$\text{Calculated Osmolality with EtOH} = 2 \times Na^+ + \frac{\text{Glucose}}{18} + \frac{\text{BUN}}{2.8} + \frac{\text{Ethanol (mg/dL)}}{4.6}$$
- **Input Parameters:**
  - `Measured Osmolality` (mOsm/kg)
  - `Serum Sodium` (mEq/L)
  - `Glucose` (mg/dL)
  - `BUN` (mg/dL)
  - `Ethanol` (mg/dL, optional)
- **Output & Interpretation:**
  - **Normal Gap:** < 10 mOsm/kg.
  - **Elevated Gap (> 10-20 mOsm/kg):** Suggests the presence of unmeasured active osmolytes (toxic alcohols).
- **Clinical Pearls / Pocket Medicine Context:**
  - Isopropyl alcohol causes elevated osmolal gap and ketosis, but **no** metabolic acidosis (metabolized to acetone).
  - Ethylene glycol and methanol cause both elevated osmolal gap and HAGMA.
  - As time passes after ingestion, the parent toxic alcohol (which causes the osmolal gap) is metabolized into acidic metabolites (which cause the anion gap). Therefore, early on the osmolal gap is high and anion gap is normal; late on the anion gap is high and osmolal gap is normal.
- **MDCalc Link:** [https://www.mdcalc.com/calc/91/serum-osmolality-osmolarity](https://www.mdcalc.com/calc/91/serum-osmolality-osmolarity)

---

### Urine Anion Gap
- **Category:** Nephrology / Acid-Base
- **Clinical Indication:** Differentiating renal (RTA) from extrarenal (diarrhea) causes of hyperchloremic (non-anion gap) metabolic acidosis (NAGMA).
- **Formula / Algorithm:** 
  $$UAG = U_{Na} + U_K - U_{Cl}$$
- **Input Parameters:**
  - `Urine Sodium (U_Na)` (mEq/L)
  - `Urine Potassium (U_K)` (mEq/L)
  - `Urine Chloride (U_Cl)` (mEq/L)
- **Output & Interpretation:**
  - **Negative UAG (-20 to -50 mEq/L):** Suggests extrarenal bicarbonate loss (e.g., diarrhea). The kidneys are appropriately excreting ammonium (\(NH_4^+\)), which is excreted as ammonium chloride (\(NH_4Cl\)). The high urine chloride creates a negative gap.
  - **Positive UAG (positive value):** Suggests renal acidification defect (e.g., distal RTA). The kidneys cannot secrete ammonium, resulting in low urine chloride levels and a positive gap.
- **Clinical Pearls / Pocket Medicine Context:**
  - Ammonium (\(NH_4^+\)) is the primary unmeasured cation in urine. Electroneutrality requires chloride excretion to match ammonium, making urine chloride the surrogate marker for ammonium excretion.
  - If urine contains other unmeasured anions (e.g., beta-hydroxybutyrate in DKA or hippurate in toluene toxicity), the UAG can be falsely positive despite intact ammonium excretion. In these cases, the **Urine Osmolal Gap** is more reliable.
- **MDCalc Link:** [https://www.mdcalc.com/calc/2045/urine-anion-gap](https://www.mdcalc.com/calc/2045/urine-anion-gap)

---

### Bicarbonate Deficit
- **Category:** Nephrology / Acid-Base
- **Clinical Indication:** Estimating the amount of intravenous sodium bicarbonate required to correct severe metabolic acidosis.
- **Formula / Algorithm:** 
  $$\text{HCO}_3^- \text{ Deficit (mEq)} = 0.5 \times \text{Weight (kg)} \times (HCO_{3,\text{target}} - HCO_{3,\text{measured}})$$
- **Input Parameters:**
  - `Measured Bicarbonate` (mEq/L)
  - `Target Bicarbonate` (mEq/L, typically set to 15 mEq/L rather than 24 to avoid overcorrection)
  - `Weight` (kg)
- **Output & Interpretation:**
  - Bicarbonate deficit in mEq.
- **Clinical Pearls / Pocket Medicine Context:**
  - Administering bicarbonate is controversial in lactic acidosis and DKA. It is generally reserved for severe acidemia (pH < 7.1) causing hemodynamic instability or severe hyperkalemia.
  - Always correct slowly to avoid rebound metabolic alkalosis, hypokalemia, hypocalcemia (by increasing albumin-calcium binding), and intracellular acidosis (as \(HCO_3^-\) combines with \(H^+\) to form \(CO_2\), which easily diffuses into cells).
- **MDCalc Link:** [https://www.mdcalc.com/calc/10041/bicarbonate-deficit](https://www.mdcalc.com/calc/10041/bicarbonate-deficit)

---

## Gastroenterology and Hepatology Scores

### Model for End-Stage Liver Disease (MELD) Score (Original pre-2016)
- **Category:** Gastroenterology / Hepatology
- **Clinical Indication:** Predicting 3-month mortality in patients with end-stage liver disease; used to allocate livers for transplantation.
- **Formula / Algorithm:** 
  $$\text{MELD} = 3.78 \times \ln(\text{Bilirubin [mg/dL]}) + 11.2 \times \ln(\text{INR}) + 9.57 \times \ln(\text{Creatinine [mg/dL]}) + 6.43$$
  - **Rules:**
    - Any value < 1.0 is set to 1.0.
    - If the patient has had dialysis \(\ge 2\) times in the past 7 days, Creatinine is capped at 4.0 mg/dL.
    - If Creatinine is > 4.0, it is set to 4.0 mg/dL.
    - Result is rounded to the nearest integer.
- **Input Parameters:**
  - `Total Bilirubin` (mg/dL)
  - `INR`
  - `Serum Creatinine` (mg/dL)
  - `Dialysis History` (Yes / No)
- **Output & Interpretation:**
  - Score ranges from 6 to 40.
  - Correlation with 3-month mortality:
    - \(\ge 40\): 71.3% mortality
    - 30-39: 52.6% mortality
    - 20-29: 19.6% mortality
    - 10-19: 6.0% mortality
    - < 9: 1.9% mortality
- **Clinical Pearls / Pocket Medicine Context:**
  - Highly objective scoring system, removing clinical subjectivity (such as ascites and encephalopathy scoring in Child-Pugh).
  - Used for liver allocation in patients aged 12 and older.
- **MDCalc Link:** [https://www.mdcalc.com/calc/28/meld-score-model-end-stage-liver-disease-12-older](https://www.mdcalc.com/calc/28/meld-score-model-end-stage-liver-disease-12-older)

---

### MELD-Na Score (2016)
- **Category:** Gastroenterology / Hepatology
- **Clinical Indication:** Standardized liver transplant prioritization score incorporating serum sodium.
- **Formula / Algorithm:** 
  If the original MELD score is > 11:
  $$\text{MELD-Na} = \text{MELD} - Na - [0.025 \times \text{MELD} \times (140 - Na)] + 140$$
  where:
  - Serum sodium is bound between 125 and 137 mEq/L (if < 125, set to 125; if > 137, set to 137).
  If MELD \(\le\) 11, MELD-Na is equal to MELD.
- **Input Parameters:**
  - `Total Bilirubin` (mg/dL)
  - `INR`
  - `Serum Creatinine` (mg/dL)
  - `Serum Sodium` (mEq/L)
  - `Dialysis History` (Yes / No)
- **Output & Interpretation:**
  - Score ranges from 6 to 40. Used by UNOS to allocate donor organs.
- **Clinical Pearls / Pocket Medicine Context:**
  - Hyponatremia is a well-recognized independent risk factor for death in cirrhotic patients, representing advanced arterial vasodilation and hypervolemic hyponatremia. Adding sodium improved waitlist mortality prediction.
  - Modern transplant prioritization now frequently uses MELD 3.0, which incorporates sex and additional variables, but MELD-Na (2016) remains standard in many clinical contexts.
- **MDCalc Link:** [https://www.mdcalc.com/calc/10077/meld-na-original-meld-plus-sodium-2016](https://www.mdcalc.com/calc/10077/meld-na-original-meld-plus-sodium-2016)

---

### Child-Pugh Classification for Severity of Liver Disease
- **Category:** Gastroenterology / Hepatology
- **Clinical Indication:** Prognostication in cirrhosis, assessing perioperative mortality risk, and adjusting drug dosages.
- **Formula / Algorithm:** 
  Points are assigned based on five parameters:
  
  | Variable | 1 Point | 2 Points | 3 Points |
  | :--- | :--- | :--- | :--- |
  | **Total Bilirubin** (mg/dL) | < 2.0 | 2.0 - 3.0 | > 3.0 |
  | **Serum Albumin** (g/dL) | > 3.5 | 2.8 - 3.5 | < 2.8 |
  | **INR** (or PT prolongation) | < 1.7 (< 4s) | 1.7 - 2.3 (4-6s) | > 2.3 (> 6s) |
  | **Ascites** | None | Mild / Controlled with diuretics | Moderate-Severe / Refractory |
  | **Encephalopathy** | None | Grade I-II (mild) | Grade III-IV (stupor/coma) |
- **Input Parameters:**
  - `Total Bilirubin` (mg/dL)
  - `Serum Albumin` (g/dL)
  - `INR`
  - `Ascites` (None / Mild / Moderate-Severe)
  - `Encephalopathy` (None / Grade I-II / Grade III-IV)
- **Output & Interpretation:**
  - **Class A (5 - 6 points):** Well-compensated; 1-year survival ~100%; low surgical risk.
  - **Class B (7 - 9 points):** Significant functional impairment; 1-year survival ~80%; intermediate surgical risk.
  - **Class C (10 - 15 points):** Decompensated; 1-year survival ~45%; high surgical risk (elective surgery is generally contraindicated).
- **Clinical Pearls / Pocket Medicine Context:**
  - Subjective components (ascites and encephalopathy scoring) can vary between observers, which is why MELD was adopted for liver transplant allocation.
  - Still widely used in FDA drug package inserts for dosing guidelines in liver impairment.
- **MDCalc Link:** [https://www.mdcalc.com/calc/340/child-pugh-score-cirrhosis-mortality](https://www.mdcalc.com/calc/340/child-pugh-score-cirrhosis-mortality)

---

### Serum-Ascites Albumin Gradient (SAAG)
- **Category:** Gastroenterology / Hepatology / Ascites
- **Clinical Indication:** Differentiating portal hypertension from non-portal hypertension etiologies of ascites.
- **Formula / Algorithm:** 
  $$\text{SAAG (g/dL)} = \text{Albumin}_{\text{Serum}} - \text{Albumin}_{\text{Ascites}}$$
- **Input Parameters:**
  - `Serum Albumin` (g/dL)
  - `Ascitic Fluid Albumin` (g/dL)
- **Output & Interpretation:**
  - **SAAG \(\ge\) 1.1 g/dL:** Portal Hypertension present (accuracy ~97%).
    - *Causes:* Cirrhosis, heart failure (congestive heart failure, constrictive pericarditis), Budd-Chiari syndrome, portal vein thrombosis, sinusoidal obstruction syndrome (veno-occlusive disease).
  - **SAAG < 1.1 g/dL:** Portal Hypertension absent.
    - *Causes:* Peritoneal carcinomatosis, tuberculous peritonitis, pancreatic ascites, nephrotic syndrome, biliary leak, serositis.
- **Clinical Pearls / Pocket Medicine Context:**
  - Replaced the older transudate vs. exudate classification (based on total protein).
  - To differentiate cardiac causes from liver cirrhosis among high-SAAG ascites:
    - **Ascitic Total Protein \(\ge\) 2.5 g/dL:** Suggests cardiac ascites (hepatic sinusoids are healthy and allow protein leak, but pressure is high).
    - **Ascitic Total Protein < 2.5 g/dL:** Suggests cirrhotic ascites (hepatic sinusoids are fibrotic and scarred, blocking protein passage).
  - Caveat: Systemic hypoalbuminemia can narrow the gradient, occasionally causing false low values.
- **MDCalc Link:** [https://www.mdcalc.com/calc/3096/serum-ascites-albumin-gradient-saag](https://www.mdcalc.com/calc/3096/serum-ascites-albumin-gradient-saag)

---

### Maddrey's Discriminant Function (DF)
- **Category:** Gastroenterology / Hepatology
- **Clinical Indication:** Predicting short-term mortality in patients with acute alcoholic hepatitis to determine eligibility for corticosteroid therapy.
- **Formula / Algorithm:** 
  $$\text{DF} = 4.6 \times (\text{PT}_{\text{patient}} - \text{PT}_{\text{control}}) + \text{Total Bilirubin (mg/dL)}$$
- **Input Parameters:**
  - `Patient Prothrombin Time (PT)` (seconds)
  - `Control Prothrombin Time (PT)` (seconds)
  - `Total Bilirubin` (mg/dL)
- **Output & Interpretation:**
  - **DF < 32:** Mild-to-moderate alcoholic hepatitis. Low short-term mortality risk. Corticosteroids are not indicated.
  - **DF \(\ge\) 32:** Severe alcoholic hepatitis. High 28-day mortality (30-50%). Indicates a benefit from corticosteroid therapy (e.g., prednisolone 40 mg daily for 28 days), provided there are no contraindications (active infection, renal failure, active GI bleeding).
- **Clinical Pearls / Pocket Medicine Context:**
  - If corticosteroids are contraindicated, Pentoxifylline was historically used, though recent studies (STOPAH trial) showed no mortality benefit.
  - Response to steroids is assessed at Day 7 using the **Lille Score**.
- **MDCalc Link:** [https://www.mdcalc.com/calc/33/maddreys-discriminant-function-alcoholic-hepatitis](https://www.mdcalc.com/calc/33/maddreys-discriminant-function-alcoholic-hepatitis)

---

### Lille Model for Alcoholic Hepatitis
- **Category:** Gastroenterology / Hepatology
- **Clinical Indication:** Assessing responsiveness to corticosteroid therapy in severe alcoholic hepatitis at Day 7 of treatment.
- **Formula / Algorithm:** 
  Calculates a score (using a logistic regression equation) based on age, renal function, albumin, PT, baseline bilirubin, and bilirubin on Day 7 of treatment:
  $$\text{Score} = \frac{e^{-R}}{1 + e^{-R}}$$
  where:
  $$R = 3.19 - (0.101 \times \text{Age}) + (0.147 \times \text{Albumin}_{\text{Day 0}} \text{ [g/L]}) + (0.0165 \times \Delta\text{Bilirubin [}\mu\text{mol/L]}) - (0.206 \times \text{Renal insufficiency}) - (0.0065 \times \text{Bilirubin}_{\text{Day 0}} \text{ [}\mu\text{mol/L]}) - (0.111 \times \text{PT}_{\text{Day 0}} \text{ [seconds]})$$
  *(Note: Renal insufficiency is scored as 1 if creatinine > 1.3 mg/dL, 0 otherwise; bilirubin and albumin are in \(\mu\)mol/L and g/L respectively; \(\Delta\text{Bilirubin}\) is Day 0 bilirubin minus Day 7 bilirubin)*
- **Input Parameters:**
  - `Age` (years)
  - `Renal Insufficiency` (Yes/No, creatinine > 1.3 mg/dL)
  - `Albumin (Day 0)` (g/L)
  - `Prothrombin Time (Day 0)` (seconds)
  - `Total Bilirubin (Day 0)` (\(\mu\)mol/L)
  - `Total Bilirubin (Day 7)` (\(\mu\)mol/L)
- **Output & Interpretation:**
  - **Lille Score < 0.45:** Steroid responder. Standard 28-day course of prednisolone should be completed. 6-month survival is ~85%.
  - **Lille Score \(\ge\) 0.45:** Steroid non-responder. Corticosteroids should be discontinued to avoid infectious complications as treatment is deemed futile. 6-month survival is < 25%. Consider alternative therapies or early transplant.
- **Clinical Pearls / Pocket Medicine Context:**
  - Critical tool to prevent unnecessary immunosuppression in non-responders.
- **MDCalc Link:** [https://www.mdcalc.com/calc/2024/lille-model-alcoholic-hepatitis](https://www.mdcalc.com/calc/2024/lille-model-alcoholic-hepatitis)

---

### Ranson's Criteria for Acute Pancreatitis
- **Category:** Gastroenterology / Pancreatology
- **Clinical Indication:** Predicting the severity and mortality of acute pancreatitis.
- **Formula / Algorithm:** 
  Scored on 11 parameters across two time points (Admission and 48 hours).
  
  **At Admission (5 parameters):**
  - [ ] Age > 55 years (> 70 for gallstone)
  - [ ] WBC > 16,000 / \(\mu\)L (> 18,000 for gallstone)
  - [ ] Glucose > 200 mg/dL (> 220 for gallstone)
  - [ ] AST > 250 U/L (> 250 for gallstone)
  - [ ] LDH > 350 U/L (> 400 for gallstone)
  
  **Within 48 Hours (6 parameters):**
  - [ ] Hematocrit decrease > 10% from admission (> 10% for gallstone)
  - [ ] BUN increase > 5 mg/dL from admission (> 2 for gallstone)
  - [ ] Calcium < 8.0 mg/dL (< 8.0 for gallstone)
  - [ ] Arterial \(PO_2\) < 60 mmHg (not assessed in gallstone)
  - [ ] Base deficit > 4 mEq/L (> 5 for gallstone)
  - [ ] Fluid sequestration > 6 L (> 4 for gallstone)
- **Input Parameters:**
  - `Etiology` (Gallstone / Non-gallstone)
  - `Age` (years)
  - `Admission variables` (WBC, Glucose, AST, LDH)
  - `48-hour variables` (Hematocrit drop, BUN rise, Serum Calcium, arterial \(PO_2\), base deficit, estimated fluid sequestration)
- **Output & Interpretation:**
  - Score is the sum of met criteria (0 to 11).
  - **Score 0-2:** Mild pancreatitis; mortality < 1%.
  - **Score 3-4:** Moderate pancreatitis; mortality ~15%.
  - **Score 5-6:** Severe pancreatitis; mortality ~40%.
  - **Score \(\ge\) 7:** Very severe pancreatitis; mortality ~100%.
- **Clinical Pearls / Pocket Medicine Context:**
  - A major limitation is the requirement of 48 hours to complete, which is too slow to guide initial aggressive fluid resuscitation.
  - In practice, other scores (like BISAP, APACHE II, or rising BUN at 24 hours) are preferred for early risk stratification.
- **MDCalc Link:** [https://www.mdcalc.com/calc/46/ransons-criteria-pancreatitis-mortality](https://www.mdcalc.com/calc/46/ransons-criteria-pancreatitis-mortality)

---

### FIB-4 Index (Fibrosis-4)
- **Category:** Gastroenterology / Hepatology
- **Clinical Indication:** Non-invasive screening for liver fibrosis in chronic liver diseases (MASLD/NAFLD, Hepatitis C, Hepatitis B).
- **Formula / Algorithm:** 
  $$\text{FIB-4} = \frac{\text{Age (years)} \times \text{AST (U/L)}}{\text{Platelets } (\times 10^9/\text{L}) \times \sqrt{\text{ALT (U/L)}}}$$
  *Note: Platelet count must be in units of \(\times 10^9\)/L (e.g., enter 150 for 150,000/\(\mu\)L).*
- **Input Parameters:**
  - `Age` (years)
  - `AST` (U/L)
  - `ALT` (U/L)
  - `Platelet Count` (\(\times 10^9\)/L)
- **Output & Interpretation:**
  - **For MASLD / NAFLD:**
    - **< 1.30** (or < 2.00 for patients > 65 years): Low risk of advanced fibrosis (Negative Predictive Value > 90%). Reassure and manage in primary care.
    - **1.30 - 2.67:** Indeterminate risk. Recommend secondary testing (e.g., transient elastography / FibroScan, or Enhanced Liver Fibrosis [ELF] test).
    - **> 2.67:** High risk of advanced fibrosis. Refer to hepatology for staging and management.
  - **For Hepatitis C (HCV):**
    - **< 1.45:** Rule-out advanced fibrosis (F3-F4).
    - **> 3.25:** Rule-in cirrhosis.
- **Clinical Pearls / Pocket Medicine Context:**
  - Excellent, cost-effective screening tool that uses routine laboratory panels to avoid liver biopsy.
- **MDCalc Link:** [https://www.mdcalc.com/calc/2200/fibrosis-4-fib-4-index-liver-fibrosis](https://www.mdcalc.com/calc/2200/fibrosis-4-fib-4-index-liver-fibrosis)

---

### AST to Platelet Ratio Index (APRI)
- **Category:** Gastroenterology / Hepatology
- **Clinical Indication:** Quick, non-invasive calculation to evaluate the likelihood of hepatic fibrosis and cirrhosis, particularly in chronic Hepatitis C.
- **Formula / Algorithm:** 
  $$\text{APRI} = \frac{\left( \frac{\text{AST (U/L)}}{\text{AST Upper Limit of Normal (U/L)}} \right) \times 100}{\text{Platelet Count } (\times 10^9/\text{L})}$$
- **Input Parameters:**
  - `AST` (U/L)
  - `AST Upper Limit of Normal (ULN)` (U/L, typically 40 U/L)
  - `Platelet Count` (\(\times 10^9\)/L)
- **Output & Interpretation:**
  - **For Predicting Significant Fibrosis (Ishak score \(\ge\) 3):**
    - **APRI < 0.5:** Excludes significant fibrosis (NPV ~90%).
    - **APRI > 1.5:** Indicates high likelihood of significant fibrosis.
  - **For Predicting Cirrhosis (Ishak score 5-6):**
    - **APRI < 1.0:** Excludes cirrhosis.
    - **APRI > 2.0:** Indicates high likelihood of cirrhosis.
- **Clinical Pearls / Pocket Medicine Context:**
  - Widely recommended by the World Health Organization (WHO) for assessment in low-resource settings because it requires only AST and platelets.
  - Less sensitive and specific than FIB-4 or elastography, but useful when resources are constrained.
- **MDCalc Link:** [https://www.mdcalc.com/calc/3094/ast-platelet-ratio-index-apri](https://www.mdcalc.com/calc/3094/ast-platelet-ratio-index-apri)

---

### Glasgow-Blatchford Bleeding Score (GBS)
- **Category:** Gastroenterology / Upper GI Bleeding
- **Clinical Indication:** Risk stratification of patients presenting with acute upper gastrointestinal bleeding to identify candidates for safe outpatient management.
- **Formula / Algorithm:** 
  Sum points assigned based on admission parameters:
  
  | Variable | Value | Points |
  | :--- | :--- | :--- |
  | **BUN** (mg/dL) | 18.2 - 22.3 | 2 |
  | | 22.4 - 28.0 | 3 |
  | | 28.1 - 70.0 | 4 |
  | | > 70.0 | 6 |
  | **Hemoglobin** (g/dL) | **For Men:** | |
  | | 12.0 - 12.9 | 1 |
  | | 10.0 - 11.9 | 3 |
  | | < 10.0 | 6 |
  | | **For Women:** | |
  | | 10.0 - 11.9 | 1 |
  | | < 10.0 | 6 |
  | **Systolic BP** (mmHg) | 100 - 109 | 1 |
  | | 90 - 99 | 2 |
  | | < 90 | 3 |
  | **Other Markers** | Heart Rate \(\ge\) 100 bpm | 1 |
  | | Melena presentation | 1 |
  | | Syncope presentation | 2 |
  | | Hepatic disease history | 2 |
  | | Cardiac failure history | 2 |
- **Input Parameters:**
  - `BUN` (mg/dL)
  - `Hemoglobin` (g/dL)
  - `Systolic Blood Pressure` (mmHg)
  - `Heart Rate` (bpm)
  - `Presentation with Melena` (Yes/No)
  - `Presentation with Syncope` (Yes/No)
  - `History of Hepatic Disease` (Yes/No)
  - `History of Cardiac Failure` (Yes/No)
- **Output & Interpretation:**
  - **Score 0:** Very low risk (mortality/rebleeding risk < 1%). These patients can be safely discharged and managed as outpatients without urgent endoscopy.
  - **Score \(\ge\) 1:** Higher risk. Requires admission for inpatient management and endoscopy.
- **Clinical Pearls / Pocket Medicine Context:**
  - Most sensitive score for identifying patients who do NOT require intervention (transfusion, endoscopy, surgery).
  - Outperforms the Rockall score for predicting the need for clinical intervention in upper GI bleed.
- **MDCalc Link:** [https://www.mdcalc.com/calc/518/glasgow-blatchford-bleeding-score-gbs](https://www.mdcalc.com/calc/518/glasgow-blatchford-bleeding-score-gbs)
