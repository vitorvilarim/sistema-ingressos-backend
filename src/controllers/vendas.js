const knex = require('../config/conection');
const { criarToken, cobrar } = require('../api/gateway');
const send = require('../services/emailSend');

const venda = async (req, res) => {
    const { evento_id, quantidade, card } = req.body;
    const { id, email, nome } = req.usuario;
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

        const body = `A sua compra para o evento ${produto.nome} foi realizada com sucesso! `
        await send(email, "Compra Realizada!", body);

        const inserirDados = {
            usuario_id: id,
            evento_id,
            quantidade,
            transacao_id: cobranca.id
        }

        const vendaRealizada = await knex('vendas').insert(inserirDados).returning('*');
        const venda = `${nome}, você comprou ${quantidade} ingresso(s) para o evento ${produto.nome}. Sua compra foi realizada com sucesso!`
        return res.status(201).json(venda);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    venda
}