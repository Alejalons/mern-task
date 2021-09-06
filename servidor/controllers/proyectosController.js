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
        // console.log(req.usuario); //es el req usuario definido en el token > middleware 
        const proyectos = await Proyecto.find({ creador : req.usuario.id}).sort({ creado: -1 });
        res.json({proyectos});
    } catch (error) {
        console.log(error)
        res.status(500).send(`Error en obtenerProyectos ${error}`)
    }

}


//Actualizar un proyecto
exports.actualizarproyecto = async ( req, res) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extrar la info del proyecto
    const { nombre }= req.body;
    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        //revisar el id
        // console.log(req.params.id)
        let proyecto = await Proyecto.findById(req.params.id);
        
        //si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg: "Proyecto no encontrado"})
        }

        //verificar el creado del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
        }

        //actualizar
        proyecto = await Proyecto.findByIdAndUpdate(
            {_id: req.params.id }, //where
            {$set: nuevoProyecto},  //cambia proyecto por el nuevo nombre
            {new: true}
        )

        res.json({proyecto});

    } catch (error) {
        console.log(error);
        res.status(500).send(`Error en el servidor ${error}`);
    }

}

//elimina un proyecto por su ID
exports.eliminarProyecto = async (req, res) => {
    try {
        //revisar el id
        let proyecto = await Proyecto.findById(req.params.id);
        
        //si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg: "Proyecto no encontrado"})
        }

        //verificar el creado del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
        }

        await Proyecto.findOneAndRemove({ _id: req.params.id});
        res.json({ msg: 'proyecto Eliminado'})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
}