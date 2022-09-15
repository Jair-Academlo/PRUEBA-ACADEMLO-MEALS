const express = require('express');

//controllers
const {
  crearUsuario,
  iniciarSession,
  actualizarUsuario,
  desabilitarUsuario,
  obtenerOrdenes,
  ordenesPorId,
} = require('../controllers/user.controller');

//middlewares
const { userExist } = require('../middlewares/user.middleware');
const { orderExist } = require('../middlewares/order.middleware');
const { createUserValidators } = require('../middlewares/validator.middleware');
const {
  protecSession,
  protegerCuenta,
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/signup', createUserValidators, crearUsuario);
router.post('/login', iniciarSession);

router.use(protecSession);

router.get('/orders', obtenerOrdenes);
router.get('/orders/:id', orderExist, ordenesPorId);
router.patch('/:id', userExist, protegerCuenta, actualizarUsuario);
router.delete('/:id', userExist, protegerCuenta, desabilitarUsuario);

module.exports = { userRouter: router };
