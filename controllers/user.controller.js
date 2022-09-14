//modelos
const { User } = require('../models/user.model');
//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
//librerias
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config.env' });

const crearUsuario = catchAsync(async function (req, res, next) {
  const { name, email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user) {
    return next(new AppError('Este email ya existe', 404));
  }

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newuser = await User.create({ name, email, password: hashPassword });

  newuser.password = undefined;

  res.status(201).json({
    message: 'Usuario creado',
    status: 'Operacion exitosa',
    newuser,
  });
});

const iniciarSession = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next(new AppError('credenciales invalidas email', 404));
  }

  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) {
    return next(new AppError('credenciales invalidas password'));
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });

  res.status(200).json({
    message: 'inicio de session correcto',
    status: 'operacion exitosa',
    token,
  });
});

module.exports = { crearUsuario, iniciarSession };
