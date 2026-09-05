# CivicProof AI - Model Context Protocol (MCP) Tool Reference

CivicProof AI exposes 7 read-only public service tools via the official **Python MCP SDK (`mcp`)**.

---

## Tool 1: `search_official_sources`
Searches verified official Indian government scholarship guidelines and gazette notices.

- **Parameters:**
  - `query` (string, required): Search query or keywords.
  - `state` (string, optional): State filter (e.g. 'Tamil Nadu').
  - `department` (string, optional): Department filter.
  - `language` (string, optional, default='en'): 'en' or 'ta'.
- **Output:** Returns matching chunks and statutory citations with page numbers and confidence.

---

## Tool 2: `get_scheme_details`
Retrieves comprehensive official details, ruleset, funding type, and citation anchors.

- **Parameters:**
  - `scheme_id` (string, required): e.g. `'scheme-nsp-csss'`, `'scheme-tn-pudhumai-penn'`.

---

## Tool 3: `get_source_version_history`
Views historical versions, SHA-256 hashes, and modification diff summaries.

- **Parameters:**
  - `source_id` (string, required): e.g. `'src-nsp-csss-001'`.

---

## Tool 4: `evaluate_eligibility`
Deterministically evaluates a citizen's profile against official scholarship criteria without LLM intervention.

- **Parameters:**
  - `scheme_id` (string, required)
  - `state_of_domicile` (string, required)
  - `category` (string, required): General, OBC, SC, ST, EWS
  - `gender` (string, required): Female, Male, Transgender
  - `annual_family_income` (float, required)
  - `education_level` (string, required): Class 10, Class 12, Undergraduate, Postgraduate, etc.
  - `previous_exam_percentage` (float, required)
  - `is_differently_abled` (bool, default=False)
  - `is_first_graduate` (bool, default=False)
  - `govt_school_studied_class_6_to_12` (bool, default=False)

---

## Tool 5: `generate_document_checklist`
Produces a categorized document requirement checklist (Required, Conditional, Optional) with issuing authority guidance.

---

## Tool 6: `verify_application_link`
Checks if an application portal URL belongs to an allow-listed Indian government domain (`.gov.in`, `.nic.in`) and verifies SSRF safety.

- **Parameters:**
  - `url` (string, required)

---

## Tool 7: `create_update_alert`
Registers an internal alert trigger to monitor official government scholarship guideline modifications.

- **Parameters:**
  - `scheme_id` (string, required)
  - `email` (string, required)
