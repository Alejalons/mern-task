import React, {useReducer} from 'react';

import {v4 as uuidv4} from 'uuid';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import  {
            FORMULARIO_PROYECTO, 
            OBTENER_PROYECTOS,
            AGREGAR_PROYECTO,
            VALIDAR_FORMULARIO,
            PROYECTO_ACTUAL,
            ELIMINAR_PROYECTO
        } from '../../types';


const ProyectoState = props => {

    
    const proyectos = [
        {id: 1, nombre: 'Tienda Virtual'},
        {id: 2, nombre: 'Intranet'},
        {id: 3, nombre: 'Diseño de Sitio Web'},
        {id: 4, nombre: 'Programacion Webs'}
    ]

    const initialState = {
        proyectos : [],
        formulario : false,
        errorFormulario: false,
        seleccion_proyecto: false
    }
    //dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState) 



    //serie de funciones para el CRUD 
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    //Agregar nuevo proyecto
    const agregarProyecto = proyecto => {
        proyecto.id = uuidv4();

        // Insertar el proyecto en el state
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }

    /// valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Elimina un proyecto
    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario : state.errorFormulario,
                seleccion_proyecto: state.seleccion_proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState