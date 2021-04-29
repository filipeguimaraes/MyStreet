const axios = require("axios");
const config = require("./config");


module.exports = function getLocation(postcode) {
    const token = config.mapboxKey
    let request = `https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?access_token=${token}`;

    /*https://api.mapbox.com/geocoding/v5/mapbox.places/4760-143.json?access_token=pk.eyJ1IjoibWFyaWFtaWd1ZWwiLCJhIjoiY2tuYWc4eHlvMWhkajJubzZuMHFwazhhMyJ9.J1u7e0aA8a8_KLvUF9b8XA*/

    console.log(request)
    
    return axios.get(request).then( response => response.data)
                                .catch(() => Promise.reject(new Error("Não foi possível encontrar: " + postcode)));


}