const express = require('express');

const { crearUsuario } = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', crearUsuario);

module.exports = { userRouter: router };
