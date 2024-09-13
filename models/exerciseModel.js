const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, require: true },
    type: { type: String, require: true },
    duration: { type: Number, require: true },
    caloriesBurned: { type: Number, require: true },
  },
  { timestamps: true }
);

const Exercises = new mongoose.model("Exercises", exerciseSchema);

module.exports = Exercises;
