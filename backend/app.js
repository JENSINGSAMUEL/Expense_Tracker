import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";

// Load environment variables
dotenv.config();
const app = express();
const port = 5000;

// Connect to the database
connectDB();

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://main.d1sj7cd70hlter.amplifyapp.com",
  "https://expense-tracker-app-three-beryl.vercel.app",
  // Add more origins as needed
];

// Middleware

// Dynamic CORS origin checking
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Additional security and parsing middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Custom middleware to set CORS headers for all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");  // In production, replace "*" with your frontend domain
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Routes
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

// Default route for testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});
 
// Start server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
