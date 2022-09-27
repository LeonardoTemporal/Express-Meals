const { Order } = require("../models/oerder.model");
const { Meal } = require("../models/meal.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");
const { Restaurant } = require("../models/restaurant.model");

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({ where: { id: mealId, status: "active" } });

  if (!meal) {
    next(new AppError("Meal not found", 404));
  }

  let price = meal.price * quantity;

  const newOrder = await Order.create({
    mealId,
    quantity,
    userId: sessionUser.id,
    totalPrice: price,
  });

  res.status(201).json({
    status: "success",
    data: { newOrder },
  });
});

const getOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: { userId: sessionUser.id },
    include: [{ model: Meal, include: { model: Restaurant } }],
  });

  res.status(200).json({
    status: "success",
    data: { orders },
  });
});

const completeOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "completed" });

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const cancellOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "cancelled" });

  res.status(204).json({
    status: "success",
  });
});

module.exports = { createOrder, getOrders, completeOrder, cancellOrder };
