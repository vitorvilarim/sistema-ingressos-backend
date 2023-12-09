const express = require('express');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    return res.json('ok');
});


app.listen(process.env.PORT || 3000);