import React, {useState, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

function NuevoProyecto() {

    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { 
            formulario, 
            errorFormulario, 
            mostrarFormulario, 
            agregarProyecto, 
            mostrarError 
        } = proyectosContext;

    
    // State para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });
    
    //Extrar nombre de proyecto
    const { nombre } = proyecto;

    // Lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    // cuando el usuario envia un proyecto

    const onSubmitProyecto = e => {
        e.preventDefault()

        // validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }

        // agregar el state
        agregarProyecto(proyecto)

        // reiniciar el form
        guardarProyecto({
            nombre: ''
        });
    }
    
    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >
                Nuevo Proyecto
            </button> 

            {
                formulario 
                ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit = {onSubmitProyecto}
                        >
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                value={nombre}
                                onChange={onChangeProyecto}
                                name="nombre"
                            />
                            
                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"                   
                                name="Agregar Proyecto"
                            />
                        </form>
                    )
                : null}

            { errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </>
    )
}

export default NuevoProyecto
