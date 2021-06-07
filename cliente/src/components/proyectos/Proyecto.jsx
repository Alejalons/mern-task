import React , { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

function Proyecto({proyecto}) {

    //obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;
    
    //obtener el state de tareas
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;
    
    //funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id);
        obtenerTareas(id);
    }


    return (
        <li
            key={proyecto.id}
        >
            <button
                type="button"
                className="btn btn-blank"
                onClick= {() => seleccionarProyecto(proyecto.id)}
            >{proyecto.nombre}</button>
        </li>
    )
}

export default Proyecto
