# Waba Full-Stack Application

A modern full-stack web application built with React, Node.js, TypeScript, and MongoDB.

## 🚀 Project Overview

This is a full-stack application consisting of:

- **Frontend**: React 19 + Vite + TypeScript + Tailwind CSS + shadcn/ui + Redux Toolkit
- **Backend**: Node.js + Express + TypeScript + MongoDB + Mongoose

## 📁 Project Structure

```
waba/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
└── README.md          # This file
```

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Redux Toolkit
- **Package Manager**: npm

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Security**: Helmet, CORS
- **Logging**: Morgan

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 20.19.0 or higher
- **npm**: 10.0.0 or higher
- **MongoDB**: 6.0 or higher (local or cloud instance)

### 1. Clone and Setup

```bash
# Navigate to project directory
cd waba

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Environment Configuration

#### Backend Environment

```bash
cd backend
cp env.example .env
```

Edit `.env` with your MongoDB connection:

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/waba
CORS_ORIGIN=http://localhost:5173
```

### 3. Start MongoDB

#### Option 1: Local MongoDB

```bash
# macOS with Homebrew
brew services start mongodb-community

# Or start manually
mongod --dbpath /usr/local/var/mongodb
```

#### Option 2: Docker

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Run the Application

#### Terminal 1: Backend

```bash
cd backend
npm run dev
```

Backend will start on: `http://localhost:5001`

#### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Frontend will start on: `http://localhost:5173`

## 📱 Available Scripts

### Frontend

```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend

```bash
cd backend
npm run dev      # Start development server with auto-reload
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
npm run clean    # Clean build directory
```

## 🌐 API Endpoints

The backend provides a RESTful API at `http://localhost:5001/api/v1/`

### Health Check

- `GET /health` - Server status
- `GET /api/v1/health` - API status

### Users

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Items

- `GET /api/v1/items` - Get all items (with pagination)
- `GET /api/v1/items/:id` - Get item by ID
- `POST /api/v1/items` - Create item
- `PUT /api/v1/items/:id` - Update item
- `DELETE /api/v1/items/:id` - Delete item

## 🔧 Development

### Frontend Development

- Hot Module Replacement (HMR) enabled
- TypeScript compilation with Vite
- Tailwind CSS with JIT compilation
- Redux DevTools integration
- ESLint configuration

### Backend Development

- TypeScript compilation with ts-node
- Auto-reload with nodemon
- MongoDB connection with Mongoose
- Comprehensive error handling
- Request logging with Morgan

### Database

- MongoDB with Mongoose ODM
- Schema validation
- Indexes for performance
- Soft delete support
- Population for related data

## 🧪 Testing the Application

### Frontend

1. Open `http://localhost:5173` in your browser
2. The app displays a counter component demonstrating Redux
3. Use the buttons to increment/decrement the counter
4. Check Redux DevTools for state changes

### Backend

1. Test health endpoint: `curl http://localhost:5001/health`
2. Test API health: `curl http://localhost:5001/api/v1/health`
3. Create a user:
   ```bash
   curl -X POST http://localhost:5001/api/v1/users \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
   ```

## 📦 Production Build

### Frontend

```bash
cd frontend
npm run build
# Output will be in dist/ directory
```

### Backend

```bash
cd backend
npm run build
npm start
# Server will run from dist/ directory
```

## 🔒 Security Features

- **Frontend**: CSP headers, secure dependencies
- **Backend**: Helmet security headers, CORS configuration, input validation
- **Database**: Schema validation, sanitized queries

## 🚀 Deployment

### Frontend

- Build the project: `npm run build`
- Deploy the `dist/` folder to your hosting service
- Configure environment variables for production

### Backend

- Build the project: `npm run build`
- Set production environment variables
- Deploy to your server or cloud platform
- Ensure MongoDB is accessible

## 🤝 Contributing

1. Follow the established code patterns
2. Use TypeScript for all new code
3. Follow the component structure
4. Ensure proper error handling
5. Test your changes thoroughly

## 📚 Additional Resources

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

## 📄 License

This project is part of the Waba full-stack application.

## 🆘 Support

If you encounter any issues:

1. Check the individual project READMEs
2. Ensure all dependencies are installed
3. Verify MongoDB is running
4. Check environment variable configuration
5. Review the console logs for error messages
