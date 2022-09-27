const { Order } = require("../models/oerder.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ where: { id, status: "active" } });

  if (!order) {
    next(new AppError("Order not found", 404));
  }

  req.order = order;
  next();
});

module.exports = { orderExist };
