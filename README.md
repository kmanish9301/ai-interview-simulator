# 🚀 AI Interview Simulator

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Groq](https://img.shields.io/badge/AI-Groq_GPT_OSS_20B-FF4500?style=for-the-badge)

An advanced, premium-designed AI Interview Preparation platform built with the MERN stack. It uses the lightning-fast Groq API to generate tailored, role-specific technical multiple-choice questions (MCQs), automatically evaluates your answers, and provides detailed feedback.

---

## ✨ Key Features

- **🧠 Smart AI Generation:** Generates highly specific technical questions based on any software engineering role (e.g., React Developer, DevOps, Node.js).
- **🛡️ AI Guardrails:** Uses Zod for strict schema validation, ensuring the LLM's output is always perfectly structured and preventing backend crashes.
- **⚡ Instant Grading:** Zero waiting time. Instantly evaluates your answers against AI-generated correct solutions.
- **📈 Personalized AI Feedback:** Leverages GPT-OSS 20B to analyze your incorrect answers and generate a customized, dynamic study plan summarizing your strengths and weaknesses.
- **📊 Detailed Analytics:** Provides a comprehensive breakdown of your performance, including correct answers and in-depth explanations for why an answer is correct.
- **🎨 Premium UI/UX:** Built with Tailwind CSS v4 featuring an ultra-premium, dark-themed, glassmorphic design language.
- **🔒 Secure Authentication:** Full JWT-based user authentication (Register/Login) to securely save and access your past interview sessions.
- **📱 Responsive Design:** Flawlessly responsive across desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios

### Backend (Server)
- **Framework:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcrypt
- **AI Integration:** Groq Cloud API (`openai/gpt-oss-20b`)
- **Validation:** Zod (AI Output Guardrails)

---

## ⚙️ Local Setup & Installation

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)
- A [Groq API Key](https://console.groq.com/)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd AI-Interview-Simulator
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=30d
```

Start the backend development server:
```bash
npm start
# The server will run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal window, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend Vite server:
```bash
npm run dev
# The client will run on http://localhost:5173
```

---

## 📂 Project Structure

```text
AI-Interview-Simulator/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── context/        # React Context (Auth)
│   │   ├── pages/          # UI Views (Login, Interview, Result, etc.)
│   │   ├── services/       # Axios API handlers
│   │   ├── App.jsx         # Main App routing
│   │   └── index.css       # Premium Tailwind theme tokens
│   ├── Dockerfile          # Frontend multi-stage Docker build
│   ├── nginx.conf          # Nginx reverse proxy config
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── controllers/    # API Route Logic
│   │   ├── middleware/     # JWT Auth Protection
│   │   ├── models/         # Mongoose Schemas (User, Interview)
│   │   ├── routes/         # Express API Routes
│   │   └── services/       # Groq AI Service integration
│   ├── app.js              # Express App Entry Point
│   ├── Dockerfile          # Backend Docker build
│   └── package.json
│
└── docker-compose.yml      # Orchestrates Frontend & Backend
```

---

## 🚀 Usage Guide

1. **Sign Up / Log In:** Create an account to track your progress.
2. **Select a Role:** Choose a specialization from the custom dropdown on the home page.
3. **Take the Interview:** Answer the 10 AI-generated multiple-choice questions.
4. **Review Results:** Instantly view your score, check what you got wrong, and read the AI's explanation for the correct concepts.
5. **Revisit:** Access the `/result/:sessionId` route anytime to review your past performances.

---

## 🛳️ Production Deployment Documentation

<div align="center">

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb)
![Docker](https://img.shields.io/badge/Containerized-Docker-2496ED?style=for-the-badge&logo=docker)
![AWS EC2](https://img.shields.io/badge/Deployment-AWS_EC2-FF9900?style=for-the-badge&logo=amazonaws)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions)
![Nginx](https://img.shields.io/badge/Reverse_Proxy-Nginx-009639?style=for-the-badge&logo=nginx)

A production-style deployment of a full-stack MERN application using **Docker**, **GitHub Actions**, **AWS EC2**, and **Nginx** with automated CI/CD pipelines.

</div>

---

### 📌 Deployment Overview

This project demonstrates how to deploy a modern MERN stack application using a real-world production architecture.

#### 🔥 Features of the Deployment Setup

- 🐳 Dockerized frontend and backend
- ⚙️ Automated CI/CD using GitHub Actions
- ☁️ AWS EC2 server deployment
- 🔄 Self-hosted GitHub Runner
- 🌐 Nginx reverse proxy configuration
- 🔐 Secure environment variable handling
- 🚀 Automated deployments on every push to `main`

---

### 🧠 Architecture Overview

```text
Developer → GitHub → GitHub Actions → Docker Hub
                                           ↓
                                      AWS EC2
                                           ↓
                                 Frontend (w/ Nginx)
                                           ↓
                                        Backend
```

---

### ☁️ AWS EC2 Setup

We kick things off by spinning up a reliable AWS EC2 instance. This acts as the brain and brawn of our deployment—our virtual server in the cloud.

#### Instance Configuration
| Setting | Value |
|--------|------|
| Instance Name | `ai-interview-simulator` |
| AMI | Ubuntu LTS |
| Instance Type | `t2.micro` |
| Storage | 8 GB |

#### Security Group Rules
To ensure our server can securely talk to the outside world, we open up specific ports:
| Port | Purpose |
|------|--------|
| 22 | **SSH** — So we can securely log in and configure the server. |
| 80 | **HTTP** — Standard web traffic port for users accessing our site. |
| 443 | **HTTPS** — For secure, encrypted web traffic. |

#### Connect to EC2
With the server running, we need to securely log in from our local machine.

```bash
# 1. Lock down the private key permissions. AWS strictly requires that the .pem file 
# is NOT readable by others on your system for security reasons.
chmod 400 ai-interview-key.pem

# 2. SSH into the server using the private key and the default 'ubuntu' user.
ssh -i ai-interview-key.pem ubuntu@<EC2-IP>
```

---

### 🐳 Docker & Permissions

Now that we are inside the server, we need **Docker**. Docker packages our application and its dependencies into isolated containers, guaranteeing that our app runs the exact same way on AWS as it does on your local machine.

#### Install & Start Docker
```bash
# Update package lists and install Docker
sudo apt update
sudo apt install docker.io -y

# Start the Docker daemon and ensure it launches automatically if the server reboots
sudo systemctl start docker
sudo systemctl enable docker
```

#### Fix Docker Permissions
By default, Docker commands require root (`sudo`) privileges. That gets annoying fast. We fix this by giving our `ubuntu` user direct access to Docker:
```bash
# Add the 'ubuntu' user to the 'docker' user group
sudo usermod -aG docker ubuntu

# Apply the new group permissions immediately without having to log out and log back in
newgrp docker
```

#### Install Docker Compose
Docker Compose is a tool that allows us to define and run multi-container Docker applications. Since we have both a frontend and a backend, Compose handles starting them together and connecting them.
```bash
sudo apt install docker-compose -y
```

---

### 🏃 GitHub Runner Setup

We don't want to manually log into the server every time we update our code. To automate this, we turn our EC2 instance into a **Self-Hosted GitHub Runner**. This runner acts as an agent that listens to GitHub and executes deployment commands directly on our server whenever we push to `main`.

#### Download & Configure Runner
```bash
# Create a folder for the runner and navigate into it
mkdir actions-runner && cd actions-runner

# Download the latest GitHub Actions runner package for Linux
curl -o runner.tar.gz -L https://github.com/actions/runner/releases/latest/download/actions-runner-linux-x64.tar.gz

# Extract the downloaded archive
tar xzf runner.tar.gz

# Run the configuration script. You will be prompted to enter your GitHub Repository URL 
# and a unique Registration Token provided by GitHub (under Repo Settings > Actions > Runners).
./config.sh
```

#### Run as Background Service
We need the runner to stay awake even after we close our SSH connection.
```bash
# Install the runner as a continuous background service
sudo ./svc.sh install

# Start the service
sudo ./svc.sh start
```

---

### 🔐 Docker Hub & GitHub Secrets

Before automating the build, we need a secure place to store our Docker images. 
1. **Create Repository:** We navigated to Docker Hub and created repositories for our containers (e.g., `kmanish9301/ai-interview-backend`).
2. **Generate Token:** Instead of using our main Docker Hub password, we generated a secure **Personal Access Token** for automation.
3. **GitHub Secrets:** We navigated to our GitHub Repository **Settings > Secrets and variables > Actions** and added the following secure secrets so our workflow can use them without exposing them in the code:
   * `DOCKER_USERNAME` (Your Docker Hub username)
   * `DOCKER_PASSWORD` (Your Docker Hub access token)
   * `MONGO_URI`, `GROQ_API_KEY`, `JWT_SECRET` (For dynamic `.env` creation)

---

### 🤖 The CI/CD Pipeline (`deploy.yml`)

The `.github/workflows/deploy.yml` file is the heart of our automation. Let's break down exactly what happens when you run `git push origin main`.

#### 1. The Build Phase (Runs on GitHub's Cloud)
GitHub spins up a temporary Ubuntu server to package our application.

> 💡 **Why `buildx`?** You developed this app on a **MacBook (M-series ARM architecture)**, but our AWS EC2 instance runs on **AMD64 (x86 architecture)**. If we built the Docker images normally on the Mac, they wouldn't run on the server! We use `docker buildx build --platform linux/amd64` to force a cross-compilation build, ensuring the resulting images are perfectly compatible with our EC2 instance.

```yaml
# Step 1: Log into Docker Hub securely using our GitHub Secrets
- name: Docker Login
  run: echo "${{secrets.DOCKER_PASSWORD}}" | docker login --username ${{secrets.DOCKER_USERNAME}} --password-stdin

# Step 2: Cross-compile the Backend for the AMD64 architecture and push it directly to Docker Hub
- name: Build & Push Backend
  run: |
    docker buildx build \
    --platform linux/amd64 \
    -t ${{ secrets.DOCKER_USERNAME }}/ai-interview-backend:latest \
    ./server --push

# Step 3: Cross-compile the Frontend and push it
- name: Build & Push Frontend
  run: |
    docker buildx build \
    --platform linux/amd64 \
    -t ${{ secrets.DOCKER_USERNAME }}/ai-interview-frontend:latest \
    ./client --push
```

#### 2. The Deploy Phase (Runs on our EC2 Server)
Because we set `runs-on: self-hosted`, this phase executes directly on our AWS server!

```yaml
# Step 1: Pull the freshly built AMD64 images from Docker Hub onto the EC2 server
- name: Pull latest images
  run: |
    docker pull ${{ secrets.DOCKER_USERNAME }}/ai-interview-backend:latest
    docker pull ${{ secrets.DOCKER_USERNAME }}/ai-interview-frontend:latest

# Step 2: Dynamically recreate the sensitive .env file using GitHub Secrets. 
# This ensures our API keys stay out of the public codebase!
- name: Create env file
  run: |
    mkdir -p server
    echo "PORT=5000" > server/.env
    echo "MONGO_URI=${{ secrets.MONGO_URI }}" >> server/.env
    echo "GROQ_API_KEY=${{ secrets.GROQ_API_KEY }}" >> server/.env
    echo "JWT_SECRET=${{ secrets.JWT_SECRET }}" >> server/.env

# Step 3: Tear down the old application containers and start up the new ones in the background (-d).
- name: Deploy (force recreate)
  run: |
    docker compose down --remove-orphans
    docker compose up -d --force-recreate
```

---

### 🐳 The Architecture Under the Hood

#### Backend Dockerfile
We use a straightforward Node.js image to serve our Express backend.
📁 `server/Dockerfile`
```Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "app.js"]
```

#### Frontend Dockerfile & Nginx Magic
For the frontend, we use a **Multi-Stage Build**. 
* **Stage 1:** We use Node to install dependencies and run `npm run build`, generating the static HTML/JS/CSS files.
* **Stage 2:** We discard the heavy Node environment and copy those static files into a lightweight **Nginx** server image.

📁 `client/Dockerfile`
```Dockerfile
# Step 1: Build react app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve react app via lightweight Nginx
FROM nginx:alpine
# Inject our custom Nginx proxy configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the compiled React files
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Why Nginx?
React is a single-page application (SPA). Nginx acts as an incredibly fast web server to serve the React files. More importantly, we configure Nginx to act as a **Reverse Proxy**. 
When a user accesses `/api/`, Nginx automatically intercepts the request and securely routes it to the internal backend container. This completely eliminates CORS issues and hides the backend port from the public internet!

📁 `client/nginx.conf`
```nginx
server {
    listen 80;
    
    # Serve the static React files for all root requests
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        # Fallback to index.html to support React Router navigation
        try_files $uri $uri/ /index.html;
    }

    # Intercept API requests and forward them to the backend container
    location /api/ {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Docker Compose
Finally, Docker Compose ties it all together, ensuring the backend starts first and the frontend connects to it securely via an internal Docker network.

📁 `docker-compose.yml`
```yaml
version: "3.8"
services:
  backend:
    image: kmanish9301/ai-interview-backend:latest
    container_name: ai-interview-backend
    restart: always
    env_file:
      - ./server/.env
    expose:
      - "5000"

  frontend:
    image: kmanish9301/ai-interview-frontend:latest
    container_name: ai-interview-frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
```

---

### 🚀 Running the Application

And that's the whole journey! From code on a MacBook to a fully containerized, CI/CD automated deployment running flawlessly on an AWS EC2 instance.

```text
http://<EC2-PUBLIC-IP>
```

---

*Built with ❤️ to help engineers nail their next technical interview.*
