# Clinical Formulas, Risk Scores, and Diagnostic Criteria: Hematology, Oncology, Endocrinology & Infectious Diseases

This document compiles key clinical calculators, scoring systems, and diagnostic criteria from MGH Pocket Medicine for Hematology, Oncology, Endocrinology, Infectious Diseases, and related specialties. Each entry includes clinical indications, formulas, inputs, interpretations, clinical pearls, and reference links.

---

## Table of Contents
1. [Hematology](#1-hematology)
   - [Absolute Neutrophil Count (ANC)](#absolute-neutrophil-count-anc)
   - [Mentzer Index](#mentzer-index)
   - [4Ts Score for Heparin-Induced Thrombocytopenia (HIT)](#4ts-score-for-heparin-induced-thrombocytopenia-hit)
   - [Revised International Prognostic Scoring System (IPSS-R) for MDS](#revised-international-prognostic-scoring-system-ipss-r-for-mds)
   - [ISTH Criteria for Overt Disseminated Intravascular Coagulation (DIC)](#isth-criteria-for-overt-disseminated-intravascular-coagulation-dic)
2. [Oncology](#2-oncology)
   - [MASCC Risk Index for Febrile Neutropenia](#mascc-risk-index-for-febrile-neutropenia)
   - [SLiM-CRAB Criteria for Multiple Myeloma](#slim-crab-criteria-for-multiple-myeloma)
   - [Cairo-Bishop Criteria for Tumor Lysis Syndrome (TLS)](#cairo-bishop-criteria-for-tumor-lysis-syndrome-tls)
3. [Endocrinology & Metabolism](#3-endocrinology--metabolism)
   - [Corrected Calcium for Hypoalbuminemia](#corrected-calcium-for-hypoalbuminemia)
   - [LDL Friedewald Equation](#ldl-friedewald-equation)
   - [Burch-Wartofsky Point Scale (Thyroid Storm)](#burch-wartofsky-point-scale-thyroid-storm)
   - [Diabetic Ketoacidosis (DKA) vs. Hyperosmolar Hyperglycemic State (HHS) Criteria](#diabetic-ketoacidosis-dka-vs-hyperosmolar-hyperglycemic-state-hhs-criteria)
4. [Infectious Diseases](#4-infectious-diseases)
   - [Centor & Modified Centor (McIsaac) Criteria](#centor--modified-centor-mcisaac-criteria)
   - [SOFA & qSOFA Scores](#sofa--qsofa-scores)
   - [Duke Criteria for Infective Endocarditis](#duke-criteria-for-infective-endocarditis)
   - [CURB-65 Score for Pneumonia Severity](#curb-65-score-for-pneumonia-severity)
5. [Rheumatology](#5-rheumatology)
   - [2015 ACR/EULAR Gout Classification Criteria & Janssens Acute Gout Rule](#2015-acreular-gout-classification-criteria--janssens-acute-gout-rule)

---

## 1. Hematology

### Absolute Neutrophil Count (ANC)
- **Category:** Hematology / Oncology
- **Clinical Indication:** Used to evaluate the severity of neutropenia and assess the risk of developing life-threatening infections, particularly in oncology patients undergoing chemotherapy or individuals with bone marrow disorders.
- **Formula / Algorithm:**
  $$\text{ANC (cells/}\mu\text{L)} = \text{WBC (cells/}\mu\text{L)} \times \left( \frac{\%\text{ Segmented Neutrophils} + \%\text{ Band Neutrophils}}{100} \right)$$
  *Note:* If the WBC count is reported in thousands/$\mu\text{L}$ (e.g., $4.0 \times 10^3/\mu\text{L}$), the formula is:
  $$\text{ANC (cells/}\mu\text{L)} = \text{WBC (thousands/}\mu\text{L)} \times 10 \times \left( \%\text{ Segmented Neutrophils} + \%\text{ Band Neutrophils} \right)$$
- **Input Parameters:**
  - `WBC` (White Blood Cell Count, cells/$\mu\text{L}$ or $10^3/\mu\text{L}$)
  - `Segmented Neutrophils` (%, percentage of total WBCs)
  - `Band Neutrophils` (%, percentage of total WBCs; immature neutrophils)
- **Output & Interpretation:**
  - **Normal:** $> 1,500/\mu\text{L}$ (or $> 1.5 \times 10^9/\text{L}$)
  - **Mild Neutropenia:** $1,000 - 1,500/\mu\text{L}$ (Minimal infectious risk)
  - **Moderate Neutropenia:** $500 - 1,000/\mu\text{L}$ (Moderate infectious risk)
  - **Severe Neutropenia:** $< 500/\mu\text{L}$ (Severe risk of bacterial and fungal infections)
  - **Profound Neutropenia:** $< 100/\mu\text{L}$ (Extremely high risk of rapid, life-threatening sepsis)
- **Clinical Pearls / Pocket Medicine Context:**
  - **Neutropenic Fever:** Defined as a single oral temperature of $\ge 38.3^\circ\text{C}$ ($101^\circ\text{F}$) or a temperature of $\ge 38.0^\circ\text{C}$ ($100.4^\circ\text{F}$) sustained over a 1-hour period, in a patient with ANC $< 500/\mu\text{L}$ (or expected to fall below $< 500/\mu\text{L}$ within 48 hours). This is a medical emergency requiring immediate administration of broad-spectrum antipseudomonal IV antibiotics (e.g., Cefepime, Piperacillin-Tazobactam, or Meropenem). Do not wait for lab confirmation if severe neutropenia is suspected; begin antibiotics immediately.
  - Granulocyte colony-stimulating factors (G-CSF) can be used for primary or secondary prophylaxis to reduce the duration and severity of neutropenia.
- **MDCalc Link:** [https://www.mdcalc.com/calc/58/absolute-neutrophil-count-anc](https://www.mdcalc.com/calc/58/absolute-neutrophil-count-anc)

---

### Mentzer Index
- **Category:** Hematology / Anemia
- **Clinical Indication:** Differentiating between Iron Deficiency Anemia (IDA) and Beta Thalassemia Minor (Trait) in patients presenting with microcytic anemia (MCV < 80 fL).
- **Formula / Algorithm:**
  $$\text{Mentzer Index} = \frac{\text{MCV (fL)}}{\text{RBC Count (}10^6/\mu\text{L)}}$$
- **Input Parameters:**
  - `MCV` (Mean Corpuscular Volume, fL)
  - `RBC` (Red Blood Cell Count, $\times 10^6/\mu\text{L}$ or $\times 10^{12}/\text{L}$)
- **Output & Interpretation:**
  - **Mentzer Index < 13:** Suggestive of **Beta Thalassemia Trait**.
    - *Pathophysiology:* The bone marrow produces a high number of microcytic RBCs (hyperproliferative response) leading to a high RBC count relative to the severity of microcytosis.
  - **Mentzer Index $\ge$ 13:** Suggestive of **Iron Deficiency Anemia**.
    - *Pathophysiology:* Iron deficiency limits overall erythropoiesis, leading to a low RBC count and a proportionally higher index.
- **Clinical Pearls / Pocket Medicine Context:**
  - This is a screening tool, not a diagnostic test.
  - Confirm **Iron Deficiency Anemia** with a serum ferritin level (ferritin < 30 ng/mL is diagnostic, though in inflammation, cutoffs up to 100 ng/mL can be used) or iron panel.
  - Confirm **Beta Thalassemia Minor** with hemoglobin electrophoresis showing elevated $\text{HbA}_2$ ($> 3.5\%$) and/or $\text{HbF}$.
  - The index is less reliable in patients with combined iron deficiency and thalassemia trait, or in the presence of anemia of chronic disease.
- **MDCalc Link:** [https://www.mdcalc.com/calc/10425/mentzer-index-microcytic-anemia](https://www.mdcalc.com/calc/10425/mentzer-index-microcytic-anemia)

---

### 4Ts Score for Heparin-Induced Thrombocytopenia (HIT)
- **Category:** Hematology / Hemostasis
- **Clinical Indication:** Estimating the pretest probability of Heparin-Induced Thrombocytopenia (HIT) in hospitalized patients receiving heparin products.
- **Formula / Algorithm:**
  The score is calculated by summing points from 4 clinical categories (each scored 0, 1, or 2 points):

  1. **Thrombocytopenia:**
     - **2 points:** Platelet count fall $> 50\%$ AND platelet nadir $\ge 20 \times 10^9/\text{L}$ ($\ge 20,000/\mu\text{L}$).
     - **1 point:** Platelet count fall $30 - 50\%$ OR platelet nadir $10 - 19 \times 10^9/\text{L}$ ($10,000 - 19,000/\mu\text{L}$).
     - **0 points:** Platelet count fall $< 30\%$ OR platelet nadir $< 10 \times 10^9/\text{L}$ ($< 10,000/\mu\text{L}$).
  2. **Timing of Platelet Fall (or other sequelae):**
     - **2 points:** Clear onset between days 5 and 10 of heparin exposure; OR onset $\le 1$ day if heparin exposure within the past 30 days.
     - **1 point:** Consistent with day 5–10 onset, but missing data; OR onset after day 10; OR onset $\le 1$ day if heparin exposure within the past 31–100 days.
     - **0 points:** Platelet count fall occurs $\le 4$ days of exposure with no history of heparin exposure within the past 100 days.
  3. **Thrombosis or Other Sequelae:**
     - **2 points:** Proven new thrombosis; OR skin necrosis at heparin injection sites; OR acute systemic reaction after IV heparin bolus.
     - **1 point:** Progressive or recurrent thrombosis; OR non-necrotizing skin lesions; OR suspected thrombosis (unproven).
     - **0 points:** None.
  4. **Other Cause(s) for Thrombocytopenia:**
     - **2 points:** No other apparent cause.
     - **1 point:** Possible other cause.
     - **0 points:** Definite other cause.
- **Input Parameters:**
  - Platelet count trend (baseline, nadir, and percentages of fall)
  - Timeline of heparin exposure relative to thrombocytopenia
  - Objective clinical signs of new thrombosis, skin necrosis, or systemic reaction
  - Assessment of alternative causes of thrombocytopenia (e.g., sepsis, DIC, medications, post-op dilution)
- **Output & Interpretation:**
  - **0–3 points:** **Low Probability** ($< 5\%$ chance of HIT). Do not test for HIT antibodies; continue heparin if clinically indicated.
  - **4–5 points:** **Intermediate Probability** ($\sim 14\%$ chance of HIT). Discontinue all heparin sources, initiate alternative anticoagulation (e.g., Argatroban, Bivalirudin, or Fondaparinux), and order a HIT ELISA (PF4/heparin antibody) test.
  - **6–8 points:** **High Probability** ($\sim 64\%$ chance of HIT). Discontinue all heparin sources immediately (including heparin flushes and heparin-coated catheters), initiate alternative non-heparin anticoagulation (e.g., Argatroban, Bivalirudin), order HIT ELISA, and confirm positive ELISA with a Serotonin Release Assay (SRA).
- **Clinical Pearls / Pocket Medicine Context:**
  - Warfarin is strictly contraindicated during the acute phase of HIT (due to high risk of venous limb gangrene and skin necrosis from rapid protein C depletion). Do not start warfarin until platelets have recovered to $\ge 150,000/\mu\text{L}$, and bridge with a non-heparin anticoagulant for at least 5 days.
  - The negative predictive value of a low 4Ts score ($0 - 3$) is $> 99\%$, making it an excellent rule-out tool.
- **MDCalc Link:** [https://www.mdcalc.com/calc/1787/4ts-score-heparin-induced-thrombocytopenia](https://www.mdcalc.com/calc/1787/4ts-score-heparin-induced-thrombocytopenia)

---

### Revised International Prognostic Scoring System (IPSS-R) for MDS
- **Category:** Hematology / Oncology
- **Clinical Indication:** Risk-stratifying patients with newly diagnosed Myelodysplastic Syndrome (MDS) to predict overall survival and risk of progression to Acute Myeloid Leukemia (AML).
- **Formula / Algorithm:**
  Sum the points from five categories:

  1. **Cytogenetic Risk Group:**
     - **0 points:** *Very Good* ($-Y$, $del(11q)$)
     - **1 point:** *Good* (Normal karyotype, $del(5q)$, $del(12p)$, $del(20q)$, double clones including $del(5q)$)
     - **2 points:** *Intermediate* ($del(7q)$, $+8$, $+19$, $i(17q)$, any other single or double independent clones)
     - **3 points:** *Poor* ($-7$, $inv(3)/t(3q)/del(3q)$, double clones including $-7/del(7q)$, complex karyotype with exactly 3 abnormalities)
     - **4 points:** *Very Poor* (Complex karyotype with $> 3$ abnormalities)
  2. **Bone Marrow Blasts (%):**
     - **0 points:** $\le 2\%$
     - **1 point:** $> 2\%$ to $< 5\%$
     - **2 points:** $5 - 10\%$
     - **3 points:** $> 10\%$
  3. **Hemoglobin (g/dL):**
     - **0 points:** $\ge 10.0$
     - **1 point:** $8.0 - 9.9$
     - **1.5 points:** $< 8.0$
  4. **Platelets ($\times 10^9/\text{L}$ or $\times 10^3/\mu\text{L}$):**
     - **0 points:** $\ge 100$
     - **0.5 points:** $50 - 99$
     - **1 point:** $< 50$
  5. **Absolute Neutrophil Count (ANC, $\times 10^9/\text{L}$ or cells/$\mu\text{L}$):**
     - **0 points:** $\ge 0.8$ ($\ge 800/\mu\text{L}$)
     - **0.5 points:** $< 0.8$ ($< 800/\mu\text{L}$)
- **Input Parameters:**
  - Cytogenetic classification from bone marrow aspirate
  - Bone marrow blast percentage
  - Hemoglobin level
  - Platelet count
  - ANC
- **Output & Interpretation:**
  - **$\le 1.5$ points:** **Very Low Risk** (Median survival: 8.8 years; Median time to AML progression: Not Reached)
  - **$1.6 - 3.0$ points:** **Low Risk** (Median survival: 5.3 years; Median time to AML progression: 10.8 years)
  - **$3.1 - 4.5$ points:** **Intermediate Risk** (Median survival: 3.0 years; Median time to AML progression: 3.2 years)
  - **$4.6 - 6.0$ points:** **High Risk** (Median survival: 1.6 years; Median time to AML progression: 1.4 years)
  - **$> 6.0$ points:** **Very High Risk** (Median survival: 0.8 years; Median time to AML progression: 0.7 years)
- **Clinical Pearls / Pocket Medicine Context:**
  - The IPSS-R is crucial in guiding treatment: "Lower-risk" (Very Low, Low, and some Intermediate) patients are managed with supportive care, erythropoiesis-stimulating agents (ESAs), luspatercept (for ring sideroblasts), or lenalidomide (if $del(5q)$). "Higher-risk" (some Intermediate, High, Very High) patients are evaluated for hypomethylating agents (azacitidine, decitabine) and allogeneic stem cell transplantation (the only curative treatment).
  - Modern molecular sequencing can detect somatic mutations (e.g., *SF3B1*, *ASXL1*, *RUNX1*, *TP53*) that further refine risk stratification (IPSS-Molecular or IPSS-M score).
- **MDCalc Link:** [https://www.mdcalc.com/calc/3981/revised-international-prognostic-scoring-system-ipss-r-myelodysplastic-syndrome-mds](https://www.mdcalc.com/calc/3981/revised-international-prognostic-scoring-system-ipss-r-myelodysplastic-syndrome-mds)

---

### ISTH Criteria for Overt Disseminated Intravascular Coagulation (DIC)
- **Category:** Hematology / Hemostasis
- **Clinical Indication:** Diagnosing overt disseminated intravascular coagulation (DIC) in patients with an underlying disease associated with DIC (e.g., sepsis, malignancy, trauma, obstetric complications).
- **Formula / Algorithm:**
  Scoring is applied only if the patient has an underlying disorder known to be associated with DIC. Sum the points (maximum = 8):
  - **Platelet count:**
    - $\ge 100 \times 10^9/\text{L}$ ($\ge 100,000/\mu\text{L}$): **0 points**
    - $50 - 99 \times 10^9/\text{L}$: **1 point**
    - $< 50 \times 10^9/\text{L}$: **2 points**
  - **Fibrin degradation products (FDP) or d-Dimer:**
    - No increase: **0 points**
    - Moderate increase: **2 points**
    - Strong increase: **3 points**
  - **Prolonged prothrombin time (PT):**
    - $< 3$ seconds: **0 points**
    - $\ge 3$ but $< 6$ seconds: **1 point**
    - $\ge 6$ seconds: **2 points**
  - **Fibrinogen level:**
    - $\ge 100$ mg/dL ($\ge 1.0$ g/L): **0 points**
    - $< 100$ mg/dL ($< 1.0$ g/L): **1 point**
- **Input Parameters:**
  - Platelet count, d-Dimer or FDP, PT prolongation (compared to local control), and Fibrinogen level
- **Output & Interpretation:**
  - **Score $\ge$ 5:** Compatible with **overt DIC**. Repeat score daily.
  - **Score < 5:** Suggestive of **non-overt DIC**. Repeat in 1–2 days.
- **Clinical Pearls / Pocket Medicine Context:**
  - Overt DIC is characterized by systemic clotting activation leading to consumption of coagulants, thrombocytopenia, and bleeding.
  - Treat the underlying cause (e.g., antibiotics for sepsis, delivery for placental abruption). Transfuse platelets if $< 10,000/\mu\text{L}$ (or $< 50,000/\mu\text{L}$ with active bleeding), cryoprecipitate for fibrinogen $< 100$ mg/dL, and fresh frozen plasma (FFP) for active bleeding with prolonged PT/aPTT.
- **MDCalc Link:** [https://www.mdcalc.com/calc/173/isth-criteria-disseminated-intravascular-coagulation-dic](https://www.mdcalc.com/calc/173/isth-criteria-disseminated-intravascular-coagulation-dic)

---

## 2. Oncology

### MASCC Risk Index for Febrile Neutropenia
- **Category:** Oncology / Infectious Diseases
- **Clinical Indication:** Identifying cancer patients with febrile neutropenia who are at low risk for serious medical complications, assisting in the decision to manage them as outpatients with oral antibiotics.
- **Formula / Algorithm:**
  Points are assigned to clinical factors at the onset of fever (maximum score = 26):

  | Clinical Factor | Condition | Points |
  | :--- | :--- | :---: |
  | **Burden of Febrile Neutropenia** | No or mild symptoms | +5 |
  | | Moderate symptoms | +3 |
  | | Severe symptoms | 0 |
  | **Hypotension** | Systolic BP $\ge 90$ mmHg | +5 |
  | | Systolic BP $< 90$ mmHg | 0 |
  | **Active COPD** | No | +4 |
  | | Yes | 0 |
  | **Type of Cancer** | Solid tumor OR hematologic without prior fungal infection | +4 |
  | | Hematologic malignancy with prior fungal infection | 0 |
  | **Dehydration** | No dehydration requiring IV fluids | +3 |
  | | Dehydration requiring IV fluids | 0 |
  | **Status at onset of fever** | Outpatient | +3 |
  | | Inpatient | 0 |
  | **Age** | $< 60$ years | +2 |
  | | $\ge 60$ years | 0 |
- **Input Parameters:**
  - Severity of illness (subjective symptom burden)
  - Blood pressure (systolic)
  - Chronic Obstructive Pulmonary Disease (COPD) status
  - Cancer diagnosis (solid vs. hematologic) and history of invasive fungal infections
  - Clinical signs of dehydration
  - Admission status at fever onset
  - Age
- **Output & Interpretation:**
  - **Score $\ge$ 21:** **Low Risk** ($< 5\%$ risk of serious complications). Candidates for outpatient management with oral antibiotics (e.g., Ciprofloxacin + Amoxicillin-Clavulanate) if they have good social support and are within close proximity to a hospital.
  - **Score < 21:** **High Risk** ($\ge 15\%$ risk of serious complications, including death). Requires hospital admission for intravenous broad-spectrum empiric antibiotics.
- **Clinical Pearls / Pocket Medicine Context:**
  - The MASCC score should NOT override clinical judgment. Patients undergoing allogeneic stem cell transplant or induction chemotherapy for acute leukemia are automatically high-risk and require inpatient IV therapy regardless of MASCC score.
  - Anticipated prolonged neutropenia (ANC $< 100/\mu\text{L}$ for $> 7$ days) is another critical reason to admit and treat intravenously.
- **MDCalc Link:** [https://www.mdcalc.com/calc/113/mascc-risk-index-febrile-neutropenia](https://www.mdcalc.com/calc/113/mascc-risk-index-febrile-neutropenia)

---

### SLiM-CRAB Criteria for Multiple Myeloma
- **Category:** Oncology / Hematology
- **Clinical Indication:** Diagnosing active multiple myeloma to distinguish it from Smoldering Multiple Myeloma (SMM) and Monoclonal Gammopathy of Undetermined Significance (MGUS), establishing the immediate need for systemic treatment.
- **Formula / Algorithm:**
  - **Pre-requisite:** Patient must have $\ge 10\%$ clonal bone marrow plasma cells OR biopsy-proven extramedullary or bone plasmacytoma.
  - **Diagnosis:** Confirmed if the pre-requisite is met along with **at least one** of the following SLiM or CRAB criteria:
    - **S (Sixty percent):** Bone marrow clonal plasma cells $\ge 60\%$.
    - **Li (Light chain ratio):** Serum-free light chain (FLC) ratio (involved vs. uninvolved) $\ge 100$ (with involved light chain $\ge 100$ mg/L).
    - **M (MRI lesions):** $> 1$ focal bone lesion on MRI ($\ge 5$ mm in size).
    - **C (Calcium elevation):** Serum calcium $> 11$ mg/dL ($> 2.75$ mmol/L) or $> 1$ mg/dL above the upper limit of normal.
    - **R (Renal insufficiency):** Serum creatinine $> 2.0$ mg/dL ($> 177\ \mu\text{mol/L}$) or creatinine clearance $< 40$ mL/min.
    - **A (Anemia):** Hemoglobin $< 10.0$ g/dL or $> 2$ g/dL below the lower limit of normal.
    - **B (Bone lesions):** $\ge 1$ osteolytic bone lesion on skeletal survey, CT, or PET-CT.
- **Input Parameters:**
  - Bone marrow biopsy results
  - Serum free light chain assay
  - Whole-body MRI, CT, or skeletal survey
  - Serum calcium, creatinine, and hemoglobin
- **Output & Interpretation:**
  - Meeting criteria warrants immediate treatment (proteasome inhibitors, immunomodulatory drugs, monoclonal antibodies, dexamethasone, and consideration for autologous stem cell transplant).
  - Absence of SLiM-CRAB in a patient with monoclonal protein indicates MGUS (if BM plasma cells $< 10\%$ and M-protein $< 3$ g/dL) or Smoldering Myeloma (if BM plasma cells $10 - 59\%$), which require observation only.
- **Clinical Pearls / Pocket Medicine Context:**
  - SLiM criteria represent "myeloma-defining events" that predict an $80\%$ risk of developing organ damage within 2 years. Initiating therapy at the SLiM stage prevents irreversible end-organ damage (e.g., permanent renal failure or bone fractures).
  - Bone lesions must be osteolytic. Osteoblastic lesions are not characteristic of myeloma and suggest alternative diagnoses (e.g., prostate cancer).
- **MDCalc Link:** N/A (Diagnostic criteria standard).

---

### Cairo-Bishop Criteria for Tumor Lysis Syndrome (TLS)
- **Category:** Oncology / Hematology
- **Clinical Indication:** Diagnosing and grading Tumor Lysis Syndrome (TLS), a life-threatening oncologic emergency characterized by massive cancer cell lysis and release of intracellular contents.
- **Formula / Algorithm:**
  The Cairo-Bishop criteria separate TLS into **Laboratory TLS (LTLS)** and **Clinical TLS (CTLS)**.

  #### **Laboratory TLS (LTLS):**
  Requires $\ge 2$ of the following metabolic abnormalities occurring within 3 days before or 7 days after the start of chemotherapy:
  - **Uric Acid:** $\ge 8.0$ mg/dL ($\ge 476\ \mu\text{mol/L}$) OR $25\%$ increase from baseline.
  - **Potassium:** $\ge 6.0$ mEq/L ($\ge 6.0$ mmol/L) OR $25\%$ increase from baseline.
  - **Phosphorus:** $\ge 4.5$ mg/dL ($\ge 1.45$ mmol/L) [Adults] OR $\ge 6.5$ mg/dL ($\ge 2.1$ mmol/L) [Children] OR $25\%$ increase from baseline.
  - **Calcium:** $\le 7.0$ mg/dL ($\le 1.75$ mmol/L) OR $25\%$ decrease from baseline.

  #### **Clinical TLS (CTLS):**
  Requires **LTLS** plus $\ge 1$ of the following (not solely attributable to chemotherapy agent toxicity):
  - **Renal Dysfunction:** Serum creatinine $\ge 1.5 \times$ upper limit of normal (ULN) (or age-adjusted pediatric equivalent).
  - **Cardiac Arrhythmia** (or sudden death).
  - **Seizures**.
- **Input Parameters:**
  - Uric acid, potassium, phosphorus, calcium levels (and comparison with baseline)
  - Serum creatinine
  - ECG / cardiac rhythm monitoring
  - Neurological status
- **Output & Interpretation:**
  - Guides aggressive supportive measures: IV hydration, Rasburicase (recombinant urate oxidase) or Allopurinol (xanthine oxidase inhibitor), and treatment of hyperkalemia and hyperphosphatemia.
- **Clinical Pearls / Pocket Medicine Context:**
  - **Prophylaxis:** Patients with high-tumor-burden hematologic malignancies (e.g., Burkitt lymphoma, ALL, AML with high WBC) must receive vigorous pre-treatment hydration and Allopurinol or Rasburicase.
  - **Rasburicase Contraindication:** Contraindicated in **G6PD deficiency** due to the risk of severe hemolytic anemia and methemoglobinemia (since hydrogen peroxide is a byproduct of the uric acid breakdown).
  - **Calcium Treatment Caveat:** In TLS, treat hypocalcemia *only* if the patient is symptomatic (seizures, tetany, QTc prolongation). Giving IV calcium can precipitate calcium-phosphate crystals in the kidneys, worsening acute kidney injury.
- **MDCalc Link:** N/A (Diagnostic criteria standard).

---

## 3. Endocrinology & Metabolism

### Corrected Calcium for Hypoalbuminemia
- **Category:** Endocrinology / Nephrology / Internal Medicine
- **Clinical Indication:** Adjusting measured total serum calcium levels in patients with hypoalbuminemia (low albumin) to reflect true biologically active calcium concentration, avoiding misdiagnosis of hypocalcemia.
- **Formula / Algorithm:**
  $$\text{Corrected Calcium (mg/dL)} = \text{Measured Total Calcium (mg/dL)} + 0.8 \times \left( 4.0 - \text{Serum Albumin (g/dL)} \right)$$
  *Or in SI Units:*
  $$\text{Corrected Calcium (mmol/L)} = \text{Measured Total Calcium (mmol/L)} + 0.02 \times \left( 40 - \text{Serum Albumin (g/L)} \right)$$
- **Input Parameters:**
  - `Measured Total Calcium` (mg/dL or mmol/L)
  - `Serum Albumin` (g/dL or g/L)
- **Output & Interpretation:**
  - **Normal Corrected Calcium:** $8.5 - 10.2$ mg/dL ($2.12 - 2.55$ mmol/L)
  - Correcting measured calcium avoids the false diagnosis of hypocalcemia. If albumin is low, total calcium is low because the bound fraction is low, but the unbound (ionized) calcium remains normal.
- **Clinical Pearls / Pocket Medicine Context:**
  - Approximately $40 - 45\%$ of total serum calcium is bound to albumin. A decrease in serum albumin of $1.0$ g/dL decreases total calcium by $\sim 0.8$ mg/dL without affecting the physiologically active ionized calcium level.
  - **Caveat:** The correction formula is an estimate and can be inaccurate in patients with severe acid-base disturbances (acidosis decreases calcium-albumin binding, raising ionized calcium; alkalosis increases binding, lowering ionized calcium), critical illness, or end-stage renal disease.
  - In cases of borderline corrected calcium, or severe symptoms (tetany, QT prolongation), directly measure the **ionized calcium** (normal: $4.5 - 5.6$ mg/dL or $1.12 - 1.40$ mmol/L).
- **MDCalc Link:** [https://www.mdcalc.com/calc/82/calcium-correction-hypoalbuminemia-hyperalbuminemia](https://www.mdcalc.com/calc/82/calcium-correction-hypoalbuminemia-hyperalbuminemia)

---

### LDL Friedewald Equation
- **Category:** Endocrinology / Cardiology / Preventive Medicine
- **Clinical Indication:** Estimating low-density lipoprotein cholesterol (LDL-C) using values from a standard fasting lipid panel (total cholesterol, HDL-C, triglycerides).
- **Formula / Algorithm:**
  $$\text{LDL-C (mg/dL)} = \text{Total Cholesterol (mg/dL)} - \text{HDL-C (mg/dL)} - \frac{\text{Triglycerides (mg/dL)}}{5}$$
  *Or in SI Units (mmol/L):*
  $$\text{LDL-C (mmol/L)} = \text{Total Cholesterol (mmol/L)} - \text{HDL-C (mmol/L)} - \frac{\text{Triglycerides (mmol/L)}}{2.2}$$
- **Input Parameters:**
  - `Total Cholesterol` (mg/dL or mmol/L)
  - `HDL-C` (High-Density Lipoprotein Cholesterol, mg/dL or mmol/L)
  - `Triglycerides` (mg/dL or mmol/L)
- **Output & Interpretation:**
  - Guides lipid-lowering therapy (statins, ezetimibe, PCSK9 inhibitors) based on cardiovascular risk targets.
- **Clinical Pearls / Pocket Medicine Context:**
  - **Inaccuracy at High Triglycerides:** The formula assumes a fixed ratio of $5:1$ between triglycerides and VLDL-cholesterol. This ratio breaks down and significantly underestimates LDL-C if **Triglycerides are $> 400$ mg/dL** (or if the patient is non-fasting). In such cases, LDL-C must be measured directly, or calculated using the newer **Martin-Hopkins Equation** (which uses an adjustable factor instead of a fixed divisor of 5).
  - The equation also underestimates LDL-C when LDL-C is very low ($< 70$ mg/dL) even with triglycerides $< 150$ mg/dL. Directly measure LDL-C in these circumstances to ensure adequate statin intensity.
- **MDCalc Link:** [https://www.mdcalc.com/calc/166/friedewald-equation-for-ldl-cholesterol](https://www.mdcalc.com/calc/166/friedewald-equation-for-ldl-cholesterol)

---

### Burch-Wartofsky Point Scale (Thyroid Storm)
- **Category:** Endocrinology / Intensive Care
- **Clinical Indication:** Evaluating patients with biochemical thyrotoxicosis for the life-threatening condition of **Thyroid Storm**, assisting in the decision to initiate aggressive ICU-level multimodal therapy.
- **Formula / Algorithm:**
  Sum points across six clinical domains:

  1. **Thermoregulatory Dysfunction (Temperature):**
     - $99.0 - 99.9^\circ\text{F}$ ($37.2 - 37.7^\circ\text{C}$): **5 points**
     - $100.0 - 100.9^\circ\text{F}$ ($37.8 - 38.2^\circ\text{C}$): **10 points**
     - $101.0 - 101.9^\circ\text{F}$ ($38.3 - 38.8^\circ\text{C}$): **15 points**
     - $102.0 - 102.9^\circ\text{F}$ ($38.9 - 39.4^\circ\text{C}$): **20 points**
     - $103.0 - 103.9^\circ\text{F}$ ($39.5 - 39.9^\circ\text{C}$): **25 points**
     - $\ge 104.0^\circ\text{F}$ ($\ge 40.0^\circ\text{C}$): **30 points**
  2. **Central Nervous System (CNS) Effects:**
     - Absent: **0 points**
     - Mild (agitation, anxiety): **10 points**
     - Moderate (delirium, psychosis, extreme lethargy): **20 points**
     - Severe (seizures, coma): **30 points**
  3. **Cardiovascular Dysfunction (Tachycardia / HR, bpm):**
     - $90 - 109$: **5 points**
     - $110 - 119$: **10 points**
     - $120 - 129$: **15 points**
     - $130 - 139$: **20 points**
     - $\ge 140$: **25 points**
  4. **Atrial Fibrillation:**
     - Absent: **0 points**
     - Present: **10 points**
  5. **Heart Failure (CHF):**
     - Absent: **0 points**
     - Mild (pedal edema): **5 points**
     - Moderate (bibasilar rales): **10 points**
     - Severe (pulmonary edema): **15 points**
  6. **Gastrointestinal-Hepatic Dysfunction:**
     - Absent: **0 points**
     - Moderate (diarrhea, nausea/vomiting, unexplained abdominal pain): **10 points**
     - Severe (unexplained jaundice): **20 points**
  7. **Precipitating History (e.g., infection, surgery, trauma, non-compliance):**
     - Negative: **0 points**
     - Positive: **10 points**
- **Input Parameters:**
  - Body temperature
  - Mental status
  - Heart rate and cardiac rhythm
  - Volume status / pulmonary exam
  - GI symptoms and bilirubin levels
  - Precipitating events
- **Output & Interpretation:**
  - **$< 25$ points:** **Thyroid Storm Unlikely**. Manage standard thyrotoxicosis.
  - **$25 - 44$ points:** **Impending Thyroid Storm**. Close observation, consider initiating therapeutic measures.
  - **$\ge 45$ points:** **Thyroid Storm (highly suggestive)**. Medical emergency; initiate aggressive treatment immediately and transfer to ICU.
- **Clinical Pearls / Pocket Medicine Context:**
  - **Multimodal Treatment of Thyroid Storm (order of administration matters):**
    1. **Beta-blocker:** Propranolol (IV or high-dose oral) blocks peripheral conversion of T4 to T3 and controls sympathetic activity.
    2. **Thionamide:** Propylthiouracil (PTU) is preferred over methimazole because PTU also inhibits the peripheral conversion of T4 to T3.
    3. **Iodine (Lugol's solution or SSKI):** Must be given *at least 1 hour after* thionamide administration to prevent iodine from being used as substrate for new hormone synthesis (Wolff-Chaikoff effect).
    4. **Glucocorticoids (Hydrocortisone or Dexamethasone):** Inhibits peripheral T4-to-T3 conversion and treats potential relative adrenal insufficiency.
    5. **Bile Acid Sequestrants (Cholestyramine):** Prevents enterohepatic reabsorption of thyroid hormone.
- **MDCalc Link:** [https://www.mdcalc.com/calc/3816/burch-wartofsky-point-scale-bwps-thyrotoxicosis](https://www.mdcalc.com/calc/3816/burch-wartofsky-point-scale-bwps-thyrotoxicosis)

---

### Diabetic Ketoacidosis (DKA) vs. Hyperosmolar Hyperglycemic State (HHS) Criteria
- **Category:** Endocrinology / Metabolism
- **Clinical Indication:** Differentiating between DKA and HHS in patients presenting with acute severe hyperglycemia, as this determines the details of fluid resuscitation, insulin infusion rate, electrolyte monitoring, and disposition.
- **Formula / Algorithm (ADA Diagnostic Guidelines):**

  | Diagnostic Parameter | Mild DKA | Moderate DKA | Severe DKA | Hyperosmolar Hyperglycemic State (HHS) |
  | :--- | :--- | :--- | :--- | :--- |
  | **Plasma Glucose (mg/dL)** | $> 250$ | $> 250$ | $> 250$ | $> 600$ |
  | **Arterial pH** | $7.25 - 7.30$ | $7.00 - 7.24$ | $< 7.00$ | $> 7.30$ |
  | **Serum Bicarbonate (mEq/L)** | $15 - 18$ | $10 - 14.9$ | $< 10$ | $> 18$ |
  | **Urine/Serum Ketones** | Positive | Positive | Positive | Small or Absent |
  | **Effective Osmolality (mOsm/kg)** | Variable | Variable | Variable | $> 320$ |
  | **Anion Gap (mEq/L)** | $> 10$ | $> 12$ | $> 12$ | Variable |
  | **Mental Status** | Alert | Alert/Drowsy | Stupor/Coma | Stupor/Coma |

  *Note: Effective Serum Osmolality calculation:*
  $$\text{Osmolality}_{\text{effective}} = 2 \times \text{Na (mEq/L)} + \frac{\text{Glucose (mg/dL)}}{18}$$
- **Input Parameters:**
  - Serum glucose, sodium, potassium, bicarbonate, creatinine, ketones
  - Arterial or venous blood gas (pH)
  - Osmolality, mental status
- **Output & Interpretation:**
  - Helps guide clinical management protocols (e.g., aggressive IV hydration, IV insulin infusion at $0.1$ U/kg/h, potassium replacement before insulin if $\text{K} < 3.3$ mEq/L, and frequent monitoring of glucose, electrolytes, and anion gap).
- **Clinical Pearls / Pocket Medicine Context:**
  - **Euglycemic DKA:** Can present with blood glucose $< 250$ mg/dL. Associated with SGLT2 inhibitors (e.g., empagliflozin), pregnancy, liver disease, or prolonged starvation. Always check ketones in patients on SGLT2 inhibitors presenting with malaise or acidosis, regardless of glucose.
  - **Sodium Correction for Hyperglycemia:** Measured sodium must be corrected for hyperglycemia to assess the true hydration state:
    $$\text{Na}_{\text{corrected}} = \text{Na}_{\text{measured}} + 1.6 \times \left( \frac{\text{Glucose (mg/dL)} - 100}{100} \right)$$
    If glucose is $> 400$ mg/dL, use a correction factor of $2.4$ instead of $1.6$.
- **MDCalc Link:** N/A (Clinical guidelines standard).

---

## 4. Infectious Diseases

### Centor & Modified Centor (McIsaac) Criteria
- **Category:** Infectious Diseases / Outpatient Medicine
- **Clinical Indication:** Stratifying the likelihood of Group A Beta-Hemolytic Streptococcal (GAS) pharyngitis in patients presenting with acute sore throat, and guiding the decision to test (RADT) or treat.
- **Formula / Algorithm:**
  One point is awarded for each of the following (standard Centor score is 0 to 4; Modified Centor/McIsaac incorporates age for -1 to 5):

  | Criteria | Points |
  | :--- | :---: |
  | **Tonsillar exudate or swelling** | +1 |
  | **Tender anterior cervical adenopathy** | +1 |
  | **History of fever ($> 38^\circ\text{C}$ or $100.4^\circ\text{F}$)** | +1 |
  | **Absence of cough** | +1 |
  | **Age Modifier (Modified Centor/McIsaac):** | |
  | $3 - 14$ years | +1 |
  | $15 - 44$ years | 0 |
  | $\ge 45$ years | -1 |
- **Input Parameters:**
  - Physical exam findings (exudates, tender lymph nodes)
  - Clinical history (fever, presence or absence of cough)
  - Patient age
- **Output & Interpretation (Modified Centor Score & GAS Probability):**
  - **$\le 0$ points:** Risk of GAS $1 - 2.5\%$. No testing, no antibiotics.
  - **1 point:** Risk of GAS $5 - 10\%$. No testing, no antibiotics.
  - **2 points:** Risk of GAS $11 - 17\%$. Order Rapid Antigen Detection Test (RADT) or throat culture; treat only if positive.
  - **3 points:** Risk of GAS $28 - 35\%$. Order RADT or throat culture; treat only if positive.
  - **$\ge 4$ points:** Risk of GAS $51 - 53\%$. Order RADT or throat culture; treat only if positive.
- **Clinical Pearls / Pocket Medicine Context:**
  - Group A Strep is responsible for only $5 - 15\%$ of adult pharyngitis cases, but up to $20 - 30\%$ in children. The primary clinical goal of treating GAS is the prevention of **Acute Rheumatic Fever** (must treat within 9 days of symptom onset). Treatment does not reliably prevent post-streptococcal glomerulonephritis.
  - If viral features are present (rhinorrhea, hoarseness, conjunctivitis, oral vesicles, cough), GAS is highly unlikely, and testing is generally not indicated.
- **MDCalc Link:** [https://www.mdcalc.com/calc/104/centor-score-modified-mcisaac-strep-pharyngitis](https://www.mdcalc.com/calc/104/centor-score-modified-mcisaac-strep-pharyngitis)

---

### SOFA & qSOFA Scores
- **Category:** Infectious Diseases / Critical Care
- **Clinical Indication:** Stratifying risk and predicting mortality in patients with suspected infection. SOFA is used in the ICU to track organ dysfunction; qSOFA is a rapid screening tool for non-ICU patients.
- **Formula / Algorithm:**

  #### **qSOFA (Quick SOFA) Score (0 to 3 points):**
  One point for each positive criterion:
  - Altered mental status (Glasgow Coma Scale $< 15$)
  - Tachypnea (Respiratory rate $\ge 22$ breaths/min)
  - Hypotension (Systolic blood pressure $\le 100$ mmHg)

  #### **SOFA (Sequential Organ Failure Assessment) Score (0 to 24 points):**
  Evaluates 6 organ systems (each scored 0 to 4 points):
  1. **Respiration ($\text{PaO}_2 / \text{FiO}_2$ ratio, mmHg):**
     - $\ge 400$: **0** | $< 400$: **1** | $< 300$: **2** | $< 200$ with respiratory support: **3** | $< 100$ with respiratory support: **4**
  2. **Coagulation (Platelets, $\times 10^3/\mu\text{L}$):**
     - $\ge 150$: **0** | $< 150$: **1** | $< 100$: **2** | $< 50$: **3** | $< 20$: **4**
  3. **Liver (Bilirubin, mg/dL):**
     - $< 1.2$: **0** | $1.2 - 1.9$: **1** | $2.0 - 5.9$: **2** | $6.0 - 11.9$: **3** | $\ge 12.0$: **4**
  4. **Cardiovascular (Hypotension / Vasopressors):**
     - $\text{MAP} \ge 70$ mmHg: **0**
     - $\text{MAP} < 70$ mmHg: **1**
     - Dopamine $\le 5\ \mu\text{g/kg/min}$ OR Dobutamine (any dose): **2**
     - Dopamine $> 5\ \mu\text{g/kg/min}$ OR Epinephrine $\le 0.1\ \mu\text{g/kg/min}$ OR Norepinephrine $\le 0.1\ \mu\text{g/kg/min}$: **3**
     - Dopamine $> 15\ \mu\text{g/kg/min}$ OR Epinephrine $> 0.1\ \mu\text{g/kg/min}$ OR Norepinephrine $> 0.1\ \mu\text{g/kg/min}$: **4**
  5. **CNS (Glasgow Coma Scale):**
     - $15$: **0** | $13 - 14$: **1** | $10 - 12$: **2** | $6 - 9$: **3** | $< 6$: **4**
  6. **Renal (Creatinine, mg/dL OR Urine Output):**
     - Creatinine $< 1.2$: **0**
     - Creatinine $1.2 - 1.9$: **1**
     - Creatinine $2.0 - 3.4$: **2**
     - Creatinine $3.5 - 4.9$ OR Urine Output $< 500$ mL/day: **3**
     - Creatinine $\ge 5.0$ OR Urine Output $< 200$ mL/day: **4**
- **Input Parameters:**
  - `GCS`, `RR`, `sBP` (for qSOFA)
  - Blood gas, platelets, bilirubin, MAP/vasopressors, GCS, creatinine/urine output (for SOFA)
- **Output & Interpretation:**
  - **qSOFA $\ge$ 2:** Identifies patients outside the ICU at high risk of death or prolonged ICU stay. Indicates the need to monitor closely, escalate care, and calculate the full SOFA score.
  - **SOFA Score Increase $\ge$ 2:** Represents the Sepsis-3 diagnostic threshold for **Sepsis** (associated with a 10% in-hospital mortality risk).
  - **Septic Shock Definition:** Sepsis + need for vasopressors to maintain MAP $\ge 65$ mmHg AND serum lactate $> 2$ mmol/L despite adequate fluid resuscitation (associated with $> 40\%$ in-hospital mortality).
- **Clinical Pearls / Pocket Medicine Context:**
  - Sepsis-3 guidelines replaced SIRS with SOFA/qSOFA for diagnostic definitions, highlighting organ dysfunction rather than systemic inflammation.
  - Start broad-spectrum antibiotics and crystalloid fluid resuscitation ($30$ mL/kg) within 1 hour of identifying sepsis or septic shock.
- **MDCalc Links:**
  - **SOFA:** [https://www.mdcalc.com/calc/1770/sequential-organ-failure-assessment-sofa-score](https://www.mdcalc.com/calc/1770/sequential-organ-failure-assessment-sofa-score)
  - **qSOFA:** [https://www.mdcalc.com/calc/3973/qsofa-quick-sofa-score-sepsis](https://www.mdcalc.com/calc/3973/qsofa-quick-sofa-score-sepsis)

---

### Duke Criteria for Infective Endocarditis
- **Category:** Infectious Diseases / Cardiology
- **Clinical Indication:** Standardized diagnostic criteria for evaluating patients with suspected Infective Endocarditis (IE).
- **Formula / Algorithm:**
  Definite diagnosis requires **2 Major Criteria**, OR **1 Major + 3 Minor Criteria**, OR **5 Minor Criteria**.
  Possible diagnosis requires **1 Major + 1 Minor Criteria**, OR **3 Minor Criteria**.

  #### **Major Criteria:**
  1. **Blood culture positive for IE:**
     - Typical microorganisms consistent with IE from 2 separate blood cultures: *Viridans streptococci*, *Streptococcus gallolyticus (bovis)*, HACEK group, *Staphylococcus aureus*, or community-acquired *Enterococci* (in the absence of a primary focus); OR
     - Persistently positive blood cultures: $\ge 2$ positive cultures drawn $> 12$ hours apart, OR all of 3 or majority of $\ge 4$ separate cultures (first and last sample drawn $\ge 1$ hour apart); OR
     - Single positive blood culture for *Coxiella burnetii* or IgG antibody titer $> 1:800$.
  2. **Evidence of endocardial involvement:**
     - Positive echocardiogram: mobile intracardiac mass (vegetation) on valve or supporting structures, in the path of regurgitant jets, or on implanted material; OR abscess; OR new partial dehiscence of prosthetic valve; OR
     - New valvular regurgitation (change or worsening of pre-existing murmur is not sufficient).

  #### **Minor Criteria:**
  1. **Predisposition:** Predisposing heart condition (e.g., prosthetic valve, prior IE, complex congenital disease, severe valvular dysfunction) or injection drug use.
  2. **Fever:** Temperature $\ge 38.0^\circ\text{C}$ ($100.4^\circ\text{F}$).
  3. **Vascular phenomena:** Major arterial emboli, septic pulmonary infarcts, mycotic aneurysm, intracranial hemorrhage, conjunctival hemorrhages, or Janeway's lesions.
  4. **Immunological phenomena:** Glomerulonephritis, Osler's nodes, Roth's spots, or rheumatoid factor.
  5. **Microbiological evidence:** Positive blood culture but does not meet major criteria, or serological evidence of active infection.
- **Input Parameters:**
  - Microorganism species and blood culture pattern
  - Echocardiography findings (TTE or TEE)
  - History of heart disease, drug use, fever, vascular/immunologic physical signs
- **Output & Interpretation:**
  - **Definite IE:** High diagnostic certainty; complete standard 2–6 week antibiotic course.
  - **Possible IE:** Intermediate clinical suspicion; consider repeating TTE/TEE (especially transesophageal echocardiography, which has $> 90\%$ sensitivity compared to $\sim 60\%$ for TTE) and serial blood cultures.
- **Clinical Pearls / Pocket Medicine Context:**
  - **Staphylococcus aureus Bacteremia (SAB):** Has a very high propensity for endocardial seeding. Any patient with SAB and a prosthetic valve, cardiac device, or injection drug use should undergo TEE to rule out endocarditis.
  - Antibiotic therapy should generally be deferred in stable patients until blood cultures are drawn (ideally 3 sets from separate sites) to avoid sterilizing cultures and making diagnosis difficult.
- **MDCalc Link:** [https://www.mdcalc.com/calc/1731/duke-criteria-infective-endocarditis](https://www.mdcalc.com/calc/1731/duke-criteria-infective-endocarditis)

---

### CURB-65 Score for Pneumonia Severity
- **Category:** Infectious Diseases / Pulmonology
- **Clinical Indication:** Estimating 30-day mortality risk in patients presenting with Community-Acquired Pneumonia (CAP) to guide disposition (outpatient, inpatient floor, or ICU).
- **Formula / Algorithm:**
  Award 1 point for each of the following (score ranges from 0 to 5):
  - **C**onfusion: New onset of disorientation to person, place, or time.
  - **U**rea: Blood Urea Nitrogen (BUN) $> 19$ mg/dL ($> 7$ mmol/L).
  - **R**espiratory Rate: $\ge 30$ breaths/minute.
  - **B**lood Pressure: Systolic $< 90$ mmHg OR Diastolic $\le 60$ mmHg.
  - **65**: Age $\ge 65$ years.
- **Input Parameters:**
  - Mental status assessment
  - BUN level
  - Vital signs (RR, SBP, DBP)
  - Age
- **Output & Interpretation:**
  - **0–1 points:** **Low Risk** ($1.5\%$ 30-day mortality). Outpatient management is generally safe.
  - **2 points:** **Moderate Risk** ($9.2\%$ mortality). Inpatient admission or close outpatient monitoring/observation.
  - **3–5 points:** **High Risk** ($22\%$ mortality). Inpatient admission required. If score is 4–5, evaluate for urgent ICU admission.
- **Clinical Pearls / Pocket Medicine Context:**
  - While CURB-65 is rapid and simple, the **Pneumonia Severity Index (PSI)** is a more comprehensive, data-heavy model preferred by guidelines (IDSA/ATS) to identify low-risk patients who can be safely managed as outpatients (recommends outpatient care for PSI classes I-III).
  - Always consider social factors (ability to tolerate oral intake, oxygenation, compliance, support at home) when making disposition decisions, which are not captured by the score.
- **MDCalc Link:** [https://www.mdcalc.com/calc/324/curb-65-score-pneumonia-severity](https://www.mdcalc.com/calc/324/curb-65-score-pneumonia-severity)

---

## 5. Rheumatology

### 2015 ACR/EULAR Gout Classification Criteria & Janssens Acute Gout Rule
- **Category:** Rheumatology
- **Clinical Indication:** 
  - **2015 ACR/EULAR Gout Classification Criteria:** Formally classifying patients as having gout for research and clinical trial enrollment.
  - **Janssens Acute Gout Diagnosis Rule:** Practical risk-stratification of acute monoarthritis in clinical settings to determine if joint aspiration is necessary.
- **Formula / Algorithm:**

  #### **2015 ACR/EULAR Gout Classification:**
  - *Entry Criterion:* At least one episode of swelling, pain, or tenderness in a peripheral joint or bursa.
  - *Sufficient Criterion:* Presence of MSU crystals in a symptomatic joint/bursa or tophus. If present, classifiable as Gout without points table.
  - *Point Scoring (if sufficient criterion not met, max score = 23):*
    1. **Pattern of joint/bursa involvement:** 1st MTP (+2), ankle/midfoot (+1), others (0).
    2. **Symptom characteristics** (Erythema, cannot bear touch, severe difficulty walking/using joint): 3 characteristics (+3), 2 (+2), 1 (+1), 0 (0).
    3. **Time-course** ($\ge 2$ features: max pain $< 24$h, resolution $\le 14$ days, complete inter-critical resolution): Recurrent typical episodes (+2), 1 typical episode (+1), 0 (0).
    4. **Clinical tophus:** Present (+4), Absent (0).
    5. **Serum Urate (Uric Acid):** $\ge 10$ mg/dL (+4), $8.0 - 9.9$ (+3), $6.0 - 7.9$ (+2), $< 4.0$ (-4), $4.0 - 5.9$ (0).
    6. **Synovial fluid analysis:** MSU negative (-2), Not done (0).
    7. **Imaging (DECT or Ultrasound double contour sign):** Present (+4), Absent (0).
    8. **Imaging (Radiographic erosion):** Present (+4), Absent (0).
    - **Classification Threshold:** Total score $\ge 8$ points.

  #### **Janssens Acute Gout Diagnosis Rule (0 to 13 points):**
  Sum points based on:
  - Male sex (+2)
  - Previous joint inflammation attack (+2)
  - Onset within 24 hours (+0.5)
  - Joint redness (+1)
  - 1st MTP joint involvement (+2.5)
  - Hypertension or $\ge 1$ cardiovascular disease (+1.5)
  - Serum uric acid $> 5.88$ mg/dL ($&gt; 350\ \mu\text{mol/L}$) (+3)
- **Input Parameters:**
  - History of flares, distribution, cardiovascular comorbidities
  - Serum uric acid, synovial fluid, and imaging findings
- **Output & Interpretation (Janssens Rule):**
  - **$\le 4$ points:** **Low Probability**. Gout unlikely. Consider pseudogout (CPPD) or septic arthritis.
  - **$4.5 - 7.5$ points:** **Intermediate Probability**. Perform joint aspiration to analyze synovial fluid for crystals and Gram stain/culture.
  - **$\ge 8$ points:** **High Probability** ($> 80\%$ positive predictive value). Clinically treat as gout flare; joint aspiration can be deferred if there is no suspicion of septic arthritis.
- **Clinical Pearls / Pocket Medicine Context:**
  - Joint aspiration with polarized light microscopy showing **needle-shaped, negatively birefringent** crystals remains the gold standard diagnosis.
  - **Serum Uric Acid during Flare:** Serum uric acid levels can be normal or low during an acute gout flare because uric acid is depositing in the joints. Do not rule out gout based on a normal uric acid level during an acute attack. Repeat in 2 weeks.
  - Do not initiate uric acid-lowering therapy (e.g., Allopurinol) during an acute flare (unless already taking it, in which case continue). Wait 2 weeks after resolution.
- **MDCalc Links:**
  - **ACR/EULAR:** [https://www.mdcalc.com/calc/10137/2015-acr-eular-gout-classification-criteria](https://www.mdcalc.com/calc/10137/2015-acr-eular-gout-classification-criteria)
  - **Janssens Rule:** [https://www.mdcalc.com/calc/3847/acute-gout-diagnosis-rule](https://www.mdcalc.com/calc/3847/acute-gout-diagnosis-rule)
