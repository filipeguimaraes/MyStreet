const getMediasByFreguesia = require("./getMediasByFreguesia");
const getMediasByConcelho = require("./getMediasByConcelho");
const getProprietiesRange = require("./getProprietiesRange");
const getTamanhoMedio = require("./getTamanhoMedio");
const getNumeroQuartos = require("./getNumeroQuartos");
const getRanking = require("./getRanking");

//Rua de Belmonte
const loc = ['41.142618', '-8.616362'];
const freg = "Cedofeita, Santo Ildefonso, Sé, Miragaia, São Nicolau e Vitória";
const dist = "Porto";

const freguesias = [
    "Aldoar, Foz do Douro e Nevogilde",
    "Bonfim",
    "Campanhã",
    "Cedofeita, Santo Ildefonso, Sé, Miragaia, São Nicolau e Vitória",
    "Lordelo do Ouro e Massarelos",
    "Paranhos",
    "Ramalde"
];

function getMetricas(){
    console.log(getMediasByFreguesia(loc, freg, dist));
    console.log(getMediasByConcelho(freg,freguesias, dist));
    const range = getProprietiesRange(freg,dist);
    console.log("Range: ["+range.minimo+"€ - "+range.maximo+"€]");
    console.log("Tamanho médio: "+ getTamanhoMedio(freg,dist) + "m²");
    console.log("Numero de Quartos: "+ getNumeroQuartos(freg,dist));
    const rank = getRanking(freg,freguesias,dist);
    console.log("Esta zona é a numero "+rank.posicao+" mais cara de "+rank.lista.length+".")
}

getMetricas();

//console.log(procuraCasaPorFreguesia(freg, dist).elementList.filter(x => estaPerto(loc, x.latitude, x.longitude, 2.5)).length);

