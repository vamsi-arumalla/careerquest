# Career Quest

Career Quest is a modern, microservices-based job board application designed to connect employers with candidates.

## 🚀 Key Features

- **Microservices Architecture**: Built with ASP.NET Core 7.
- **Modern Frontend**: React + Tailwind CSS.
- **Advanced Search**: Powered by Elasticsearch.
- **Secure**: JWT Authentication & Role-Based Access Control.
- **Cloud Ready**: Dockerized and ready for AWS/Azure deployment.

## 🏗 Architecture

The system consists of the following services:

| Service | Port | Description |
| :--- | :--- | :--- |
| **Frontend** | `5173` | React SPA for users. |
| **JobService** | `8081` | Manages job postings (PostgreSQL). |
| **ApplicationService** | `8082` | Handles job applications (PostgreSQL). |
| **UserService** | `8083` | Identity Provider & Auth (PostgreSQL). |
| **SearchService** | `8084` | Search indexing and querying (Elasticsearch). |

## 🛠️ Getting Started

### Prerequisites
- Docker Desktop
- Node.js 18+
- .NET 7 SDK

### Quick Start (Docker)
Run the entire stack with a single command:
```bash
docker-compose up -d
```
Access the application at `http://localhost:5173`.

### Local Development
1. **Backend**: Open solution in Visual Studio/VS Code and run via `docker-compose`.
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📦 Deployment

### Production Build
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### AWS Infrastructure (Terraform)
Infrastructure scripts are located in `infrastructure/`.
```bash
cd infrastructure
terraform init
terraform apply
```

## 🧪 Testing Credentials
- **Sign Up**: Create any account at `/signup`.
- **Search**: Use the search bar to find indexed jobs.
