const knex = require('../config/conection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        if (!email || !senha) {
            return res.status(400).json({ mensagem: "todos os campos são obrigatórios" });
        }

        const consulta = await knex('usuarios').where({ email: email }).first();
        if (!consulta) {
            return res.status(404).json({ mensagem: 'Email ou senha incorreto!' });
        }

        const compararSenha = await bcrypt.compare(senha, consulta.senha);
        if (!compararSenha) {
            return res.status(404).json({ mensagem: 'Email ou senha incorreto!' });
        }

        const token = jwt.sign({ id: consulta.id }, process.env.JWT_PASS, { expiresIn: '30d' });

        const { senha: _, ...usuarioLogado } = consulta;

        return res.status(200).json({ usuario: usuarioLogado, token });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno de servidor!' });
    }


};

module.exports = login;