const procuraCasaPorFreguesia = require("./getByFreguesia");
const fs = require('fs');
let distrito = "Porto";

/**
 const freguesias = [
 "Abação e Gémeos",
 "Airão e Vermil",
 "Aldão",
 "Arosa e Castelões",
 "Atães e Rendufe",
 "Azurém",
 "Barco",
 "Briteiros (Santo Estêvão) e Donim",
 "Briteiros (São Salvador e Santa Leocádia)",
 "Brito",
 "Caldelas",
 "Candoso (São Martinho)",
 "Candoso (São Tiago) e Mascotelos",
 "Conde e Gandarela",
 "Costa",
 "Creixomil",
 "Fermentões",
 "Gonça",
 "Gondar",
 "Guardizela",
 "Infantas",
 "Leitões, Oleiros e Figueiredo",
 "Longos",
 "Lordelo",
 "Mesão Frio",
 "Moreira de Cónegos",
 "Nespereira",
 "Oliveira, São Paio e São Sebastião",
 "Pencelo",
 "Pinheiro",
 "Polvoreira",
 "Ponte",
 "Prazins (Santa Eufémia)",
 "Prazins (Santo Tirso) e Corvite",
 "Ronfe",
 "Sande (São Lourenço) e Balazar",
 "Sande (São Martinho)",
 "Sande (Vila Nova e São Clemente)",
 "São Torcato",
 "Selho (São Cristóvão)",
 "Selho (São Jorge)",
 "Selho (São Lourenço) e Gominhães",
 "Serzedelo",
 "Serzedo e Calvos",
 "Silvares",
 "Souto e Gondomar",
 "Tabuadelo e São Faustino",
 "Urgezes"
 ];
 **/

const freguesias = [
    "Aldoar, Foz do Douro e Nevogilde",
    "Bonfim",
    "Campanhã",
    "Cedofeita, Santo Ildefonso, Sé, Miragaia, São Nicolau e Vitória",
    "Lordelo do Ouro e Massarelos",
    "Paranhos",
    "Ramalde"
];


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


async function getAll() {
    for (let i = 0; i < freguesias.length; i++) {
        let dir = "cache/" + distrito + "/" + freguesias[i] + "/proprieties.json";
        if (!fs.existsSync(dir)) {
            console.log("Searching in API for " + freguesias[i]);
            procuraCasaPorFreguesia(freguesias[i], distrito);
            await delay(1000);
        } else {
            console.log("In cache: " + freguesias[i]);
        }
    }

}


getAll().then();
