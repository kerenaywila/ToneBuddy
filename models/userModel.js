const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, required: true },
    profile: {
      age: { type: Number },
      gender: { type: String },
      fitnessGoals: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Users = new mongoose.model("Users", authSchema);

module.exports = Users;
