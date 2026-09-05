# Local Setup & Development Guide

This guide walks you through running the **CivicProof AI** platform locally using Docker Compose or standalone development servers.

---

## Prerequisites

- **Docker & Docker Compose** (v24.0+)
- **Python** 3.11+
- **Node.js** v20+ and **npm** v10+
- **Git**

---

## Quickstart via Docker Compose (Recommended)

To start the complete stack (PostgreSQL, Qdrant Vector Store, Ollama LLM service, FastAPI API, React Web UI, MCP Server, and n8n Automation):

```bash
# 1. Clone the repository
git clone https://github.com/vijaymahes9080/CivicProof-AI.git
cd CivicProof-AI

# 2. Copy environment configuration
cp infra/.env.example .env

# 3. Launch Docker Compose
docker compose -f infra/docker/docker-compose.yml up --build
```

### Accessing Services

| Service | URL | Default Credentials |
|---|---|---|
| **Web Frontend** | `http://localhost:5173` | Public |
| **FastAPI Backend & Swagger** | `http://localhost:8000/docs` | `admin@civicproof.gov.in` / `AdminCivicProof@2026` |
| **n8n Automation Console** | `http://localhost:5678` | `admin` / `CivicProofN8NAdmin2026` |
| **Qdrant Dashboard** | `http://localhost:6333/dashboard` | Public |
| **Ollama Local LLM API** | `http://localhost:11434` | Public |

---

## Running in Standalone Development Mode

### 1. Backend & API Service

```bash
# Set up Python virtual environment
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate

# Install requirements
pip install -r apps/api/requirements.txt

# Run database initialization and FastAPI dev server
uvicorn app.main:app --app-dir apps/api --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend Web Application

```bash
cd apps/web
npm install
npm run dev
```

The web application will be accessible at `http://localhost:5173`.

### 3. Running the MCP Server

```bash
# Run the Python MCP Server via STDIO or FastMCP
python -m services.mcp_server.server
```

### 4. Running the Benchmark Evaluation

```bash
python -m services.evaluation.runner
```
