const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectosController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crea Proyectos
//api/proyectos
router.post('/',
    auth, // verifica primero auth
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)

router.get('/',
    auth, // verifica primero auth
    proyectoController.crearProyecto
)

module.exports = router;