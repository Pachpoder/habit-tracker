require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Conectar a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Importar rutas
const habitRoutes = require("./routes/habitRoutes");
app.use("/api/habits", habitRoutes);

// Ruta raiz para verificar si el backend responde
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Manejo de rutas incorrectas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// 🔥 Código para mostrar rutas registradas en Express
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`✅ Ruta activa: ${r.route.path}`);
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
