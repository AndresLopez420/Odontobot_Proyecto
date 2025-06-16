const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


router.post('/signup', (req, res) => {
    console.log('Datos recibidos:', req.body); // Verifica los datos
    let user = req.body;

    // Validar que los campos rut y password estén presentes
    if (!user.rut || !user.password) {
        return res.status(400).json({ message: "El RUT y la contraseña son obligatorios" });
    }

    // Asignar un valor predeterminado para el rol si no se envía desde el frontend
    let rol = user.rol || 'estudiante'; // Valor predeterminado: "profesor"

    console.log('Datos enviados a usuarios:', {
        rut: user.rut,
        password: user.password,
        rol: rol
    });

    // Valores predeterminados para los demás campos
    let nombre = 'N/A'; // Nombre genérico si no se solicita
    let apellidom = 'N/A'; // Apellido genérico
    let apellidop = 'N/A'; // Apellido genérico

    // Iniciar la transacción
    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error al iniciar la transacción:', err);
            return res.status(500).json({ message: 'Error al iniciar la transacción' });
        }

        // Insertar en la tabla usuarios
        let queryUsuarios = "INSERT INTO usuarios (rut, password, rol) VALUES (?, ?, ?)";
        connection.query(queryUsuarios, [user.rut, user.password, rol], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') { // Error de duplicado
                    console.log('El RUT ya existe en la base de datos:', user.rut);
                    return connection.rollback(() => {
                        return res.status(400).json({ message: "El RUT ya está registrado" });
                    });
                }
                console.error('Error al insertar en usuarios:', err);
                return connection.rollback(() => {
                    return res.status(500).json({ message: "Error al registrar el usuario" });
                });
            }

            console.log('Usuario insertado correctamente:', results);

            // Después, insertamos en la tabla profesor
            let queryProfesor = "INSERT INTO profesor (nombre_profesor, apellidom_profesor, apellidop_profesor, rut) VALUES (?, ?, ?, ?)";
            connection.query(queryProfesor, [user.nombre, user.apellidom, user.apellidop, user.rut], (err, results) => {
                if (err) {
                    return connection.rollback(() => {
                        return res.status(500).json(err);
                    });
                }

                // Si ambas inserciones son exitosas, confirmamos la transacción
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            return res.status(500).json(err);
                        });
                    }
                    return res.status(200).json({ message: "Registro completado en ambas tablas" });
                });
            });
        });
    });
});

router.post('/login', (req, res) => {
    const user = req.body; 
    const query = "SELECT rut, password, rol, status FROM usuarios WHERE rut=?";

    connection.query(query, [user.rut], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        // Verificar si se encontró el usuario
        if (results.length === 0) {
            return res.status(401).json({ message: "RUT o contraseña incorrecta" });
        }

        // Comprobar la contraseña
        if (results[0].password !== user.password) {
            return res.status(401).json({ message: "RUT o contraseña incorrecta" });
        }

        // Comprobar el estado del usuario
        if (results[0].status === 'false') {
            return res.status(401).json({ message: "Espera la aprobación del admin" });
        }

        // Si la contraseña es correcta y el estado es válido
        const response = { rut: results[0].rut, rol: results[0].rol };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });

        // Enviar tanto el token como el rol en la respuesta
        res.status(200).json({ token: accessToken, rol: results[0].rol }); // Modificado aquí
    });
});


router.get('/get',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    var query = "select id_usuario,rut,password,rol,status from usuarios";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let user = req.body;
    var query = "update usuarios set rol=? where id_usuario=?";
    connection.query(query,[user.rol,user.id_usuario],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"id de usuario no existe"});
            }
            return res.status(200).json({message:"El usuario a sido actualizado"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/checkToken',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    return res.status(200).json({message:"true"});
})

module.exports = router;
