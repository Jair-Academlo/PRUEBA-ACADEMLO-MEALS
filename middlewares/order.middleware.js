//Models
const { Meal } = require('../models/meal.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');

//Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const orderExist = catchAsync(async function (req, _res, next) {
  const { id } = req.params;

  const order = await Order.findOne({
    where: { id },
    include: {
      model: Meal,
      include: {
        model: Restaurant,
      },
    },
  });

  if (!order) {
    return next(new AppError('Orden no encontrada', 404));
  }

  req.user = user;
  next();
});

module.exports = { orderExist };
