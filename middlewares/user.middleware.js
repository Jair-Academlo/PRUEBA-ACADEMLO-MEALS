const { User } = require('../models/user.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const userExist = catchAsync(async function (req, _res, next) {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError('ID no existe. no encontrado', 404));
  }

  req.user = user;
  next();
});

module.exports = { userExist };
