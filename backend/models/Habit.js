const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  completedDays: { type: Number, default: 0 },
  lastCompleted: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Habit", HabitSchema);
