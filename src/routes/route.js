const express = require('express');
const { listarEventos } = require('../controllers/eventos');
const rotas = express();


rotas.get('/eventos', listarEventos);

module.exports = rotas;
