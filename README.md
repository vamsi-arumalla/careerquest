Career Quest

Career Quest is a production-style, microservices-based job board platform built with ASP.NET Core 7 and React. It simulates how modern hiring systems operate at scale using isolated services, independent databases, full-text search, containerization, and infrastructure-as-code.

The focus of this project is architecture, scalability, and cloud readiness — not just CRUD functionality.

Architecture Overview

The system is composed of independently deployable services:

Service	Port	Responsibility	Storage
Frontend	5173	React SPA	—
UserService	8083	Authentication, JWT, RBAC	PostgreSQL
JobService	8081	Job lifecycle management	PostgreSQL
ApplicationService	8082	Candidate applications	PostgreSQL
SearchService	8084	Full-text search	Elasticsearch
Key Design Decisions

Database-per-service for data ownership and loose coupling

Stateless services for horizontal scalability

JWT-based authentication with role-based authorization

Search isolated from transactional workloads

Dockerized for consistent local and production environments

Terraform-managed AWS infrastructure

Core Capabilities

Employer job posting and management

Candidate job search and application flow

Secure authentication and role enforcement

Elasticsearch-powered full-text search

Cloud-ready deployment model

Tech Stack

Backend
ASP.NET Core 7, PostgreSQL, Elasticsearch, Docker

Frontend
React, Tailwind CSS

Infrastructure
Docker Compose, Terraform (AWS-ready)

Running Locally
docker-compose up -d


Access:

http://localhost:5173

Production Deployment
docker-compose -f docker-compose.prod.yml up -d


Infrastructure provisioning:

cd infrastructure
terraform init
terraform apply

What This Project Demonstrates

Distributed system design principles

Microservices with independent data boundaries

Secure authentication architecture

Search system separation and scalability thinking

Containerized development workflows

Infrastructure-as-Code discipline
