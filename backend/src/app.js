import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import router from "./routes/userRoutes.js";
import matchRouter from "./routes/matchRoutes.js";
import path from "path"; // Import Path module for file paths
import { fileURLToPath } from "url"; // To resolve the __dirname
import googleRouter from "./routes/googleRoutes.js";

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(helmet());

app.use("/api", router);
app.use("/match", matchRouter);
app.use("/api2", googleRouter);
export { app };
