# Movie Explorer

A full-stack movie exploration application built with React, Node.js, and Express. This application allows users to browse, search, and explore information about movies.

## Features

- Browse popular and trending movies
- Search for movies by title
- View detailed movie information
- Responsive design for all devices
- Secure authentication system
- Rate limiting for API protection

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/movie-explorer.git
cd movie-explorer
```

### 2. Create an Environment File

Create a `.env` file in the root of the project and add the following environment variables. 

```
# Server Configuration
PORT=5000
MONGO_URI=mongodb://mongodb:27017/movie-explorer
JWT_SECRET=your_jwt_secret_key
TMDB_API_KEY=your_tmdb_api_key

# MongoDB Credentials
MONGO_INITDB_ROOT_USERNAME=your_mongo_admin_user
MONGO_INITDB_ROOT_PASSWORD=your_mongo_admin_password

# Mongo Express Configuration
ME_CONFIG_MONGODB_ADMINUSERNAME=your_mongo_admin_user
ME_CONFIG_MONGODB_ADMINPASSWORD=your_mongo_admin_password
ME_CONFIG_BASICAUTH_USERNAME=your_mongo_express_user
ME_CONFIG_BASICAUTH_PASSWORD=your_mongo_express_password
```

### 3. Build and Run the Application

```bash
docker-compose up --build
```

Once the containers are up and running, you can access the application at:

- **Frontend:** [http://localhost:80](http://localhost:80)
- **Backend:** [http://localhost:5000](http://localhost:5000)
- **Mongo Express:** [http://localhost:8081](http://localhost:8081)

## Environment Variables

| Variable                          | Description                                      |
| --------------------------------- | ------------------------------------------------ |
| `PORT`                            | The port for the backend server.                 |
| `MONGO_URI`                       | The connection string for the MongoDB database.  |
| `JWT_SECRET`                      | A secret key for signing JWT tokens.             |
| `TMDB_API_KEY`                    | Your API key for The Movie Database (TMDb).      |
| `MONGO_INITDB_ROOT_USERNAME`      | The root username for the MongoDB instance.      |
| `MONGO_INITDB_ROOT_PASSWORD`      | The root password for the MongoDB instance.      |
| `ME_CONFIG_MONGODB_ADMINUSERNAME` | The admin username for Mongo Express.            |
| `ME_CONFIG_MONGODB_ADMINPASSWORD` | The admin password for Mongo Express.            |
| `ME_CONFIG_BASICAUTH_USERNAME`    | The username for accessing Mongo Express.        |
| `ME_CONFIG_BASICAUTH_PASSWORD`    | The password for accessing Mongo Express.        |

## Project Structure

```
movie-explorer/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/               # React source code
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page components
│       └── ...
└── server/                # Backend Node.js/Express server
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Route controllers
    │   ├── middleware/   # Custom middleware
    │   └── index.js      # Server entry point
    └── .env              # Environment variables
```

## Available Scripts

While Docker is the recommended way to run the project, you can also run the client and server independently.

### Client

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run the linter.

### Server

- `npm start`: Start the production server.
- `npm run dev`: Start the development server with Nodemon.

## System Architecture

### High-Level Overview

```mermaid
graph LR
    A[Client] -->|HTTP/HTTPS| B[React Frontend]
    B -->|REST API| C[Node.js Backend]
    C -->|MongoDB| D[(MongoDB Database)]
    C -->|HTTPS| E[External APIs]
```

### Detailed Component Architecture

```mermaid
graph TD
    subgraph Frontend[Frontend]
        A[Components] --> B[Pages]
        B --> C[API Service]
    end
    
    subgraph Backend[Backend]
        D[Routes]
        E[Controllers]
        F[Models]
        D --> E
        E --> F
    end
    
    subgraph Database[Database]
        G[(Collections)]
    end
    
    C -->|REST API| D
    F -->|Mongoose| G
```

### Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend as React Frontend
    participant NGINX as NGINX Proxy
    participant Backend as Express Server
    participant DB as Database
    participant API as External API
    
    User->>Frontend: ① User Input
    Frontend->>Frontend: ② Process Input
    Frontend->>NGINX: ③ HTTP Request
    NGINX->>Backend: ④ Proxy Request
    Backend->>Backend: ⑤ Route Handler
    Backend->>Backend: ⑥ Process Request
    
    alt Data Required
        Backend->>DB: ⑦ Query Database
        DB-->>Backend: Data Result
    else External Data
        Backend->>API: ⑧ Call External API
        API-->>Backend: Movie Data
    end
    
    Backend-->>NGINX: ⑪ Response
    NGINX-->>Frontend: ⑫ Response
    Frontend-->>User: Display Data
```

### Deployment Architecture

```mermaid
graph TD
    subgraph DockerHost[Docker Host]
        subgraph Network[DBridge Network]
            NGINX[NGINX:80]
            React[React:5173]
            Node[Node.js:3000]
            MongoDB[(MongoDB:27017)]
            
            NGINX --> React
            NGINX --> Node
            Node --> MongoDB
        end
    end
```

### Component Relationships

```mermaid
flowchart LR
    Frontend[Frontend] -->|HTTP| NGINX[NGINX]
    NGINX -->|Proxy| Backend[Backend]
    Backend -->|Query| Database[(Database)]
    Backend -->|HTTPS| ExternalAPI[External API]
    Frontend <-->|JWT| Backend
    
    style Frontend fill:#f9f,stroke:#333
    style Backend fill:#bbf,stroke:#333
    style Database fill:#9f9,stroke:#333
    style ExternalAPI fill:#f96,stroke:#333
```

