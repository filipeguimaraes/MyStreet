const getMediasByFreguesia = require("./functions/getMediasByFreguesia");
const getMediasByConcelho = require("./functions/getMediasByConcelho");
const getProprietiesRange = require("./functions/getProprietiesRange");
const getTamanhoMedio = require("./functions/getTamanhoMedio");
const getNumeroQuartos = require("./functions/getNumeroQuartos");
const getRanking = require("./functions/getRanking");

//Rua de Belmonte
const loc = ['41.142618', '-8.616362'];
const freg = "Cedofeita, Santo Ildefonso, Sé, Miragaia, São Nicolau e Vitória";
const dist = "Porto";

const fregs = [
    "Aldoar, Foz do Douro e Nevogilde",
    "Bonfim",
    "Campanhã",
    "Cedofeita, Santo Ildefonso, Sé, Miragaia, São Nicolau e Vitória",
    "Lordelo do Ouro e Massarelos",
    "Paranhos",
    "Ramalde"
];

function getMetricas(localizacao,freguesia,freguesias, distrito){
    console.log(getMediasByFreguesia(localizacao, freguesia, distrito));
    console.log(getMediasByConcelho(freguesia,freguesias, distrito));
    const range = getProprietiesRange(freguesia,distrito);
    console.log("Range: ["+range.minimo+"€ - "+range.maximo+"€]");
    console.log("Tamanho médio: "+ getTamanhoMedio(freguesia,distrito) + "m²");
    console.log("Numero de Quartos: "+ getNumeroQuartos(freguesia,distrito));
    const rank = getRanking(freguesia,freguesias,distrito);
    console.log("Esta zona é a numero "+rank.posicao+" mais cara de "+rank.lista.length+".")
}

getMetricas(loc,freg,fregs,dist);

//console.log(procuraCasaPorFreguesia(freg, dist).elementList.filter(x => estaPerto(loc, x.latitude, x.longitude, 2.5)).length);

