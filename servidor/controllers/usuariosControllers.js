const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator'); //resultado de la validacion de la que se hizo en router
const jwt = require('jsonwebtoken'); //importacion de token


                    //peticion - respuesta
exports.crearUsuario = async (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }


    // console.log('desde crearUsuario:' , req.body);
    // req => retorna el json enviado por el usuario

    // extraer email y password
    const { email, password } = req.body;

    try {
        //revisa que el usuairo registrado sea unico
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe'});
        }

        // crea el nuevo usuario (instancia)
        usuario = new Usuario(req.body);

        // Hashear el passsword
        //salt: si dos usuarios con la misma pass genera un hash diferente entre ambos
        const salt = await bcryptjs.genSalt(10); //mientr mas numero mas consume
        usuario.password = await bcryptjs.hash(password, salt); //entrega la pass y el salt generado 
        
        //guardar usuario
        await usuario.save();

        //crear y firmar el JWT
        const payload= {
            usuario: {
                id: usuario.id
            }
        };
        // firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //1 hora
        }, (error, token) => {
            if(error) throw error;

            //mensaje de confirmacion
             res.json({token}) //enviar respuesta emprime en postman
        });

        
    } catch (error) {
        console.log(error);
        res.status(400).send(`Error al crear usuario ${error}`)
    }
}