const axios = require("axios");


module.exports = function getID(local){

    const options = {
        method: 'GET',
        url: 'https://idealista2.p.rapidapi.com/auto-complete',
        params: {prefix: 'braga', country: 'pt'},
        headers: {
            'x-rapidapi-key': 'a7cb4244b9mshe30d3348baf43a7p136c30jsna8305d316d63',
            'x-rapidapi-host': 'idealista2.p.rapidapi.com'
        }
    };


    return axios.request(options).then(function (response) {
        return response.data;
    });

}

