const PdfPrinter = require('pdfmake');
const fs = require('fs');
const knex = require('../config/conection');

const relatorio = async (req, res) => {
    const { id, nome, email } = req.usuario;
    try {

        const dadosVenda = await knex('vendas').where({ usuario_id: id }).first();
        const dadosEvento = await knex('eventos').where({ id: dadosVenda.evento_id }).first();
        const fonts = {
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            }
        };

        const printer = new PdfPrinter(fonts);

        const body = [
            `\n\nOlá, ${nome}! \n`,
            `Aqui está o seu ingresso para o ${dadosEvento.nome}  \n`,
            `O código da sua compra é ${dadosVenda.id}  \n`,
            `Esse recibo é equivalente para a quantidade de ingressos que você adiquiriu, no caso ${dadosVenda.quantidade} `
        ];

        const docDefinitions = {
            defaultStyle: {
                font: 'Helvetica'
            },
            content: [
                {
                    columns: [
                        { text: "Ingresso", style: "header" }
                    ]
                },
                {
                    style: 'body',
                    text: body
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                },
                columnsTitle: {
                    fontSize: 15,
                    bold: true
                },
                body: {
                    fontSize: 14,
                    bold: false,
                    alignment: 'left',

                }

            }
        }


        const pdfDoc = printer.createPdfKitDocument(docDefinitions);

        const chunks = [];
        pdfDoc.on("data", (chunk) => {
            chunks.push(chunk);
        });

        pdfDoc.end();

        pdfDoc.on("end", () => {
            const results = Buffer.concat(chunks);
            return res.end(results);
        });
    } catch (error) {

        return res.status(500).json({ mensagem: "Erro interno de servidor" });
    }
}




module.exports = relatorio;
