// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import expressWinston from "express-winston";
import { logger } from "./utils/logger";
import nekoboccRoutes from "./routes/nekobocc";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    msg: (req, res: any) =>
      `${req.method} ${req.url} ${res.statusCode} - ${res.responseTime}ms`,
    colorize: true,
  })
);

// Routes
app.use("/api", nekoboccRoutes);

app.get("/", (req: Request, res: Response) => {
  const info = {
    status: "success",
    message: "Nekopoi API is running 🚀",
    version: "1.0.0",
    routes: {
      release: "/api/release?page=1",
      search: "/api/search?query=",
      get: "/api/get?url=",
      random: "/api/random",
      genres: "/api/genres"
    }
  };

  res.json(info);
  logger.success(`🚀 Server running at http://${HOST}:${PORT}`);
});


// Error Logger
app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);

app.listen(Number(PORT), HOST, () => {
  logger.info(`🚀 Server running at http://${HOST}:${PORT}`);
});
