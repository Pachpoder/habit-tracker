const express = require("express");
const Habit = require("../models/Habit");

const router = express.Router();

// Crear un nuevo hábito
router.post("/add", async (req, res) => {
    try {
        const { name, userId } = req.body;
        const habit = new Habit({ name, userId });
        await habit.save();
        res.status(201).json(habit);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el hábito" });
    }
});

// Obtener todos los hábitos de un usuario
router.get("/:userId", async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.params.userId });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los hábitos" });
    }
});

// Actualizar un hábito
router.put("/:id", async (req, res) => {
    try {
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
        res.status(500).json({ error: "Error al actualizar el hábito" });
    }
});

// Eliminar un hábito
router.delete("/:id", async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);
        res.json({ message: "Hábito eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el hábito" });
    }
});

module.exports = router;
