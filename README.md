# Multilang API

A robust Node.js/TypeScript REST API with user authentication, built with Express.js and Prisma ORM. This API provides a solid foundation for multilingual applications with comprehensive security features and development tools.

## 🚀 Features

- **User Authentication**: Complete auth system with registration, login, and JWT token refresh
- **Database**: SQLite database with Prisma ORM for type-safe database operations
- **Security**: JWT authentication, rate limiting, CORS, helmet security headers
- **API Documentation**: Swagger/OpenAPI documentation with interactive UI
- **File Upload**: Multer integration for handling file uploads
- **Validation**: Joi schema validation for request data
- **Logging**: Winston logger for comprehensive application logging
- **Development Tools**: TypeScript, ESLint, Prettier for code quality
- **Docker Support**: Docker Compose for easy development environment setup

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker (optional, for containerized development)

## 🛠️ Installation

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/Uchaneishvili/multilang-auth-api.git
   cd multilang-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:

   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-jwt-secret-key"
   JWT_REFRESH_SECRET="your-refresh-secret-key"
   PORT=8000
   HOST=localhost
   NODE_ENV=development

   # Rate limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100

   # CORS
   CORS_ORIGIN=http://localhost:8000
   CORS_CREDENTIALS=true
   ```

4. **Set up the database**

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

### Docker Development

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up
   ```

This will automatically install dependencies, set up the database, and start the development server.

## 🏗️ Project Structure

```
multilang-api/
├── src/
│   ├── config/           # Database and configuration setup
│   ├── controllers/      # Request handlers
│   ├── enums/           # TypeScript enums
│   ├── exceptions/      # Custom error classes
│   ├── middlewares/     # Express middlewares
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic layer
│   ├── swagger-routes/  # Swagger documentation routes
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── validations/     # Joi validation schemas
│   ├── index.ts         # Application entry point
│   └── swagger.ts       # Swagger configuration
├── prisma/
│   ├── migrations/      # Database migrations
│   ├── schema.prisma    # Database schema
│   └── dev.db          # SQLite database file
├── uploads/             # File upload directory
├── dist/               # Compiled JavaScript output
└── docker-compose.yml  # Docker configuration
```

## 🔗 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh/token` - Refresh access token

### System

- `GET /health` - Health check endpoint
- `GET /api-docs` - Swagger API documentation

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:

- **Swagger UI**: `http://localhost:8000/api-docs`

## 🧪 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate Prisma client
npm run db:migrate      # Run database migrations
npm run db:deploy       # Deploy migrations to production
npm run db:reset        # Reset database
npm run db:seed         # Seed database with initial data
npm run db:studio       # Open Prisma Studio

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting
npm run type-check      # Run TypeScript type checking
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protects against brute force attacks
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers for Express.js
- **Input Validation**: Joi schema validation for all inputs
- **Password Hashing**: bcrypt for secure password storage

## 🛡️ Error Handling

The API includes comprehensive error handling with:

- Global error handler middleware
- Custom exception classes
- Structured error responses
- Request validation errors
- Database constraint errors

## 🚀 Deployment

### Production Build

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Set up production environment variables**

   ```bash
   NODE_ENV=production
   DATABASE_URL="your-production-database-url"
   # ... other production variables
   ```

3. **Deploy database migrations**

   ```bash
   npm run db:deploy
   ```

4. **Start the production server**
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🛠️ Built With

- **Node.js** - Runtime environment
- **TypeScript** - Programming language
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **SQLite** - Database
- **JWT** - Authentication
- **Swagger** - API documentation
- **Winston** - Logging
- **Joi** - Validation
- **Docker** - Containerization
