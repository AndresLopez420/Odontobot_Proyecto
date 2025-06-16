const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// Middleware para servir archivos estáticos desde 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});