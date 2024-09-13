const Workouts = require("../models/workoutModel");
const Exercises = require("../models/exerciseModel");

const createWorkout = async (req, res) => {
  try {
    const { workoutName, exercises, duration, date } = req.body;

    const userId = req.user._id;

    const savedExercises = await Promise.all(
      exercises.map(async (exercise) => {
        try {
          const newExercise = new Exercises({ ...exercise, userId });
          return await newExercise.save();
        } catch (error) {
          return res.status(500).json({
            message: `Error saving exercise "${exercise.name}": ${error.message}`,
          });
        }
      })
    );

    const exerciseIds = savedExercises.map((exercise) => exercise._id);

    const workout = new Workouts({
      workoutName,
      duration,
      date,
      exercises: exerciseIds,
      userId,
    });

    const savedWorkout = await workout.save();

    const populatedWorkout = await Workouts.findById(savedWorkout._id).populate(
      "exercises"
    );

    res.status(200).json({
      message: "Successful",
      workout: populatedWorkout,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const userId = req.user._id;

    const workoutHistory = await Workouts.find({ userId });

    console.log("Query result:", workoutHistory);

    if (!workoutHistory) {
      return res.status(404).json({ message: "No Workout Found" });
    }

    return res.status(200).json({
      message: "Successful",
      workouts: workoutHistory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
};
