# CivicProof AI - Security & Threat Model

## 1. Threat Profile & STRIDE Analysis

| STRIDE Threat | Potential Vulnerability | CivicProof AI Mitigation |
|---|---|---|
| **Spoofing** | Citizen tricking system into certifying fake eligibility | **Separation of Concerns:** CivicProof AI does not issue official certificates or submit applications; it provides pre-application calculation with explicit statutory citations. |
| **Tampering** | External tampering with scheme rules or guidelines | **Cryptographic Hashing:** Every source is SHA-256 hashed. Rules are codified in immutable Pydantic classes, decoupled from LLM. |
| **Repudiation** | Denying tool invocations or admin actions | **Structured Audit Logging:** Every assistant query, evaluation, and tool call logs timestamp, user ID, IP, and latency. |
| **Information Disclosure** | PII leak (Aadhaar number, phone, email, bank account) | **Pre-Processing PII Redactor:** Strict regex scrubs Aadhaar (`XXXX-XXXX-XXXX`), Indian mobile numbers, and bank accounts prior to indexing or prompting. |
| **Denial of Service** | Flooding chat endpoint or tool endpoints | **Sliding Window Rate Limiter:** Enforces max 60 req/min per IP. Size limits (4,000 chars query, 15MB doc fetch). |
| **Elevation of Privilege** | Prompt injection jailbreak overriding system rules | **Prompt Injection Defense:** Regex heuristic classifier detects instruction overwrites, jailbreaks, and system prompt leakage attempts. |

---

## 2. Server-Side Request Forgery (SSRF) Mitigations

The outbound fetcher enforces a two-layer validation strategy:
1. **Domain Whitelist:** Target URL must resolve to an allow-listed Indian government domain (`*.gov.in`, `*.nic.in`, `*.ac.in`, `*.edu.in`).
2. **IP Subnet Blocking:** DNS resolution is verified against private IP ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.0/8`, and AWS/GCP metadata `169.254.169.254`).
