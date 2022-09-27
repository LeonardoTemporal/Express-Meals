const express = require("express");

const restaurantsRouter = express.Router();

// Middlewares
const { restaurantExist } = require("../middlewares/restaurants.middlewares");

const {
  protectSession,
  protectUsersAccount,
  protectAdmin,
} = require("../middlewares/auth.middlewares");

const {
  createRestaurantValidators,
} = require("../middlewares/validators.middlewares");

// Controllers

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  restaurantReview,
} = require("../controllers/restaurants.controller");

restaurantsRouter.get("/", getAllRestaurants);

restaurantsRouter.get("/:id", restaurantExist, getRestaurantById);

restaurantsRouter.use(protectSession);

restaurantsRouter.post("/", createRestaurantValidators, createRestaurant);

restaurantsRouter.patch(
  "/:id",
  protectAdmin,
  restaurantExist,
  updateRestaurant
);

restaurantsRouter.delete(
  "/:id",
  protectAdmin,
  restaurantExist,
  deleteRestaurant
);

restaurantsRouter.post("/reviews/:restaurantId", restaurantReview);

module.exports = { restaurantsRouter };
