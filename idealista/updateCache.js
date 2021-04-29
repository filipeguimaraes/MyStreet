const getID = require("./getID");
const getPropriedades = require("./getPropriedades");
const fs = require('fs');

let distrito = "Porto";
const freguesias = [
    "Aldoar, Foz do Douro e Nevogilde",
    "Bonfim",
    "Campanhã",
    "Cedofeita, Santo Ildefonso, Sé, Miragaia, São Nicolau e Vitória",
    "Lordelo do Ouro e Massarelos",
    "Paranhos",
    "Ramalde"
];

function apiCasaPorFreguesia(freguesia, distrito) {
    let dir1 = "cache/" + distrito;
    let dir = "cache/" + distrito + "/" + freguesia;

    if (!fs.existsSync(dir1)) {
        fs.mkdirSync(dir1);
    }

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);

        getID(freguesia).then(function (response) {
            if (!response.locations[0]) throw new Error("Não foi possível pesquisar por: " + freguesia);

            let i = 0;
            while (true) {
                if (String(response.locations[i].name).includes(distrito) && response.locations[i].locationId)
                    break;
                else if (response.locations[i + 1]) {
                    i++;
                } else {
                    throw new Error("Não possui localização na api: " + freguesia);
                }
            }

            const nome = response.locations[i].name;
            const id = response.locations[i].locationId;

            getPropriedades(id, nome).then((data) => {
                let dados = JSON.stringify(data);
                fs.writeFileSync(dir + '/proprieties.json', dados);
                console.log("Nome: " + nome + " || ID: " + id + " || Casas: " + data.total);
            })
        }).catch(erro => console.log(erro.message));
    }
}


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


async function getAll() {
    for (let i = 0; i < freguesias.length; i++) {
        let dir = "cache/" + distrito + "/" + freguesias[i] + "/proprieties.json";
        if (!fs.existsSync(dir)) {
            console.log("Searching in API for " + freguesias[i]);
            apiCasaPorFreguesia(freguesias[i], distrito);
            await delay(1000);
        } else {
            console.log("In cache: " + freguesias[i]);
        }
    }

}


getAll().then();
