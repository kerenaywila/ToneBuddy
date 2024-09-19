const express = require("express");
const { validateToken } = require("../middleware/validateAuth");
const {
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutCtrl");
const { validateWorkout } = require("../middleware/validations");

const router = express.Router();

router.post("/create-workout", validateToken, validateWorkout, createWorkout);

router.get("/find-workout", validateToken, getWorkout);

router.put("/update-workout/:id", validateToken, updateWorkout);

router.delete("/delete-workout/:id", validateToken, deleteWorkout);

module.exports = router;
