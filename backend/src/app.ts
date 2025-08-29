import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import appRouter from "./routes/index.js";

config(); // load .env

const app = express();

// -------------------- MIDDLEWARES --------------------

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",                  // local dev
      "http://localhost:5174",                  // another local dev port
      "https://ai-chat-bot-6.onrender.com"     // deployed frontend
      // OR: process.env.FRONTEND_URL if you prefer env variable
    ],
    credentials: true,
  })
);

// JSON parser
app.use(express.json());

// Cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Logger (remove in production)
app.use(morgan("dev"));

// -------------------- ROUTES --------------------
app.use("/api/v1", appRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// -------------------- START SERVER --------------------


export default app;


