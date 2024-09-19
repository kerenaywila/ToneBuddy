const Progress = require("../models/progressModel");

const createProgress = async (req, res) => {
  try {
    const { date, weight, bodyMeasurements } = req.body;

    const userId = req.user._id;

    const [day, month, year] = req.body.date.split("/");

    const formattedDate = new Date(`${year}-${month}-${day}`);

    const progress = new Progress({
      date: formattedDate,
      weight,
      bodyMeasurements,
      userId,
    });

    const newProgress = await progress.save();

    return res
      .status(200)
      .json({ message: "Successful", progress: newProgress });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const progressHistory = await Progress.find({ userId });

    if (!progressHistory) {
      return res.status(404).json({ message: "No Progress Found" });
    }

    return res
      .status(200)
      .json({ message: "Successful", progress: progressHistory });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;

    const { date, weight, bodyMeasurements } = req.body;

    const [day, month, year] = req.body.date.split("/");

    const formattedDate = new Date(`${year}-${month}-${day}`);

    const updatedProgress = await Progress.findByIdAndUpdate(
      id,
      { date: formattedDate, weight, bodyMeasurements },
      { new: true }
    );

    if (!updatedProgress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    return res
      .status(200)
      .json({ message: "Successful", progress: updatedProgress });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProgress = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProgress = await Progress.findByIdAndDelete(id);

    return res.status(200).json({ message: "Successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProgress,
  getProgress,
  updateProgress,
  deleteProgress,
};
