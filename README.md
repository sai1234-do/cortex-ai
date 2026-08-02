# 🧠 Cortex AI

<div align="center">

### AI Cognitive Operating System

**An intelligent AI workspace that continuously learns, remembers, reasons, and evolves with every user interaction.**

---

![Python](https://img.shields.io/badge/Python-3.12-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

# 🚀 Overview

Cortex AI is an intelligent cognitive operating system designed to go beyond traditional AI chatbots.

Instead of only answering prompts, Cortex maintains structured conversations, organizes projects, manages long-term memory, processes uploaded knowledge, and builds personalized context to deliver increasingly intelligent responses.

The project follows a modular, production-inspired architecture with a React frontend and a FastAPI backend.

---

# ✨ Core Features

## 🤖 AI Chat

- Intelligent conversations
- Conversation history
- Streaming-ready architecture
- Context-aware responses
- Multiple chat sessions

---

## 🧠 Long-Term Memory

- Memory extraction
- Persistent memory storage
- Personalized AI responses
- Context reconstruction
- User-specific knowledge

---

## 📁 Knowledge Base

- Document uploads
- Intelligent document parsing
- Text chunking
- Embedding generation
- Semantic retrieval

---

## 📂 Project Workspace

- Project creation
- Project organization
- Conversation grouping
- Workspace management

---

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing
- Protected API Routes

---

# 🏗 Architecture

```
                +----------------------+
                |    React Frontend    |
                +----------+-----------+
                           |
                     REST API Calls
                           |
                +----------v-----------+
                |     FastAPI API      |
                +----------+-----------+
                           |
      +--------------------+--------------------+
      |                    |                    |
      |                    |                    |
+-----v-----+       +------v------+      +------v------+
|   Memory  |       | Conversation |      |  Projects  |
|  Service  |       |   Service    |      |  Service   |
+-----+-----+       +------+-------+      +------+-----+
      |                    |                     |
      +----------+---------+---------------------+
                 |
          +------v------+
          | Repository  |
          |   Layer     |
          +------+------+
                 |
        +--------v--------+
        | SQLite Database |
        +-----------------+
```

---

# 🗂 Project Structure

```
Cortex-AI
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── database
│   │   ├── models
│   │   ├── prompts
│   │   ├── repositories
│   │   ├── routers
│   │   ├── security
│   │   ├── services
│   │   ├── utils
│   │   └── vectorstore
│   │
│   └── requirements.txt
│
├── frontend
│   ├── public
│   └── src
│       ├── components
│       ├── context
│       ├── features
│       ├── pages
│       ├── routes
│       ├── services
│       ├── store
│       ├── styles
│       ├── theme
│       └── utils
│
├── docs
├── README.md
└── LICENSE
```

---

# ⚙ Tech Stack

## Frontend

- React
- Vite
- Context API
- CSS Modules
- React Icons

---

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- SQLite

---

## AI Components

- Memory Management
- Prompt Engineering
- Context Builder
- Embedding Pipeline
- Retrieval Service
- Document Processing

---

# 🔄 System Flow

```
User

↓

React Frontend

↓

FastAPI Backend

↓

Authentication

↓

Conversation Service

↓

Memory Retrieval

↓

Context Builder

↓

AI Response

↓

Conversation Storage

↓

Frontend
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/sai1234-do/cortex-ai.git

cd cortex-ai
```

---

# Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

```
http://localhost:8000
```

Swagger:

```
http://localhost:8000/docs
```

---

# Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 📡 API Modules

Current backend modules include:

- Authentication
- Chat
- Conversation
- Memory
- Projects
- Messages
- File Upload
- Health Check

---

# 🔮 Future Roadmap

- AI Agent Orchestration
- Retrieval-Augmented Generation (RAG)
- Multiple LLM Support
- Voice Interface
- Image Understanding
- Vector Database Integration
- PostgreSQL Migration
- Docker Deployment
- Kubernetes
- CI/CD Pipeline
- AWS Deployment
- Production Monitoring

---

# 🤝 Contributing

Contributions, ideas, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📄 License

Licensed under the MIT License.

---

# 👨‍💻 Author

**Sai**

AI Engineering Student

Building production-ready AI systems using modern software engineering principles.

GitHub:

https://github.com/sai1234-do

---

<div align="center">

⭐ If you found this project useful, consider giving it a star.

</div>