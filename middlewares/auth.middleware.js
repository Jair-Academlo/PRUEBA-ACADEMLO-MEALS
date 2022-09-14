const { User } = require('../models/user.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { ADMIN_ROLE } = require('../utils/roles/roles');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config.env' });

const protecSession = catchAsync(async function (req, _res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AppError('token invalido', 403));
  }

  const token = authorization.split(' ')[1];

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decode.id, status: 'active' },
  });

  if (!user) {
    return next(new AppError('El propietario de esta cuenta no existe', 403));
  }

  req.sessionUser = user;
  next();
});

const protegerCuenta = catchAsync(async function (req, _res, next) {
  const { sessionUser, user } = req;

  if (sessionUser.id !== user.id) {
    return next(new AppError('Tu no eres el propietario de esta cuenta', 404));
  }

  next();
});

const validarAdministrador = catchAsync(async function (req, _res, next) {
  const { sessionUser } = req;

  if (sessionUser.role !== ADMIN_ROLE) {
    return next(new AppError('tuno tienes permisos para esta accion', 403));
  }

  next();
});

module.exports = { protecSession, protegerCuenta, validarAdministrador };
