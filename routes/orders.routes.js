const express = require("express");

const orderRouter = express.Router();

const {
  protectSession,
  protectUsersAccount,
  protectAdmin,
} = require("../middlewares/auth.middlewares");
const { orderExist } = require("../middlewares/orders.middleware");

const {
  createOrder,
  getOrders,
  completeOrder,
  cancellOrder,
} = require("../controllers/orders.controller");

orderRouter.use(protectSession);

orderRouter.post("/", createOrder);

orderRouter.get("/me", getOrders);

orderRouter.patch("/:id", orderExist, completeOrder);

orderRouter.delete("/:id", orderExist, cancellOrder);

module.exports = { orderRouter };
