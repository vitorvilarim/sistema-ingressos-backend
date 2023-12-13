const express = require('express');
const { listarEventos, escolherEventos, escolherHorario } = require('../controllers/eventos');
const rotas = express();


rotas.get('/eventos', listarEventos);
rotas.get('/evento', escolherEventos);
rotas.get('/evento/:id', escolherHorario);

module.exports = rotas;
