const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.get('/getpaciente', auth.authenticateToken, (req, res, next) => {
    var query = "SELECT * FROM paciente_virtual"; // Corrección aquí
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            console.log(err); 
            return res.status(500).json(err);
        }
    });
});

router.post('/addpaciente', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let paciente = req.body;

    // Verifica que todos los campos obligatorios estén presentes
    if (!paciente.id_caso || !paciente.nombre_pv || !paciente.fecha_nacimiento) {
        return res.status(400).json({ message: "Faltan campos obligatorios" }); // Cambia a 400
    }

    var query = 'INSERT INTO paciente_virtual (id_caso, nombre_pv, fecha_nacimiento, nacionalidad, telefono, actividad, genero, direccion, rut) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [
        paciente.id_caso,
        paciente.nombre_pv,
        paciente.fecha_nacimiento,
        paciente.nacionalidad,
        paciente.telefono,
        paciente.actividad,
        paciente.genero,
        paciente.direccion,
        paciente.rut
    ], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Paciente creado correctamente" });
        } else {
            console.log(err);
            return res.status(500).json(err);
        }
    });
});


module.exports = router;