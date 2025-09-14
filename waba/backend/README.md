# Backend - Waba Full-Stack App

A Node.js Express backend built with TypeScript, MongoDB, and modern development practices.

## Features

- 🚀 **Express.js** - Fast, unopinionated web framework
- 🔷 **TypeScript** - Type-safe development
- 🗄️ **MongoDB** - NoSQL database with Mongoose ODM
- 🛡️ **Security** - Helmet, CORS, and input validation
- 📊 **Logging** - Morgan HTTP request logger
- 🔄 **Auto-reload** - Nodemon for development
- 🏗️ **MVC Architecture** - Clean separation of concerns
- 📝 **API Documentation** - RESTful API endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Development**: Nodemon, ts-node

## Prerequisites

- Node.js 18.0.0 or higher
- MongoDB 6.0 or higher (local or cloud instance)
- npm 9.0.0 or higher

## Getting Started

### 1. Environment Setup

Copy the environment example file and configure your variables:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/waba
CORS_ORIGIN=http://localhost:5173
```

### 2. Installation

```bash
npm install
```

### 3. Database Setup

Ensure MongoDB is running locally or update the connection string in `.env`:

```bash
# Start MongoDB locally (macOS with Homebrew)
brew services start mongodb-community

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Development

```bash
npm run dev
```

The server will start on `http://localhost:5001`

### 5. Production Build

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Clean build directory

## Project Structure

```
src/
├── config/           # Configuration files
│   └── database.ts  # MongoDB connection
├── controllers/      # Route controllers
│   ├── UserController.ts
│   └── ItemController.ts
├── middleware/       # Custom middleware
│   ├── errorHandler.ts
│   └── notFound.ts
├── models/          # Mongoose models
│   ├── User.ts
│   └── Item.ts
├── routes/          # API routes
│   ├── index.ts
│   ├── userRoutes.ts
│   └── itemRoutes.ts
├── types/           # TypeScript types
│   └── index.ts
├── utils/           # Utility functions
└── index.ts         # Main server file
```

## API Endpoints

### Health Check

- `GET /health` - Server health status
- `GET /api/v1/health` - API health status

### Users

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create new user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user (soft delete)

### Items

- `GET /api/v1/items` - Get all items (with pagination)
- `GET /api/v1/items/:id` - Get item by ID
- `POST /api/v1/items` - Create new item
- `PUT /api/v1/items/:id` - Update item
- `DELETE /api/v1/items/:id` - Delete item

## Database Models

### User Model

- `name`: String (required, 2-50 chars)
- `email`: String (required, unique, validated)
- `password`: String (required, min 6 chars)
- `role`: Enum ['user', 'admin'] (default: 'user')
- `isActive`: Boolean (default: true)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

### Item Model

- `name`: String (required, 2-100 chars)
- `description`: String (required, max 500 chars)
- `price`: Number (required, non-negative)
- `category`: Enum ['electronics', 'clothing', 'books', 'home', 'sports', 'other']
- `isAvailable`: Boolean (default: true)
- `createdBy`: ObjectId (reference to User)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Validation errors
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server errors
- **Custom Error Messages** - Descriptive error responses

## Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Input Validation** - Request body validation
- **Error Sanitization** - Stack traces only in development

## Development Features

- **TypeScript** - Full type safety
- **Hot Reload** - Automatic server restart
- **Source Maps** - Debug TypeScript directly
- **ESLint** - Code quality enforcement

## API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "count": 10,
  "total": 100,
  "page": 1,
  "pages": 10
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "message": "Error description"
  }
}
```

## Testing the API

### Using curl

```bash
# Health check
curl http://localhost:5001/health

# Get all users
curl http://localhost:5001/api/v1/users

# Create a user
curl -X POST http://localhost:5001/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Using Postman

Import the collection or test individual endpoints with the base URL: `http://localhost:5001`

## Deployment

### Environment Variables

Set production environment variables:

```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb://your-production-db
CORS_ORIGIN=https://your-frontend-domain.com
```

### Build and Start

```bash
npm run build
npm start
```

## Contributing

1. Follow TypeScript best practices
2. Use proper error handling
3. Add input validation
4. Follow the established API patterns
5. Test your endpoints

## License

This project is part of the Waba full-stack application.
