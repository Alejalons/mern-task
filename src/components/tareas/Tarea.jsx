import React, { useContext } from 'react'

import tareaContext from '../../context/tareas/tareaContext'
import proyectoContext from '../../context/proyectos/proyectoContext'

function Tarea({tarea}) {

    //extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { seleccion_proyecto} = proyectosContext;    

    //tarea context  
    const tareasContext = useContext(tareaContext);
    const {  eliminarTarea, obtenerTareas , cambiarEstadoTarea, guardarTareaActual} = tareasContext;

    //extraer el proyecto
    const [proyectoActual] = seleccion_proyecto;


    // Funciopn que se ejecuta cuando el suaurio presiona el btn de eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id);

        obtenerTareas(proyectoActual.id)
    }

    //funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false
        }
        else{
            tarea.estado = true;
        }
        cambiarEstadoTarea(tarea)
    }

    // Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = (tarea) => {
        guardarTareaActual(tarea)
    }
    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {
                    tarea.estado
                    ?
                        (<button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>)
                    :
                        (<button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >incompleto</button>)
                }

            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-btn-secundario"
                    onClick = { () => tareaEliminar(tarea.id)}
                >Eliminar</button>
            </div>

        </li>
    )
}

export default Tarea
