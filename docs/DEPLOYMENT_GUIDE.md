# CivicProof AI - Production Deployment Guide

## 1. Production Architecture Overview

For production deployment on Linux / Cloud Virtual Machines (AWS EC2, Azure VM, DigitalOcean Droplet):

```
                       [ HTTPS (443) ]
                              |
                     [ Nginx Reverse Proxy ]
                     /          |          \
           [ React Web UI ] [ FastAPI API ] [ n8n Console ]
                 (5173)         (8000)          (5678)
                                  |
                        +---------+---------+
                        |                   |
                [ PostgreSQL 16 ]    [ Qdrant Vector ]
```

---

## 2. Production Checklist

1. **Environment Variables:**
   - Replace `SECRET_KEY` with a cryptographically secure 256-bit token.
   - Update `DATABASE_URL` with managed PostgreSQL credentials.
   - Set `ENVIRONMENT=production`.
2. **TLS / HTTPS:**
   - Configure Certbot / Let's Encrypt on Nginx.
3. **Container Health:**
   - Use Docker Compose `restart: always` with healthchecks enabled.
