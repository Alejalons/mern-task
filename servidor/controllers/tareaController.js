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

exports.actualizarTarea = async(req, res) => {
    try {
        const { proyecto, nombre, estado } = req.body;

        //si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'Tarea no existe'})
        }

        //buscar proyecto por id
        let proyecto_existe = await Proyecto.findById(proyecto)

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(proyecto_existe.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
        }

        //crear un objeto con la nueva informacion
        const nuevaTarea = {};
        if(nombre ) nuevaTarea.nombre = nombre;
        if(estado) nuevaTarea.estado = estado;

        tarea = await Tarea.findOneAndUpdate(
            {_id: req.params.id},
            nuevaTarea,
            {new: true}
        )

        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send(`Hubo un error al actualizar una tarea: ${error}`)
    }
}

exports.eliminarTarea = async(req, res) => {
    try {
        const { proyecto } = req.body;

        //si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'Tarea no existe'})
        }

        //buscar proyecto por id
        let proyecto_existe = await Proyecto.findById(proyecto)

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(proyecto_existe.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
        }

        // /7eliminar

        await Tarea.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Tarea Eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send(`Hubo un error al eliminar una tarea: ${error}`)
    }
}