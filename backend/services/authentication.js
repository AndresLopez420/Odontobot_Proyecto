require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401); // No autorizado
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token no válido
        }
        res.locals.rol = user.rol; // Asegúrate de asignar el rol
        next();
    });
}

module.exports = { authenticateToken: authenticateToken };
