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
//obtener todos los proyectos
router.get('/',
    auth, // verifica primero auth
    proyectoController.obtenerProyectos
)

//actualizar proyecto via ID
router.put('/:id',
    auth, //si esta autenticado
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarproyecto
)

//Eliminar un Proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
)

module.exports = router;