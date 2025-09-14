#!/bin/bash

echo "🚀 Starting Waba Full-Stack Application..."
echo ""

# Check if MongoDB is running
echo "📊 Checking MongoDB connection..."
if ! curl -s http://localhost:27017 > /dev/null 2>&1; then
    echo "⚠️  MongoDB is not running on localhost:27017"
    echo "   Please start MongoDB first:"
    echo "   - macOS: brew services start mongodb-community"
    echo "   - Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest"
    echo "   - Or update MONGODB_URI in backend/.env"
    echo ""
fi

# Check if .env file exists in backend
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend environment file not found"
    echo "   Please copy env.example to .env in the backend directory:"
    echo "   cd backend && cp env.example .env"
    echo "   Then edit .env with your MongoDB connection string"
    echo ""
fi

echo "🔧 Starting development servers..."
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5001"
echo ""

# Start both servers using npm script
npm run dev 