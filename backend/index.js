const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const pacienteRoute = require('./routes/paciente');
const instanciaRoute = require('./routes/instancia');
const casoclinicoRoute = require('./routes/casoClinico');
const chatbotService = require('./routes/chatbot'); // Asegúrate de importar el servicio del chatbot

const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRoute);
app.use('/paciente', pacienteRoute);
app.use('/instancia', instanciaRoute);
app.use('/casoClinico', casoclinicoRoute);
app.use('/api/chatbot', chatbotService); // Asegúrate de que chatbotService esté definido

app.get("/", function (req, res) {
    res.send("Hello World");
});

module.exports = app;
