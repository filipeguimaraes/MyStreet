const getLocation = require("./getLocations");

module.exports = async function getLocations(postcode) {
    return getLocation(postcode)
        .then(function (response) {
            if (typeof response == 'undefined')
                throw new Error("Não foi possível pesquisar por: " + postcode);
            return {
                localizacao: response.center,
                freguesia: response.context[0].text,
                distrito: response.context[1].text
            };
        });
}