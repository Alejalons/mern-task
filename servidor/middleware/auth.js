const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    // Leer el token del header
    const token = req.header('x-auth-token');
    // console.log(token); //en postman > Headers > x-auth-token >x value: el token 

    //revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'No hay Token, permiso no válido'})
    }


    //validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario //payload inicializado, se guarda  el req.usuario
        next()//para que pase al siguiente middleware
    } catch (error) {
        res.status(401).json({msg: `Token no válido: ${error}`});
    }
}