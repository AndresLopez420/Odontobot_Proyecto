const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let instancia = req.body;
    var query = 'INSERT INTO instancia (id_profesor, id_pv, nombre_instancia, tipo_instancia, descripcion, practicas_minimas, intentos, entrega, estado, modalidad, fecha_inicio, fecha_termino, id_caso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [instancia.id_profesor,instancia.id_pv,instancia.nombre_instancia,instancia.tipo_instancia,instancia.descripcion,instancia.practicas_minimas,instancia.intentos,instancia.entrega,instancia.estado,instancia.modalidad,instancia.fecha_inicio,instancia.fecha_termino,instancia.id_caso], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Instancia creada correctamente" });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "SELECT * FROM instancia ORDER BY nombre_instancia"; // Corrección aquí
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Ruta para actualizar un caso clínico y un paciente virtual
router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let instancia = req.body;
    
    // Consulta para actualizar la instancia
    var queryInstancia = "UPDATE instancia SET id_profesor = ?, id_pv = ?, nombre_instancia = ?, tipo_instancia = ?, descripcion = ?, practicas_minimas = ?, intentos = ?, entrega = ?, estado = ?, modalidad = ?, fecha_inicio = ?, fecha_termino = ?, id_caso = ? WHERE id_instancia = ?";
    
    connection.query(queryInstancia, [
        instancia.id_profesor,
        instancia.id_pv,
        instancia.nombre_instancia,
        instancia.tipo_instancia,
        instancia.descripcion,
        instancia.practicas_minimas,
        instancia.intentos,
        instancia.entrega,
        instancia.estado,
        instancia.modalidad,
        instancia.fecha_inicio,
        instancia.fecha_termino,
        instancia.id_caso, // Agrega el id_caso aquí
        instancia.id_instancia
    ], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Id de la instancia no encontrado" });
        }

        return res.status(200).json({ message: "Instancia actualizada correctamente" });
    });
});




// Ruta para obtener instancias por caso clínico
router.get('/getByCaso/:id_caso', auth.authenticateToken, (req, res, next) => {
    const id_caso = req.params.id_caso;
    var query = "SELECT * FROM instancia WHERE id_caso = ? ORDER BY nombre_instancia";
    connection.query(query, [id_caso], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Ruta para obtener el id_caso por id_instancia
router.get('/getCasoByInstancia/:id_instancia', auth.authenticateToken, (req, res, next) => {
    const id_instancia = req.params.id_instancia;
    var query = "SELECT id_caso FROM instancia WHERE id_instancia = ?";
    connection.query(query, [id_instancia], (err, results) => {
        if (!err) {
            if (results.length > 0) {
                return res.status(200).json(results[0]); // Retorna el primer resultado
            } else {
                return res.status(404).json({ message: "Instancia no encontrada" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

// Ruta para eliminar un caso clínico
router.delete('/delete/:id_instancia', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    const id_instancia = req.params.id_instancia; // Obtener el ID del caso clínico desde los parámetros de la solicitud
    var query = "DELETE FROM instancia WHERE id_instancia = ?"; // Consulta SQL para eliminar el caso clínico
    connection.query(query, [id_instancia], (err, result) => {
        if (!err) {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Id de la instancia no encontrado" }); // Manejo de caso cuando no se encuentra el ID
            }
            return res.status(200).json({ message: "La instancia ha sido eliminado correctamente" }); // Respuesta exitosa
        } else {
            return res.status(500).json(err); // Manejo de errores
        }
    });
});

module.exports = router;