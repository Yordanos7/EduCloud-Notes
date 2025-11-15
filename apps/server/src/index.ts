import "dotenv/config";
import cors from "cors";
import express from "express";
import { auth } from "@EduCloud-Notes/auth";
import { toNodeHandler } from "better-auth/node";

const app = express();

console.log("CORS_ORIGIN from .env:", process.env.CORS_ORIGIN);
console.log(
  "BETTER_AUTH_SECRET from .env:",
  process.env.BETTER_AUTH_SECRET ? "Loaded" : "Not Loaded"
);
console.log(
  "DATABASE_URL from .env:",
  process.env.DATABASE_URL ? "Loaded" : "Not Loaded"
);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/api/auth",
  (req, res, next) => {
    console.log("Incoming request to /api/auth:");
    console.log("  req.url:", req.url);
    console.log("  req.originalUrl:", req.originalUrl);
    next(); // Pass control to the next middleware
  },
  toNodeHandler(auth)
);

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
