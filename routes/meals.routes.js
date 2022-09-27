const express = require("express");

const mealsRouter = express.Router();

// Middlewares
const { mealExist } = require("../middlewares/meals.middlewares");
const {
  protectSession,
  protectUsersAccount,
  protectAdmin,
} = require("../middlewares/auth.middlewares");
const {
  createMealValidators,
} = require("../middlewares/validators.middlewares");

// Controllers
const {
  createMeal,
  getAllMeals,
  getMealbyId,
  updateMeal,
  deleteMeal,
} = require("../controllers/meals.controller");
const { cls } = require("sequelize");

mealsRouter.get("/", getAllMeals);

mealsRouter.get("/:id", mealExist, getMealbyId);

mealsRouter.use(protectSession);

mealsRouter.post("/:id", createMealValidators, createMeal);

mealsRouter.patch("/:id", protectAdmin, mealExist, updateMeal);

mealsRouter.delete("/:id", protectAdmin, mealExist, deleteMeal);

module.exports = { mealsRouter };
