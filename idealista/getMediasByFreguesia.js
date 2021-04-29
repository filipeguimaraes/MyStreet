const procuraCasaPorFreguesia = require("./getByFreguesia");

if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}
function estaPerto(localizacao1, localizacao2lat, localizacao2long, distanciaMax) {
    let decimals = 2;
    let earthRadius = 6371; // km
    let lat1 = parseFloat(localizacao1[0]);
    let lat2 = parseFloat(localizacao2lat);
    let lon1 = parseFloat(localizacao1[1]);
    let lon2 = parseFloat(localizacao2long);

    let dLat = (lat2 - lat1).toRad();
    let dLon = (lon2 - lon1).toRad();
    lat1 = lat1.toRad();
    lat2 = lat2.toRad();

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = earthRadius * c;

    let distancia = Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);

    return distancia <= distanciaMax;
}

module.exports = function getMediasByFreguesia(localizacao, freguesia, distrito) {
    let numeroProp = procuraCasaPorFreguesia(freguesia, distrito).elementList.length;
    let listaPropriedadesPerto = procuraCasaPorFreguesia(freguesia, distrito).elementList
        .filter(x => estaPerto(localizacao, x.latitude, x.longitude, 1.5));
    let mediaFreguesia = procuraCasaPorFreguesia(freguesia, distrito).elementList
        .map(x => x.price)
        .reduce(function (a, b) {
            return a + b;
        }, 0) / numeroProp;

    let mediaLocal = listaPropriedadesPerto
        .map(x => x.price)
        .reduce(function (a, b) {
            return a + b;
        }, 0) / listaPropriedadesPerto.length;

    return {mediaFreguesia: mediaFreguesia, mediaLocal: mediaLocal};

}

