import  {
            TAREAS_PROYECTO,
            AGREGAR_TAREA,
            VALIDAR_TAREA,
            ELIMINAR_TAREA,
            ESTADO_TAREA,
            TAREA_ACTUAL,
            ACTUALIZAR_TAREA,
            LIMPIAR_TAREA
        } from './../../types';

export default (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasProyecto: state.tareas.filter(tarea => tarea.proyectoId === action.payload)
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareas: [action.payload, ...state.tareas ],
                errorTarea: false
            }
        case VALIDAR_TAREA: 
            return {
                ...state,
                errorTarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareas: state.tareas.filter( tarea => tarea.id !== action.payload)
            }
        // en dos caso
        case ACTUALIZAR_TAREA:
        case ESTADO_TAREA:
            return {
                ...state,
                // toma las tarea del proyecto seleccionado, recorre(map), identifica id de la tarea seleccionada 
                // si es encontrada modifica tarea sino retorna la tarea no modificada
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload : tarea)
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSeleccionada: action.payload
            }
        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaSeleccionada: null
            }
        default:
            return state;
    }
}