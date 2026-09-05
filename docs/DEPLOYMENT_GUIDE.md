# CivicProof AI - Deployment Guide

---

## 🌐 1. GitHub Pages Static Web App Hosting

CivicProof AI is pre-configured for automated build and hosting on **GitHub Pages**:

**Live Demo URL:** `https://vijaymahes9080.github.io/CivicProof-AI/`

### How to Enable GitHub Pages in Repository Settings:

#### Option A: Via GitHub Actions (Recommended)
1. Go to your repository on GitHub: `https://github.com/vijaymahes9080/CivicProof-AI`
2. Click **Settings** (gear icon) $\rightarrow$ **Pages** (in the left sidebar).
3. Under **Build and deployment** $\rightarrow$ **Source**, select **`GitHub Actions`**.
4. The workflow in `.github/workflows/deploy-pages.yml` will automatically build and deploy the React web application on every push to `main`!

#### Option B: Deploy from Branch (`gh-pages`)
1. Go to **Settings** $\rightarrow$ **Pages**.
2. Under **Build and deployment** $\rightarrow$ **Source**, select **`Deploy from a branch`**.
3. Under **Branch**, select **`gh-pages`** and folder **`/ (root)`**.
4. Click **Save**.

---

## 🐳 2. Docker Compose Production Deployment (Full Stack)

To run the complete full-stack platform (FastAPI, React UI, Qdrant Vector DB, PostgreSQL, n8n Automation, Prometheus, Grafana):

```bash
docker compose -f infra/docker/docker-compose.yml up --build -d
```

### Endpoints:
- **Web Frontend:** `http://localhost:5173`
- **FastAPI Backend & Swagger:** `http://localhost:8000/docs`
- **Prometheus Metrics:** `http://localhost:8000/metrics`
- **n8n Automation Console:** `http://localhost:5678`
- **Qdrant Vector DB:** `http://localhost:6333`

---

## ☸️ 3. Kubernetes & Helm Cloud Deployment

For high-availability cloud deployments on AWS EKS, GCP GKE, or Azure AKS:

```bash
# Install via Helm
helm install civicproof-ai infra/k8s/helm/civicproof/ -f infra/k8s/helm/civicproof/values.yaml

# Check Pod status
kubectl get pods -l app=civicproof-ai
```

---

## 🛡️ 4. Security & Production Checklist

1. **Environment Variables:**
   - Set `ENVIRONMENT=production`.
   - Configure a cryptographically secure 256-bit `SECRET_KEY`.
   - Update `DATABASE_URL` with managed PostgreSQL credentials.
2. **TLS / HTTPS:**
   - Configure Certbot / Let's Encrypt or Cloud Ingress TLS certificates.
3. **Container Health & Autoscaling:**
   - Horizontal Pod Autoscaler (HPA) configured for CPU target at 75%.
