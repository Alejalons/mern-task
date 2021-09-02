const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    try {
        
        //crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //guardar el cador via JWT
        proyecto.creador = req.usuario.id;

        proyecto.save();
        res.json(proyecto)

    } catch (error) {
        console.log(error)
        res.status(500).send(`Hubo un error ${error}`);
    }
}

//Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {

    try {
        
    } catch (error) {
        
    }

}