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

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (for database)

## Getting Started

### 1. Clone the repository

 
git clone https://github.com/yourusername/movie-explorer.git
cd movie-explorer

### 2. Set up the Backend

1. Navigate to the server directory:
    
   cd server

2. Install dependencies:
    
   npm install

3. Create a `.env` file in the server directory with the following variables:
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   TMDB_API_KEY=your_tmdb_api_key
   NODE_ENV=development

4. Start the development server:
    
   npm run dev
   The server will be running at `http://localhost:5000`

### 3. Set up the Frontend

1. Open a new terminal and navigate to the client directory:
    
   cd ../client

2. Install dependencies:
    
   npm install

3. Start the development server:
    
   npm run dev
   The React app will be running at `http://localhost:5173`

## Project Structure

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

## Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

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

## Environment Variables

## Environment Variables

### Server (.env)
- `PORT` - Port to run the server on (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT authentication
- `TMDB_API_KEY` - API key for The Movie Database (TMDb)
- `NODE_ENV` - Application environment (development/production)

