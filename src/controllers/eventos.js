const knex = require("../config/conection");

const listarEventos = async (req, res) => {
    try {
        const eventos = await knex('eventos');
        // console.log(eventos)
        return res.status(200).json(eventos);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: 'Erro interno de servidor' });
    }
};


module.exports = {
    listarEventos
};
