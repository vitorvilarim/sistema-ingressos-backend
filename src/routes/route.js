const express = require('express');
const { listarEventos, escolherEventos } = require('../controllers/eventos');
const rotas = express();


rotas.get('/eventos', listarEventos);
rotas.get('/evento', escolherEventos);

module.exports = rotas;
