const mongoose = require("mongoose");
const Workouts = require("../models/workoutModel");
const Exercises = require("../models/exerciseModel");

const validateWorkout = async (req, res, next) => {
  const { workoutName, exercises, duration, date } = req.body;

  const errors = [];

  if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
    errors.push("Please enter at least one exercise");
  } else {
    
    exercises.forEach((exercise, index) => {
      if (!exercise.name) {
        errors.push(`Exercise ${index + 1}: Please enter the exercise name`);
      }
      if (!exercise.type) {
        errors.push(`Exercise ${index + 1}: Please enter type of exercise`);
      }
      if (!exercise.duration) {
        errors.push(`Exercise ${index + 1}: Please enter the duration`);
      }
      if (!exercise.caloriesBurned) {
        errors.push(`Exercise ${index + 1}: Please enter the calories burned`);
      }
    });
  }

  if (!workoutName) {
    errors.push("Please enter a workout name");
  }
  if (!exercises) {
    errors.push("Please enter exercises");
  }
  if (!duration) {
    errors.push("Please enter the duration");
  }
  if (!date) {
    errors.push("Please enter the date");
  }
  if (errors.length > 0) {
    return res.status(404).json({
      message: errors,
    });
  }

  next();
};

module.exports = {
  validateWorkout
};
