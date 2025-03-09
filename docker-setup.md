# Docker Setup Instructions

This application has been containerized using Docker and Docker Compose with Nginx as a reverse proxy.

## Prerequisites

- Docker
- Docker Compose

## Setup Instructions

1. Clone this repository
2. Create a `.env` file in the root directory based on `.env.example`
   ```
   cp .env.example .env
   ```
3. Customize the `.env` file with your preferred settings

## Running the Application

To start the application:

```bash
docker-compose up -d
```

This will start three containers:
- Express application (Node.js)
- Nginx as a reverse proxy
- PostgreSQL database

## Accessing the Application

Once the containers are running, you can access the application at:
- http://localhost

Nginx is configured to proxy requests to the Express application.

## Stopping the Application

```bash
docker-compose down
```

If you want to remove the volumes as well:
```bash
docker-compose down -v
```

## Components

### Dockerfile
The Dockerfile sets up the Node.js environment for the Express application.

### docker-compose.yml
The docker-compose configuration sets up:
- The Express application
- Nginx as a reverse proxy
- PostgreSQL database
- Network configuration
- Volume for database persistence

### Nginx Configuration
The Nginx configuration in `nginx/nginx.conf` is set up to:
- Listen on port 80
- Proxy all requests to the Express application
- Configure proper headers for the proxied connection