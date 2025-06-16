const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser'); 
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');
const fs = require('fs');

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../../frontend/src/assets/uploads/');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname)); // Nombre único para cada archivo
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Archivo no permitido. Solo se permiten imágenes.");
        }
    }
});

// Middleware para aumentar el límite de tamaño del cuerpo de la solicitud
router.use(bodyParser.json({ limit: '10mb' }));
router.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Ruta para agregar un caso clínico
router.post('/add', 
    auth.authenticateToken, 
    checkRole.checkRole, 
    upload.fields([{ name: 'examenes' }, { name: 'examen_intraoral' }, { name: 'examen_extraoral' }]), 
    (req, res, next) => {
        // Verificar si se subieron los archivos
        if (!req.files || !req.files.examenes || !req.files.examen_intraoral || !req.files.examen_extraoral) {
            return res.status(400).json({ message: "No se subió uno o más archivos." });
        }

        // Procesar los archivos
        let casoClinico = req.body;
        let examenesPath = req.files.examenes[0].filename; // Nombre del archivo de examenes
        let examenIntraoralPath = req.files.examen_intraoral[0].filename; // Archivo intraoral
        let examenExtraoralPath = req.files.examen_extraoral[0].filename; // Archivo extraoral

        // Inserción en la tabla caso_clinico
        var query = 'INSERT INTO caso_clinico (id_profesor, nombre_caso, dificultad, instancia, modulo, clase, patologia, motivo_consulta, ultima_visita, sintomas_ap, molestia_ap, enfermedadescronicas_ar, alergias_ar, medicamentos_ar, antecedentes_ar, habitos_ar, higiene_ar, examen_intraoral, examen_extraoral, examenes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        connection.query(query, [
            casoClinico.id_profesor, 
            casoClinico.nombre_caso, 
            casoClinico.dificultad, 
            casoClinico.instancia, 
            casoClinico.modulo, 
            casoClinico.clase, 
            casoClinico.patologia, 
            casoClinico.motivo_consulta, 
            casoClinico.ultima_visita, 
            casoClinico.sintomas_ap, 
            casoClinico.molestia_ap, 
            casoClinico.enfermedadescronicas_ar, 
            casoClinico.alergias_ar, 
            casoClinico.medicamentos_ar, 
            casoClinico.antecedentes_ar, 
            casoClinico.habitos_ar, 
            casoClinico.higiene_ar, 
            examenIntraoralPath, 
            examenExtraoralPath, 
            examenesPath
        ], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Error al crear el caso clínico", error: err });
            }

            // Obtener el id_caso recién creado
            const id_caso = results.insertId;

            // Ahora insertar en la tabla paciente_virtual
            const paciente = {
                id_caso: id_caso,
                nombre_pv: casoClinico.nombre_pv,
                fecha_nacimiento: casoClinico.fecha_nacimiento,
                nacionalidad: casoClinico.nacionalidad,
                telefono: casoClinico.telefono,
                actividad: casoClinico.actividad,
                genero: casoClinico.genero,
                direccion: casoClinico.direccion,
                rut: casoClinico.rut
            };

            var queryPaciente = 'INSERT INTO paciente_virtual (id_caso, nombre_pv, fecha_nacimiento, nacionalidad, telefono, actividad, genero, direccion, rut) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            
            connection.query(queryPaciente, [
                paciente.id_caso,
                paciente.nombre_pv,
                paciente.fecha_nacimiento,
                paciente.nacionalidad,
                paciente.telefono,
                paciente.actividad,
                paciente.genero,
                paciente.direccion,
                paciente.rut
            ], (err, pacienteResults) => {
                if (err) {
                    return res.status(500).json({ message: "Error al crear el paciente", error: err });
                }
                return res.status(200).json({ message: "Caso clínico y paciente creados correctamente",
                    id_caso: id_caso
                 });
            });
        });
    }
);


// Ruta para obtener todos los casos clínicos
router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "SELECT * FROM caso_clinico ORDER BY nombre_caso";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Ruta para obtener un caso clínico por ID con datos del paciente
router.get('/get/:id_caso', auth.authenticateToken, (req, res, next) => {
    const id_caso = req.params.id_caso;
    var query = `
        SELECT cc.*, pv.* 
        FROM caso_clinico cc
        LEFT JOIN paciente_virtual pv ON cc.id_caso = pv.id_caso
        WHERE cc.id_caso = ?
    `;
    
    connection.query(query, [id_caso], (err, results) => {
        if (!err) {
            if (results.length === 0) {
                return res.status(404).json({ message: "Caso clínico no encontrado" });
            }
            return res.status(200).json(results[0]); // Devuelve el caso clínico y el paciente
        } else {
            return res.status(500).json(err);
        }
    });
});


