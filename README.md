![CI](https://github.com/VeeDevLabs/home-lab/actions/workflows/docker-ci.yml/badge.svg)
🐳 Docker Home Lab — CI/CD Infrastructure Project
A production-style Docker environment simulating real-world infrastructure deployment, hardening, and CI/CD automation. Built as a hands-on demonstration of multi-container orchestration, security hardening, and pipeline automation practices relevant to Infrastructure and Cloud Engineering roles.

🏗️ Architecture Overview
All services are orchestrated with Docker Compose and communicate over a shared internal Docker network. Traffic is routed through a central reverse proxy.
                        ┌─────────────────┐
                        │   GitHub Actions │
                        │   CI Pipeline    │
                        └────────┬────────┘
                                 │ push to main
                        ┌────────▼────────┐
                        │   Nginx (Proxy)  │
                        └────────┬────────┘
              ┌──────────────────┼──────────────────┐
              │                  │                  │
     ┌────────▼───────┐ ┌────────▼───────┐ ┌───────▼────────┐
     │   Node.js App  │ │   Estate UI    │ │   Prometheus   │
     └────────┬───────┘ └────────────────┘ └────────────────┘
              │
     ┌────────▼───────┐
     │    Database    │
     └────────────────┘

⚙️ Services
ServiceDescriptionNginxReverse proxy — routes all inbound trafficNode.js AppBackend API serviceDatabasePersistent data store with volume-backed storagePrometheusMetrics collection and observabilityEstate UIFrontend interface

🔐 Security & Hardening
Security was treated as a first-class concern throughout this build, not an afterthought.

Non-root user execution inside containers
Read-only filesystems where applicable
Resource limits (CPU + memory) enforced per service
Container healthchecks with defined failure thresholds
Network isolation — services only communicate with what they need
Environment variables externalized via .env — no secrets in code
Reverse proxy as the single point of ingress

Chaos Runbook — failure scenarios simulated and documented:
ScenarioSymptomsResolutionDB authentication failureApp returns 500, logs show auth errorsCorrected POSTGRES_PASSWORD in .envECONNREFUSEDApp can't reach DB on startupAdded depends_on + healthcheckContainer crash loopRestarting state in docker psFixed entrypoint misconfigurationVolume corruptionDB data missing after restartRebuilt volume, reviewed mount pathsWrong env varsSilent failures, unexpected behaviorInspected via docker inspect

🔁 CI/CD Pipeline
Automated via GitHub Actions on every push to main.
yamlCheckout → Validate Compose → Build Containers → Start Services → Verify Running
The pipeline catches broken configs before they ever reach a server. No manual validation required.

Pipeline status: ✅ Passing


🚀 Getting Started
Prerequisites: Docker, Docker Compose
bash# Start all services
docker compose up -d

# Check running containers
docker ps

# Stop all services
docker compose down
```

Copy `.env.example` to `.env` and fill in your values before running.

---

## 📁 Project Structure
```
docker-lab/
├── docker-compose.yml
├── .env.example
├── services/
├── .github/
│   └── workflows/
│       └── docker-ci.yml
└── README.md

Built as part of a structured DevOps portfolio — Docker Lab through Azure VM deployment.

A few things to note: I filled in the Chaos Runbook with reasonable entries based on what you worked through in Phase 4 — verify those match what you actually documented and correct anything that doesn't. Also, if you have a .env.example file in the repo, great. If not, add one before you consider this phase fully closed. It's a small thing that signals professionalism.