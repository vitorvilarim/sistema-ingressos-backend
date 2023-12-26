const express = require('express');
const { listarEventos, escolherEventos, escolherHorario } = require('../controllers/eventos');
const cadastrarUsuario = require('../controllers/usuarios');
const login = require('../controllers/login');
const validarLogin = require('../middleware/validarLogin');
const { venda } = require('../controllers/vendas');
const relatorio = require('../utils/relatorioCompra');
const rotas = express();


rotas.get('/eventos', listarEventos);
rotas.get('/evento', escolherEventos);
rotas.get('/evento/:id', escolherHorario);

rotas.post('/cadastrar-usuario', cadastrarUsuario);
rotas.post('/login', login);

rotas.use(validarLogin);

rotas.post('/comprar', venda);
rotas.get('/relatorio', relatorio);
module.exports = rotas;
