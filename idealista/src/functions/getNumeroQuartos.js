const procuraCasaPorFreguesia = require("./getByFreguesia");

module.exports = function getProprietiesRange(freguesia, distrito) {
    let listValues = procuraCasaPorFreguesia(freguesia, distrito).elementList.map(x => x.rooms);
    return Math.round(listValues.reduce((sum, val) => {sum += val; return sum;}) / listValues.length);
}

