import express, { Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 8080;

// Default port for vite is 5173
const fePort = process.env.FRONTEND_PORT ?? 5173;

const corsOptions = {
  origin: [`http://localhost:${fePort}`],
};

app.use(cors(corsOptions));

app.get("/", (_: Request, res: Response) => {
  res.send("Server is working.");
});

app.listen(port, () => {
  console.log(`Server is listening at https://localhost:${port}...`);
});
