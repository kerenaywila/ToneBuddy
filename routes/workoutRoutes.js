const express = require("express");
const { validateToken } = require("../middleware/validateAuth");
const { createWorkout, getWorkouts } = require("../controllers/workoutCtrl");
const { validateWorkout } = require("../middleware/validateWorkout");

const router = express.Router();

router.post("/create-workout", validateToken, validateWorkout, createWorkout);

router.get("/get-workouts", validateToken, getWorkouts);

module.exports = router;
