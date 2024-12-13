import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import router from "./routes/userRoutes.js";
import matchRouter from "./routes/matchRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import googleRouter from "./routes/googleRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://crick-zone.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(helmet());

app.get("/",(req, res) => {
  res.send("Hello, Backend of crickzone")
})

app.use("/api", router);
app.use("/match", matchRouter);
app.use("/api2", googleRouter);
export { app };
