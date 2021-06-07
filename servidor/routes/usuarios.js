//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioControllers = require('../controllers/usuariosControllers');

// Crea un usuario
// api/usuarios
router.post('/', 
    usuarioControllers.crearUsuario
);
module.exports = router;