import React, { useContext , useEffect} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext'

function ListadoProyectos() {

    //extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext;

    //cuando componente ListadoProyectos carga se ejecuta esta sintaxis
    useEffect(() => {
        obtenerProyectos();
        // eslint-disable-next-line
        // cod para evitar warning por falta de dependiencia
    }, [])

     //verifica si proyectos tiene contenido
    if ( proyectos.length === 0) return null;

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto.id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}

export default ListadoProyectos