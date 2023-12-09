const express = require('express');
const rotas = require('./routes/route');
const app = express();

app.use(express.json());


app.use(rotas);


app.listen(process.env.PORT || 3000); 