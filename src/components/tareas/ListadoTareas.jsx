import React , {useContext} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Tarea from './Tarea'

import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

function ListadoTareas() {

        //obtener el state del proyecto
        const proyectosContext = useContext(proyectoContext);
        const { seleccion_proyecto, eliminarProyecto } = proyectosContext;

        //obtener el state de tareas
        const tareasContext = useContext(tareaContext);
        const { tareasProyecto } = tareasContext;
    
        // ==============================

        // Si no hay proyecto Seleccionado
        if(!seleccion_proyecto) return <h2>Selecciona un proyecto</h2>;
        // Array destructuring para extraer el proyecto actual
        const [proyecto_actual] = seleccion_proyecto;


        // Eliminar un poyecto
        const onClickEliminar = () => {
            eliminarProyecto(proyecto_actual.id)
        }


    return (
        <>
            <h2>Proyecto: {proyecto_actual.nombre}</h2>  

            <ul className="listado-tareas">

                {   tareasProyecto.length === 0

                    ?   (<li className="tarea"><p>No hay tareas</p></li>)

                    :  
                    <TransitionGroup>
                        {tareasProyecto.map( (tarea) => (
                            <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea"
                            >
                            {/* escribir classNames para que efectue el efecto */}
                                <Tarea
                                    tarea = {tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>                   
                    
                }

            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >EliminarProyecto &times;</button>
        </>
    )
}

export default ListadoTareas
