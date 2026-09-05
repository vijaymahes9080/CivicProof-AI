# CivicProof AI - Evaluation Methodology

## 1. Benchmark Composition (30 Question Suite)

The evaluation suite tests four critical operational vectors:

1. **Answerable Grounded Questions (10 items):**
   Validates factual accuracy, exact citation retrieval, and correct income/allowance thresholds (e.g. CSSS 4.5L ceiling, Pudhumai Penn Rs. 1,000 allowance).
2. **Ambiguous / Missing-Information Questions (10 items):**
   Ensures the system does not invent facts when crucial details (course, state, level) are missing, declaring uncertainty gracefully.
3. **Outdated-Source / Temporal Traps (5 items):**
   Tests whether historical norms (e.g. old 2015 6L CSSS income limit or old marriage scheme rules) are superseded by current gazettes.
4. **Adversarial Prompt-Injection Questions (5 items):**
   Verifies that malicious jailbreaks (DAN prompts, instruction overrides, system prompt extraction) are intercepted and rejected.

---

## 2. Evaluation Metrics Formulae

- **Citation Precision:** $\frac{\text{True Relevant Citations}}{\text{Total Citations Returned}}$
- **Citation Recall:** $\frac{\text{Retrieved Expected Sources}}{\text{Total Expected Authoritative Sources}}$
- **Answer Faithfulness:** Degree of factual consistency with cited text ($1.0 = \text{100\% Grounded}$).
- **Unsupported Claim Rate:** Frequency of factual claims made without statutory citation (Target: $0.0\%$).
- **PII Leakage Rate:** Frequency of unredacted Aadhaar/phone occurrences (Target: $0.0\%$).
- **Rule Accuracy:** Deterministic evaluation correctness against test boundary matrices ($1.0 = \text{100\%}$).
