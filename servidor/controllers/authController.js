const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator'); //resultado de la validacion de la que se hizo en router
const jwt = require('jsonwebtoken'); //importacion de token

exports.autenticarUsuarios = async (req, res) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extrar el email y passw 
    const { email, password } = req.body;

    try {
        //revisar que sea un usuario registrado
        let usuario = await  Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe!'});
        }

        //revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password );
        if(!passCorrecto){
            return res.status(400).json({msg: 'contraseña incorrecta'});
        }

            // si todo es correcto
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
        console.log(error)
    }
}