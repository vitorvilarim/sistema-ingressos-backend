const axios = require('axios');

const instanciaAxios = axios.create({
    baseURL: 'https://api.stripe.com/v1',
    headers: {
        authorization: `Bearer ${process.env.API_KEY}`,
        'content-type': 'application/x-www-form-urlencoded'
    }
});


module.exports = instanciaAxios;