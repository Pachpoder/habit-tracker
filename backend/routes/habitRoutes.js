const express = require("express");
const Habit = require("../models/Habit");
const mongoose = require("mongoose");

const router = express.Router();

// Crear un nuevo hábito
router.post("/add", async (req, res) => {
    try {
        const { name, userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "El userId no es válido" });
        }

        const habit = new Habit({ name, userId: new mongoose.Types.ObjectId(userId) });
        await habit.save();
        res.status(201).json(habit);
    } catch (error) {
        console.error("❌ Error al crear el hábito:", error);
        res.status(500).json({ error: "Error al crear el hábito" });
    }
});

// Obtener todos los hábitos (sin filtrar por usuario)
router.get("/", async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (error) {
        console.error("❌ Error al obtener todos los hábitos:", error);
        res.status(500).json({ error: "Error al obtener los hábitos" });
    }
});

// Obtener todos los hábitos de un usuario
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Validar que el userId sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "El userId no es válido" });
        }

        console.log(`✅ Buscando hábitos del usuario con ID: ${userId}`);

        const habits = await Habit.find({ userId: new mongoose.Types.ObjectId(userId) });

        if (!habits.length) {
            return res.status(404).json({ message: "No se encontraron hábitos para este usuario." });
        }

        res.json(habits);
    } catch (error) {
        console.error("❌ Error al obtener los hábitos:", error);
        res.status(500).json({ error: "Error al obtener los hábitos" });
    }
});

// Obtener un hábito por ID
router.get("/habit/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "El ID del hábito no es válido" });
        }

        const habit = await Habit.findById(req.params.id);
        if (!habit) {
            return res.status(404).json({ error: "Hábito no encontrado" });
        }

        res.json(habit);
    } catch (error) {
        console.error("❌ Error al obtener el hábito:", error);
        res.status(500).json({ error: "Error al obtener el hábito" });
    }
});

// Actualizar un hábito
router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "El ID del hábito no es válido" });
        }

        const habit = await Habit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!habit) {
            return res.status(404).json({ error: "Hábito no encontrado" });
        }

        res.json(habit);
    } catch (error) {
        console.error("❌ Error al actualizar el hábito:", error);
        res.status(500).json({ error: "Error al actualizar el hábito" });
    }
});

// Eliminar un hábito
router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "El ID del hábito no es válido" });
        }

        const habit = await Habit.findByIdAndDelete(req.params.id);
        if (!habit) {
            return res.status(404).json({ error: "Hábito no encontrado" });
        }

        res.json({ message: "Hábito eliminado" });
    } catch (error) {
        console.error("❌ Error al eliminar el hábito:", error);
        res.status(500).json({ error: "Error al eliminar el hábito" });
    }
});

module.exports = router;
