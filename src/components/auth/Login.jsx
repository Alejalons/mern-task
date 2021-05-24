import React , { useState }from 'react'
import { Link } from 'react-router-dom';

function Login() {

    const [usuario, guardarUsuario ] = useState({
        email: '',
        password: ''
    });
    //extraer de usuario
    const { email, password } = usuario;

    const onChangeInputEmail = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario quiere iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

    }
    return (
        <div className="form-usuario">
            <div className="contenedor-form sombre-dark">
                <h1>Iniciar Sesión</h1>

                <form action="">
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value= {email}
                            onChange={onChangeInputEmail}
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
                            onChange={onChangeInputEmail}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión" />
                    </div>
                </form>

                <Link 
                    to={'/nueva-cuenta'}
                    className="enlace-cuenta"                
                >
                    Obtener Cuenta
                </Link >
            </div>
        </div>
    )
}

export default Login
