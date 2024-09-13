const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    workoutName: { type: String, require: true },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercises" }],
    duration: { type: Number, require: true },
    date: { type: Date, require: true },
  },
  { timestamps: true }
);

const Workouts = new mongoose.model("Workouts", workoutSchema);

module.exports = Workouts;
