# CivicProof AI - REST API Documentation

Base URL: `http://localhost:8000/api/v1`

---

## 1. Grounded Assistant

### `POST /assistant/chat`
Answers citizen inquiries with strict citation grounding and PII redaction.

**Request Body:**
```json
{
  "query": "What is the family income limit for the NSP Central Sector Scholarship?",
  "language": "en",
  "scheme_id": "scheme-nsp-csss",
  "plain_language": false
}
```

**Response (`200 OK`):**
```json
{
  "answer": "According to verified official guidelines from Department of Higher Education (Central Sector Scheme Guidelines): \"Gross annual family income must not exceed Rs. 4,50,000/- per annum.\"",
  "citations": [
    {
      "source_id": "src-nsp-csss-001",
      "source_title": "Central Sector Scheme Guidelines (Dept of Higher Education)",
      "source_url": "https://scholarships.gov.in/public/schemeGuidelines/CSSS_Guidelines.pdf",
      "department": "Department of Higher Education",
      "state": "All India",
      "exact_quote": "Gross annual family income must not exceed Rs. 4,50,000/- per annum.",
      "page_number": 2,
      "confidence": 1.0
    }
  ],
  "confidence_score": 1.0,
  "evidence_found": true,
  "missing_information": [],
  "suggested_actions": [
    "Visit the verified official portal at https://scholarships.gov.in"
  ],
  "risk_flags": [
    "ALWAYS_VERIFY_APPLICATION_DEADLINES_ON_OFFICIAL_PORTAL"
  ],
  "plain_language_summary": null,
  "language": "en"
}
```

---

## 2. Deterministic Eligibility Calculator

### `POST /eligibility/evaluate`
Calculates eligibility deterministically using Pydantic rule models.

**Request Body:**
```json
{
  "scheme_id": "scheme-nsp-csss",
  "citizen": {
    "state_of_domicile": "Tamil Nadu",
    "category": "OBC",
    "gender": "Female",
    "annual_family_income": 200000.0,
    "education_level": "Undergraduate",
    "previous_exam_percentage": 85.0,
    "is_differently_abled": false,
    "is_first_graduate": true,
    "govt_school_studied_class_6_to_12": true
  }
}
```

---

## 3. Document Checklist Matrix

### `POST /checklist/generate`
Generates required, conditional, and optional documents with issuing authority details.

---

## 4. Source Registry & Link Verification

### `GET /sources`
Lists all allow-listed monitored government portals and their SHA-256 hashes.

### `POST /sources/verify-link`
Validates an external URL for SSRF safety and government whitelist membership.

**Request Body:**
```json
{
  "url": "https://scholarships.gov.in"
}
```
