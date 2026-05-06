# Highscore DevOps Project

This is a Node.js Highscore API Server containerized with Docker that stores the top 10 scores in memory without using a database and exposes a REST API for managing highscores while demonstrating DevOps practices including Docker containerization, CI/CD flow, and AWS EC2 deployment readiness. The purpose of this project is to build a REST API using Node.js and package it with Docker to ensure consistent environments and prepare it for automated deployment pipelines.

The application provides features such as in-memory highscore storage, a top 10 leaderboard system, the ability to add new scores via API, delete all scores, and serve a frontend HTML page.

The API includes:
GET `/` which returns `highscore.html`,  
GET `/api/highscores` which returns a JSON list of players and scores,  
POST `/api/highscore` which accepts a player name and score where the score must be greater than 0 and only the top 10 scores are stored otherwise it returns a 400 Bad Request while valid submissions return 201 Created,  
DELETE `/api/highscores` which clears all stored data and returns an empty list.

```json
[
  { "player": "Alex", "score": 900 },
  { "player": "DevOps", "score": 800 }
]
```

```json
{ "player": "User", "score": 500 }
```

Docker is used to containerize the application so it runs consistently across all environments without manual setup and eliminates environment differences. The build process uses:

```bash
docker build -t highscore-app .
```

and the container is run using:

```bash
docker run -p 3000:3000 highscore-app
```

The CI/CD flow follows a pipeline where GitHub triggers a build process, Docker creates an image, and the application is deployed to an AWS EC2 instance where it runs inside a Linux environment using Docker Engine with Node.js inside the container exposing port 3000 for public access.

For local development the project can be installed and tested using:

```bash
npm install
npm test
node server.js
```

This project demonstrates a complete DevOps workflow combining backend development, containerization, CI/CD automation, and cloud deployment into a single production-style application that is portable, scalable, and deployment-ready.
