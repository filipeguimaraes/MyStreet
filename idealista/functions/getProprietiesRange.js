const procuraCasaPorFreguesia = require("./getByFreguesia");

module.exports = function getProprietiesRange(freguesia, distrito) {
    let listValues = procuraCasaPorFreguesia(freguesia, distrito).elementList.map(x => x.price);
    let maximo = listValues[0];
    let minimo = listValues[0];
    for (let i = 0; i < listValues.length; i++) {
        if (maximo < listValues[i]) maximo = listValues[i];
        if (minimo > listValues[i]) minimo = listValues[i];
    }

    return {minimo: minimo, maximo: maximo};
}

