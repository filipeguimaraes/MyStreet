const procuraCasaPorFreguesia = require("./getByFreguesia");


module.exports = function getRanking(freguesia, freguesias, distrito) {
    let listaFreguesiaPrecoMedio = [];
    for (let i = 0; i < freguesias.length; i++) {
        listaFreguesiaPrecoMedio.push({
            freguesia: freguesias[i], media: procuraCasaPorFreguesia(freguesias[i], distrito).elementList
                .map(x => x.price)
                .reduce(function (a, b) {
                    return a + b;
                }, 0) / procuraCasaPorFreguesia(freguesias[i], distrito).elementList.length
        });
    }
    listaFreguesiaPrecoMedio.sort((a, b) => {
        return b.media - a.media;
    });

    let pos = -1;
    for (let i = 0; i < listaFreguesiaPrecoMedio.length; i++) {
        if (listaFreguesiaPrecoMedio[i].freguesia === freguesia){
            pos = i;
            break;
        }
    }

    return  {posicao: pos+1 , lista: listaFreguesiaPrecoMedio};
}
