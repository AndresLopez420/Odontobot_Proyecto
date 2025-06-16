require('dotenv').config();

function checkRole(req, res, next) {
    if (res.locals.rol === process.env.USER) { // Cambia 'process.env.USER' según el rol que debe ser restringido
        return res.sendStatus(403); // Cambiado a 403 para indicar prohibido
    }
    next();
}

module.exports = { checkRole: checkRole };
