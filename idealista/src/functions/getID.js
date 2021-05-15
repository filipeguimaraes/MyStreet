const axios = require("axios");
const config = require("../config");

module.exports = function getID(local) {

    const options = {
        method: 'GET',
        url: 'https://idealista2.p.rapidapi.com/auto-complete',
        params: {prefix: local, country: 'pt'},
        headers: {
            'x-rapidapi-key': config.xrapidapikey,
            'x-rapidapi-host': 'idealista2.p.rapidapi.com'
        }
    };


    return axios.request(options)
        .then(response => response.data)
        .catch(() => Promise.reject(new Error("Não foi possível encontrar: " + options.params.prefix)));

}

