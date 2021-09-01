const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator'); //resultado de la validacion de la que se hizo en router
const jwt = require('jsonwebtoken'); //importacion de token

exports.autenticarUsuarios = async (req, res) => {
      //revisar si hay errores
      const errores = validationResult(req);
      if(!errores.isEmpty()){
          return res.status(400).json({errores: errores.array()})
      }
}