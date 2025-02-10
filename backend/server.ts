import express, { Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

import pollRoutes from "./routes/pollRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 8080;

// Default port for vite is 5173
const fePort = process.env.FRONTEND_PORT ?? 5173;

const corsOptions = {
  origin: [`http://localhost:${fePort}`],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api", (_: Request, res: Response) => {
  res.send("Server is working.");
});

app.use("/api/poll", pollRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is listening at https://localhost:${port}...`);
  });
}

export default app;
