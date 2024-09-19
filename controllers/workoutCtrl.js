const Workouts = require("../models/workoutModel");
const Exercises = require("../models/exerciseModel");

const createWorkout = async (req, res) => {
  try {
    const { workoutName, exercises, duration, date } = req.body;

    const userId = req.user._id;

    const [day, month, year] = req.body.date.split("/");

    const formattedDate = new Date(`${year}-${month}-${day}`);

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
      date: formattedDate,
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

const getWorkout = async (req, res) => {
  try {
    const userId = req.user._id;

    const workoutHistory = await Workouts.find({ userId }).populate(
      "exercises"
    );

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

const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { workoutName, exercises, duration, date } = req.body;

    const userId = req.user._id;

    const [day, month, year] = req.body.date.split("/");

    const formattedDate = new Date(`${year}-${month}-${day}`);

    const savedExercises = await Promise.all(
      exercises.map(async (exercise) => {
        if (exercise._id) {
          return await Exercises.findByIdAndUpdate(exercise._id, exercise, {
            new: true,
          });
        } else {
          const newExercise = new Exercises({ ...exercise, userId });
          return await newExercise.save();
        }
      })
    );

    const exerciseIds = savedExercises.map((exercise) => exercise._id);

    const updatedWorkout = await Workouts.findByIdAndUpdate(
      id,
      { workoutName, exercises: exerciseIds, duration, date: formattedDate },
      { new: true }
    ).populate("exercises");

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    return res.status(200).json({
      message: "Succesful",
      workout: updatedWorkout,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await Workouts.findById(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.exercises.length > 0) {
      await Exercises.deleteMany({ _id: { $in: workout.exercises } });
    }

    await Workouts.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Successful",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
};
