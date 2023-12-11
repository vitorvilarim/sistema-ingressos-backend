const knex = require("../config/conection");

const listarEventos = async (req, res) => {
    try {
        const eventos = await knex('eventos');
        return res.status(200).json(eventos);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno de servidor' });
    }
};

const escolherEventos = async (req, res) => {
    const { nomeEvento } = req.query;

    try {
        const buscarEvento = await knex('eventos').where({ nome: nomeEvento }).first();
        console.log(buscarEvento)
        if (!buscarEvento) {
            return res.status(404).json({ mensagem: "Evento não existe!" });
        }

        return res.status(200).json(buscarEvento)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno de servidor' });
    }
};


module.exports = {
    listarEventos,
    escolherEventos
};
