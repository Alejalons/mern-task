import React from 'react'

function Barra() {
    return (
        <header className="app-header">
            <p className="nombre-usuario">Hola <span>[nombre usuario]</span></p>

            <nav className="nav-principal">
                <a href="#!">Cerrar Sesión</a>
            </nav>
        </header>
    )
}

export default Barra
