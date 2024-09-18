const express = require("express");
const { validateToken } = require("../middleware/validateAuth");
const { validateNutrition } = require("../middleware/validations");
const {
  createMeal,
  getMeal,
  updateMeal,
  deleteMeal,
} = require("../controllers/nutritionCtrl");

const router = express.Router();

router.post("/create-meal", validateToken, validateNutrition, createMeal);

router.get("/find-meal", validateToken, getMeal);

router.put("/update-meal/:id", validateToken, validateNutrition, updateMeal);

router.delete("/delete-meal/:id", validateToken, deleteMeal);

module.exports = router;
