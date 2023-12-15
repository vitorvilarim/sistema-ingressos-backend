const knex = require('../config/conection');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
        }

        const emailExiste = await knex('usuarios').where({ email: email }).first();
        if (emailExiste) {
            return res.status(400).json({ mensagem: "Email já cadastrado. Tente outro!" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const dados = {
            nome,
            email,
            senha: senhaCriptografada
        }
        const cadastro = await knex('usuarios').insert(dados).returning('*');

        return res.status(201).json({ mensagem: "Cadastro realizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno de servidor' });
    }
};

module.exports = cadastrarUsuario;
