const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const crearUsuario = catchAsync(async function (req, res) {
  const { name, email, password } = req.body;

  const newuser = await User.create({ name, email, password });

  res.status(201).json({
    message: 'Usuario creado',
    status: 'Operacion exitosa',
    newuser,
  });
});

module.exports = { crearUsuario };
