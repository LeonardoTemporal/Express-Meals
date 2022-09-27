const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });

  res.status(201).json({
    status: "success",
    data: { newMeal },
  });
});

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: { status: "active" },
    include: [{ model: Restaurant }],
  });

  res.status(200).json({
    status: "success",
    data: { meals },
  });
});

const getMealbyId = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  meal.update({ status: "deleted" });

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  createMeal,
  getAllMeals,
  getMealbyId,
  updateMeal,
  deleteMeal,
};
