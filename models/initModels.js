// Models

const { Meal } = require("./meal.model");
const { Order } = require("./oerder.model");
const { Restaurant } = require("./restaurant.model");
const { Review } = require("./review.model");
const { User } = require("./user.model");

const initModels = () => {
  Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
  Review.belongsTo(Restaurant);

  Restaurant.hasMany(Meal, { foreignKey: "restaurantId" });
  Meal.belongsTo(Restaurant);
};

Meal.hasOne(Order, { foreignKey: "mealId" });
Order.belongsTo(Meal);

module.exports = { initModels };
