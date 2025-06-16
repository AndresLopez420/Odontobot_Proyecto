const express = require('express');
const router = express.Router();

// Lógica básica del chatbot
router.post('/', (req, res) => {
    const userMessage = req.body.message;
    let botResponse;

    // Respuestas predefinidas
    if (userMessage.toLowerCase() === 'hola') {
        botResponse = '¡Hola! ¿Cómo puedo ayudarte hoy?';
    } else if (userMessage.toLowerCase() === 'adiós') {
        botResponse = '¡Hasta luego!';
    } else {
        botResponse = 'Lo siento, no entiendo tu mensaje.';
    }

    res.json({ response: botResponse });
});

module.exports = router; // Exportamos el router
