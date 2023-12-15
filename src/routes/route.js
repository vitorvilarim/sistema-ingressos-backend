const express = require('express');
const { listarEventos, escolherEventos, escolherHorario } = require('../controllers/eventos');
const cadastrarUsuario = require('../controllers/usuarios');
const rotas = express();


rotas.get('/eventos', listarEventos);
rotas.get('/evento', escolherEventos);
rotas.get('/evento/:id', escolherHorario);

rotas.post('/cadastrar-usuario', cadastrarUsuario);
module.exports = rotas;
