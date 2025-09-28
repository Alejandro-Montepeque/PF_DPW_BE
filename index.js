import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./src/app.js";


const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DBNAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Conectado a MongoDB Atlas con Mongoose");

    // Middleware de logging para debug
    app.use((req, res, next) => {
      console.log("Petición recibida:", req.method, req.originalUrl);
      next();
    });

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("Error conectando a MongoDB:", err.message);
  }
}

startServer();
