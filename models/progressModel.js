const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, default: Date.now },
  weight: { type: Number, required: true },
  bodyMeasurements: {
    chest: { type: Number },
    waist: { type: Number },
    arms: { type: Number },
    legs: { type: Number },
  },
});

const Progress = new mongoose.model("Progress", progressSchema);

module.exports = Progress;
