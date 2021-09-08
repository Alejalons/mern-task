const Tarea = require('../models/tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//crea una nueva tarea
exports.crearTarea = async (req, res) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }


    //extraer el proyecto y comprobar si existe
    try {
        const { proyecto } = req.body;

        //buscar proyecto por id
        let proyecto_existe = await Proyecto.findById(proyecto)

        if(!proyecto_existe){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(proyecto_existe.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
        }

        //creamos la tarea
        const tarea = new Tarea(req.body); 
        await tarea.save();
        res.json({tarea});

    } catch (error) {
        console.log(error)
        return res.status(500).send(`Hubo un error ${error}`)
    }
}

//Obtiene las tareas por proyecto
exports.obtenerTareas = async  (req, res) => {
    //extraer proyecto
    const { proyecto } = req.body;

    try {
        //buscar proyecto por id
        let proyecto_existe = await Proyecto.findById(proyecto)

        if(!proyecto_existe){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(proyecto_existe.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
        }

        //obtener tareas por proyectos
        const tareas = await Tarea.find({ proyecto })

        return res.json({tareas})
    } catch (error) {
        console.log(error)
        res.status(500).send(`Hubo un error ${error}`)
    }
    
}