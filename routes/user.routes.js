const express = require('express');

const {
  crearUsuario,
  iniciarSession,
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', crearUsuario);
router.post('/login', iniciarSession);

module.exports = { userRouter: router };
