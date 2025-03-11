# Habit Tracker API

API para gestionar hábitos, desarrollada con **Node.js, Express.js y MongoDB Atlas**.

## Instalación

1. **Clonar el repositorio**:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd habit-tracker
   ```

2. **Instalar dependencias**:
   ```sh
   npm install
   ```

3. **Configurar variables de entorno**:
   - Crear un archivo `.env` y agregar:
     ```
     MONGO_URI=mongodb+srv://<usuario>:<password>@habittracker.mongodb.net/habit_tracker?retryWrites=true&w=majority
     PORT=5000
     ```

4. **Ejecutar el servidor**:
   ```sh
   npm run dev
   ```

## Endpoints de la API

### Crear un hábito (POST)
- **URL:** `http://localhost:5000/api/habits/add`
- **Body:**
  ```json
  {
    "name": "Ejercicio diario",
    "userId": "65e4a0f2e38c5c001c6e9f12"
  }
  ```

### Obtener hábitos de un usuario (GET)
- **URL:** `http://localhost:5000/api/habits/:userId`

### Actualizar un hábito (PUT)
- **URL:** `http://localhost:5000/api/habits/:id`
- **Body:**
  ```json
  {
    "completedDays": 5
  }
  ```

### Eliminar un hábito (DELETE)
- **URL:** `http://localhost:5000/api/habits/:id`

## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

**Proyecto para la universidad - Habit Tracker API**