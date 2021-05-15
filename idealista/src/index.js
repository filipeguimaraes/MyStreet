const getMediasByFreguesia = require("./functions/getMediasByFreguesia");
const getMediasByConcelho = require("./functions/getMediasByConcelho");
const getProprietiesRange = require("./functions/getProprietiesRange");
const getTamanhoMedio = require("./functions/getTamanhoMedio");
const getNumeroQuartos = require("./functions/getNumeroQuartos");
const getRanking = require("./functions/getRanking");
const getLocal = require('./postalcodes/index');

module.exports = function getMetricas(postcode) {
    return getLocal(postcode).then(local => {
        let stuff = {
            mediaConcelho: 0,
            mediaFreguesia: 0,
            mediaLocal: 0,
            range: [],
            tamanhoMedio: 0,
            numeroQuartos: 0,
            rank: 0,
            auxRank: 0
        }
        stuff.mediaConcelho = getMediasByConcelho(local.freguesia, local.freguesias, local.distrito).mediaFreguesias;
        stuff.mediaFreguesia = getMediasByFreguesia(local.localizacao, local.freguesia, local.distrito).mediaFreguesia;
        stuff.mediaLocal = getMediasByFreguesia(local.localizacao, local.freguesia, local.distrito).mediaLocal;
        const range = getProprietiesRange(local.freguesia, local.distrito);
        stuff.range.push(range.minimo);
        stuff.range.push(range.maximo);
        stuff.tamanhoMedio = getTamanhoMedio(local.freguesia, local.distrito);
        stuff.numeroQuartos = getNumeroQuartos(local.freguesia, local.distrito);
        const rank = getRanking(local.freguesia, local.freguesias, local.distrito);
        stuff.rank = rank.posicao;
        stuff.auxRank = rank.lista.length;
        return stuff;
        /*
        console.log(getMediasByFreguesia(local.localizacao, local.freguesia, local.distrito));
        console.log(getMediasByConcelho(local.freguesia,local.freguesias, local.distrito));
        console.log("Range: ["+range.minimo+"€ - "+range.maximo+"€]");
        console.log("Tamanho médio: "+ getTamanhoMedio(local.freguesia,local.distrito) + "m²");
        console.log("Numero de Quartos: "+ getNumeroQuartos(local.freguesia,local.distrito));
        console.log("Esta zona é a numero "+rank.posicao+" mais cara de "+rank.lista.length+".")
         */
    });
}
