const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


//crear una tarea
//api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es Obligaotrio').not().isEmpty()
    ],
    tareaController.crearTarea
)

router.get('/',
    auth,
    tareaController.obtenerTareas
)

module.exports = router;
