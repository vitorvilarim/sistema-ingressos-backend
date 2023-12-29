const knex = require('../config/conection');
const { criarToken, cobrar } = require('../api/gateway');

const venda = async (req, res) => {
    const { evento_id, quantidade, card } = req.body;
    const { id } = req.usuario;
    try {
        const produto = await knex('eventos').where({ id: evento_id }).first();

        if (!produto) {
            return res.status(404).json({ mensagem: "evento não existe" });
        }

        if (quantidade < 1) {
            return res.status(400).json({ mensagem: " A quantidade é de no mínimo 1" });
        }

        const valorvenda = produto.preco * quantidade;

        // A linha a baixo só funciona para transações reais
        // const tokenCartao = await criarToken({ card });
        const cobranca = await cobrar(valorvenda, 'tok_visa');

        const inserirDados = {
            usuario_id: id,
            evento_id,
            quantidade,
            transacao_id: cobranca.id
        }
        const vendaRealizada = await knex('vendas').insert(inserirDados).returning('*');
        return res.status(201).json(cobranca);
    } catch (error) {
        if (error.response) {
            return res
                .status(400)
                .json({ mensagem: error.response.data.error.message })
        }
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    venda
}