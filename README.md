# Habit Tracker - Backend y Frontend

Este proyecto es una aplicación para gestionar hábitos, desarrollada con **Node.js, Express.js, MongoDB Atlas y Next.js**.

## 📂 Estructura del Proyecto
habit-tracker/ │── backend/ # Código del servidor con Express y MongoDB │── frontend/ # Interfaz de usuario con Next.js │── .env # Variables de entorno (no incluidas en Git) │── README.md # Instrucciones del proyecto


---

## 🚀 Instalación y Configuración

### 1️⃣ **Clonar el repositorio**
```sh
git clone https://github.com/Pachpoder/habit-tracker.git
cd habit-tracker
Backend (Node.js + Express)
Entrar en la carpeta del backend

sh
Copy
Edit
cd backend
Instalar dependencias

sh
Copy
Edit
npm install
Configurar las variables de entorno
Crea un archivo .env en backend/ y coloca tu cadena de conexión a MongoDB:

env
Copy
Edit
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/habit_tracker
PORT=5000
Iniciar el servidor

sh
Copy
Edit
npm run dev
🎨 Frontend (Next.js + Redux Toolkit)
Entrar en la carpeta del frontend

sh
Copy
Edit
cd ../frontend
Instalar dependencias

sh
Copy
Edit
npm install
Ejecutar el servidor Next.js

sh
Copy
Edit
npm run dev
Abrir la aplicación en el navegador

arduino
Copy
Edit
http://localhost:3000
🛠 Tecnologías Utilizadas
Backend: Node.js, Express.js, MongoDB Atlas, Mongoose.
Frontend: Next.js, Redux Toolkit, Axios.
Herramientas: Git, Postman, Visual Studio Code.