// Ruta para actualizar un caso clínico
router.patch('/update', auth.authenticateToken, checkRole.checkRole, upload.single('examenes'), (req, res, next) => {
    let casoClinico = req.body;
    let examenesPath = req.file ? req.file.filename : casoClinico.examenes; // Cambiado para usar solo el nombre del archivo

    var query = "UPDATE caso_clinico SET nombre_caso = ?, dificultad = ?, instancia = ?, modulo = ?, clase = ?, patologia = ?, motivo_consulta = ?, ultima_visita = ?, sintomas_ap = ?, molestia_ap = ?, enfermedadescronicas_ar = ?, alergias_ar = ?, medicamentos_ar = ?, antecedentes_ar = ?, habitos_ar = ?, higiene_ar = ?, examen_intraoral = ?, examen_extraoral = ?, examenes = ? WHERE id_caso = ?";
    
    connection.query(query, [
        casoClinico.nombre_caso, 
        casoClinico.dificultad, 
        casoClinico.instancia, 
        casoClinico.modulo, 
        casoClinico.clase, 
        casoClinico.patologia, 
        casoClinico.motivo_consulta, 
        casoClinico.ultima_visita, 
        casoClinico.sintomas_ap, 
        casoClinico.molestia_ap, 
        casoClinico.enfermedadescronicas_ar, 
        casoClinico.alergias_ar, 
        casoClinico.medicamentos_ar, 
        casoClinico.antecedentes_ar, 
        casoClinico.habitos_ar, 
        casoClinico.higiene_ar, 
        casoClinico.examen_intraoral, 
        casoClinico.examen_extraoral, 
        examenesPath, 
        casoClinico.id_caso
    ], (err, result) => {
        if (!err) {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Id del caso clínico no encontrado" });
            }
            return res.status(200).json({ message: "Caso clínico actualizado correctamente" });
        } else {
            return res.status(500).json(err);
        }
    });
});

// Ruta para eliminar un caso clínico y su paciente relacionado
router.delete('/delete/:id_caso', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    const id_caso = req.params.id_caso;
    
    // Primero, eliminar el paciente virtual
    var queryPaciente = "DELETE FROM paciente_virtual WHERE id_caso = ?";
    connection.query(queryPaciente, [id_caso], (err) => {
        if (err) {
            return res.status(500).json({ message: "Error al eliminar el paciente", error: err });
        }

        // Luego, eliminar el caso clínico
        var queryCaso = "DELETE FROM caso_clinico WHERE id_caso = ?";
        connection.query(queryCaso, [id_caso], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Id del caso clínico no encontrado" });
            }
            return res.status(200).json({ message: "Caso clínico y paciente eliminados correctamente" });
        });
    });
});


// Ruta para obtener todos los pacientes virtuales
router.get('/getpaciente', auth.authenticateToken, (req, res, next) => {
    var query = "SELECT * FROM paciente_virtual ORDER BY nombre_pv";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Ruta para obtener todos los casos clínicos con datos del paciente
router.get('/getCasosCompleto', auth.authenticateToken, (req, res, next) => {
    var query = `
        SELECT cc.*, pv.* 
        FROM caso_clinico cc
        LEFT JOIN paciente_virtual pv ON cc.id_caso = pv.id_caso
        ORDER BY cc.nombre_caso
    `;
    
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Ruta para obtener un caso clínico específico con datos del paciente
router.get('/getCasoCompleto/:id_caso', auth.authenticateToken, (req, res, next) => {
    const id_caso = req.params.id_caso;
    var query = `
        SELECT cc.*, pv.* 
        FROM caso_clinico cc
        LEFT JOIN paciente_virtual pv ON cc.id_caso = pv.id_caso
        WHERE cc.id_caso = ?
    `;
    
    connection.query(query, [id_caso], (err, results) => {
        if (!err) {
            if (results.length === 0) {
                return res.status(404).json({ message: "Caso clínico no encontrado" });
            }
            return res.status(200).json(results[0]);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Servir archivos estáticos desde la carpeta uploads
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Endpoint adicional para obtener imágenes con autenticación
router.get('/get-image/:filename', auth.authenticateToken, (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ message: "Imagen no encontrada" });
    }
});

module.exports = router;