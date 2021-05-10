const procuraCasaPorFreguesia = require("./getByFreguesia");


module.exports = function getMediasByConcelho(freguesia,freguesias, distrito) {
    let mediaFreguesias = 0;
    let propriedades = 0;
    for (let i = 0; i < freguesias.length; i++) {
        mediaFreguesias += procuraCasaPorFreguesia(freguesias[i], distrito).elementList
            .map(x => x.price)
            .reduce(function (a, b) {
                return a + b;
            }, 0);
        propriedades += procuraCasaPorFreguesia(freguesias[i], distrito).elementList.length;
    }
    mediaFreguesias /= propriedades;

    let mediaFreguesia = procuraCasaPorFreguesia(freguesia, distrito).elementList
        .map(x => x.price)
        .reduce(function (a, b) {
            return a + b;
        }, 0) / procuraCasaPorFreguesia(freguesia, distrito).elementList.length;

    return {mediaFreguesia: mediaFreguesia, mediaFreguesias: mediaFreguesias};
}
