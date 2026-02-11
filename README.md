Career Quest

Career Quest is a production-style, microservices-based job board platform built with ASP.NET Core 7 and React. It is designed to simulate how modern hiring systems operate at scale — with isolated services, independent databases, full-text search, containerized deployment, and infrastructure-as-code provisioning.

The goal of this project was not just to build a job board, but to design a system that reflects real-world backend architecture patterns used in scalable SaaS platforms.

🎯 Why I Built This

Most job board demos are monolithic and simplistic. I wanted to design a system that:

Separates concerns across independently deployable services

Uses database-per-service architecture

Implements secure JWT-based authentication with role-based authorization

Integrates Elasticsearch for production-grade search

Is fully containerized and cloud-ready

Can be provisioned in AWS using Terraform

This project allowed me to explore distributed system design decisions, service communication, data ownership boundaries, and deployment automation.

🏗 System Architecture

The platform is composed of the following services:

Service	Port	Responsibility	Storage
Frontend	5173	React SPA (Candidates & Employers UI)	—
UserService	8083	Identity Provider, JWT Auth, RBAC	PostgreSQL
JobService	8081	Job CRUD & employer operations	PostgreSQL
ApplicationService	8082	Candidate applications & tracking	PostgreSQL
SearchService	8084	Search indexing & querying	Elasticsearch
Architectural Highlights

Database per service to enforce data ownership boundaries.

JWT authentication issued by UserService with role-based access control.

SearchService decoupled from JobService and optimized for full-text queries.

Dockerized environment for local orchestration.

Terraform-based AWS infrastructure for production deployment.

🔐 Security Design

JWT-based authentication with role claims (Employer / Candidate)

Protected endpoints with policy-based authorization

Service-level validation and input sanitization

Secure environment variable handling via Docker

🔎 Search Implementation

The SearchService indexes job postings into Elasticsearch and enables:

Full-text search

Keyword-based filtering

Fast query responses under high load

Decoupled search layer from transactional database

This mirrors how production systems separate write workloads from search workloads.

🛠️ Tech Stack

Backend

ASP.NET Core 7

PostgreSQL

Elasticsearch

Docker

Frontend

React

Tailwind CSS

Axios

Infrastructure

Docker Compose

Terraform (AWS-ready)

🚀 Running Locally
Docker (Recommended)
docker-compose up -d


Access:

http://localhost:5173

Manual Development

Backend:

Open solution in Visual Studio or VS Code

Run via Docker Compose

Frontend:

cd frontend
npm install
npm run dev

☁️ Production Deployment
Docker Production Build
docker-compose -f docker-compose.prod.yml up -d

AWS Infrastructure
cd infrastructure
terraform init
terraform apply


Infrastructure provisions:

Networking (VPC, subnets)

Container runtime

Database instances

Security groups

IAM roles

🧪 Test Credentials

Create an account via:

/signup


Then:

Post jobs as an Employer

Apply as a Candidate

Use the search bar to test Elasticsearch indexing

📈 What This Project Demonstrates

Distributed microservices design

Service isolation and database ownership

Secure authentication architecture

Search indexing architecture

Containerized environments

Infrastructure-as-Code (Terraform)

Cloud-ready backend engineering  
