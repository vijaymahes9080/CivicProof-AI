# CivicProof AI

> **Evidence-Grounded Public-Service Assistant for Indian Citizens & Scholarships**  
> *Tamil:* இந்தியக் குடிமக்களுக்கான ஆதாரபூர்வ அரசு உதவித்தொகை வழிகாட்டி

[![Python 3.11+](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React 18/19](https://img.shields.io/badge/React-18%2F19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ed?logo=docker)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-1.28+-326ce5?logo=kubernetes)](https://kubernetes.io/)
[![Helm](https://img.shields.io/badge/Helm-v3.0+-0f1689?logo=helm)](https://helm.sh/)
[![Prometheus](https://img.shields.io/badge/Prometheus-Metrics-e6522c?logo=prometheus)](https://prometheus.io/)
[![Grafana](https://img.shields.io/badge/Grafana-Monitoring-f46800?logo=grafana)](https://grafana.com/)
[![MCP SDK](https://img.shields.io/badge/MCP-Protocol_v1.0-orange)](https://modelcontextprotocol.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## 🏛️ Mission & Non-Negotiable Principles

CivicProof AI is a production-grade, open-source public service platform designed to help Indian citizens discover central and state government scholarships, evaluate eligibility deterministically with zero LLM hallucination, generate verified document checklists, track official gazette updates, detect phishing scams, and safely navigate to official `.gov.in` application portals.

### Core Principles
1. **Official Sources Only:** Grounded exclusively in verified `.gov.in`, `.nic.in`, and `.ac.in` gazettes.
2. **Strict Citation Anchoring:** Every factual claim includes source IDs, page numbers, and exact quotes.
3. **Zero Hallucination:** Deterministic Pydantic rule engine evaluates criteria independently from LLM text generation.
4. **Privacy-Preserving:** Automatic PII scrubbing for Aadhaar numbers, phone numbers, emails, and bank accounts.
5. **Non-Custodial:** Never collects payments, submits irreversible applications, or stores identity cards.
6. **Bilingual First-Class:** Full support for **English** and **Tamil (தமிழ்)** with a plain-language summary toggle.

---

## 🌟 Innovation & Feature Highlights (v1.1.0-innovation)

CivicProof AI contains an end-to-end suite of 35 production modules across AI, Security, Accessibility, and Cloud Infrastructure:

### 🤖 AI & Model Context Protocol (MCP) Server (11 Public Tools)
1. **`search_official_sources`**: Semantic & hybrid search over official government gazettes.
2. **`get_scheme_details`**: Scheme criteria, funding breakdown, and citation anchors.
3. **`get_source_version_history`**: Cryptographic provenance and SHA-256 diff history.
4. **`evaluate_eligibility`**: Deterministic rule verification against citizen profile attributes.
5. **`generate_document_checklist`**: Structured checklist with issuing authorities (e.g., e-Sevai / VAO).
6. **`verify_application_link`**: SSRF-protected domain validation for `.gov.in` / `.nic.in`.
7. **`create_update_alert`**: Citizen notification registration for guideline revisions.
8. **`compare_schemes`**: Side-by-side policy matrix comparison between 2-4 schemes.
9. **`calculate_benefit_quantum`**: Multi-year maintenance allowance and tuition fee waiver cashflow calculator.
10. **`scan_phishing_scholarship`**: Heuristic scam, fake fee, WhatsApp phishing, and unofficial domain vetting.
11. **`locate_district_welfare_office`**: Geo-directory for nodal welfare officers across Tamil Nadu and other states.

### 🛡️ Security, Privacy & Integrity
- **Phishing & Fraud Scanner**: Analyzes text messages and suspicious URLs for advance-fee scams, unofficial TLDs (`.xyz`, `.top`, `.online`), and urgent WhatsApp circulars.
- **Zero-Knowledge SHA-256 Hash Validator**: Browser-side cryptographic document integrity verification without uploading files to the server.
- **PII Redaction Interceptor**: Automatic scrubbing of 12-digit Aadhaar (`XXXX-XXXX-XXXX`), Indian mobile numbers, emails, and bank accounts.
- **SSRF & Private Subnet Guard**: Blocks RFC 1918, loopback, and cloud metadata IPs (`169.254.169.254`).

### ♿ Accessibility & Citizen Empowerment
- **Voice-Enabled Assistant**: Speech-to-Text voice recognition and Text-to-Speech audio reader in Tamil and English.
- **WCAG 2.1 AAA Suite**: High-contrast mode, OpenDyslexic font support, font size scaling, and screen-reader accessibility.
- **Offline-First PWA**: Service Worker caching for complete offline scheme reference and checklist generation in remote rural areas.
- **Decision Tree Visualizer**: Visual rule navigation for exploring scholarship qualifications interactively.
- **First Graduate & Joint Declaration Generator**: Step-by-step e-Sevai workflow guide with instant automated affidavit generation.
- **NPCI DBT Bank Account Diagnostic**: Aadhaar bank seeding verification diagnostic and bank branch mandate letter generator.
- **Statutory Grievance Redressal Directory**: Direct navigation to CPGRAMS, CM Special Cell 1100, and PFMS helpdesks.

### 🇮🇳 Multi-State Coverage
- **Central Govt:** National Scholarship Portal (NSP CSSS, Post-Matric SC/ST).
- **Tamil Nadu:** Pudhumai Penn, 7.5% Govt School Quota, First Graduate Concession, Moovalur Ramamirtham.
- **Karnataka:** State Scholarship Portal (SSP), Vidyasiri (ePASS), Post-Matric Fee Concession.
- **Kerala:** E-Grantz 3.0, OEC Educational Concession.
- **Andhra Pradesh:** Jagananna Vidya Deevena (JVD DBT), Jagananna Vasathi Deevena.
- **Maharashtra:** MahaDBT Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti (EBC).
- **Uttar Pradesh:** UP Saksham Post-Matric Scholarship & Fee Reimbursement Online System.

### 📊 Observability & Cloud Deployment
- **OpenTelemetry Tracing**: Distributed context propagation and request tracing across FastAPI microservices.
- **Prometheus Metrics**: Dedicated scraping endpoint `/metrics` for request counts, latency histograms, and active connections.
- **Grafana Dashboard**: Pre-configured JSON dashboard for HTTP latency, 4xx/5xx error rates, and security tripwires.
- **Kubernetes & Helm Chart**: Production-ready deployment manifests with horizontal pod autoscaling and ingress controllers.

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
- **Prometheus Metrics:** `http://localhost:8000/metrics`
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

# Run Automated Test Suite (39 Tests)
pytest -v

# Run 30-Question Benchmark
python -m services.evaluation.runner
```

---

## 📦 Repository Structure

```
CivicProof-AI/
├── apps/
│   ├── api/                     # FastAPI backend (Auth, Schemes, RAG Assistant, Eligibility, Checklists, Metrics)
│   └── web/                     # React + Vite + TypeScript + Tailwind CSS (Bilingual EN/TA, PWA, Voice)
├── services/
│   ├── ingestion/               # SSRF-safe parser, semantic chunker, and content hasher
│   ├── mcp_server/              # Official Python MCP SDK Server (11 tools in tools/ subpackage)
│   └── evaluation/              # Multi-State benchmark dataset (v1 & v2) and metric evaluation engine
├── packages/
│   └── shared/                  # Pydantic models, allowlists, fraud detector, dictionary & district directories
├── infra/
│   ├── docker/                  # Docker Compose & Dockerfiles
│   ├── k8s/                     # Kubernetes manifests & production Helm chart
│   ├── monitoring/              # Grafana dashboard & Prometheus scraping configuration
│   └── n8n/workflows/           # Scheduled source monitor & diff alert workflow
├── docs/                        # Complete technical and security documentation
└── tests/                       # Unit, integration, security, innovation, and MCP contract tests
```

---

## 🧪 Benchmark & Evaluation Suite

Run the automated evaluation benchmark:

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
