const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre : {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' //se pasa el nombre del modelo, en el que ses "Usuario"
    },
    creado:{
        type: Date,
        default: Date.now()
    } 
})

module.exports = mongoose.model('Proyecto', ProyectoSchema);
