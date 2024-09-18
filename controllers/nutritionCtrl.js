const MealPlans = require("../models/mealplanModel");

const createMeal = async (req, res) => {
  try {
    const { mealName, ingredients, calories, proteins, carbs, fats } = req.body;

    const userId = req.user._id;

    const meal = new MealPlans({
      mealName,
      ingredients,
      calories,
      proteins,
      carbs,
      fats,
      userId,
    });

    const newMeal = await meal.save();

    return res.status(200).json({ message: "Successful", meal: newMeal });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMeal = async (req, res) => {
  try {
    const userId = req.user._id;

    const mealHistory = await MealPlans.find({ userId });

    if (!mealHistory) {
      return res.status(404).json({ message: "No Meal Plan Found" });
    }

    return res.status(200).json({
      message: "Successful",
      mealplan: mealHistory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateMeal = async (req, res) => {
  try {
    const { id } = req.params;

    const { mealName, ingredients, calories, proteins, carbs, fats } = req.body;

    const updatedMeal = await MealPlans.findByIdAndUpdate(
      id,
      { mealName, ingredients, calories, proteins, carbs, fats },
      { new: true }
    );

    if (!updatedMeal) {
      return res.status(404).json({ message: "Meal Plan not found" });
    }

    return res
      .status(200)
      .json({ message: "Successful", updatedmeal: updatedMeal });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMeal = await MealPlans.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Successful",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMeal,
  getMeal,
  updateMeal,
  deleteMeal,
};
