import cors from "cors";
import express from "express";
import usersRouter from './routes/users.routes.js'

const app = express();

// Middleware para parsear JSON
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Ruta principal test
app.get("/", (_req, res) => {
  res.send("API Ready to use");
});

app.use("/api", usersRouter);

export default app;