const getID = require("./getID");
const getPropriedades = require("./getPropriedades");
const fs = require('fs');

module.exports = function procuraCasaPorFreguesia(freguesia, distrito) {
    let dir1 = "cache/" + distrito;
    let dir = "cache/" + distrito + "/" + freguesia;

    return JSON.parse(fs.readFileSync(dir + '/proprieties.json', 'utf-8'));
}
