# 🧠 Cortex AI

> An AI Cognitive Operating System that continuously learns, reasons, predicts, and grows with every user.

![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Vite](https://img.shields.io/badge/Vite-Build-purple)
![License](https://img.shields.io/badge/License-MIT-orange)

---

# Overview

Cortex AI is a next-generation AI workspace designed to function as a personal cognitive operating system.

Unlike traditional chatbots, Cortex is designed around persistent memory, contextual reasoning, project organization, and long-term user understanding.

The system combines a modern React frontend with a modular FastAPI backend following clean architecture principles.

---

# Features

## Authentication

- User Signup
- Secure Login
- JWT Authentication
- Password Encryption
- Protected Routes

---

## AI Chat

- Context-aware conversations
- Persistent conversation history
- Streaming-ready architecture
- Multiple conversation support

---

## Memory System

- Long-term memory extraction
- Memory retrieval
- Context building
- Personalized responses

---

## Knowledge Management

- File uploads
- Document processing
- Intelligent chunking
- Embedding generation
- Semantic retrieval

---

## Projects

- Project creation
- Project management
- Conversation grouping
- Workspace organization

---

## Backend Architecture

```
backend/
│
├── app/
│   ├── api/
│   ├── core/
│   ├── database/
│   ├── models/
│   ├── prompts/
│   ├── repositories/
│   ├── routers/
│   ├── security/
│   ├── services/
│   ├── utils/
│   └── vectorstore/
│
└── requirements.txt
```

---

## Frontend Architecture

```
frontend/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── features/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── theme/
│   └── utils/
│
└── package.json
```

---

# Tech Stack

## Frontend

- React
- Vite
- Context API
- CSS Modules
- React Icons

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Pydantic

## AI

- Embeddings
- Vector Search
- Retrieval Pipeline
- Prompt Engineering
- Memory Extraction

---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/sai1234-do/cortex-ai.git
cd cortex-ai
```

---

## Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

Swagger UI:

```
http://localhost:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Project Structure

```
Cortex-AI/
│
├── backend/
├── frontend/
├── docs/
├── LICENSE
└── README.md
```

---

# Roadmap

- Authentication
- Chat System
- Memory Engine
- Knowledge Base
- Project Workspace
- AI Agent Integration
- RAG Pipeline
- Multi-Model Support
- Cloud Deployment
- Production Monitoring

---

# License

This project is licensed under the MIT License.

---

# Author

**Sai**

AI Engineering Student

Building production-ready AI systems with modern software engineering principles.

---

⭐ If you like this project, consider starring the repository.