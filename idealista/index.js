const getMediasByFreguesia = require("./functions/getMediasByFreguesia");
const getMediasByConcelho = require("./functions/getMediasByConcelho");
const getProprietiesRange = require("./functions/getProprietiesRange");
const getTamanhoMedio = require("./functions/getTamanhoMedio");
const getNumeroQuartos = require("./functions/getNumeroQuartos");
const getRanking = require("./functions/getRanking");
const getLocal = require('./postalcodes/index');

function getMetricas(postcode){
    getLocal(postcode).then(local => {
        console.log(getMediasByFreguesia(local.localizacao, local.freguesia, local.distrito));
        console.log(getMediasByConcelho(local.freguesia,local.freguesias, local.distrito));
        const range = getProprietiesRange(local.freguesia,local.distrito);
        console.log("Range: ["+range.minimo+"€ - "+range.maximo+"€]");
        console.log("Tamanho médio: "+ getTamanhoMedio(local.freguesia,local.distrito) + "m²");
        console.log("Numero de Quartos: "+ getNumeroQuartos(local.freguesia,local.distrito));
        const rank = getRanking(local.freguesia,local.freguesias,local.distrito);
        console.log("Esta zona é a numero "+rank.posicao+" mais cara de "+rank.lista.length+".")
    });
}

getMetricas('4350-010');

