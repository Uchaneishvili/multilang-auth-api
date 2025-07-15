import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { testDbConnection } from "./config/db-setup";

const app = express();
const port = process.env.PORT || 8000;

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"), // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:8000"],
  credentials: process.env.CORS_CREDENTIALS === "true",
  optionsSuccessStatus: 200,
};

// Middleware
app.use(limiter);
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Global error handler

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

app.listen(port, async () => {
  try {
    console.log(
      `🚀 Server started on ${process.env.HOST || "localhost"}:${port}`
    );
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(
      `🔗 API Base URL: ${process.env.API_PREFIX || "/api"}/${
        process.env.API_VERSION || "v1"
      }`
    );

    // Test database connection
    await testDbConnection();
  } catch (err) {
    console.error("❌ Server startup error:", err);
    process.exit(1);
  }
});

export default app;
