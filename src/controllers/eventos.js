const knex = require("../config/conection");

const listarEventos = async (req, res) => {
    try {
        const eventos = await knex('eventos').first();
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

const escolherHorario = async (req, res) => {
    const { id } = req.params;
    try {
        const existeEvento = await knex('eventos').where({ id }).first();
        if (!existeEvento) {
            return res.status(404).json({ mensagem: "O evento escolhido não está disponível!" });
        }

        const horarios = await knex('horario_eventos as h')
            .select('h.horario_evento as horario', 'e.nome as nome', 'e.descricao as descricao')
            .leftJoin('eventos as e', 'h.evento_id', 'e.id')
            .where('e.id', '=', id);

        return res.status(200).json(horarios);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno de servidor' });
    }

}


module.exports = {
    listarEventos,
    escolherEventos,
    escolherHorario
};
