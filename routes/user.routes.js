const express = require('express');

//controllers
const {
  crearUsuario,
  iniciarSession,
  actualizarUsuario,
  desabilitarUsuario,
} = require('../controllers/user.controller');

//middlewares
const { userExist } = require('../middlewares/user.middleware');
const {
  protecSession,
  protegerCuenta,
  validarAdministrador,
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/signup', crearUsuario);
router.post('/login', iniciarSession);

router.use(protecSession);

router.patch('/:id', userExist, protegerCuenta, actualizarUsuario);
router.delete('/:id', userExist, desabilitarUsuario);

module.exports = { userRouter: router };
