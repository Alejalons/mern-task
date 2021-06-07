const Usuario = require('../models/Usuario');

                    //peticion - respuesta
exports.crearUsuario = async (req, res) => {
    //res.send('hola'); enviar respuesta emprime en postman
    // console.log('desde crearUsuario:' , req.body);

    // extraer email y password
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        // crea el nuevo usuario (instancia)
        usuario = new Usuario(req.body);
        
        //guardar usuario
        await usuario.save();

        //mensaje de confirmacion
        res.send('Usuario creado Correctamente')
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error')
    }
}