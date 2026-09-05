# CivicProof AI

> **Evidence-Grounded Public-Service Assistant for Indian Citizens & Scholarships**  
> *Tamil:* இந்தியக் குடிமக்களுக்கான ஆதாரபூர்வ அரசு உதவித்தொகை வழிகாட்டி

[![Python 3.11+](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React 18/19](https://img.shields.io/badge/React-18%2F19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ed?logo=docker)](https://www.docker.com/)
[![MCP SDK](https://img.shields.io/badge/MCP-Protocol_v1.0-orange)](https://modelcontextprotocol.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## 🏛️ Mission & Non-Negotiable Principles

CivicProof AI is a production-quality, open-source public service assistant designed to help Indian citizens discover government scholarships, understand eligibility with zero hallucination, generate verified document checklists, track official gazette updates, and safely navigate to official portals.

### Core Principles
1. **Official Sources Only:** Grounded exclusively in verified `.gov.in`, `.nic.in`, and `.ac.in` gazettes.
2. **Strict Citation Anchoring:** Every factual claim includes source IDs, page numbers, and exact quotes.
3. **Zero Hallucination:** Deterministic Pydantic rule engine evaluates criteria independently from LLM text generation.
4. **Privacy-Preserving:** Automatic PII scrubbing for Aadhaar numbers, phone numbers, emails, and bank accounts.
5. **Non-Custodial:** Never collects payments, submits irreversible applications, or stores identity cards.
6. **Bilingual First-Class:** Full support for **English** and **Tamil (தமிழ்)** with a plain-language summary toggle.

---

## 🚀 Quickstart (Run Locally)

### Option 1: Docker Compose (All Services)

```bash
# 1. Clone repository
git clone https://github.com/vijaymahes9080/CivicProof-AI.git
cd CivicProof-AI

# 2. Start all services
docker compose -f infra/docker/docker-compose.yml up --build
```

- **Web Frontend:** `http://localhost:5173`
- **FastAPI Backend & Swagger:** `http://localhost:8000/docs`
- **n8n Automation:** `http://localhost:5678`
- **Qdrant Vector DB:** `http://localhost:6333`

---

### Option 2: Standalone Local Development

```bash
# Backend
pip install -r apps/api/requirements.txt
uvicorn app.main:app --app-dir apps/api --host 0.0.0.0 --port 8000 --reload

# Frontend
cd apps/web
npm install
npm run dev

# Run MCP Server
python -m services.mcp_server.server

# Run 30-Question Benchmark
python -m services.evaluation.runner
```

---

## 📦 Repository Structure

```
CivicProof-AI/
├── apps/
│   ├── api/                     # FastAPI backend (Auth, Schemes, RAG Assistant, Eligibility, Checklists)
│   └── web/                     # React + Vite + TypeScript + Tailwind CSS (Bilingual EN/TA)
├── services/
│   ├── ingestion/               # SSRF-safe parser, semantic chunker, and content hasher
│   ├── mcp_server/              # Official Python MCP SDK Server (7 tools)
│   └── evaluation/              # 30-Question benchmark dataset and metric evaluation engine
├── packages/
│   └── shared/                  # Common Pydantic models, allowlists, and bilingual dictionary
├── infra/
│   ├── docker/                  # Docker Compose & Dockerfiles
│   └── n8n/workflows/           # Scheduled source monitor & diff alert workflow
├── docs/                        # Complete technical and security documentation
└── tests/                       # Unit, integration, security, and MCP contract tests
```

---

## 🛠️ Model Context Protocol (MCP) Tools

CivicProof AI implements the official Python MCP SDK with 7 read-only public tools:

1. `search_official_sources`: Search verified government scholarship gazettes.
2. `get_scheme_details`: Retrieve official scheme criteria, funding type, and citation anchors.
3. `get_source_version_history`: View historical SHA-256 hashes and diff summaries.
4. `evaluate_eligibility`: Deterministically evaluate a citizen profile against statutory rules.
5. `generate_document_checklist`: Generate categorized certificate requirements with issuing authorities.
6. `verify_application_link`: Check if a portal link is on the official government domain whitelist.
7. `create_update_alert`: Register an internal monitor for official guideline revisions.

---

## 🛡️ Security & Privacy Guardrails

- **Domain Whitelist & SSRF Protection:** Blocks private subnets (RFC 1918) and loopback addresses.
- **PII Redaction:** Regex scrubbers eliminate Aadhaar (`XXXX-XXXX-XXXX`), Indian phone numbers, emails, and bank accounts prior to indexing.
- **Prompt Injection Interceptor:** Detects instruction overrides, jailbreak signatures, and system prompt leakage attempts.
- **Audit Logging:** Structured audit logs capture user IDs, endpoints, latency, and security statuses.

---

## 🧪 Benchmark & Evaluation Suite

Run the automated 30-question evaluation benchmark:

```bash
python -m services.evaluation.runner
```

**Evaluated Metrics:**
- **Citation Precision & Recall**
- **Answer Faithfulness**
- **Retrieval Recall@K**
- **Eligibility Rule Accuracy**
- **Unsupported Claim Rate (0.0% Target)**
- **PII Leakage Rate (0.0% Target)**
- **Response Latency**

---

## 📖 Documentation Directory

- [Local Setup Guide](docs/LOCAL_SETUP.md)
- [System Architecture](docs/ARCHITECTURE.md)
- [REST API Reference](docs/API_DOCUMENTATION.md)
- [MCP Tools Reference](docs/MCP_TOOLS.md)
- [Data Model & Cryptographic Provenance](docs/DATA_MODEL.md)
- [Threat Model & Security](docs/THREAT_MODEL.md)
- [Evaluation Methodology](docs/EVALUATION_METHODOLOGY.md)
- [Production Deployment](docs/DEPLOYMENT_GUIDE.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)
- [Responsible Use Notice](docs/RESPONSIBLE_USE.md)
- [Known Limitations](docs/KNOWN_LIMITATIONS.md)

---

## 👤 Author & Maintainer

- **Vijay Mahes** (<Vijaypradhap2004@gmail.com>)
- License: [MIT License](LICENSE)
