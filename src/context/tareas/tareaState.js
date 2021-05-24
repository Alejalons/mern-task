import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import  {
            TAREAS_PROYECTO,
            AGREGAR_TAREA,
            VALIDAR_TAREA,
            ELIMINAR_TAREA,
            ESTADO_TAREA,
            TAREA_ACTUAL,
            ACTUALIZAR_TAREA,
            LIMPIAR_TAREA
        } from './../../types'

const TareaState = props => {

    const initialState = {
        tareas: [
            { id: 1 , nombre: 'Eligir Plataforma', estado: true, proyectoId: 1},
            { id: 2 , nombre: 'Eligir Colores', estado: false, proyectoId: 2},
            { id: 3 , nombre: 'Eligir Plataforma de Pago', estado: true, proyectoId: 3},
            { id: 4 , nombre: 'Eligir Hosting', estado: false, proyectoId: 4},
            { id: 5 , nombre: 'Eligir Plataforma', estado: true, proyectoId: 4},
            { id: 6 , nombre: 'Eligir Colores', estado: false, proyectoId: 1},
            { id: 7 , nombre: 'Eligir Plataforma de Pago', estado: true, proyectoId: 2},
            { id: 8 , nombre: 'Eligir Hosting', estado: false, proyectoId: 3},
            { id: 9 , nombre: 'Eligir Plataforma', estado: true, proyectoId: 2},
            { id: 10 , nombre: 'Eligir Colores', estado: false, proyectoId: 3},
            { id: 11 , nombre: 'Eligir Plataforma de Pago', estado: true, proyectoId: 4},
            { id: 12 , nombre: 'Eligir Hosting', estado: false, proyectoId: 1},
            { id: 13 , nombre: 'Eligir Plataforma', estado: false, proyectoId: 1},
            { id: 14 , nombre: 'Eligir Colores', estado: false, proyectoId: 1}

        ],
        tareasProyecto : null,
        errorTarea: false,
        tareaSeleccionada: null
    }
    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //crear las funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }
    
    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = tarea => {
        tarea.id = uuidv4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    // Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA 
        })
    }

    //eLIMINAR TAREA POR ID 
    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    //Cambiar el estado de cada tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    //extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Edita o modifica una tarea
    const  actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea 
        })
    }
    
    // Elimina la tareaSeleccionada cuando ya fue editada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasProyecto: state.tareasProyecto,
                errorTarea : state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState
