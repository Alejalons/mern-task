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

//buscar las tareas
router.get('/',
    auth,
    tareaController.obtenerTareas
)

//Actualizar Tarea
router.put('/:id',
    auth,
    tareaController.actualizarTarea
)


//eliminar tarea
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
)
module.exports = router;
