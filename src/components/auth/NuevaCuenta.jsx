import React , { useState }from 'react'
import { Link } from 'react-router-dom';

function Login() {

    const [usuario, guardarUsuario ] = useState({
        nombre: '',
        email: '',
        password: '',
        passConfirm: ''
    });
    //extraer de usuario
    const { nombre, email, password , passConfirm} = usuario;

    const onChangeInput = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario quiere iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        // validar que no haya campos vacios

        // Password minimo de 6 caracteres

        // Los 2 password son iguales

        // Pasarlo al action
    }
    return (
        <div className="form-usuario">
            <div className="contenedor-form sombre-dark">
                <h1>Obtener una Cuenta</h1>

                <form action="">

                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value= {nombre}
                            onChange={onChangeInput}
                        />
                    </div>


                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value= {email}
                            onChange={onChangeInput}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value= {password}
                            onChange={onChangeInput}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="passConfirm">Confirmar password</label>
                        <input 
                            type="password"
                            id="passConfirm"
                            name="passConfirm"
                            placeholder="Confirmar Password"
                            value= {passConfirm}
                            onChange={onChangeInput}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión" />
                    </div>
                </form>

                <Link 
                    to={'/'}
                    className="enlace-cuenta"                
                >
                    Iniciar Sesión
                </Link >
            </div>
        </div>
    )
}

export default Login
