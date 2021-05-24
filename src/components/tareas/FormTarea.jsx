import React, { useContext, useState  , useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

function FormTarea() {
    //extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { seleccion_proyecto} = proyectosContext;    
    
    //extraer proyectos de state inicial
    const tareasContext = useContext(tareaContext);
    const { tareaSeleccionada, 
            errorTarea, 
            agregarTarea, 
            validarTarea, 
            obtenerTareas, 
            actualizarTarea,
            limpiarTarea } = tareasContext;

    // State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    }); const {nombre} =  tarea;
    
    // Effect que detecta si hay una tarea seleccionada para editar
    useEffect(() => {
        if (tareaSeleccionada !== null) {
            guardarTarea(tareaSeleccionada);
        }
        else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])


    //si no hay proyecto seleccionado
    if(!seleccion_proyecto) return null;    

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = seleccion_proyecto;

    //leer los valores enviados por el formulario 
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }


    const onSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }

        //Si es edicion o si es nueva tarea
        if(tareaSeleccionada === null){

                       //tarea nueva
            //agregar la nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea)

        } else {
            //actualizar tarea existente
            actualizarTarea(tarea)

            //Elimina tareaSeleccionada del state
            limpiarTarea();
        }

        // obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id)
        
        //reinciar el form
        guardarTarea({
            nombre : ''
        })
    }
    
    return (
        <div className="formulario"> 
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea': 'Agregar Tarea'}
                    />
                </div>
                {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
            </form>
        </div>
    )
}

export default FormTarea
