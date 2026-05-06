#  Highscore DevOps Project (Docker First)

This project is a fully containerized Highscore application built with Docker, where the main focus is running and deploying the system through containers rather than traditional setup. The application is a Node.js-based REST API that stores the top 10 highscores in memory without using any database, but the real emphasis of this project is on Docker-based development, deployment, and portability.

The entire system is designed to run inside a Docker container so that it behaves the same in development, testing, and production environments. This removes dependency issues and ensures consistent execution across any machine or cloud platform such as AWS EC2.

The API is a simple backend that supports:
GET `/` which serves `highscore.html`,  
GET `/api/highscores` which returns the current top scores,  
POST `/api/highscore` which adds a new score if it qualifies for the top 10 (score must be > 0, otherwise rejected with 400),  
DELETE `/api/highscores` which clears all stored scores.

```json
[
  { "player": "Alex", "score": 900 },
  { "player": "DevOps", "score": 800 }
]
```

```json
{ "player": "User", "score": 500 }
```

However, the main focus of this project is Docker.

The application is built into a Docker image using:

```bash
docker build -t highscore-app .
```

This creates a portable image containing the Node.js runtime, dependencies, and application code.

The container is executed using:

```bash
docker run -p 3000:3000 highscore-app
```

Once running, the application is fully isolated inside a container and accessible via port 3000.

The CI/CD flow is also designed around Docker. When code is pushed to GitHub, a pipeline builds the Docker image automatically, and the container is deployed to an AWS EC2 instance where it runs consistently inside a Linux-based Docker environment.

GitHub → CI/CD Pipeline → Docker Image Build → EC2 Deployment → Running Container

For local development, Docker ensures the same environment is used everywhere, eliminating “it works on my machine” issues.

```bash
npm install
npm test
node server.js
```
In summary, this project is primarily a **Docker-focused DevOps project**, where containerization is the core concept, and Node.js simply provides the lightweight API running inside the container. It demonstrates how modern applications are packaged, shipped, and deployed using Docker as the main foundation.

