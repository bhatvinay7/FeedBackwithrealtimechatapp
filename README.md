# 💬 Feedback with Real-time Chat App

A full-stack real-time feedback chat application built using **FastAPI**, **Next.js (SSR)**, **WebSockets**, **Kafka** consumers, and a monorepo architecture.

---

## 🚀 Features

- Real-time chat / feedback functionality
- Kafka consumers for background processing
- WebSocket server for live updates
- Monorepo structure for frontend + backend
- Docker Compose setup for development & production
- Expirable invite links for employees to join projects/groups
- Unread message counts and feedback/rating flows

---

## 📁 Repository Structure

```bash
.
├── .github/                         # CI/CD workflows
├── kafka_consumer_1/                # Kafka consumer service 1
├── kafka_consumer_2/                # Kafka consumer service 2
├── reach-backend/                   # FastAPI backend service
├── reach-frontend/                  # Next.js frontend (SSR)
├── ws-server/                       # WebSocket server
├── docker-compose.dev.yml           # Dev Docker Compose
├── docker-compose.prod.yml          # Production Docker Compose
└── docker-compose.staging.yml       # Staging Docker Compose
```

---

## 🧠 Overview

This platform enables two-way interaction between managers and employees in real time.

Managers can create projects/groups, invite employees via expirable links, and exchange messages, ratings, and feedback.

Built with **FastAPI** (backend), **Next.js (SSR)** (frontend), **Kafka** for event streaming, and **WebSockets** for real-time updates.

---

## 🏗️ System Architecture

---
config:
  theme: neo-dark
  look: classic
  layout: dagre
  curve: basis
---
<img width="1892" height="426" alt="image" src="https://github.com/user-attachments/assets/debf3fac-9742-4524-b267-91c09f97d4a8" />

---

## ⚙️ Core Concepts

**Projects / Groups** — Created by managers; employees join via invite links (links expire).

**Real-time chat** — Messages delivered via WebSocket server; unread counts tracked per user.

**Durable messaging** — Messages are pushed to Kafka so workers/consumers persist/process them and write to DB.

**Feedback & Ratings** — Managers can rate employees and leave feedback; mutual feedback supported.

**Monorepo** — Services organized under one repo (e.g., TurboRepo) for shared code and easier CI/CD.

---

## 🔌 Key Endpoints (Examples)

Replace `${HOST}` with your API host (e.g., `http://localhost:3001`).

### User / Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `${HOST}/user/signup` | Register a user |
| POST | `${HOST}/user/signin` | Sign in (returns JWT) |
| GET | `${HOST}/api/userCredentials` | Get current user details |

### Project / Invite

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `${HOST}/project/create` | Manager creates a project/group |
| POST | `${HOST}/project/invite` | Create an expirable invite link |
| GET | `${HOST}/project/join/:linkId` | Employee joins project via link |

### Files & Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `${HOST}/uploadFile/uploadFile` | Upload a file (if applicable) |
| POST | `${HOST}/messages/send` | Send new chat message |
| GET | `${HOST}/messages/:projectId` | Get messages for a project |
| GET | `${HOST}/messages/unreadCount` | Get unread message counts |
| POST | `${HOST}/feedback/:projectId` | Submit feedback/rating |

---

## 🛰️ WebSocket & Kafka Flow (Summary)

1. Client connects to WebSocket server (e.g., `ws://<host>:8080`)

2. **Sending a message:**
   - WS server publishes message to Kafka (e.g., topic `message-handler`)
   - Kafka consumers (workers) process and persist messages to DB
   - WS server (or worker) notifies connected clients of new messages (via WS or NATS if used)
   - Unread counts are updated and exposed via API or WS events

---

## 🐳 Local Development

### Prerequisites

- Node.js (>= 18)
- Python (>= 3.10)
- Docker & Docker Compose
- Kafka + Zookeeper (usually via Docker Compose)

### Quick Start

**1. Clone the repo:**

```bash
git clone https://github.com/bhatvinay7/FeedBackwithrealtimechatapp.git
cd FeedBackwithrealtimechatapp
```

**2. Create environment files (example `.env` for backend):**

```env
# apps/backend/.env
DATABASE_URL=postgresql://user:password@db:5432/feedback
KAFKA_BROKER=kafka:9092
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://redis:6379
```

**3. Start services:**

```bash
docker compose -f docker-compose.dev.yml up --build
```

**4. Access:**

- **Frontend:** http://localhost:3000
- **Backend docs (FastAPI):** http://localhost:3001/docs (adjust port if necessary)
- **WebSocket:** ws://localhost:8080 (adjust host/port)

---

## 📈 Scaling & Reliability Notes

- Use multiple WS servers behind a load balancer. Keep a `userId → serverId` mapping in Redis for targeted delivery.
- Use Kafka to decouple message ingestion from persistence and heavy processing.
- Maintain invite link TTLs in Redis or DB; automatically expire old links.
- Track unread counts in Redis for O(1) reads and update DB asynchronously.
