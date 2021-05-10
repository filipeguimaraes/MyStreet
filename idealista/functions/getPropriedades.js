const axios = require("axios").default;
const config = require("../config");

module.exports = function getPropriedades(locationId, locationName) {

    const options = {
        method: 'GET',
        url: 'https://idealista2.p.rapidapi.com/properties/list',
        params: {
            locationId: locationId,
            locationName: locationName,
            operation: 'sale',
            locale: 'pt',
            country: 'pt'
        },
        headers: {
            'x-rapidapi-key': config.xrapidapikey,
            'x-rapidapi-host': 'idealista2.p.rapidapi.com'
        }
    };

    return axios.request(options).then( response => response.data);
}