const express = require('express');
const connectDB = require('./config/db');

// crear el servidor/inicia express
const app = express();

// Conectar a la base de datos
connectDB();

// Habilitar express.json
// Permitir leer datos que el usuario coloque
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));


// arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})