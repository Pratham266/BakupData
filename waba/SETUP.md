# 🚀 Waba Full-Stack Setup Guide

This document contains all the commands needed to set up and run the Waba full-stack application.

## 📋 Prerequisites

- **Node.js**: 20.19.0 or higher
- **npm**: 10.0.0 or higher
- **MongoDB**: 6.0 or higher (local or cloud instance)

## 🛠️ Complete Setup Commands

### 1. Frontend Setup

```bash
# Create Vite React TypeScript project
npm create vite@latest frontend -- --template react-ts

# Navigate to frontend directory
cd frontend

# Install base dependencies
npm install

# Install Tailwind CSS and related packages
npm install -D tailwindcss postcss autoprefixer @types/node

# Install Redux Toolkit and UI libraries
npm install @reduxjs/toolkit react-redux lucide-react class-variance-authority clsx tailwind-merge

# Create Tailwind config (already done in this project)
npx tailwindcss init -p
```

### 2. Backend Setup

```bash
# Navigate back to root
cd ..

# Create backend directory
mkdir backend
cd backend

# Initialize npm project
npm init -y

# Install production dependencies
npm install express cors helmet morgan dotenv mongoose

# Install development dependencies
npm install -D typescript @types/node @types/express @types/cors @types/morgan ts-node nodemon

# Create TypeScript config (already done in this project)
# tsconfig.json is already configured

# Create nodemon config (already done in this project)
# nodemon.json is already configured
```

### 3. Root Project Setup

```bash
# Navigate to root directory
cd ..

# Install root dependencies (concurrently for running both projects)
npm install
```

## 🚀 Running the Application

### Option 1: Using Root Scripts (Recommended)

```bash
# Install all dependencies for both projects
npm run install:all

# Start both frontend and backend simultaneously
npm run dev

# Or start them separately
npm run dev:frontend    # Frontend only
npm run dev:backend     # Backend only
```

### Option 2: Manual Startup

#### Terminal 1: Backend

```bash
cd backend
npm run dev
```

#### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

### Option 3: Using Startup Scripts

#### macOS/Linux

```bash
./start.sh
```

#### Windows

```bash
start.bat
```

## 🔧 Environment Configuration

### Backend Environment Setup

```bash
cd backend
cp env.example .env
```

Edit `.env` file:

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/waba
CORS_ORIGIN=http://localhost:5173
```

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB (macOS with Homebrew)

```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify it's running
brew services list | grep mongodb
```

### Option 2: Docker MongoDB

```bash
# Pull and run MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Check if it's running
docker ps | grep mongodb

# Stop MongoDB (when needed)
docker stop mongodb

# Remove container (when needed)
docker rm mongodb
```

### Option 3: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

## 📱 Available Scripts

### Root Project

```bash
npm run install:all      # Install all dependencies
npm run dev              # Start both servers
npm run dev:frontend     # Start frontend only
npm run dev:backend      # Start backend only
npm run build            # Build both projects
npm run clean            # Clean build directories
npm run lint             # Lint both projects
```

### Frontend

```bash
cd frontend
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

### Backend

```bash
cd backend
npm run dev              # Start development server
npm run build            # Build TypeScript
npm start                # Start production server
npm run clean            # Clean build directory
```

## 🌐 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **Backend Health**: http://localhost:5001/health
- **API Documentation**: http://localhost:5001/api

## 🧪 Testing the Setup

### 1. Test Backend Health

```bash
curl http://localhost:5001/health
```

Expected response:

```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### 2. Test API Health

```bash
curl http://localhost:5001/api/v1/health
```

### 3. Test Frontend

- Open http://localhost:5173 in your browser
- You should see the Waba app with a counter component
- Use the buttons to test Redux functionality

### 4. Test API Endpoints

```bash
# Create a user
curl -X POST http://localhost:5001/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Get all users
curl http://localhost:5001/api/v1/users
```

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   # Kill process on port 5001
   lsof -ti:5001 | xargs kill -9

   # Kill process on port 5173
   lsof -ti:5173 | xargs kill -9
   ```

2. **MongoDB connection failed**

   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Check MongoDB logs

3. **Dependencies not found**

   ```bash
   # Reinstall dependencies
   npm run install:all
   ```

4. **TypeScript compilation errors**
   ```bash
   # Clean and rebuild
   npm run clean
   npm run build
   ```

### Logs and Debugging

- **Frontend**: Check browser console and terminal
- **Backend**: Check terminal for server logs
- **MongoDB**: Check MongoDB logs or Docker logs

## 📚 Next Steps

1. **Customize the application**:

   - Modify components in `frontend/src/components/`
   - Add new API endpoints in `backend/src/routes/`
   - Create new models in `backend/src/models/`

2. **Add authentication**:

   - Implement JWT tokens
   - Add user login/logout
   - Secure protected routes

3. **Enhance the UI**:

   - Add more shadcn/ui components
   - Implement dark mode
   - Add animations

4. **Database operations**:
   - Add data seeding
   - Implement search functionality
   - Add pagination

## 🆘 Getting Help

- Check the individual project READMEs
- Review console logs for error messages
- Ensure all prerequisites are met
- Verify environment configuration
